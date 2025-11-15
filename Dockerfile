# Use official Node.js as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app will run on (e.g., 4000)
EXPOSE 4000

# Start the app
CMD ["npm", "run", "start"]
