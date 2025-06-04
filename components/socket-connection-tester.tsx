/**
 * ==========================================
 * SOCKET.IO CONNECTION TESTER
 * ==========================================
 * Official Socket.IO connection test component
 */

"use client"

import React, { useEffect, useState } from 'react'
import { useSocket } from '@/lib/socket/socket-context'

export default function SocketConnectionTester() {
  const { socket, isConnected, error } = useSocket()
  const [logs, setLogs] = useState<string[]>([])
  const [testMessage, setTestMessage] = useState('')

  // Add log helper
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev.slice(-9), `[${timestamp}] ${message}`])
  }

  useEffect(() => {
    if (!socket) return

    // Socket.IO official event listeners
    socket.on('connect', () => {
      addLog(`✅ Connected to Socket.IO server with ID: ${socket.id}`)
    })

    socket.on('disconnect', (reason) => {
      addLog(`❌ Disconnected from Socket.IO server. Reason: ${reason}`)
    })

    socket.on('connect_error', (err) => {
      addLog(`❌ Connection error: ${err.message}`)
    })

    // Test event listeners
    socket.on('test-response', (data) => {
      addLog(`📨 Received test response: ${JSON.stringify(data)}`)
    })

    socket.on('error', (err) => {
      addLog(`❌ Socket error: ${err}`)
    })

    // Cleanup
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('connect_error')
      socket.off('test-response')
      socket.off('error')
    }
  }, [socket])

  const sendTestMessage = () => {
    if (!socket || !isConnected) {
      addLog('❌ Cannot send message: Socket not connected')
      return
    }

    socket.emit('test-message', { message: testMessage, timestamp: Date.now() })
    addLog(`📤 Sent test message: ${testMessage}`)
    setTestMessage('')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Socket.IO Connection Tester</h2>
      
      {/* Connection Status */}
      <div className="mb-6 p-4 rounded-lg border">
        <h3 className="font-semibold mb-2">Connection Status</h3>
        <div className="space-y-2">
          <div className={`flex items-center space-x-2 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          {socket && (
            <div className="text-sm text-gray-600">
              Socket ID: {socket.id || 'Not assigned'}
            </div>
          )}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              Error: {error}
            </div>
          )}
        </div>
      </div>

      {/* Test Message Sender */}
      <div className="mb-6 p-4 rounded-lg border">
        <h3 className="font-semibold mb-2">Send Test Message</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Enter test message..."
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && sendTestMessage()}
          />
          <button
            onClick={sendTestMessage}
            disabled={!isConnected || !testMessage.trim()}
            className={`px-4 py-2 rounded font-medium ${
              isConnected && testMessage.trim()
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
      </div>

      {/* Connection Logs */}
      <div className="p-4 rounded-lg border">
        <h3 className="font-semibold mb-2">Connection Logs</h3>
        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm max-h-60 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-gray-500">No logs yet...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))
          )}
        </div>
      </div>

      {/* Configuration Info */}
      <div className="mt-6 p-4 rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-2">Configuration</h3>
        <div className="text-sm space-y-1">
          <div>Server URL: {process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'}</div>
          <div>API Key: {process.env.NEXT_PUBLIC_INTERNAL_API_KEY ? '***configured***' : 'not configured'}</div>
          <div>Transport: WebSocket, Polling</div>
        </div>
      </div>
    </div>
  )
}
