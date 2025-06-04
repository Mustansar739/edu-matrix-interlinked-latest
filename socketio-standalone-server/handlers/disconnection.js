// ==========================================
// DISCONNECTION HANDLER
// ==========================================
// Handles Socket.IO disconnection events

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');

/**
 * Handle Socket.IO disconnection
 */
async function handleDisconnection(socket, io, context, reason) {
  const { connectedUsers, activeRooms, activeCalls, userPresence, redis, kafkaProducer } = context;
  const userId = socket.userId;
  const userInfo = socket.userInfo;

  if (!userId) {
    logger.warn('Disconnection without user ID');
    return;
  }

  try {
    logger.info(`👋 User disconnecting: ${userInfo.name || userInfo.email} (${userId}) - Reason: ${reason}`);

    // Remove from connected users
    const user = connectedUsers.get(userId);
    if (user) {
      // Leave all rooms
      for (const roomId of user.rooms) {
        await leaveRoomOnDisconnect(socket, io, roomId, context);
      }
      
      connectedUsers.delete(userId);
    }

    // Handle active voice calls
    const userCalls = Array.from(activeCalls.entries()).filter(([callId, call]) => 
      call.participants.some(p => p.userId === userId)
    );

    for (const [callId, call] of userCalls) {
      await handleCallDisconnection(socket, io, callId, context);
    }

    // Update user presence to offline
    userPresence.set(userId, {
      status: 'offline',
      lastSeen: new Date().toISOString(),
      socketId: null
    });

    // Store offline status in Redis with expiration
    await redis.setex(`presence:${userId}`, 3600 * 24, JSON.stringify({
      status: 'offline',
      lastSeen: new Date().toISOString(),
      socketId: null,
      disconnectReason: reason
    }));

    // Remove user session
    await redis.del(`user:${userId}:session`);
    await redis.del(`user:${userId}:rooms`);

    // Publish user offline event to Kafka
    if (kafkaProducer) {
      await eventPublishers.userAction(kafkaProducer, 'user_offline', userId, {
        userInfo: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email
        },
        disconnectReason: reason,
        lastSeen: new Date().toISOString()
      });

      await eventPublishers.presenceEvent(kafkaProducer, userId, 'offline', {
        lastSeen: new Date().toISOString(),
        disconnectReason: reason
      });
    }

    // Notify other users about disconnection
    socket.broadcast.emit('user:offline', {
      userId,
      userInfo: {
        id: userInfo.id,
        name: userInfo.name,
        image: userInfo.image
      },
      lastSeen: new Date().toISOString(),
      timestamp: new Date().toISOString()
    });

    // Send updated online users count
    const onlineCount = connectedUsers.size;
    io.emit('users:online_count', { count: onlineCount });

    logger.info(`✅ User disconnection handled: ${userInfo.name || userInfo.email} (${userId})`);

  } catch (error) {
    logger.error('Error in disconnection handler:', error);
  }
}

/**
 * Leave room on disconnect
 */
async function leaveRoomOnDisconnect(socket, io, roomId, context) {
  const { activeRooms, redis, kafkaProducer } = context;
  const userId = socket.userId;
  const userInfo = socket.userInfo;

  try {
    // Update room info
    const room = activeRooms.get(roomId);
    if (room) {
      room.users = room.users.filter(u => u.userId !== userId);
      
      // Remove room if empty
      if (room.users.length === 0) {
        activeRooms.delete(roomId);
        await redis.del(`room:${roomId}:members`);
        logger.info(`🏠 Room ${roomId} removed (empty)`);
      } else {
        // Notify remaining users
        socket.to(roomId).emit('room:user_left', {
          roomId,
          userId,
          userInfo: {
            id: userInfo.id,
            name: userInfo.name,
            image: userInfo.image
          },
          reason: 'disconnect',
          timestamp: new Date().toISOString()
        });
      }
    }

    // Remove from Redis
    await redis.srem(`room:${roomId}:members`, userId);

    // Publish to Kafka
    if (kafkaProducer) {
      await eventPublishers.chatEvent(kafkaProducer, 'user_left_room_disconnect', roomId, userId, {
        userInfo: {
          id: userInfo.id,
          name: userInfo.name
        },
        reason: 'disconnect'
      });
    }

  } catch (error) {
    logger.error(`Error leaving room ${roomId} on disconnect:`, error);
  }
}

/**
 * Handle call disconnection
 */
