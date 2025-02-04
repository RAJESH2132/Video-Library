# # Stage 1: Build the Vite React app
# # FROM node:14 AS build

# FROM node:21.6.1 AS build

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json (for npm install)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN npm run build

# # Stage 2: Serve the build with Nginx
# FROM nginx:alpine

# # Copy the build output from the build stage to Nginx's html directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

FROM node:21.6.1 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
