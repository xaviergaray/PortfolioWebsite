import os
from dotenv import load_dotenv

# Get Environment Variables
load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_ORGANIZATION_ID = os.getenv('OPENAI_ORGANIZATION_ID')
OPENAI_PROJECT_ID = os.getenv('OPENAI_PROJECT_ID')