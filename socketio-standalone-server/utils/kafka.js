// ==========================================
// KAFKA INTEGRATION FOR REAL-TIME EVENTS
// ==========================================
// Kafka producer and consumer for event-driven messaging

const { Kafka, logLevel } = require('kafkajs');
const { logger } = require('./logger');

// Kafka configuration with improved startup resilience
const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'edu-matrix-socketio',
  brokers: (process.env.KAFKA_BROKERS || 'kafka:9092').split(','),
  logLevel: logLevel.WARN, // Reduce Kafka internal logging but show warnings
  retry: {
    initialRetryTime: 1000,
    retries: 20,
    maxRetryTime: 60000,
    factor: 2,
    multiplier: 1.5,
    restartOnFailure: async (e) => {
      logger.warn('Kafka connection failed, will restart:', e.message);
      return true;
    }
  },
  connectionTimeout: 30000,
  requestTimeout: 90000,
  enforceRequestTimeout: false,
  // Add startup delay to wait for Kafka coordinator
  sasl: undefined,
  ssl: undefined
});

// Topic configurations
const topicConfigs = {
  'user-actions': {
    numPartitions: 3,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'delete' },
      { name: 'retention.ms', value: '604800000' } // 7 days
    ]
  },
  'post-events': {
    numPartitions: 3,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'delete' },
      { name: 'retention.ms', value: '2592000000' } // 30 days
    ]
  },
  'story-events': {
    numPartitions: 2,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'delete' },
      { name: 'retention.ms', value: '86400000' } // 24 hours
    ]
  },
  'comment-events': {
    numPartitions: 3,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'delete' },
      { name: 'retention.ms', value: '2592000000' } // 30 days
    ]
  },
  'like-events': {
    numPartitions: 2,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'delete' },
      { name: 'retention.ms', value: '604800000' } // 7 days
    ]
  },
  'notification-events': {
    numPartitions: 3,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'delete' },
      { name: 'retention.ms', value: '2592000000' } // 30 days
    ]
  },
  'study-group-events': {
    numPartitions: 2,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'delete' },
      { name: 'retention.ms', value: '2592000000' } // 30 days
    ]
  },
  'chat-events': {
    numPartitions: 3,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'delete' },
      { name: 'retention.ms', value: '2592000000' } // 30 days
    ]
  },
  'voice-call-events': {
    numPartitions: 2,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'delete' },
      { name: 'retention.ms', value: '86400000' } // 24 hours
    ]
  },
  'file-events': {
    numPartitions: 2,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'delete' },
      { name: 'retention.ms', value: '2592000000' } // 30 days
    ]
  },
  'presence-events': {
    numPartitions: 2,
    replicationFactor: 1,
    configEntries: [
      { name: 'cleanup.policy', value: 'compact' },
      { name: 'retention.ms', value: '86400000' } // 24 hours
    ]
  }
};

/**
 * Create and configure Kafka producer with startup delay
 */
