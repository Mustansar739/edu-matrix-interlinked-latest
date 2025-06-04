"use client"

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useSocket } from '@/lib/socket/socket-context'
import { VoiceCallInterface } from './voice-call-interface'

interface VoiceCallState {
  isCallActive: boolean
  isIncomingCall: boolean
  isOutgoingCall: boolean
  callId: string | null
  participant: {
    id: string
    name: string
    email: string
    image?: string
  } | null
  localStream: MediaStream | null
  remoteStream: MediaStream | null
  callStatus: 'idle' | 'connecting' | 'ringing' | 'active' | 'ended'
  isMuted: boolean
  isVolumeOn: boolean
  callDuration: number
  error: string | null
}

interface VoiceCallAction {
  type: 
    | 'INITIATE_CALL'
    | 'INCOMING_CALL'
    | 'CALL_ACCEPTED'
    | 'CALL_REJECTED' 
    | 'CALL_ENDED'
    | 'SET_LOCAL_STREAM'
    | 'SET_REMOTE_STREAM'
    | 'TOGGLE_MUTE'
    | 'TOGGLE_VOLUME'
    | 'SET_ERROR'
    | 'RESET_STATE'
  payload?: any
}

const initialState: VoiceCallState = {
  isCallActive: false,
  isIncomingCall: false,
  isOutgoingCall: false,
  callId: null,
  participant: null,
  localStream: null,
  remoteStream: null,
  callStatus: 'idle',
  isMuted: false,
  isVolumeOn: true,
  callDuration: 0,
  error: null
}

function voiceCallReducer(state: VoiceCallState, action: VoiceCallAction): VoiceCallState {
  switch (action.type) {
    case 'INITIATE_CALL':
      return {
        ...state,
        isCallActive: true,
        isOutgoingCall: true,
        isIncomingCall: false,
        callId: action.payload.callId,
        participant: action.payload.participant,
        callStatus: 'connecting',
        error: null
      }

    case 'INCOMING_CALL':
      return {
        ...state,
        isCallActive: true,
        isIncomingCall: true,
        isOutgoingCall: false,
        callId: action.payload.callId,
        participant: action.payload.participant,
        callStatus: 'ringing',
        error: null
      }

    case 'CALL_ACCEPTED':
      return {
        ...state,
        callStatus: 'active',
        isIncomingCall: false,
        isOutgoingCall: false
      }

    case 'CALL_REJECTED':
    case 'CALL_ENDED':
      return {
        ...initialState
      }

    case 'SET_LOCAL_STREAM':
      return {
        ...state,
        localStream: action.payload
      }

    case 'SET_REMOTE_STREAM':
      return {
        ...state,
        remoteStream: action.payload
      }

    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted
      }

    case 'TOGGLE_VOLUME':
      return {
        ...state,
        isVolumeOn: !state.isVolumeOn
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        callStatus: 'ended'
      }

    case 'RESET_STATE':
      return initialState

    default:
      return state
  }
}

interface VoiceCallContextType {
  state: VoiceCallState
  initiateCall: (targetUserId: string, participant: any) => Promise<void>
  acceptCall: () => Promise<void>
  rejectCall: () => void
  endCall: () => void
  toggleMute: () => void
  toggleVolume: () => void
}

const VoiceCallContext = createContext<VoiceCallContextType | undefined>(undefined)

interface VoiceCallProviderProps {
  children: React.ReactNode
}

