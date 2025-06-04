/**
 * Advanced Socket.IO hooks for EDU Matrix Interlinked
 * Comprehensive client-side integration for all real-time features
 */

'use client'

import { useContext, useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { SocketContext } from '@/lib/socket/socket-context'

// ==========================================
// POSTS & SOCIAL FEATURES HOOKS
// ==========================================

export function usePostsSocket() {
  const { socket, isConnected } = useContext(SocketContext) || {}
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const createPost = useCallback((content: string, attachments: any[] = [], privacy: string = 'public') => {
    if (socket && isConnected) {
      socket.emit('post:create', {
        content,
        attachments,
        privacy,
        timestamp: new Date().toISOString()
      })
    }
  }, [socket, isConnected])

  const likePost = useCallback((postId: string) => {
    if (socket && isConnected) {
      socket.emit('post:like', { postId })
    }
  }, [socket, isConnected])

  const sharePost = useCallback((postId: string, message?: string) => {
    if (socket && isConnected) {
      socket.emit('post:share', { postId, message })
    }
  }, [socket, isConnected])

  const addComment = useCallback((postId: string, content: string, parentCommentId?: string) => {
    if (socket && isConnected) {
      socket.emit('comment:create', {
        postId,
        content,
        parentCommentId,
        timestamp: new Date().toISOString()
      })
    }
  }, [socket, isConnected])

  const joinPostsFeed = useCallback((feedType: 'general' | 'following' | 'trending' = 'general') => {
    if (socket && isConnected) {
      socket.emit('posts:join_feed', { feedType })
    }
  }, [socket, isConnected])

  useEffect(() => {
    if (socket && isConnected) {
      socket.on('post:new', (post) => {
        setPosts(prev => [post, ...prev])
      })

      socket.on('post:liked', (data) => {
        setPosts(prev => prev.map(post => 
          post.id === data.postId 
            ? { ...post, likes: data.likes, likedBy: data.likedBy }
            : post
        ))
      })

      socket.on('comment:new', (comment) => {
        setPosts(prev => prev.map(post => 
          post.id === comment.postId 
            ? { ...post, comments: [...(post.comments || []), comment] }
            : post
        ))
      })

      return () => {
        socket.off('post:new')
        socket.off('post:liked')
        socket.off('comment:new')
      }
    }
  }, [socket, isConnected])

  return {
    posts,
    loading,
    createPost,
    likePost,
    sharePost,
    addComment,
    joinPostsFeed
  }
}

// ==========================================
// CHAT FEATURES HOOKS
// ==========================================

export function useChatSocket() {
  const { socket, isConnected } = useContext(SocketContext) || {}
  const [messages, setMessages] = useState<{ [roomId: string]: any[] }>({})
  const [typingUsers, setTypingUsers] = useState<{ [roomId: string]: string[] }>({})
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])

  const joinRoom = useCallback((roomId: string, roomType: 'direct' | 'group' | 'course' = 'direct') => {
    if (socket && isConnected) {
      socket.emit('chat:join', { roomId, roomType })
    }
  }, [socket, isConnected])

  const sendMessage = useCallback((roomId: string, content: string, type: 'text' | 'image' | 'file' = 'text', attachments: any[] = []) => {
    if (socket && isConnected) {
      socket.emit('chat:message', {
        roomId,
        content,
        type,
        attachments,
        timestamp: new Date().toISOString()
      })
    }
  }, [socket, isConnected])

  const markAsRead = useCallback((roomId: string, messageIds: string[]) => {
    if (socket && isConnected) {
      socket.emit('chat:read', { roomId, messageIds })
    }
  }, [socket, isConnected])

  const setTyping = useCallback((roomId: string, isTyping: boolean) => {
    if (socket && isConnected) {
      socket.emit('chat:typing', { roomId, isTyping })
    }
  }, [socket, isConnected])

  useEffect(() => {
    if (socket && isConnected) {
      socket.on('message', (message) => {
        setMessages(prev => ({
          ...prev,
          [message.roomId]: [...(prev[message.roomId] || []), message]
        }))
      })

      socket.on('user:typing', (data) => {
        setTypingUsers(prev => ({
          ...prev,
          [data.roomId]: data.isTyping 
            ? [...(prev[data.roomId] || []).filter(u => u !== data.userId), data.userId]
            : (prev[data.roomId] || []).filter(u => u !== data.userId)
        }))
      })

      socket.on('user:status', (data) => {
        if (data.status === 'online') {
          setOnlineUsers(prev => [...new Set([...prev, data.userId])])
        } else {
          setOnlineUsers(prev => prev.filter(u => u !== data.userId))
        }
      })

      return () => {
        socket.off('message')
        socket.off('user:typing')
        socket.off('user:status')
      }
    }
  }, [socket, isConnected])

  return {
    messages,
    typingUsers,
    onlineUsers,
    joinRoom,
    sendMessage,
    markAsRead,
    setTyping
  }
}

