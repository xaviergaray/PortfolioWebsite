from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from conf import OPENAI_ORGANIZATION_ID, OPENAI_PROJECT_ID

# Connect to OpenAI client
client = OpenAI(
    organization=OPENAI_ORGANIZATION_ID,
    project=OPENAI_PROJECT_ID,
)

app = Flask(__name__)
CORS(app)

gpt_models = {
    "cheapest": "gpt-3.5-turbo-0125",
    "cheaper": "gpt-3.5-turbo",
    "expensive": "gpt-4o",
    "most-expensive": "gpt-4-turbo",
}


@app.route('/gpt-api', methods=['POST'])
def send_message_to_api():
    data = request.get_json()
    user = data.get('user', 'blank_user')
    message = data.get('message', '')

    if not message:
        return jsonify({'error': 'No message provided'}), 400

    stream = client.chat.completions.create(
        model=gpt_models['cheapest'],
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
                "content": message,
            }
        ],
        stream=True,
        temperature=0.2,
        user=user,
    )

    response = ''
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            response += chunk.choices[0].delta.content

    return jsonify({'response': response})


if __name__ == "__main__":
    app.run(debug=True)
