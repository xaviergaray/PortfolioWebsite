#!/bin/bash

# Start the ollama service in the background
ollama serve & pid=$!

# Wait for the ollama service to be ready
while ! curl -s http://localhost:11434 > /dev/null; do
    echo "🔴 Waiting for ollama service..."
    sleep 1
done
echo "🟢 Done."

echo "🔴 Starting nomic-embed-text model..."
ollama pull nomic-embed-text
echo "🟢 Done."

echo "🟢 Ollama service ready on port 11434."