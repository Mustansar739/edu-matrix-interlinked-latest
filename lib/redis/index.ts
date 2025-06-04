/**
 * Redis Configuration for Next.js Application
 * Official ioredis setup with proper error handling and connection management
 */

import Redis from 'ioredis';

// Redis configuration interface
interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
  retryDelayOnFailover: number;
  enableReadyCheck: boolean;
  maxRetriesPerRequest: number;
  lazyConnect: boolean;
}

// Get Redis configuration from environment variables
const getRedisConfig = (): RedisConfig => {
  const config: RedisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: 0,
    retryDelayOnFailover: 100,
    enableReadyCheck: false,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  };

  return config;
};

// Create Redis instance
const createRedisInstance = (): Redis => {
  const config = getRedisConfig();
  
  const redis = new Redis(config);

  // Connection event handlers
  redis.on('connect', () => {
    console.log('✅ Redis connected successfully');
  });

  redis.on('ready', () => {
    console.log('✅ Redis ready to accept commands');
  });

  redis.on('error', (error) => {
    console.error('❌ Redis connection error:', error);
  });

  redis.on('close', () => {
    console.log('⚠️ Redis connection closed');
  });

  redis.on('reconnecting', () => {
    console.log('🔄 Redis reconnecting...');
  });

  return redis;
};

// Global Redis instance
let redis: Redis | null = null;

// Get Redis instance (Singleton pattern)
export const getRedis = (): Redis => {
  if (!redis) {
    redis = createRedisInstance();
  }
  return redis;
};

// Close Redis connection
export const closeRedis = async (): Promise<void> => {
  if (redis) {
    await redis.quit();
    redis = null;
  }
};

// Export default Redis instance
export default getRedis();
