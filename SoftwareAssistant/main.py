from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from conf import OPENAI_ORGANIZATION_ID, OPENAI_PROJECT_ID
from pydantic import BaseModel
from typing import Optional
from RAG.query import query_rag


# Prepare FastAPI app with Cross Origin Resource Sharing
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Connect to OpenAI client
client = OpenAI(
    organization=OPENAI_ORGANIZATION_ID,
    project=OPENAI_PROJECT_ID,
)


# Dictionary of the different models, depending on which stage of development I would like to use
ai_models = {
    "cheapest": "gpt-3.5-turbo-0125",
    "cheaper": "gpt-3.5-turbo",
    "expensive": "gpt-4o",
    "most-expensive": "gpt-4-turbo",
    "RAG-Mistral": "mistral"
}


class Item(BaseModel):
    user: Optional[str] = 'blank_user'
    message: str
    model: str


# Route used for testing whether the API is in working and taking connections
@app.get('/gpt-api/test')
def test_message():
    return {"response": "GET Request Successful" if OPENAI_ORGANIZATION_ID is not None else "Error: No OpenAI Organization ID found."}


# Route to communicate with the API and receive framework suggestions
@app.post('/gpt-api/suggestions/framework')
def framework_message_to_api(item: Item):
    if not item.message:
        return {"error": 'No message provided'}, 400

    try:
        stream = client.chat.completions.create(
            model=ai_models['cheapest'],
            messages=
            [
                {
                    "role": "system",
                    "content": "Your name is Aiden."
                               "As a systems and software consultant, your task is to recommend a technology stack that will "
                               "meet all the necessary engineering requirements."
                               "You are expected to suggest a suitable framework."
                               "Write it within a section labeled ### FRAMEWORK ### at the start "
                               "and ### ENDFRAMEWORK ### at the end."
                               "Also create a PlantUML diagram should serve as a clear guide for engineers to develop the program."
                               "Make sure it has arrows connecting different components where necessary."
                },
                {
                    "role": "user",
                    "content": item.message,
                }
            ],
            stream=True,
            temperature=0.2,
            user=item.user,
        )

        response = ''
        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                response += chunk.choices[0].delta.content

        # Extract the framework section
        startText = response.find('### FRAMEWORK ###')
        endText = response.find('### ENDFRAMEWORK ###')
        textualResponse = response[startText + 17 : endText].strip()

        # Extract the UML section
        startUml = response.find('@startuml')
        endUml = response.find('@enduml')
        umlResponse = response[startUml : endUml + 7].strip()

        return {"textualResponse": textualResponse, "umlResponse": umlResponse}

    except Exception as e:
        return {"error": 'An error occurred: {}'.format(str(e))}, 500


# Route to communicate with the API and receive programming suggestions
@app.post('/gpt-api/suggestions/cpp')
def suggestions_cpp_to_api(item: Item):
    if not item.message:
        return {"error": 'No message provided'}, 400

    response, _ = query_rag(item.message, item.model) if item.model else query_rag(item.message)

    return {"textualResponse": response.content}


# Route to communicate with the API and receive comments within code
@app.post('/gpt-api/suggestions/comments')
def comments_message_to_api(item: Item):
    if not item.message:
        return {"error": 'No message provided'}, 400

    stream = client.chat.completions.create(
        model=ai_models['cheapest'],
        messages=
        [
            {
                "role": "system",
                "content": "Your name is Aiden."
                           "As a systems and software consultant, your task is to recommend a technology stack that will "
                           "meet all the necessary engineering requirements."
                           "You are expected to suggest a suitable framework."
                           "Write it within a section labeled ### FRAMEWORK ### at the start "
                           "and ### ENDFRAMEWORK ### at the end."
                           "Also create a PlantUML diagram should serve as a clear guide for engineers to develop the program."
                           "Make sure it has arrows connecting different components where necessary."
            },
            {
                "role": "user",
                "content": item.message,
            }
        ],
        stream=True,
        temperature=0.2,
        user=item.user,
    )

    response = ''
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            response += chunk.choices[0].delta.content

    return {"response": response}
