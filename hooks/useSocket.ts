/**
 * ==========================================
 * OFFICIAL SOCKET.IO HOOKS - NEXT.JS
 * ==========================================
 * Pure Socket.IO hooks following official documentation
 */

'use client'

import { useContext, useEffect, useCallback } from 'react'
import { SocketContext } from '@/lib/socket/socket-context'

// Official useSocket hook
export function useSocket() {
  const context = useContext(SocketContext)
  
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return context
}

// Official Socket.IO event listener hook
export function useSocketEvent(event: string, callback: (data: any) => void) {
  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return

    // Official event listener
    socket.on(event, callback)

    // Official cleanup
    return () => {
      socket.off(event, callback)
    }
  }, [socket, event, callback])
}

// Official Socket.IO emit hook
export function useSocketEmit() {
  const { socket, isConnected } = useSocket()

  const emit = useCallback((event: string, data?: any) => {
    if (socket && isConnected) {
      // Official emit method
      socket.emit(event, data)
    } else {
      console.warn('Socket.IO: Cannot emit, not connected')
    }
  }, [socket, isConnected])

  return emit
}

// Official Socket.IO room management hook
export function useSocketRoom() {
  const { socket, isConnected } = useSocket()

  const joinRoom = useCallback((roomId: string) => {
    if (socket && isConnected) {
      // Official room join
      socket.emit('join', roomId)
    }
  }, [socket, isConnected])

  const leaveRoom = useCallback((roomId: string) => {
    if (socket && isConnected) {
      // Official room leave
      socket.emit('leave', roomId)
    }
  }, [socket, isConnected])

  return { joinRoom, leaveRoom }
}
