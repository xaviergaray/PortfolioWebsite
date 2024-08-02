FROM ollama/ollama:rocm

# Copy the script into the Docker image
COPY ollama_script.sh /ollama_script.sh

# Make the script executable
RUN chmod +x /ollama_script.sh

# Run the script
RUN /ollama_script.sh
