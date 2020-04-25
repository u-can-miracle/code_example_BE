# Use node 11.10.1
FROM node:11.10.1


# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Share dependencies
VOLUME /node_modules

# Expose API port to the outside
EXPOSE 3001

# Launch application
CMD ["npm","run", "dev"]
