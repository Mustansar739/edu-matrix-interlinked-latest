// ==========================================
// NOTIFICATIONS HANDLER - Real-time Notifications
// ==========================================

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');

/**
 * Handle Notifications Events
 * - Send notification
 * - Mark as read
 * - Get notifications
 * - Notification preferences
 * - Push notifications
 */
function handleNotificationEvents(socket, io, { connectedUsers, redis, kafkaProducer }) {
  const userId = socket.userId;

  // Send notification
  socket.on('notification:send', async (data, callback) => {
    try {
      const { 
        targetUserId, 
        type, 
        title, 
        message, 
        data: notificationData = {},
        priority = 'normal',
        category = 'general'
      } = data;

      const notification = {
        id: `notif_${Date.now()}_${userId}`,
        fromUserId: userId,
        targetUserId,
        type, // 'like', 'comment', 'follow', 'message', 'call', 'system'
        title,
        message,
        data: notificationData,
        priority, // 'low', 'normal', 'high', 'urgent'
        category, // 'social', 'educational', 'system', 'security'
        createdAt: new Date(),
        read: false,
        delivered: false
      };      // Publish notification event
      await eventPublishers.notificationEvent(kafkaProducer, 'notification_created', notification.id, userId, {
        notification,
        targetUserId
      });

      // Send to target user if online
      const targetSocket = io.to(`user_${targetUserId}`);
      targetSocket.emit('notification:new', {
        notification,
        sender: { id: userId, name: socket.user?.name }
      });

      logger.info('Notification sent', { userId, targetUserId, notificationId: notification.id });
      callback({ success: true, notification });    } catch (error) {
      logger.error('Error sending notification', { userId, error: error.message });
      callback({ success: false, error: 'Failed to send notification' });
    }
  });

  // Mark notification as read
  socket.on('notification:mark_read', async (data, callback) => {
    try {
      const { notificationId } = data;

      // Publish read event
      await eventPublishers.notificationEvent(kafkaProducer, 'notification_read', notificationId, userId, {
        readAt: new Date()
      });

      logger.info('Notification marked as read', { userId, notificationId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error marking notification as read', { userId, error: error.message });
      callback({ success: false, error: 'Failed to mark notification as read' });
    }
  });

  // Mark all notifications as read
  socket.on('notification:mark_all_read', async (callback) => {
    try {
      // Publish mark all read event
      await eventPublishers.notificationEvent(kafkaProducer, 'all_notifications_read', null, userId, {
        readAt: new Date()
      });

      logger.info('All notifications marked as read', { userId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error marking all notifications as read', { userId, error: error.message });
      callback({ success: false, error: 'Failed to mark all notifications as read' });
    }
  });

  // Get notifications
  socket.on('notification:get', async (data, callback) => {
    try {
      const { limit = 50, offset = 0, unreadOnly = false } = data;

      // Publish get notifications request
      await eventPublishers.notificationEvent(kafkaProducer, 'notifications_requested', null, userId, {
        filters: { limit, offset, unreadOnly, type }
      });

      logger.info('Notifications requested', { userId, limit, offset, unreadOnly });
      callback({ success: true });

    } catch (error) {
      logger.error('Error getting notifications', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get notifications' });
    }
  });

  // Update notification preferences
  socket.on('notification:update_preferences', async (data, callback) => {
    try {
      const { preferences } = data;
      // preferences: { email: true, push: true, inApp: true, categories: {...} }

      // Publish preferences update
      await eventPublishers.notificationEvent(kafkaProducer, 'preferences_updated', null, userId, {
        preferences
      });

      logger.info('Notification preferences updated', { userId });
      callback({ success: true, preferences });

    } catch (error) {
      logger.error('Error updating notification preferences', { userId, error: error.message });
      callback({ success: false, error: 'Failed to update preferences' });
    }
  });

  // Delete notification
  socket.on('notification:delete', async (data, callback) => {
    try {
      const { notificationId } = data;

      // Publish delete event
      await eventPublishers.notificationEvent(kafkaProducer, 'notification_deleted', notificationId, userId, {
        deletedAt: new Date()
      });

      logger.info('Notification deleted', { userId, notificationId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error deleting notification', { userId, error: error.message });
      callback({ success: false, error: 'Failed to delete notification' });
    }
  });

  // Get notification count
  socket.on('notification:get_count', async (data, callback) => {
    try {
      const { unreadOnly = true } = data;

      // Publish count request
      await eventPublishers.notificationEvent(kafkaProducer, 'count_requested', null, userId, {
        filters: { unreadOnly, type }
      });

      logger.info('Notification count requested', { userId, unreadOnly });
      callback({ success: true });

    } catch (error) {
      logger.error('Error getting notification count', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get notification count' });
    }
  });

  // Subscribe to push notifications
  socket.on('notification:subscribe_push', async (data, callback) => {
    try {
      const { subscription } = data; // Web Push subscription object

      // Publish subscription event
      await eventPublishers.notificationEvent(kafkaProducer, 'push_subscription_created', null, userId, {
        subscription
      });

      logger.info('Push notification subscription created', { userId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error subscribing to push notifications', { userId, error: error.message });
      callback({ success: false, error: 'Failed to subscribe to push notifications' });
    }
  });

  // Unsubscribe from push notifications
  socket.on('notification:unsubscribe_push', async (data, callback) => {
    try {
      const { endpoint } = data;

      // Publish unsubscription event
      await eventPublishers.notificationEvent(kafkaProducer, 'push_subscription_deleted', null, userId, {
        endpoint
      });

      logger.info('Push notification subscription deleted', { userId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error unsubscribing from push notifications', { userId, error: error.message });
      callback({ success: false, error: 'Failed to unsubscribe from push notifications' });
    }
  });
}

module.exports = { handleNotificationEvents };
