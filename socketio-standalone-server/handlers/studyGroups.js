// ==========================================
// STUDY GROUPS HANDLER - Educational Collaboration
// ==========================================

const { logger } = require('../utils/logger');
const { eventPublishers } = require('../utils/kafka');

/**
 * Handle Study Groups Events
 * - Create study group
 * - Join/Leave group
 * - Study sessions
 * - Resource sharing
 * - Group messaging
 * - Study plans
 */
function handleStudyGroupEvents(socket, io, { connectedUsers, activeRooms, redis, kafkaProducer }) {
  const userId = socket.userId;

  // Create study group
  socket.on('study_group:create', async (data, callback) => {
    try {
      const { 
        name, 
        description, 
        subject, 
        maxMembers = 50, 
        privacy = 'public',
        tags = [],
        studyPlan = null
      } = data;
      
      const studyGroup = {
        id: `group_${Date.now()}_${userId}`,
        name,
        description,
        subject,
        maxMembers,
        privacy, // 'public', 'private', 'invite_only'
        tags,
        studyPlan,
        createdBy: userId,
        createdAt: new Date(),
        members: [userId],
        moderators: [userId],
        settings: {
          allowFileSharing: true,
          allowVoiceCalls: true,
          allowScreenSharing: true,
          requireApproval: privacy === 'private'
        },
        stats: {
          totalStudyHours: 0,
          activeSessions: 0,
          completedGoals: 0
        }
      };

      // Join group room
      socket.join(`study_group_${studyGroup.id}`);      // Publish to Kafka
      if (eventPublishers.studyGroupEvents) {
        await eventPublishers.studyGroupEvents('study-group-events', {
          type: 'STUDY_GROUP_CREATED',
          userId,
          studyGroup,
          timestamp: new Date()
        });
      }

      logger.info('Study group created', { userId, groupId: studyGroup.id, name });
      callback({ success: true, studyGroup });

    } catch (error) {
      logger.error('Error creating study group', { userId, error: error.message });
      callback({ success: false, error: 'Failed to create study group' });
    }
  });

  // Join study group
  socket.on('study_group:join', async (data, callback) => {
    try {
      const { groupId, message = '' } = data;

      // Join group room
      socket.join(`study_group_${groupId}`);

      const joinRequest = {
        groupId,
        userId,
        message,
        requestedAt: new Date(),
        status: 'pending' // Will be 'approved' or 'rejected'
      };

      // Publish join request
      await publishEvent('study-group-events', {
        type: 'STUDY_GROUP_JOIN_REQUESTED',
        userId,
        groupId,
        joinRequest,
        timestamp: new Date()
      });

      // Notify group moderators
      socket.to(`study_group_${groupId}`).emit('study_group:join_request', {
        groupId,
        request: joinRequest,
        user: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Study group join requested', { userId, groupId });
      callback({ success: true, joinRequest });

    } catch (error) {
      logger.error('Error joining study group', { userId, error: error.message });
      callback({ success: false, error: 'Failed to join study group' });
    }
  });

  // Approve/Reject join request
  socket.on('study_group:approve_join', async (data, callback) => {
    try {
      const { groupId, requestUserId, approved } = data;

      // Publish approval decision
      await publishEvent('study-group-events', {
        type: approved ? 'STUDY_GROUP_JOIN_APPROVED' : 'STUDY_GROUP_JOIN_REJECTED',
        userId,
        groupId,
        requestUserId,
        timestamp: new Date()
      });

      if (approved) {
        // Notify all group members
        socket.to(`study_group_${groupId}`).emit('study_group:member_joined', {
          groupId,
          newMember: { id: requestUserId },
          approvedBy: { id: userId, name: socket.userInfo?.name }
        });
      }

      // Notify the requesting user
      io.to(`user_${requestUserId}`).emit('study_group:join_response', {
        groupId,
        approved,
        approvedBy: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Study group join request processed', { userId, groupId, requestUserId, approved });
      callback({ success: true });

    } catch (error) {
      logger.error('Error processing join request', { userId, error: error.message });
      callback({ success: false, error: 'Failed to process join request' });
    }
  });

  // Leave study group
  socket.on('study_group:leave', async (data, callback) => {
    try {
      const { groupId } = data;

      // Leave group room
      socket.leave(`study_group_${groupId}`);

      // Publish leave event
      await publishEvent('study-group-events', {
        type: 'STUDY_GROUP_LEFT',
        userId,
        groupId,
        timestamp: new Date()
      });

      // Notify group members
      socket.to(`study_group_${groupId}`).emit('study_group:member_left', {
        groupId,
        leftMember: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Left study group', { userId, groupId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error leaving study group', { userId, error: error.message });
      callback({ success: false, error: 'Failed to leave study group' });
    }
  });

  // Start study session
  socket.on('study_group:start_session', async (data, callback) => {
    try {
      const { groupId, sessionName, duration, goals = [], sessionType = 'general' } = data;

      const session = {
        id: `session_${Date.now()}_${userId}`,
        groupId,
        sessionName,
        sessionType, // 'general', 'focused', 'exam_prep', 'project_work'
        duration, // in minutes
        goals,
        startedBy: userId,
        startedAt: new Date(),
        participants: [userId],
        status: 'active',
        resources: [],
        notes: []
      };

      // Publish session start
      await publishEvent('study-group-events', {
        type: 'STUDY_SESSION_STARTED',
        userId,
        groupId,
        session,
        timestamp: new Date()
      });

      // Notify group members
      socket.to(`study_group_${groupId}`).emit('study_group:session_started', {
        groupId,
        session,
        startedBy: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Study session started', { userId, groupId, sessionId: session.id });
      callback({ success: true, session });

    } catch (error) {
      logger.error('Error starting study session', { userId, error: error.message });
      callback({ success: false, error: 'Failed to start study session' });
    }
  });

  // Join study session
  socket.on('study_group:join_session', async (data, callback) => {
    try {
      const { groupId, sessionId } = data;

      // Join session room
      socket.join(`session_${sessionId}`);

      // Publish session join
      await publishEvent('study-group-events', {
        type: 'STUDY_SESSION_JOINED',
        userId,
        groupId,
        sessionId,
        timestamp: new Date()
      });

      // Notify session participants
      socket.to(`session_${sessionId}`).emit('study_group:session_participant_joined', {
        sessionId,
        participant: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Joined study session', { userId, groupId, sessionId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error joining study session', { userId, error: error.message });
      callback({ success: false, error: 'Failed to join study session' });
    }
  });

  // Share resource in group
  socket.on('study_group:share_resource', async (data, callback) => {
    try {
      const { groupId, resourceType, resourceUrl, title, description, tags = [] } = data;

      const resource = {
        id: `resource_${Date.now()}_${userId}`,
        groupId,
        resourceType, // 'document', 'video', 'link', 'note', 'quiz'
        resourceUrl,
        title,
        description,
        tags,
        sharedBy: userId,
        sharedAt: new Date(),
        downloads: 0,
        likes: 0
      };

      // Publish resource share
      await publishEvent('study-group-events', {
        type: 'RESOURCE_SHARED',
        userId,
        groupId,
        resource,
        timestamp: new Date()
      });

      // Notify group members
      socket.to(`study_group_${groupId}`).emit('study_group:resource_shared', {
        groupId,
        resource,
        sharedBy: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Resource shared in study group', { userId, groupId, resourceId: resource.id });
      callback({ success: true, resource });

    } catch (error) {
      logger.error('Error sharing resource', { userId, error: error.message });
      callback({ success: false, error: 'Failed to share resource' });
    }
  });

  // Set study goal
  socket.on('study_group:set_goal', async (data, callback) => {
    try {
      const { groupId, goalTitle, goalDescription, targetDate, priority = 'medium' } = data;

      const goal = {
        id: `goal_${Date.now()}_${userId}`,
        groupId,
        goalTitle,
        goalDescription,
        targetDate: new Date(targetDate),
        priority, // 'low', 'medium', 'high'
        setBy: userId,
        setAt: new Date(),
        status: 'active', // 'active', 'completed', 'cancelled'
        progress: 0
      };

      // Publish goal setting
      await publishEvent('study-group-events', {
        type: 'STUDY_GOAL_SET',
        userId,
        groupId,
        goal,
        timestamp: new Date()
      });

      // Notify group members
      socket.to(`study_group_${groupId}`).emit('study_group:goal_set', {
        groupId,
        goal,
        setBy: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Study goal set', { userId, groupId, goalId: goal.id });
      callback({ success: true, goal });

    } catch (error) {
      logger.error('Error setting study goal', { userId, error: error.message });
      callback({ success: false, error: 'Failed to set study goal' });
    }
  });

  // Update study progress
  socket.on('study_group:update_progress', async (data, callback) => {
    try {
      const { groupId, goalId, progress, notes = '' } = data;

      const progressUpdate = {
        goalId,
        userId,
        progress, // percentage (0-100)
        notes,
        updatedAt: new Date()
      };

      // Publish progress update
      await publishEvent('study-group-events', {
        type: 'STUDY_PROGRESS_UPDATED',
        userId,
        groupId,
        goalId,
        progressUpdate,
        timestamp: new Date()
      });

      // Notify group members
      socket.to(`study_group_${groupId}`).emit('study_group:progress_updated', {
        groupId,
        goalId,
        progressUpdate,
        updatedBy: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Study progress updated', { userId, groupId, goalId, progress });
      callback({ success: true, progressUpdate });

    } catch (error) {
      logger.error('Error updating study progress', { userId, error: error.message });
      callback({ success: false, error: 'Failed to update progress' });
    }
  });

  // Send group message
  socket.on('study_group:message', async (data, callback) => {
    try {
      const { groupId, content, messageType = 'text', attachments = [] } = data;

      const message = {
        id: `msg_${Date.now()}_${userId}`,
        groupId,
        userId,
        content,
        messageType, // 'text', 'file', 'quiz', 'poll'
        attachments,
        sentAt: new Date(),
        edited: false,
        reactions: []
      };

      // Publish message
      await publishEvent('study-group-events', {
        type: 'GROUP_MESSAGE_SENT',
        userId,
        groupId,
        message,
        timestamp: new Date()
      });

      // Broadcast to group members
      socket.to(`study_group_${groupId}`).emit('study_group:message', {
        groupId,
        message,
        sender: { id: userId, name: socket.userInfo?.name }
      });

      logger.info('Study group message sent', { userId, groupId, messageId: message.id });
      callback({ success: true, message });

    } catch (error) {
      logger.error('Error sending group message', { userId, error: error.message });
      callback({ success: false, error: 'Failed to send message' });
    }
  });

  // Get group statistics
  socket.on('study_group:get_stats', async (data, callback) => {
    try {
      const { groupId } = data;

      // Publish stats request
      await publishEvent('study-group-events', {
        type: 'GROUP_STATS_REQUESTED',
        userId,
        groupId,
        timestamp: new Date()
      });

      logger.info('Study group stats requested', { userId, groupId });
      callback({ success: true });

    } catch (error) {
      logger.error('Error getting group stats', { userId, error: error.message });
      callback({ success: false, error: 'Failed to get group stats' });
    }
  });
}

module.exports = { handleStudyGroupEvents };
