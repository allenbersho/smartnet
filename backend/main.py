import os
from pathlib import Path
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# LangChain Imports
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_classic.chains import create_retrieval_chain
from langchain_classic.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# Load environment variables
load_dotenv()
load_dotenv(Path(__file__).parent / '.env')

app = FastAPI(
    title="Alensmart RAG Chatbot API (LangChain)",
    description="A FastAPI backend for RAG using FAISS and Google Gemini API through LangChain",
    version="2.0.0"
)

# Enable CORS so the frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

BACKEND_DIR = Path(__file__).parent.resolve()
DB_PATH = BACKEND_DIR / "faiss_index"

# Global states
db = None
embeddings = None
rag_chain = None

def init_langchain_components():
    global db, embeddings, rag_chain
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Warning: GEMINI_API_KEY not configured.")
        return False
        
    try:
        # 1. Initialize embeddings
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/gemini-embedding-001",
            google_api_key=api_key
        )
        
        # 2. Try loading local FAISS index
        if DB_PATH.exists():
            db = FAISS.load_local(
                str(DB_PATH), 
                embeddings, 
                allow_dangerous_deserialization=True
            )
            print("Successfully loaded LangChain FAISS index.")
            
            # 3. Initialize Chat Model
            llm = ChatGoogleGenerativeAI(
                model="gemini-2.5-flash",
                google_api_key=api_key,
                temperature=0.3
            )
            
            # 4. Construct retriever and prompt
            retriever = db.as_retriever(search_kwargs={"k": 5})
            
            system_prompt = (
                "You are 'Allen AI Assistant', a friendly and intelligent customer service assistant for Alensmart.\n"
                "Your job is to assist users with their queries, specifically around e-Sevai services, forms, certificates, and general application assistance.\n"
                "Use the following pieces of retrieved context to answer the question.\n"
                "If the context does not contain the answer, say \"I cannot find the exact answer in our documents, but here is what I know:\" and then provide a general answer based on your knowledge, maintaining a highly helpful tone.\n"
                "Provide a clean, well-formatted response using markdown formatting where appropriate.\n\n"
                "Context:\n{context}"
            )
            
            prompt = ChatPromptTemplate.from_messages([
                ("system", system_prompt),
                ("human", "{input}"),
            ])
            
            # 5. Create chains
            question_answer_chain = create_stuff_documents_chain(llm, prompt)
            rag_chain = create_retrieval_chain(retriever, question_answer_chain)
            print("Successfully initialized LangChain RAG pipeline.")
            return True
        else:
            print("Warning: faiss_index not found. Run ingest.py first.")
            return False
            
    except Exception as e:
        print(f"Error initializing LangChain components: {e}")
        return False

@app.on_event("startup")
async def startup_event():
    init_langchain_components()

class ChatRequest(BaseModel):
    message: str

@app.get("/api/status")
def status_endpoint():
    """Retrieve backend readiness status."""
    has_key = os.getenv("GEMINI_API_KEY") is not None
    is_ready = db is not None and rag_chain is not None
    return {
        "status": "ready" if is_ready else "loading_or_unconfigured",
        "langchain_initialized": is_ready,
        "api_key_configured": has_key,
        "index_exists": DB_PATH.exists()
    }

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """Processes user chat request using LangChain RAG chain."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GEMINI_API_KEY is missing. Please configure it in backend/.env."
        )
        
    global rag_chain, db
    # Lazy load/init if not ready
    if rag_chain is None:
        initialized = init_langchain_components()
        if not initialized:
            raise HTTPException(
                status_code=status.HTTP_530_SERVICE_UNAVAILABLE,
                detail="RAG pipeline is not ready. Ensure you have run ingest.py first."
            )
            
    query_text = request.message.strip()
    if not query_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message cannot be empty."
        )
        
    try:
        # Run query using retrieval chain
        response = rag_chain.invoke({"input": query_text})
        
        answer = response.get("answer", "")
        # Extract sources from retrieved documents
        retrieved_docs = response.get("context", [])
        sources = [
            {
                "source": doc.metadata.get("source", "Unknown"),
                "text": doc.page_content
            }
            for doc in retrieved_docs
        ]
        
        return {
            "answer": answer,
            "sources": sources
        }
        
    except Exception as e:
        print(f"Error during LangChain chat generation: {e}")
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
        # Re-initialize the components
        success = init_langchain_components()
        if success:
            return {"status": "success", "message": "Successfully reindexed and reloaded FAISS index."}
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Reindexing succeeded but failed to re-initialize LangChain pipeline."
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Reindexing failed: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
