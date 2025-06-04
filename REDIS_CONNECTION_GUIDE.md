# Redis Docker Connection Guide

## Prerequisites
1. Make sure Docker and Docker Compose are installed
2. Copy `.env.example` to `.env` and configure your Redis password

## Step 1: Start Redis Container

```bash
# Start only Redis service
docker-compose up redis -d

# Or start all services including Redis
docker-compose up -d
```

## Step 2: Verify Redis is Running

```bash
# Check if Redis container is running
docker ps | grep redis

# Check Redis logs
docker logs edu-matrix-redis

# Test Redis connection directly
docker exec -it edu-matrix-redis redis-cli ping
```

## Step 3: Test Redis Connection from Next.js

```bash
# Install dependencies if not already installed
npm install ioredis

# Test Redis connection using the test script
npm run test:redis

# Or test via API endpoint (start your Next.js app first)
npm run dev
# Then visit: http://localhost:3000/api/test/redis
```

## Connection Details

### From Host Machine (Next.js App)
- **Host**: localhost
- **Port**: 6379
- **URL**: redis://localhost:6379

### From Docker Container
- **Host**: redis (service name)
- **Port**: 6379
- **URL**: redis://redis:6379

## Environment Variables

Make sure these are set in your `.env` file:

```bash
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password_here
REDIS_URL=redis://:your_redis_password_here@localhost:6379
```

## Common Redis Operations

```typescript
import { redis } from '@/lib/redis-service';

// Set a value
await redis.set('user:123', 'John Doe');

// Set with expiration (in seconds)
await redis.set('session:abc', 'active', 3600);

// Get a value
const value = await redis.get('user:123');

// Store JSON
await redis.setJSON('user:profile:123', { name: 'John', age: 30 });

// Get JSON
const profile = await redis.getJSON('user:profile:123');

// Check if key exists
const exists = await redis.exists('user:123');

// Delete a key
await redis.del('user:123');
```

## Troubleshooting

### Connection Refused
```bash
# Check if Redis container is running
docker ps | grep redis

# If not running, start it
docker-compose up redis -d
```

### Authentication Failed
```bash
# Check your REDIS_PASSWORD in .env file
# Make sure it matches the password in docker-compose.yml
```

### Port Already in Use
```bash
# Check what's using port 6379
netstat -tulpn | grep 6379

# Stop any existing Redis process
sudo systemctl stop redis-server
# or
sudo killall redis-server
```

### Memory Issues
```bash
# Check Redis memory usage
docker exec -it edu-matrix-redis redis-cli info memory
```

## Production Considerations

1. **Security**: Use strong passwords and consider Redis AUTH
2. **Persistence**: Configure RDB and AOF for data persistence
3. **Memory**: Set maxmemory and eviction policies
4. **Monitoring**: Set up Redis monitoring and alerts
5. **Backup**: Regular backups of Redis data

## Useful Redis Commands

```bash
# Connect to Redis CLI
docker exec -it edu-matrix-redis redis-cli

# Inside Redis CLI:
PING                    # Test connection
INFO                    # Server information
KEYS *                  # List all keys (use carefully in production)
FLUSHALL                # Clear all data (DANGEROUS!)
CONFIG GET maxmemory    # Check memory settings
CLIENT LIST             # Show connected clients
```
