/**
 * ==========================================
 * SERVICE HEALTH CHECKER COMPONENT
 * ==========================================
 * Initializes service health checks on app startup
 */

'use client'

import { useEffect } from 'react'

export function ServiceHealthChecker() {
  useEffect(() => {
    // Only run in development mode and on client side
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('\n🔄 Running service health checks...')
      
      // Dynamic import with proper error handling for server-side modules
      const runHealthCheck = async () => {
        try {
          await serviceHealthChecker.checkAllServices()        } catch (error) {
          console.warn('⚠️ Service health check failed (this is normal if server modules are not available):', error instanceof Error ? error.message : String(error))
        }
      }
      
      // Add timeout to make sure it completes
      Promise.race([
        runHealthCheck(),
        new Promise(resolve => setTimeout(resolve, 15000))      ]).catch(error => {
        console.warn('⚠️ Health check timeout or failed:', error instanceof Error ? error.message : String(error))
      })
    }
  }, [])

  // This component renders nothing - it's just for initialization
  return null
}

export default ServiceHealthChecker
