// ==========================================
// COMMENTS HANDLER - Post/Story Comments
// ==========================================

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');

/**
 * Handle Comments Events
 * - Add comment
 * - Edit comment
 * - Delete comment
 * - Reply to comment
 * - Like comment
 * - Report comment
 */
function handleCommentEvents(socket, io, { connectedUsers, activeRooms, redis, kafkaProducer }) {
  const userId = socket.userId;

  // Add comment to post/story
  socket.on('comment:add', async (data, callback) => {
    try {
      const { targetId, targetType, content, parentCommentId = null } = data;
      // targetType: 'post', 'story', 'comment' (for replies)

      const comment = {
        id: `comment_${Date.now()}_${userId}`,
        targetId,
        targetType,
        content,
        parentCommentId,
        userId,
        createdAt: new Date(),
        edited: false,
        likes: 0,
        replies: 0,
        reported: false
      };      // Publish comment event
      if (kafkaProducer) {
        await eventPublishers.commentEvent(kafkaProducer, 'comment_added', targetId, userId, {
          comment,
          targetType
        });
      }

      // Notify post/story author and other commenters
      socket.to(`${targetType}_${targetId}`).emit('comment:new', {
        comment,
        author: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Comment added', { userId, commentId: comment.id, targetType, targetId });
      callback({ success: true, comment });    } catch (error) {
      logger.error('Error adding comment', { userId, error: error.message });
      callback({ success: false, error: 'Failed to add comment' });
    }
  });

  // Edit comment
  socket.on('comment:edit', async (data, callback) => {
    try {
      const { commentId, content } = data;

      const updatedComment = {
        commentId,
        content,
        editedAt: new Date(),
        edited: true
      };      // Publish edit event
      if (kafkaProducer) {
        await eventPublishers.commentEvent(kafkaProducer, 'comment_edited', commentId, userId, {
          updatedComment
        });
      }

      // Broadcast update
      socket.broadcast.emit('comment:updated', {
        commentId,
        content,
        editedAt: updatedComment.editedAt,
        editedBy: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Comment edited', { userId, commentId });
      callback({ success: true, updatedComment });

    } catch (error) {
      logError('Error editing comment', { userId, error: error.message });
      callback({ success: false, error: 'Failed to edit comment' });
    }
  });

  // Delete comment
  socket.on('comment:delete', async (data, callback) => {
    try {
      const { commentId, targetId, targetType } = data;

      // Publish delete event
      await publishEvent('comment-events', {
        type: 'COMMENT_DELETED',
        userId,
        commentId,
        targetId,
        targetType,
        timestamp: new Date()
      });

      // Broadcast deletion
      socket.to(`${targetType}_${targetId}`).emit('comment:deleted', {
        commentId,
        deletedBy: { id: userId, name: socket.user?.name }
      });

      logInfo('Comment deleted', { userId, commentId });
      callback({ success: true });

    } catch (error) {
      logError('Error deleting comment', { userId, error: error.message });
      callback({ success: false, error: 'Failed to delete comment' });
    }
  });

  // Like/Unlike comment
  socket.on('comment:like', async (data, callback) => {
    try {
      const { commentId, liked } = data;

      // Publish like event
      await publishEvent('comment-events', {
        type: liked ? 'COMMENT_LIKED' : 'COMMENT_UNLIKED',
        userId,
        commentId,
        timestamp: new Date()
      });

      // Broadcast like update
      socket.broadcast.emit('comment:like_updated', {
        commentId,
        liked,
        likedBy: { id: userId, name: socket.user?.name }
      });

      logInfo('Comment like updated', { userId, commentId, liked });
      callback({ success: true });

    } catch (error) {
      logError('Error updating comment like', { userId, error: error.message });
      callback({ success: false, error: 'Failed to update comment like' });
    }
  });

  // Report comment
  socket.on('comment:report', async (data, callback) => {
    try {
      const { commentId, reason, description = '' } = data;

      const report = {
        id: `report_${Date.now()}_${userId}`,
        commentId,
        reportedBy: userId,
        reason,
        description,
        reportedAt: new Date(),
        status: 'pending'
      };

      // Publish report event
      await publishEvent('comment-events', {
        type: 'COMMENT_REPORTED',
        userId,
        report,
        timestamp: new Date()
      });

      logInfo('Comment reported', { userId, commentId, reason });
      callback({ success: true, report });

    } catch (error) {
      logError('Error reporting comment', { userId, error: error.message });
      callback({ success: false, error: 'Failed to report comment' });
    }
  });

  // Get comments for target
  socket.on('comment:get', async (data, callback) => {
    try {
      const { targetId, targetType, limit = 20, offset = 0 } = data;

      // Publish get comments request
      await publishEvent('comment-events', {
        type: 'COMMENTS_REQUESTED',
        userId,
        targetId,
        targetType,
        filters: { limit, offset },
        timestamp: new Date()
      });

      logInfo('Comments requested', { userId, targetId, targetType });
      callback({ success: true });

    } catch (error) {
      logError('Error getting comments', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get comments' });
    }
  });
}

module.exports = { handleCommentEvents };
