/**
 * ==========================================
 * CLIENT-SIDE HEALTH MONITOR COMPONENT
 * ==========================================
 * Monitors service health via API calls (no server imports)
 */

'use client'

import { useEffect } from 'react'

export function ClientHealthMonitor() {
  useEffect(() => {
    // Only run in development mode and on client side
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('\n🔄 Running client-side health check...')
      
      const runHealthCheck = async () => {
        try {
          const response = await fetch('/api/health', {
            headers: {
              'User-Agent': 'health-check-client'
            }
          })
          
          if (response.ok) {
            const healthData = await response.json()
            console.log('✅ Health check completed:', healthData)
          } else {
            console.warn('⚠️ Health check returned non-OK status:', response.status)
          }
        } catch (error) {
          console.warn('⚠️ Health check failed:', error instanceof Error ? error.message : String(error))
        }
      }
      
      // Add timeout to make sure it completes
      Promise.race([
        runHealthCheck(),
        new Promise(resolve => setTimeout(resolve, 10000))
      ]).catch(error => {
        console.warn('⚠️ Health check timeout or failed:', error instanceof Error ? error.message : String(error))
      })
    }
  }, [])

  // This component renders nothing - it's just for initialization
  return null
}

export default ClientHealthMonitor
