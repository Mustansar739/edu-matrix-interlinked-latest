// ==========================================
// USER MODULE CONNECTION VERIFICATION
// ==========================================
// Verify that each new user correctly connects to all modules

import { PrismaClient, UserProfession, AccessLevel, InstitutionRoleType } from '@prisma/client';

const prisma = new PrismaClient();

export interface UserModuleAccess {
  userId: string;
  hasAuthAccess: boolean;
  hasSocialAccess: boolean;
  hasCoursesAccess: boolean;
  hasJobsAccess: boolean;
  hasFreelancingAccess: boolean;
  hasNewsAccess: boolean;
  hasCommunityAccess: boolean;
  hasMessagingAccess: boolean;
  hasNotificationsAccess: boolean;
  hasStatisticsAccess: boolean;
  hasHubAccess: boolean;
  institutionConnections: string[];
  departmentConnections: string[];
  permissions: string[];
  missingConnections: string[];
}

/**
 * Comprehensive verification of user's access to all modules
 */
export async function verifyUserModuleConnections(userId: string): Promise<UserModuleAccess> {
  try {
    // 1. Get user basic info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        institutionMemberships: {
          where: { isActive: true }
        },
        departmentMemberships: {
          where: { isActive: true }
        },
        classMemberships: {
          where: { isActive: true }
        },
        teachingAssignments: {
          where: { isActive: true }
        },
        studentEnrollments: {
          where: { status: 'ACTIVE' }
        }
      }
    });

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    const missingConnections: string[] = [];
      // 2. Verify core auth access
    const hasAuthAccess = Boolean(user.isVerified && user.email && user.username);
    if (!hasAuthAccess) missingConnections.push('auth_schema');

    // 3. Check institution and department connections
    const institutionConnections = user.institutionMemberships.map(m => m.institutionId);
    const departmentConnections = user.departmentMemberships.map(m => m.departmentId);
    
    // 4. Verify access based on profession and role
    const hasSocialAccess = user.isVerified; // All verified users get social access
    const hasCoursesAccess = user.classMemberships.length > 0 || 
                            user.teachingAssignments.length > 0 || 
                            user.studentEnrollments.length > 0 ||
                            user.canCreateCourses;
    
    const hasJobsAccess = user.profession !== 'STUDENT' || user.isVerified;
    const hasFreelancingAccess = user.profession !== 'STUDENT' || user.isVerified;
    const hasNewsAccess = user.isVerified; // All verified users can access news
    const hasCommunityAccess = user.isVerified; // All verified users can access community
    const hasMessagingAccess = user.isVerified; // All verified users can message
    const hasNotificationsAccess = user.isVerified; // All verified users get notifications
    const hasStatisticsAccess = user.canViewAnalytics || user.accessLevel === 'ADMIN';
    const hasHubAccess = institutionConnections.length > 0 || user.canManageUsers;

    // 5. Check for missing connections
    if (!hasSocialAccess) missingConnections.push('social_schema');
    if (!hasCoursesAccess) missingConnections.push('courses_schema');
    if (!hasJobsAccess) missingConnections.push('jobs_schema');
    if (!hasFreelancingAccess) missingConnections.push('freelancing_schema');
    if (!hasNewsAccess) missingConnections.push('news_schema');
    if (!hasCommunityAccess) missingConnections.push('community_schema');
    if (!hasMessagingAccess) missingConnections.push('messages_schema');
    if (!hasNotificationsAccess) missingConnections.push('notifications_schema');
    if (!hasStatisticsAccess) missingConnections.push('statistics_schema');
    if (!hasHubAccess) missingConnections.push('hub_schema');

    return {
      userId,
      hasAuthAccess,
      hasSocialAccess,
      hasCoursesAccess,
      hasJobsAccess,
      hasFreelancingAccess,
      hasNewsAccess,
      hasCommunityAccess,
      hasMessagingAccess,
      hasNotificationsAccess,
      hasStatisticsAccess,
      hasHubAccess,
      institutionConnections,
      departmentConnections,
      permissions: user.permissions,
      missingConnections
    };

  } catch (error) {
    console.error('Error verifying user module connections:', error);
    throw error;
  }
}

/**
 * Auto-setup missing module connections for a new user
 */
