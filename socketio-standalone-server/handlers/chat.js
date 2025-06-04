// ==========================================
// CHAT EVENTS HANDLER
// ==========================================
// Handles real-time chat messaging

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');
const { validateEventData } = require('../middleware/validation');
const { checkMessageRateLimit } = require('../middleware/rateLimit');

/**
 * Handle chat-related events
 */
function handleChatEvents(socket, io, context) {
  const { connectedUsers, activeRooms, redis, kafkaProducer } = context;

  // Send message
  socket.on('chat:send_message', async (data) => {
    try {
      // Rate limiting
      if (!await checkMessageRateLimit(socket)) {
        return;
      }

      // Validate data
      const validatedData = validateEventData('message', data);
      
      const messageId = `msg_${Date.now()}_${socket.userId}`;
      const message = {
        id: messageId,
        roomId: validatedData.roomId,
        content: validatedData.content,
        type: validatedData.type || 'text',
        attachments: validatedData.attachments || [],
        replyTo: validatedData.replyTo || null,
        mentions: validatedData.mentions || [],
        author: {
          id: socket.userInfo.id,
          name: socket.userInfo.name,
          image: socket.userInfo.image
        },
        createdAt: new Date().toISOString(),
        edited: false,
        reactions: {},
        readBy: [socket.userId] // Author has read the message
      };

      // Check if user is in the room
      const isInRoom = Array.from(socket.rooms).includes(validatedData.roomId);
      if (!isInRoom) {
        socket.emit('error', { message: 'You are not in this room' });
        return;
      }

      // Store message in Redis
      await redis.lpush(`room:${validatedData.roomId}:messages`, JSON.stringify(message));
      await redis.ltrim(`room:${validatedData.roomId}:messages`, 0, 999); // Keep last 1000 messages

      // Store message details
      await redis.setex(`message:${messageId}`, 3600 * 24 * 7, JSON.stringify(message)); // 7 days

      // Update room last activity
      const room = activeRooms.get(validatedData.roomId);
      if (room) {
        room.lastActivity = new Date().toISOString();
      }

      // Send to room
      io.to(validatedData.roomId).emit('chat:new_message', message);

      // Send delivery confirmation to sender
      socket.emit('chat:message_sent', {
        messageId,
        roomId: validatedData.roomId,
        timestamp: new Date().toISOString()
      });

      // Handle mentions
      if (validatedData.mentions && validatedData.mentions.length > 0) {
        for (const mentionedUserId of validatedData.mentions) {
          io.to(`user:${mentionedUserId}`).emit('chat:mentioned', {
            messageId,
            message,
            mentionedBy: {
              id: socket.userInfo.id,
              name: socket.userInfo.name,
              image: socket.userInfo.image
            }
          });
        }
      }

      // Publish to Kafka
      if (kafkaProducer) {
        await eventPublishers.chatEvent(kafkaProducer, 'message_sent', validatedData.roomId, socket.userId, {
          messageId,
          message,
          mentions: validatedData.mentions
        });
      }

      logger.info(`💬 Message sent: ${messageId} in room ${validatedData.roomId} by ${socket.userInfo.name}`);

    } catch (error) {
      logger.error('Error sending message:', error);
      socket.emit('error', { 
        type: 'CHAT_SEND_ERROR',
        message: 'Failed to send message',
        details: error.message 
      });
    }
  });

  // Edit message
  socket.on('chat:edit_message', async (data) => {
    try {
      const { messageId, newContent } = data;

      if (!messageId || !newContent) {
        socket.emit('error', { message: 'Message ID and new content required' });
        return;
      }

      // Get existing message
      const messageData = await redis.get(`message:${messageId}`);
      if (!messageData) {
        socket.emit('error', { message: 'Message not found' });
        return;
      }

      const message = JSON.parse(messageData);

      // Check if user owns the message
      if (message.author.id !== socket.userInfo.id) {
        socket.emit('error', { message: 'Unauthorized to edit this message' });
        return;
      }

      // Check if message is not too old (30 minutes)
      const messageAge = Date.now() - new Date(message.createdAt).getTime();
      if (messageAge > 30 * 60 * 1000) {
        socket.emit('error', { message: 'Message too old to edit' });
        return;
      }

      // Update message
      const updatedMessage = {
        ...message,
        content: newContent,
        edited: true,
        editedAt: new Date().toISOString()
      };

      // Store updated message
      await redis.setex(`message:${messageId}`, 3600 * 24 * 7, JSON.stringify(updatedMessage));

      // Update in room messages list
      const roomMessages = await redis.lrange(`room:${message.roomId}:messages`, 0, -1);
      const updatedMessages = roomMessages.map(msgStr => {
        const msg = JSON.parse(msgStr);
        return msg.id === messageId ? JSON.stringify(updatedMessage) : msgStr;
      });
      
      // Replace the entire list
      await redis.del(`room:${message.roomId}:messages`);
      if (updatedMessages.length > 0) {
        await redis.lpush(`room:${message.roomId}:messages`, ...updatedMessages.reverse());
      }

      // Broadcast update
      io.to(message.roomId).emit('chat:message_edited', updatedMessage);

      // Send confirmation
      socket.emit('chat:edit_success', {
        messageId,
        message: updatedMessage,
        timestamp: new Date().toISOString()
      });

      // Publish to Kafka
      if (kafkaProducer) {
        await eventPublishers.chatEvent(kafkaProducer, 'message_edited', message.roomId, socket.userId, {
          messageId,
          originalContent: message.content,
          newContent,
          editedAt: updatedMessage.editedAt
        });
      }

      logger.info(`✏️ Message edited: ${messageId} by ${socket.userInfo.name}`);

    } catch (error) {
      logger.error('Error editing message:', error);
      socket.emit('error', { 
        type: 'CHAT_EDIT_ERROR',
        message: 'Failed to edit message',
        details: error.message 
      });
    }
  });

  // Delete message
  socket.on('chat:delete_message', async (data) => {
    try {
      const { messageId } = data;

      if (!messageId) {
        socket.emit('error', { message: 'Message ID required' });
        return;
      }

      // Get existing message
      const messageData = await redis.get(`message:${messageId}`);
      if (!messageData) {
        socket.emit('error', { message: 'Message not found' });
        return;
      }

      const message = JSON.parse(messageData);

      // Check permissions
      const isOwner = message.author.id === socket.userInfo.id;
      const isAdmin = socket.userInfo.role === 'admin' || socket.userInfo.role === 'super_admin';

      if (!isOwner && !isAdmin) {
        socket.emit('error', { message: 'Unauthorized to delete this message' });
        return;
      }

      // Remove from Redis
      await redis.del(`message:${messageId}`);

      // Remove from room messages list
      const roomMessages = await redis.lrange(`room:${message.roomId}:messages`, 0, -1);
      const filteredMessages = roomMessages.filter(msgStr => {
        const msg = JSON.parse(msgStr);
        return msg.id !== messageId;
      });
      
      await redis.del(`room:${message.roomId}:messages`);
      if (filteredMessages.length > 0) {
        await redis.lpush(`room:${message.roomId}:messages`, ...filteredMessages.reverse());
      }

      // Broadcast deletion
      io.to(message.roomId).emit('chat:message_deleted', {
        messageId,
        roomId: message.roomId,
        deletedBy: {
          id: socket.userInfo.id,
          name: socket.userInfo.name
        },
        timestamp: new Date().toISOString()
      });

      // Send confirmation
      socket.emit('chat:delete_success', {
        messageId,
        timestamp: new Date().toISOString()
      });

      // Publish to Kafka
      if (kafkaProducer) {
        await eventPublishers.chatEvent(kafkaProducer, 'message_deleted', message.roomId, socket.userId, {
          messageId,
          originalAuthor: message.author.id,
          deletedBy: socket.userInfo.id,
          isAdmin
        });
      }

      logger.info(`🗑️ Message deleted: ${messageId} by ${socket.userInfo.name}`);

    } catch (error) {
      logger.error('Error deleting message:', error);
      socket.emit('error', { 
        type: 'CHAT_DELETE_ERROR',
        message: 'Failed to delete message',
        details: error.message 
      });
    }
  });

  // Get room messages
  socket.on('chat:get_messages', async (data) => {
    try {
      const { roomId, limit = 50, before = null } = data;

      if (!roomId) {
        socket.emit('error', { message: 'Room ID required' });
        return;
      }

      // Check if user is in the room
      const isInRoom = Array.from(socket.rooms).includes(roomId);
      if (!isInRoom) {
        socket.emit('error', { message: 'You are not in this room' });
        return;
      }

      // Get messages from Redis
      const messagesData = await redis.lrange(`room:${roomId}:messages`, 0, limit - 1);
      const messages = messagesData.map(msgStr => JSON.parse(msgStr));

      // Filter messages if 'before' timestamp is provided
      let filteredMessages = messages;
      if (before) {
        const beforeTime = new Date(before);
        filteredMessages = messages.filter(msg => new Date(msg.createdAt) < beforeTime);
      }

      // Sort by creation time (newest first)
      filteredMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      socket.emit('chat:messages', {
        roomId,
        messages: filteredMessages,
        hasMore: messagesData.length === limit,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Error getting messages:', error);
      socket.emit('error', { 
        type: 'CHAT_GET_MESSAGES_ERROR',
        message: 'Failed to get messages',
        details: error.message 
      });
    }
  });

  // Mark messages as read
  socket.on('chat:mark_read', async (data) => {
    try {
      const { roomId, messageIds } = data;

      if (!roomId || !messageIds || !Array.isArray(messageIds)) {
        socket.emit('error', { message: 'Room ID and message IDs required' });
        return;
      }

      // Check if user is in the room
      const isInRoom = Array.from(socket.rooms).includes(roomId);
      if (!isInRoom) {
        socket.emit('error', { message: 'You are not in this room' });
        return;
      }

      // Update read status for each message
      for (const messageId of messageIds) {
        const messageData = await redis.get(`message:${messageId}`);
        if (messageData) {
          const message = JSON.parse(messageData);
          
          if (!message.readBy.includes(socket.userId)) {
            message.readBy.push(socket.userId);
            await redis.setex(`message:${messageId}`, 3600 * 24 * 7, JSON.stringify(message));
          }
        }
      }

      // Notify other room members about read status
      socket.to(roomId).emit('chat:messages_read', {
        roomId,
        messageIds,
        readBy: {
          id: socket.userInfo.id,
          name: socket.userInfo.name
        },
        timestamp: new Date().toISOString()
      });

      // Send confirmation
      socket.emit('chat:mark_read_success', {
        roomId,
        messageIds,
        timestamp: new Date().toISOString()
      });

      // Publish to Kafka
      if (kafkaProducer) {
        await eventPublishers.chatEvent(kafkaProducer, 'messages_read', roomId, socket.userId, {
          messageIds,
          readBy: socket.userInfo.id
        });
      }

    } catch (error) {
      logger.error('Error marking messages as read:', error);
      socket.emit('error', { 
        type: 'CHAT_MARK_READ_ERROR',
        message: 'Failed to mark messages as read',
        details: error.message 
      });
    }
  });

  // Typing indicator
  socket.on('chat:typing', async (data) => {
    try {
      const validatedData = validateEventData('typing', data);
      const { roomId, isTyping } = validatedData;

      // Check if user is in the room
      const isInRoom = Array.from(socket.rooms).includes(roomId);
      if (!isInRoom) {
        return;
      }

      // Broadcast typing status to room (except sender)
      socket.to(roomId).emit('chat:user_typing', {
        roomId,
        userId: socket.userId,
        userInfo: {
          id: socket.userInfo.id,
          name: socket.userInfo.name,
          image: socket.userInfo.image
        },
        isTyping,
        timestamp: new Date().toISOString()
      });

      // Store typing status in Redis with short expiration
      if (isTyping) {
        await redis.setex(`typing:${roomId}:${socket.userId}`, 10, '1'); // 10 seconds
      } else {
        await redis.del(`typing:${roomId}:${socket.userId}`);
      }

    } catch (error) {
      logger.error('Error handling typing indicator:', error);
    }
  });

  // Get typing users
  socket.on('chat:get_typing', async (data) => {
    try {
      const { roomId } = data;

      if (!roomId) {
        socket.emit('error', { message: 'Room ID required' });
        return;
      }

      // Get typing users from Redis
      const typingKeys = await redis.keys(`typing:${roomId}:*`);
      const typingUsers = [];

      for (const key of typingKeys) {
        const userId = key.split(':')[2];
        if (userId !== socket.userId) { // Don't include the requesting user
          const user = connectedUsers.get(userId);
          if (user) {
            typingUsers.push({
              userId,
              userInfo: {
                id: user.userInfo.id,
                name: user.userInfo.name,
                image: user.userInfo.image
              }
            });
          }
        }
      }

      socket.emit('chat:typing_users', {
        roomId,
        typingUsers,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Error getting typing users:', error);
      socket.emit('error', { 
        type: 'CHAT_GET_TYPING_ERROR',
        message: 'Failed to get typing users',
        details: error.message 
      });
    }
  });

  // React to message
  socket.on('chat:react', async (data) => {
    try {
      const { messageId, reaction } = data;

      if (!messageId || !reaction) {
        socket.emit('error', { message: 'Message ID and reaction required' });
        return;
      }

      // Get message
      const messageData = await redis.get(`message:${messageId}`);
      if (!messageData) {
        socket.emit('error', { message: 'Message not found' });
        return;
      }

      const message = JSON.parse(messageData);

      // Check if user is in the room
      const isInRoom = Array.from(socket.rooms).includes(message.roomId);
      if (!isInRoom) {
        socket.emit('error', { message: 'You are not in this room' });
        return;
      }

      // Update reactions
      if (!message.reactions) {
        message.reactions = {};
      }

      if (!message.reactions[reaction]) {
        message.reactions[reaction] = [];
      }

      // Toggle reaction
      const userIndex = message.reactions[reaction].indexOf(socket.userId);
      if (userIndex > -1) {
        message.reactions[reaction].splice(userIndex, 1);
        if (message.reactions[reaction].length === 0) {
          delete message.reactions[reaction];
        }
      } else {
        message.reactions[reaction].push(socket.userId);
      }

      // Store updated message
      await redis.setex(`message:${messageId}`, 3600 * 24 * 7, JSON.stringify(message));

      // Broadcast reaction update
      io.to(message.roomId).emit('chat:message_reaction', {
        messageId,
        reactions: message.reactions,
        userId: socket.userId,
        reaction,
        timestamp: new Date().toISOString()
      });

      // Publish to Kafka
      if (kafkaProducer) {
        await eventPublishers.chatEvent(kafkaProducer, 'message_reaction', message.roomId, socket.userId, {
          messageId,
          reaction,
          action: userIndex > -1 ? 'removed' : 'added'
        });
      }

    } catch (error) {
      logger.error('Error reacting to message:', error);
      socket.emit('error', { 
        type: 'CHAT_REACT_ERROR',
        message: 'Failed to react to message',
        details: error.message 
      });
    }
  });
}

module.exports = {
  handleChatEvents
};
