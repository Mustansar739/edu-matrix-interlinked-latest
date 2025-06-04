"use client"

import React, { useState, useEffect, useRef } from 'react'
import { useChat } from '@/hooks/use-realtime'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video,
  UserPlus,
  Settings
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ChatInterfaceProps {
  roomId: string
  roomType: 'private' | 'group' | 'course'
  className?: string
}

export function ChatInterface({ roomId, roomType, className }: ChatInterfaceProps) {
  const { activeRoom, isConnected, sendMessage, markAsRead, handleTyping } = useChat(roomId)
  const [messageText, setMessageText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeRoom?.messages])
  // Mark messages as read when room becomes active
  useEffect(() => {
    if (activeRoom && activeRoom.unreadCount > 0) {
      const unreadMessages = activeRoom.messages
        .filter(msg => !msg.read)
        .map(msg => msg.id)
      
      if (unreadMessages.length > 0) {
        markAsRead(unreadMessages)
      }
    }
  }, [activeRoom, markAsRead])

  // Handle message send
  const handleSendMessage = () => {
    if (messageText.trim() && isConnected) {
      sendMessage(messageText.trim())
      setMessageText('')
      handleTyping(false)
      setIsTyping(false)
    }
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value)
    
    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true)
      handleTyping(true)
    } else if (isTyping && e.target.value.length === 0) {
      setIsTyping(false)
      handleTyping(false)
    }
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!activeRoom) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="text-center text-muted-foreground">
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={activeRoom.participants[0]?.image} />
            <AvatarFallback>
              {activeRoom.name?.[0] || activeRoom.participants[0]?.name?.[0] || 'C'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">
              {activeRoom.name || activeRoom.participants[0]?.name || 'Chat'}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span>{isConnected ? 'Online' : 'Offline'}</span>
              {Object.keys(activeRoom.isTyping).length > 0 && (
                <span className="text-blue-500">Typing...</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          {roomType === 'group' && (
            <Button variant="ghost" size="icon">
              <UserPlus className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {activeRoom.messages.map((message, index) => {
            const isOwnMessage = message.senderId === 'current-user-id' // Replace with actual user ID
            const showAvatar = index === 0 || 
              activeRoom.messages[index - 1].senderId !== message.senderId
            
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} ${
                  showAvatar ? 'mt-4' : 'mt-1'
                }`}
              >
                {!isOwnMessage && showAvatar && (
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src={message.sender?.image} />
                    <AvatarFallback>
                      {message.sender?.name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[70%] ${!isOwnMessage && !showAvatar ? 'ml-10' : ''}`}>
                  {!isOwnMessage && showAvatar && (
                    <div className="text-xs text-muted-foreground mb-1">
                      {message.sender?.name}
                    </div>
                  )}
                  
                  <div
                    className={`px-3 py-2 rounded-lg ${
                      isOwnMessage
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.type === 'text' && (
                      <p className="text-sm">{message.content}</p>
                    )}
                    
                    {message.type === 'image' && (
                      <div className="space-y-2">
                        {message.content && (
                          <p className="text-sm">{message.content}</p>
                        )}
                        {message.attachments?.map((attachment, i) => (
                          <img
                            key={i}
                            src={attachment.url}
                            alt="Shared image"
                            className="max-w-full rounded"
                          />
                        ))}
                      </div>
                    )}
                    
                    {message.type === 'file' && (
                      <div className="flex items-center space-x-2">
                        <Paperclip className="h-4 w-4" />
                        <span className="text-sm">{message.attachments?.[0]?.name}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                    <span>
                      {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                    </span>
                    {isOwnMessage && (
                      <div className="flex items-center space-x-1">
                        {message.delivered && <span>✓</span>}
                        {message.read && <span>✓</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          
          {/* Typing indicators */}
          {Object.entries(activeRoom.isTyping).map(([userId, typing]) => 
            typing && (
              <div key={userId} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Avatar className="w-6 h-6">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span>is typing...</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            )
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={messageText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={!isConnected}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim() || !isConnected}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {!isConnected && (
          <div className="mt-2 text-center">
            <Badge variant="destructive">
              Disconnected - Messages will be sent when reconnected
            </Badge>
          </div>
        )}
      </div>
    </div>
  )
}
