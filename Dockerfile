# 1. Use an official Node.js runtime as the base image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files and install dependencies
# Doing this before copying the full code allows Docker to cache layers
COPY package*.json ./

RUN npm install

# 4. Copy the rest of your application code
COPY . .

# 5. Expose the port your app runs on
EXPOSE 3000

# 6. Command to run your app
CMD ["node", "index.js"]