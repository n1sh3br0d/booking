FROM node:16 as build

WORKDIR /tmp/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source
COPY . .

# Build
RUN npm run build

# -------------------
FROM node:16-alpine

WORKDIR /app

# Copy source
COPY . .

# Copy built files
COPY --from=build /tmp/app/dist .

# Start server
CMD ["node", "main"]
