# 🧪 Production Readiness Testing Scripts

This directory contains comprehensive testing scripts to verify that all critical services in the Edu Matrix Interlinked system are ready for production deployment.

## 📋 Available Tests

### 🗄️ Database Test (`test-database.js`)
Tests PostgreSQL database connectivity, schema validation, and performance:
- ✅ Connection pooling and basic connectivity
- ✅ Multi-schema validation (11 schemas)
- ✅ CRUD operations and transactions
- ✅ Performance testing with bulk operations
- ✅ Index validation and query optimization
- ✅ Backup readiness assessment

### 🔴 Redis Test (`test-redis.js`)
Tests Redis cache connectivity, operations, and performance:
- ✅ Connection and authentication
- ✅ Basic operations (SET/GET, Hash, List)
- ✅ Performance testing (1000 operations)
- ✅ Memory usage monitoring
- ✅ Persistence configuration check

### 📨 Kafka Test (`test-kafka.js`)
Tests Apache Kafka message queue functionality:
- ✅ Broker connectivity and cluster health
- ✅ Topic management (create/list/delete)
- ✅ Producer functionality with message batching
- ✅ Consumer functionality with group management
- ✅ Performance testing (1000 messages)
- ✅ Metadata and partition validation

### ⚡ Socket.IO Test (`test-socketio.js`)
Tests real-time communication server:
- ✅ WebSocket connectivity and handshake
- ✅ Authentication flow validation
- ✅ Real-time messaging (ping/pong)
- ✅ Room functionality and broadcasting
- ✅ Performance testing (50 concurrent connections)
- ✅ Reconnection and error handling

### 🚀 Master Test Runner (`test-all.js`)
Runs all tests in sequence and provides comprehensive reporting.

## 🛠️ Usage

### Run Individual Tests

```bash
# Test database connectivity and performance
npm run test:database

# Test Redis cache operations
npm run test:redis

# Test Kafka message queue
npm run test:kafka

# Test Socket.IO real-time features
npm run test:socketio
```

### Run All Tests

```bash
# Run comprehensive production readiness test
npm run test:production

# Alternative command
npm run health:check
```

### Manual Execution

```bash
# Run tests directly with Node.js
node scripts/test-database.js
node scripts/test-redis.js
node scripts/test-kafka.js
node scripts/test-socketio.js
node scripts/test-all.js
```

## 📊 Expected Output

### ✅ Production Ready Output
```
🎉 EDU MATRIX INTERLINKED - ALL SERVICES PRODUCTION READY!
📈 Tests Passed: 4/4
⏱️ Total Duration: 45s

📋 Individual Test Results:
   ✅ PASS PostgreSQL Database (12s)
   ✅ PASS Redis Cache (8s)
   ✅ PASS Apache Kafka (15s)
   ✅ PASS Socket.IO Server (10s)
```

### ⚠️ Issues Detected Output
```
⚠️ PRODUCTION READINESS ISSUES DETECTED
📈 Tests Passed: 2/4
⏱️ Total Duration: 30s

📋 Individual Test Results:
   ✅ PASS PostgreSQL Database (12s)
   ❌ FAIL Redis Cache (5s)
   ❌ FAIL Apache Kafka (8s)
   ✅ PASS Socket.IO Server (10s)
```

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Failed
```bash
# Check PostgreSQL container
docker ps | grep postgres
docker logs edu-matrix-postgres

# Test manual connection
docker exec -it edu-matrix-postgres psql -U postgres -d edu_matrix_interlinked
```

#### Redis Connection Failed
```bash
# Check Redis container
docker ps | grep redis
docker logs edu-matrix-redis

# Test manual connection
docker exec -it edu-matrix-redis redis-cli ping
```

#### Kafka Connection Failed
```bash
# Check Kafka containers
docker ps | grep kafka
docker logs edu-matrix-kafka
docker logs edu-matrix-zookeeper

# Test manual connection
docker exec -it edu-matrix-kafka kafka-topics.sh --bootstrap-server localhost:9092 --list
```

#### Socket.IO Connection Failed
```bash
# Check if Socket.IO server is running
curl http://localhost:3001/socket.io/socket.io.js

# Check if standalone server is started
cd socketio-standalone-server && npm start
```

### Environment Variables

Ensure these environment variables are set in your `.env` file:

```env
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=edu_matrix_interlinked
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# Kafka
KAFKA_BROKERS=localhost:9092

# Socket.IO
SOCKETIO_URL=http://localhost:3001
```

## 🏗️ Prerequisites

### Required Services Running
```bash
# Start all services with Docker Compose
docker-compose up -d

# Verify all containers are running
docker ps
```

### Required Dependencies
The testing scripts use the following packages (already included in package.json):
- `pg` - PostgreSQL client
- `ioredis` - Redis client
- `kafkajs` - Kafka client
- `socket.io-client` - Socket.IO client

## 📈 Performance Benchmarks

### Expected Performance Metrics

| Service | Test | Expected Performance | Production Ready Threshold |
|---------|------|---------------------|---------------------------|
| PostgreSQL | 1000 INSERT operations | < 5 seconds | ✅ |
| PostgreSQL | SELECT with COUNT | < 100ms | ✅ |
| Redis | 1000 SET operations | < 5 seconds | ✅ |
| Redis | Basic GET/SET | < 10ms | ✅ |
| Kafka | 1000 message produce | < 5 seconds | ✅ |
| Kafka | Topic management | < 2 seconds | ✅ |
| Socket.IO | 50 concurrent connections | < 10 seconds | ✅ |
| Socket.IO | Message roundtrip | < 50ms | ✅ |

## 🔄 Continuous Integration

These scripts can be integrated into your CI/CD pipeline:

```yaml
# Example GitHub Actions step
- name: Run Production Readiness Tests
  run: |
    docker-compose up -d
    sleep 30  # Wait for services to start
    npm run test:production
```

## 📞 Support

If tests are failing and you need assistance:

1. Check the detailed error messages in the test output
2. Review Docker container logs
3. Verify environment configuration
4. Ensure all required services are running
5. Check network connectivity between services

For additional help, refer to the main project documentation or contact the development team.
