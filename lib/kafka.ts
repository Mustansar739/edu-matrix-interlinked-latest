/**
 * ==========================================
 * EDU MATRIX INTERLINKED - KAFKA CLIENT (MAIN APP)
 * ==========================================
 * Kafka integration for main Next.js app
 * For background processing, events, and integrations
 */

import { Kafka } from 'kafkajs'
import { logger } from './utils'

// ==========================================
// KAFKA CLIENT SETUP
// ==========================================

const kafka = new Kafka({
  clientId: 'edu-matrix-main-app',
  brokers: [process.env.KAFKA_BROKERS || 'localhost:29092'],
  connectionTimeout: 10000,
  requestTimeout: 30000,
  retry: {
    initialRetryTime: 100,
    retries: 5,
    maxRetryTime: 30000,
    factor: 2
  }
})

// Producer for sending events
const producer = kafka.producer({
  maxInFlightRequests: 1,
  idempotent: true,
  transactionTimeout: 30000
})

// Consumer for processing events (if needed)
const consumer = kafka.consumer({ 
  groupId: 'main-app-group',
  sessionTimeout: 30000,
  heartbeatInterval: 3000
})

let isConnected = false

// ==========================================
// KAFKA TOPICS FOR MAIN APP
// ==========================================

export const KAFKA_TOPICS = {
  // Background processing
  EMAIL_QUEUE: 'email-queue',
  NOTIFICATION_QUEUE: 'notification-queue',
  FILE_PROCESSING: 'file-processing',
  
  // Business events
  USER_REGISTERED: 'user-registered',
  COURSE_ENROLLED: 'course-enrolled',
  PAYMENT_COMPLETED: 'payment-completed',
  
  // System events
  AUDIT_LOGS: 'audit-logs',
  ANALYTICS_EVENTS: 'analytics-events',
  
  // Integration events
  THIRD_PARTY_SYNC: 'third-party-sync'
}

// ==========================================
// PRODUCER FUNCTIONS
// ==========================================

/**
 * Initialize Kafka producer
 */
export async function initKafka(): Promise<boolean> {
  try {
    await producer.connect()
    isConnected = true
    logger.info('✅ Kafka producer connected (main app)')
    return true
  } catch (error) {
    logger.error('❌ Kafka producer connection failed:', error)
    return false
  }
}

/**
 * Publish event to Kafka
 */
export async function publishEvent(
  topic: string, 
  data: any, 
  key?: string
): Promise<boolean> {
  try {
    if (!isConnected) {
      await initKafka()
    }

    await producer.send({
      topic,
      messages: [
        {
          key: key || data.id || Date.now().toString(),
          value: JSON.stringify({
            ...data,
            timestamp: new Date().toISOString(),
            source: 'main-app'
          })
        }
      ]
    })

    logger.info(`📤 Published event to ${topic}`)
    return true
  } catch (error) {
    logger.error(`❌ Failed to publish to ${topic}:`, error)
    return false
  }
}

// ==========================================
// HIGH-LEVEL EVENT FUNCTIONS
// ==========================================

/**
 * Send email to background queue
 */
export async function queueEmail(emailData: {
  to: string
  subject: string
  template: string
  data: any
}): Promise<boolean> {
  return publishEvent(KAFKA_TOPICS.EMAIL_QUEUE, {
    type: 'send_email',
    ...emailData
  })
}

/**
 * Send notification to background queue
 */
export async function queueNotification(notificationData: {
  userId: string
  type: string
  title: string
  message: string
  data?: any
}): Promise<boolean> {
  return publishEvent(KAFKA_TOPICS.NOTIFICATION_QUEUE, {
    eventType: 'send_notification',
    ...notificationData
  })
}

/**
 * Log audit event
 */
export async function logAudit(auditData: {
  userId: string
  action: string
  resource: string
  details: any
}): Promise<boolean> {
  return publishEvent(KAFKA_TOPICS.AUDIT_LOGS, {
    type: 'audit_log',
    ...auditData
  })
}

/**
 * Track analytics event
 */
export async function trackEvent(eventData: {
  userId?: string
  event: string
  properties: any
}): Promise<boolean> {
  return publishEvent(KAFKA_TOPICS.ANALYTICS_EVENTS, {
    type: 'analytics_event',
    ...eventData
  })
}

/**
 * Publish business event
 */
export async function publishBusinessEvent(
  eventType: 'user_registered' | 'course_enrolled' | 'payment_completed',
  eventData: any
): Promise<boolean> {
  const topicMap = {
    user_registered: KAFKA_TOPICS.USER_REGISTERED,
    course_enrolled: KAFKA_TOPICS.COURSE_ENROLLED,
    payment_completed: KAFKA_TOPICS.PAYMENT_COMPLETED
  }

  return publishEvent(topicMap[eventType], {
    type: eventType,
    ...eventData
  })
}

// ==========================================
// CLEANUP
// ==========================================

/**
 * Gracefully disconnect from Kafka
 */
export async function disconnectKafka(): Promise<void> {
  try {
    await producer.disconnect()
    isConnected = false
    logger.info('✅ Kafka producer disconnected')
  } catch (error) {
    logger.error('❌ Kafka disconnect error:', error)
  }
}

// Export producer for advanced usage
export { producer, consumer, kafka }
