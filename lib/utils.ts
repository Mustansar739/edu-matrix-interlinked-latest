import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ==========================================
// LOGGER UTILITY
// ==========================================

interface LogLevel {
  ERROR: 'error'
  WARN: 'warn'
  INFO: 'info'
  DEBUG: 'debug'
}

const LOG_LEVELS: LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  
  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString()
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`
    
    if (data) {
      return `${prefix} ${message} ${JSON.stringify(data, null, 2)}`
    }
    
    return `${prefix} ${message}`
  }
  
  error(message: string, data?: any): void {
    const formatted = this.formatMessage(LOG_LEVELS.ERROR, message, data)
    console.error(formatted)
  }
  
  warn(message: string, data?: any): void {
    const formatted = this.formatMessage(LOG_LEVELS.WARN, message, data)
    console.warn(formatted)
  }
  
  info(message: string, data?: any): void {
    const formatted = this.formatMessage(LOG_LEVELS.INFO, message, data)
    console.log(formatted)
  }
  
  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      const formatted = this.formatMessage(LOG_LEVELS.DEBUG, message, data)
      console.debug(formatted)
    }
  }
}

export const logger = new Logger()

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Format error for consistent error handling
 */
export function formatError(error: unknown): { message: string; stack?: string } {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack
    }
  }
  
  if (typeof error === 'string') {
    return { message: error }
  }
  
  return { message: 'Unknown error occurred' }
}

/**
 * Validate environment variables
 */
export function validateEnv(requiredVars: string[]): void {
  const missing = requiredVars.filter(varName => !process.env[varName])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

/**
 * Sleep utility for delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number
    delay?: number
    backoff?: number
  } = {}
): Promise<T> {
  const { retries = 3, delay = 1000, backoff = 2 } = options
  
  let lastError: Error | unknown
  
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      if (i === retries) {
        throw error
      }
      
      const waitTime = delay * Math.pow(backoff, i)
      await sleep(waitTime)
    }
  }
  
  throw lastError
}
