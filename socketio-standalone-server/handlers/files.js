// ==========================================
// FILES HANDLER - File Upload & Sharing
// ==========================================

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

/**
 * Handle File Events
 * - File upload
 * - File sharing
 * - File download
 * - File deletion
 * - File permissions
 */
function handleFileEvents(socket, io, { connectedUsers, redis, kafkaProducer }) {
  const userId = socket.userId;

  // Upload file
  socket.on('file:upload', async (data, callback) => {
    try {
      const { 
        fileName, 
        fileSize, 
        fileType, 
        fileData, 
        targetType = 'general',
        targetId = null,
        privacy = 'private',
        description = ''
      } = data;

      // Validate file size (max 100MB)
      if (fileSize > 100 * 1024 * 1024) {
        return callback({ success: false, error: 'File too large. Max size is 100MB.' });
      }

      // Generate unique file ID
      const fileId = `file_${Date.now()}_${crypto.randomUUID()}`;
      const fileExtension = path.extname(fileName);
      const storedFileName = `${fileId}${fileExtension}`;

      const fileInfo = {
        id: fileId,
        originalName: fileName,
        storedName: storedFileName,
        size: fileSize,
        type: fileType,
        uploadedBy: userId,
        uploadedAt: new Date(),
        targetType, // 'general', 'post', 'chat', 'study_group'
        targetId,
        privacy, // 'private', 'public', 'restricted'
        description,
        downloads: 0,
        path: `/uploads/${storedFileName}`,
        checksum: crypto.createHash('md5').update(fileData).digest('hex')
      };

      // Save file to disk (in production, use cloud storage)
      const uploadsDir = path.join(__dirname, '..', 'uploads');
      await fs.mkdir(uploadsDir, { recursive: true });
      await fs.writeFile(path.join(uploadsDir, storedFileName), Buffer.from(fileData, 'base64'));

      // Publish file upload event
      await eventPublishers.fileEvent(kafkaProducer, 'file_uploaded', fileId, userId, {
        fileInfo,
        targetType,
        targetId
      });

      // Notify relevant users based on target
      if (targetType && targetId) {
        socket.to(`${targetType}_${targetId}`).emit('file:uploaded', {
          fileInfo,
          uploader: { id: userId, name: socket.user?.name }
        });
      }

      logger.info('File uploaded', { userId, fileId, fileName, fileSize });
      callback({ success: true, fileInfo });

    } catch (error) {
      logger.error('Error uploading file', { userId, error: error.message });
      callback({ success: false, error: 'Failed to upload file' });
    }
  });

  // Share file
  socket.on('file:share', async (data, callback) => {
    try {
      const { fileId, targetUsers = [], targetGroups = [], message = '' } = data;

      const shareInfo = {
        fileId,
        sharedBy: userId,
        targetUsers,
        targetGroups,
        message,
        sharedAt: new Date(),
        permissions: {
          canDownload: true,
          canReshare: false,
          canDelete: false
        }
      };

      // Publish file share event
      await publishEvent('file-events', {
        type: 'FILE_SHARED',
        userId,
        shareInfo,
        timestamp: new Date()
      });

      // Notify target users
      targetUsers.forEach(targetUserId => {
        io.to(`user_${targetUserId}`).emit('file:shared', {
          shareInfo,
          sharer: { id: userId, name: socket.user?.name }
        });
      });

      // Notify target groups
      targetGroups.forEach(groupId => {
        socket.to(`study_group_${groupId}`).emit('file:shared', {
          shareInfo,
          sharer: { id: userId, name: socket.user?.name }
        });
      });

      logInfo('File shared', { userId, fileId, targetUsers: targetUsers.length, targetGroups: targetGroups.length });
      callback({ success: true, shareInfo });

    } catch (error) {
      logError('Error sharing file', { userId, error: error.message });
      callback({ success: false, error: 'Failed to share file' });
    }
  });

  // Download file
  socket.on('file:download', async (data, callback) => {
    try {
      const { fileId } = data;

      // Publish download event
      await publishEvent('file-events', {
        type: 'FILE_DOWNLOADED',
        userId,
        fileId,
        downloadedAt: new Date(),
        timestamp: new Date()
      });

      logInfo('File download requested', { userId, fileId });
      callback({ success: true });

    } catch (error) {
      logError('Error downloading file', { userId, error: error.message });
      callback({ success: false, error: 'Failed to download file' });
    }
  });

  // Delete file
  socket.on('file:delete', async (data, callback) => {
    try {
      const { fileId } = data;

      // Publish delete event
      await publishEvent('file-events', {
        type: 'FILE_DELETED',
        userId,
        fileId,
        deletedAt: new Date(),
        timestamp: new Date()
      });

      // Notify users who have access to this file
      socket.broadcast.emit('file:deleted', {
        fileId,
        deletedBy: { id: userId, name: socket.user?.name }
      });

      logInfo('File deleted', { userId, fileId });
      callback({ success: true });

    } catch (error) {
      logError('Error deleting file', { userId, error: error.message });
      callback({ success: false, error: 'Failed to delete file' });
    }
  });

  // Get file info
  socket.on('file:get_info', async (data, callback) => {
    try {
      const { fileId } = data;

      // Publish info request
      await publishEvent('file-events', {
        type: 'FILE_INFO_REQUESTED',
        userId,
        fileId,
        timestamp: new Date()
      });

      logInfo('File info requested', { userId, fileId });
      callback({ success: true });

    } catch (error) {
      logError('Error getting file info', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get file info' });
    }
  });

  // Get user's files
  socket.on('file:get_user_files', async (data, callback) => {
    try {
      const { limit = 20, offset = 0, fileType = 'all' } = data;

      // Publish user files request
      await publishEvent('file-events', {
        type: 'USER_FILES_REQUESTED',
        userId,
        filters: { limit, offset, fileType },
        timestamp: new Date()
      });

      logInfo('User files requested', { userId, limit, offset, fileType });
      callback({ success: true });

    } catch (error) {
      logError('Error getting user files', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get user files' });
    }
  });

  // Update file permissions
  socket.on('file:update_permissions', async (data, callback) => {
    try {
      const { fileId, permissions } = data;

      // Publish permissions update
      await publishEvent('file-events', {
        type: 'FILE_PERMISSIONS_UPDATED',
        userId,
        fileId,
        permissions,
        timestamp: new Date()
      });

      logInfo('File permissions updated', { userId, fileId });
      callback({ success: true });

    } catch (error) {
      logError('Error updating file permissions', { userId, error: error.message });
      callback({ success: false, error: 'Failed to update file permissions' });
    }
  });

  // Create file link (shareable URL)
  socket.on('file:create_link', async (data, callback) => {
    try {
      const { fileId, expiresIn = '7d', password = null } = data;

      const shareLink = {
        id: `link_${Date.now()}_${crypto.randomUUID()}`,
        fileId,
        createdBy: userId,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + parseDuration(expiresIn)),
        password: password ? crypto.createHash('sha256').update(password).digest('hex') : null,
        accessCount: 0,
        maxAccess: null
      };

      // Publish link creation event
      await publishEvent('file-events', {
        type: 'FILE_LINK_CREATED',
        userId,
        shareLink,
        timestamp: new Date()
      });

      logInfo('File link created', { userId, fileId, linkId: shareLink.id });
      callback({ success: true, shareLink });

    } catch (error) {
      logError('Error creating file link', { userId, error: error.message });
      callback({ success: false, error: 'Failed to create file link' });
    }
  });

  // Scan file for malware (placeholder)
  socket.on('file:scan', async (data, callback) => {
    try {
      const { fileId } = data;

      // Publish scan request
      await publishEvent('file-events', {
        type: 'FILE_SCAN_REQUESTED',
        userId,
        fileId,
        timestamp: new Date()
      });

      logInfo('File scan requested', { userId, fileId });
      callback({ success: true });

    } catch (error) {
      logError('Error scanning file', { userId, error: error.message });
      callback({ success: false, error: 'Failed to scan file' });
    }
  });
}

// Helper function to parse duration strings
function parseDuration(duration) {
  const units = {
    's': 1000,
    'm': 60 * 1000,
    'h': 60 * 60 * 1000,
    'd': 24 * 60 * 60 * 1000,
    'w': 7 * 24 * 60 * 60 * 1000
  };

  const match = duration.match(/^(\d+)([smhdw])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000; // Default 7 days

  const [, amount, unit] = match;
  return parseInt(amount) * units[unit];
}

module.exports = { handleFileEvents };
