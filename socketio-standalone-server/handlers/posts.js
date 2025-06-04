// ==========================================
// POST EVENTS HANDLER
// ==========================================
// Handles Facebook-style post features

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');
const { validateEventData } = require('../middleware/validation');
const { checkActionRateLimit } = require('../middleware/rateLimit');

/**
 * Handle post-related events
 */
function handlePostEvents(socket, io, context) {
  const { connectedUsers, redis, kafkaProducer } = context;

  // Create new post
  socket.on('post:create', async (data) => {
    try {
      // Rate limiting
      if (!await checkActionRateLimit(socket, 'post_create', { points: 10, duration: 60 })) {
        return;
      }

      // Validate data
      const validatedData = validateEventData('post', data);
      
      const postId = `post_${Date.now()}_${socket.userId}`;
      const post = {
        id: postId,
        content: validatedData.content,
        type: validatedData.type || 'text',
        attachments: validatedData.attachments || [],
        visibility: validatedData.visibility || 'public',
        tags: validatedData.tags || [],
        author: {
          id: socket.userInfo.id,
          name: socket.userInfo.name,
          image: socket.userInfo.image
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        stats: {
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0
        }
      };

      // Store post in Redis
      await redis.setex(`post:${postId}`, 3600 * 24 * 30, JSON.stringify(post)); // 30 days

      // Add to user's posts list
      await redis.lpush(`user:${socket.userId}:posts`, postId);
      await redis.ltrim(`user:${socket.userId}:posts`, 0, 99); // Keep last 100 posts

      // Broadcast to global feed
      io.to('global-feed').emit('post:new', post);

      // Send confirmation to author
      socket.emit('post:created', {
        postId,
        post,
        timestamp: new Date().toISOString()
      });

      // Publish to Kafka
      if (kafkaProducer) {
        await eventPublishers.postEvent(kafkaProducer, 'post_created', postId, socket.userId, {
          post,
          visibility: post.visibility
        });
      }

      logger.info(`📝 Post created: ${postId} by ${socket.userInfo.name}`);

    } catch (error) {
      logger.error('Error creating post:', error);
      socket.emit('error', { 
        type: 'POST_CREATE_ERROR',
        message: 'Failed to create post',
        details: error.message 
      });
    }
  });

  // Update post
  socket.on('post:update', async (data) => {
    try {
      // Rate limiting
      if (!await checkActionRateLimit(socket, 'post_update', { points: 20, duration: 60 })) {
        return;
      }

      const { postId, content, attachments, tags, visibility } = data;

      if (!postId) {
        socket.emit('error', { message: 'Post ID required' });
        return;
      }

      // Get existing post
      const existingPostData = await redis.get(`post:${postId}`);
      if (!existingPostData) {
        socket.emit('error', { message: 'Post not found' });
        return;
      }

      const existingPost = JSON.parse(existingPostData);

      // Check if user owns the post
      if (existingPost.author.id !== socket.userInfo.id) {
        socket.emit('error', { message: 'Unauthorized to edit this post' });
        return;
      }

      // Update post
      const updatedPost = {
        ...existingPost,
        content: content || existingPost.content,
        attachments: attachments || existingPost.attachments,
        tags: tags || existingPost.tags,
        visibility: visibility || existingPost.visibility,
        updatedAt: new Date().toISOString(),
        isEdited: true
      };

      // Store updated post
      await redis.setex(`post:${postId}`, 3600 * 24 * 30, JSON.stringify(updatedPost));

      // Broadcast update
      io.to('global-feed').emit('post:updated', updatedPost);

      // Send confirmation
      socket.emit('post:update_success', {
        postId,
        post: updatedPost,
        timestamp: new Date().toISOString()
      });

      // Publish to Kafka
      if (kafkaProducer) {
        await eventPublishers.postEvent(kafkaProducer, 'post_updated', postId, socket.userId, {
          post: updatedPost,
          changes: { content: !!content, attachments: !!attachments, tags: !!tags, visibility: !!visibility }
        });
      }

      logger.info(`✏️ Post updated: ${postId} by ${socket.userInfo.name}`);

    } catch (error) {
      logger.error('Error updating post:', error);
      socket.emit('error', { 
        type: 'POST_UPDATE_ERROR',
        message: 'Failed to update post',
        details: error.message 
      });
    }
  });

  // Delete post
  socket.on('post:delete', async (data) => {
    try {
      // Rate limiting
      if (!await checkActionRateLimit(socket, 'post_delete', { points: 5, duration: 60 })) {
        return;
      }

      const { postId } = data;

      if (!postId) {
        socket.emit('error', { message: 'Post ID required' });
        return;
      }

      // Get existing post
      const existingPostData = await redis.get(`post:${postId}`);
      if (!existingPostData) {
        socket.emit('error', { message: 'Post not found' });
        return;
      }

      const existingPost = JSON.parse(existingPostData);

      // Check if user owns the post or is admin
      const isOwner = existingPost.author.id === socket.userInfo.id;
      const isAdmin = socket.userInfo.role === 'admin' || socket.userInfo.role === 'super_admin';

      if (!isOwner && !isAdmin) {
        socket.emit('error', { message: 'Unauthorized to delete this post' });
        return;
      }

      // Delete post and related data
      await redis.del(`post:${postId}`);
      await redis.lrem(`user:${existingPost.author.id}:posts`, 0, postId);
      
      // Delete related likes and comments
      await redis.del(`post:${postId}:likes`);
      await redis.del(`post:${postId}:comments`);

      // Broadcast deletion
      io.to('global-feed').emit('post:deleted', {
        postId,
        deletedBy: {
          id: socket.userInfo.id,
          name: socket.userInfo.name
        },
        timestamp: new Date().toISOString()
      });

      // Send confirmation
      socket.emit('post:delete_success', {
        postId,
        timestamp: new Date().toISOString()
      });

      // Publish to Kafka
      if (kafkaProducer) {
        await eventPublishers.postEvent(kafkaProducer, 'post_deleted', postId, socket.userId, {
          originalAuthor: existingPost.author.id,
          deletedBy: socket.userInfo.id,
          isAdmin: isAdmin
        });
      }

      logger.info(`🗑️ Post deleted: ${postId} by ${socket.userInfo.name}`);

    } catch (error) {
      logger.error('Error deleting post:', error);
      socket.emit('error', { 
        type: 'POST_DELETE_ERROR',
        message: 'Failed to delete post',
        details: error.message 
      });
    }
  });

  // Get post details
  socket.on('post:get', async (data) => {
    try {
      const { postId } = data;

      if (!postId) {
        socket.emit('error', { message: 'Post ID required' });
        return;
      }

      // Get post data
      const postData = await redis.get(`post:${postId}`);
      if (!postData) {
        socket.emit('error', { message: 'Post not found' });
        return;
      }

      const post = JSON.parse(postData);

      // Get likes count and user's like status
      const likesCount = await redis.scard(`post:${postId}:likes`);
      const userLiked = await redis.sismember(`post:${postId}:likes`, socket.userId);

      // Get comments count
      const commentsCount = await redis.llen(`post:${postId}:comments`);

      // Update view count
      await redis.hincrby(`post:${postId}:stats`, 'views', 1);
      post.stats.views = await redis.hget(`post:${postId}:stats`, 'views') || 0;

      // Send post data
      socket.emit('post:data', {
        post: {
          ...post,
          stats: {
            ...post.stats,
            likes: parseInt(likesCount),
            comments: parseInt(commentsCount)
          },
          userInteraction: {
            liked: !!userLiked
          }
        }
      });

      // Publish view event to Kafka
      if (kafkaProducer) {
        await eventPublishers.postEvent(kafkaProducer, 'post_viewed', postId, socket.userId, {
          viewedBy: {
            id: socket.userInfo.id,
            name: socket.userInfo.name
          }
        });
      }

    } catch (error) {
      logger.error('Error getting post:', error);
      socket.emit('error', { 
        type: 'POST_GET_ERROR',
        message: 'Failed to get post',
        details: error.message 
      });
    }
  });

  // Get user's posts
  socket.on('posts:get_user_posts', async (data) => {
    try {
      const { userId, limit = 20, offset = 0 } = data;
      const targetUserId = userId || socket.userId;

      // Get user's post IDs
      const postIds = await redis.lrange(`user:${targetUserId}:posts`, offset, offset + limit - 1);

      // Get post data for each ID
      const posts = [];
      for (const postId of postIds) {
        const postData = await redis.get(`post:${postId}`);
        if (postData) {
          const post = JSON.parse(postData);
          
          // Get stats
          const likesCount = await redis.scard(`post:${postId}:likes`);
          const commentsCount = await redis.llen(`post:${postId}:comments`);
          const userLiked = await redis.sismember(`post:${postId}:likes`, socket.userId);

          posts.push({
            ...post,
            stats: {
              ...post.stats,
              likes: parseInt(likesCount),
              comments: parseInt(commentsCount)
            },
            userInteraction: {
              liked: !!userLiked
            }
          });
        }
      }

      socket.emit('posts:user_posts', {
        userId: targetUserId,
        posts,
        hasMore: postIds.length === limit,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Error getting user posts:', error);
      socket.emit('error', { 
        type: 'POSTS_GET_USER_ERROR',
        message: 'Failed to get user posts',
        details: error.message 
      });
    }
  });

  // Get feed posts
  socket.on('posts:get_feed', async (data) => {
    try {
      const { limit = 20, offset = 0, type = 'recent' } = data;

      // For now, get recent posts from all users
      // In production, this would use a more sophisticated feed algorithm
      const allUserKeys = await redis.keys('user:*:posts');
      const allPostIds = [];

      for (const key of allUserKeys) {
        const userPostIds = await redis.lrange(key, 0, 19); // Get recent 20 from each user
        allPostIds.push(...userPostIds);
      }

      // Sort by creation time (recent first)
      const posts = [];
      for (const postId of allPostIds.slice(offset, offset + limit)) {
        const postData = await redis.get(`post:${postId}`);
        if (postData) {
          const post = JSON.parse(postData);
          
          // Get stats
          const likesCount = await redis.scard(`post:${postId}:likes`);
          const commentsCount = await redis.llen(`post:${postId}:comments`);
          const userLiked = await redis.sismember(`post:${postId}:likes`, socket.userId);

          posts.push({
            ...post,
            stats: {
              ...post.stats,
              likes: parseInt(likesCount),
              comments: parseInt(commentsCount)
            },
            userInteraction: {
              liked: !!userLiked
            }
          });
        }
      }

      // Sort by creation date
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      socket.emit('posts:feed', {
        posts,
        type,
        hasMore: allPostIds.length > offset + limit,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Error getting feed posts:', error);
      socket.emit('error', { 
        type: 'POSTS_GET_FEED_ERROR',
        message: 'Failed to get feed posts',
        details: error.message 
      });
    }
  });

  // Share post
  socket.on('post:share', async (data) => {
    try {
      // Rate limiting
      if (!await checkActionRateLimit(socket, 'post_share', { points: 15, duration: 60 })) {
        return;
      }

      const { postId, shareType = 'share', message = '' } = data;

      if (!postId) {
        socket.emit('error', { message: 'Post ID required' });
        return;
      }

      // Get original post
      const originalPostData = await redis.get(`post:${postId}`);
      if (!originalPostData) {
        socket.emit('error', { message: 'Post not found' });
        return;
      }

      const originalPost = JSON.parse(originalPostData);

      // Create share post
      const sharePostId = `share_${Date.now()}_${socket.userId}`;
      const sharePost = {
        id: sharePostId,
        type: 'share',
        shareType,
        message,
        originalPost,
        author: {
          id: socket.userInfo.id,
          name: socket.userInfo.name,
          image: socket.userInfo.image
        },
        createdAt: new Date().toISOString(),
        stats: {
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0
        }
      };

      // Store share post
      await redis.setex(`post:${sharePostId}`, 3600 * 24 * 30, JSON.stringify(sharePost));
      await redis.lpush(`user:${socket.userId}:posts`, sharePostId);

      // Increment original post share count
      await redis.hincrby(`post:${postId}:stats`, 'shares', 1);

      // Broadcast share
      io.to('global-feed').emit('post:shared', sharePost);

      // Send confirmation
      socket.emit('post:share_success', {
        sharePostId,
        originalPostId: postId,
        sharePost,
        timestamp: new Date().toISOString()
      });

      // Publish to Kafka
      if (kafkaProducer) {
        await eventPublishers.postEvent(kafkaProducer, 'post_shared', sharePostId, socket.userId, {
          originalPostId: postId,
          originalAuthor: originalPost.author.id,
          shareType,
          message
        });
      }

      logger.info(`🔄 Post shared: ${postId} by ${socket.userInfo.name}`);

    } catch (error) {
      logger.error('Error sharing post:', error);
      socket.emit('error', { 
        type: 'POST_SHARE_ERROR',
        message: 'Failed to share post',
        details: error.message 
      });
    }
  });
}

module.exports = {
  handlePostEvents
};
