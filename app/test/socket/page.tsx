// ==========================================
// SOCKET.IO CONNECTION TEST PAGE
// ==========================================
// Test page to verify Socket.IO connection to Docker server

import { Metadata } from 'next'
import SocketConnectionTester from '@/components/testing/socket-connection-tester'

export const metadata: Metadata = {
  title: 'Socket.IO Connection Test - Edu Matrix',
  description: 'Test Socket.IO connection to Docker server'
}

export default function SocketTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔌 Socket.IO Connection Test
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test the real-time connection to your Docker Socket.IO server
          </p>
        </div>
        
        <SocketConnectionTester />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This page helps you verify that your Next.js app can connect to the Socket.IO server running in Docker.
          </p>
        </div>
      </div>
    </div>
  )
}
