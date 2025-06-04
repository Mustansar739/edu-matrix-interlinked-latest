'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/lib/store'
import { useState, useEffect } from 'react'

interface ReduxProviderProps {
  children: React.ReactNode
}

// Loading component for PersistGate
function PersistLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">Loading your data...</span>
    </div>
  )
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render PersistGate on server-side
  if (!isClient) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <PersistGate 
        loading={<PersistLoading />} 
        persistor={persistor}
        onBeforeLift={() => {
          // Optional: Run any initialization logic before rehydration
          console.log('Redux store rehydration starting...')
        }}
      >
        {children}
      </PersistGate>
    </Provider>
  )
}
