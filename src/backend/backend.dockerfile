# Use the official Node.js image as the base image
FROM node:18-alpine

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000


# Start the application and run the populate script
CMD ["node", "server.js"]

# CMD ["sh", "-c", "node populate.js && node server.js"] -for the first time