# ==========================================
# SOCKET.IO STANDALONE SERVER DOCKERFILE - PNPM
# ==========================================
# Multi-stage build with pnpm for production optimization

# Build arguments
ARG NODE_VERSION=22
ARG PNPM_VERSION=9.15.1

# Stage 1: Build stage
FROM node:${NODE_VERSION}-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm@${PNPM_VERSION}

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile --prod

# Stage 2: Development stage (optional)
FROM node:${NODE_VERSION}-alpine AS development

# Install pnpm globally
RUN npm install -g pnpm@${PNPM_VERSION}

# Create app directory
WORKDIR /app

# Install development dependencies and utilities
RUN apk add --no-cache \
    curl \
    tini \
    && addgroup -g 1001 -S nodejs \
    && adduser -S socketio -u 1001

# Copy package files
COPY --chown=socketio:nodejs package.json pnpm-lock.yaml* ./

# Install all dependencies (including dev dependencies)
RUN pnpm install --frozen-lockfile

# Copy application code
COPY --chown=socketio:nodejs . .

# Create required directories
RUN mkdir -p /app/logs /app/uploads /app/temp && \
    chown -R socketio:nodejs /app/logs /app/uploads /app/temp

# Switch to non-root user
USER socketio

# Expose port
EXPOSE 3001

# Development command with nodemon
CMD ["pnpm", "run", "dev"]

# Stage 3: Production stage
FROM node:${NODE_VERSION}-alpine AS production

# Install pnpm globally in production stage
RUN npm install -g pnpm@${PNPM_VERSION}

# Create app directory
WORKDIR /app

# Install production dependencies and utilities
RUN apk add --no-cache \
    curl \
    tini \
    && addgroup -g 1001 -S nodejs \
    && adduser -S socketio -u 1001

# Copy dependencies from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy package files
COPY --chown=socketio:nodejs package.json pnpm-lock.yaml* ./

# Copy application code
COPY --chown=socketio:nodejs . .

# Create required directories
RUN mkdir -p /app/logs /app/uploads /app/temp && \
    chown -R socketio:nodejs /app/logs /app/uploads /app/temp

# Health check script
COPY --chown=socketio:nodejs <<EOF /app/healthcheck.js
const http = require('http');

const options = {
  hostname: 'localhost',
  port: process.env.SOCKET_IO_PORT || 3001,
  path: '/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

req.on('error', () => {
  process.exit(1);
});

req.on('timeout', () => {
  req.destroy();
  process.exit(1);
});

req.end();
EOF

# Switch to non-root user
USER socketio

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=15s --start-period=60s --retries=3 \
  CMD node /app/healthcheck.js

# Use tini as entrypoint for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["node", "server.js"]

# Labels for metadata
LABEL maintainer="edu-matrix-team" \
      version="1.0.0" \
      description="Socket.IO Standalone Server for Edu Matrix Interlinked" \
      org.opencontainers.image.source="https://github.com/edu-matrix/interlinked"
