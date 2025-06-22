# Lightweight Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Expose the app port
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