export function VoiceCallProvider({ children }: VoiceCallProviderProps) {
  const [state, dispatch] = useReducer(voiceCallReducer, initialState)
  const { socket, isConnected } = useSocket()

  // Initialize audio context and getUserMedia
  const initializeAudio = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        },
        video: false
      })
      
      dispatch({ type: 'SET_LOCAL_STREAM', payload: stream })
      return stream
    } catch (error) {
      console.error('Failed to get audio stream:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to access microphone' })
      throw error
    }
  }, [])

  // Initiate outgoing call
  const initiateCall = useCallback(async (targetUserId: string, participant: any) => {
    if (!socket || !isConnected) {
      dispatch({ type: 'SET_ERROR', payload: 'Not connected to server' })
      return
    }

    try {
      const callId = `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Initialize audio before starting call
      await initializeAudio()
      
      dispatch({
        type: 'INITIATE_CALL',
        payload: { callId, participant }
      })

      // Emit call initiation to server
      socket.emit('voice:initiate_call', {
        callId,
        targetUserId,
        callerInfo: participant
      })

    } catch (error) {
      console.error('Failed to initiate call:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to initiate call' })
    }
  }, [socket, isConnected, initializeAudio])

  // Accept incoming call
  const acceptCall = useCallback(async () => {
    if (!socket || !state.callId) return

    try {
      // Initialize audio
      await initializeAudio()
      
      dispatch({ type: 'CALL_ACCEPTED' })
      
      socket.emit('voice:accept_call', {
        callId: state.callId
      })

    } catch (error) {
      console.error('Failed to accept call:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to accept call' })
    }
  }, [socket, state.callId, initializeAudio])

  // Reject incoming call
  const rejectCall = useCallback(() => {
    if (!socket || !state.callId) return

    socket.emit('voice:reject_call', {
      callId: state.callId
    })

    dispatch({ type: 'CALL_REJECTED' })
  }, [socket, state.callId])

  // End active call
  const endCall = useCallback(() => {
    if (!socket || !state.callId) return

    // Stop local stream
    if (state.localStream) {
      state.localStream.getTracks().forEach(track => track.stop())
    }

    // Stop remote stream
    if (state.remoteStream) {
      state.remoteStream.getTracks().forEach(track => track.stop())
    }

    socket.emit('voice:end_call', {
      callId: state.callId
    })

    dispatch({ type: 'CALL_ENDED' })
  }, [socket, state.callId, state.localStream, state.remoteStream])

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (state.localStream) {
      state.localStream.getAudioTracks().forEach(track => {
        track.enabled = state.isMuted
      })
    }
    dispatch({ type: 'TOGGLE_MUTE' })
  }, [state.localStream, state.isMuted])

  // Toggle volume
  const toggleVolume = useCallback(() => {
    dispatch({ type: 'TOGGLE_VOLUME' })
  }, [])

  // Socket event listeners
  useEffect(() => {
    if (!socket) return

    const handleIncomingCall = (data: any) => {
      dispatch({
        type: 'INCOMING_CALL',
        payload: {
          callId: data.callId,
          participant: data.callerInfo
        }
      })
    }

    const handleCallAccepted = (data: any) => {
      dispatch({ type: 'CALL_ACCEPTED' })
    }

    const handleCallRejected = (data: any) => {
      dispatch({ type: 'CALL_REJECTED' })
    }

    const handleCallEnded = (data: any) => {
      // Clean up streams
      if (state.localStream) {
        state.localStream.getTracks().forEach(track => track.stop())
      }
      if (state.remoteStream) {
        state.remoteStream.getTracks().forEach(track => track.stop())
      }
      
      dispatch({ type: 'CALL_ENDED' })
    }

    const handleVoiceSignal = (data: any) => {
      // Handle WebRTC signaling for voice calls
      console.log('Voice signal received:', data)
    }

    socket.on('voice:incoming_call', handleIncomingCall)
    socket.on('voice:call_accepted', handleCallAccepted)
    socket.on('voice:call_rejected', handleCallRejected)
    socket.on('voice:call_ended', handleCallEnded)
    socket.on('voice:signal', handleVoiceSignal)

    return () => {
      socket.off('voice:incoming_call', handleIncomingCall)
      socket.off('voice:call_accepted', handleCallAccepted)
      socket.off('voice:call_rejected', handleCallRejected)
      socket.off('voice:call_ended', handleCallEnded)
      socket.off('voice:signal', handleVoiceSignal)
    }
  }, [socket, state.localStream, state.remoteStream])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.localStream) {
        state.localStream.getTracks().forEach(track => track.stop())
      }
      if (state.remoteStream) {
        state.remoteStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const contextValue: VoiceCallContextType = {
    state,
    initiateCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleVolume
  }

  return (
    <VoiceCallContext.Provider value={contextValue}>
      {children}
        {/* Voice Call Interface */}
      <VoiceCallInterface
        callState={{
          isActive: state.isCallActive,
          isIncoming: state.isIncomingCall,
          isOutgoing: state.isOutgoingCall,
          participant: state.participant || undefined,
          status: state.callStatus === 'idle' ? 'ended' : state.callStatus
        }}
        onAccept={acceptCall}
        onReject={rejectCall}
        onEnd={endCall}
        onToggleMute={toggleMute}
        onToggleVolume={toggleVolume}
        isMuted={state.isMuted}
        isVolumeOn={state.isVolumeOn}
      />
    </VoiceCallContext.Provider>
  )
}

export function useVoiceCall() {
  const context = useContext(VoiceCallContext)
  if (!context) {
    throw new Error('useVoiceCall must be used within a VoiceCallProvider')
  }
  return context
}
