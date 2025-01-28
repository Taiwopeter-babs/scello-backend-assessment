# Build stage
FROM node:20 as build

# Create app directory and set permissions
RUN mkdir -p /home/node/app/node_modules/ && chown -R node:node /home/node

WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code with necessary permissions to container
COPY --chown=node:node . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine3.18

# Create app directory and set permissions
RUN mkdir -p /home/node/app/node_modules/ && chown -R node:node /home/node

WORKDIR /home/node/app

# Copy only the production dependencies
COPY package*.json ./
RUN npm install --only=production

# Use non-root user
USER node

# Copy built application from the build stage
COPY --chown=node:node --from=build /home/node/app/dist ./

# Start the application
CMD [ "node", "./dist/app.js" ]