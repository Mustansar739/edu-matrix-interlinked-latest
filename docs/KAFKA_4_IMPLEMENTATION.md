# 🚀 Apache Kafka 4.0 Integration

Welcome to the **EDU Matrix Interlinked** Apache Kafka 4.0 implementation! This guide covers the complete setup and usage of Kafka 4.0 with all its new features.

## 📋 Table of Contents

- [🚀 Apache Kafka 4.0 Integration](#-apache-kafka-40-integration)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Kafka 4.0 New Features](#-kafka-40-new-features)
  - [🎯 Quick Start](#-quick-start)
  - [🛠️ Installation \& Setup](#️-installation--setup)
  - [📦 Architecture Overview](#-architecture-overview)
  - [🔧 Configuration](#-configuration)
  - [📝 Usage Examples](#-usage-examples)
  - [🧪 Testing](#-testing)
  - [📊 Monitoring \& Management](#-monitoring--management)
  - [🔍 Troubleshooting](#-troubleshooting)
  - [📚 API Reference](#-api-reference)
  - [🎯 Best Practices](#-best-practices)

## ✨ Kafka 4.0 New Features

Our implementation leverages the latest Apache Kafka 4.0 features:

### 🆕 **KRaft Mode (No Zookeeper)**
- ✅ Simplified architecture without Zookeeper dependency
- ✅ Faster startup and improved performance
- ✅ Better resource utilization

### ⚡ **Enhanced Performance**
- ✅ Improved LZ4 compression algorithm
- ✅ Better batch processing capabilities
- ✅ Optimized memory management

### 🔒 **Enhanced Security**
- ✅ Improved authentication mechanisms
- ✅ Better encryption support
- ✅ Enhanced authorization features

### 📊 **Better Observability**
- ✅ Enhanced metrics and monitoring
- ✅ Improved logging capabilities
- ✅ Better health checks

## 🎯 Quick Start

### Step 1: Start Kafka 4.0 Services

**For Linux/macOS:**
```bash
npm run kafka:start
```

**For Windows:**
```bash
npm run kafka:start:windows
```

### Step 2: Test the Setup

```bash
npm run kafka:test
```

### Step 3: Start Your Application

```bash
npm run dev
```

## 🛠️ Installation & Setup

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ 
- pnpm (recommended) or npm

### 1. Environment Configuration

Copy the environment template:
```bash
cp .env.example .env
```

Update the Kafka 4.0 configuration in `.env`:
```bash
# Apache Kafka 4.0 Configuration
KAFKA_BROKER="localhost:29092"
KAFKA_CLIENT_ID="edu-matrix-interlinked"
KAFKA_CONSUMER_GROUP="edu-matrix-consumers"
KAFKA_TIMEOUT="30000"
KAFKA_RETRY_ATTEMPTS="8"
KAFKA_COMPRESSION_TYPE="lz4"
```

### 2. Start Services

The Docker Compose configuration includes:
- **Apache Kafka 4.0** (KRaft Mode)
- **PostgreSQL 16**
- **Redis 7**
- **Kafka UI** (Management Interface)
- **Redis Commander** (Redis Management)

```bash
# Start all services
npm run kafka:start

# Check status
npm run kafka:status

# View logs
npm run kafka:logs
```

## 📦 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    EDU Matrix Interlinked                      │
├─────────────────────────────────────────────────────────────────┤
│                      Next.js Application                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │   Producer  │  │   Consumer  │  │    Admin    │  │ Metrics │ │
│  │   Service   │  │   Service   │  │   Service   │  │ Service │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                    Apache Kafka 4.0 (KRaft Mode)              │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │ User Events │  │Course Events│  │Chat Events  │  │Analytics│ │
│  │   Topic     │  │   Topic     │  │   Topic     │  │  Topic  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components

1. **Kafka Configuration** (`lib/kafka/kafka-config.ts`)
2. **Producer Service** (`lib/kafka/producer.ts`)
3. **Consumer Service** (`lib/kafka/consumer.ts`)
4. **Initialization Service** (`lib/kafka/initialization.ts`)

## 🔧 Configuration

### Kafka 4.0 Topics

Our implementation creates the following topics with optimized configurations:

| Topic | Partitions | Use Case | Retention |
|-------|-----------|----------|-----------|
| `user-events` | 6 | User activities | 7 days |
| `course-events` | 4 | Course interactions | 30 days |
| `notification-events` | 3 | Notifications | 3 days |
| `chat-events` | 8 | Real-time chat | 1 day |
| `analytics-events` | 12 | Analytics data | 30 days |

### Environment Variables

```bash
# Core Kafka Settings
KAFKA_BROKER="localhost:29092"
KAFKA_CLIENT_ID="edu-matrix-interlinked"
KAFKA_CONSUMER_GROUP="edu-matrix-consumers"

# Performance Settings
KAFKA_TIMEOUT="30000"
KAFKA_RETRY_ATTEMPTS="8"
KAFKA_BATCH_SIZE="16384"
KAFKA_COMPRESSION_TYPE="lz4"

# Security Settings
KAFKA_SECURITY_PROTOCOL="PLAINTEXT"
KAFKA_SASL_MECHANISM="PLAIN"
```

## 📝 Usage Examples

### Publishing Events

```typescript
import { kafkaProducerService } from '@/lib/kafka';

// User Login Event
await kafkaProducerService.publishUserEvent(
  'user_login',
  'user-123',
  {
    email: 'user@example.com',
    loginTime: new Date().toISOString(),
    userAgent: 'Mozilla/5.0...',
  }
);

// Course Enrollment Event
await kafkaProducerService.publishCourseEvent(
  'course_enroll',
  'course-456',
  'user-123',
  {
    courseName: 'Advanced JavaScript',
    enrollmentDate: new Date().toISOString(),
    paymentStatus: 'completed',
  }
);

// Real-time Chat Event
await kafkaProducerService.publishChatEvent(
  'room-789',
  'user-123',
  {
    message: 'Hello everyone!',
    messageType: 'text',
    timestamp: new Date().toISOString(),
  }
);
```

### Consuming Events

```typescript
import { kafkaConsumerService } from '@/lib/kafka';

// Register User Event Handler
kafkaConsumerService.registerUserEventHandler(async (payload) => {
  const message = JSON.parse(payload.message.value?.toString() || '{}');
  
  switch (message.eventType) {
    case 'user_login':
      // Handle user login
      console.log(`User ${message.userId} logged in`);
      break;
    case 'user_register':
      // Handle user registration
      await sendWelcomeEmail(message.userId);
      break;
  }
});

// Register Course Event Handler
kafkaConsumerService.registerCourseEventHandler(async (payload) => {
  const message = JSON.parse(payload.message.value?.toString() || '{}');
  
  switch (message.eventType) {
    case 'course_enroll':
      // Update enrollment records
      await updateEnrollmentRecords(message);
      break;
    case 'lesson_complete':
      // Update progress
      await updateProgress(message);
      break;
  }
});
```

### Batch Processing

```typescript
import { kafkaProducerService } from '@/lib/kafka';

// Publish Multiple Events at Once
const batchMessages = [
  {
    key: 'user-1',
    value: JSON.stringify({ eventType: 'page_view', userId: 'user-1' }),
  },
  {
    key: 'user-2', 
    value: JSON.stringify({ eventType: 'page_view', userId: 'user-2' }),
  },
];

await kafkaProducerService.publishBatch('analytics-events', batchMessages);
```

## 🧪 Testing

### Run All Tests

```bash
npm run kafka:test
```

### Manual Testing

```typescript
import { initializeKafka4, getKafka4Status } from '@/lib/kafka';

// Initialize Kafka 4.0
await initializeKafka4();

// Check Status
const status = await getKafka4Status();
console.log('Kafka 4.0 Status:', status);
```

### Test Individual Components

```bash
# Test Producer
node -e "
import('./lib/kafka').then(async ({ kafkaProducerService }) => {
  await kafkaProducerService.connect();
  await kafkaProducerService.publishUserEvent('test', 'user-123', { test: true });
  console.log('✅ Producer test successful');
});
"

# Check Consumer Status
npm run kafka:logs
```

## 📊 Monitoring & Management

### Kafka UI Dashboard

Access the Kafka UI at: **http://localhost:8080**

Features:
- ✅ Topic management
- ✅ Message browsing
- ✅ Consumer group monitoring
- ✅ Performance metrics
- ✅ Configuration management

### Health Checks

```typescript
import { checkKafkaHealth, getKafkaMetrics } from '@/lib/kafka';

// Check Health
const isHealthy = await checkKafkaHealth();

// Get Metrics
const metrics = await getKafkaMetrics();
console.log('Kafka Metrics:', metrics);
```

### Docker Commands

```bash
# View Kafka logs
npm run kafka:logs

# Follow logs in real-time
npm run kafka:logs:follow

# Check container status
npm run kafka:status

# Restart Kafka
npm run kafka:restart

# Stop all services
npm run kafka:stop
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Kafka Won't Start

**Problem**: Kafka container fails to start
```bash
# Check logs
npm run kafka:logs

# Common solutions:
docker-compose down --volumes  # Reset volumes
docker system prune -f         # Clean Docker
npm run kafka:start            # Restart
```

#### 2. Connection Issues

**Problem**: Cannot connect to Kafka
```bash
# Check if Kafka is running
docker-compose ps kafka

# Verify ports
netstat -an | grep 9092
netstat -an | grep 29092

# Test connection
telnet localhost 29092
```

#### 3. Consumer Not Receiving Messages

**Problem**: Messages published but not consumed
```typescript
// Check if consumer is registered
const activeConsumers = kafkaConsumerService.getActiveConsumers();
console.log('Active consumers:', activeConsumers);

// Restart consumers
await kafkaConsumerService.stopAllConsumers();
await kafkaConsumerService.startAllConsumers();
```

#### 4. Performance Issues

**Problem**: Slow message processing
```bash
# Check resource usage
docker stats

# Optimize configuration
KAFKA_HEAP_OPTS="-Xmx2G -Xms2G"  # Increase memory
KAFKA_BATCH_SIZE="32768"          # Increase batch size
```

### Debug Mode

Enable debug logging:
```bash
# In .env file
KAFKA_LOG_LEVEL="4"  # DEBUG level

# Or in code
import { kafkaConfig } from '@/lib/kafka/kafka-config';
kafkaConfig.logLevel = 4;
```

## 📚 API Reference

### Producer Service

```typescript
class KafkaProducerService {
  // Connection
  async connect(): Promise<void>
  async disconnect(): Promise<void>
  
  // Event Publishing
  async publishUserEvent(eventType: string, userId: string, data: any): Promise<RecordMetadata[]>
  async publishCourseEvent(eventType: string, courseId: string, userId: string, data: any): Promise<RecordMetadata[]>
  async publishNotificationEvent(notificationType: string, recipientId: string, data: any): Promise<RecordMetadata[]>
  async publishChatEvent(roomId: string, userId: string, messageData: any): Promise<RecordMetadata[]>
  async publishAnalyticsEvent(eventType: string, entityId: string, data: any): Promise<RecordMetadata[]>
  
  // Batch Operations
  async publishBatch(topic: string, messages: Message[]): Promise<RecordMetadata[]>
  async publishTransaction(records: ProducerRecord[]): Promise<RecordMetadata[][]>
}
```

### Consumer Service

```typescript
class KafkaConsumerService {
  // Handler Registration
  registerUserEventHandler(handler: MessageHandler): void
  registerCourseEventHandler(handler: MessageHandler): void
  registerNotificationEventHandler(handler: MessageHandler): void
  registerChatEventHandler(handler: MessageHandler): void
  registerAnalyticsEventHandler(handler: BatchHandler): void
  
  // Consumer Management
  async startConsumer(topic: string, groupId?: string): Promise<void>
  async startAllConsumers(): Promise<void>
  async stopConsumer(topic: string): Promise<void>
  async stopAllConsumers(): Promise<void>
  
  // Status
  getActiveConsumers(): string[]
  isConsumerActive(topic: string): boolean
}
```

### Initialization Service

```typescript
class KafkaInitializationService {
  async initialize(): Promise<void>
  async cleanup(): Promise<void>
  isKafkaInitialized(): boolean
  async getStatus(): Promise<any>
}
```

## 🎯 Best Practices

### 1. **Message Design**

```typescript
// ✅ Good: Include metadata
const message = {
  eventType: 'user_login',
  userId: 'user-123',
  data: { /* event data */ },
  timestamp: new Date().toISOString(),
  version: '4.0',
};

// ❌ Bad: Missing metadata
const message = {
  user: 'user-123',
  action: 'login',
};
```

### 2. **Error Handling**

```typescript
// ✅ Good: Proper error handling
try {
  await kafkaProducerService.publishUserEvent('user_login', userId, data);
} catch (error) {
  console.error('Failed to publish user event:', error);
  // Implement fallback or retry logic
}
```

### 3. **Performance Optimization**

```typescript
// ✅ Good: Use batch publishing for multiple messages
await kafkaProducerService.publishBatch(topic, messages);

// ❌ Bad: Publishing one by one
for (const message of messages) {
  await kafkaProducerService.publishUserEvent(/* ... */);
}
```

### 4. **Topic Configuration**

```typescript
// ✅ Good: Appropriate partitions for scalability
{
  topic: 'high-volume-events',
  numPartitions: 12,  // For high throughput
  replicationFactor: 3,  // For production
}

// ✅ Good: Appropriate retention for use case
{
  configEntries: [
    { name: 'retention.ms', value: '86400000' },  // 1 day for temporary data
    { name: 'retention.ms', value: '2592000000' }, // 30 days for important data
  ]
}
```

### 5. **Monitoring**

```typescript
// ✅ Good: Regular health checks
setInterval(async () => {
  const isHealthy = await checkKafkaHealth();
  if (!isHealthy) {
    // Alert or restart logic
  }
}, 30000);
```

---

## 🎉 Congratulations!

You now have Apache Kafka 4.0 fully integrated with your EDU Matrix Interlinked application! 

### Next Steps:
1. 🚀 Start building real-time features
2. 📊 Implement analytics pipelines  
3. 🔔 Create notification systems
4. 💬 Build chat functionality
5. 📈 Monitor performance and scale

### Support:
- 📚 Check the docs for detailed guides
- 🐛 Report issues on GitHub
- 💬 Join our community discussions

**Happy coding with Apache Kafka 4.0! 🚀**
