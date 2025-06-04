// ==========================================
// EDU MATRIX INTERLINKED - SOCKET.IO SERVER
// ==========================================
// Standalone Socket.IO server with NextAuth 5 integration
// Features: Real-time posts, stories, comments, voice chats, study groups and notifications as facebook

require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { createAdapter } = require('@socket.io/redis-adapter');
const Redis = require('ioredis');
const { kafka, createKafkaProducer, createKafkaConsumer } = require('./utils/kafka');
const { logger } = require('./utils/logger');
const { testConnection: testPostgresConnection } = require('./utils/database');
const { authMiddleware } = require('./middleware/auth');
const { rateLimiter } = require('./middleware/rateLimit');
const { validateConnection } = require('./middleware/validation');

// Import event handlers
const { handleConnection } = require('./handlers/connection');
const { handleDisconnection } = require('./handlers/disconnection');
const { handlePostEvents } = require('./handlers/posts');
const { handleStoryEvents } = require('./handlers/stories');
const { handleCommentEvents } = require('./handlers/comments');
const { handleLikeEvents } = require('./handlers/likes');
const { handleVoiceCallEvents } = require('./handlers/voiceCalls');
const { handleStudyGroupEvents } = require('./handlers/studyGroups');
const { handleChatEvents } = require('./handlers/chat');
const { handleNotificationEvents } = require('./handlers/notifications');
const { handleFileEvents } = require('./handlers/files');
const { handlePresenceEvents } = require('./handlers/presence');

// App configuration
const app = express();
const server = createServer(app);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow Socket.IO
  crossOriginEmbedderPolicy: false
}));
app.use(compression());
app.use(cors({
  origin: process.env.SOCKET_IO_CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Redis setup for Socket.IO adapter
const redis = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  family: 4
});

const pubClient = redis;
const subClient = pubClient.duplicate();

// Socket.IO server setup
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_IO_CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST']
  },
  transports: ['websocket', 'polling'],
  pingTimeout: parseInt(process.env.PING_TIMEOUT) || 60000,
  pingInterval: parseInt(process.env.PING_INTERVAL) || 25000,
  maxHttpBufferSize: 1e8, // 100MB for file uploads
  allowEIO3: true
});

// Global variables for tracking
const connectedUsers = new Map();
const activeRooms = new Map();
const activeCalls = new Map();
const userPresence = new Map();

// Kafka setup
let kafkaProducer = null;
let kafkaConsumer = null;

async function initializeServices() {
  try {
    // Test PostgreSQL connection
    const postgresConnected = await testPostgresConnection();
    if (!postgresConnected) {
      throw new Error('PostgreSQL connection failed');
    }
    logger.info('✅ PostgreSQL connected successfully');

    // Connect to Redis
    await redis.connect();
    await subClient.connect();
    logger.info('✅ Redis connected successfully');

    // Set up Redis adapter for Socket.IO clustering
    io.adapter(createAdapter(pubClient, subClient));
    logger.info('✅ Socket.IO Redis adapter configured');

    // Initialize Kafka if enabled
    if (process.env.KAFKA_ENABLED === 'true') {
      kafkaProducer = await createKafkaProducer();
      kafkaConsumer = await createKafkaConsumer('socketio-server');
      
      // Subscribe to relevant topics
      await kafkaConsumer.subscribe({ 
        topics: [
          'user-actions',
          'post-events',
          'story-events',
          'comment-events',
          'like-events',
          'notification-events',
          'study-group-events',
          'chat-events',
          'voice-call-events'
        ] 
      });
      
      logger.info('✅ Kafka producer and consumer initialized');
      
      // Start consuming messages
      await kafkaConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const data = JSON.parse(message.value.toString());
            await handleKafkaMessage(topic, data);
          } catch (error) {
            logger.error('Error processing Kafka message:', error);
          }
        },
      });
    }

  } catch (error) {
    logger.error('❌ Failed to initialize services:', error);
    process.exit(1);
  }
}

// Kafka message handler
async function handleKafkaMessage(topic, data) {
  logger.info(`📨 Received Kafka message from topic: ${topic}`, { data });
  
  switch (topic) {
    case 'post-events':
      io.emit('post:update', data);
      break;
    case 'story-events':
      io.emit('story:update', data);
      break;
    case 'comment-events':
      io.to(`post:${data.postId}`).emit('comment:new', data);
      break;
    case 'like-events':
      io.to(`post:${data.postId}`).emit('like:update', data);
      break;
    case 'notification-events':
      if (data.userId) {
        io.to(`user:${data.userId}`).emit('notification:new', data);
      }
      break;
    case 'study-group-events':
      io.to(`study-group:${data.groupId}`).emit('group:update', data);
      break;
    case 'chat-events':
      io.to(`chat:${data.roomId}`).emit('message:new', data);
      break;
    case 'voice-call-events':
      io.to(`call:${data.callId}`).emit('call:update', data);
      break;
    default:
      logger.warn(`Unknown Kafka topic: ${topic}`);
  }
}

// Socket.IO middleware
io.use(authMiddleware);
io.use(rateLimiter);
io.use(validateConnection);

