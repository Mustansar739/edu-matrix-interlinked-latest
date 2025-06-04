// ==========================================
// PRESENCE HANDLER - User Online Status & Activity
// ==========================================

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');

/**
 * Handle Presence Events
 * - User online/offline status
 * - Activity status (typing, away, busy)
 * - Last seen
 * - Friend presence updates
 */
function handlePresenceEvents(socket, io, { connectedUsers, userPresence, redis, kafkaProducer }) {
  const userId = socket.userId;

  // Update user status
  socket.on('presence:update_status', async (data, callback) => {
    try {
      const { status, customMessage = '' } = data;
      // status: 'online', 'away', 'busy', 'invisible', 'offline'

      const presence = {
        userId,
        status,
        customMessage,
        lastSeen: new Date(),
        updatedAt: new Date()
      };

      // Store in socket for quick access
      socket.presence = presence;

      // Publish presence update
      await publishEvent('presence-events', {
        type: 'PRESENCE_UPDATED',
        userId,
        presence,
        timestamp: new Date()
      });

      // Notify friends/contacts about status change
      socket.broadcast.emit('presence:status_updated', {
        userId,
        status,
        customMessage,
        updatedAt: presence.updatedAt
      });

      logInfo('Presence status updated', { userId, status });
      callback({ success: true, presence });

    } catch (error) {
      logError('Error updating presence status', { userId, error: error.message });
      callback({ success: false, error: 'Failed to update status' });
    }
  });

  // Set activity status (typing, etc.)
  socket.on('presence:set_activity', async (data, callback) => {
    try {
      const { activity, context = '' } = data;
      // activity: 'typing', 'recording', 'uploading', 'reading', 'studying'

      const activityStatus = {
        userId,
        activity,
        context, // room/chat ID where activity is happening
        startedAt: new Date()
      };

      // Store activity in socket
      socket.currentActivity = activityStatus;

      // Notify relevant users based on context
      if (context) {
        socket.to(context).emit('presence:activity_started', {
          userId,
          activity,
          context,
          user: { id: userId, name: socket.userInfo?.name }
        });
      }

      logInfo('Activity status set', { userId, activity, context });
      callback({ success: true, activityStatus });

    } catch (error) {
      logError('Error setting activity status', { userId, error: error.message });
      callback({ success: false, error: 'Failed to set activity' });
    }
  });

  // Clear activity status
  socket.on('presence:clear_activity', async (data, callback) => {
    try {
      const { context = '' } = data;

      const previousActivity = socket.currentActivity;
      socket.currentActivity = null;

      // Notify relevant users
      if (context && previousActivity) {
        socket.to(context).emit('presence:activity_stopped', {
          userId,
          activity: previousActivity.activity,
          context,
          duration: new Date() - previousActivity.startedAt
        });
      }

      logInfo('Activity status cleared', { userId, context });
      callback({ success: true });

    } catch (error) {
      logError('Error clearing activity status', { userId, error: error.message });
      callback({ success: false, error: 'Failed to clear activity' });
    }
  });

  // Get friends' presence
  socket.on('presence:get_friends', async (data, callback) => {
    try {
      const { friendIds = [] } = data;

      // Publish friends presence request
      await publishEvent('presence-events', {
        type: 'FRIENDS_PRESENCE_REQUESTED',
        userId,
        friendIds,
        timestamp: new Date()
      });

      logInfo('Friends presence requested', { userId, friendCount: friendIds.length });
      callback({ success: true });

    } catch (error) {
      logError('Error getting friends presence', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get friends presence' });
    }
  });

  // Subscribe to user presence updates
  socket.on('presence:subscribe', async (data, callback) => {
    try {
      const { targetUserIds = [] } = data;

      // Join presence rooms for specific users
      targetUserIds.forEach(targetUserId => {
        socket.join(`presence_${targetUserId}`);
      });

      logInfo('Subscribed to presence updates', { userId, targetUserIds });
      callback({ success: true });

    } catch (error) {
      logError('Error subscribing to presence', { userId, error: error.message });
      callback({ success: false, error: 'Failed to subscribe to presence' });
    }
  });

  // Unsubscribe from user presence updates
  socket.on('presence:unsubscribe', async (data, callback) => {
    try {
      const { targetUserIds = [] } = data;

      // Leave presence rooms
      targetUserIds.forEach(targetUserId => {
        socket.leave(`presence_${targetUserId}`);
      });

      logInfo('Unsubscribed from presence updates', { userId, targetUserIds });
      callback({ success: true });

    } catch (error) {
      logError('Error unsubscribing from presence', { userId, error: error.message });
      callback({ success: false, error: 'Failed to unsubscribe from presence' });
    }
  });

  // Set user as away (idle detection)
  socket.on('presence:set_away', async (callback) => {
    try {
      const presence = {
        userId,
        status: 'away',
        lastSeen: new Date(),
        updatedAt: new Date()
      };

      socket.presence = presence;

      // Publish away status
      await publishEvent('presence-events', {
        type: 'USER_AWAY',
        userId,
        presence,
        timestamp: new Date()
      });

      // Notify subscribers
      socket.to(`presence_${userId}`).emit('presence:status_updated', {
        userId,
        status: 'away',
        updatedAt: presence.updatedAt
      });

      logInfo('User set to away', { userId });
      callback({ success: true });

    } catch (error) {
      logError('Error setting user away', { userId, error: error.message });
      callback({ success: false, error: 'Failed to set away status' });
    }
  });

  // Set user as back (active)
  socket.on('presence:set_back', async (callback) => {
    try {
      const presence = {
        userId,
        status: 'online',
        lastSeen: new Date(),
        updatedAt: new Date()
      };

      socket.presence = presence;

      // Publish back status
      await publishEvent('presence-events', {
        type: 'USER_BACK',
        userId,
        presence,
        timestamp: new Date()
      });

      // Notify subscribers
      socket.to(`presence_${userId}`).emit('presence:status_updated', {
        userId,
        status: 'online',
        updatedAt: presence.updatedAt
      });

      logInfo('User back online', { userId });
      callback({ success: true });

    } catch (error) {
      logError('Error setting user back', { userId, error: error.message });
      callback({ success: false, error: 'Failed to set back status' });
    }
  });

  // Get user's current presence
  socket.on('presence:get_status', async (data, callback) => {
    try {
      const { targetUserId } = data;

      // Publish presence request
      await publishEvent('presence-events', {
        type: 'PRESENCE_STATUS_REQUESTED',
        userId,
        targetUserId,
        timestamp: new Date()
      });

      logInfo('Presence status requested', { userId, targetUserId });
      callback({ success: true });

    } catch (error) {
      logError('Error getting presence status', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get presence status' });
    }
  });

  // Update last seen timestamp
  socket.on('presence:ping', async (callback) => {
    try {
      const lastSeen = new Date();
      
      if (socket.presence) {
        socket.presence.lastSeen = lastSeen;
      }

      // Publish ping event (for activity tracking)
      await publishEvent('presence-events', {
        type: 'USER_PING',
        userId,
        lastSeen,
        timestamp: new Date()
      });

      callback({ success: true, lastSeen });

    } catch (error) {
      logError('Error updating ping', { userId, error: error.message });
      callback({ success: false, error: 'Failed to update ping' });
    }
  });

  // Set presence for study mode
  socket.on('presence:study_mode', async (data, callback) => {
    try {
      const { enabled, subject = '', endTime = null } = data;

      const studyMode = {
        enabled,
        subject,
        startTime: enabled ? new Date() : null,
        endTime: endTime ? new Date(endTime) : null
      };

      // Update socket presence
      if (socket.presence) {
        socket.presence.studyMode = studyMode;
        socket.presence.status = enabled ? 'studying' : 'online';
      }

      // Publish study mode update
      await publishEvent('presence-events', {
        type: 'STUDY_MODE_UPDATED',
        userId,
        studyMode,
        timestamp: new Date()
      });

      // Notify presence subscribers
      socket.to(`presence_${userId}`).emit('presence:study_mode_updated', {
        userId,
        studyMode,
        user: { id: userId, name: socket.userInfo?.name }
      });

      logInfo('Study mode updated', { userId, enabled, subject });
      callback({ success: true, studyMode });

    } catch (error) {
      logError('Error updating study mode', { userId, error: error.message });
      callback({ success: false, error: 'Failed to update study mode' });
    }
  });
}

module.exports = { handlePresenceEvents };
