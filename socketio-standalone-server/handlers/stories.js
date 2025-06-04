// ==========================================
// STORIES HANDLER - Instagram/Facebook Style Stories
// ==========================================

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');

/**
 * Handle Stories Events
 * - Create story
 * - View story
 * - Delete story
 * - Story reactions
 * - Story comments
 * - Story highlights
 */
function handleStoryEvents(socket, io, { connectedUsers, activeRooms, redis, kafkaProducer }) {
  const userId = socket.userId;

  // Create new story
  socket.on('story:create', async (data, callback) => {
    try {
      const { content, mediaUrl, mediaType, duration = 24, privacy = 'public' } = data;
      
      const story = {
        id: `story_${Date.now()}_${userId}`,
        userId,
        content,
        mediaUrl,
        mediaType, // 'image', 'video', 'text'
        duration, // hours
        privacy,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + duration * 60 * 60 * 1000),
        views: [],
        reactions: [],
        comments: []
      };      // Publish to Kafka
      if (eventPublishers.storyEvents) {
        await eventPublishers.storyEvents('story-events', {
          type: 'STORY_CREATED',
          userId,
          story,
          timestamp: new Date()
        });
      }

      // Notify followers based on privacy
      if (privacy === 'public') {
        socket.broadcast.emit('story:new', {
          story,
          author: { id: userId, name: socket.userInfo?.name }
        });
      }

      logger.info('Story created', { userId, storyId: story.id });
      callback({ success: true, story });

    } catch (error) {
      logger.error('Error creating story', { userId, error: error.message });
      callback({ success: false, error: 'Failed to create story' });
    }
  });

  // View story
  socket.on('story:view', async (data, callback) => {
    try {
      const { storyId, authorId } = data;

      const view = {
        viewerId: userId,
        viewedAt: new Date(),
        storyId
      };      // Publish view event
      if (eventPublishers.storyEvents) {
        await eventPublishers.storyEvents('story-events', {
          type: 'STORY_VIEWED',
          userId,
          authorId,
          storyId,
          view,
          timestamp: new Date()
        });
      }

      // Notify story author
      io.to(`user_${authorId}`).emit('story:viewed', {
        storyId,
        viewer: { id: userId, name: socket.userInfo?.name },
        viewedAt: view.viewedAt
      });

      logger.info('Story viewed', { userId, storyId, authorId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error viewing story', { userId, error: error.message });
      callback({ success: false, error: 'Failed to view story' });
    }
  });

  // React to story
  socket.on('story:react', async (data, callback) => {
    try {
      const { storyId, authorId, reactionType } = data;

      const reaction = {
        id: `reaction_${Date.now()}_${userId}`,
        userId,
        storyId,
        reactionType, // 'like', 'love', 'wow', 'haha', 'sad', 'angry'
        createdAt: new Date()
      };      // Publish reaction event
      if (eventPublishers.storyEvents) {
        await eventPublishers.storyEvents('story-events', {
          type: 'STORY_REACTION_ADDED',
          userId,
          authorId,
          storyId,
          reaction,
          timestamp: new Date()
        });
      }

      // Notify story author
      io.to(`user_${authorId}`).emit('story:reaction', {
        storyId,
        reaction,
        reactor: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Story reaction added', { userId, storyId, reactionType });
      callback({ success: true, reaction });

    } catch (error) {
      logger.error('Error reacting to story', { userId, error: error.message });
      callback({ success: false, error: 'Failed to react to story' });
    }
  });

  // Comment on story
  socket.on('story:comment', async (data, callback) => {
    try {
      const { storyId, authorId, content } = data;

      const comment = {
        id: `comment_${Date.now()}_${userId}`,
        userId,
        storyId,
        content,
        createdAt: new Date()
      };      // Publish comment event
      if (eventPublishers.storyEvents) {
        await eventPublishers.storyEvents('story-events', {
          type: 'STORY_COMMENT_ADDED',
          userId,
          authorId,
          storyId,
          comment,
          timestamp: new Date()
        });
      }

      // Notify story author
      io.to(`user_${authorId}`).emit('story:comment', {
        storyId,
        comment,
        commenter: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Story comment added', { userId, storyId });
      callback({ success: true, comment });

    } catch (error) {
      logger.error('Error commenting on story', { userId, error: error.message });
      callback({ success: false, error: 'Failed to comment on story' });
    }
  });

  // Delete story
  socket.on('story:delete', async (data, callback) => {
    try {
      const { storyId } = data;      // Publish delete event
      if (eventPublishers.storyEvents) {
        await eventPublishers.storyEvents('story-events', {
          type: 'STORY_DELETED',
          userId,
          storyId,
          timestamp: new Date()
        });
      }

      // Notify followers
      socket.broadcast.emit('story:deleted', {
        storyId,
        authorId: userId
      });

      logger.info('Story deleted', { userId, storyId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error deleting story', { userId, error: error.message });
      callback({ success: false, error: 'Failed to delete story' });
    }
  });

  // Add story to highlights
  socket.on('story:highlight', async (data, callback) => {
    try {
      const { storyId, highlightName } = data;

      const highlight = {
        id: `highlight_${Date.now()}_${userId}`,
        userId,
        storyId,
        highlightName,
        createdAt: new Date()
      };      // Publish highlight event
      if (eventPublishers.storyEvents) {
        await eventPublishers.storyEvents('story-events', {
          type: 'STORY_HIGHLIGHTED',
          userId,
          storyId,
          highlight,
          timestamp: new Date()
        });
      }

      logger.info('Story highlighted', { userId, storyId, highlightName });
      callback({ success: true, highlight });

    } catch (error) {
      logger.error('Error highlighting story', { userId, error: error.message });
      callback({ success: false, error: 'Failed to highlight story' });
    }
  });

  // Get user stories
  socket.on('stories:get_user', async (data, callback) => {
    try {
      const { targetUserId } = data;      // This would typically fetch from database
      // For now, emit request to get stories
      if (eventPublishers.storyEvents) {
        await eventPublishers.storyEvents('story-events', {
          type: 'STORIES_REQUESTED',
          userId,
          targetUserId,
          timestamp: new Date()
        });
      }

      logger.info('User stories requested', { userId, targetUserId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error getting user stories', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get stories' });
    }
  });

  // Get story feed (all stories from followed users)
  socket.on('stories:get_feed', async (callback) => {
    try {      // Publish feed request
      if (eventPublishers.storyEvents) {
        await eventPublishers.storyEvents('story-events', {
          type: 'STORY_FEED_REQUESTED',
          userId,
          timestamp: new Date()
        });
      }

      logger.info('Story feed requested', { userId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error getting story feed', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get story feed' });
    }
  });
}

module.exports = { handleStoryEvents };
