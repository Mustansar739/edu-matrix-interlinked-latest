// ==========================================
// WINSTON LOGGER CONFIGURATION
// ==========================================
// Production-ready logging with multiple transports

const winston = require('winston');
const path = require('path');

// Log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Log colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};

winston.addColors(colors);

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${message} ${metaString}`;
  })
);

// File format (without colors)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaString}`;
  })
);

// Create logs directory if it doesn't exist
const logDir = path.join(process.cwd(), 'logs');

// Transport configurations
const transports = [
  // Console transport
  new winston.transports.Console({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat
  })
];

// Add file transports only if logs directory exists or can be created
try {
  // Error log file
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  );

  // Combined log file
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 10
    })
  );

  // Socket.IO specific log file
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'socketio.log'),
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  );
} catch (error) {
  console.warn('Could not create file transports, using console only:', error.message);
}

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format: fileFormat,
  transports,
  exitOnError: false
});

// Handle uncaught exceptions and rejections
logger.exceptions.handle(
  new winston.transports.Console({
    format: logFormat
  })
);

logger.rejections.handle(
  new winston.transports.Console({
    format: logFormat
  })
);

// Helper functions for different log types
const logHelpers = {
  // Socket.IO connection logs
  connection: (message, meta = {}) => {
    logger.info(`🔌 ${message}`, { type: 'connection', ...meta });
  },

  // Authentication logs
  auth: (message, meta = {}) => {
    logger.info(`🔐 ${message}`, { type: 'auth', ...meta });
  },

  // Real-time event logs
  realtime: (message, meta = {}) => {
    logger.info(`⚡ ${message}`, { type: 'realtime', ...meta });
  },

  // Error logs with context
  errorWithContext: (message, error, context = {}) => {
    logger.error(`❌ ${message}`, {
      error: error.message,
      stack: error.stack,
      ...context
    });
  },

  // Performance logs
  performance: (message, duration, meta = {}) => {
    logger.info(`⏱️ ${message} (${duration}ms)`, { type: 'performance', duration, ...meta });
  },

  // Kafka logs
  kafka: (message, meta = {}) => {
    logger.info(`📨 ${message}`, { type: 'kafka', ...meta });
  },

  // Redis logs
  redis: (message, meta = {}) => {
    logger.info(`💾 ${message}`, { type: 'redis', ...meta });
  },

  // Security logs
  security: (message, meta = {}) => {
    logger.warn(`🛡️ ${message}`, { type: 'security', ...meta });
  },

  // Rate limiting logs
  rateLimit: (message, meta = {}) => {
    logger.warn(`🚫 ${message}`, { type: 'rateLimit', ...meta });
  }
};

// Performance monitoring
class PerformanceMonitor {
  constructor(operation) {
    this.operation = operation;
    this.startTime = Date.now();
  }

  end(additionalInfo = {}) {
    const duration = Date.now() - this.startTime;
    logHelpers.performance(`${this.operation} completed`, duration, additionalInfo);
    return duration;
  }
}

// Log request/response middleware for Express
const expressLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const level = statusCode >= 400 ? 'error' : 'info';
    
    logger.log(level, `${req.method} ${req.url} - ${statusCode} (${duration}ms)`, {
      type: 'http',
      method: req.method,
      url: req.url,
      statusCode,
      duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });
  });
  
  next();
};

// Socket.IO event logger middleware
const socketEventLogger = (eventName) => {
  return (socket, data, next) => {
    const start = Date.now();
    
    logger.info(`📡 Socket event: ${eventName}`, {
      type: 'socket_event',
      event: eventName,
      userId: socket.userId,
      socketId: socket.id,
      data: typeof data === 'object' ? Object.keys(data) : data
    });
    
    if (next) {
      const originalNext = next;
      next = (error) => {
        const duration = Date.now() - start;
        if (error) {
          logger.error(`❌ Socket event failed: ${eventName} (${duration}ms)`, {
            type: 'socket_event_error',
            event: eventName,
            error: error.message,
            duration
          });
        } else {
          logger.debug(`✅ Socket event completed: ${eventName} (${duration}ms)`, {
            type: 'socket_event_success',
            event: eventName,
            duration
          });
        }
        originalNext(error);
      };
    }
    
    return next;
  };
};

// Export logger and utilities
module.exports = {
  logger,
  logHelpers,
  PerformanceMonitor,
  expressLogger,
  socketEventLogger
};
