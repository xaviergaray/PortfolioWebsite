import argparse
from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from .populate_database import get_embedding_function, RAG_TOPICS, DATA_PATH
from langchain_community.llms.ollama import Ollama
from openai import OpenAI
from conf import OPENAI_ORGANIZATION_ID, OPENAI_API_KEY, OPENAI_PROJECT_ID


FRAMEWORK_PROMPT = """
Your name is Aiden.
As a systems and software consultant, your task is to recommend a technology stack that will
meet all the necessary engineering requirements.
You are expected to suggest a suitable framework.
Write it within a section labeled ### FRAMEWORK ### at the start
and ### ENDFRAMEWORK ### at the end.
Also create a matching PlantUML diagram to should serve as a clear guide for engineers to develop the program.
Make sure it has arrows connecting different components where necessary.
"""

RAG_PROMPT_TEMPLATE = """
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


def query_rag(query_text: str, query_model: str = "mistral", category: str = "Cpp"):
    if category not in RAG_TOPICS:
        return None, None

    CHROMA_PATH = DATA_PATH + category + '/chroma'

    # Prepare the DB.
    print(f"Retrieving data from {CHROMA_PATH}.")
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=3)
    if len(results) == 0 or results[0][1] < 0.7:
        print("Unable to find matching results.")
        return None, None

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(RAG_PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    model = ChatOpenAI() if query_model[:3] == "gpt" else Ollama(model=query_model, base_url="http://ollama-query:11434")
    response_text = model.invoke(prompt)

    sources = [doc.metadata.get("id", None) for doc, _score in results]

    return response_text.content if query_model[:3] == "gpt" else response_text, sources


def query_framework(query_text: str, query_user: str, query_model: str):
    response = ''

    messages = [
        {
            "role": "system",
            "content": FRAMEWORK_PROMPT
        },
        {
            "role": "user",
            "content": query_text,
        }
    ]

    if query_model[:3] == "gpt":
        client = OpenAI(organization=OPENAI_ORGANIZATION_ID, project=OPENAI_PROJECT_ID)
        stream = client.chat.completions.create(
            model=query_model,
            messages=messages,
            stream=True,
            temperature=0.2,
            user=query_user,
        )

        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                response += chunk.choices[0].delta.content
    else:
        model = Ollama(model=query_model, base_url="http://ollama-query:11434")
        response = model.invoke(FRAMEWORK_PROMPT + "/n" + query_text)

    # Extract the framework section
    startText = response.find('### FRAMEWORK ###')
    endText = response.find('### ENDFRAMEWORK ###')
    textualResponse = response[startText + 17 : endText].strip()

    # Extract the UML section
    startUml = response.find('@startuml')
    endUml = response.find('@enduml')
    umlResponse = response[startUml : endUml + 7].strip()

    return {"textualResponse": textualResponse, "umlResponse": umlResponse}


if __name__ == "__main__":
    main()
