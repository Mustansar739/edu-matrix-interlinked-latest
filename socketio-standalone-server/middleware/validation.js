// ==========================================
// VALIDATION MIDDLEWARE
// ==========================================
// Validates Socket.IO connections and data

const Joi = require('joi');
const { logger } = require('../utils/logger');

/**
 * Connection validation middleware
 */
const validateConnection = (socket, next) => {
  try {
    // Validate handshake data
    const { headers, query, auth } = socket.handshake;
    
    // Check required headers
    if (!headers.origin && !headers.referer) {
      logger.warn('❌ Missing origin/referer header');
      return next(new Error('Invalid request origin'));
    }
    
    // Validate user agent (prevent bot connections)
    if (!headers['user-agent'] || headers['user-agent'].length < 10) {
      logger.warn('❌ Invalid or missing user-agent');
      return next(new Error('Invalid user agent'));
    }
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i
    ];
    
    const userAgent = headers['user-agent'];
    if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
      logger.warn(`❌ Suspicious user agent detected: ${userAgent}`);
      return next(new Error('Unauthorized client'));
    }
    
    // Validate connection source
    const allowedOrigins = process.env.SOCKET_IO_CORS_ORIGIN?.split(',') || ['http://localhost:3000'];
    const origin = headers.origin || headers.referer;
    
    if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      logger.warn(`❌ Invalid origin: ${origin}`);
      return next(new Error('Invalid origin'));
    }
    
    logger.info(`✅ Connection validated from origin: ${origin}`);
    next();
    
  } catch (error) {
    logger.error('❌ Validation middleware error:', error);
    next(new Error('Validation failed'));
  }
};

/**
 * Schema definitions for different event types
 */
const schemas = {
  message: Joi.object({
    roomId: Joi.string().required().min(1).max(100),
    content: Joi.string().required().min(1).max(10000),
    type: Joi.string().valid('text', 'image', 'file', 'audio', 'video').default('text'),
    attachments: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        size: Joi.number().positive().max(100 * 1024 * 1024), // 100MB max
        type: Joi.string().required(),
        url: Joi.string().uri()
      })
    ).max(10),
    replyTo: Joi.string().optional(),
    mentions: Joi.array().items(Joi.string()).max(50)
  }),

  joinRoom: Joi.object({
    roomId: Joi.string().required().min(1).max(100),
    roomType: Joi.string().valid('chat', 'study-group', 'course', 'voice-call', 'general').required()
  }),

  voiceCall: Joi.object({
    callId: Joi.string().required().min(1).max(100),
    targetUserId: Joi.string().required().min(1).max(100),
    roomId: Joi.string().optional(),
    callType: Joi.string().valid('audio', 'video').default('audio')
  }),

  voiceSignal: Joi.object({
    callId: Joi.string().required(),
    to: Joi.string().required(),
    signal: Joi.object().required()
  }),

  studyGroup: Joi.object({
    groupId: Joi.string().required().min(1).max(100),
    name: Joi.string().optional().min(1).max(200),
    description: Joi.string().optional().max(1000),
    isPrivate: Joi.boolean().default(false),
    maxMembers: Joi.number().positive().max(100).default(50)
  }),

  post: Joi.object({
    content: Joi.string().required().min(1).max(10000),
    type: Joi.string().valid('text', 'image', 'video', 'poll', 'file').default('text'),
    attachments: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        size: Joi.number().positive(),
        type: Joi.string().required(),
        url: Joi.string().uri()
      })
    ).max(10),
    visibility: Joi.string().valid('public', 'friends', 'private').default('public'),
    tags: Joi.array().items(Joi.string().min(1).max(50)).max(20)
  }),

  story: Joi.object({
    content: Joi.string().optional().max(1000),
    type: Joi.string().valid('text', 'image', 'video').required(),
    duration: Joi.number().positive().max(86400).default(86400), // 24 hours
    attachment: Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      size: Joi.number().positive(),
      type: Joi.string().required(),
      url: Joi.string().uri()
    }).optional()
  }),

  comment: Joi.object({
    postId: Joi.string().required().min(1).max(100),
    content: Joi.string().required().min(1).max(5000),
    parentId: Joi.string().optional(),
    attachments: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        size: Joi.number().positive(),
        type: Joi.string().required(),
        url: Joi.string().uri()
      })
    ).max(5)
  }),

  like: Joi.object({
    targetId: Joi.string().required().min(1).max(100),
    targetType: Joi.string().valid('post', 'comment', 'story').required(),
    reaction: Joi.string().valid('like', 'love', 'laugh', 'angry', 'sad', 'wow').default('like')
  }),

  presence: Joi.object({
    status: Joi.string().valid('online', 'away', 'busy', 'offline').required(),
    statusMessage: Joi.string().optional().max(200)
  }),

  typing: Joi.object({
    roomId: Joi.string().required().min(1).max(100),
    isTyping: Joi.boolean().required()
  }),

  fileUpload: Joi.object({
    name: Joi.string().required().min(1).max(255),
    size: Joi.number().positive().max(100 * 1024 * 1024), // 100MB max
    type: Joi.string().required(),
    roomId: Joi.string().optional()
  })
};

/**
 * Validate event data
 */
function validateEventData(eventType, data) {
  const schema = schemas[eventType];
  
  if (!schema) {
    throw new Error(`No validation schema found for event type: ${eventType}`);
  }
  
  const { error, value } = schema.validate(data, {
    stripUnknown: true,
    abortEarly: false
  });
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    throw new Error(`Validation failed for ${eventType}: ${errorMessage}`);
  }
  
  return value;
}

/**
 * Sanitize text content
 */
function sanitizeText(text) {
  if (typeof text !== 'string') return text;
  
  // Remove potentially dangerous characters
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Validate file type and size
 */
function validateFile(file) {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  const maxSize = 100 * 1024 * 1024; // 100MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type not allowed: ${file.type}`);
  }
  
  if (file.size > maxSize) {
    throw new Error(`File too large: ${file.size} bytes (max: ${maxSize} bytes)`);
  }
  
  return true;
}

/**
 * Create validation middleware for specific event
 */
function createEventValidator(eventType) {
  return (data, callback) => {
    try {
      const validatedData = validateEventData(eventType, data);
      
      // Sanitize text fields
      if (validatedData.content) {
        validatedData.content = sanitizeText(validatedData.content);
      }
      
      if (validatedData.statusMessage) {
        validatedData.statusMessage = sanitizeText(validatedData.statusMessage);
      }
      
      callback(null, validatedData);
    } catch (error) {
      logger.warn(`❌ Validation failed for ${eventType}:`, error.message);
      callback(error);
    }
  };
}

/**
 * Validate user permissions for room access
 */
function validateRoomAccess(socket, roomId, roomType) {
  // Basic validation - can be extended with database checks
  if (!socket.userId) {
    throw new Error('User not authenticated');
  }
  
  if (!roomId || typeof roomId !== 'string') {
    throw new Error('Invalid room ID');
  }
  
  if (!roomType || typeof roomType !== 'string') {
    throw new Error('Invalid room type');
  }
  
  // Add custom room access logic here
  // For example, check if user is member of private study groups
  
  return true;
}

module.exports = {
  validateConnection,
  validateEventData,
  sanitizeText,
  validateFile,
  createEventValidator,
  validateRoomAccess,
  schemas
};
