/**
 * ==========================================
 * OFFICIAL SOCKET.IO DEMO COMPONENT
 * ==========================================
 * Pure Socket.IO implementation following official documentation
 */

"use client"

import React, { useState, useEffect } from 'react'
import { useSocket, useSocketEvent, useSocketEmit, useSocketRoom } from '@/hooks/useSocket'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function SocketIODemo() {
  const { socket, isConnected, error } = useSocket()
  const emit = useSocketEmit()
  const { joinRoom, leaveRoom } = useSocketRoom()
  
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [currentRoom, setCurrentRoom] = useState('')
  const [roomToJoin, setRoomToJoin] = useState('')

  // Official Socket.IO event listeners
  useSocketEvent('message', (data) => {
    setMessages(prev => [...prev, data])
  })

  useSocketEvent('user_joined', (data) => {
    console.log('User joined:', data)
  })

  useSocketEvent('user_left', (data) => {
    console.log('User left:', data)
  })

  // Send message using official emit
  const sendMessage = () => {
    if (newMessage.trim() && currentRoom) {
      emit('message', {
        room: currentRoom,
        content: newMessage,
        timestamp: new Date().toISOString()
      })
      setNewMessage('')
    }
  }

  // Join room using official methods
  const handleJoinRoom = () => {
    if (roomToJoin.trim()) {
      if (currentRoom) {
        leaveRoom(currentRoom)
      }
      joinRoom(roomToJoin)
      setCurrentRoom(roomToJoin)
      setMessages([]) // Clear messages when switching rooms
      setRoomToJoin('')
    }
  }

  // Leave current room
  const handleLeaveRoom = () => {
    if (currentRoom) {
      leaveRoom(currentRoom)
      setCurrentRoom('')
      setMessages([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle>Socket.IO Connection Status</CardTitle>
          <CardDescription>Official Socket.IO connection to Docker server</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-medium">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            {socket && (
              <Badge variant="outline">
                Socket ID: {socket.id}
              </Badge>
            )}
          </div>
          {error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              Error: {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Room Management */}
      <Card>
        <CardHeader>
          <CardTitle>Room Management</CardTitle>
          <CardDescription>Join and leave rooms using official Socket.IO methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter room name"
              value={roomToJoin}
              onChange={(e) => setRoomToJoin(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
            />
            <Button onClick={handleJoinRoom} disabled={!isConnected || !roomToJoin.trim()}>
              Join Room
            </Button>
          </div>
          
          {currentRoom && (
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded">
              <span className="font-medium">Current Room: {currentRoom}</span>
              <Button variant="outline" size="sm" onClick={handleLeaveRoom}>
                Leave Room
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Messaging */}
      {currentRoom && (
        <Card>
          <CardHeader>
            <CardTitle>Messages - {currentRoom}</CardTitle>
            <CardDescription>Real-time messaging with official Socket.IO events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages Display */}
            <div className="h-64 overflow-y-auto border rounded p-3 space-y-2">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">No messages yet. Send one!</p>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-medium">{msg.content}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Send Message */}
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage} disabled={!isConnected || !newMessage.trim()}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Server Info */}
      <Card>
        <CardHeader>
          <CardTitle>Server Configuration</CardTitle>
          <CardDescription>Socket.IO server details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Server URL:</strong> {process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'}
            </div>
            <div>
              <strong>Transports:</strong> WebSocket, Polling
            </div>
            <div>
              <strong>Auto Reconnect:</strong> Yes
            </div>
            <div>
              <strong>Max Reconnection Attempts:</strong> 5
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
