// ==========================================
// RATE LIMITING MIDDLEWARE
// ==========================================
// Prevents spam and abuse of Socket.IO connections

const { RateLimiterRedis } = require('rate-limiter-flexible');
const { logger } = require('../utils/logger');
const { getRateLimitForUser } = require('./auth');

// Redis client for rate limiting
let redisClient = null;

// Rate limiters for different actions
const rateLimiters = {
  connection: null,
  message: null,
  voice_call: null,
  file_upload: null
};

/**
 * Initialize rate limiters with Redis
 */
function initializeRateLimiters(redis) {
  redisClient = redis;
  
  // Connection rate limiter (per IP)
  rateLimiters.connection = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rl_connection',
    points: 10, // Number of connections
    duration: 60, // Per 60 seconds
    blockDuration: 300, // Block for 5 minutes
  });
  
  // Message rate limiter (per user)
  rateLimiters.message = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rl_message',
    points: 60, // Number of messages
    duration: 60, // Per 60 seconds
    blockDuration: 60, // Block for 1 minute
  });
  
  // Voice call rate limiter (per user)
  rateLimiters.voice_call = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rl_voice',
    points: 5, // Number of call attempts
    duration: 300, // Per 5 minutes
    blockDuration: 600, // Block for 10 minutes
  });
  
  // File upload rate limiter (per user)
  rateLimiters.file_upload = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rl_upload',
    points: 10, // Number of uploads
    duration: 60, // Per 60 seconds
    blockDuration: 300, // Block for 5 minutes
  });
  
  logger.info('✅ Rate limiters initialized with Redis');
}

/**
 * Connection rate limiting middleware
 */
const rateLimiter = async (socket, next) => {
  try {
    if (!rateLimiters.connection) {
      return next(); // Skip if not initialized
    }
    
    const clientIP = socket.handshake.address;
    
    await rateLimiters.connection.consume(clientIP);
    next();
    
  } catch (rejRes) {
    const msBeforeNext = Math.round(rejRes.msBeforeNext) || 300000;
    
    logger.warn(`🚫 Connection rate limit exceeded for IP: ${socket.handshake.address}`);
    
    socket.emit('error', {
      type: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many connection attempts. Please try again later.',
      retryAfter: msBeforeNext
    });
    
    next(new Error('Rate limit exceeded'));
  }
};

/**
 * Message rate limiting
 */
async function checkMessageRateLimit(socket) {
  try {
    if (!rateLimiters.message || !socket.userId) {
      return true; // Skip if not initialized or no user
    }
    
    // Get user-specific rate limits
    const userLimits = getRateLimitForUser(socket);
    
    // Create user-specific rate limiter
    const userMessageLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: `rl_msg_${socket.userInfo.role || 'user'}`,
      points: userLimits.points,
      duration: userLimits.duration,
      blockDuration: 60,
    });
    
    await userMessageLimiter.consume(socket.userId);
    return true;
    
  } catch (rejRes) {
    const msBeforeNext = Math.round(rejRes.msBeforeNext) || 60000;
    
    logger.warn(`🚫 Message rate limit exceeded for user: ${socket.userId}`);
    
    socket.emit('error', {
      type: 'MESSAGE_RATE_LIMIT',
      message: 'Too many messages. Please slow down.',
      retryAfter: msBeforeNext
    });
    
    return false;
  }
}

/**
 * Voice call rate limiting
 */
async function checkVoiceCallRateLimit(socket) {
  try {
    if (!rateLimiters.voice_call || !socket.userId) {
      return true;
    }
    
    await rateLimiters.voice_call.consume(socket.userId);
    return true;
    
  } catch (rejRes) {
    const msBeforeNext = Math.round(rejRes.msBeforeNext) || 600000;
    
    logger.warn(`🚫 Voice call rate limit exceeded for user: ${socket.userId}`);
    
    socket.emit('error', {
      type: 'VOICE_CALL_RATE_LIMIT',
      message: 'Too many call attempts. Please wait before trying again.',
      retryAfter: msBeforeNext
    });
    
    return false;
  }
}

/**
 * File upload rate limiting
 */
async function checkFileUploadRateLimit(socket) {
  try {
    if (!rateLimiters.file_upload || !socket.userId) {
      return true;
    }
    
    await rateLimiters.file_upload.consume(socket.userId);
    return true;
    
  } catch (rejRes) {
    const msBeforeNext = Math.round(rejRes.msBeforeNext) || 300000;
    
    logger.warn(`🚫 File upload rate limit exceeded for user: ${socket.userId}`);
    
    socket.emit('error', {
      type: 'FILE_UPLOAD_RATE_LIMIT',
      message: 'Too many file uploads. Please wait before uploading again.',
      retryAfter: msBeforeNext
    });
    
    return false;
  }
}

/**
 * Generic action rate limiting
 */
async function checkActionRateLimit(socket, action, customLimits = null) {
  try {
    const limits = customLimits || getRateLimitForUser(socket);
    
    const actionLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: `rl_${action}_${socket.userInfo.role || 'user'}`,
      points: limits.points,
      duration: limits.duration,
      blockDuration: 60,
    });
    
    await actionLimiter.consume(socket.userId);
    return true;
    
  } catch (rejRes) {
    const msBeforeNext = Math.round(rejRes.msBeforeNext) || 60000;
    
    logger.warn(`🚫 ${action} rate limit exceeded for user: ${socket.userId}`);
    
    socket.emit('error', {
      type: 'ACTION_RATE_LIMIT',
      action,
      message: `Too many ${action} actions. Please slow down.`,
      retryAfter: msBeforeNext
    });
    
    return false;
  }
}

/**
 * Get rate limit info for a user
 */
async function getRateLimitInfo(userId, action = 'message') {
  try {
    if (!redisClient) return null;
    
    const key = `rl_${action}:${userId}`;
    const info = await rateLimiters[action]?.get(userId);
    
    return {
      remaining: info ? info.remainingPoints : null,
      reset: info ? new Date(Date.now() + info.msBeforeNext) : null,
      limit: rateLimiters[action]?.points || null
    };
  } catch (error) {
    logger.error('Error getting rate limit info:', error);
    return null;
  }
}

/**
 * Reset rate limit for a user (admin function)
 */
async function resetRateLimit(userId, action = 'message') {
  try {
    if (!rateLimiters[action]) return false;
    
    await rateLimiters[action].delete(userId);
    logger.info(`Rate limit reset for user ${userId}, action: ${action}`);
    return true;
  } catch (error) {
    logger.error('Error resetting rate limit:', error);
    return false;
  }
}

module.exports = {
  rateLimiter,
  initializeRateLimiters,
  checkMessageRateLimit,
  checkVoiceCallRateLimit,
  checkFileUploadRateLimit,
  checkActionRateLimit,
  getRateLimitInfo,
  resetRateLimit
};
