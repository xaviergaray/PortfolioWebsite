import argparse
from langchain_community.embeddings.ollama import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_community.vectorstores.chroma import Chroma
from multiprocessing import Pool
import glob
import os
import shutil
import math


DATA_PATH = "/app/RAG/data/"
RAG_TOPICS = [name for name in os.listdir(DATA_PATH) if os.path.isdir(os.path.join(DATA_PATH, name))]


def main():
    # Check if the database should be cleared (using the --clear flag).
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset", action="store_true", help="Reset the database.")
    args = parser.parse_args()
    if args.reset:
        for TOPIC in RAG_TOPICS:
            chroma_path = data_path + "/chroma"
            print(f"Clearing Database {chroma_path}")
            clear_database()
    for TOPIC in RAG_TOPICS:
        print(f"Populating database for {TOPIC}")
        data_path = f"{DATA_PATH}{TOPIC}"
        paths = glob.glob(os.path.join(data_path, "**/*.md"), recursive=True)
        # Load all documents in parallel
        documents = load_documents(paths)
        chunks = split_documents(documents)
        for chunk_subset in [chunks[i:i + 35000] for i in range(0, len(chunks), 35000)]:
            source_start = chunk_subset[0].metadata.get("source")
            source_end = chunk_subset[-1].metadata.get("source")

            print(f"Storing chunks from {source_start} to {source_end}...")
            add_to_chroma(chunk_subset, data_path + "/chroma")
        print("Done.")

def load_document(file_path: str) -> Document:
    # Load a single document
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    return Document(content, metadata={"source": file_path})


def load_documents(paths: list[str])-> list[Document]:
    print("Loading documents...")
    # Use multiprocessing to load documents in parallel
    with Pool(processes=os.cpu_count()) as pool:
        documents = pool.map(load_document, paths)
    print("Done.")
    return documents


def split_documents(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=80,
        length_function=len,
        is_separator_regex=False,
    )
    return text_splitter.split_documents(documents)


def get_embedding_function():
    embeddings = OllamaEmbeddings(model="nomic-embed-text", base_url="http://ollama-embedding:11434")
    return embeddings


def add_to_chroma(chunks: list[Document], chroma_path):
    db = Chroma(
        persist_directory=chroma_path,
        embedding_function=get_embedding_function(),
    )

    # Calculate Page IDs.
    chunks_with_ids = calculate_chunk_ids(chunks)

    # Add or Update the documents.
    existing_items = db.get(include=[])  # IDs are always included by default
    existing_ids = set(existing_items["ids"])
    print(f"Number of existing documents in DB: {len(existing_ids)}")

    # Only add documents that don't exist in the DB.
    new_chunks = []
    for chunk in chunks_with_ids:
        if chunk.metadata["id"] not in existing_ids:
            new_chunks.append(chunk)

    if len(new_chunks):
        print(f"Adding new documents: {len(new_chunks)}")
        new_chunk_ids = [chunk.metadata["id"] for chunk in new_chunks]
        db.add_documents(new_chunks, ids=new_chunk_ids)
    else:
        print("No new documents to add")


def calculate_chunk_ids(chunks):
    # This will create IDs like "data/monopoly.pdf:6:2"
    # Page Source : Page Number : Chunk Index

    last_page_id = None
    current_chunk_index = 0

    for chunk in chunks:
        source = chunk.metadata.get("source")
        page = chunk.metadata.get("page")
        current_page_id = f"{source}:{page}"

        # If the page ID is the same as the last one, increment the index.
        if current_page_id == last_page_id:
            current_chunk_index += 1
        else:
            current_chunk_index = 0

        # Calculate the chunk ID.
        chunk_id = f"{current_page_id}:{current_chunk_index}"
        last_page_id = current_page_id

        # Add it to the page meta-data.
        chunk.metadata["id"] = chunk_id

    return chunks


def clear_database(chroma_path):
    if os.path.exists(chroma_path):
        shutil.rmtree(chroma_path)


if __name__ == "__main__":
    main()
