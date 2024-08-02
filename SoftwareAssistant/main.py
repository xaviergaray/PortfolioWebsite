from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.llms.ollama import Ollama
from conf import DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME
import json
from pydantic import BaseModel
from typing import Optional
from RAG.query import query_rag, query_framework
import mysql.connector
from RAG.populate_database import RAG_TOPICS


# Establish a connection to the MySQL server
db = mysql.connector.connect(
    host=DATABASE_HOST,
    user=DATABASE_USER,
    password=DATABASE_PASSWORD,
    database=DATABASE_NAME
)

# Create a cursor object
cursor = db.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS responses (
    client_host VARCHAR(255),
    response_id INT,
    response TEXT,
    PRIMARY KEY (client_host, response_id)
)
""")

# Prepare FastAPI app with Cross Origin Resource Sharing
origins = [
    "http://portfolio-website"
    "http://localhost",
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dictionary of the different models, depending on which stage of development I would like to use
ai_models = {
    "cheapest": "gpt-3.5-turbo-0125",
    "cheaper": "gpt-3.5-turbo",
    "expensive": "gpt-4o",
    "most-expensive": "gpt-4-turbo",
    "mistral": "mistral"
}


class Item(BaseModel):
    user: Optional[str] = 'blank_user'
    message: str
    model: str
    topic: Optional[str] = 'framework'


def get_response_id(client_host):
    cursor.execute(f"SELECT response_id FROM responses WHERE client_host = '{client_host}'")
    response_ids = cursor.fetchall()
    response_id = 0
    for id in response_ids:
        response_id = max(id[0] + 1, response_id)
    return response_id


#====== Background Tasks ======
def query_ai_framework(item: Item, client_host, response_id):
    response = query_framework(query_text=item.message, query_user=item.user, query_model=item.model)
    commit_to_db(client_host, response_id, response)


def query_ai_rag(item: Item, client_host, response_id):
    response, _ = query_rag(query_text=item.message, query_model=item.model, category=item.topic)
    commit_to_db(client_host, response_id, {"textualResponse": str(response)})


def commit_to_db(client_host, response_id, response_dict):
    response_json = json.dumps(response_dict)
    sql = "INSERT INTO responses (client_host, response_id, response) VALUES (%s, %s, %s)"
    val = (client_host, response_id, response_json)
    cursor.execute(sql, val)
    db.commit()


#====== API Routes ======
# Route used for testing whether the API is in working condition and taking connections
@app.get('/gpt-api/test')
def test_message():
    return {"response": "GET Request Successful" if OPENAI_ORGANIZATION_ID is not None else "Error: No OpenAI Organization ID found."}


# Route used for testing whether the API has a working, established DB connection
@app.get('/gpt-api/test/db')
def test_db():
    try:
        # Try to get the server version
        cursor.execute("SELECT VERSION()")
        result = cursor.fetchone()
        if result is None:
            return {"error": "Unable to connect to the database"}
        else:
            return {"response": f"Connected to MySQL server at {DATABASE_HOST}, version: {result[0]}"}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}


# Route to get the available categories
@app.get('/gpt-api/RAG/categories')
def get_rag_categories():
    response = RAG_TOPICS[0]
    for topic in RAG_TOPICS[1:]:
        response += ',' + topic
    return {"response": response}


# Route to communicate with the API and receive suggestions
@app.post('/gpt-api/suggestions/')
def suggestions_cpp_to_api(item: Item, request: Request, background_tasks: BackgroundTasks):
    if not item.message:
        return {"error": 'No message provided'}, 400

    try:
        client_host = request.client.host
        response_id = get_response_id(client_host)
        background_tasks.add_task(query_ai_framework if item.topic == 'Framework' else query_ai_rag, item, client_host, response_id)
        return {"message": 'Request sent.', "response_id": response_id}, 202
    except Exception as e:
            return {"error": 'An error occurred: {}'.format(str(e))}, 500


# Route to communicate with the API and receive comments within code
@app.post('/gpt-api/suggestions/comments')
def comments_message_to_api(item: Item):
    pass


# Route to get the response from a query
@app.get('/gpt-api/response/{response_id}')
def get_response(response_id: str, request: Request):
    client_host = request.client.host
    cursor.execute("SELECT response FROM responses WHERE client_host = %s AND response_id = %s", (client_host, response_id))
    result = cursor.fetchone()
    if result is None:
        return {"error": "no response with the requested ID"}
    response_dict = json.loads(result[0])
    return response_dict


def main():
    query = input("Enter your custom query: ")
    try:
        cursor.execute(query)
        print(cursor.fetchall())
    except Exception as e:
        return {"error": 'An error occurred: {}'.format(str(e))}, 500


if __name__ == '__main__':
    main()