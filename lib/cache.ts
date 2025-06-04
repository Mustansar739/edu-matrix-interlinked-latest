/**
 * Cache Service using Redis
 * Official ioredis implementation for caching and rate limiting
 */

import { getRedis } from '@/lib/redis';
import type Redis from 'ioredis';

// Rate limit result interface
interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

// Cache service class
class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = getRedis();
  }

  /**
   * Set cache with expiration
   * @param key - Cache key
   * @param value - Value to cache (will be JSON stringified)
   * @param ttl - Time to live in seconds
   */
  async setCache<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await this.redis.setex(key, ttl, serializedValue);
    } catch (error) {
      console.error('Cache set error:', error);
      throw new Error('Failed to set cache');
    }
  }

  /**
   * Get cache value
   * @param key - Cache key
   * @returns Parsed cache value or null if not found
   */
  async getCache<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Delete cache key
   * @param key - Cache key to delete
   */
  async deleteCache(key: string): Promise<boolean> {
    try {
      const result = await this.redis.del(key);
      return result > 0;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  /**
   * Check if cache key exists
   * @param key - Cache key
   */
  async hasCache(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }

  /**
   * Rate limiting using Redis sliding window
   * @param key - Rate limit key
   * @param limit - Maximum requests allowed
   * @param window - Time window in seconds
   */
  async checkRateLimit(key: string, limit: number, window: number): Promise<RateLimitResult> {
    try {
      const now = Date.now();
      const windowStart = now - (window * 1000);

      // Use Redis pipeline for atomic operations
      const pipeline = this.redis.pipeline();
      
      // Remove expired entries
      pipeline.zremrangebyscore(key, 0, windowStart);
      
      // Count current requests in window
      pipeline.zcard(key);
      
      // Add current request
      pipeline.zadd(key, now, now);
      
      // Set expiration
      pipeline.expire(key, window);

      const results = await pipeline.exec();
      
      if (!results) {
        throw new Error('Pipeline execution failed');
      }

      // Get count from zcard result
      const count = results[1][1] as number;
      const allowed = count < limit;
      const remaining = Math.max(0, limit - count - 1);
      const resetTime = now + (window * 1000);

      return {
        allowed,
        remaining,
        resetTime
      };
    } catch (error) {
      console.error('Rate limit check error:', error);
      // Fail open - allow request if Redis is down
      return {
        allowed: true,
        remaining: limit - 1,
        resetTime: Date.now() + (window * 1000)
      };
    }
  }

  /**
   * Increment counter with expiration
   * @param key - Counter key
   * @param ttl - Time to live in seconds
   */
  async incrementCounter(key: string, ttl: number = 3600): Promise<number> {
    try {
      const pipeline = this.redis.pipeline();
      pipeline.incr(key);
      pipeline.expire(key, ttl);
      
      const results = await pipeline.exec();
      return results?.[0][1] as number || 0;
    } catch (error) {
      console.error('Counter increment error:', error);
      return 0;
    }
  }

  /**
   * Get counter value
   * @param key - Counter key
   */
  async getCounter(key: string): Promise<number> {
    try {
      const value = await this.redis.get(key);
      return value ? parseInt(value, 10) : 0;
    } catch (error) {
      console.error('Counter get error:', error);
      return 0;
    }
  }
}

// Create singleton instance
const cacheService = new CacheService();

// Export individual functions for backward compatibility
export const setCache = <T>(key: string, value: T, ttl?: number) => 
  cacheService.setCache(key, value, ttl);

export const getCache = <T>(key: string) => 
  cacheService.getCache<T>(key);

export const deleteCache = (key: string) => 
  cacheService.deleteCache(key);

export const hasCache = (key: string) => 
  cacheService.hasCache(key);

export const checkRateLimit = (key: string, limit: number, window: number) => 
  cacheService.checkRateLimit(key, limit, window);

export const incrementCounter = (key: string, ttl?: number) => 
  cacheService.incrementCounter(key, ttl);

export const getCounter = (key: string) => 
  cacheService.getCounter(key);

// Export cache service instance
export { cacheService };

// Export default
export default cacheService;
