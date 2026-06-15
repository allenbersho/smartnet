import os
import json
import glob
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from pypdf import PdfReader
import numpy as np
import faiss

# Load environment variables
# Check current directory and its parent for .env file
load_dotenv()
load_dotenv(Path(__file__).parent / '.env')

def extract_text_from_pdf(pdf_path):
    """Extract all text from a given PDF file path."""
    print(f"Extracting text from: {pdf_path}")
    reader = PdfReader(pdf_path)
    text = ""
    for page_num, page in enumerate(reader.pages):
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

def chunk_text(text, chunk_size=800, overlap=150):
    """Split text into overlapping chunks without splitting words."""
    # Normalize multiple whitespace/newlines to single spaces
    text = " ".join(text.split())
    chunks = []
    
    if not text:
        return chunks
        
    if len(text) <= chunk_size:
        return [text]
        
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        
        # Avoid splitting words in half by finding the last space in the end window
        if end < len(text):
            for i in range(end, max(end - 50, start), -1):
                if text[i] == ' ':
                    end = i
                    break
                    
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
            
        start = end - overlap
        if start < 0:
            start = 0
        if end == len(text):
            break
            
    return chunks

def main():
    # Set directories relative to this script
    ai_dir = Path(__file__).parent.resolve()
    data_dir = (ai_dir.parent / "data").resolve()
    
    # 1. Gather all PDF files from the data directory
    pdf_files = glob.glob(str(data_dir / "*.pdf"))
    if not pdf_files:
        print(f"No PDF files found in {data_dir}. Exiting.")
        return

    # 2. Extract and chunk text
    all_chunks = []
    for pdf_path in pdf_files:
        pdf_name = os.path.basename(pdf_path)
        text = extract_text_from_pdf(pdf_path)
        chunks = chunk_text(text)
        print(f"Created {len(chunks)} chunks from {pdf_name}")
        
        for idx, chunk in enumerate(chunks):
            all_chunks.append({
                "id": len(all_chunks),
                "text": chunk,
                "source": pdf_name
            })
            
    if not all_chunks:
        print("No text chunks extracted. Exiting.")
        return
        
    print(f"Total chunks extracted across all files: {len(all_chunks)}")

    # 3. Initialize Gemini Client
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not found.")
        print("Please create an AI/.env file and set GEMINI_API_KEY.")
        return
        
    client = genai.Client(api_key=api_key)
    
    # 4. Generate embeddings for the chunks
    print("Generating embeddings using Gemini text-embedding-004...")
    embeddings = []
    batch_size = 50
    
    for i in range(0, len(all_chunks), batch_size):
        batch = all_chunks[i:i+batch_size]
        batch_texts = [item["text"] for item in batch]
        
        try:
            response = client.models.embed_content(
                model="gemini-embedding-001",
                contents=batch_texts
            )
            # The SDK returns a list of embeddings
            for emb in response.embeddings:
                embeddings.append(emb.values)
            print(f"Embedded chunks {i+1} to {min(i+batch_size, len(all_chunks))}")
        except Exception as e:
            print(f"Error generating embeddings for batch {i}: {e}")
            return

    # 5. Build FAISS index
    print("Creating FAISS index...")
    embeddings_np = np.array(embeddings).astype('float32')
    dimension = embeddings_np.shape[1]
    
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings_np)
    
    # 6. Save index and chunks to disk
    index_path = ai_dir / "faiss_index.bin"
    chunks_path = ai_dir / "chunks.json"
    
    faiss.write_index(index, str(index_path))
    with open(chunks_path, "w", encoding="utf-8") as f:
        json.dump(all_chunks, f, ensure_ascii=False, indent=2)
        
    print(f"Successfully saved FAISS index to {index_path}")
    print(f"Successfully saved text chunks to {chunks_path}")
    print("Ingestion complete!")

if __name__ == "__main__":
    main()
