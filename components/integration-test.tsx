'use client'

import { useState, useEffect } from 'react'
import { useSocket } from '@/hooks/useSocket'
import { useSelector } from 'react-redux'
import type { RootState } from '@/lib/store'

export function IntegrationTestComponent() {
  const [testResults, setTestResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { socket, isConnected, connectionId } = useSocket()
  const realtimeState = useSelector((state: RootState) => state.realtime)

  const runIntegrationTest = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-integration')
      const results = await response.json()
      setTestResults(results)
    } catch (error) {
      console.error('Integration test failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const testSocketConnection = () => {
    if (socket && isConnected) {
      socket.emit('test_connection', { message: 'Testing socket connection' })
    }
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🔧 Integration Test Dashboard</h2>
      
      {/* Socket.IO Status */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Socket.IO Status</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Connection: </span>
            <span className={`px-2 py-1 rounded text-sm ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div>
            <span className="font-medium">Connection ID: </span>
            <span className="text-sm text-gray-600">{connectionId || 'None'}</span>
          </div>
        </div>
        <button 
          onClick={testSocketConnection}
          disabled={!isConnected}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Test Socket Connection
        </button>
      </div>      {/* Redux State */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Redux State</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">Online Users: </span>
            <span>{realtimeState.onlineUsers?.length || 0}</span>
          </div>
          <div>
            <span className="font-medium">Connected: </span>
            <span className={`px-2 py-1 rounded ${realtimeState.isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {realtimeState.isConnected ? 'Yes' : 'No'}
            </span>
          </div>
          <div>
            <span className="font-medium">Notifications: </span>
            <span>{realtimeState.notifications?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* Test Results */}
      <div className="mb-6">
        <button 
          onClick={runIntegrationTest}
          disabled={loading}
          className="px-6 py-3 bg-green-500 text-white rounded font-medium disabled:opacity-50"
        >
          {loading ? 'Running Tests...' : 'Run Integration Tests'}
        </button>
      </div>

      {testResults && (
        <div className="p-4 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-3">Test Results</h3>
          <div className="space-y-2">
            {Object.entries(testResults.summary || {}).map(([service, status]) => (
              <div key={service} className="flex justify-between">
                <span className="font-medium capitalize">{service}:</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  status === 'success' || status === 'configured' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status as string}
                </span>
              </div>
            ))}
          </div>
          
          <details className="mt-4">
            <summary className="cursor-pointer font-medium">View Detailed Results</summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  )
}
