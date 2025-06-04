-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "community_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "courses_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "edu_matrix_hub_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "feedback_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "freelancing_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "jobs_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "messages_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "news_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "notifications_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "rating_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "social_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "statistics_schema";

-- CreateEnum
CREATE TYPE "auth_schema"."AuthAttemptStatus" AS ENUM ('SUCCESS', 'FAILED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "auth_schema"."UserProfession" AS ENUM ('DOCTOR', 'NURSE', 'PHARMACIST', 'DENTIST', 'THERAPIST', 'MEDICAL_TECHNICIAN', 'HEALTHCARE_ADMIN', 'TEACHER', 'PROFESSOR', 'PRINCIPAL', 'STUDENT', 'RESEARCHER', 'ACADEMIC_ADMIN', 'TUTOR', 'SOFTWARE_ENGINEER', 'DATA_SCIENTIST', 'SYSTEM_ADMIN', 'WEB_DEVELOPER', 'MOBILE_DEVELOPER', 'DEVOPS_ENGINEER', 'CYBERSECURITY_EXPERT', 'NETWORK_ENGINEER', 'BUSINESS_ANALYST', 'PROJECT_MANAGER', 'ACCOUNTANT', 'FINANCIAL_ADVISOR', 'MARKETING_SPECIALIST', 'SALES_REPRESENTATIVE', 'HR_SPECIALIST', 'ENTREPRENEUR', 'LAWYER', 'JUDGE', 'PARALEGAL', 'GOVERNMENT_OFFICER', 'POLICY_ANALYST', 'GRAPHIC_DESIGNER', 'CONTENT_WRITER', 'PHOTOGRAPHER', 'VIDEO_EDITOR', 'ARTIST', 'MUSICIAN', 'ELECTRICIAN', 'PLUMBER', 'CARPENTER', 'MECHANIC', 'CHEF', 'FARMER', 'CONSTRUCTION_WORKER', 'CONSULTANT', 'FREELANCER', 'RETIRED', 'UNEMPLOYED', 'OTHER');

-- CreateEnum
CREATE TYPE "auth_schema"."AccessLevel" AS ENUM ('BASIC', 'PREMIUM', 'PROFESSIONAL', 'ENTERPRISE', 'ADMIN', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "auth_schema"."DataScopeType" AS ENUM ('SELF', 'CLASS', 'DEPARTMENT', 'INSTITUTION', 'PLATFORM', 'MULTI_INSTITUTION', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "auth_schema"."InstitutionRoleType" AS ENUM ('ADMIN', 'MANAGER', 'STAFF', 'MEMBER', 'GUEST');

-- CreateEnum
CREATE TYPE "auth_schema"."DepartmentRoleType" AS ENUM ('HEAD', 'COORDINATOR', 'STAFF', 'MEMBER');

-- CreateEnum
CREATE TYPE "auth_schema"."ClassRoleType" AS ENUM ('TEACHER', 'ASSISTANT', 'STUDENT', 'OBSERVER');

-- CreateEnum
CREATE TYPE "auth_schema"."StudentEnrollmentStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'WITHDRAWN', 'COMPLETED', 'FAILED', 'DROPPED', 'PENDING');

-- CreateEnum
CREATE TYPE "social_schema"."SocialPostVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'FRIENDS', 'FOLLOWERS', 'LISTED');

-- CreateEnum
CREATE TYPE "social_schema"."SocialPostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'DELETED', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "social_schema"."SocialPostType" AS ENUM ('GENERAL', 'STUDY_HELP', 'PROJECT_SHARE', 'ACHIEVEMENT', 'EVENT_SHARE', 'RESOURCE_SHARE', 'GROUP_DISCUSSION', 'CAREER_ADVICE', 'TIPS_TRICKS', 'MOTIVATION');

-- CreateEnum
CREATE TYPE "social_schema"."AcademicLevel" AS ENUM ('HIGH_SCHOOL', 'UNDERGRADUATE', 'GRADUATE', 'DOCTORATE', 'PROFESSIONAL', 'CONTINUING_EDUCATION');

-- CreateEnum
CREATE TYPE "social_schema"."FollowStatus" AS ENUM ('PENDING', 'ACCEPTED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "social_schema"."FriendStatus" AS ENUM ('PENDING', 'ACCEPTED', 'BLOCKED', 'REJECTED');

-- CreateEnum
CREATE TYPE "courses_schema"."CourseCategory" AS ENUM ('TECHNOLOGY', 'BUSINESS', 'DESIGN', 'MARKETING', 'DEVELOPMENT', 'DATA_SCIENCE', 'PHOTOGRAPHY', 'MUSIC', 'HEALTH', 'FITNESS', 'LANGUAGE', 'ACADEMIC', 'TEST_PREP', 'PERSONAL_DEVELOPMENT');

-- CreateEnum
CREATE TYPE "courses_schema"."CourseLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL_LEVELS');

-- CreateEnum
CREATE TYPE "courses_schema"."EnrollmentStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'DROPPED', 'SUSPENDED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "courses_schema"."ProgressStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED');

-- CreateEnum
CREATE TYPE "courses_schema"."AssignmentType" AS ENUM ('WRITTEN', 'PROJECT', 'PRESENTATION', 'CODE', 'DESIGN', 'VIDEO', 'PEER_REVIEW');

-- CreateEnum
CREATE TYPE "courses_schema"."SubmissionStatus" AS ENUM ('SUBMITTED', 'GRADED', 'RETURNED', 'LATE', 'MISSING');

-- CreateEnum
CREATE TYPE "courses_schema"."DiscussionCategory" AS ENUM ('GENERAL', 'QUESTIONS', 'ANNOUNCEMENTS', 'TECHNICAL_HELP', 'ASSIGNMENTS', 'PROJECTS', 'FEEDBACK');

-- CreateEnum
CREATE TYPE "courses_schema"."MaterialType" AS ENUM ('PDF', 'VIDEO', 'AUDIO', 'PRESENTATION', 'SPREADSHEET', 'CODE', 'DATASET', 'TEMPLATE', 'REFERENCE');

-- CreateEnum
CREATE TYPE "jobs_schema"."JobPostVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'FRIENDS', 'FOLLOWERS', 'LISTED');

-- CreateEnum
CREATE TYPE "jobs_schema"."JobCategory" AS ENUM ('PRIVATE', 'GOVERNMENT');

-- CreateEnum
CREATE TYPE "jobs_schema"."JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP', 'TEMPORARY');

-- CreateEnum
CREATE TYPE "jobs_schema"."JobStatus" AS ENUM ('ACTIVE', 'PAUSED', 'FILLED', 'EXPIRED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "jobs_schema"."ApplicationStatus" AS ENUM ('PENDING', 'REVIEWING', 'SHORTLISTED', 'INTERVIEWED', 'OFFERED', 'HIRED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "freelancing_schema"."FreelanceCategory" AS ENUM ('HYBRID', 'ONLINE', 'REMOTE');

-- CreateEnum
CREATE TYPE "freelancing_schema"."PaymentType" AS ENUM ('FIXED', 'HOURLY', 'MILESTONE');

-- CreateEnum
CREATE TYPE "freelancing_schema"."ProjectComplexity" AS ENUM ('SIMPLE', 'STANDARD', 'COMPLEX', 'EXPERT');

-- CreateEnum
CREATE TYPE "freelancing_schema"."ProjectStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "freelancing_schema"."ProposalStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'SHORTLISTED');

-- CreateEnum
CREATE TYPE "freelancing_schema"."FreelancingPostVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'FRIENDS', 'FOLLOWERS', 'LISTED');

-- CreateEnum
CREATE TYPE "rating_schema"."RatingContext" AS ENUM ('COURSE_COMPLETION', 'SEMESTER_END', 'PROJECT_COMPLETION', 'GRADUATION', 'INTERNSHIP_COMPLETION', 'JOB_COMPLETION', 'FREELANCE_PROJECT', 'PEER_COLLABORATION', 'MENTORSHIP', 'RESEARCH_COLLABORATION', 'ENROLLMENT_EXPERIENCE', 'FACILITY_USAGE', 'SUPPORT_SERVICE');

-- CreateEnum
CREATE TYPE "rating_schema"."RatingEntityType" AS ENUM ('USER', 'INSTITUTION', 'COURSE', 'PROJECT', 'DEPARTMENT', 'PROGRAM', 'SERVICE');

-- CreateEnum
CREATE TYPE "rating_schema"."RatingCategory" AS ENUM ('ACADEMIC_PERFORMANCE', 'TEACHING_EFFECTIVENESS', 'COURSE_CONTENT_QUALITY', 'RESEARCH_QUALITY', 'PUBLICATION_IMPACT', 'COMMUNICATION_SKILLS', 'TEAMWORK_COLLABORATION', 'MENTORSHIP_QUALITY', 'RESPONSIVENESS', 'PROFESSIONALISM', 'INFRASTRUCTURE_QUALITY', 'SUPPORT_SERVICES', 'CAREER_OPPORTUNITIES', 'OVERALL_SATISFACTION', 'ACADEMIC_REPUTATION', 'PROJECT_QUALITY', 'TIMELINESS', 'INNOVATION', 'PROBLEM_SOLVING', 'TECHNICAL_SKILLS', 'PARTICIPATION_ENGAGEMENT', 'LEADERSHIP', 'INITIATIVE', 'ADAPTABILITY', 'RELIABILITY');

-- CreateEnum
CREATE TYPE "rating_schema"."RatingVisibility" AS ENUM ('PUBLIC', 'PRIVATE', 'INSTITUTIONAL', 'PEERS_ONLY', 'ANONYMOUS');

-- CreateEnum
CREATE TYPE "rating_schema"."RatingStatus" AS ENUM ('ACTIVE', 'DISPUTED', 'MODERATED', 'ARCHIVED', 'PENDING');

-- CreateEnum
CREATE TYPE "news_schema"."NewsType" AS ENUM ('EDUCATIONAL', 'INSTITUTIONAL', 'ACADEMIC', 'RESEARCH', 'EVENTS', 'ANNOUNCEMENTS', 'ACHIEVEMENTS', 'POLICY_UPDATES', 'TECHNOLOGY', 'INDUSTRY');

-- CreateEnum
CREATE TYPE "news_schema"."NewsCategory" AS ENUM ('GENERAL', 'ADMISSIONS', 'EXAMINATIONS', 'SCHOLARSHIPS', 'COURSES', 'FACULTY', 'STUDENT_LIFE', 'RESEARCH', 'TECHNOLOGY', 'SPORTS', 'CULTURAL', 'ALUMNI', 'CAREER', 'INTERNSHIPS');

-- CreateEnum
CREATE TYPE "news_schema"."NewsPostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED', 'DELETED');

-- CreateEnum
CREATE TYPE "news_schema"."NewsPostVisibility" AS ENUM ('PUBLIC', 'INSTITUTION_ONLY', 'STUDENTS_ONLY', 'FACULTY_ONLY', 'PRIVATE');

-- CreateEnum
CREATE TYPE "news_schema"."NewsPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT', 'BREAKING');

-- CreateEnum
CREATE TYPE "community_schema"."ChatGroupType" AS ENUM ('STUDY', 'HOMEWORK_HELP', 'EXAM_PREP', 'PROJECT_COLLABORATION', 'LANGUAGE_EXCHANGE', 'CAREER_DISCUSSION', 'CASUAL_CHAT', 'DEBATE', 'BOOK_CLUB', 'CODING', 'RESEARCH', 'NETWORKING');

-- CreateEnum
CREATE TYPE "community_schema"."ChatMemberRole" AS ENUM ('MEMBER', 'MODERATOR', 'ADMIN', 'CREATOR');

-- CreateEnum
CREATE TYPE "community_schema"."ChatMessageType" AS ENUM ('TEXT', 'IMAGE', 'FILE', 'VOICE_NOTE', 'VIDEO', 'LOCATION', 'SYSTEM', 'POLL', 'LINK');

-- CreateEnum
CREATE TYPE "community_schema"."CallType" AS ENUM ('VOICE', 'VIDEO', 'SCREEN_SHARE');

-- CreateEnum
CREATE TYPE "community_schema"."InterestCategory" AS ENUM ('ACADEMIC', 'PROGRAMMING', 'LANGUAGE', 'HOBBY', 'CAREER', 'SPORTS', 'ARTS', 'MUSIC', 'SCIENCE', 'TECHNOLOGY', 'BUSINESS', 'OTHER');

-- CreateEnum
CREATE TYPE "community_schema"."SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "community_schema"."AvailabilityType" AS ENUM ('CHAT', 'VOICE_CALL', 'VIDEO_CALL', 'SCREEN_SHARE');

-- CreateEnum
CREATE TYPE "community_schema"."MatchType" AS ENUM ('INTEREST_BASED', 'SKILL_BASED', 'LOCATION_BASED', 'RANDOM', 'STUDY_BUDDY');

-- CreateEnum
CREATE TYPE "community_schema"."MatchStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "messages_schema"."MessageType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'AUDIO', 'FILE', 'LOCATION', 'CONTACT', 'STICKER', 'EMOJI_REACTION', 'VOICE_NOTE', 'SYSTEM_MESSAGE');

-- CreateEnum
CREATE TYPE "messages_schema"."MessageStatus" AS ENUM ('SENT', 'DELIVERED', 'READ', 'FAILED', 'DELETED');

-- CreateEnum
CREATE TYPE "messages_schema"."ConversationType" AS ENUM ('DIRECT', 'GROUP', 'BROADCAST', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "messages_schema"."MessagePriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "feedback_schema"."FeedbackType" AS ENUM ('GENERAL_FEEDBACK', 'BUG_REPORT', 'FEATURE_REQUEST', 'COURSE_REVIEW', 'INSTRUCTOR_REVIEW', 'PLATFORM_REVIEW', 'SERVICE_FEEDBACK', 'SUGGESTION', 'COMPLAINT', 'TESTIMONIAL');

-- CreateEnum
CREATE TYPE "feedback_schema"."FeedbackStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REJECTED');

-- CreateEnum
CREATE TYPE "feedback_schema"."FeedbackPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL');

-- CreateEnum
CREATE TYPE "feedback_schema"."FeedbackCategory" AS ENUM ('USER_EXPERIENCE', 'TECHNICAL_ISSUE', 'CONTENT_QUALITY', 'PERFORMANCE', 'SECURITY', 'ACCESSIBILITY', 'MOBILE_APP', 'WEB_PLATFORM', 'PAYMENT', 'SUPPORT', 'FEATURE', 'OTHER');

-- CreateEnum
CREATE TYPE "feedback_schema"."SentimentScore" AS ENUM ('VERY_NEGATIVE', 'NEGATIVE', 'NEUTRAL', 'POSITIVE', 'VERY_POSITIVE');

-- CreateEnum
CREATE TYPE "feedback_schema"."ResponseType" AS ENUM ('COMMENT', 'SOLUTION', 'UPDATE', 'CLARIFICATION', 'ESCALATION', 'CLOSURE');

-- CreateEnum
CREATE TYPE "feedback_schema"."VoteType" AS ENUM ('HELPFUL', 'UNHELPFUL', 'SPAM', 'INAPPROPRIATE');

-- CreateEnum
CREATE TYPE "feedback_schema"."ReviewTargetType" AS ENUM ('COURSE', 'INSTRUCTOR', 'PLATFORM', 'FREELANCER', 'JOB_POSTER', 'CONTENT', 'FEATURE', 'SERVICE');

-- CreateEnum
CREATE TYPE "feedback_schema"."ReviewCategory" AS ENUM ('GENERAL', 'QUALITY', 'VALUE_FOR_MONEY', 'USER_EXPERIENCE', 'CUSTOMER_SERVICE', 'TECHNICAL_PERFORMANCE', 'CONTENT_ACCURACY', 'INSTRUCTOR_EFFECTIVENESS');

-- CreateEnum
CREATE TYPE "feedback_schema"."ReportReason" AS ENUM ('SPAM', 'INAPPROPRIATE_CONTENT', 'HARASSMENT', 'FALSE_INFORMATION', 'COPYRIGHT_VIOLATION', 'FAKE_REVIEW', 'OFFENSIVE_LANGUAGE', 'OTHER');

-- CreateEnum
CREATE TYPE "feedback_schema"."ReportStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "feedback_schema"."SurveyType" AS ENUM ('FEEDBACK', 'SATISFACTION', 'FEATURE_REQUEST', 'USER_RESEARCH', 'MARKET_RESEARCH', 'ACADEMIC_SURVEY');

-- CreateEnum
CREATE TYPE "notifications_schema"."NotificationType" AS ENUM ('SYSTEM_ALERT', 'COURSE_UPDATE', 'ASSIGNMENT_DUE', 'GRADE_POSTED', 'MESSAGE_RECEIVED', 'COMMENT_REPLY', 'POST_LIKED', 'FOLLOW_REQUEST', 'FRIEND_REQUEST', 'EVENT_REMINDER', 'JOB_APPLICATION', 'FREELANCE_PROPOSAL', 'NEWS_PUBLISHED', 'FEEDBACK_RESPONSE', 'ACHIEVEMENT_UNLOCKED', 'PAYMENT_RECEIVED', 'ENROLLMENT_CONFIRMED', 'CERTIFICATE_ISSUED');

-- CreateEnum
CREATE TYPE "notifications_schema"."NotificationCategory" AS ENUM ('EDUCATIONAL', 'SOCIAL', 'FINANCIAL', 'ADMINISTRATIVE', 'TECHNICAL', 'MARKETING', 'SECURITY', 'ACHIEVEMENT');

-- CreateEnum
CREATE TYPE "notifications_schema"."NotificationPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT', 'CRITICAL');

-- CreateEnum
CREATE TYPE "notifications_schema"."NotificationChannel" AS ENUM ('IN_APP', 'EMAIL', 'SMS', 'PUSH', 'WEBHOOK');

-- CreateEnum
CREATE TYPE "notifications_schema"."NotificationStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'READ', 'DISMISSED', 'FAILED');

-- CreateEnum
CREATE TYPE "notifications_schema"."DeliveryStatus" AS ENUM ('PENDING', 'PROCESSING', 'DELIVERED', 'FAILED', 'BOUNCED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "notifications_schema"."DigestFrequency" AS ENUM ('IMMEDIATE', 'HOURLY', 'DAILY', 'WEEKLY', 'NEVER');

-- CreateEnum
CREATE TYPE "notifications_schema"."InteractionType" AS ENUM ('VIEWED', 'CLICKED', 'DISMISSED', 'SNOOZED', 'SHARED', 'REPORTED');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."InstitutionType" AS ENUM ('UNIVERSITY', 'COLLEGE', 'SCHOOL', 'ACADEMY', 'TRAINING_CENTER');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."InstitutionStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'INACTIVE', 'PENDING', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."InstitutionApplicationStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."DashboardMetricType" AS ENUM ('INSTITUTION_OVERVIEW', 'STUDENT_METRICS', 'TEACHER_METRICS', 'DEPARTMENT_METRICS', 'REAL_TIME_KPI', 'PERFORMANCE_ANALYTICS');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."ParentAccessLevel" AS ENUM ('BASIC', 'STANDARD', 'PREMIUM', 'FULL');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."InstitutionMemberRole" AS ENUM ('OWNER', 'ADMIN', 'TEACHER', 'STUDENT', 'STAFF', 'GUEST', 'ALUMNI');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."InstitutionMemberStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'INACTIVE', 'PENDING', 'EXPELLED', 'GRADUATED', 'TRANSFERRED');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."DepartmentStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'REORGANIZING');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."EventType" AS ENUM ('ACADEMIC', 'WORKSHOP', 'SEMINAR', 'MEETING', 'STUDY_SESSION', 'PRESENTATION', 'SOCIAL');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."EventAttendanceStatus" AS ENUM ('INTERESTED', 'GOING', 'MAYBE', 'NOT_GOING', 'ATTENDED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED', 'PARTIAL');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."StaffRole" AS ENUM ('ADMIN', 'TEACHER', 'COORDINATOR', 'LIBRARIAN', 'STAFF');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."StaffStatus" AS ENUM ('ACTIVE', 'ON_LEAVE', 'INACTIVE', 'TERMINATED');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."StudentStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."ProgramType" AS ENUM ('UNDERGRADUATE', 'GRADUATE', 'DIPLOMA', 'CERTIFICATE', 'PROFESSIONAL');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."SubscriptionTier" AS ENUM ('BASIC', 'STANDARD', 'PREMIUM', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."SchemaStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'MIGRATING');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."OperationType" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'BACKUP', 'RESTORE', 'MIGRATE');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."OperationStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."GradeType" AS ENUM ('QUIZ', 'ASSIGNMENT', 'EXAM', 'PROJECT', 'PARTICIPATION', 'FINAL');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."CalendarEventType" AS ENUM ('ACADEMIC_DEADLINE', 'EXAM_SCHEDULE', 'HOLIDAY', 'MEETING', 'WORKSHOP', 'CONFERENCE', 'ASSIGNMENT_DUE', 'COURSE_START', 'COURSE_END', 'GRADUATION', 'ORIENTATION');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."EventPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."ParentRelationType" AS ENUM ('BIOLOGICAL_PARENT', 'ADOPTIVE_PARENT', 'LEGAL_GUARDIAN', 'STEP_PARENT', 'FOSTER_PARENT', 'GRANDPARENT', 'OTHER_FAMILY', 'AUTHORIZED_REPRESENTATIVE');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."GradeTrend" AS ENUM ('IMPROVING', 'DECLINING', 'STABLE', 'FLUCTUATING');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."AcademicRiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."InsightTargetType" AS ENUM ('STUDENT', 'TEACHER', 'PROFESSOR', 'DEPARTMENT', 'INSTITUTION', 'COURSE', 'PROGRAM');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."InsightType" AS ENUM ('PERFORMANCE_TREND', 'ATTENDANCE_PATTERN', 'ENGAGEMENT_ANALYSIS', 'RISK_ASSESSMENT', 'IMPROVEMENT_OPPORTUNITY', 'ACHIEVEMENT_RECOGNITION', 'RESOURCE_OPTIMIZATION', 'PREDICTIVE_ANALYTICS');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."InsightPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."InsightStatus" AS ENUM ('ACTIVE', 'ACKNOWLEDGED', 'DISMISSED', 'EXPIRED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."HealthStatus" AS ENUM ('HEALTHY', 'WARNING', 'CRITICAL', 'DOWN', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."AlertLevel" AS ENUM ('INFO', 'WARNING', 'ERROR', 'CRITICAL');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."DashboardChatType" AS ENUM ('INSTITUTION_WIDE', 'DEPARTMENT_CHAT', 'CLASS_CHAT', 'TEACHER_LOUNGE', 'STUDENT_COUNCIL', 'ADMIN_CHAT', 'PARENT_TEACHER', 'PROJECT_TEAM', 'STUDY_GROUP');

-- CreateEnum
CREATE TYPE "edu_matrix_hub_schema"."ChatLevel" AS ENUM ('INSTITUTION', 'DEPARTMENT', 'CLASS', 'PROJECT', 'STUDY_GROUP');

-- CreateTable
CREATE TABLE "auth_schema"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profession" "auth_schema"."UserProfession" NOT NULL DEFAULT 'OTHER',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TIMESTAMP(3),
    "avatar" TEXT,
    "bio" TEXT,
    "institutionId" TEXT,
    "departmentId" TEXT,
    "studentId" TEXT,
    "employeeId" TEXT,
    "major" TEXT,
    "academicYear" TEXT,
    "phoneNumber" VARCHAR(20),
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "emergencyContact" TEXT,
    "permissions" TEXT[],
    "dashboardPreferences" JSONB,
    "accessLevel" "auth_schema"."AccessLevel" NOT NULL DEFAULT 'BASIC',
    "dataScope" "auth_schema"."DataScopeType" NOT NULL DEFAULT 'SELF',
    "canCreateCourses" BOOLEAN NOT NULL DEFAULT false,
    "canManageGrades" BOOLEAN NOT NULL DEFAULT false,
    "canViewAnalytics" BOOLEAN NOT NULL DEFAULT false,
    "canManageUsers" BOOLEAN NOT NULL DEFAULT false,
    "canAccessReports" BOOLEAN NOT NULL DEFAULT false,
    "canModerateContent" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "emailVerificationExpires" TIMESTAMP(3),
    "otpToken" VARCHAR(6),
    "otpExpires" TIMESTAMP(3),
    "otpAttempts" SMALLINT NOT NULL DEFAULT 0,
    "otpLastRequest" TIMESTAMP(3),
    "passwordResetToken" TEXT,
    "passwordResetExpires" TIMESTAMP(3),
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorSecret" TEXT,
    "twoFactorBackupCodes" TEXT[],
    "loginCount" INTEGER NOT NULL DEFAULT 0,
    "lastFailedLogin" TIMESTAMP(3),
    "failedAttempts" SMALLINT NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),
    "lastActivity" TIMESTAMP(3),
    "loginAttempts" SMALLINT NOT NULL DEFAULT 0,
    "lastLoginAttempt" TIMESTAMP(3),
    "professionalSummary" TEXT,
    "headline" TEXT,
    "currentPosition" TEXT,
    "currentCompany" TEXT,
    "linkedinUrl" TEXT,
    "portfolioUrl" TEXT,
    "githubUrl" TEXT,
    "websiteUrl" TEXT,
    "city" TEXT,
    "country" TEXT,
    "totalExperience" INTEGER,
    "keySkills" TEXT[],
    "languages" TEXT[],
    "resumeSlug" TEXT,
    "isResumePublic" BOOLEAN NOT NULL DEFAULT false,
    "resumeViews" INTEGER NOT NULL DEFAULT 0,
    "lastResumeView" TIMESTAMP(3),
    "resumeTemplate" TEXT DEFAULT 'default',
    "showContactInfo" BOOLEAN NOT NULL DEFAULT true,
    "showProfilePicture" BOOLEAN NOT NULL DEFAULT true,
    "openToWork" BOOLEAN NOT NULL DEFAULT false,
    "preferredWorkType" TEXT,
    "expectedSalary" TEXT,
    "availableFrom" TIMESTAMP(3),
    "createdBy" TEXT,
    "modifiedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."InstitutionMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "role" "auth_schema"."InstitutionRoleType" NOT NULL DEFAULT 'MEMBER',
    "permissions" TEXT[],
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "InstitutionMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."DepartmentMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "role" "auth_schema"."DepartmentRoleType" NOT NULL DEFAULT 'MEMBER',
    "permissions" TEXT[],
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DepartmentMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."ClassMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "role" "auth_schema"."ClassRoleType" NOT NULL DEFAULT 'STUDENT',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ClassMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."TeachingAssignment" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "subject" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TeachingAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."StudentEnrollment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "enrollDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "auth_schema"."StudentEnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "grade" TEXT,

    CONSTRAINT "StudentEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "auth_schema"."PasswordReset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."EmailVerification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."AuthAttempt" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userAgent" TEXT,
    "status" "auth_schema"."AuthAttemptStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "AuthAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_schema"."AuditLog" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_schema"."SocialPost" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "institutionId" TEXT,
    "content" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "videoUrls" TEXT[],
    "documentUrls" TEXT[],
    "postType" "social_schema"."SocialPostType" NOT NULL DEFAULT 'GENERAL',
    "educationalContext" TEXT,
    "tags" TEXT[],
    "studyGroupId" TEXT,
    "courseId" TEXT,
    "subjectArea" TEXT,
    "academicLevel" "social_schema"."AcademicLevel",
    "status" "social_schema"."SocialPostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "visibility" "social_schema"."SocialPostVisibility" NOT NULL DEFAULT 'PUBLIC',
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_schema"."SocialPostLike" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reaction" TEXT NOT NULL DEFAULT 'like',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialPostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_schema"."SocialPostComment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "content" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialPostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_schema"."SocialPostShare" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT,
    "privacy" "social_schema"."SocialPostVisibility" NOT NULL DEFAULT 'PUBLIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "social_schema"."SocialPostBookmark" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "collectionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialPostBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_schema"."Follow" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "status" "social_schema"."FollowStatus" NOT NULL DEFAULT 'ACCEPTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_schema"."Friend" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "social_schema"."FriendStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_schema"."Story" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "visibility" "social_schema"."SocialPostVisibility" NOT NULL DEFAULT 'PRIVATE',
    "allowReplies" BOOLEAN NOT NULL DEFAULT true,
    "allowReactions" BOOLEAN NOT NULL DEFAULT true,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "reactionCount" INTEGER NOT NULL DEFAULT 0,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_schema"."StoryView" (
    "id" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoryView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_schema"."StoryReaction" (
    "id" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reaction" TEXT NOT NULL DEFAULT 'like',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoryReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_schema"."StoryReply" (
    "id" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoryReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."OnlineCourse" (
    "id" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "category" "courses_schema"."CourseCategory" NOT NULL,
    "subcategory" TEXT,
    "tags" TEXT[],
    "prerequisites" TEXT[],
    "learningOutcomes" TEXT[],
    "level" "courses_schema"."CourseLevel" NOT NULL DEFAULT 'BEGINNER',
    "language" TEXT NOT NULL DEFAULT 'English',
    "duration" INTEGER,
    "totalLessons" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discountPrice" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "thumbnailUrl" TEXT,
    "previewVideoUrl" TEXT,
    "enrollmentLimit" INTEGER,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "selfPaced" BOOLEAN NOT NULL DEFAULT true,
    "certificateOffered" BOOLEAN NOT NULL DEFAULT true,
    "enrollmentCount" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalRatings" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institutionId" TEXT,
    "departmentId" TEXT,

    CONSTRAINT "OnlineCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."CourseEnrollment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "enrollmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completionDate" TIMESTAMP(3),
    "status" "courses_schema"."EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currentLessonId" TEXT,
    "lastAccessedAt" TIMESTAMP(3),
    "paymentAmount" DOUBLE PRECISION,
    "paymentMethod" TEXT,
    "paymentDate" TIMESTAMP(3),
    "overallGrade" DOUBLE PRECISION,
    "certificateIssued" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "modifiedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."CourseLesson" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "chapter" TEXT,
    "order" INTEGER NOT NULL,
    "duration" INTEGER,
    "videoUrl" TEXT,
    "audioUrl" TEXT,
    "documentUrls" TEXT[],
    "imageUrls" TEXT[],
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "prerequisiteLessons" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseLesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."LessonProgress" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" "courses_schema"."ProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "watchTime" INTEGER NOT NULL DEFAULT 0,
    "completionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastPosition" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "bookmarked" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "lastAccessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."CourseQuiz" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "lessonId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "instructions" TEXT,
    "questions" JSONB NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "passingScore" DOUBLE PRECISION NOT NULL DEFAULT 70,
    "timeLimit" INTEGER,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "shuffleQuestions" BOOLEAN NOT NULL DEFAULT true,
    "shuffleOptions" BOOLEAN NOT NULL DEFAULT true,
    "showResults" BOOLEAN NOT NULL DEFAULT true,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "modifiedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."QuizAttempt" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),
    "timeSpent" INTEGER,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."CourseAssignment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "maxPoints" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "dueDate" TIMESTAMP(3),
    "allowLateSubmission" BOOLEAN NOT NULL DEFAULT true,
    "latePenalty" DOUBLE PRECISION,
    "fileFormats" TEXT[],
    "maxFileSize" INTEGER,
    "maxSubmissions" INTEGER NOT NULL DEFAULT 1,
    "assignmentType" "courses_schema"."AssignmentType" NOT NULL DEFAULT 'WRITTEN',
    "isGroupWork" BOOLEAN NOT NULL DEFAULT false,
    "peerReview" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT,
    "modifiedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."AssignmentSubmission" (
    "id" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "content" TEXT,
    "fileUrls" TEXT[],
    "submissionNote" TEXT,
    "grade" DOUBLE PRECISION,
    "feedback" TEXT,
    "gradedAt" TIMESTAMP(3),
    "gradedBy" TEXT,
    "status" "courses_schema"."SubmissionStatus" NOT NULL DEFAULT 'SUBMITTED',
    "isLate" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."CourseDiscussion" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "courses_schema"."DiscussionCategory" NOT NULL DEFAULT 'GENERAL',
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseDiscussion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."DiscussionReply" (
    "id" TEXT NOT NULL,
    "discussionId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "parentId" TEXT,
    "content" TEXT NOT NULL,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiscussionReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."CourseReview" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."CourseMaterial" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "materialType" "courses_schema"."MaterialType" NOT NULL,
    "fileUrl" TEXT,
    "fileName" TEXT,
    "fileSize" INTEGER,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "requiresEnrollment" BOOLEAN NOT NULL DEFAULT true,
    "createdBy" TEXT,
    "modifiedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."CourseCertificate" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "issuedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" TIMESTAMP(3),
    "studentName" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "instructorName" TEXT NOT NULL,
    "grade" DOUBLE PRECISION,
    "certificateUrl" TEXT,
    "verificationCode" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "generatedBy" TEXT,
    "revokedAt" TIMESTAMP(3),
    "revokedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_schema"."CourseAnalytics" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enrollments" INTEGER NOT NULL DEFAULT 0,
    "completions" INTEGER NOT NULL DEFAULT 0,
    "dropouts" INTEGER NOT NULL DEFAULT 0,
    "averageProgress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalWatchTime" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quizAverageScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "assignmentSubmissionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discussionParticipation" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "calculatedBy" TEXT,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_schema"."JobPost" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "institutionId" TEXT,
    "jobCategory" "jobs_schema"."JobCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "jobType" "jobs_schema"."JobType" NOT NULL DEFAULT 'FULL_TIME',
    "salary" TEXT,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "remote" BOOLEAN NOT NULL DEFAULT false,
    "requirements" TEXT[],
    "skills" TEXT[],
    "experience" TEXT,
    "education" TEXT,
    "benefits" TEXT[],
    "status" "jobs_schema"."JobStatus" NOT NULL DEFAULT 'ACTIVE',
    "visibility" "jobs_schema"."JobPostVisibility" NOT NULL DEFAULT 'PUBLIC',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "urgent" BOOLEAN NOT NULL DEFAULT false,
    "applicationUrl" TEXT,
    "applicationEmail" TEXT,
    "applicationDeadline" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "applicationCount" INTEGER NOT NULL DEFAULT 0,
    "imageUrls" TEXT[],
    "attachmentUrls" TEXT[],
    "tags" TEXT[],
    "keywords" TEXT[],
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "modifiedBy" TEXT,

    CONSTRAINT "JobPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_schema"."JobPostLike" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reaction" TEXT NOT NULL DEFAULT 'like',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobPostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_schema"."JobPostComment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "content" TEXT NOT NULL,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobPostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_schema"."JobPostShare" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "caption" TEXT,
    "platform" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobPostShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_schema"."JobApplication" (
    "id" TEXT NOT NULL,
    "jobPostId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "coverLetter" TEXT,
    "resumeUrl" TEXT,
    "portfolio" TEXT,
    "contactInfo" JSONB,
    "status" "jobs_schema"."ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "responseAt" TIMESTAMP(3),
    "recruiterNotes" TEXT,
    "rating" INTEGER,
    "reviewedBy" TEXT,
    "modifiedBy" TEXT,
    "withdrawnAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_schema"."SalaryRange" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "minSalary" INTEGER NOT NULL,
    "maxSalary" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "location" TEXT NOT NULL,
    "jobType" "jobs_schema"."JobType" NOT NULL,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalaryRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "freelancing_schema"."FreelancePost" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "institutionId" TEXT,
    "freelanceCategory" "freelancing_schema"."FreelanceCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "budget" TEXT,
    "budgetMin" DECIMAL(65,30),
    "budgetMax" DECIMAL(65,30),
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentType" "freelancing_schema"."PaymentType" NOT NULL DEFAULT 'FIXED',
    "complexity" "freelancing_schema"."ProjectComplexity" NOT NULL DEFAULT 'STANDARD',
    "duration" TEXT,
    "startDate" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "skills" TEXT[],
    "requirements" TEXT[],
    "tools" TEXT[],
    "experience" TEXT,
    "location" TEXT,
    "timezone" TEXT,
    "status" "freelancing_schema"."ProjectStatus" NOT NULL DEFAULT 'OPEN',
    "visibility" "freelancing_schema"."FreelancingPostVisibility" NOT NULL DEFAULT 'PUBLIC',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "urgent" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "proposalCount" INTEGER NOT NULL DEFAULT 0,
    "imageUrls" TEXT[],
    "attachmentUrls" TEXT[],
    "tags" TEXT[],
    "keywords" TEXT[],
    "clientRating" DECIMAL(65,30),
    "clientLocation" TEXT,
    "responseTime" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "modifiedBy" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FreelancePost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "freelancing_schema"."FreelancePostLike" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reaction" TEXT NOT NULL DEFAULT 'like',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FreelancePostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "freelancing_schema"."FreelancePostComment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "content" TEXT NOT NULL,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FreelancePostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "freelancing_schema"."FreelancePostShare" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "caption" TEXT,
    "platform" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FreelancePostShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "freelancing_schema"."Proposal" (
    "id" TEXT NOT NULL,
    "freelancePostId" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "proposedBudget" DECIMAL(65,30),
    "timeline" TEXT,
    "availability" TEXT,
    "portfolioUrls" TEXT[],
    "previousWork" TEXT[],
    "certifications" TEXT[],
    "questions" TEXT,
    "notes" TEXT,
    "status" "freelancing_schema"."ProposalStatus" NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "responseAt" TIMESTAMP(3),
    "clientRating" INTEGER,
    "clientFeedback" TEXT,
    "withdrawnAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "modifiedBy" TEXT,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "freelancing_schema"."FreelanceReview" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "qualityRating" INTEGER,
    "timelyRating" INTEGER,
    "commRating" INTEGER,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FreelanceReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating_schema"."UniversalRating" (
    "id" TEXT NOT NULL,
    "raterId" TEXT NOT NULL,
    "rateeId" TEXT NOT NULL,
    "rateeType" "rating_schema"."RatingEntityType" NOT NULL,
    "context" "rating_schema"."RatingContext" NOT NULL,
    "relationshipId" TEXT,
    "overallRating" DOUBLE PRECISION NOT NULL,
    "title" TEXT,
    "comment" TEXT,
    "visibility" "rating_schema"."RatingVisibility" NOT NULL DEFAULT 'PUBLIC',
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "status" "rating_schema"."RatingStatus" NOT NULL DEFAULT 'ACTIVE',
    "helpfulVotes" INTEGER NOT NULL DEFAULT 0,
    "reportCount" INTEGER NOT NULL DEFAULT 0,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "interactionTime" INTEGER,
    "disputedAt" TIMESTAMP(3),
    "disputedBy" TEXT,
    "disputeReason" TEXT,
    "moderatedAt" TIMESTAMP(3),
    "moderatedBy" TEXT,
    "moderationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "UniversalRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating_schema"."RatingCategoryScore" (
    "id" TEXT NOT NULL,
    "ratingId" TEXT NOT NULL,
    "category" "rating_schema"."RatingCategory" NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,

    CONSTRAINT "RatingCategoryScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating_schema"."RatingRelationship" (
    "id" TEXT NOT NULL,
    "userId1" TEXT NOT NULL,
    "userId2" TEXT NOT NULL,
    "entityId" TEXT,
    "entityType" "rating_schema"."RatingEntityType",
    "relationshipType" TEXT NOT NULL,
    "context" "rating_schema"."RatingContext" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verificationProof" JSONB,
    "canRate1to2" BOOLEAN NOT NULL DEFAULT true,
    "canRate2to1" BOOLEAN NOT NULL DEFAULT true,
    "ratingDeadline" TIMESTAMP(3),
    "minimumInteractionMet" BOOLEAN NOT NULL DEFAULT false,
    "interactionHours" INTEGER,
    "lastInteractionAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RatingRelationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_schema"."NewsPost" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "institutionId" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT,
    "imageUrls" TEXT[],
    "videoUrls" TEXT[],
    "documentUrls" TEXT[],
    "newsType" "news_schema"."NewsType" NOT NULL DEFAULT 'EDUCATIONAL',
    "category" "news_schema"."NewsCategory" NOT NULL DEFAULT 'GENERAL',
    "subcategory" TEXT,
    "tags" TEXT[],
    "keywords" TEXT[],
    "source" TEXT,
    "sourceUrl" TEXT,
    "isOfficial" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "status" "news_schema"."NewsPostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "visibility" "news_schema"."NewsPostVisibility" NOT NULL DEFAULT 'PUBLIC',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "breaking" BOOLEAN NOT NULL DEFAULT false,
    "priority" "news_schema"."NewsPriority" NOT NULL DEFAULT 'NORMAL',
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "readTime" INTEGER,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "flaggedBy" TEXT,
    "flaggedReason" TEXT,
    "moderatedBy" TEXT,
    "moderatedAt" TIMESTAMP(3),
    "slug" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "publishedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_schema"."NewsPostLike" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reaction" TEXT NOT NULL DEFAULT 'like',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsPostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_schema"."NewsPostComment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" TEXT,
    "content" TEXT NOT NULL,
    "imageUrls" TEXT[],
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "flaggedBy" TEXT,
    "flaggedReason" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "moderatedBy" TEXT,
    "moderatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsPostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_schema"."NewsPostShare" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "caption" TEXT,
    "platform" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsPostShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_schema"."NewsAnalytics" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "uniqueViews" INTEGER NOT NULL DEFAULT 0,
    "avgReadingTime" INTEGER,
    "bounceRate" DECIMAL(65,30),
    "totalShares" INTEGER NOT NULL DEFAULT 0,
    "totalComments" INTEGER NOT NULL DEFAULT 0,
    "totalLikes" INTEGER NOT NULL DEFAULT 0,
    "engagementRate" DECIMAL(65,30),
    "referralSources" JSONB,
    "deviceTypes" JSONB,
    "locations" JSONB,
    "clickThroughRate" DECIMAL(65,30),
    "conversionRate" DECIMAL(65,30),
    "calculatedBy" TEXT,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_schema"."ChatGroup" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "institutionId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "topic" TEXT,
    "interests" TEXT[],
    "groupType" "community_schema"."ChatGroupType" NOT NULL DEFAULT 'STUDY',
    "isTemporary" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "maxMembers" INTEGER NOT NULL DEFAULT 50,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "requiresApproval" BOOLEAN NOT NULL DEFAULT false,
    "allowVoiceChat" BOOLEAN NOT NULL DEFAULT true,
    "allowVideoChat" BOOLEAN NOT NULL DEFAULT true,
    "allowFileShare" BOOLEAN NOT NULL DEFAULT true,
    "allowScreenShare" BOOLEAN NOT NULL DEFAULT false,
    "memberCount" INTEGER NOT NULL DEFAULT 1,
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "lastActivity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_schema"."ChatGroupMember" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "community_schema"."ChatMemberRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invitedBy" TEXT,
    "canInvite" BOOLEAN NOT NULL DEFAULT false,
    "canKick" BOOLEAN NOT NULL DEFAULT false,
    "canMute" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isModerator" BOOLEAN NOT NULL DEFAULT false,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isMuted" BOOLEAN NOT NULL DEFAULT false,
    "mutedUntil" TIMESTAMP(3),
    "isInVoiceCall" BOOLEAN NOT NULL DEFAULT false,
    "isInVideoCall" BOOLEAN NOT NULL DEFAULT false,
    "isSpeaking" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatGroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_schema"."ChatMessage" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT,
    "messageType" "community_schema"."ChatMessageType" NOT NULL DEFAULT 'TEXT',
    "imageUrls" TEXT[],
    "fileUrls" TEXT[],
    "voiceNoteUrl" TEXT,
    "fileName" TEXT,
    "fileSize" INTEGER,
    "replyToId" TEXT,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "editedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "reactions" JSONB,
    "reactionCount" INTEGER NOT NULL DEFAULT 0,
    "isSystemMessage" BOOLEAN NOT NULL DEFAULT false,
    "systemAction" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_schema"."VoiceCall" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "initiatorId" TEXT NOT NULL,
    "callType" "community_schema"."CallType" NOT NULL DEFAULT 'VOICE',
    "roomId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isRecording" BOOLEAN NOT NULL DEFAULT false,
    "recordingUrl" TEXT,
    "maxParticipants" INTEGER NOT NULL DEFAULT 10,
    "allowScreenShare" BOOLEAN NOT NULL DEFAULT false,
    "isGroupCall" BOOLEAN NOT NULL DEFAULT true,
    "participantCount" INTEGER NOT NULL DEFAULT 0,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoiceCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_schema"."VoiceCallParticipant" (
    "id" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),
    "duration" INTEGER NOT NULL DEFAULT 0,
    "isMuted" BOOLEAN NOT NULL DEFAULT false,
    "hasVideo" BOOLEAN NOT NULL DEFAULT false,
    "isScreenSharing" BOOLEAN NOT NULL DEFAULT false,
    "audioQuality" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoiceCallParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_schema"."UserInterest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "category" "community_schema"."InterestCategory" NOT NULL DEFAULT 'ACADEMIC',
    "level" "community_schema"."SkillLevel" NOT NULL DEFAULT 'BEGINNER',
    "isPreferred" BOOLEAN NOT NULL DEFAULT false,
    "wantsToLearn" BOOLEAN NOT NULL DEFAULT true,
    "wantsToTeach" BOOLEAN NOT NULL DEFAULT false,
    "availableFor" "community_schema"."AvailabilityType"[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community_schema"."UserMatch" (
    "id" TEXT NOT NULL,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    "matchType" "community_schema"."MatchType" NOT NULL DEFAULT 'INTEREST_BASED',
    "commonInterests" TEXT[],
    "matchScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "status" "community_schema"."MatchStatus" NOT NULL DEFAULT 'PENDING',
    "initiatedBy" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "groupId" TEXT,
    "hasInteracted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_schema"."Conversation" (
    "id" TEXT NOT NULL,
    "type" "messages_schema"."ConversationType" NOT NULL DEFAULT 'DIRECT',
    "title" TEXT,
    "description" TEXT,
    "isGroup" BOOLEAN NOT NULL DEFAULT false,
    "groupAvatar" TEXT,
    "maxMembers" INTEGER DEFAULT 50,
    "isEncrypted" BOOLEAN NOT NULL DEFAULT true,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "isMuted" BOOLEAN NOT NULL DEFAULT false,
    "adminOnly" BOOLEAN NOT NULL DEFAULT false,
    "readReceipts" BOOLEAN NOT NULL DEFAULT true,
    "typingStatus" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActivity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_schema"."ConversationParticipant" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isModerator" BOOLEAN NOT NULL DEFAULT false,
    "canAddMembers" BOOLEAN NOT NULL DEFAULT false,
    "canRemoveMembers" BOOLEAN NOT NULL DEFAULT false,
    "isMuted" BOOLEAN NOT NULL DEFAULT false,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "customName" TEXT,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversationParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_schema"."Message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT,
    "messageType" "messages_schema"."MessageType" NOT NULL DEFAULT 'TEXT',
    "mediaUrls" TEXT[],
    "mediaMetadata" JSONB,
    "thumbnailUrls" TEXT[],
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "editedAt" TIMESTAMP(3),
    "originalContent" TEXT,
    "replyToId" TEXT,
    "threadId" TEXT,
    "priority" "messages_schema"."MessagePriority" NOT NULL DEFAULT 'NORMAL',
    "status" "messages_schema"."MessageStatus" NOT NULL DEFAULT 'SENT',
    "mentions" TEXT[],
    "hashtags" TEXT[],
    "links" JSONB,
    "scheduledFor" TIMESTAMP(3),
    "isScheduled" BOOLEAN NOT NULL DEFAULT false,
    "isAutoGenerated" BOOLEAN NOT NULL DEFAULT false,
    "isEncrypted" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "deliveredAt" TIMESTAMP(3),
    "readCount" INTEGER NOT NULL DEFAULT 0,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "locationName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_schema"."MessageRead" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" TIMESTAMP(3),

    CONSTRAINT "MessageRead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_schema"."MessageReaction" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "reaction" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_schema"."TypingIndicator" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isTyping" BOOLEAN NOT NULL DEFAULT true,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TypingIndicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_schema"."MessageDraft" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "messageType" "messages_schema"."MessageType" NOT NULL DEFAULT 'TEXT',
    "mediaUrls" TEXT[],
    "replyToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_schema"."MessageAnalytics" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "totalReads" INTEGER NOT NULL DEFAULT 0,
    "totalReactions" INTEGER NOT NULL DEFAULT 0,
    "totalReplies" INTEGER NOT NULL DEFAULT 0,
    "avgResponseTime" DOUBLE PRECISION,
    "engagementScore" DOUBLE PRECISION,
    "popularityScore" DOUBLE PRECISION,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_schema"."BlockedUser" (
    "id" TEXT NOT NULL,
    "blockerId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,
    "reason" TEXT,
    "isReported" BOOLEAN NOT NULL DEFAULT false,
    "blockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlockedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_schema"."Feedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "feedbackType" "feedback_schema"."FeedbackType" NOT NULL,
    "category" "feedback_schema"."FeedbackCategory" NOT NULL DEFAULT 'OTHER',
    "moduleContext" TEXT,
    "pageUrl" TEXT,
    "userAgent" TEXT,
    "deviceInfo" TEXT,
    "priority" "feedback_schema"."FeedbackPriority" NOT NULL DEFAULT 'NORMAL',
    "status" "feedback_schema"."FeedbackStatus" NOT NULL DEFAULT 'PENDING',
    "tags" TEXT[],
    "rating" INTEGER,
    "assignedTo" TEXT,
    "internalNotes" TEXT,
    "resolutionNotes" TEXT,
    "estimatedResolution" TIMESTAMP(3),
    "attachmentUrls" TEXT[],
    "sentimentScore" "feedback_schema"."SentimentScore",
    "sentimentConfidence" DOUBLE PRECISION,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "followUpRequired" BOOLEAN NOT NULL DEFAULT false,
    "followUpDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_schema"."FeedbackResponse" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "responderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isOfficial" BOOLEAN NOT NULL DEFAULT false,
    "isInternal" BOOLEAN NOT NULL DEFAULT false,
    "responseType" "feedback_schema"."ResponseType" NOT NULL DEFAULT 'COMMENT',
    "attachmentUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedbackResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_schema"."FeedbackVote" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isHelpful" BOOLEAN NOT NULL,
    "voteType" "feedback_schema"."VoteType" NOT NULL DEFAULT 'HELPFUL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedbackVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_schema"."Review" (
    "id" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "targetType" "feedback_schema"."ReviewTargetType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviewCategory" "feedback_schema"."ReviewCategory" NOT NULL DEFAULT 'GENERAL',
    "tags" TEXT[],
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationData" JSONB,
    "isModerated" BOOLEAN NOT NULL DEFAULT false,
    "moderatedBy" TEXT,
    "moderationReason" TEXT,
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "reportCount" INTEGER NOT NULL DEFAULT 0,
    "imageUrls" TEXT[],
    "videoUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_schema"."ReviewVote" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isHelpful" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_schema"."ReviewReport" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "reason" "feedback_schema"."ReportReason" NOT NULL,
    "description" TEXT,
    "status" "feedback_schema"."ReportStatus" NOT NULL DEFAULT 'PENDING',
    "resolvedBy" TEXT,
    "resolutionNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "ReviewReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_schema"."Survey" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "instructions" TEXT,
    "surveyType" "feedback_schema"."SurveyType" NOT NULL DEFAULT 'FEEDBACK',
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "allowMultipleResponses" BOOLEAN NOT NULL DEFAULT false,
    "targetAudience" TEXT[],
    "targetCourses" TEXT[],
    "questions" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "responseCount" INTEGER NOT NULL DEFAULT 0,
    "completionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_schema"."SurveyResponse" (
    "id" TEXT NOT NULL,
    "surveyId" TEXT NOT NULL,
    "responderId" TEXT,
    "responses" JSONB NOT NULL,
    "timeSpent" INTEGER,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "deviceInfo" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistics_schema"."Statistics" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT,
    "departmentId" TEXT,
    "courseId" TEXT,
    "userId" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalInstitutions" INTEGER NOT NULL DEFAULT 0,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "totalTeachers" INTEGER NOT NULL DEFAULT 0,
    "dailyActiveUsers" INTEGER NOT NULL DEFAULT 0,
    "totalJobPosts" INTEGER NOT NULL DEFAULT 0,
    "totalMonthlyJobApplications" INTEGER NOT NULL DEFAULT 0,
    "totalMonthlyFreelancingPosts" INTEGER NOT NULL DEFAULT 0,
    "totalMonthlyStudentsInterlinkedPosts" INTEGER NOT NULL DEFAULT 0,
    "totalMonthlyTopRatedInstitutions" INTEGER NOT NULL DEFAULT 0,
    "totalMonthlyTopRatedStudents" INTEGER NOT NULL DEFAULT 0,
    "totalMonthlyTopRatedTeachers" INTEGER NOT NULL DEFAULT 0,
    "totalMonthlyTopRatedFreelancers" INTEGER NOT NULL DEFAULT 0,
    "totalMonthlyTopRatedJobs" INTEGER NOT NULL DEFAULT 0,
    "totalEnrollments" INTEGER NOT NULL DEFAULT 0,
    "newEnrollments" INTEGER NOT NULL DEFAULT 0,
    "droppedEnrollments" INTEGER NOT NULL DEFAULT 0,
    "totalCompletions" INTEGER NOT NULL DEFAULT 0,
    "completionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalLogins" INTEGER NOT NULL DEFAULT 0,
    "activeUsers" INTEGER NOT NULL DEFAULT 0,
    "inactiveUsers" INTEGER NOT NULL DEFAULT 0,
    "averageGrade" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "passRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Institution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "edu_matrix_hub_schema"."InstitutionType" NOT NULL DEFAULT 'UNIVERSITY',
    "status" "edu_matrix_hub_schema"."InstitutionStatus" NOT NULL DEFAULT 'ACTIVE',
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "zipCode" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "bannerUrl" TEXT,
    "createdBy" TEXT,
    "modifiedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "institutionId" TEXT NOT NULL,
    "headId" TEXT,
    "status" "edu_matrix_hub_schema"."DepartmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdBy" TEXT,
    "modifiedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications_schema"."Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "institutionId" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "shortMessage" TEXT,
    "type" "notifications_schema"."NotificationType" NOT NULL,
    "category" "notifications_schema"."NotificationCategory" NOT NULL,
    "priority" "notifications_schema"."NotificationPriority" NOT NULL DEFAULT 'NORMAL',
    "entityType" TEXT,
    "entityId" TEXT,
    "actionUrl" TEXT,
    "actionLabel" TEXT,
    "imageUrl" TEXT,
    "iconUrl" TEXT,
    "data" JSONB,
    "channels" "notifications_schema"."NotificationChannel"[],
    "scheduledFor" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "status" "notifications_schema"."NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "dismissedAt" TIMESTAMP(3),
    "groupId" TEXT,
    "batchId" TEXT,
    "sourceSystem" TEXT,
    "templateId" TEXT,
    "campaignId" TEXT,
    "preferenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications_schema"."NotificationDelivery" (
    "id" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "channel" "notifications_schema"."NotificationChannel" NOT NULL,
    "status" "notifications_schema"."DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "recipientAddress" TEXT NOT NULL,
    "provider" TEXT,
    "providerId" TEXT,
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "opened" BOOLEAN NOT NULL DEFAULT false,
    "openedAt" TIMESTAMP(3),
    "clicked" BOOLEAN NOT NULL DEFAULT false,
    "clickedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications_schema"."NotificationPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "globalEnabled" BOOLEAN NOT NULL DEFAULT true,
    "emailEnabled" BOOLEAN NOT NULL DEFAULT true,
    "smsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "pushEnabled" BOOLEAN NOT NULL DEFAULT true,
    "digestFrequency" "notifications_schema"."DigestFrequency" NOT NULL DEFAULT 'DAILY',
    "quietHoursStart" TEXT,
    "quietHoursEnd" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "educationalNotifications" BOOLEAN NOT NULL DEFAULT true,
    "socialNotifications" BOOLEAN NOT NULL DEFAULT true,
    "financialNotifications" BOOLEAN NOT NULL DEFAULT true,
    "administrativeNotifications" BOOLEAN NOT NULL DEFAULT true,
    "technicalNotifications" BOOLEAN NOT NULL DEFAULT false,
    "marketingNotifications" BOOLEAN NOT NULL DEFAULT false,
    "securityNotifications" BOOLEAN NOT NULL DEFAULT true,
    "achievementNotifications" BOOLEAN NOT NULL DEFAULT true,
    "courseUpdates" BOOLEAN NOT NULL DEFAULT true,
    "assignmentReminders" BOOLEAN NOT NULL DEFAULT true,
    "gradeNotifications" BOOLEAN NOT NULL DEFAULT true,
    "messageNotifications" BOOLEAN NOT NULL DEFAULT true,
    "socialInteractions" BOOLEAN NOT NULL DEFAULT true,
    "jobOpportunities" BOOLEAN NOT NULL DEFAULT false,
    "newsUpdates" BOOLEAN NOT NULL DEFAULT false,
    "educationalChannels" JSONB,
    "socialChannels" JSONB,
    "financialChannels" JSONB,
    "administrativeChannels" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications_schema"."NotificationTemplate" (
    "id" TEXT NOT NULL,
    "templateKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "titleTemplate" TEXT NOT NULL,
    "messageTemplate" TEXT NOT NULL,
    "shortTemplate" TEXT,
    "type" "notifications_schema"."NotificationType" NOT NULL,
    "category" "notifications_schema"."NotificationCategory" NOT NULL,
    "priority" "notifications_schema"."NotificationPriority" NOT NULL DEFAULT 'NORMAL',
    "channels" "notifications_schema"."NotificationChannel"[],
    "variables" JSONB NOT NULL,
    "sampleData" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "requiresApproval" BOOLEAN NOT NULL DEFAULT false,
    "language" TEXT NOT NULL DEFAULT 'en',
    "localizations" JSONB,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications_schema"."NotificationGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "groupKey" TEXT NOT NULL,
    "type" "notifications_schema"."NotificationType" NOT NULL,
    "category" "notifications_schema"."NotificationCategory" NOT NULL,
    "maxNotifications" INTEGER,
    "mergeTimeWindow" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications_schema"."NotificationInteraction" (
    "id" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interactionType" "notifications_schema"."InteractionType" NOT NULL,
    "interactionData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications_schema"."NotificationAnalytics" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalSent" INTEGER NOT NULL DEFAULT 0,
    "totalDelivered" INTEGER NOT NULL DEFAULT 0,
    "totalFailed" INTEGER NOT NULL DEFAULT 0,
    "totalRead" INTEGER NOT NULL DEFAULT 0,
    "totalClicked" INTEGER NOT NULL DEFAULT 0,
    "emailSent" INTEGER NOT NULL DEFAULT 0,
    "emailDelivered" INTEGER NOT NULL DEFAULT 0,
    "smsSent" INTEGER NOT NULL DEFAULT 0,
    "smsDelivered" INTEGER NOT NULL DEFAULT 0,
    "pushSent" INTEGER NOT NULL DEFAULT 0,
    "pushDelivered" INTEGER NOT NULL DEFAULT 0,
    "educationalSent" INTEGER NOT NULL DEFAULT 0,
    "socialSent" INTEGER NOT NULL DEFAULT 0,
    "financialSent" INTEGER NOT NULL DEFAULT 0,
    "averageDeliveryTime" INTEGER NOT NULL DEFAULT 0,
    "openRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "clickRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."InstitutionApplication" (
    "id" TEXT NOT NULL,
    "applicantUserId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "status" "edu_matrix_hub_schema"."InstitutionApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "applicationData" JSONB NOT NULL DEFAULT '{}',
    "reviewedByUserId" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewNotes" TEXT,
    "rejectionReason" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstitutionApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."InstitutionEnrollment" (
    "id" TEXT NOT NULL,
    "studentUserId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" "courses_schema"."EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstitutionEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Program" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "edu_matrix_hub_schema"."ProgramType" NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "credits" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."ProgramRequirement" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "courses" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Course" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "programId" TEXT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "syllabus" TEXT,
    "prerequisites" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."CourseInstructor" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PRIMARY',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CourseInstructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Staff" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "role" "edu_matrix_hub_schema"."StaffRole" NOT NULL,
    "status" "edu_matrix_hub_schema"."StaffStatus" NOT NULL DEFAULT 'ACTIVE',
    "hireDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contractType" TEXT,
    "salary" DECIMAL(65,30),
    "qualifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "specializations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "programId" TEXT,
    "year" INTEGER,
    "semester" INTEGER,
    "status" "edu_matrix_hub_schema"."StudentStatus" NOT NULL DEFAULT 'ACTIVE',
    "enrollmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "graduationDate" TIMESTAMP(3),
    "gpa" DECIMAL(65,30),
    "totalCredits" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Attendance" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "programId" TEXT,
    "date" DATE NOT NULL,
    "status" "edu_matrix_hub_schema"."AttendanceStatus" NOT NULL,
    "note" TEXT,
    "markedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Grade" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "type" "edu_matrix_hub_schema"."GradeType" NOT NULL,
    "score" DECIMAL(65,30) NOT NULL,
    "maxScore" DECIMAL(65,30) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL DEFAULT 1.0,
    "feedback" TEXT,
    "gradedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Assignment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "maxScore" DECIMAL(65,30) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL DEFAULT 1.0,
    "instructions" TEXT,
    "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Examination" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "examDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "maxScore" DECIMAL(65,30) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL DEFAULT 1.0,
    "instructions" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Examination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."ExamResult" (
    "id" TEXT NOT NULL,
    "examinationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "score" DECIMAL(65,30) NOT NULL,
    "answers" JSONB DEFAULT '{}',
    "startedAt" TIMESTAMP(3) NOT NULL,
    "submittedAt" TIMESTAMP(3),
    "gradedAt" TIMESTAMP(3),
    "feedback" TEXT,

    CONSTRAINT "ExamResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Schedule" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "room" TEXT,
    "building" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Payment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "type" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."ScholarshipAward" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "type" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "conditions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScholarshipAward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."ApiKey" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "scopes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3),
    "usageCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."Webhook" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "events" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "secret" TEXT NOT NULL,
    "headers" JSONB DEFAULT '{}',
    "retryCount" INTEGER NOT NULL DEFAULT 3,
    "timeout" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastTriggered" TIMESTAMP(3),

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."ModuleIntegration" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "configuration" JSONB NOT NULL DEFAULT '{}',
    "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModuleIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."TenantSchema" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "schemaName" TEXT NOT NULL,
    "status" "edu_matrix_hub_schema"."SchemaStatus" NOT NULL DEFAULT 'ACTIVE',
    "configuration" JSONB NOT NULL DEFAULT '{}',
    "version" INTEGER NOT NULL DEFAULT 1,
    "tableCount" INTEGER NOT NULL DEFAULT 0,
    "storageUsed" BIGINT NOT NULL DEFAULT 0,
    "quotaLimit" BIGINT NOT NULL,
    "lastOptimized" TIMESTAMP(3),
    "lastBackup" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."SchemaOperation" (
    "id" TEXT NOT NULL,
    "schemaId" TEXT NOT NULL,
    "type" "edu_matrix_hub_schema"."OperationType" NOT NULL,
    "status" "edu_matrix_hub_schema"."OperationStatus" NOT NULL DEFAULT 'PENDING',
    "description" TEXT NOT NULL,
    "metadata" JSONB DEFAULT '{}',
    "error" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchemaOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."InstitutionalAnalytics" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "totalStaff" INTEGER NOT NULL DEFAULT 0,
    "totalCourses" INTEGER NOT NULL DEFAULT 0,
    "totalPrograms" INTEGER NOT NULL DEFAULT 0,
    "activeUsers" INTEGER NOT NULL DEFAULT 0,
    "storageUsed" BIGINT NOT NULL DEFAULT 0,
    "apiCalls" INTEGER NOT NULL DEFAULT 0,
    "averageGpa" DECIMAL(65,30),
    "attendanceRate" DECIMAL(65,30),
    "completionRate" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstitutionalAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_matrix_hub_schema"."DepartmentAnalytics" (
    "id" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "totalStaff" INTEGER NOT NULL DEFAULT 0,
    "totalCourses" INTEGER NOT NULL DEFAULT 0,
    "averageGpa" DECIMAL(65,30),
    "attendanceRate" DECIMAL(65,30),
    "completionRate" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DepartmentAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "auth_schema"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "auth_schema"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_resumeSlug_key" ON "auth_schema"."User"("resumeSlug");

-- CreateIndex
CREATE INDEX "User_profession_isVerified_idx" ON "auth_schema"."User"("profession", "isVerified");

-- CreateIndex
CREATE INDEX "User_institutionId_profession_idx" ON "auth_schema"."User"("institutionId", "profession");

-- CreateIndex
CREATE INDEX "User_departmentId_profession_idx" ON "auth_schema"."User"("departmentId", "profession");

-- CreateIndex
CREATE INDEX "User_lastLogin_isVerified_idx" ON "auth_schema"."User"("lastLogin", "isVerified");

-- CreateIndex
CREATE INDEX "User_email_isVerified_idx" ON "auth_schema"."User"("email", "isVerified");

-- CreateIndex
CREATE INDEX "User_username_profession_idx" ON "auth_schema"."User"("username", "profession");

-- CreateIndex
CREATE INDEX "User_accessLevel_dataScope_idx" ON "auth_schema"."User"("accessLevel", "dataScope");

-- CreateIndex
CREATE INDEX "User_createdAt_profession_idx" ON "auth_schema"."User"("createdAt", "profession");

-- CreateIndex
CREATE INDEX "User_updatedAt_isVerified_idx" ON "auth_schema"."User"("updatedAt", "isVerified");

-- CreateIndex
CREATE INDEX "User_studentId_institutionId_idx" ON "auth_schema"."User"("studentId", "institutionId");

-- CreateIndex
CREATE INDEX "User_employeeId_institutionId_idx" ON "auth_schema"."User"("employeeId", "institutionId");

-- CreateIndex
CREATE INDEX "InstitutionMember_institutionId_role_idx" ON "auth_schema"."InstitutionMember"("institutionId", "role");

-- CreateIndex
CREATE INDEX "InstitutionMember_userId_isActive_idx" ON "auth_schema"."InstitutionMember"("userId", "isActive");

-- CreateIndex
CREATE INDEX "InstitutionMember_role_isActive_idx" ON "auth_schema"."InstitutionMember"("role", "isActive");

-- CreateIndex
CREATE INDEX "InstitutionMember_joinedAt_isActive_idx" ON "auth_schema"."InstitutionMember"("joinedAt", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionMember_userId_institutionId_key" ON "auth_schema"."InstitutionMember"("userId", "institutionId");

-- CreateIndex
CREATE INDEX "DepartmentMember_departmentId_role_idx" ON "auth_schema"."DepartmentMember"("departmentId", "role");

-- CreateIndex
CREATE INDEX "DepartmentMember_userId_isActive_idx" ON "auth_schema"."DepartmentMember"("userId", "isActive");

-- CreateIndex
CREATE INDEX "DepartmentMember_role_isActive_idx" ON "auth_schema"."DepartmentMember"("role", "isActive");

-- CreateIndex
CREATE INDEX "DepartmentMember_joinedAt_isActive_idx" ON "auth_schema"."DepartmentMember"("joinedAt", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentMember_userId_departmentId_key" ON "auth_schema"."DepartmentMember"("userId", "departmentId");

-- CreateIndex
CREATE INDEX "ClassMember_classId_role_idx" ON "auth_schema"."ClassMember"("classId", "role");

-- CreateIndex
CREATE INDEX "ClassMember_userId_isActive_idx" ON "auth_schema"."ClassMember"("userId", "isActive");

-- CreateIndex
CREATE INDEX "ClassMember_role_isActive_idx" ON "auth_schema"."ClassMember"("role", "isActive");

-- CreateIndex
CREATE INDEX "ClassMember_joinedAt_isActive_idx" ON "auth_schema"."ClassMember"("joinedAt", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ClassMember_userId_classId_key" ON "auth_schema"."ClassMember"("userId", "classId");

-- CreateIndex
CREATE INDEX "TeachingAssignment_classId_isActive_idx" ON "auth_schema"."TeachingAssignment"("classId", "isActive");

-- CreateIndex
CREATE INDEX "TeachingAssignment_teacherId_isActive_idx" ON "auth_schema"."TeachingAssignment"("teacherId", "isActive");

-- CreateIndex
CREATE INDEX "TeachingAssignment_startDate_isActive_idx" ON "auth_schema"."TeachingAssignment"("startDate", "isActive");

-- CreateIndex
CREATE INDEX "TeachingAssignment_subject_isActive_idx" ON "auth_schema"."TeachingAssignment"("subject", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "TeachingAssignment_teacherId_classId_key" ON "auth_schema"."TeachingAssignment"("teacherId", "classId");

-- CreateIndex
CREATE INDEX "StudentEnrollment_classId_status_idx" ON "auth_schema"."StudentEnrollment"("classId", "status");

-- CreateIndex
CREATE INDEX "StudentEnrollment_studentId_status_idx" ON "auth_schema"."StudentEnrollment"("studentId", "status");

-- CreateIndex
CREATE INDEX "StudentEnrollment_enrollDate_status_idx" ON "auth_schema"."StudentEnrollment"("enrollDate", "status");

-- CreateIndex
CREATE INDEX "StudentEnrollment_status_grade_idx" ON "auth_schema"."StudentEnrollment"("status", "grade");

-- CreateIndex
CREATE UNIQUE INDEX "StudentEnrollment_studentId_classId_key" ON "auth_schema"."StudentEnrollment"("studentId", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "auth_schema"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "auth_schema"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "auth_schema"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "auth_schema"."VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_token_key" ON "auth_schema"."PasswordReset"("token");

-- CreateIndex
CREATE INDEX "PasswordReset_userId_expires_idx" ON "auth_schema"."PasswordReset"("userId", "expires");

-- CreateIndex
CREATE INDEX "PasswordReset_token_expires_idx" ON "auth_schema"."PasswordReset"("token", "expires");

-- CreateIndex
CREATE INDEX "PasswordReset_createdAt_idx" ON "auth_schema"."PasswordReset"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerification_token_key" ON "auth_schema"."EmailVerification"("token");

-- CreateIndex
CREATE INDEX "EmailVerification_userId_expires_idx" ON "auth_schema"."EmailVerification"("userId", "expires");

-- CreateIndex
CREATE INDEX "EmailVerification_token_expires_idx" ON "auth_schema"."EmailVerification"("token", "expires");

-- CreateIndex
CREATE INDEX "EmailVerification_createdAt_idx" ON "auth_schema"."EmailVerification"("createdAt");

-- CreateIndex
CREATE INDEX "AuthAttempt_email_status_idx" ON "auth_schema"."AuthAttempt"("email", "status");

-- CreateIndex
CREATE INDEX "AuthAttempt_createdAt_status_idx" ON "auth_schema"."AuthAttempt"("createdAt", "status");

-- CreateIndex
CREATE INDEX "AuthAttempt_userId_status_idx" ON "auth_schema"."AuthAttempt"("userId", "status");

-- CreateIndex
CREATE INDEX "AuthAttempt_status_createdAt_idx" ON "auth_schema"."AuthAttempt"("status", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_institutionId_timestamp_idx" ON "auth_schema"."AuditLog"("institutionId", "timestamp");

-- CreateIndex
CREATE INDEX "AuditLog_userId_timestamp_idx" ON "auth_schema"."AuditLog"("userId", "timestamp");

-- CreateIndex
CREATE INDEX "AuditLog_action_timestamp_idx" ON "auth_schema"."AuditLog"("action", "timestamp");

-- CreateIndex
CREATE INDEX "AuditLog_resourceType_resourceId_idx" ON "auth_schema"."AuditLog"("resourceType", "resourceId");

-- CreateIndex
CREATE INDEX "AuditLog_timestamp_idx" ON "auth_schema"."AuditLog"("timestamp");

-- CreateIndex
CREATE INDEX "AuditLog_ipAddress_timestamp_idx" ON "auth_schema"."AuditLog"("ipAddress", "timestamp");

-- CreateIndex
CREATE INDEX "SocialPost_authorId_status_idx" ON "social_schema"."SocialPost"("authorId", "status");

-- CreateIndex
CREATE INDEX "SocialPost_institutionId_status_idx" ON "social_schema"."SocialPost"("institutionId", "status");

-- CreateIndex
CREATE INDEX "SocialPost_createdAt_featured_idx" ON "social_schema"."SocialPost"("createdAt", "featured");

-- CreateIndex
CREATE INDEX "SocialPost_studyGroupId_idx" ON "social_schema"."SocialPost"("studyGroupId");

-- CreateIndex
CREATE INDEX "SocialPost_courseId_idx" ON "social_schema"."SocialPost"("courseId");

-- CreateIndex
CREATE INDEX "SocialPost_status_visibility_createdAt_idx" ON "social_schema"."SocialPost"("status", "visibility", "createdAt");

-- CreateIndex
CREATE INDEX "SocialPost_postType_academicLevel_idx" ON "social_schema"."SocialPost"("postType", "academicLevel");

-- CreateIndex
CREATE INDEX "SocialPost_institutionId_postType_idx" ON "social_schema"."SocialPost"("institutionId", "postType");

-- CreateIndex
CREATE UNIQUE INDEX "SocialPostLike_postId_userId_key" ON "social_schema"."SocialPostLike"("postId", "userId");

-- CreateIndex
CREATE INDEX "SocialPostComment_postId_createdAt_idx" ON "social_schema"."SocialPostComment"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "SocialPostComment_userId_idx" ON "social_schema"."SocialPostComment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialPostShare_postId_userId_key" ON "social_schema"."SocialPostShare"("postId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialPostBookmark_postId_userId_key" ON "social_schema"."SocialPostBookmark"("postId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "social_schema"."Follow"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_requesterId_receiverId_key" ON "social_schema"."Friend"("requesterId", "receiverId");

-- CreateIndex
CREATE INDEX "Story_authorId_expiresAt_idx" ON "social_schema"."Story"("authorId", "expiresAt");

-- CreateIndex
CREATE INDEX "Story_createdAt_idx" ON "social_schema"."Story"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "StoryView_storyId_userId_key" ON "social_schema"."StoryView"("storyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "StoryReaction_storyId_userId_key" ON "social_schema"."StoryReaction"("storyId", "userId");

-- CreateIndex
CREATE INDEX "StoryReply_storyId_createdAt_idx" ON "social_schema"."StoryReply"("storyId", "createdAt");

-- CreateIndex
CREATE INDEX "OnlineCourse_category_isPublished_idx" ON "courses_schema"."OnlineCourse"("category", "isPublished");

-- CreateIndex
CREATE INDEX "OnlineCourse_instructorId_idx" ON "courses_schema"."OnlineCourse"("instructorId");

-- CreateIndex
CREATE INDEX "OnlineCourse_level_category_idx" ON "courses_schema"."OnlineCourse"("level", "category");

-- CreateIndex
CREATE INDEX "OnlineCourse_createdAt_isPublished_idx" ON "courses_schema"."OnlineCourse"("createdAt", "isPublished");

-- CreateIndex
CREATE INDEX "CourseEnrollment_courseId_status_enrollmentDate_idx" ON "courses_schema"."CourseEnrollment"("courseId", "status", "enrollmentDate");

-- CreateIndex
CREATE INDEX "CourseEnrollment_studentId_status_idx" ON "courses_schema"."CourseEnrollment"("studentId", "status");

-- CreateIndex
CREATE INDEX "CourseEnrollment_status_lastAccessedAt_idx" ON "courses_schema"."CourseEnrollment"("status", "lastAccessedAt");

-- CreateIndex
CREATE UNIQUE INDEX "CourseEnrollment_courseId_studentId_key" ON "courses_schema"."CourseEnrollment"("courseId", "studentId");

-- CreateIndex
CREATE INDEX "CourseLesson_courseId_order_idx" ON "courses_schema"."CourseLesson"("courseId", "order");

-- CreateIndex
CREATE INDEX "CourseLesson_isPublished_isFree_idx" ON "courses_schema"."CourseLesson"("isPublished", "isFree");

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_lessonId_studentId_key" ON "courses_schema"."LessonProgress"("lessonId", "studentId");

-- CreateIndex
CREATE INDEX "CourseQuiz_courseId_isRequired_idx" ON "courses_schema"."CourseQuiz"("courseId", "isRequired");

-- CreateIndex
CREATE INDEX "CourseQuiz_lessonId_isRequired_idx" ON "courses_schema"."CourseQuiz"("lessonId", "isRequired");

-- CreateIndex
CREATE INDEX "CourseQuiz_createdBy_courseId_idx" ON "courses_schema"."CourseQuiz"("createdBy", "courseId");

-- CreateIndex
CREATE INDEX "CourseQuiz_deletedAt_courseId_idx" ON "courses_schema"."CourseQuiz"("deletedAt", "courseId");

-- CreateIndex
CREATE INDEX "CourseQuiz_passingScore_courseId_idx" ON "courses_schema"."CourseQuiz"("passingScore", "courseId");

-- CreateIndex
CREATE INDEX "QuizAttempt_quizId_passed_idx" ON "courses_schema"."QuizAttempt"("quizId", "passed");

-- CreateIndex
CREATE INDEX "QuizAttempt_studentId_score_idx" ON "courses_schema"."QuizAttempt"("studentId", "score");

-- CreateIndex
CREATE INDEX "QuizAttempt_enrollmentId_passed_idx" ON "courses_schema"."QuizAttempt"("enrollmentId", "passed");

-- CreateIndex
CREATE INDEX "QuizAttempt_submittedAt_passed_idx" ON "courses_schema"."QuizAttempt"("submittedAt", "passed");

-- CreateIndex
CREATE INDEX "QuizAttempt_score_passed_idx" ON "courses_schema"."QuizAttempt"("score", "passed");

-- CreateIndex
CREATE UNIQUE INDEX "QuizAttempt_quizId_studentId_attemptNumber_key" ON "courses_schema"."QuizAttempt"("quizId", "studentId", "attemptNumber");

-- CreateIndex
CREATE INDEX "CourseAssignment_courseId_dueDate_idx" ON "courses_schema"."CourseAssignment"("courseId", "dueDate");

-- CreateIndex
CREATE INDEX "CourseAssignment_assignmentType_courseId_idx" ON "courses_schema"."CourseAssignment"("assignmentType", "courseId");

-- CreateIndex
CREATE INDEX "CourseAssignment_createdBy_courseId_idx" ON "courses_schema"."CourseAssignment"("createdBy", "courseId");

-- CreateIndex
CREATE INDEX "CourseAssignment_deletedAt_courseId_idx" ON "courses_schema"."CourseAssignment"("deletedAt", "courseId");

-- CreateIndex
CREATE INDEX "CourseAssignment_isGroupWork_courseId_idx" ON "courses_schema"."CourseAssignment"("isGroupWork", "courseId");

-- CreateIndex
CREATE INDEX "AssignmentSubmission_assignmentId_status_idx" ON "courses_schema"."AssignmentSubmission"("assignmentId", "status");

-- CreateIndex
CREATE INDEX "AssignmentSubmission_studentId_status_idx" ON "courses_schema"."AssignmentSubmission"("studentId", "status");

-- CreateIndex
CREATE INDEX "AssignmentSubmission_enrollmentId_status_idx" ON "courses_schema"."AssignmentSubmission"("enrollmentId", "status");

-- CreateIndex
CREATE INDEX "AssignmentSubmission_submittedAt_status_idx" ON "courses_schema"."AssignmentSubmission"("submittedAt", "status");

-- CreateIndex
CREATE INDEX "AssignmentSubmission_gradedAt_status_idx" ON "courses_schema"."AssignmentSubmission"("gradedAt", "status");

-- CreateIndex
CREATE INDEX "AssignmentSubmission_gradedBy_status_idx" ON "courses_schema"."AssignmentSubmission"("gradedBy", "status");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentSubmission_assignmentId_studentId_key" ON "courses_schema"."AssignmentSubmission"("assignmentId", "studentId");

-- CreateIndex
CREATE INDEX "CourseDiscussion_courseId_category_idx" ON "courses_schema"."CourseDiscussion"("courseId", "category");

-- CreateIndex
CREATE INDEX "CourseDiscussion_createdAt_isPinned_idx" ON "courses_schema"."CourseDiscussion"("createdAt", "isPinned");

-- CreateIndex
CREATE INDEX "CourseDiscussion_authorId_courseId_idx" ON "courses_schema"."CourseDiscussion"("authorId", "courseId");

-- CreateIndex
CREATE INDEX "CourseDiscussion_isLocked_isPinned_idx" ON "courses_schema"."CourseDiscussion"("isLocked", "isPinned");

-- CreateIndex
CREATE INDEX "CourseDiscussion_deletedAt_courseId_idx" ON "courses_schema"."CourseDiscussion"("deletedAt", "courseId");

-- CreateIndex
CREATE INDEX "DiscussionReply_discussionId_createdAt_idx" ON "courses_schema"."DiscussionReply"("discussionId", "createdAt");

-- CreateIndex
CREATE INDEX "DiscussionReply_authorId_discussionId_idx" ON "courses_schema"."DiscussionReply"("authorId", "discussionId");

-- CreateIndex
CREATE INDEX "DiscussionReply_parentId_createdAt_idx" ON "courses_schema"."DiscussionReply"("parentId", "createdAt");

-- CreateIndex
CREATE INDEX "DiscussionReply_deletedAt_discussionId_idx" ON "courses_schema"."DiscussionReply"("deletedAt", "discussionId");

-- CreateIndex
CREATE INDEX "CourseReview_courseId_rating_idx" ON "courses_schema"."CourseReview"("courseId", "rating");

-- CreateIndex
CREATE INDEX "CourseReview_verified_rating_idx" ON "courses_schema"."CourseReview"("verified", "rating");

-- CreateIndex
CREATE INDEX "CourseReview_studentId_rating_idx" ON "courses_schema"."CourseReview"("studentId", "rating");

-- CreateIndex
CREATE INDEX "CourseReview_deletedAt_courseId_idx" ON "courses_schema"."CourseReview"("deletedAt", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseReview_courseId_studentId_key" ON "courses_schema"."CourseReview"("courseId", "studentId");

-- CreateIndex
CREATE INDEX "CourseMaterial_courseId_materialType_idx" ON "courses_schema"."CourseMaterial"("courseId", "materialType");

-- CreateIndex
CREATE INDEX "CourseMaterial_isPublic_materialType_idx" ON "courses_schema"."CourseMaterial"("isPublic", "materialType");

-- CreateIndex
CREATE INDEX "CourseMaterial_createdBy_courseId_idx" ON "courses_schema"."CourseMaterial"("createdBy", "courseId");

-- CreateIndex
CREATE INDEX "CourseMaterial_deletedAt_courseId_idx" ON "courses_schema"."CourseMaterial"("deletedAt", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCertificate_certificateNumber_key" ON "courses_schema"."CourseCertificate"("certificateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCertificate_verificationCode_key" ON "courses_schema"."CourseCertificate"("verificationCode");

-- CreateIndex
CREATE INDEX "CourseCertificate_studentId_isVerified_idx" ON "courses_schema"."CourseCertificate"("studentId", "isVerified");

-- CreateIndex
CREATE INDEX "CourseCertificate_certificateNumber_idx" ON "courses_schema"."CourseCertificate"("certificateNumber");

-- CreateIndex
CREATE INDEX "CourseCertificate_verificationCode_idx" ON "courses_schema"."CourseCertificate"("verificationCode");

-- CreateIndex
CREATE INDEX "CourseCertificate_revokedAt_isVerified_idx" ON "courses_schema"."CourseCertificate"("revokedAt", "isVerified");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCertificate_courseId_studentId_key" ON "courses_schema"."CourseCertificate"("courseId", "studentId");

-- CreateIndex
CREATE INDEX "CourseAnalytics_date_courseId_idx" ON "courses_schema"."CourseAnalytics"("date", "courseId");

-- CreateIndex
CREATE INDEX "CourseAnalytics_enrollments_date_idx" ON "courses_schema"."CourseAnalytics"("enrollments", "date");

-- CreateIndex
CREATE INDEX "CourseAnalytics_averageRating_date_idx" ON "courses_schema"."CourseAnalytics"("averageRating", "date");

-- CreateIndex
CREATE UNIQUE INDEX "CourseAnalytics_courseId_date_key" ON "courses_schema"."CourseAnalytics"("courseId", "date");

-- CreateIndex
CREATE INDEX "JobPost_jobCategory_status_idx" ON "jobs_schema"."JobPost"("jobCategory", "status");

-- CreateIndex
CREATE INDEX "JobPost_institutionId_status_idx" ON "jobs_schema"."JobPost"("institutionId", "status");

-- CreateIndex
CREATE INDEX "JobPost_institutionId_jobCategory_status_idx" ON "jobs_schema"."JobPost"("institutionId", "jobCategory", "status");

-- CreateIndex
CREATE INDEX "JobPost_location_jobType_idx" ON "jobs_schema"."JobPost"("location", "jobType");

-- CreateIndex
CREATE INDEX "JobPost_createdAt_idx" ON "jobs_schema"."JobPost"("createdAt");

-- CreateIndex
CREATE INDEX "JobPost_featured_urgent_idx" ON "jobs_schema"."JobPost"("featured", "urgent");

-- CreateIndex
CREATE INDEX "JobPost_status_visibility_createdAt_idx" ON "jobs_schema"."JobPost"("status", "visibility", "createdAt");

-- CreateIndex
CREATE INDEX "JobPost_authorId_status_idx" ON "jobs_schema"."JobPost"("authorId", "status");

-- CreateIndex
CREATE INDEX "JobPost_applicationDeadline_status_idx" ON "jobs_schema"."JobPost"("applicationDeadline", "status");

-- CreateIndex
CREATE UNIQUE INDEX "JobPostLike_postId_userId_key" ON "jobs_schema"."JobPostLike"("postId", "userId");

-- CreateIndex
CREATE INDEX "JobPostComment_postId_createdAt_idx" ON "jobs_schema"."JobPostComment"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "JobPostComment_userId_postId_idx" ON "jobs_schema"."JobPostComment"("userId", "postId");

-- CreateIndex
CREATE INDEX "JobPostComment_parentId_createdAt_idx" ON "jobs_schema"."JobPostComment"("parentId", "createdAt");

-- CreateIndex
CREATE INDEX "JobPostComment_deletedAt_postId_idx" ON "jobs_schema"."JobPostComment"("deletedAt", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "JobPostShare_postId_userId_key" ON "jobs_schema"."JobPostShare"("postId", "userId");

-- CreateIndex
CREATE INDEX "JobApplication_status_appliedAt_idx" ON "jobs_schema"."JobApplication"("status", "appliedAt");

-- CreateIndex
CREATE INDEX "JobApplication_applicantId_status_idx" ON "jobs_schema"."JobApplication"("applicantId", "status");

-- CreateIndex
CREATE INDEX "JobApplication_reviewedBy_status_idx" ON "jobs_schema"."JobApplication"("reviewedBy", "status");

-- CreateIndex
CREATE INDEX "JobApplication_rating_status_idx" ON "jobs_schema"."JobApplication"("rating", "status");

-- CreateIndex
CREATE INDEX "JobApplication_withdrawnAt_appliedAt_idx" ON "jobs_schema"."JobApplication"("withdrawnAt", "appliedAt");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_jobPostId_applicantId_key" ON "jobs_schema"."JobApplication"("jobPostId", "applicantId");

-- CreateIndex
CREATE INDEX "SalaryRange_location_jobType_idx" ON "jobs_schema"."SalaryRange"("location", "jobType");

-- CreateIndex
CREATE INDEX "SalaryRange_minSalary_maxSalary_idx" ON "jobs_schema"."SalaryRange"("minSalary", "maxSalary");

-- CreateIndex
CREATE INDEX "SalaryRange_currency_location_idx" ON "jobs_schema"."SalaryRange"("currency", "location");

-- CreateIndex
CREATE INDEX "FreelancePost_freelanceCategory_status_idx" ON "freelancing_schema"."FreelancePost"("freelanceCategory", "status");

-- CreateIndex
CREATE INDEX "FreelancePost_institutionId_status_idx" ON "freelancing_schema"."FreelancePost"("institutionId", "status");

-- CreateIndex
CREATE INDEX "FreelancePost_institutionId_freelanceCategory_status_idx" ON "freelancing_schema"."FreelancePost"("institutionId", "freelanceCategory", "status");

-- CreateIndex
CREATE INDEX "FreelancePost_budgetMin_budgetMax_idx" ON "freelancing_schema"."FreelancePost"("budgetMin", "budgetMax");

-- CreateIndex
CREATE INDEX "FreelancePost_complexity_duration_idx" ON "freelancing_schema"."FreelancePost"("complexity", "duration");

-- CreateIndex
CREATE INDEX "FreelancePost_createdAt_idx" ON "freelancing_schema"."FreelancePost"("createdAt");

-- CreateIndex
CREATE INDEX "FreelancePost_featured_urgent_idx" ON "freelancing_schema"."FreelancePost"("featured", "urgent");

-- CreateIndex
CREATE INDEX "FreelancePost_authorId_status_idx" ON "freelancing_schema"."FreelancePost"("authorId", "status");

-- CreateIndex
CREATE INDEX "FreelancePost_location_freelanceCategory_idx" ON "freelancing_schema"."FreelancePost"("location", "freelanceCategory");

-- CreateIndex
CREATE INDEX "FreelancePost_deletedAt_status_idx" ON "freelancing_schema"."FreelancePost"("deletedAt", "status");

-- CreateIndex
CREATE INDEX "FreelancePostLike_userId_createdAt_idx" ON "freelancing_schema"."FreelancePostLike"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "FreelancePostLike_reaction_postId_idx" ON "freelancing_schema"."FreelancePostLike"("reaction", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "FreelancePostLike_postId_userId_key" ON "freelancing_schema"."FreelancePostLike"("postId", "userId");

-- CreateIndex
CREATE INDEX "FreelancePostComment_postId_createdAt_idx" ON "freelancing_schema"."FreelancePostComment"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "FreelancePostComment_userId_postId_idx" ON "freelancing_schema"."FreelancePostComment"("userId", "postId");

-- CreateIndex
CREATE INDEX "FreelancePostComment_parentId_createdAt_idx" ON "freelancing_schema"."FreelancePostComment"("parentId", "createdAt");

-- CreateIndex
CREATE INDEX "FreelancePostComment_deletedAt_postId_idx" ON "freelancing_schema"."FreelancePostComment"("deletedAt", "postId");

-- CreateIndex
CREATE INDEX "FreelancePostShare_userId_createdAt_idx" ON "freelancing_schema"."FreelancePostShare"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "FreelancePostShare_platform_createdAt_idx" ON "freelancing_schema"."FreelancePostShare"("platform", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FreelancePostShare_postId_userId_key" ON "freelancing_schema"."FreelancePostShare"("postId", "userId");

-- CreateIndex
CREATE INDEX "Proposal_status_submittedAt_idx" ON "freelancing_schema"."Proposal"("status", "submittedAt");

-- CreateIndex
CREATE INDEX "Proposal_freelancerId_status_idx" ON "freelancing_schema"."Proposal"("freelancerId", "status");

-- CreateIndex
CREATE INDEX "Proposal_clientRating_status_idx" ON "freelancing_schema"."Proposal"("clientRating", "status");

-- CreateIndex
CREATE INDEX "Proposal_withdrawnAt_submittedAt_idx" ON "freelancing_schema"."Proposal"("withdrawnAt", "submittedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_freelancePostId_freelancerId_key" ON "freelancing_schema"."Proposal"("freelancePostId", "freelancerId");

-- CreateIndex
CREATE INDEX "FreelanceReview_freelancerId_rating_idx" ON "freelancing_schema"."FreelanceReview"("freelancerId", "rating");

-- CreateIndex
CREATE INDEX "FreelanceReview_clientId_rating_idx" ON "freelancing_schema"."FreelanceReview"("clientId", "rating");

-- CreateIndex
CREATE INDEX "FreelanceReview_verified_isPublic_idx" ON "freelancing_schema"."FreelanceReview"("verified", "isPublic");

-- CreateIndex
CREATE INDEX "FreelanceReview_deletedAt_freelancerId_idx" ON "freelancing_schema"."FreelanceReview"("deletedAt", "freelancerId");

-- CreateIndex
CREATE INDEX "UniversalRating_rateeId_rateeType_status_idx" ON "rating_schema"."UniversalRating"("rateeId", "rateeType", "status");

-- CreateIndex
CREATE INDEX "UniversalRating_raterId_context_idx" ON "rating_schema"."UniversalRating"("raterId", "context");

-- CreateIndex
CREATE INDEX "UniversalRating_context_overallRating_idx" ON "rating_schema"."UniversalRating"("context", "overallRating");

-- CreateIndex
CREATE INDEX "UniversalRating_visibility_status_idx" ON "rating_schema"."UniversalRating"("visibility", "status");

-- CreateIndex
CREATE INDEX "UniversalRating_verifiedAt_isVerified_idx" ON "rating_schema"."UniversalRating"("verifiedAt", "isVerified");

-- CreateIndex
CREATE INDEX "UniversalRating_createdAt_overallRating_idx" ON "rating_schema"."UniversalRating"("createdAt", "overallRating");

-- CreateIndex
CREATE UNIQUE INDEX "UniversalRating_raterId_rateeId_context_relationshipId_key" ON "rating_schema"."UniversalRating"("raterId", "rateeId", "context", "relationshipId");

-- CreateIndex
CREATE INDEX "RatingCategoryScore_category_score_idx" ON "rating_schema"."RatingCategoryScore"("category", "score");

-- CreateIndex
CREATE UNIQUE INDEX "RatingCategoryScore_ratingId_category_key" ON "rating_schema"."RatingCategoryScore"("ratingId", "category");

-- CreateIndex
CREATE INDEX "RatingRelationship_userId1_relationshipType_idx" ON "rating_schema"."RatingRelationship"("userId1", "relationshipType");

-- CreateIndex
CREATE INDEX "RatingRelationship_userId2_relationshipType_idx" ON "rating_schema"."RatingRelationship"("userId2", "relationshipType");

-- CreateIndex
CREATE INDEX "RatingRelationship_context_isVerified_idx" ON "rating_schema"."RatingRelationship"("context", "isVerified");

-- CreateIndex
CREATE INDEX "RatingRelationship_endDate_canRate1to2_idx" ON "rating_schema"."RatingRelationship"("endDate", "canRate1to2");

-- CreateIndex
CREATE UNIQUE INDEX "RatingRelationship_userId1_userId2_context_entityId_key" ON "rating_schema"."RatingRelationship"("userId1", "userId2", "context", "entityId");

-- CreateIndex
CREATE INDEX "NewsPost_authorId_status_idx" ON "news_schema"."NewsPost"("authorId", "status");

-- CreateIndex
CREATE INDEX "NewsPost_institutionId_status_idx" ON "news_schema"."NewsPost"("institutionId", "status");

-- CreateIndex
CREATE INDEX "NewsPost_institutionId_newsType_category_idx" ON "news_schema"."NewsPost"("institutionId", "newsType", "category");

-- CreateIndex
CREATE INDEX "NewsPost_createdAt_featured_idx" ON "news_schema"."NewsPost"("createdAt", "featured");

-- CreateIndex
CREATE INDEX "NewsPost_newsType_category_idx" ON "news_schema"."NewsPost"("newsType", "category");

-- CreateIndex
CREATE INDEX "NewsPost_status_visibility_createdAt_idx" ON "news_schema"."NewsPost"("status", "visibility", "createdAt");

-- CreateIndex
CREATE INDEX "NewsPost_breaking_priority_idx" ON "news_schema"."NewsPost"("breaking", "priority");

-- CreateIndex
CREATE INDEX "NewsPost_approved_flagged_idx" ON "news_schema"."NewsPost"("approved", "flagged");

-- CreateIndex
CREATE INDEX "NewsPostLike_userId_createdAt_idx" ON "news_schema"."NewsPostLike"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "NewsPostLike_reaction_postId_idx" ON "news_schema"."NewsPostLike"("reaction", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsPostLike_postId_userId_key" ON "news_schema"."NewsPostLike"("postId", "userId");

-- CreateIndex
CREATE INDEX "NewsPostComment_postId_createdAt_idx" ON "news_schema"."NewsPostComment"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "NewsPostComment_userId_idx" ON "news_schema"."NewsPostComment"("userId");

-- CreateIndex
CREATE INDEX "NewsPostComment_approved_flagged_idx" ON "news_schema"."NewsPostComment"("approved", "flagged");

-- CreateIndex
CREATE UNIQUE INDEX "NewsPostShare_postId_userId_key" ON "news_schema"."NewsPostShare"("postId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsAnalytics_postId_key" ON "news_schema"."NewsAnalytics"("postId");

-- CreateIndex
CREATE INDEX "NewsAnalytics_calculatedAt_idx" ON "news_schema"."NewsAnalytics"("calculatedAt");

-- CreateIndex
CREATE INDEX "NewsAnalytics_totalViews_calculatedAt_idx" ON "news_schema"."NewsAnalytics"("totalViews", "calculatedAt");

-- CreateIndex
CREATE INDEX "NewsAnalytics_engagementRate_calculatedAt_idx" ON "news_schema"."NewsAnalytics"("engagementRate", "calculatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "NewsAnalytics_postId_calculatedAt_key" ON "news_schema"."NewsAnalytics"("postId", "calculatedAt");

-- CreateIndex
CREATE INDEX "ChatGroup_creatorId_createdAt_idx" ON "community_schema"."ChatGroup"("creatorId", "createdAt");

-- CreateIndex
CREATE INDEX "ChatGroup_institutionId_isActive_idx" ON "community_schema"."ChatGroup"("institutionId", "isActive");

-- CreateIndex
CREATE INDEX "ChatGroup_institutionId_groupType_isActive_idx" ON "community_schema"."ChatGroup"("institutionId", "groupType", "isActive");

-- CreateIndex
CREATE INDEX "ChatGroup_groupType_isActive_idx" ON "community_schema"."ChatGroup"("groupType", "isActive");

-- CreateIndex
CREATE INDEX "ChatGroup_interests_isPrivate_idx" ON "community_schema"."ChatGroup"("interests", "isPrivate");

-- CreateIndex
CREATE INDEX "ChatGroup_lastActivity_isTemporary_idx" ON "community_schema"."ChatGroup"("lastActivity", "isTemporary");

-- CreateIndex
CREATE INDEX "ChatGroupMember_userId_isOnline_idx" ON "community_schema"."ChatGroupMember"("userId", "isOnline");

-- CreateIndex
CREATE INDEX "ChatGroupMember_lastSeen_isActive_idx" ON "community_schema"."ChatGroupMember"("lastSeen", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ChatGroupMember_groupId_userId_key" ON "community_schema"."ChatGroupMember"("groupId", "userId");

-- CreateIndex
CREATE INDEX "ChatMessage_groupId_createdAt_idx" ON "community_schema"."ChatMessage"("groupId", "createdAt");

-- CreateIndex
CREATE INDEX "ChatMessage_senderId_createdAt_idx" ON "community_schema"."ChatMessage"("senderId", "createdAt");

-- CreateIndex
CREATE INDEX "ChatMessage_messageType_idx" ON "community_schema"."ChatMessage"("messageType");

-- CreateIndex
CREATE INDEX "VoiceCall_groupId_isActive_idx" ON "community_schema"."VoiceCall"("groupId", "isActive");

-- CreateIndex
CREATE INDEX "VoiceCall_startedAt_callType_idx" ON "community_schema"."VoiceCall"("startedAt", "callType");

-- CreateIndex
CREATE INDEX "VoiceCallParticipant_userId_joinedAt_idx" ON "community_schema"."VoiceCallParticipant"("userId", "joinedAt");

-- CreateIndex
CREATE UNIQUE INDEX "VoiceCallParticipant_callId_userId_key" ON "community_schema"."VoiceCallParticipant"("callId", "userId");

-- CreateIndex
CREATE INDEX "UserInterest_interest_category_idx" ON "community_schema"."UserInterest"("interest", "category");

-- CreateIndex
CREATE INDEX "UserInterest_level_wantsToLearn_idx" ON "community_schema"."UserInterest"("level", "wantsToLearn");

-- CreateIndex
CREATE UNIQUE INDEX "UserInterest_userId_interest_key" ON "community_schema"."UserInterest"("userId", "interest");

-- CreateIndex
CREATE INDEX "UserMatch_status_matchScore_idx" ON "community_schema"."UserMatch"("status", "matchScore");

-- CreateIndex
CREATE INDEX "UserMatch_matchType_createdAt_idx" ON "community_schema"."UserMatch"("matchType", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserMatch_user1Id_user2Id_key" ON "community_schema"."UserMatch"("user1Id", "user2Id");

-- CreateIndex
CREATE INDEX "Conversation_type_isArchived_idx" ON "messages_schema"."Conversation"("type", "isArchived");

-- CreateIndex
CREATE INDEX "Conversation_lastActivity_isArchived_idx" ON "messages_schema"."Conversation"("lastActivity", "isArchived");

-- CreateIndex
CREATE INDEX "Conversation_createdAt_idx" ON "messages_schema"."Conversation"("createdAt");

-- CreateIndex
CREATE INDEX "ConversationParticipant_userId_isHidden_idx" ON "messages_schema"."ConversationParticipant"("userId", "isHidden");

-- CreateIndex
CREATE INDEX "ConversationParticipant_conversationId_isAdmin_idx" ON "messages_schema"."ConversationParticipant"("conversationId", "isAdmin");

-- CreateIndex
CREATE UNIQUE INDEX "ConversationParticipant_conversationId_userId_key" ON "messages_schema"."ConversationParticipant"("conversationId", "userId");

-- CreateIndex
CREATE INDEX "Message_conversationId_createdAt_idx" ON "messages_schema"."Message"("conversationId", "createdAt");

-- CreateIndex
CREATE INDEX "Message_senderId_createdAt_idx" ON "messages_schema"."Message"("senderId", "createdAt");

-- CreateIndex
CREATE INDEX "Message_status_createdAt_idx" ON "messages_schema"."Message"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Message_isDeleted_createdAt_idx" ON "messages_schema"."Message"("isDeleted", "createdAt");

-- CreateIndex
CREATE INDEX "Message_replyToId_idx" ON "messages_schema"."Message"("replyToId");

-- CreateIndex
CREATE INDEX "Message_threadId_idx" ON "messages_schema"."Message"("threadId");

-- CreateIndex
CREATE INDEX "MessageRead_conversationId_userId_idx" ON "messages_schema"."MessageRead"("conversationId", "userId");

-- CreateIndex
CREATE INDEX "MessageRead_userId_readAt_idx" ON "messages_schema"."MessageRead"("userId", "readAt");

-- CreateIndex
CREATE UNIQUE INDEX "MessageRead_messageId_userId_key" ON "messages_schema"."MessageRead"("messageId", "userId");

-- CreateIndex
CREATE INDEX "MessageReaction_messageId_reaction_idx" ON "messages_schema"."MessageReaction"("messageId", "reaction");

-- CreateIndex
CREATE INDEX "MessageReaction_userId_createdAt_idx" ON "messages_schema"."MessageReaction"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "MessageReaction_messageId_userId_emoji_key" ON "messages_schema"."MessageReaction"("messageId", "userId", "emoji");

-- CreateIndex
CREATE INDEX "TypingIndicator_conversationId_isTyping_idx" ON "messages_schema"."TypingIndicator"("conversationId", "isTyping");

-- CreateIndex
CREATE UNIQUE INDEX "TypingIndicator_conversationId_userId_key" ON "messages_schema"."TypingIndicator"("conversationId", "userId");

-- CreateIndex
CREATE INDEX "MessageDraft_userId_updatedAt_idx" ON "messages_schema"."MessageDraft"("userId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "MessageDraft_conversationId_userId_key" ON "messages_schema"."MessageDraft"("conversationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "MessageAnalytics_messageId_key" ON "messages_schema"."MessageAnalytics"("messageId");

-- CreateIndex
CREATE INDEX "MessageAnalytics_conversationId_engagementScore_idx" ON "messages_schema"."MessageAnalytics"("conversationId", "engagementScore");

-- CreateIndex
CREATE INDEX "BlockedUser_blockerId_idx" ON "messages_schema"."BlockedUser"("blockerId");

-- CreateIndex
CREATE INDEX "BlockedUser_blockedId_idx" ON "messages_schema"."BlockedUser"("blockedId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedUser_blockerId_blockedId_key" ON "messages_schema"."BlockedUser"("blockerId", "blockedId");

-- CreateIndex
CREATE INDEX "Feedback_userId_feedbackType_idx" ON "feedback_schema"."Feedback"("userId", "feedbackType");

-- CreateIndex
CREATE INDEX "Feedback_status_priority_idx" ON "feedback_schema"."Feedback"("status", "priority");

-- CreateIndex
CREATE INDEX "Feedback_category_createdAt_idx" ON "feedback_schema"."Feedback"("category", "createdAt");

-- CreateIndex
CREATE INDEX "Feedback_assignedTo_status_idx" ON "feedback_schema"."Feedback"("assignedTo", "status");

-- CreateIndex
CREATE INDEX "FeedbackResponse_feedbackId_createdAt_idx" ON "feedback_schema"."FeedbackResponse"("feedbackId", "createdAt");

-- CreateIndex
CREATE INDEX "FeedbackResponse_responderId_isOfficial_idx" ON "feedback_schema"."FeedbackResponse"("responderId", "isOfficial");

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackVote_feedbackId_userId_key" ON "feedback_schema"."FeedbackVote"("feedbackId", "userId");

-- CreateIndex
CREATE INDEX "Review_targetType_targetId_idx" ON "feedback_schema"."Review"("targetType", "targetId");

-- CreateIndex
CREATE INDEX "Review_reviewerId_createdAt_idx" ON "feedback_schema"."Review"("reviewerId", "createdAt");

-- CreateIndex
CREATE INDEX "Review_rating_isVerified_idx" ON "feedback_schema"."Review"("rating", "isVerified");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewVote_reviewId_userId_key" ON "feedback_schema"."ReviewVote"("reviewId", "userId");

-- CreateIndex
CREATE INDEX "ReviewReport_reviewId_status_idx" ON "feedback_schema"."ReviewReport"("reviewId", "status");

-- CreateIndex
CREATE INDEX "ReviewReport_reporterId_idx" ON "feedback_schema"."ReviewReport"("reporterId");

-- CreateIndex
CREATE INDEX "Survey_creatorId_isActive_idx" ON "feedback_schema"."Survey"("creatorId", "isActive");

-- CreateIndex
CREATE INDEX "Survey_surveyType_startDate_idx" ON "feedback_schema"."Survey"("surveyType", "startDate");

-- CreateIndex
CREATE INDEX "SurveyResponse_surveyId_isComplete_idx" ON "feedback_schema"."SurveyResponse"("surveyId", "isComplete");

-- CreateIndex
CREATE INDEX "SurveyResponse_responderId_idx" ON "feedback_schema"."SurveyResponse"("responderId");

-- CreateIndex
CREATE INDEX "Statistics_institutionId_date_idx" ON "statistics_schema"."Statistics"("institutionId", "date");

-- CreateIndex
CREATE INDEX "Statistics_departmentId_date_idx" ON "statistics_schema"."Statistics"("departmentId", "date");

-- CreateIndex
CREATE INDEX "Statistics_courseId_date_idx" ON "statistics_schema"."Statistics"("courseId", "date");

-- CreateIndex
CREATE INDEX "Statistics_userId_date_idx" ON "statistics_schema"."Statistics"("userId", "date");

-- CreateIndex
CREATE INDEX "Institution_name_idx" ON "edu_matrix_hub_schema"."Institution"("name");

-- CreateIndex
CREATE INDEX "Institution_type_status_idx" ON "edu_matrix_hub_schema"."Institution"("type", "status");

-- CreateIndex
CREATE INDEX "Institution_city_country_idx" ON "edu_matrix_hub_schema"."Institution"("city", "country");

-- CreateIndex
CREATE INDEX "Institution_status_createdAt_idx" ON "edu_matrix_hub_schema"."Institution"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Institution_createdBy_status_idx" ON "edu_matrix_hub_schema"."Institution"("createdBy", "status");

-- CreateIndex
CREATE INDEX "Department_institutionId_name_idx" ON "edu_matrix_hub_schema"."Department"("institutionId", "name");

-- CreateIndex
CREATE INDEX "Department_status_institutionId_idx" ON "edu_matrix_hub_schema"."Department"("status", "institutionId");

-- CreateIndex
CREATE INDEX "Department_headId_status_idx" ON "edu_matrix_hub_schema"."Department"("headId", "status");

-- CreateIndex
CREATE INDEX "Department_createdAt_status_idx" ON "edu_matrix_hub_schema"."Department"("createdAt", "status");

-- CreateIndex
CREATE INDEX "Department_deletedAt_institutionId_idx" ON "edu_matrix_hub_schema"."Department"("deletedAt", "institutionId");

-- CreateIndex
CREATE INDEX "Notification_userId_status_idx" ON "notifications_schema"."Notification"("userId", "status");

-- CreateIndex
CREATE INDEX "Notification_institutionId_status_idx" ON "notifications_schema"."Notification"("institutionId", "status");

-- CreateIndex
CREATE INDEX "Notification_institutionId_type_category_idx" ON "notifications_schema"."Notification"("institutionId", "type", "category");

-- CreateIndex
CREATE INDEX "Notification_type_category_idx" ON "notifications_schema"."Notification"("type", "category");

-- CreateIndex
CREATE INDEX "Notification_createdAt_priority_idx" ON "notifications_schema"."Notification"("createdAt", "priority");

-- CreateIndex
CREATE INDEX "Notification_groupId_batchId_idx" ON "notifications_schema"."Notification"("groupId", "batchId");

-- CreateIndex
CREATE INDEX "Notification_scheduledFor_status_idx" ON "notifications_schema"."Notification"("scheduledFor", "status");

-- CreateIndex
CREATE INDEX "NotificationDelivery_notificationId_idx" ON "notifications_schema"."NotificationDelivery"("notificationId");

-- CreateIndex
CREATE INDEX "NotificationDelivery_status_sentAt_idx" ON "notifications_schema"."NotificationDelivery"("status", "sentAt");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreference_userId_key" ON "notifications_schema"."NotificationPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationTemplate_templateKey_key" ON "notifications_schema"."NotificationTemplate"("templateKey");

-- CreateIndex
CREATE INDEX "NotificationTemplate_templateKey_isActive_idx" ON "notifications_schema"."NotificationTemplate"("templateKey", "isActive");

-- CreateIndex
CREATE INDEX "NotificationTemplate_type_category_idx" ON "notifications_schema"."NotificationTemplate"("type", "category");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationGroup_groupKey_key" ON "notifications_schema"."NotificationGroup"("groupKey");

-- CreateIndex
CREATE INDEX "NotificationGroup_groupKey_isActive_idx" ON "notifications_schema"."NotificationGroup"("groupKey", "isActive");

-- CreateIndex
CREATE INDEX "NotificationInteraction_notificationId_interactionType_idx" ON "notifications_schema"."NotificationInteraction"("notificationId", "interactionType");

-- CreateIndex
CREATE INDEX "NotificationInteraction_userId_createdAt_idx" ON "notifications_schema"."NotificationInteraction"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationAnalytics_date_key" ON "notifications_schema"."NotificationAnalytics"("date");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionApplication_applicantUserId_institutionId_key" ON "edu_matrix_hub_schema"."InstitutionApplication"("applicantUserId", "institutionId");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionEnrollment_applicationId_key" ON "edu_matrix_hub_schema"."InstitutionEnrollment"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionEnrollment_institutionId_studentId_key" ON "edu_matrix_hub_schema"."InstitutionEnrollment"("institutionId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Program_institutionId_code_key" ON "edu_matrix_hub_schema"."Program"("institutionId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Course_institutionId_code_key" ON "edu_matrix_hub_schema"."Course"("institutionId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "CourseInstructor_courseId_instructorId_key" ON "edu_matrix_hub_schema"."CourseInstructor"("courseId", "instructorId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_userId_key" ON "edu_matrix_hub_schema"."Staff"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_institutionId_employeeId_key" ON "edu_matrix_hub_schema"."Staff"("institutionId", "employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "edu_matrix_hub_schema"."Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_institutionId_studentId_key" ON "edu_matrix_hub_schema"."Student"("institutionId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_courseId_studentId_date_key" ON "edu_matrix_hub_schema"."Attendance"("courseId", "studentId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_studentId_courseId_type_key" ON "edu_matrix_hub_schema"."Grade"("studentId", "courseId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "ExamResult_examinationId_studentId_key" ON "edu_matrix_hub_schema"."ExamResult"("examinationId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "edu_matrix_hub_schema"."ApiKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleIntegration_institutionId_moduleName_key" ON "edu_matrix_hub_schema"."ModuleIntegration"("institutionId", "moduleName");

-- CreateIndex
CREATE UNIQUE INDEX "TenantSchema_institutionId_key" ON "edu_matrix_hub_schema"."TenantSchema"("institutionId");

-- CreateIndex
CREATE UNIQUE INDEX "TenantSchema_schemaName_key" ON "edu_matrix_hub_schema"."TenantSchema"("schemaName");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionalAnalytics_institutionId_date_key" ON "edu_matrix_hub_schema"."InstitutionalAnalytics"("institutionId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DepartmentAnalytics_departmentId_date_key" ON "edu_matrix_hub_schema"."DepartmentAnalytics"("departmentId", "date");

-- AddForeignKey
ALTER TABLE "auth_schema"."InstitutionMember" ADD CONSTRAINT "InstitutionMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_schema"."DepartmentMember" ADD CONSTRAINT "DepartmentMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_schema"."ClassMember" ADD CONSTRAINT "ClassMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_schema"."TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "auth_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_schema"."StudentEnrollment" ADD CONSTRAINT "StudentEnrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "auth_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_schema"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_schema"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_schema"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_schema"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_schema"."PasswordReset" ADD CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_schema"."EmailVerification" ADD CONSTRAINT "EmailVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_schema"."AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_schema"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_schema"."SocialPostLike" ADD CONSTRAINT "SocialPostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "social_schema"."SocialPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_schema"."SocialPostComment" ADD CONSTRAINT "SocialPostComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "social_schema"."SocialPostComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_schema"."SocialPostComment" ADD CONSTRAINT "SocialPostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "social_schema"."SocialPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_schema"."SocialPostShare" ADD CONSTRAINT "SocialPostShare_postId_fkey" FOREIGN KEY ("postId") REFERENCES "social_schema"."SocialPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_schema"."SocialPostBookmark" ADD CONSTRAINT "SocialPostBookmark_postId_fkey" FOREIGN KEY ("postId") REFERENCES "social_schema"."SocialPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_schema"."StoryView" ADD CONSTRAINT "StoryView_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "social_schema"."Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_schema"."StoryReaction" ADD CONSTRAINT "StoryReaction_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "social_schema"."Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_schema"."StoryReply" ADD CONSTRAINT "StoryReply_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "social_schema"."Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses_schema"."OnlineCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."CourseLesson" ADD CONSTRAINT "CourseLesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses_schema"."OnlineCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "courses_schema"."CourseLesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."CourseQuiz" ADD CONSTRAINT "CourseQuiz_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses_schema"."OnlineCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."QuizAttempt" ADD CONSTRAINT "QuizAttempt_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "courses_schema"."CourseEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."QuizAttempt" ADD CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "courses_schema"."CourseQuiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."CourseAssignment" ADD CONSTRAINT "CourseAssignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses_schema"."OnlineCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "courses_schema"."CourseAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "courses_schema"."CourseEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."CourseDiscussion" ADD CONSTRAINT "CourseDiscussion_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses_schema"."OnlineCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."DiscussionReply" ADD CONSTRAINT "DiscussionReply_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "courses_schema"."CourseDiscussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."DiscussionReply" ADD CONSTRAINT "DiscussionReply_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "courses_schema"."DiscussionReply"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."CourseReview" ADD CONSTRAINT "CourseReview_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses_schema"."OnlineCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."CourseMaterial" ADD CONSTRAINT "CourseMaterial_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses_schema"."OnlineCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."CourseCertificate" ADD CONSTRAINT "CourseCertificate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses_schema"."OnlineCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_schema"."CourseAnalytics" ADD CONSTRAINT "CourseAnalytics_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses_schema"."OnlineCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs_schema"."JobPostLike" ADD CONSTRAINT "JobPostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "jobs_schema"."JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs_schema"."JobPostComment" ADD CONSTRAINT "JobPostComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "jobs_schema"."JobPostComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs_schema"."JobPostComment" ADD CONSTRAINT "JobPostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "jobs_schema"."JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs_schema"."JobPostShare" ADD CONSTRAINT "JobPostShare_postId_fkey" FOREIGN KEY ("postId") REFERENCES "jobs_schema"."JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs_schema"."JobApplication" ADD CONSTRAINT "JobApplication_jobPostId_fkey" FOREIGN KEY ("jobPostId") REFERENCES "jobs_schema"."JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freelancing_schema"."FreelancePostLike" ADD CONSTRAINT "FreelancePostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "freelancing_schema"."FreelancePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freelancing_schema"."FreelancePostComment" ADD CONSTRAINT "FreelancePostComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "freelancing_schema"."FreelancePostComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freelancing_schema"."FreelancePostComment" ADD CONSTRAINT "FreelancePostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "freelancing_schema"."FreelancePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freelancing_schema"."FreelancePostShare" ADD CONSTRAINT "FreelancePostShare_postId_fkey" FOREIGN KEY ("postId") REFERENCES "freelancing_schema"."FreelancePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freelancing_schema"."Proposal" ADD CONSTRAINT "Proposal_freelancePostId_fkey" FOREIGN KEY ("freelancePostId") REFERENCES "freelancing_schema"."FreelancePost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating_schema"."RatingCategoryScore" ADD CONSTRAINT "RatingCategoryScore_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "rating_schema"."UniversalRating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_schema"."NewsPostLike" ADD CONSTRAINT "NewsPostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "news_schema"."NewsPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_schema"."NewsPostComment" ADD CONSTRAINT "NewsPostComment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "news_schema"."NewsPostComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_schema"."NewsPostComment" ADD CONSTRAINT "NewsPostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "news_schema"."NewsPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_schema"."NewsPostShare" ADD CONSTRAINT "NewsPostShare_postId_fkey" FOREIGN KEY ("postId") REFERENCES "news_schema"."NewsPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_schema"."NewsAnalytics" ADD CONSTRAINT "NewsAnalytics_postId_fkey" FOREIGN KEY ("postId") REFERENCES "news_schema"."NewsPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_schema"."ChatGroupMember" ADD CONSTRAINT "ChatGroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "community_schema"."ChatGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_schema"."ChatMessage" ADD CONSTRAINT "ChatMessage_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "community_schema"."ChatGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_schema"."ChatMessage" ADD CONSTRAINT "ChatMessage_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "community_schema"."ChatMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_schema"."VoiceCall" ADD CONSTRAINT "VoiceCall_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "community_schema"."ChatGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "community_schema"."VoiceCallParticipant" ADD CONSTRAINT "VoiceCallParticipant_callId_fkey" FOREIGN KEY ("callId") REFERENCES "community_schema"."VoiceCall"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_schema"."ConversationParticipant" ADD CONSTRAINT "ConversationParticipant_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "messages_schema"."Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_schema"."Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "messages_schema"."Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_schema"."Message" ADD CONSTRAINT "Message_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "messages_schema"."Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_schema"."MessageRead" ADD CONSTRAINT "MessageRead_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "messages_schema"."Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_schema"."MessageRead" ADD CONSTRAINT "MessageRead_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages_schema"."Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_schema"."MessageReaction" ADD CONSTRAINT "MessageReaction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages_schema"."Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_schema"."TypingIndicator" ADD CONSTRAINT "TypingIndicator_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "messages_schema"."Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_schema"."MessageDraft" ADD CONSTRAINT "MessageDraft_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "messages_schema"."Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_schema"."FeedbackResponse" ADD CONSTRAINT "FeedbackResponse_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "feedback_schema"."Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_schema"."FeedbackVote" ADD CONSTRAINT "FeedbackVote_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "feedback_schema"."Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_schema"."ReviewVote" ADD CONSTRAINT "ReviewVote_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "feedback_schema"."Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_schema"."ReviewReport" ADD CONSTRAINT "ReviewReport_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "feedback_schema"."Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_schema"."SurveyResponse" ADD CONSTRAINT "SurveyResponse_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "feedback_schema"."Survey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Department" ADD CONSTRAINT "Department_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications_schema"."Notification" ADD CONSTRAINT "Notification_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "notifications_schema"."NotificationPreference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications_schema"."NotificationDelivery" ADD CONSTRAINT "NotificationDelivery_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "notifications_schema"."Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications_schema"."NotificationInteraction" ADD CONSTRAINT "NotificationInteraction_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "notifications_schema"."Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."InstitutionApplication" ADD CONSTRAINT "InstitutionApplication_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."InstitutionEnrollment" ADD CONSTRAINT "InstitutionEnrollment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "edu_matrix_hub_schema"."InstitutionApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."InstitutionEnrollment" ADD CONSTRAINT "InstitutionEnrollment_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Program" ADD CONSTRAINT "Program_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."ProgramRequirement" ADD CONSTRAINT "ProgramRequirement_programId_fkey" FOREIGN KEY ("programId") REFERENCES "edu_matrix_hub_schema"."Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Course" ADD CONSTRAINT "Course_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "edu_matrix_hub_schema"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Course" ADD CONSTRAINT "Course_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Course" ADD CONSTRAINT "Course_programId_fkey" FOREIGN KEY ("programId") REFERENCES "edu_matrix_hub_schema"."Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."CourseInstructor" ADD CONSTRAINT "CourseInstructor_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "edu_matrix_hub_schema"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."CourseInstructor" ADD CONSTRAINT "CourseInstructor_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "edu_matrix_hub_schema"."Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Staff" ADD CONSTRAINT "Staff_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "edu_matrix_hub_schema"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Staff" ADD CONSTRAINT "Staff_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Student" ADD CONSTRAINT "Student_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Student" ADD CONSTRAINT "Student_programId_fkey" FOREIGN KEY ("programId") REFERENCES "edu_matrix_hub_schema"."Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Attendance" ADD CONSTRAINT "Attendance_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "edu_matrix_hub_schema"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Attendance" ADD CONSTRAINT "Attendance_programId_fkey" FOREIGN KEY ("programId") REFERENCES "edu_matrix_hub_schema"."Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "edu_matrix_hub_schema"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Grade" ADD CONSTRAINT "Grade_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "edu_matrix_hub_schema"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "edu_matrix_hub_schema"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "edu_matrix_hub_schema"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Examination" ADD CONSTRAINT "Examination_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "edu_matrix_hub_schema"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."ExamResult" ADD CONSTRAINT "ExamResult_examinationId_fkey" FOREIGN KEY ("examinationId") REFERENCES "edu_matrix_hub_schema"."Examination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."ExamResult" ADD CONSTRAINT "ExamResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "edu_matrix_hub_schema"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Schedule" ADD CONSTRAINT "Schedule_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "edu_matrix_hub_schema"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Payment" ADD CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "edu_matrix_hub_schema"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."ScholarshipAward" ADD CONSTRAINT "ScholarshipAward_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "edu_matrix_hub_schema"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."ApiKey" ADD CONSTRAINT "ApiKey_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."Webhook" ADD CONSTRAINT "Webhook_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."ModuleIntegration" ADD CONSTRAINT "ModuleIntegration_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."TenantSchema" ADD CONSTRAINT "TenantSchema_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."SchemaOperation" ADD CONSTRAINT "SchemaOperation_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "edu_matrix_hub_schema"."TenantSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."InstitutionalAnalytics" ADD CONSTRAINT "InstitutionalAnalytics_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "edu_matrix_hub_schema"."Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_matrix_hub_schema"."DepartmentAnalytics" ADD CONSTRAINT "DepartmentAnalytics_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "edu_matrix_hub_schema"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
