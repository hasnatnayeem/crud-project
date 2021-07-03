# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14.17.1-alpine as builder

# Set the working directory
WORKDIR /app

COPY package.json package-lock.json ./

# Install all the dependencies
RUN npm install

# Add the source code to app
COPY . .

# Generate the build of the application
RUN npm run build --prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.21.0-alpine

COPY --from=builder /app/.nginx/nginx.conf /etc/nginx/nginx.conf
# Copy the build output to replace the default nginx contents.

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/crm /usr/share/nginx/html

# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]