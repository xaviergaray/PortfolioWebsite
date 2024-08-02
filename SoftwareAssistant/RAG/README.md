# Software Assistant using RAG with LLMs
## populate_database.py
This script uses the .md documents found in the data directory to develop several Chroma databases used for RAG. To add or remove the sources, place the files in a new directory within the data folder. The name of this directory will be the "category" name (e.g., Cpp, PowerShell, etc.)
## query.py
This script is used to query a LLM with the option to use RAG or not.