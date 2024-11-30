# Use the Node.js base image
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 5173

# Start the development server and bind to 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host"]
