import os
from dotenv import load_dotenv

# Get Environment Variables
load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_ORGANIZATION_ID = os.getenv('OPENAI_ORGANIZATION_ID')
OPENAI_PROJECT_ID = os.getenv('OPENAI_PROJECT_ID')
DATABASE_NAME = os.getenv('DATABASE_NAME')
DATABASE_HOST = os.getenv('DATABASE_HOST')
DATABASE_USER = os.getenv('DATABASE_USER')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')
