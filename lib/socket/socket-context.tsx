/**
 * ==========================================
 * OFFICIAL SOCKET.IO CONTEXT - NEXT.JS
 * ==========================================
 * Pure Socket.IO implementation following official documentation
 * https://socket.io/docs/v4/client-installation/
 */

"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'

// Official Socket.IO Context Type
interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  connectionId: string | null
  error: string | null
}

// Create Context with official pattern
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  connectionId: null,
  error: null,
})

interface SocketProviderProps {
  children: ReactNode
}

// Official Socket.IO Provider
export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionId, setConnectionId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('🔍 Initializing Socket.IO with:', {
      url: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',
      apiKey: process.env.NEXT_PUBLIC_INTERNAL_API_KEY ? '***configured***' : 'not configured'
    })

    // Official Socket.IO client initialization with authentication
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      // Official configuration options
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      // Authentication for Socket.IO server
      auth: {
        apiKey: process.env.NEXT_PUBLIC_INTERNAL_API_KEY || 'edu-matrix-internal-2024-secure-key-89d7f6e5c4b3a291'
      },      // Alternative authentication methods
      query: {
        apiKey: process.env.NEXT_PUBLIC_INTERNAL_API_KEY || 'edu-matrix-internal-2024-secure-key-89d7f6e5c4b3a291'
      }
    })

    // Official event listeners
    socketInstance.on('connect', () => {
      console.log('✅ Socket.IO connected:', socketInstance.id)
      setIsConnected(true)
      setConnectionId(socketInstance.id || null)
      setError(null)
    })

    socketInstance.on('disconnect', (reason) => {
      console.log('❌ Socket.IO disconnected:', reason)
      setIsConnected(false)
      setConnectionId(null)
    })

    socketInstance.on('connect_error', (err) => {
      console.error('❌ Socket.IO connection error:', err.message)
      setError(err.message)
      setIsConnected(false)
    })

    setSocket(socketInstance)

    // Official cleanup
    return () => {
      if (socketInstance) {
        socketInstance.disconnect()
      }
    }
  }, [])
  const value = {
    socket,
    isConnected,
    connectionId,
    error,
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}

// Official hook to use Socket.IO
export function useSocket() {
  const context = useContext(SocketContext)
  
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  
  return context
}

export { SocketContext }
