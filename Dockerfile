# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to the working directory
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application's source code from the host to the container's working directory
COPY . .

# Expose port 4200 to the outside world
EXPOSE 4200

# Command to run the Angular development server with host 0.0.0.0 and polling
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "1000"] 