/**
 * ==========================================
 * PASSWORD UTILITIES - SERVER-ONLY
 * ==========================================
 * Separate password utilities to avoid Edge Runtime issues
 */

import 'server-only'
import bcrypt from "bcryptjs"
import { logger } from "./utils"

/**
 * Hash password using bcryptjs (Node.js runtime only)
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  } catch (error) {
    logger.error('Password hashing failed:', error)
    throw new Error('Password hashing failed')
  }
}

/**
 * Verify password using bcryptjs (Node.js runtime only)
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    logger.error('Password verification failed:', error)
    return false
  }
}

/**
 * Generate salt using bcryptjs (Node.js runtime only)
 */
export async function generateSalt(rounds = 12): Promise<string> {
  try {
    return await bcrypt.genSalt(rounds)
  } catch (error) {
    logger.error('Salt generation failed:', error)
    throw new Error('Salt generation failed')
  }
}
