// ==========================================
// NEXTAUTH 5 JWT AUTHENTICATION MIDDLEWARE
// ==========================================
// Validates NextAuth 5 JWT tokens for Socket.IO connections

const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger');

/**
 * NextAuth 5 JWT Authentication Middleware for Socket.IO
 * Validates JWT tokens and extracts user information
 */
const authMiddleware = async (socket, next) => {
  try {
    // Check for internal API key first (for testing/internal services)
    const internalApiKey = process.env.INTERNAL_API_KEY;
    const providedApiKey = socket.handshake.headers['x-api-key'] || 
                          socket.handshake.auth?.apiKey ||
                          socket.handshake.query?.apiKey;
    
    if (internalApiKey && providedApiKey === internalApiKey) {
      // Internal API authentication - create a test user context
      socket.userId = 'internal-test-user';
      socket.userInfo = {
        id: 'internal-test-user',
        name: 'Internal Test User',
        email: 'test@internal.local',
        role: 'internal'
      };
      socket.tokenPayload = { sub: 'internal-test-user', type: 'internal' };
      
      logger.info('✅ Internal API key authenticated: Internal Test User (internal-test-user)');
      return next();
    }
    
    // Extract JWT token from different possible sources
    let token = null;
    
    // 1. Check Authorization header
    const authHeader = socket.handshake.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    // 2. Check query parameters
    if (!token && socket.handshake.query.token) {
      token = socket.handshake.query.token;
    }
    
    // 3. Check auth object (for NextAuth sessions)
    if (!token && socket.handshake.auth && socket.handshake.auth.token) {
      token = socket.handshake.auth.token;
    }
    
    // 4. Check cookies (NextAuth 5 session tokens)
    if (!token && socket.handshake.headers.cookie) {
      const cookies = parseCookies(socket.handshake.headers.cookie);
      // NextAuth 5 uses different cookie names based on configuration
      token = cookies['next-auth.session-token'] || 
              cookies['__Secure-next-auth.session-token'] ||
              cookies['authjs.session-token'] ||
              cookies['__Secure-authjs.session-token'];
    }
    
    if (!token) {
      logger.warn('❌ No authentication token provided');
      return next(new Error('Authentication token required'));
    }
    
    // Verify JWT token
    let decoded;
    try {
      // Try with NextAuth secret first
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET);
    } catch (jwtError) {
      // If NextAuth secret fails, try with JWT_SECRET
      if (process.env.JWT_SECRET && process.env.JWT_SECRET !== process.env.NEXTAUTH_SECRET) {
        try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (secondError) {
          logger.error('❌ JWT verification failed with both secrets:', {
            nextAuthError: jwtError.message,
            jwtSecretError: secondError.message
          });
          return next(new Error('Invalid authentication token'));
        }
      } else {
        logger.error('❌ JWT verification failed:', jwtError.message);
        return next(new Error('Invalid authentication token'));
      }
    }
    
    // Extract user information from token
    const userInfo = extractUserInfo(decoded);
    
    if (!userInfo.id) {
      logger.error('❌ No user ID found in token payload:', decoded);
      return next(new Error('Invalid token payload'));
    }
    
    // Attach user information to socket
    socket.userId = userInfo.id;
    socket.userInfo = userInfo;
    socket.tokenPayload = decoded;
    
    logger.info(`✅ User authenticated: ${userInfo.name || userInfo.email} (${userInfo.id})`);
    next();
    
  } catch (error) {
    logger.error('❌ Authentication middleware error:', error);
    next(new Error('Authentication failed'));
  }
};

/**
 * Extract user information from JWT payload
 * Handles different NextAuth 5 token structures
 */
function extractUserInfo(payload) {
  // NextAuth 5 can have different token structures
  const userInfo = {
    id: null,
    email: null,
    name: null,
    image: null,
    role: null
  };
  
  // Direct properties (common in custom JWT tokens)
  if (payload.id || payload.sub) {
    userInfo.id = payload.id || payload.sub;
    userInfo.email = payload.email;
    userInfo.name = payload.name;
    userInfo.image = payload.image || payload.picture;
    userInfo.role = payload.role;
  }
  
  // NextAuth 5 user object structure
  if (payload.user) {
    userInfo.id = payload.user.id;
    userInfo.email = payload.user.email;
    userInfo.name = payload.user.name;
    userInfo.image = payload.user.image;
    userInfo.role = payload.user.role;
  }
  
  // NextAuth 5 profile structure
  if (payload.profile) {
    userInfo.id = userInfo.id || payload.profile.id || payload.profile.sub;
    userInfo.email = userInfo.email || payload.profile.email;
    userInfo.name = userInfo.name || payload.profile.name;
    userInfo.image = userInfo.image || payload.profile.image || payload.profile.picture;
  }
  
  // Fallback to common JWT claims
  if (!userInfo.id) {
    userInfo.id = payload.sub || payload.userId || payload.user_id;
  }
  
  if (!userInfo.email) {
    userInfo.email = payload.email;
  }
  
  if (!userInfo.name) {
    userInfo.name = payload.name || payload.given_name || payload.nickname;
  }
  
  return userInfo;
}

/**
 * Parse cookies from cookie header string
 */
function parseCookies(cookieHeader) {
  const cookies = {};
  
  if (!cookieHeader) return cookies;
  
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.trim().split('=');
    if (parts.length === 2) {
      const [name, value] = parts;
      cookies[name] = decodeURIComponent(value);
    }
  });
  
  return cookies;
}

/**
 * Optional: Create a token for testing purposes
 */
function createTestToken(userInfo) {
  return jwt.sign(
    {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      image: userInfo.image,
      role: userInfo.role || 'user',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    },
    process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET
  );
}

/**
 * Verify user permissions for specific actions
 */
function verifyPermissions(socket, requiredRole = 'user') {
  const userRole = socket.userInfo.role || 'user';
  const roleHierarchy = {
    'user': 0,
    'moderator': 1,
    'admin': 2,
    'super_admin': 3
  };
  
  const userLevel = roleHierarchy[userRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;
  
  return userLevel >= requiredLevel;
}

/**
 * Rate limiting based on user role
 */
function getRateLimitForUser(socket) {
  const userRole = socket.userInfo.role || 'user';
  
  const rateLimits = {
    'user': { points: 100, duration: 60 }, // 100 actions per minute
    'moderator': { points: 200, duration: 60 }, // 200 actions per minute
    'admin': { points: 500, duration: 60 }, // 500 actions per minute
    'super_admin': { points: 1000, duration: 60 } // 1000 actions per minute
  };
  
  return rateLimits[userRole] || rateLimits['user'];
}

module.exports = {
  authMiddleware,
  extractUserInfo,
  createTestToken,
  verifyPermissions,
  getRateLimitForUser
};
