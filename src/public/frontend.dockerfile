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