FROM node:20-slim

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy source
COPY index.js ./

ENV NODE_ENV=production

# Run Node directly (no npm) so signals are delivered to PID 1
ENTRYPOINT ["node", "index.js"]