async function handleCallDisconnection(socket, io, callId, context) {
  const { activeCalls, redis, kafkaProducer } = context;
  const userId = socket.userId;
  const userInfo = socket.userInfo;

  try {
    const call = activeCalls.get(callId);
    if (!call) return;

    // Remove user from call
    call.participants = call.participants.filter(p => p.userId !== userId);

    // Notify other participants
    socket.to(`call:${callId}`).emit('call:participant_left', {
      callId,
      userId,
      userInfo: {
        id: userInfo.id,
        name: userInfo.name,
        image: userInfo.image
      },
      reason: 'disconnect',
      timestamp: new Date().toISOString()
    });

    // End call if no participants left
    if (call.participants.length === 0) {
      activeCalls.delete(callId);
      await redis.del(`call:${callId}`);
      
      // Notify about call end
      io.to(`call:${callId}`).emit('call:ended', {
        callId,
        reason: 'no_participants',
        endedAt: new Date().toISOString()
      });

      logger.info(`📞 Call ${callId} ended (no participants)`);
    } else if (call.participants.length === 1) {
      // Notify last participant
      const lastParticipant = call.participants[0];
      io.to(`user:${lastParticipant.userId}`).emit('call:last_participant', {
        callId,
        timestamp: new Date().toISOString()
      });
    }

    // Update call in Redis
    if (call.participants.length > 0) {
      await redis.setex(`call:${callId}`, 3600, JSON.stringify(call));
    }

    // Publish to Kafka
    if (kafkaProducer) {
      await eventPublishers.voiceCallEvent(kafkaProducer, 'participant_left_disconnect', callId, userId, {
        userInfo: {
          id: userInfo.id,
          name: userInfo.name
        },
        reason: 'disconnect',
        remainingParticipants: call.participants.length
      });
    }

  } catch (error) {
    logger.error(`Error handling call disconnection for call ${callId}:`, error);
  }
}

/**
 * Handle graceful shutdown disconnections
 */
async function handleGracefulShutdown(io, context) {
  const { connectedUsers, redis, kafkaProducer } = context;

  try {
    logger.info('🛑 Initiating graceful shutdown - disconnecting all users');

    // Notify all connected users about server shutdown
    io.emit('server:shutdown', {
      message: 'Server is shutting down. You will be reconnected automatically.',
      timestamp: new Date().toISOString()
    });

    // Wait a moment for the message to be sent
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update all user presence to offline
    const userPromises = Array.from(connectedUsers.keys()).map(async (userId) => {
      await redis.setex(`presence:${userId}`, 3600 * 24, JSON.stringify({
        status: 'offline',
        lastSeen: new Date().toISOString(),
        socketId: null,
        disconnectReason: 'server_shutdown'
      }));

      // Publish offline event
      if (kafkaProducer) {
        await eventPublishers.presenceEvent(kafkaProducer, userId, 'offline', {
          lastSeen: new Date().toISOString(),
          disconnectReason: 'server_shutdown'
        });
      }
    });

    await Promise.all(userPromises);

    // Clear session data
    const sessionKeys = await redis.keys('user:*:session');
    if (sessionKeys.length > 0) {
      await redis.del(...sessionKeys);
    }

    const roomKeys = await redis.keys('user:*:rooms');
    if (roomKeys.length > 0) {
      await redis.del(...roomKeys);
    }

    logger.info('✅ Graceful shutdown completed');

  } catch (error) {
    logger.error('❌ Error during graceful shutdown:', error);
  }
}

/**
 * Clean up expired sessions and rooms
 */
async function cleanupExpiredData(context) {
  const { activeRooms, activeCalls, redis } = context;

  try {
    const now = new Date();
    const expireTime = 5 * 60 * 1000; // 5 minutes

    // Clean up empty rooms
    for (const [roomId, room] of activeRooms.entries()) {
      if (room.users.length === 0) {
        const lastActivity = new Date(room.lastActivity);
        if (now - lastActivity > expireTime) {
          activeRooms.delete(roomId);
          await redis.del(`room:${roomId}:members`);
          logger.info(`🧹 Cleaned up expired room: ${roomId}`);
        }
      }
    }

    // Clean up ended calls
    for (const [callId, call] of activeCalls.entries()) {
      if (call.participants.length === 0) {
        const startedAt = new Date(call.startedAt);
        if (now - startedAt > expireTime) {
          activeCalls.delete(callId);
          await redis.del(`call:${callId}`);
          logger.info(`🧹 Cleaned up expired call: ${callId}`);
        }
      }
    }

    // Clean up expired presence data
    const presenceKeys = await redis.keys('presence:*');
    for (const key of presenceKeys) {
      const data = await redis.get(key);
      if (data) {
        try {
          const presence = JSON.parse(data);
          const lastSeen = new Date(presence.lastSeen);
          if (now - lastSeen > 24 * 60 * 60 * 1000) { // 24 hours
            await redis.del(key);
            logger.debug(`🧹 Cleaned up expired presence: ${key}`);
          }
        } catch (error) {
          // Invalid JSON, delete the key
          await redis.del(key);
        }
      }
    }

  } catch (error) {
    logger.error('Error during cleanup:', error);
  }
}

module.exports = {
  handleDisconnection,
  handleGracefulShutdown,
  cleanupExpiredData
};
