import os
import json
from pathlib import Path
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv
import numpy as np
import faiss

# Load environment variables
load_dotenv()
load_dotenv(Path(__file__).parent / '.env')

app = FastAPI(
    title="Alensmart RAG Chatbot API",
    description="A FastAPI backend for RAG using FAISS and Google Gemini API",
    version="1.0.0"
)

# Enable CORS so the frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all origins. Can be restricted to Vite ports.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AI_DIR = Path(__file__).parent.resolve()
INDEX_PATH = AI_DIR / "faiss_index.bin"
CHUNKS_PATH = AI_DIR / "chunks.json"

# Global states
index = None
chunks = []
client = None

def get_gemini_client():
    global client
    if client is not None:
        return client
        
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
        
    client = genai.Client(api_key=api_key)
    return client

def load_vector_db():
    global index, chunks
    if INDEX_PATH.exists() and CHUNKS_PATH.exists():
        try:
            index = faiss.read_index(str(INDEX_PATH))
            with open(CHUNKS_PATH, "r", encoding="utf-8") as f:
                chunks = json.load(f)
            print(f"Successfully loaded FAISS index with {index.ntotal} entries.")
            return True
        except Exception as e:
            print(f"Error loading FAISS index or chunks: {e}")
            return False
    else:
        print("Warning: FAISS index files not found. Please run the ingestion script.")
        return False

@app.on_event("startup")
async def startup_event():
    get_gemini_client()
    load_vector_db()

class ChatRequest(BaseModel):
    message: str

@app.get("/api/status")
def status_endpoint():
    """Retrieve backend readiness status."""
    has_client = get_gemini_client() is not None
    has_index = index is not None and len(chunks) > 0
    return {
        "status": "ready" if (has_client and has_index) else "loading_or_unconfigured",
        "gemini_client_initialized": has_client,
        "index_loaded": index is not None,
        "total_chunks": len(chunks),
        "api_key_configured": os.getenv("GEMINI_API_KEY") is not None
    }

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """Processes user chat request, performs similarity search, and generates answer using Gemini."""
    gemini_client = get_gemini_client()
    if not gemini_client:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Gemini API client not initialized. GEMINI_API_KEY might be missing."
        )
        
    # Lazy load index if it wasn't loaded during startup
    if index is None or not chunks:
        success = load_vector_db()
        if not success:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Vector database not loaded. Please index documents first."
            )
            
    query_text = request.message.strip()
    if not query_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message cannot be empty."
        )
        
    try:
        # 1. Generate embedding for user query
        embedding_response = gemini_client.models.embed_content(
            model="gemini-embedding-001",
            contents=query_text
        )
        query_vector = np.array(embedding_response.embeddings[0].values).astype('float32').reshape(1, -1)
        
        # 2. Search FAISS index
        k = 5  # Top k nearest neighbors
        distances, indices = index.search(query_vector, k)
        
        # 3. Retrieve relevant chunks
        retrieved_chunks = []
        for idx in indices[0]:
            if 0 <= idx < len(chunks):
                retrieved_chunks.append(chunks[idx])
                
        # 4. Construct prompt with context
        context_str = "\n\n".join([f"[Source: {item['source']}]\n{item['text']}" for item in retrieved_chunks])
        
        prompt = f"""You are "Allen AI Assistant", a friendly and intelligent customer service assistant for Alensmart.
Your job is to assist users with their queries, specifically around e-Sevai services, forms, certificates, and general application assistance.

Use the following pieces of context to answer the user's question. 
If the answer cannot be found in the context, say "I cannot find the exact answer in our documents, but here is what I know:" and then provide a general answer based on your knowledge, maintaining a highly helpful tone.

Context:
{context_str}

User Question: {query_text}

Provide a clean, well-formatted response (using markdown lists or bolding where appropriate):
Answer:"""

        # 5. Generate response using Gemini
        generation_response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        
        # 6. Extract sources
        sources = [{"source": c["source"], "text": c["text"]} for c in retrieved_chunks]
        
        return {
            "answer": generation_response.text,
            "sources": sources
        }
        
    except Exception as e:
        print(f"Error during RAG chat generation: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing your request: {str(e)}"
        )

@app.post("/api/reindex")
async def reindex_endpoint():
    """Trigger re-indexing of documents."""
    import importlib
    import ingest
    try:
        importlib.reload(ingest)
        ingest.main()
        # Reload the index and chunks
        success = load_vector_db()
        if success:
            return {"status": "success", "message": f"Successfully reindexed. Total chunks: {len(chunks)}"}
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Reindexing succeeded but failed to reload index into memory."
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Reindexing failed: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
