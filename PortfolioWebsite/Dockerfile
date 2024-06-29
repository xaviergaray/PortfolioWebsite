# Start with the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the Next.js app
RUN npm run build

# Create a non-root user
RUN adduser -D nonrootuser

# Change the ownership of the /usr/src/app directory to the non-root user
RUN chown -R nonrootuser:nonrootuser /usr/src/app

# Switch to the non-root user
USER nonrootuser

# Expose port 3000
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
