import argparse
from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from .populate_database import get_embedding_function, CHROMA_PATH
from langchain_community.llms.ollama import Ollama


PROMPT_TEMPLATE = """
Answer the question based only on the following context,
provide an example if applicable and
speak as though I do not know the context, that is, do not use relative terms:

{context}

---

Answer the question based on the above context,
provide an example if applicable and
speak as though I do not know the context, that is, do not use relative terms: {question}
"""


def main():
    # Create CLI.
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    query_rag(query_text)


def query_rag(query_text: str, query_model: str = "mistral"):
    # Prepare the DB.
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=3)
    if len(results) == 0 or results[0][1] < 0.7:
        print("Unable to find matching results.")
        return

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    model = Ollama(model=query_model, base_url="http://ollama-query:11434") if query_model[:3] != "gpt" else ChatOpenAI()
    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\nSources: {sources}"
    print(formatted_response)

    return response_text, sources


if __name__ == "__main__":
    main()