// ==========================================
// VOICE CALLS HOOKS
// ==========================================

export function useVoiceCallsSocket() {
  const { socket, isConnected } = useContext(SocketContext) || {}
  const { data: session } = useSession()
  const [currentCall, setCurrentCall] = useState<any>(null)
  const [incomingCall, setIncomingCall] = useState<any>(null)
  const [callHistory, setCallHistory] = useState<any[]>([])

  const initiateCall = useCallback((targetUserId: string, callType: 'voice' | 'video' = 'voice', roomId?: string) => {
    if (socket && isConnected) {
      socket.emit('call:initiate', {
        targetUserId,
        callType,
        roomId,
        timestamp: new Date().toISOString()
      })
    }
  }, [socket, isConnected])

  const acceptCall = useCallback((callId: string) => {
    if (socket && isConnected) {
      socket.emit('call:accept', { callId })
    }
  }, [socket, isConnected])

  const rejectCall = useCallback((callId: string, reason?: string) => {
    if (socket && isConnected) {
      socket.emit('call:reject', { callId, reason })
    }
  }, [socket, isConnected])

  const endCall = useCallback((callId: string) => {
    if (socket && isConnected) {
      socket.emit('call:end', { callId })
    }
  }, [socket, isConnected])

  const sendSignal = useCallback((callId: string, to: string, signal: any) => {
    if (socket && isConnected) {
      socket.emit('call:signal', { callId, to, signal })
    }
  }, [socket, isConnected])

  useEffect(() => {
    if (socket && isConnected) {
      socket.on('call:incoming', (callData) => {
        setIncomingCall(callData)
      })

      socket.on('call:accepted', (callData) => {
        setCurrentCall(callData)
        setIncomingCall(null)
      })

      socket.on('call:rejected', (callData) => {
        setIncomingCall(null)
        setCurrentCall(null)
      })

      socket.on('call:ended', (callData) => {
        setCurrentCall(null)
        setIncomingCall(null)
        setCallHistory(prev => [callData, ...prev])
      })

      socket.on('call:signal', (data) => {
        // Handle WebRTC signaling
        console.log('Call signal received:', data)
      })

      return () => {
        socket.off('call:incoming')
        socket.off('call:accepted')
        socket.off('call:rejected')
        socket.off('call:ended')
        socket.off('call:signal')
      }
    }
  }, [socket, isConnected])

  return {
    currentCall,
    incomingCall,
    callHistory,
    initiateCall,
    acceptCall,
    rejectCall,
    endCall,
    sendSignal
  }
}

// ==========================================
// NOTIFICATIONS HOOKS
// ==========================================

export function useNotificationsSocket() {
  const { socket, isConnected } = useContext(SocketContext) || {}
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const joinNotifications = useCallback(() => {
    if (socket && isConnected) {
      socket.emit('notifications:join')
    }
  }, [socket, isConnected])

  const markAsRead = useCallback((notificationIds: string[]) => {
    if (socket && isConnected) {
      socket.emit('notifications:read', { notificationIds })
    }
  }, [socket, isConnected])

  const markAllAsRead = useCallback(() => {
    if (socket && isConnected) {
      socket.emit('notifications:read_all')
    }
  }, [socket, isConnected])

  const sendNotification = useCallback((targetUserId: string, title: string, message: string, type: string = 'general') => {
    if (socket && isConnected) {
      socket.emit('notification:send', {
        targetUserId,
        title,
        message,
        type,
        timestamp: new Date().toISOString()
      })
    }
  }, [socket, isConnected])

  useEffect(() => {
    if (socket && isConnected) {
      socket.on('notification', (notification) => {
        setNotifications(prev => [notification, ...prev])
        setUnreadCount(prev => prev + 1)
      })

      socket.on('notifications:read', (data) => {
        setNotifications(prev => prev.map(notif => 
          data.notificationIds.includes(notif.id) 
            ? { ...notif, read: true }
            : notif
        ))
        setUnreadCount(prev => Math.max(0, prev - data.notificationIds.length))
      })

      return () => {
        socket.off('notification')
        socket.off('notifications:read')
      }
    }
  }, [socket, isConnected])

  return {
    notifications,
    unreadCount,
    joinNotifications,
    markAsRead,
    markAllAsRead,
    sendNotification
  }
}

