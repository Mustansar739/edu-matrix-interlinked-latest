// ==========================================
// SOCKET.IO CONNECTION TESTER
// ==========================================
// Component to test and verify Socket.IO connection to Docker server

"use client"

import React, { useState, useEffect } from 'react'
import { useSocket } from '@/lib/socket/socket-context'
import { useSession } from 'next-auth/react'

export function SocketConnectionTester() {
  const { socket, isConnected, connectionId } = useSocket()
  const { data: session } = useSession()
  const [messages, setMessages] = useState<string[]>([])
  const [testMessage, setTestMessage] = useState('')

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    if (socket) {
      // Test event listeners
      socket.on('test:response', (data) => {
        addMessage(`📨 Received test response: ${JSON.stringify(data)}`)
      })

      socket.on('echo:response', (data) => {
        addMessage(`🔊 Echo response: ${data.message}`)
      })

      return () => {
        socket.off('test:response')
        socket.off('echo:response')
      }
    }
  }, [socket])

  const sendTestMessage = () => {
    if (socket && testMessage.trim()) {
      socket.emit('test:message', { 
        message: testMessage,
        timestamp: new Date().toISOString(),
        userId: session?.user?.id 
      })
      addMessage(`📤 Sent test message: ${testMessage}`)
      setTestMessage('')
    }
  }

  const sendEcho = () => {
    if (socket) {
      const echoMessage = `Echo test from ${session?.user?.name || 'Anonymous'}`
      socket.emit('echo:test', { message: echoMessage })
      addMessage(`📤 Sent echo test: ${echoMessage}`)
    }
  }

  const testHealth = async () => {
    try {
      const response = await fetch('http://localhost:3001/health')
      const data = await response.json()
      addMessage(`🏥 Health check: ${JSON.stringify(data)}`)
    } catch (error) {
      addMessage(`❌ Health check failed: ${error}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Socket.IO Connection Tester
      </h2>
      
      {/* Connection Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Status</h3>
          <p className={`text-lg font-bold ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">Connection ID</h3>
          <p className="text-sm font-mono text-gray-900 dark:text-white">
            {connectionId || 'None'}
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">User</h3>
          <p className="text-sm text-gray-900 dark:text-white">
            {session?.user?.name || session?.user?.email || 'Not logged in'}
          </p>
        </div>
      </div>

      {/* Test Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={testHealth}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
        >
          🏥 Test Health Endpoint
        </button>
        
        <button
          onClick={sendEcho}
          disabled={!isConnected}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg font-medium"
        >
          🔊 Send Echo Test
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium"
        >
          🔄 Reload Page
        </button>
      </div>

      {/* Custom Message Test */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendTestMessage()}
          placeholder="Type a test message..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button
          onClick={sendTestMessage}
          disabled={!isConnected || !testMessage.trim()}
          className="px-6 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg font-medium"
        >
          📤 Send Test
        </button>
      </div>

      {/* Message Log */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Message Log</h3>
        <div className="max-h-60 overflow-y-auto space-y-1">
          {messages.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No messages yet...</p>
          ) : (
            messages.map((message, index) => (
              <p key={index} className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {message}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Server Info */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
          🐳 Docker Server Information
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li>• Server URL: {process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'}</li>
          <li>• Container: edu-matrix-socketio</li>
          <li>• Network: edu-matrix-network</li>
          <li>• Health Endpoint: http://localhost:3001/health</li>
        </ul>
      </div>
    </div>
  )
}

export default SocketConnectionTester
