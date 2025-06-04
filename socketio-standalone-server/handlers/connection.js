// ==========================================
// CONNECTION HANDLER
// ==========================================
// Handles Socket.IO connection events

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');

/**
 * Handle new Socket.IO connection
 */
async function handleConnection(socket, io, context) {
  const { connectedUsers, activeRooms, redis, kafkaProducer } = context;
  const userId = socket.userId;
  const userInfo = socket.userInfo;

  try {
    // Store user session in Redis
    await redis.setex(`user:${userId}:session`, 3600 * 24, JSON.stringify({
      socketId: socket.id,
      connectedAt: new Date().toISOString(),
      userInfo: {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        image: userInfo.image
      }
    }));

    // Join user to their personal room for notifications
    await socket.join(`user:${userId}`);
    
    // Join user to general feed room
    await socket.join('global-feed');
    
    // Store user presence
    await redis.setex(`presence:${userId}`, 300, JSON.stringify({
      status: 'online',
      lastSeen: new Date().toISOString(),
      socketId: socket.id
    }));

    // Publish user online event to Kafka
    if (kafkaProducer) {
      await eventPublishers.userAction(kafkaProducer, 'user_online', userId, {
        userInfo: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          image: userInfo.image
        },
        socketId: socket.id
      });

      await eventPublishers.presenceEvent(kafkaProducer, userId, 'online', {
        socketId: socket.id,
        userInfo: {
          id: userInfo.id,
          name: userInfo.name
        }
      });
    }

    // Send connection acknowledgment
    socket.emit('connection:ack', {
      success: true,
      userId,
      connectionId: socket.id,
      timestamp: new Date().toISOString(),
      features: {
        posts: true,
        stories: true,
        comments: true,
        likes: true,
        voiceCalls: process.env.ENABLE_VIDEO_CALLS === 'true',
        fileSharing: process.env.ENABLE_FILE_SHARING === 'true',
        screenSharing: process.env.ENABLE_SCREEN_SHARING === 'true',
        liveStreaming: process.env.ENABLE_LIVE_STREAMING === 'true'
      }
    });

    // Send current online users count
    const onlineCount = connectedUsers.size;
    socket.emit('users:online_count', { count: onlineCount });

    // Notify other users about new connection (optional, for friends/contacts)
    socket.broadcast.emit('user:online', {
      userId,
      userInfo: {
        id: userInfo.id,
        name: userInfo.name,
        image: userInfo.image
      },
      timestamp: new Date().toISOString()
    });

    logger.info(`✅ User connection established: ${userInfo.name || userInfo.email} (${userId})`);

    // Handle join room requests
    socket.on('room:join', async (data) => {
      try {
        const { roomId, roomType } = data;
        
        if (!roomId || !roomType) {
          socket.emit('error', { message: 'Invalid room data' });
          return;
        }

        await joinRoom(socket, io, roomId, roomType, context);
      } catch (error) {
        logger.error('Error joining room:', error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    // Handle leave room requests
    socket.on('room:leave', async (data) => {
      try {
        const { roomId } = data;
        
        if (!roomId) {
          socket.emit('error', { message: 'Invalid room ID' });
          return;
        }

        await leaveRoom(socket, io, roomId, context);
      } catch (error) {
        logger.error('Error leaving room:', error);
        socket.emit('error', { message: 'Failed to leave room' });
      }
    });

    // Handle get room info requests
    socket.on('room:info', async (data) => {
      try {
        const { roomId } = data;
        const roomInfo = await getRoomInfo(roomId, context);
        socket.emit('room:info', roomInfo);
      } catch (error) {
        logger.error('Error getting room info:', error);
        socket.emit('error', { message: 'Failed to get room info' });
      }
    });

    // Handle get online users requests
    socket.on('users:get_online', () => {
      const onlineUsers = Array.from(connectedUsers.values()).map(user => ({
        userId: user.userId,
        userInfo: {
          id: user.userInfo.id,
          name: user.userInfo.name,
          image: user.userInfo.image
        },
        connectedAt: user.connectedAt
      }));

      socket.emit('users:online_list', { users: onlineUsers });
    });

  } catch (error) {
    logger.error('Error in connection handler:', error);
    socket.emit('error', { message: 'Connection setup failed' });
  }
}

/**
 * Join a room
 */
async function joinRoom(socket, io, roomId, roomType, context) {
  const { connectedUsers, activeRooms, redis, kafkaProducer } = context;
  const userId = socket.userId;
  const userInfo = socket.userInfo;

  // Validate room access (can be extended with database checks)
  if (!isValidRoomType(roomType)) {
    throw new Error('Invalid room type');
  }

  // Join the Socket.IO room
  await socket.join(roomId);

  // Update user's room list
  const user = connectedUsers.get(userId);
  if (user) {
    user.rooms.add(roomId);
  }

  // Update room info
  if (!activeRooms.has(roomId)) {
    activeRooms.set(roomId, {
      id: roomId,
      type: roomType,
      users: [],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    });
  }

  const room = activeRooms.get(roomId);
  if (!room.users.find(u => u.userId === userId)) {
    room.users.push({
      userId,
      userInfo: {
        id: userInfo.id,
        name: userInfo.name,
        image: userInfo.image
      },
      joinedAt: new Date().toISOString()
    });
  }

  // Store room membership in Redis
  await redis.sadd(`room:${roomId}:members`, userId);
  await redis.setex(`user:${userId}:rooms`, 3600, JSON.stringify(Array.from(user?.rooms || [])));

  // Notify room about new member
  socket.to(roomId).emit('room:user_joined', {
    roomId,
    userId,
    userInfo: {
      id: userInfo.id,
      name: userInfo.name,
      image: userInfo.image
    },
    timestamp: new Date().toISOString()
  });

  // Send room info to user
  socket.emit('room:joined', {
    roomId,
    roomType,
    users: room.users,
    timestamp: new Date().toISOString()
  });

  // Publish to Kafka
  if (kafkaProducer) {
    await eventPublishers.chatEvent(kafkaProducer, 'user_joined_room', roomId, userId, {
      roomType,
      userInfo: {
        id: userInfo.id,
        name: userInfo.name
      }
    });
  }

  logger.info(`👥 User ${userInfo.name} joined room ${roomId} (${roomType})`);
}

/**
 * Leave a room
 */
async function leaveRoom(socket, io, roomId, context) {
  const { connectedUsers, activeRooms, redis, kafkaProducer } = context;
  const userId = socket.userId;
  const userInfo = socket.userInfo;

  // Leave the Socket.IO room
  await socket.leave(roomId);

  // Update user's room list
  const user = connectedUsers.get(userId);
  if (user) {
    user.rooms.delete(roomId);
  }

  // Update room info
  const room = activeRooms.get(roomId);
  if (room) {
    room.users = room.users.filter(u => u.userId !== userId);
    
    // Remove room if empty
    if (room.users.length === 0) {
      activeRooms.delete(roomId);
      await redis.del(`room:${roomId}:members`);
    }
  }

  // Remove from Redis
  await redis.srem(`room:${roomId}:members`, userId);
  await redis.setex(`user:${userId}:rooms`, 3600, JSON.stringify(Array.from(user?.rooms || [])));

  // Notify room about member leaving
  socket.to(roomId).emit('room:user_left', {
    roomId,
    userId,
    userInfo: {
      id: userInfo.id,
      name: userInfo.name,
      image: userInfo.image
    },
    timestamp: new Date().toISOString()
  });

  // Confirm to user
  socket.emit('room:left', {
    roomId,
    timestamp: new Date().toISOString()
  });

  // Publish to Kafka
  if (kafkaProducer) {
    await eventPublishers.chatEvent(kafkaProducer, 'user_left_room', roomId, userId, {
      userInfo: {
        id: userInfo.id,
        name: userInfo.name
      }
    });
  }

  logger.info(`👋 User ${userInfo.name} left room ${roomId}`);
}

/**
 * Get room information
 */
async function getRoomInfo(roomId, context) {
  const { activeRooms, redis } = context;

  const room = activeRooms.get(roomId);
  if (!room) {
    // Try to get from Redis
    const members = await redis.smembers(`room:${roomId}:members`);
    return {
      roomId,
      exists: false,
      memberCount: members.length
    };
  }

  return {
    roomId: room.id,
    type: room.type,
    users: room.users.map(u => ({
      userId: u.userId,
      userInfo: u.userInfo,
      joinedAt: u.joinedAt
    })),
    createdAt: room.createdAt,
    lastActivity: room.lastActivity,
    memberCount: room.users.length
  };
}

/**
 * Validate room type
 */
function isValidRoomType(roomType) {
  const validTypes = ['chat', 'study-group', 'course', 'voice-call', 'general', 'post', 'story'];
  return validTypes.includes(roomType);
}

module.exports = {
  handleConnection,
  joinRoom,
  leaveRoom,
  getRoomInfo
};
