// ==========================================
// VOICE CALLS HANDLER - WebRTC Voice/Video Calls
// ==========================================

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');

/**
 * Handle Voice/Video Calls Events
 * - Initiate call
 * - Accept/Reject call
 * - End call
 * - WebRTC signaling
 * - Group calls
 * - Screen sharing
 */
function handleVoiceCallEvents(socket, io, { connectedUsers, activeCalls, redis, kafkaProducer }) {
  const userId = socket.userId;

  // Initiate call
  socket.on('call:initiate', async (data, callback) => {
    try {
      const { targetUserId, callType, roomId } = data; // callType: 'voice', 'video', 'group'
      
      const call = {
        id: `call_${Date.now()}_${userId}`,
        callerId: userId,
        targetUserId: callType === 'group' ? null : targetUserId,
        roomId: callType === 'group' ? roomId : null,
        callType,
        status: 'calling',
        startedAt: new Date(),
        participants: callType === 'group' ? [userId] : [userId, targetUserId]
      };

      // Store call in socket
      socket.currentCall = call;

      // Join call room
      socket.join(`call_${call.id}`);

      // Publish call event
      await eventPublishers.voiceCallEvent(kafkaProducer, 'call_initiated', call.id, userId, {
        call,
        callType
      });

      if (callType === 'group') {
        // Notify all room members
        socket.to(roomId).emit('call:incoming', {
          call,
          caller: { id: userId, name: socket.userInfo?.name }
        });
      } else {
        // Notify target user
        io.to(`user_${targetUserId}`).emit('call:incoming', {
          call,
          caller: { id: userId, name: socket.userInfo?.name }
        });
      }

      logger.info('Call initiated', { userId, callId: call.id, callType });
      callback({ success: true, call });

    } catch (error) {
      logger.error('Error initiating call', { userId, error: error.message });
      callback({ success: false, error: 'Failed to initiate call' });
    }
  });

  // Accept call
  socket.on('call:accept', async (data, callback) => {
    try {
      const { callId } = data;

      socket.join(`call_${callId}`);
      socket.currentCall = { id: callId, status: 'active' };

      // Publish call accepted event
      await eventPublishers.voiceCallEvent(kafkaProducer, 'call_accepted', callId, userId, {
        acceptedAt: new Date()
      });

      // Notify caller and other participants
      socket.to(`call_${callId}`).emit('call:accepted', {
        callId,
        acceptedBy: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Call accepted', { userId, callId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error accepting call', { userId, error: error.message });
      callback({ success: false, error: 'Failed to accept call' });
    }
  });

  // Reject call
  socket.on('call:reject', async (data, callback) => {
    try {
      const { callId, reason = 'declined' } = data;

      // Publish call rejected event
      await publishEvent('call-events', {
        type: 'CALL_REJECTED',
        userId,
        callId,
        reason,
        timestamp: new Date()
      });

      // Notify caller and other participants
      socket.to(`call_${callId}`).emit('call:rejected', {
        callId,
        rejectedBy: { id: userId, name: socket.userInfo?.name },
        reason
      });

      logInfo('Call rejected', { userId, callId, reason });
      callback({ success: true });

    } catch (error) {
      logError('Error rejecting call', { userId, error: error.message });
      callback({ success: false, error: 'Failed to reject call' });
    }
  });

  // End call
  socket.on('call:end', async (data, callback) => {
    try {
      const { callId } = data;

      // Leave call room
      socket.leave(`call_${callId}`);
      socket.currentCall = null;

      // Publish call ended event
      await publishEvent('call-events', {
        type: 'CALL_ENDED',
        userId,
        callId,
        endedAt: new Date(),
        timestamp: new Date()
      });

      // Notify all participants
      socket.to(`call_${callId}`).emit('call:ended', {
        callId,
        endedBy: { id: userId, name: socket.userInfo?.name }
      });

      logInfo('Call ended', { userId, callId });
      callback({ success: true });

    } catch (error) {
      logError('Error ending call', { userId, error: error.message });
      callback({ success: false, error: 'Failed to end call' });
    }
  });

  // WebRTC Signaling - Offer
  socket.on('call:offer', async (data, callback) => {
    try {
      const { callId, targetUserId, offer } = data;

      // Forward offer to target user
      io.to(`user_${targetUserId}`).emit('call:offer', {
        callId,
        fromUserId: userId,
        offer
      });

      logInfo('Call offer sent', { userId, callId, targetUserId });
      callback({ success: true });

    } catch (error) {
      logError('Error sending call offer', { userId, error: error.message });
      callback({ success: false, error: 'Failed to send offer' });
    }
  });

  // WebRTC Signaling - Answer
  socket.on('call:answer', async (data, callback) => {
    try {
      const { callId, targetUserId, answer } = data;

      // Forward answer to target user
      io.to(`user_${targetUserId}`).emit('call:answer', {
        callId,
        fromUserId: userId,
        answer
      });

      logInfo('Call answer sent', { userId, callId, targetUserId });
      callback({ success: true });

    } catch (error) {
      logError('Error sending call answer', { userId, error: error.message });
      callback({ success: false, error: 'Failed to send answer' });
    }
  });

  // WebRTC Signaling - ICE Candidate
  socket.on('call:ice_candidate', async (data, callback) => {
    try {
      const { callId, targetUserId, candidate } = data;

      // Forward ICE candidate to target user
      io.to(`user_${targetUserId}`).emit('call:ice_candidate', {
        callId,
        fromUserId: userId,
        candidate
      });

      logInfo('ICE candidate sent', { userId, callId, targetUserId });
      callback({ success: true });

    } catch (error) {
      logError('Error sending ICE candidate', { userId, error: error.message });
      callback({ success: false, error: 'Failed to send ICE candidate' });
    }
  });

  // Mute/Unmute audio
  socket.on('call:toggle_audio', async (data, callback) => {
    try {
      const { callId, muted } = data;

      // Notify other participants
      socket.to(`call_${callId}`).emit('call:audio_toggled', {
        userId,
        muted
      });

      logInfo('Audio toggled', { userId, callId, muted });
      callback({ success: true });

    } catch (error) {
      logError('Error toggling audio', { userId, error: error.message });
      callback({ success: false, error: 'Failed to toggle audio' });
    }
  });

  // Mute/Unmute video
  socket.on('call:toggle_video', async (data, callback) => {
    try {
      const { callId, videoEnabled } = data;

      // Notify other participants
      socket.to(`call_${callId}`).emit('call:video_toggled', {
        userId,
        videoEnabled
      });

      logInfo('Video toggled', { userId, callId, videoEnabled });
      callback({ success: true });

    } catch (error) {
      logError('Error toggling video', { userId, error: error.message });
      callback({ success: false, error: 'Failed to toggle video' });
    }
  });

  // Start screen sharing
  socket.on('call:start_screen_share', async (data, callback) => {
    try {
      const { callId } = data;

      // Notify other participants
      socket.to(`call_${callId}`).emit('call:screen_share_started', {
        userId,
        sharer: { id: userId, name: socket.userInfo?.name }
      });

      logInfo('Screen sharing started', { userId, callId });
      callback({ success: true });

    } catch (error) {
      logError('Error starting screen share', { userId, error: error.message });
      callback({ success: false, error: 'Failed to start screen share' });
    }
  });

  // Stop screen sharing
  socket.on('call:stop_screen_share', async (data, callback) => {
    try {
      const { callId } = data;

      // Notify other participants
      socket.to(`call_${callId}`).emit('call:screen_share_stopped', {
        userId
      });

      logInfo('Screen sharing stopped', { userId, callId });
      callback({ success: true });

    } catch (error) {
      logError('Error stopping screen share', { userId, error: error.message });
      callback({ success: false, error: 'Failed to stop screen share' });
    }
  });

  // Join ongoing call
  socket.on('call:join', async (data, callback) => {
    try {
      const { callId } = data;

      socket.join(`call_${callId}`);
      socket.currentCall = { id: callId, status: 'active' };

      // Publish join event
      await publishEvent('call-events', {
        type: 'CALL_JOINED',
        userId,
        callId,
        timestamp: new Date()
      });

      // Notify other participants
      socket.to(`call_${callId}`).emit('call:participant_joined', {
        callId,
        participant: { id: userId, name: socket.userInfo?.name }
      });

      logInfo('Joined call', { userId, callId });
      callback({ success: true });

    } catch (error) {
      logError('Error joining call', { userId, error: error.message });
      callback({ success: false, error: 'Failed to join call' });
    }
  });

  // Leave call (without ending for others)
  socket.on('call:leave', async (data, callback) => {
    try {
      const { callId } = data;

      socket.leave(`call_${callId}`);
      socket.currentCall = null;

      // Publish leave event
      await publishEvent('call-events', {
        type: 'CALL_LEFT',
        userId,
        callId,
        timestamp: new Date()
      });

      // Notify other participants
      socket.to(`call_${callId}`).emit('call:participant_left', {
        callId,
        participant: { id: userId, name: socket.userInfo?.name }
      });

      logInfo('Left call', { userId, callId });
      callback({ success: true });

    } catch (error) {
      logError('Error leaving call', { userId, error: error.message });
      callback({ success: false, error: 'Failed to leave call' });
    }
  });
}

module.exports = { handleVoiceCallEvents };
