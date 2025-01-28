# Build stage
FROM node:20 AS build

WORKDIR /home/scelloo/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine3.18

# Create app directory and set permissions
WORKDIR /home/scelloo/app

# Copy only the production dependencies
COPY package*.json ./
RUN npm install --only=production

# Use non-root user
USER node

# Copy built application from the build stage
COPY --from=build /home/scelloo/app/dist ./

EXPOSE 5000

# Start the application
CMD [ "node", "./dist/app.js" ]