// Socket.IO event handlers
io.on('connection', async (socket) => {
  const userId = socket.userId;
  const userInfo = socket.userInfo;
  
  logger.info(`👤 User connected: ${userInfo.name || userInfo.email} (${userId})`);
  
  // Track connected user
  connectedUsers.set(userId, {
    socketId: socket.id,
    userId,
    userInfo,
    connectedAt: new Date(),
    rooms: new Set()
  });

  // Update user presence
  userPresence.set(userId, {
    status: 'online',
    lastSeen: new Date(),
    socketId: socket.id
  });

  // Handle connection events
  await handleConnection(socket, io, {
    connectedUsers,
    activeRooms,
    activeCalls,
    userPresence,
    redis,
    kafkaProducer
  });

  // Register all event handlers
  handlePostEvents(socket, io, { connectedUsers, activeRooms, redis, kafkaProducer });
  handleStoryEvents(socket, io, { connectedUsers, activeRooms, redis, kafkaProducer });
  handleCommentEvents(socket, io, { connectedUsers, activeRooms, redis, kafkaProducer });
  handleLikeEvents(socket, io, { connectedUsers, activeRooms, redis, kafkaProducer });
  handleVoiceCallEvents(socket, io, { connectedUsers, activeCalls, redis, kafkaProducer });
  handleStudyGroupEvents(socket, io, { connectedUsers, activeRooms, redis, kafkaProducer });
  handleChatEvents(socket, io, { connectedUsers, activeRooms, redis, kafkaProducer });
  handleNotificationEvents(socket, io, { connectedUsers, redis, kafkaProducer });
  handleFileEvents(socket, io, { connectedUsers, redis, kafkaProducer });
  handlePresenceEvents(socket, io, { connectedUsers, userPresence, redis, kafkaProducer });

  // Handle disconnection
  socket.on('disconnect', async (reason) => {
    await handleDisconnection(socket, io, {
      connectedUsers,
      activeRooms,
      activeCalls,
      userPresence,
      redis,
      kafkaProducer
    }, reason);
  });

  // Emit user online status
  socket.broadcast.emit('user:online', {
    userId,
    userInfo: {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image
    },
    timestamp: new Date()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    connections: connectedUsers.size,
    activeRooms: activeRooms.size,
    activeCalls: activeCalls.size,    services: {
      redis: redis.status === 'ready',
      kafka: kafkaProducer !== null,
      postgres: true, // PostgreSQL connection is tested on startup
      socketio: true
    }
  };
  
  res.json(health);
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.json({
    connectedUsers: Array.from(connectedUsers.values()).map(user => ({
      userId: user.userId,
      connectedAt: user.connectedAt,
      rooms: Array.from(user.rooms)
    })),
    activeRooms: Array.from(activeRooms.entries()).map(([roomId, room]) => ({
      roomId,
      type: room.type,
      users: room.users.length,
      createdAt: room.createdAt
    })),
    activeCalls: Array.from(activeCalls.entries()).map(([callId, call]) => ({
      callId,
      participants: call.participants.length,
      startedAt: call.startedAt,
      type: call.type
    }))
  });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error('Express error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Graceful shutdown
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function gracefulShutdown(signal) {
  logger.info(`🛑 Received ${signal}. Starting graceful shutdown...`);
  
  // Close new connections
  server.close(() => {
    logger.info('✅ HTTP server closed');
  });
  
  // Disconnect all Socket.IO clients
  io.close(() => {
    logger.info('✅ Socket.IO server closed');
  });
  
  // Close Redis connections
  try {
    await redis.disconnect();
    await subClient.disconnect();
    logger.info('✅ Redis connections closed');
  } catch (error) {
    logger.error('❌ Error closing Redis connections:', error);
  }
  
  // Close Kafka connections
  if (kafkaProducer) {
    try {
      await kafkaProducer.disconnect();
      await kafkaConsumer.disconnect();
      logger.info('✅ Kafka connections closed');
    } catch (error) {
      logger.error('❌ Error closing Kafka connections:', error);
    }
  }
  
  logger.info('🏁 Graceful shutdown completed');
  process.exit(0);
}

// Start server
const PORT = process.env.SOCKET_IO_PORT || 3001;
const HOST = process.env.SOCKET_IO_HOST || '0.0.0.0';

async function startServer() {
  try {
    await initializeServices();
    
    server.listen(PORT, HOST, () => {      logger.info(`🚀 Socket.IO server running on ${HOST}:${PORT}`);
      logger.info(`📡 CORS origins: ${process.env.SOCKET_IO_CORS_ORIGIN}`);
      logger.info(`💾 Redis: ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
      logger.info(`📨 Kafka: ${process.env.KAFKA_BROKERS}`);
      logger.info(`🔐 Auth: NextAuth 5 JWT validation enabled`);
      logger.info(`🔑 Internal API: ${process.env.INTERNAL_API_KEY ? 'Enabled' : 'Disabled'} for testing`);
      logger.info(`⚡ Max connections: ${process.env.MAX_CONNECTIONS || 1000}`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = { io, server, redis, kafkaProducer };
