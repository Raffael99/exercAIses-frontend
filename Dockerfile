FROM node:lts-alpine AS build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Serve Application using Nginx Server

FROM nginx:latest AS ngi

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist/fuse/browser /usr/share/nginx/html

EXPOSE 80

