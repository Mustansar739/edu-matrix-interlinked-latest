/**
 * ==========================================
 * REALTIME SLICE - REDUX TOOLKIT
 * ==========================================
 * Enhanced with better types and error handling
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserProfession } from '@prisma/client'

// Enhanced Types
export interface User {
  id: string
  email: string
  name: string
  image?: string | null
  profession: UserProfession
  username: string
  institutionId?: string | null
  isVerified: boolean
  twoFactorEnabled: boolean
}

export interface Notification {
  id: string
  type: 'general' | 'message' | 'call' | 'mention' | 'system' | 'warning'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  userId?: string
  actionUrl?: string
  metadata?: Record<string, any>
}

export interface OnlineUser {
  id: string
  name: string
  avatar?: string
  lastSeen: string
  status?: 'online' | 'away' | 'busy' | 'offline'
  statusMessage?: string
}

export interface RealtimeState {
  currentUser: User | null
  isConnected: boolean
  notifications: Notification[]
  onlineUsers: OnlineUser[]
  unreadCount: number
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error'
  lastError: string | null
  isRehydrated: boolean
}

// Enhanced Initial state
const initialState: RealtimeState = {
  currentUser: null,
  isConnected: false,
  notifications: [],
  onlineUsers: [],
  unreadCount: 0,
  connectionStatus: 'disconnected',
  lastError: null,
  isRehydrated: false,
}

// Slice
const realtimeSlice = createSlice({
  name: 'realtime',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
    },
      setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
      state.connectionStatus = action.payload ? 'connected' : 'disconnected'
      if (action.payload) {
        state.lastError = null
      }
    },

    setConnectionError: (state, action: PayloadAction<string>) => {
      state.isConnected = false
      state.connectionStatus = 'error'
      state.lastError = action.payload
    },

    setRehydrated: (state, action: PayloadAction<boolean>) => {
      state.isRehydrated = action.payload
    },
      addNotification: (state, action: PayloadAction<Notification>) => {
      // Prevent duplicate notifications
      const exists = state.notifications.find(n => n.id === action.payload.id)
      if (!exists) {
        state.notifications.unshift(action.payload)
        if (!action.payload.isRead) {
          state.unreadCount += 1
        }
      }
    },
    
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification && !notification.isRead) {
        notification.isRead = true
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
    },
    
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.isRead = true
      })
      state.unreadCount = 0
    },
    
    setOnlineUsers: (state, action: PayloadAction<OnlineUser[]>) => {
      state.onlineUsers = action.payload
    },
    
    addOnlineUser: (state, action: PayloadAction<OnlineUser>) => {
      const exists = state.onlineUsers.find(user => user.id === action.payload.id)
      if (!exists) {
        state.onlineUsers.push(action.payload)
      }
    },
    
    removeOnlineUser: (state, action: PayloadAction<string>) => {
      state.onlineUsers = state.onlineUsers.filter(user => user.id !== action.payload)
    },
      clearNotifications: (state) => {
      state.notifications = []
      state.unreadCount = 0
    },

    // Bulk operations for better performance
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload
      state.unreadCount = action.payload.filter(n => !n.isRead).length
    },

    updateNotification: (state, action: PayloadAction<{ id: string; updates: Partial<Notification> }>) => {
      const index = state.notifications.findIndex(n => n.id === action.payload.id)
      if (index !== -1) {
        const wasRead = state.notifications[index].isRead
        state.notifications[index] = { ...state.notifications[index], ...action.payload.updates }
        
        // Update unread count if read status changed
        if (!wasRead && action.payload.updates.isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1)
        } else if (wasRead && action.payload.updates.isRead === false) {
          state.unreadCount += 1
        }
      }
    },
  },
})

// Export actions
export const {
  setCurrentUser,
  setConnectionStatus,
  setConnectionError,
  setRehydrated,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  clearNotifications,
  setNotifications,
  updateNotification,
} = realtimeSlice.actions

// Enhanced Selectors with memoization
export const selectCurrentUser = (state: { realtime: RealtimeState }) => state.realtime.currentUser
export const selectIsConnected = (state: { realtime: RealtimeState }) => state.realtime.isConnected
export const selectConnectionStatus = (state: { realtime: RealtimeState }) => state.realtime.connectionStatus
export const selectLastError = (state: { realtime: RealtimeState }) => state.realtime.lastError
export const selectNotifications = (state: { realtime: RealtimeState }) => state.realtime.notifications
export const selectUnreadCount = (state: { realtime: RealtimeState }) => state.realtime.unreadCount
export const selectOnlineUsers = (state: { realtime: RealtimeState }) => state.realtime.onlineUsers
export const selectIsRehydrated = (state: { realtime: RealtimeState }) => state.realtime.isRehydrated

// Computed selectors
export const selectUnreadNotifications = (state: { realtime: RealtimeState }) => 
  state.realtime.notifications.filter(n => !n.isRead)

export const selectNotificationsByType = (type: string) => (state: { realtime: RealtimeState }) =>
  state.realtime.notifications.filter(n => n.type === type)

export const selectOnlineUsersCount = (state: { realtime: RealtimeState }) => 
  state.realtime.onlineUsers.length

// Export reducer
export default realtimeSlice.reducer