export async function setupUserModuleConnections(userId: string, institutionId?: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    // 1. Ensure user is verified for basic module access
    if (!user.isVerified) {
      await prisma.user.update({
        where: { id: userId },
        data: { isVerified: true }
      });
    }

    // 2. Setup institution membership if provided
    if (institutionId && !user.institutionId) {
      await prisma.user.update({
        where: { id: userId },
        data: { institutionId }
      });      // Create institution membership record
      await prisma.institutionMember.upsert({
        where: {
          userId_institutionId: {
            userId,
            institutionId
          }
        },
        update: { isActive: true },
        create: {
          userId,
          institutionId,
          role: user.profession === 'STUDENT' ? 'MEMBER' : 'STAFF',
          permissions: []
        }
      });
    }    // 3. Setup default permissions based on profession
    const defaultPermissions = getDefaultPermissions(user.profession);
    await prisma.user.update({
      where: { id: userId },
      data: {
        permissions: defaultPermissions,
        accessLevel: user.profession === 'TEACHER' || user.profession === 'PROFESSOR' ? 'PROFESSIONAL' : 'BASIC'
      }
    });

    console.log(`✅ Module connections setup completed for user ${userId}`);
    
  } catch (error) {
    console.error('Error setting up user module connections:', error);
    throw error;
  }
}

/**
 * Get default permissions based on user profession
 */
function getDefaultPermissions(profession: string): string[] {
  const basePermissions = ['READ_PROFILE', 'UPDATE_PROFILE', 'ACCESS_SOCIAL', 'ACCESS_NEWS', 'ACCESS_COMMUNITY'];
  
  switch (profession) {
    case 'TEACHER':
    case 'PROFESSOR':
      return [
        ...basePermissions,
        'CREATE_COURSES',
        'MANAGE_CLASSES',
        'GRADE_STUDENTS',
        'VIEW_STUDENT_PROGRESS',
        'ACCESS_TEACHING_TOOLS'
      ];
    
    case 'STUDENT':
      return [
        ...basePermissions,
        'ENROLL_COURSES',
        'SUBMIT_ASSIGNMENTS',
        'VIEW_GRADES',
        'ACCESS_LEARNING_MATERIALS'
      ];
    
    case 'PRINCIPAL':
    case 'ACADEMIC_ADMIN':
      return [
        ...basePermissions,
        'MANAGE_INSTITUTION',
        'VIEW_ANALYTICS',
        'MANAGE_USERS',
        'ACCESS_REPORTS',
        'MODERATE_CONTENT'
      ];
    
    default:
      return basePermissions;
  }
}

/**
 * Periodic verification job to check all users' module connections
 */
export async function verifyAllUsersModuleConnections() {
  try {
    const users = await prisma.user.findMany({
      where: { deletedAt: null },
      select: { id: true, email: true, profession: true }
    });

    const results = [];
    for (const user of users) {
      const verification = await verifyUserModuleConnections(user.id);
      if (verification.missingConnections.length > 0) {
        results.push({
          userId: user.id,
          email: user.email,
          profession: user.profession,
          missingConnections: verification.missingConnections
        });
      }
    }

    console.log(`🔍 Verification complete. Found ${results.length} users with missing connections:`, results);
    return results;
    
  } catch (error) {
    console.error('Error during batch verification:', error);
    throw error;
  }
}

/**
 * Generate verification report for a user
 */
export async function generateUserVerificationReport(userId: string) {
  const verification = await verifyUserModuleConnections(userId);
  
  console.log(`
📊 USER MODULE VERIFICATION REPORT
=====================================
User ID: ${verification.userId}
Institution Connections: ${verification.institutionConnections.length}
Department Connections: ${verification.departmentConnections.length}
Active Permissions: ${verification.permissions.length}

✅ MODULE ACCESS STATUS:
- Auth Schema: ${verification.hasAuthAccess ? '✅' : '❌'}
- Social Schema: ${verification.hasSocialAccess ? '✅' : '❌'}
- Courses Schema: ${verification.hasCoursesAccess ? '✅' : '❌'}
- Jobs Schema: ${verification.hasJobsAccess ? '✅' : '❌'}
- Freelancing Schema: ${verification.hasFreelancingAccess ? '✅' : '❌'}
- News Schema: ${verification.hasNewsAccess ? '✅' : '❌'}
- Community Schema: ${verification.hasCommunityAccess ? '✅' : '❌'}
- Messaging Schema: ${verification.hasMessagingAccess ? '✅' : '❌'}
- Notifications Schema: ${verification.hasNotificationsAccess ? '✅' : '❌'}
- Statistics Schema: ${verification.hasStatisticsAccess ? '✅' : '❌'}
- Hub Schema: ${verification.hasHubAccess ? '✅' : '❌'}

${verification.missingConnections.length > 0 ? 
  `❌ MISSING CONNECTIONS: ${verification.missingConnections.join(', ')}` : 
  '✅ ALL MODULE CONNECTIONS VERIFIED'
}
=====================================
  `);
  
  return verification;
}
