import argparse
from langchain_community.document_loaders.directory import DirectoryLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores.chroma import Chroma
from multiprocessing import Pool
import glob
import os
import shutil


DATA_PATH = "./data/Cpp/MicrosoftDocs/cpp"
CHROMA_PATH = "chroma"
PROMPT_TEMPLATE = """
You are a software engineering consultant. Answering the following question with suggestions amd
simple explanations on why you made those suggestions. 
{0}
"""


# Load documents without parallel loading
def load_documents():
    print("Loading documents...")
    loader = DirectoryLoader(DATA_PATH, glob="**/*.md")
    documents = loader.load()
    print("Done.")
    return documents


def load_document(file_path: str) -> Document:
    # Load a single document
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    return Document(content, metadata={"source": file_path})


def load_documents_parallel(paths: list[str]):
    print("Loading documents...")
    # Use multiprocessing to load documents in parallel
    with Pool(processes=os.cpu_count()) as pool:
        documents = pool.map(load_document, paths)
    print("Done.")
    return documents


def split_text(documents: list[Document]):
    print("Splitting document contents into chunks...")
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1024,
        chunk_overlap=512,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(chunks)} chunks.")

    return chunks


def save_to_chroma(chunks: list[Document]):
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)

    db = Chroma.from_documents(
        chunks,
        OpenAIEmbeddings(show_progress_bar=True),
        persist_directory=CHROMA_PATH
    )

    db.persist()
    print(f"Saved {len(chunks)} chunks to {CHROMA_PATH}.")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--query_text", type=str, default="", help="The query text.")
    parser.add_argument("-b", "--build", action="store_true", help="Create Chroma DB")
    args = parser.parse_args()
    query_text = args.query_text
    build_db = args.build

    if build_db:
        # Include safety check in case user ran this by accident
        override = input("Are you sure you want to override the existing Chroma database? (y/[n]) ")
        if override.lower() == "y":
            print("Creating Chroma database...")
            # Get a list of all .md files in DATA_PATH
            paths = glob.glob(os.path.join(DATA_PATH, "**/*.md"), recursive=True)
            # Load all documents in parallel
            documents = load_documents_parallel(paths)

            save_to_chroma(split_text(documents))
            print("Done.")

    if not query_text:
        print("No query text found. Exiting program...")
        return

    print("Querying model...")
    embedding_function = OpenAIEmbeddings()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    results = db.similarity_search_with_relevance_scores(query_text, k=3)
    if len(results) == 0 or results[0][1] < 0.7:
        print("Unable to find matching results.")
        return

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    model = ChatOpenAI()
    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("source", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)

    return formatted_response


if __name__ == "__main__":
    import os
    import glob
    from nomic import embed
    from transformers import RagTokenizer, RagRetriever, RagSequenceForGeneration

    # Initialize an empty list to hold the text data
    text_data = []

    # Use os and glob to loop over all .md files in the ./data/ directory and its subdirectories
    for filename in glob.glob('./data/Cpp/MicrosoftDocs/cpp/*.md', recursive=True):
        with open(filename, 'r', encoding='utf-8') as file:
            # Read each file's contents and append to the text_data list
            text_data.append(file.read())

    # Now you can pass text_data to your embed function to create embeddings
    embeddings = embed.text(text_data, inference_mode="local")['embeddings']
    print("Number of embeddings created:", len(embeddings))
    print("Number of dimensions per embedding:", len(embeddings[0]))

    # Initialize tokenizer and model
    tokenizer = RagTokenizer.from_pretrained("facebook/rag-sequence-nq")
    model = RagSequenceForGeneration.from_pretrained("facebook/rag-sequence-nq")

    # Initialize retriever
    retriever = RagRetriever(
        model.config,
        question_encoder_tokenizer=tokenizer,
        generator_tokenizer=tokenizer,
        index_name="exact",
        passages=embeddings  # Pass your embeddings here
    )

    # Generate a response
    input_dict = tokenizer.prepare_seq2seq_batch("How can I run LLMs efficiently on my laptop?", return_tensors="pt")
    input_dict["retrieved_indices"] = retriever(input_dict["input_ids"])
    generated = model.generate(input_ids=input_dict["input_ids"], context_input_ids=input_dict["retrieved_indices"])
    response = tokenizer.batch_decode(generated, skip_special_tokens=True)

    print(response)
