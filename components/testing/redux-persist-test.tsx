'use client'

import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import type { RootState, AppDispatch } from '@/lib/store'
import { 
  addNotification, 
  setConnectionStatus,
  selectNotifications,
  selectUnreadCount,
  selectIsConnected,
  selectConnectionStatus,
  selectIsRehydrated 
} from '@/lib/store/realtime-slice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ReduxPersistTest() {
  const dispatch = useDispatch<AppDispatch>()
  const notifications = useSelector(selectNotifications)
  const unreadCount = useSelector(selectUnreadCount)
  const isConnected = useSelector(selectIsConnected)
  const connectionStatus = useSelector(selectConnectionStatus)
  const isRehydrated = useSelector(selectIsRehydrated)

  const [testId, setTestId] = useState(1)

  const addTestNotification = () => {
    dispatch(addNotification({
      id: `test-${testId}`,
      type: 'general',
      title: `Test Notification ${testId}`,
      message: `This is test notification number ${testId}. Redux Persist should save this!`,
      isRead: false,
      createdAt: new Date().toISOString()
    }))
    setTestId(prev => prev + 1)
  }

  const toggleConnection = () => {
    dispatch(setConnectionStatus(!isConnected))
  }

  return (
    <Card className="max-w-2xl mx-auto m-4">
      <CardHeader>
        <CardTitle>🧪 Redux Persist Test Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border rounded">
            <h4 className="font-semibold">Connection Status</h4>
            <p className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {connectionStatus} ({isConnected ? 'Connected' : 'Disconnected'})
            </p>
          </div>
          <div className="p-3 border rounded">
            <h4 className="font-semibold">Redux State</h4>
            <p className="text-sm">
              Rehydrated: {isRehydrated ? '✅' : '❌'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-x-2">
          <Button onClick={addTestNotification}>
            Add Test Notification
          </Button>
          <Button onClick={toggleConnection} variant="outline">
            Toggle Connection
          </Button>
        </div>

        {/* Stats */}
        <div className="p-3 bg-gray-50 rounded">
          <h4 className="font-semibold mb-2">Current State</h4>
          <p>Total Notifications: {notifications.length}</p>
          <p>Unread Count: {unreadCount}</p>
        </div>

        {/* Instructions */}
        <div className="p-3 bg-blue-50 rounded text-sm">
          <h4 className="font-semibold mb-2">🧪 Test Instructions:</h4>
          <ol className="list-decimal ml-4 space-y-1">
            <li>Add some test notifications</li>
            <li>Toggle connection status</li>
            <li>Refresh the page (F5)</li>
            <li>Verify that your state persists after reload</li>
          </ol>
        </div>

        {/* Recent Notifications */}
        {notifications.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold">Recent Notifications:</h4>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className="p-2 bg-gray-100 rounded text-sm">
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-gray-600">{notification.message}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  )
}