async function createKafkaProducer() {
  try {
    // Wait for Kafka to be fully ready (group coordinator)
    logger.info('⏳ Waiting for Kafka group coordinator to be ready...');
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
    
    const producer = kafka.producer({
      maxInFlightRequests: 1,
      idempotent: true,
      transactionTimeout: 60000,
      allowAutoTopicCreation: true,
      retry: {
        initialRetryTime: 1000,
        retries: 20,
        maxRetryTime: 60000,
        factor: 2,
        multiplier: 1.5,
        restartOnFailure: async (e) => {
          logger.warn('Kafka producer failed, will restart:', e.message);
          return true;
        }
      }
    });

    // Add retry logic with exponential backoff for producer connection
    let retries = 0;
    const maxRetries = 15;
    
    while (retries < maxRetries) {
      try {
        await producer.connect();
        logger.info('✅ Kafka producer connected successfully');
        break;
      } catch (error) {
        retries++;
        const delay = Math.min(2000 * Math.pow(1.5, retries), 60000);
        logger.warn(`⚠️ Kafka producer connection attempt ${retries}/${maxRetries} failed: ${error.message}, retrying in ${delay}ms...`);
        
        if (retries === maxRetries) {
          throw error;
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Create topics if they don't exist
    await createTopicsIfNotExist();

    return producer;
  } catch (error) {
    logger.error('❌ Failed to create Kafka producer:', error);
    throw error;
  }
}

/**
 * Create and configure Kafka consumer with startup delay
 */
async function createKafkaConsumer(groupId) {
  try {
    // Additional wait for consumer group coordinator
    logger.info(`⏳ Waiting for Kafka consumer group coordinator for group: ${groupId}...`);
    await new Promise(resolve => setTimeout(resolve, 15000)); // Wait 15 seconds for consumer
    
    const consumer = kafka.consumer({
      groupId,
      sessionTimeout: 60000,
      rebalanceTimeout: 120000,
      heartbeatInterval: 5000,
      maxBytesPerPartition: 1048576, // 1MB
      minBytes: 1,
      maxBytes: 10485760, // 10MB
      maxWaitTimeInMs: 10000,
      allowAutoTopicCreation: true,
      retry: {
        initialRetryTime: 1000,
        retries: 20,
        maxRetryTime: 60000,
        factor: 2,
        multiplier: 1.5,
        restartOnFailure: async (e) => {
          logger.warn('Kafka consumer failed, will restart:', e.message);
          return true;
        }
      }
    });

    // Add retry logic with exponential backoff for consumer connection
    let retries = 0;
    const maxRetries = 15;
    
    while (retries < maxRetries) {
      try {
        await consumer.connect();
        logger.info(`✅ Kafka consumer connected successfully with group: ${groupId}`);
        return consumer;
      } catch (error) {
        retries++;
        const delay = Math.min(2000 * Math.pow(1.5, retries), 60000);
        logger.warn(`⚠️ Kafka consumer connection attempt ${retries}/${maxRetries} failed: ${error.message}, retrying in ${delay}ms...`);
        
        if (retries === maxRetries) {
          throw error;
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  } catch (error) {
    logger.error('❌ Failed to create Kafka consumer:', error);
    throw error;
  }
}

/**
 * Create topics if they don't exist with improved error handling
 */
async function createTopicsIfNotExist() {
  try {
    const admin = kafka.admin();
    
    // Add retry logic for admin connection with longer delays
    let retries = 0;
    const maxRetries = 8;
    
    while (retries < maxRetries) {
      try {
        await admin.connect();
        break;
      } catch (error) {
        retries++;
        const delay = Math.min(3000 * Math.pow(1.5, retries), 30000);
        logger.warn(`⚠️ Kafka admin connection attempt ${retries}/${maxRetries} failed: ${error.message}, retrying in ${delay}ms...`);
        
        if (retries === maxRetries) {
          logger.warn('❌ Could not connect to Kafka admin after all retries, skipping topic creation');
          return;
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    // Get existing topics
    const existingTopics = await admin.listTopics();
    
    // Filter out topics that already exist
    const topicsToCreate = Object.entries(topicConfigs)
      .filter(([topic]) => !existingTopics.includes(topic))
      .map(([topic, config]) => ({
        topic,
        ...config
      }));

    if (topicsToCreate.length > 0) {
      await admin.createTopics({
        topics: topicsToCreate
      });
      
      logger.info(`✅ Created Kafka topics: ${topicsToCreate.map(t => t.topic).join(', ')}`);
    } else {
      logger.info('✅ All Kafka topics already exist');
    }

    await admin.disconnect();
  } catch (error) {
    logger.error('❌ Failed to create Kafka topics:', error);
    // Don't throw - topics might already exist
  }
}

/**
 * Publish event to Kafka topic
 */
async function publishEvent(producer, topic, event, key = null) {
  try {
    if (!producer) {
      logger.warn('⚠️ Kafka producer not available, skipping event publication');
      return false;
    }

    const message = {
      key: key || event.id || Date.now().toString(),
      value: JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        source: 'socketio-server'
      }),
      timestamp: Date.now().toString()
    };

    const result = await producer.send({
      topic,
      messages: [message]
    });

    logger.info(`📨 Published event to Kafka topic: ${topic}`, {
      topic,
      key: message.key,
      partition: result[0].partition,
      offset: result[0].offset
    });

    return true;
  } catch (error) {
    logger.error(`❌ Failed to publish event to Kafka topic ${topic}:`, error);
    return false;
  }
}

/**
 * Batch publish events to Kafka
 */
async function publishEventsBatch(producer, events) {
  try {
    if (!producer) {
      logger.warn('⚠️ Kafka producer not available, skipping batch publication');
      return false;
    }

    const topicMessages = {};

    // Group events by topic
    events.forEach(({ topic, event, key }) => {
      if (!topicMessages[topic]) {
        topicMessages[topic] = [];
      }

      topicMessages[topic].push({
        key: key || event.id || Date.now().toString(),
        value: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
          source: 'socketio-server'
        }),
        timestamp: Date.now().toString()
      });
    });

    // Send messages for each topic
    const results = await Promise.all(
      Object.entries(topicMessages).map(([topic, messages]) =>
        producer.send({ topic, messages })
      )
    );

    logger.info(`📨 Published ${events.length} events to Kafka in batch`, {
      topics: Object.keys(topicMessages),
      totalMessages: events.length
    });

    return true;
  } catch (error) {
    logger.error('❌ Failed to publish events batch to Kafka:', error);
    return false;
  }
}

/**
 * Event publishing helpers for different types
 */
const eventPublishers = {
  // User actions (login, logout, profile updates)
  userAction: (producer, action, userId, data = {}) =>
    publishEvent(producer, 'user-actions', {
      id: `user-${userId}-${Date.now()}`,
      action,
      userId,
      ...data
    }, userId),

  // Post events (create, update, delete)
  postEvent: (producer, action, postId, userId, data = {}) =>
    publishEvent(producer, 'post-events', {
      id: `post-${postId}-${Date.now()}`,
      action,
      postId,
      userId,
      ...data
    }, postId),

  // Story events
  storyEvent: (producer, action, storyId, userId, data = {}) =>
    publishEvent(producer, 'story-events', {
      id: `story-${storyId}-${Date.now()}`,
      action,
      storyId,
      userId,
      ...data
    }, storyId),

  // Comment events
  commentEvent: (producer, action, commentId, postId, userId, data = {}) =>
    publishEvent(producer, 'comment-events', {
      id: `comment-${commentId}-${Date.now()}`,
      action,
      commentId,
      postId,
      userId,
      ...data
    }, postId),

  // Like events
  likeEvent: (producer, action, targetId, targetType, userId, data = {}) =>
    publishEvent(producer, 'like-events', {
      id: `like-${targetId}-${userId}-${Date.now()}`,
      action,
      targetId,
      targetType,
      userId,
      ...data
    }, targetId),

  // Notification events
  notificationEvent: (producer, type, userId, data = {}) =>
    publishEvent(producer, 'notification-events', {
      id: `notification-${userId}-${Date.now()}`,
      type,
      userId,
      ...data
    }, userId),

  // Study group events
  studyGroupEvent: (producer, action, groupId, userId, data = {}) =>
    publishEvent(producer, 'study-group-events', {
      id: `group-${groupId}-${Date.now()}`,
      action,
      groupId,
      userId,
      ...data
    }, groupId),

  // Chat events
  chatEvent: (producer, action, roomId, userId, data = {}) =>
    publishEvent(producer, 'chat-events', {
      id: `chat-${roomId}-${Date.now()}`,
      action,
      roomId,
      userId,
      ...data
    }, roomId),

  // Voice call events
  voiceCallEvent: (producer, action, callId, userId, data = {}) =>
    publishEvent(producer, 'voice-call-events', {
      id: `call-${callId}-${Date.now()}`,
      action,
      callId,
      userId,
      ...data
    }, callId),

  // File events
  fileEvent: (producer, action, fileId, userId, data = {}) =>
    publishEvent(producer, 'file-events', {
      id: `file-${fileId}-${Date.now()}`,
      action,
      fileId,
      userId,
      ...data
    }, fileId),

  // Presence events
  presenceEvent: (producer, userId, status, data = {}) =>
    publishEvent(producer, 'presence-events', {
      id: `presence-${userId}`,
      userId,
      status,
      ...data
    }, userId)
};

module.exports = {
  kafka,
  createKafkaProducer,
  createKafkaConsumer,
  publishEvent,
  publishEventsBatch,
  eventPublishers,
  topicConfigs
};
