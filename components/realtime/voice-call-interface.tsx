"use client"

import React, { useState, useEffect } from 'react'
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface VoiceCallInterfaceProps {
  callState: {
    isActive: boolean
    isIncoming: boolean
    isOutgoing: boolean
    participant?: {
      id: string
      name: string
      email: string
      image?: string
    }
    duration?: number
    status: 'connecting' | 'ringing' | 'active' | 'ended'
  }
  onAccept: () => void
  onReject: () => void
  onEnd: () => void
  onToggleMute: () => void
  onToggleVolume: () => void
  isMuted: boolean
  isVolumeOn: boolean
  className?: string
}

export function VoiceCallInterface({
  callState,
  onAccept,
  onReject,
  onEnd,
  onToggleMute,
  onToggleVolume,
  isMuted,
  isVolumeOn,
  className
}: VoiceCallInterfaceProps) {
  const [callDuration, setCallDuration] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (callState.isActive && callState.status === 'active') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    } else {
      setCallDuration(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [callState.isActive, callState.status])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusText = () => {
    switch (callState.status) {
      case 'connecting':
        return 'Connecting...'
      case 'ringing':
        return callState.isIncoming ? 'Incoming call' : 'Ringing...'
      case 'active':
        return formatDuration(callDuration)
      case 'ended':
        return 'Call ended'
      default:
        return ''
    }
  }

  const getStatusColor = () => {
    switch (callState.status) {
      case 'connecting':
        return 'bg-yellow-500'
      case 'ringing':
        return 'bg-blue-500'
      case 'active':
        return 'bg-green-500'
      case 'ended':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (!callState.isActive) return null

  return (
    <Card className={cn(
      "fixed top-4 right-4 z-50 w-80 shadow-lg border-2",
      callState.isIncoming && "border-blue-500 animate-pulse",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Status Badge */}
          <Badge variant="secondary" className={cn("text-white", getStatusColor())}>
            {getStatusText()}
          </Badge>

          {/* Participant Info */}
          {callState.participant && (
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-16 h-16">
                <AvatarImage 
                  src={callState.participant.image} 
                  alt={callState.participant.name} 
                />
                <AvatarFallback>
                  {callState.participant.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{callState.participant.name}</h3>
                <p className="text-sm text-gray-500">{callState.participant.email}</p>
              </div>
            </div>
          )}

          {/* Call Controls */}
          <div className="flex items-center space-x-3">
            {/* Incoming Call Controls */}
            {callState.isIncoming && callState.status === 'ringing' && (
              <>
                <Button
                  onClick={onAccept}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3"
                >
                  <Phone className="w-6 h-6" />
                </Button>
                <Button
                  onClick={onReject}
                  size="lg"
                  variant="destructive"
                  className="rounded-full p-3"
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Active Call Controls */}
            {callState.status === 'active' && (
              <>
                <Button
                  onClick={onToggleMute}
                  size="lg"
                  variant={isMuted ? "destructive" : "secondary"}
                  className="rounded-full p-3"
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>

                <Button
                  onClick={onToggleVolume}
                  size="lg"
                  variant={!isVolumeOn ? "destructive" : "secondary"}
                  className="rounded-full p-3"
                >
                  {isVolumeOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </Button>

                <Button
                  onClick={onEnd}
                  size="lg"
                  variant="destructive"
                  className="rounded-full p-3"
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Outgoing Call Controls */}
            {callState.isOutgoing && callState.status === 'ringing' && (
              <Button
                onClick={onEnd}
                size="lg"
                variant="destructive"
                className="rounded-full p-3"
              >
                <PhoneOff className="w-6 h-6" />
              </Button>
            )}
          </div>

          {/* Audio Quality Indicator */}
          {callState.status === 'active' && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Good audio quality</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Voice Call Button Component
interface VoiceCallButtonProps {
  onInitiateCall: () => void
  isDisabled?: boolean
  participant?: {
    name: string
    id: string
  }
  className?: string
}

export function VoiceCallButton({
  onInitiateCall,
  isDisabled = false,
  participant,
  className
}: VoiceCallButtonProps) {
  return (
    <Button
      onClick={onInitiateCall}
      disabled={isDisabled}
      size="sm"
      variant="outline"
      className={cn(
        "flex items-center space-x-2 text-green-600 border-green-200 hover:bg-green-50",
        className
      )}
    >
      <Phone className="w-4 h-4" />
      <span>Call {participant?.name || 'User'}</span>
    </Button>
  )
}
