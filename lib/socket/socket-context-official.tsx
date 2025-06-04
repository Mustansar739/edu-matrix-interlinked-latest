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
  error: string | null
}

// Create Context with official pattern
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  error: null,
})

interface SocketProviderProps {
  children: ReactNode
}

// Official Socket.IO Provider
export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Official Socket.IO client initialization
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      // Official configuration options
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    })

    // Official event listeners
    socketInstance.on('connect', () => {
      console.log('✅ Socket.IO connected:', socketInstance.id)
      setIsConnected(true)
      setError(null)
    })

    socketInstance.on('disconnect', (reason) => {
      console.log('❌ Socket.IO disconnected:', reason)
      setIsConnected(false)
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
