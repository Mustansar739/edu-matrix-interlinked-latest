// ==========================================
// LIKES HANDLER - Post/Story/Comment Likes
// ==========================================

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');

/**
 * Handle Likes Events
 * - Like/Unlike posts
 * - Like/Unlike stories
 * - Like/Unlike comments
 * - Get likes count
 * - Get users who liked
 */
function handleLikeEvents(socket, io, { connectedUsers, activeRooms, redis, kafkaProducer }) {
  const userId = socket.userId;

  // Like/Unlike content
  socket.on('like:toggle', async (data, callback) => {
    try {
      const { targetId, targetType, liked } = data;
      // targetType: 'post', 'story', 'comment'

      const likeAction = {
        targetId,
        targetType,
        userId,
        liked,
        timestamp: new Date()
      };

      // Publish like event
      await eventPublishers.likeEvent(kafkaProducer, liked ? 'content_liked' : 'content_unliked', targetId, userId, {
        targetType,
        likeAction
      });

      // Broadcast like update to target room
      socket.to(`${targetType}_${targetId}`).emit('like:updated', {
        targetId,
        targetType,
        liked,
        likedBy: { id: userId, name: socket.user?.name },
        timestamp: likeAction.timestamp
      });

      logger.info('Like toggled', { userId, targetType, targetId, liked });
      callback({ success: true, likeAction });

    } catch (error) {
      logger.error('Error toggling like', { userId, error: error.message });
      callback({ success: false, error: 'Failed to toggle like' });
    }
  });

  // Get likes count for content
  socket.on('like:get_count', async (data, callback) => {
    try {
      const { targetId, targetType } = data;

      // Publish count request
      await publishEvent('like-events', {
        type: 'LIKES_COUNT_REQUESTED',
        userId,
        targetId,
        targetType,
        timestamp: new Date()
      });

      logger.info('Likes count requested', { userId, targetType, targetId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error getting likes count', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get likes count' });
    }
  });

  // Get users who liked content
  socket.on('like:get_users', async (data, callback) => {
    try {
      const { targetId, targetType, limit = 50, offset = 0 } = data;

      // Publish users request
      await publishEvent('like-events', {
        type: 'LIKES_USERS_REQUESTED',
        userId,
        targetId,
        targetType,
        filters: { limit, offset },
        timestamp: new Date()
      });

      logger.info('Likes users requested', { userId, targetType, targetId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error getting likes users', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get likes users' });
    }
  });

  // Check if user liked content
  socket.on('like:check_status', async (data, callback) => {
    try {
      const { targetId, targetType } = data;

      // Publish status check request
      await publishEvent('like-events', {
        type: 'LIKE_STATUS_REQUESTED',
        userId,
        targetId,
        targetType,
        timestamp: new Date()
      });

      logger.info('Like status requested', { userId, targetType, targetId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error checking like status', { userId, error: error.message });
      callback({ success: false, error: 'Failed to check like status' });
    }
  });

  // Get user's liked content
  socket.on('like:get_user_likes', async (data, callback) => {
    try {
      const { targetUserId, contentType = 'all', limit = 20, offset = 0 } = data;
      // contentType: 'all', 'posts', 'stories', 'comments'

      // Publish user likes request
      await publishEvent('like-events', {
        type: 'USER_LIKES_REQUESTED',
        userId,
        targetUserId,
        filters: { contentType, limit, offset },
        timestamp: new Date()
      });

      logger.info('User likes requested', { userId, targetUserId, contentType });
      callback({ success: true });

    } catch (error) {
      logger.error('Error getting user likes', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get user likes' });
    }
  });

  // Bulk like/unlike (for content creators)
  socket.on('like:bulk_toggle', async (data, callback) => {
    try {
      const { targets, liked } = data;
      // targets: [{ targetId, targetType }, ...]

      const bulkAction = {
        targets,
        liked,
        userId,
        timestamp: new Date()
      };

      // Publish bulk like event
      await publishEvent('like-events', {
        type: liked ? 'BULK_CONTENT_LIKED' : 'BULK_CONTENT_UNLIKED',
        userId,
        bulkAction,
        timestamp: new Date()
      });

      // Broadcast updates to all affected content
      targets.forEach(target => {
        socket.to(`${target.targetType}_${target.targetId}`).emit('like:updated', {
          targetId: target.targetId,
          targetType: target.targetType,
          liked,
          likedBy: { id: userId, name: socket.user?.name },
          timestamp: bulkAction.timestamp
        });
      });

      logger.info('Bulk like toggled', { userId, targetsCount: targets.length, liked });
      callback({ success: true, bulkAction });

    } catch (error) {
      logger.error('Error bulk toggling likes', { userId, error: error.message });
      callback({ success: false, error: 'Failed to bulk toggle likes' });
    }
  });

  // Like with reaction type (extended likes)
  socket.on('like:react', async (data, callback) => {
    try {
      const { targetId, targetType, reactionType } = data;
      // reactionType: 'like', 'love', 'wow', 'haha', 'sad', 'angry'

      const reaction = {
        id: `reaction_${Date.now()}_${userId}`,
        targetId,
        targetType,
        userId,
        reactionType,
        timestamp: new Date()
      };

      // Publish reaction event
      await publishEvent('like-events', {
        type: 'CONTENT_REACTION_ADDED',
        userId,
        reaction,
        timestamp: new Date()
      });

      // Broadcast reaction to target room
      socket.to(`${targetType}_${targetId}`).emit('like:reaction_added', {
        reaction,
        reactor: { id: userId, name: socket.user?.name }
      });

      logger.info('Reaction added', { userId, targetType, targetId, reactionType });
      callback({ success: true, reaction });

    } catch (error) {
      logger.error('Error adding reaction', { userId, error: error.message });
      callback({ success: false, error: 'Failed to add reaction' });
    }
  });

  // Remove reaction
  socket.on('like:remove_react', async (data, callback) => {
    try {
      const { targetId, targetType, reactionId } = data;

      // Publish reaction removal event
      await publishEvent('like-events', {
        type: 'CONTENT_REACTION_REMOVED',
        userId,
        reactionId,
        targetId,
        targetType,
        timestamp: new Date()
      });

      // Broadcast reaction removal
      socket.to(`${targetType}_${targetId}`).emit('like:reaction_removed', {
        reactionId,
        targetId,
        targetType,
        removedBy: { id: userId, name: socket.user?.name }
      });

      logger.info('Reaction removed', { userId, reactionId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error removing reaction', { userId, error: error.message });
      callback({ success: false, error: 'Failed to remove reaction' });
    }
  });

  // Get reactions summary
  socket.on('like:get_reactions', async (data, callback) => {
    try {
      const { targetId, targetType } = data;

      // Publish reactions request
      await publishEvent('like-events', {
        type: 'REACTIONS_SUMMARY_REQUESTED',
        userId,
        targetId,
        targetType,
        timestamp: new Date()
      });

      logger.info('Reactions summary requested', { userId, targetType, targetId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error getting reactions summary', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get reactions summary' });
    }
  });
}

module.exports = { handleLikeEvents };
