# Use the official Node image to build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server to serve the React app
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build /mus/build /usr/share/nginx/html

# Expose the default port for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]