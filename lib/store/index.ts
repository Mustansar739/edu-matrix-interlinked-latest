/**
 * ==========================================
 * REDUX STORE CONFIGURATION
 * ==========================================
 * Official Redux Toolkit store setup for Next.js 15
 */

import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import realtimeSlice from './realtime-slice'

// Create noop storage inline to avoid import issues
const createNoopStorage = () => ({
  getItem(_key: string): Promise<null> {
    return Promise.resolve(null)
  },
  setItem(_key: string, _value: string): Promise<void> {
    return Promise.resolve()
  },
  removeItem(_key: string): Promise<void> {
    return Promise.resolve()
  },
})

// Conditional storage for SSR compatibility
const storage = typeof window !== 'undefined' 
  ? require('redux-persist/lib/storage').default
  : createNoopStorage()

// Persist configuration
const persistConfig = {
  key: 'edu-matrix-root',
  storage,
  whitelist: ['realtime'], // Only persist realtime state
  version: 1,
  debug: process.env.NODE_ENV === 'development'
}

// Root reducer
const rootReducer = combineReducers({
  realtime: realtimeSlice,
})

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure store with enhanced middleware for Redux Persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/FLUSH',
          'persist/REHYDRATE', 
          'persist/PAUSE',
          'persist/PERSIST',
          'persist/PURGE',
          'persist/REGISTER'
        ],
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates']
      },
      thunk: {
        extraArgument: {
          // Add any extra services here if needed
        }
      }
    }),
  devTools: process.env.NODE_ENV !== 'production' && {
    name: 'Edu Matrix Store',
    trace: true,
    traceLimit: 25
  },
})

// Create persistor
export const persistor = persistStore(store)

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
