import os
import glob
from pathlib import Path
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS

# Load environment variables
# load_dotenv()
# load_dotenv(Path(__file__).parent / '.env')

def main():
    backend_dir = Path(__file__).parent.resolve()
    data_dir = (backend_dir.parent / "data").resolve()
    
    # 1. Gather all PDF files from the data directory
    pdf_files = glob.glob(str(data_dir / "*.pdf"))
    if not pdf_files:
        print(f"No PDF files found in {data_dir}. Exiting.")
        return

    # 2. Extract and split text using LangChain
    documents = []
    for pdf_path in pdf_files:
        print(f"Loading document: {pdf_path}")
        try:
            loader = PyPDFLoader(pdf_path)
            loaded_docs = loader.load()
            
            # Normalize metadata source as the filename only for a cleaner UI
            for doc in loaded_docs:
                doc.metadata["source"] = os.path.basename(pdf_path)
                
            documents.extend(loaded_docs)
        except Exception as e:
            print(f"Error loading {pdf_path}: {e}")
            return
            
    if not documents:
        print("No documents loaded. Exiting.")
        return
        
    print(f"Loaded {len(documents)} pages from PDFs.")

    # Split documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150,
        length_function=len
    )
    splits = text_splitter.split_documents(documents)
    print(f"Split documents into {len(splits)} chunks.")

    # 3. Check for API key
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not found.")
        print("Please create a backend/.env file and set GEMINI_API_KEY.")
        return

    # 4. Generate embeddings and create FAISS vector store
    print("Generating embeddings using models/embedding-001 (Google GenAI)...")
    try:
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/gemini-embedding-001",
            google_api_key=api_key
        )
        
        print("Building FAISS index...")
        db = FAISS.from_documents(splits, embeddings)
        
        # 5. Save locally
        db_path = backend_dir / "faiss_index"
        db.save_local(str(db_path))
        print(f"Successfully saved FAISS index to {db_path}")
        print("Ingestion complete!")
    except Exception as e:
        print(f"Error during ingestion: {e}")

if __name__ == "__main__":
    main()
