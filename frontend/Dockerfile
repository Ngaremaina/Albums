# Stage 1: Build the application
FROM node:latest as builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

# Copy all files and build the Vite app
COPY . .
RUN npm run build

# Stage 2: Serve the application using a lightweight server
FROM nginx:alpine

# Copy the built files from the builder stage to the Nginx web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file 
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
