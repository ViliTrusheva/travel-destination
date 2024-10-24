# Use a base image that can serve static files, such as nginx
FROM nginx:alpine

# Remove the default nginx index.html
RUN rm -rf /usr/share/nginx/html/*

# Copy the necessary frontend files to the default nginx directory
COPY pages /usr/share/nginx/html/pages
COPY pages/login.html /usr/share/nginx/html/login.html
COPY pages/signup.html /usr/share/nginx/html/signup.html
COPY styles /usr/share/nginx/html/styles
COPY js /usr/share/nginx/html/js
COPY api /usr/share/nginx/html/api
COPY entities /usr/share/nginx/html/entities

# Set the default index.html to be served from the pages directory
RUN ln -s /usr/share/nginx/html/pages/index.html /usr/share/nginx/html/index.html

# Expose port 80, which is the default port for nginx
EXPOSE 80

# # We don't want to start from scratch.
# # That is why we tell node here to use the current node image as base.
# FROM node:18-alpine
# # FROM node:alpine3.11

# # Create an application directory
# RUN mkdir -p /app

# # The /app directory should act as the main application directory
# WORKDIR /app

# # Copy or project directory (locally) in the current directory of our docker image (/app)
# COPY . .

# # Expose $PORT on container.
# EXPOSE 80