// ==========================================
// USER PRESENCE HOOKS
// ==========================================

export function usePresenceSocket() {
  const { socket, isConnected } = useContext(SocketContext) || {}
  const [onlineUsers, setOnlineUsers] = useState<any[]>([])
  const [userStatus, setUserStatus] = useState<'online' | 'away' | 'busy' | 'offline'>('offline')

  const updateStatus = useCallback((status: 'online' | 'away' | 'busy' | 'offline', message?: string) => {
    if (socket && isConnected) {
      socket.emit('presence:update', { status, message })
      setUserStatus(status)
    }
  }, [socket, isConnected])

  const getUserPresence = useCallback((userId: string) => {
    if (socket && isConnected) {
      socket.emit('presence:get', { userId })
    }
  }, [socket, isConnected])

  useEffect(() => {
    if (socket && isConnected) {
      socket.on('user:online', (userData) => {
        setOnlineUsers(prev => {
          const filtered = prev.filter(u => u.userId !== userData.userId)
          return [...filtered, userData]
        })
      })

      socket.on('user:offline', (data) => {
        setOnlineUsers(prev => prev.filter(u => u.userId !== data.userId))
      })

      socket.on('user:status', (data) => {
        setOnlineUsers(prev => prev.map(u => 
          u.userId === data.userId 
            ? { ...u, status: data.status, statusMessage: data.statusMessage }
            : u
        ))
      })

      return () => {
        socket.off('user:online')
        socket.off('user:offline')
        socket.off('user:status')
      }
    }
  }, [socket, isConnected])

  return {
    onlineUsers,
    userStatus,
    updateStatus,
    getUserPresence
  }
}

// ==========================================
// ROOMS & COMMUNITIES HOOKS
// ==========================================

export function useRoomsSocket() {
  const { socket, isConnected } = useContext(SocketContext) || {}
  const [joinedRooms, setJoinedRooms] = useState<any[]>([])
  const [roomUsers, setRoomUsers] = useState<{ [roomId: string]: any[] }>({})

  const joinRoom = useCallback((roomId: string, roomType: 'course' | 'study_group' | 'community' | 'project') => {
    if (socket && isConnected) {
      socket.emit('room:join', { roomId, roomType })
    }
  }, [socket, isConnected])

  const leaveRoom = useCallback((roomId: string) => {
    if (socket && isConnected) {
      socket.emit('room:leave', { roomId })
    }
  }, [socket, isConnected])

  const createRoom = useCallback((name: string, description: string, roomType: string, privacy: 'public' | 'private' = 'public') => {
    if (socket && isConnected) {
      socket.emit('room:create', { name, description, roomType, privacy })
    }
  }, [socket, isConnected])

  const inviteToRoom = useCallback((roomId: string, userIds: string[]) => {
    if (socket && isConnected) {
      socket.emit('room:invite', { roomId, userIds })
    }
  }, [socket, isConnected])

  useEffect(() => {
    if (socket && isConnected) {
      socket.on('room:joined', (roomData) => {
        setJoinedRooms(prev => [...prev, roomData])
      })

      socket.on('room:left', (data) => {
        setJoinedRooms(prev => prev.filter(r => r.id !== data.roomId))
      })

      socket.on('room:user_joined', (data) => {
        setRoomUsers(prev => ({
          ...prev,
          [data.roomId]: [...(prev[data.roomId] || []), data.user]
        }))
      })

      socket.on('room:user_left', (data) => {
        setRoomUsers(prev => ({
          ...prev,
          [data.roomId]: (prev[data.roomId] || []).filter(u => u.userId !== data.userId)
        }))
      })

      return () => {
        socket.off('room:joined')
        socket.off('room:left')
        socket.off('room:user_joined')
        socket.off('room:user_left')
      }
    }
  }, [socket, isConnected])

  return {
    joinedRooms,
    roomUsers,
    joinRoom,
    leaveRoom,
    createRoom,
    inviteToRoom
  }
}

// ==========================================
// GENERAL SOCKET UTILITIES
// ==========================================

export function useSocketUtils() {
  const { socket, isConnected } = useContext(SocketContext) || {}

  const emit = useCallback((event: string, data: any) => {
    if (socket && isConnected) {
      socket.emit(event, data)
    }
  }, [socket, isConnected])

  const on = useCallback((event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.on(event, callback)
      return () => socket.off(event, callback)
    }
  }, [socket])

  const ping = useCallback(() => {
    if (socket && isConnected) {
      socket.emit('ping')
    }
  }, [socket, isConnected])

  return {
    socket,
    isConnected,
    emit,
    on,
    ping
  }
}
