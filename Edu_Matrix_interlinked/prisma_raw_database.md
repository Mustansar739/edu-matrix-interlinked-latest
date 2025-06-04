// ==========================================
// EDU MATRIX INTERLINKED - COMPREHENSIVE SCHEMA
// ==========================================
// Realtime Educational Platform with Multi-Tenant Support
// nextAuth 5 for Authentication & Authorization. we use nextAuth 5 officially fuctions and methods 
// Realtime and Social Features 
// Multi-tenant Educational Platform with Institution Management ( Single system for multiple institutions (schools, colleges, universities) )
// Supports: Institution Applications, Role-Based Access, Real-time Dashboards
// Features: Authentication, Authorization, Social Networking, Online Courses, Freelancing, News, Community, Feedback, Notifications, Statistics
// Edu matrix hub is a realtime school, college, university, or educational institution management system

// Features: of complete Edu Matrix interlinked ecosystem unified system with social features and realtime updates with educational institutions management system
// 1. (auth_schema) **Officialy and purely use nextauth 5 .Authentication & Authorization**: Secure user management with roles and permissions.
// 2. (social_schema) **Social Networking**: Facebook-like social features for students and educators and post Facebook-like social features user post jobs as like facebook post  post comments likes and share and story features with realtime reply and comments on storys .
// 10. (edu_matrix_hub_schema) **Edu Matrix Hub**: Central hub for managing all schemas and interlinking data and management of educational institutions.
// 11. (jobs_schema) **Job Board**: Job listings and applications for students and graduates as like facebook postings (gov jobs or priviate jobs).
// 3. (courses_schema) **Online Courses**: Comprehensive course management with lessons, quizzes, and certifications as like coursera.
// 4. (freelancing_schema) **Freelancing**: Marketplace for educational freelancers and post Facebook-like social features user post jobs as like facebook post  post comments likes and share ( remove jobs, hybrid jobs and project based jobs and how new user apply on it) .
// 5. (news_schema) **News & Updates**: Centralized news feed for educational announcements and post Facebook-like social features user post jobs as like facebook post  post comments likes and share .( officials news or non officiels news).
// 6. (community_schema) **Community Engagement**: Forums and discussion boards for student interaction room based voice calls user to user.
// 7. (feedback_schema) **Feedback & Surveys**: Collect feedback from students and parents.
// 8. (notifications_schema) **Notifications**: Real-time notifications for important updates.
// 9. (statistics_schema) **Analytics & Reporting**: Comprehensive analytics for institutions and courses and how many institutions are registered in the edu matrix interlinked total institutions = 0, total students = 0, total teachers = 0, and how each day online in edu matrix interlinked system etc.
// 11. **Realtime Features**: Real-time updates and notifications for all users.
// 12. **Multi-Tenant Support**: Single system for multiple institutions (schools, colleges, universities).
// 13. **Role-Based Access Control**: Fine-grained access control based on user roles and permissions.
// 14. **Realtime Dashboards**: Interactive dashboards for institutions to monitor performance and engagement.

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["multiSchema"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  schemas  = ["auth_schema", "social_schema", "jobs_schema", "freelancing_schema", "news_schema", "courses_schema", "community_schema", "feedback_schema", "notifications_schema", "statistics_schema", "edu_matrix_hub_schema"]
}

// ==========================================
// AUTH SCHEMA ENUMS
// ==========================================

// ==========================================
// AUTH SCHEMA - AUTHENTICATION & AUTHORIZATION
// ==========================================

// ==========================================
// CORE USER MODEL - SINGLE SOURCE OF TRUTH
// ==========================================

model User {
  id            String       @id @default(uuid())
  email         String       @unique
  username      String       @unique
  password      String       @db.Text // Enhanced for hashed passwords
  name          String
  profession    UserProfession @default(OTHER) // User's profession/occupation (for profile & statistics)
  isVerified    Boolean      @default(false)
  lastLogin     DateTime?
  avatar        String?
  bio           String?
  // Core Educational Context (Streamlined)
  institutionId String? // Primary institution affiliation
  departmentId  String? // Primary department within institution
  studentId     String? // Student ID for STUDENT role
  employeeId    String? // Employee ID for staff roles

  // Essential Academic Info
  major        String? // Field of study
  academicYear String? // Current academic year for students

  // Profile & Contact Info
  phoneNumber          String?       @db.VarChar(20) // Limited length for phone
  dateOfBirth          DateTime?
  address              String?       @db.Text // Encrypted PII
  emergencyContact     String?       @db.Text // Encrypted PII
  // Streamlined Access Control (Arrays moved to relationship models)
  permissions          String[] // Dynamic permissions based on role
  dashboardPreferences Json? // Customizable dashboard settings
  accessLevel          AccessLevel   @default(BASIC)
  dataScope            DataScopeType @default(SELF) // What data user can see

  // Essential Permissions (Boolean flags)
  canCreateCourses   Boolean @default(false)
  canManageGrades    Boolean @default(false)
  canViewAnalytics   Boolean @default(false)
  canManageUsers     Boolean @default(false)
  canAccessReports   Boolean @default(false)
  canModerateContent Boolean @default(false)

  // Security & Verification
  emailVerificationToken   String?
  emailVerificationExpires DateTime?
  otpToken                 String?   @db.VarChar(6) // Limited length for OTP
  otpExpires               DateTime?
  otpAttempts              Int       @default(0) @db.SmallInt
  otpLastRequest           DateTime?
  passwordResetToken       String?
  passwordResetExpires     DateTime?
  twoFactorEnabled         Boolean   @default(false) // Two-factor authentication status
  twoFactorSecret          String? // For authenticator app 2FA
  twoFactorBackupCodes     String[] // Backup codes for 2FA recovery
  loginCount               Int       @default(0)
  lastFailedLogin          DateTime?
  failedAttempts           Int       @default(0) @db.SmallInt
  lockedUntil              DateTime?
  lastActivity             DateTime?
  loginAttempts            Int       @default(0) @db.SmallInt
  lastLoginAttempt         DateTime?

  // Audit Fields
  createdBy  String? // Admin who created account
  modifiedBy String? // Last admin who modified
  deletedAt  DateTime? // Soft delete timestamp
  deletedBy  String? // Admin who deleted

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relationships within auth schema
  accounts               Account[]
  sessions               Session[]
  emailVerifications     EmailVerification[]
  passwordResets         PasswordReset[]
  // REMOVED: roleAssignments (no longer using RBAC)
  institutionMemberships InstitutionMember[]  @relation("InstitutionMember")
  departmentMemberships  DepartmentMember[]
  classMemberships       ClassMember[]
  teachingAssignments    TeachingAssignment[]
  studentEnrollments     StudentEnrollment[]
  auditLogs              AuditLog[]
  statistics             Statistics[] // Statistics where this user is referenced

  // Comprehensive Performance Indexes  
  @@index([profession, isVerified]) // For profession-based statistics
  @@index([institutionId, profession]) // For institutional profession analytics
  @@index([departmentId, profession]) // For departmental profession analytics
  @@index([lastLogin, isVerified])
  @@index([email, isVerified])
  @@index([username, profession]) // For user search by profession
  @@index([accessLevel, dataScope])
  @@index([createdAt, profession]) // For profession registration trends
  @@index([updatedAt, isVerified])
  @@index([studentId, institutionId]) // For student lookups
  @@index([employeeId, institutionId]) // For staff lookups
  @@schema("auth_schema")
}

// ==========================================
// ==========================================
// REMOVED: RoleAssignment Model
// ==========================================
// No longer using RBAC - users have professions for profile/statistics only

model InstitutionMember {
  id            String              @id @default(uuid())
  userId        String
  institutionId String
  role          InstitutionRoleType @default(MEMBER)
  permissions   String[] // Institution-specific permissions
  joinedAt      DateTime            @default(now())
  isActive      Boolean             @default(true)
  user          User                @relation("InstitutionMember", fields: [userId], references: [id])
  // Note: Institution model is in hub_schema, referenced by string ID only

  @@unique([userId, institutionId])
  @@index([institutionId, role])
  @@index([userId, isActive])
  @@index([role, isActive])
  @@index([joinedAt, isActive])
  @@schema("auth_schema")
}

model DepartmentMember {
  id           String             @id @default(uuid())
  userId       String
  departmentId String
  role         DepartmentRoleType @default(MEMBER)
  permissions  String[] // Department-specific permissions
  joinedAt     DateTime           @default(now())
  isActive     Boolean            @default(true)
  user         User               @relation(fields: [userId], references: [id])
  department   Department         @relation(fields: [departmentId], references: [id])
  // Note: Department model is in hub_schema, referenced by string ID only

  @@unique([userId, departmentId])
  @@index([departmentId, role])
  @@index([userId, isActive])
  @@index([role, isActive])
  @@index([joinedAt, isActive])
  @@schema("auth_schema")
}

model ClassMember {
  id       String        @id @default(uuid())
  userId   String
  classId  String
  role     ClassRoleType @default(STUDENT)
  joinedAt DateTime      @default(now())
  isActive Boolean       @default(true)
  user     User          @relation(fields: [userId], references: [id])
  // Note: Course model is in courses_schema, referenced by string ID only

  @@unique([userId, classId])
  @@index([classId, role])
  @@index([userId, isActive])
  @@index([role, isActive])
  @@index([joinedAt, isActive])
  @@schema("auth_schema")
}

model TeachingAssignment {
  id        String    @id @default(uuid())
  teacherId String // User ID with TEACHER role
  classId   String // Course/Class ID
  subject   String? // Subject being taught
  startDate DateTime  @default(now())
  endDate   DateTime?
  isActive  Boolean   @default(true)
  teacher   User      @relation(fields: [teacherId], references: [id])
  // Note: Course model is in courses_schema, referenced by string ID only

  @@unique([teacherId, classId])
  @@index([classId, isActive])
  @@index([teacherId, isActive])
  @@index([startDate, isActive])
  @@index([subject, isActive])
  @@schema("auth_schema")
}

model StudentEnrollment {
  id         String                  @id @default(uuid())
  studentId  String // User ID with STUDENT role
  classId    String // Course/Class ID
  enrollDate DateTime                @default(now())
  status     StudentEnrollmentStatus @default(ACTIVE)
  grade      String? // Current grade in class
  student    User                    @relation(fields: [studentId], references: [id])
  // Note: Course model is in courses_schema, referenced by string ID only

  @@unique([studentId, classId])
  @@index([classId, status])
  @@index([studentId, status])
  @@index([enrollDate, status])
  @@index([status, grade])
  @@schema("auth_schema")
}

// ==========================================
// SESSION & SECURITY MODELS
// ==========================================

// ==========================================
// NEXTAUTH V5 REQUIRED MODELS - OFFICIAL SCHEMA
// ==========================================

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@schema("auth_schema")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@schema("auth_schema")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@schema("auth_schema")
}

model PasswordReset {
  id        String    @id @default(uuid())
  userId    String
  token     String    @unique
  expires   DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now())
  user      User      @relation(fields: [userId], references: [id])

  @@index([userId, expires])
  @@index([token, expires])
  @@index([createdAt])
  @@schema("auth_schema")
}

model EmailVerification {
  id        String    @id @default(uuid())
  userId    String
  token     String    @unique
  expires   DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now())
  user      User      @relation(fields: [userId], references: [id])

  @@index([userId, expires])
  @@index([token, expires])
  @@index([createdAt])
  @@schema("auth_schema")
}

model AuthAttempt {
  id        String            @id @default(uuid())
  email     String
  userAgent String?
  status    AuthAttemptStatus
  createdAt DateTime          @default(now())
  userId    String?

  @@index([email, status])
  @@index([createdAt, status])
  @@index([userId, status])
  @@index([status, createdAt])
  @@schema("auth_schema")
}

model AuditLog {
  id            String   @id @default(uuid())
  institutionId String
  userId        String
  action        String
  resourceType  String
  resourceId    String
  metadata      Json?
  ipAddress     String?
  userAgent     String?
  timestamp     DateTime @default(now())
  user          User     @relation(fields: [userId], references: [id])
  // Note: Institution model is in hub_schema, referenced by string ID only

  @@index([institutionId, timestamp])
  @@index([userId, timestamp])
  @@index([action, timestamp])
  @@index([resourceType, resourceId])
  @@index([timestamp])
  @@index([ipAddress, timestamp])
  @@schema("auth_schema")
}

// ==========================================
// AUTH SCHEMA ENUMS
// ==========================================

enum AuthAttemptStatus {
  SUCCESS
  FAILED
  BLOCKED

  @@schema("auth_schema")
}

// ==========================================
// USER PROFESSION TYPES (Profile Only)
// ==========================================
// These are NOT for access control - just profile categories and statistics

enum UserProfession {
  // Medical & Healthcare
  DOCTOR
  NURSE
  PHARMACIST
  DENTIST
  THERAPIST
  MEDICAL_TECHNICIAN
  HEALTHCARE_ADMIN

  // Education
  TEACHER
  PROFESSOR
  PRINCIPAL
  STUDENT
  RESEARCHER
  ACADEMIC_ADMIN
  TUTOR

  // Technology & Engineering
  SOFTWARE_ENGINEER
  DATA_SCIENTIST
  SYSTEM_ADMIN
  WEB_DEVELOPER
  MOBILE_DEVELOPER
  DEVOPS_ENGINEER
  CYBERSECURITY_EXPERT
  NETWORK_ENGINEER

  // Business & Finance
  BUSINESS_ANALYST
  PROJECT_MANAGER
  ACCOUNTANT
  FINANCIAL_ADVISOR
  MARKETING_SPECIALIST
  SALES_REPRESENTATIVE
  HR_SPECIALIST
  ENTREPRENEUR

  // Legal & Government
  LAWYER
  JUDGE
  PARALEGAL
  GOVERNMENT_OFFICER
  POLICY_ANALYST

  // Arts & Media
  GRAPHIC_DESIGNER
  CONTENT_WRITER
  PHOTOGRAPHER
  VIDEO_EDITOR
  ARTIST
  MUSICIAN

  // Trades & Services
  ELECTRICIAN
  PLUMBER
  CARPENTER
  MECHANIC
  CHEF
  FARMER
  CONSTRUCTION_WORKER

  // Other Professions
  CONSULTANT
  FREELANCER
  RETIRED
  UNEMPLOYED
  OTHER

  @@schema("auth_schema")
}

enum AccessLevel {
  BASIC // Standard user access
  PREMIUM // Enhanced features access
  PROFESSIONAL // Professional tools access
  ENTERPRISE // Full enterprise features
  ADMIN // Administrative access
  RESTRICTED // Limited access (temporary suspensions)

  @@schema("auth_schema")
}

enum DataScopeType {
  SELF // Can only see own data (STUDENT, PARENT default)
  CLASS // Can see data for assigned classes (TEACHER)
  DEPARTMENT // Can see department-wide data (DEPARTMENT_HEAD)
  INSTITUTION // Can see institution-wide data (INSTITUTION_ADMIN)
  PLATFORM // Can see all platform data (SUPER_ADMIN, PLATFORM_ADMIN)
  MULTI_INSTITUTION // Can see multiple institutions (SUPER_ADMIN)
  RESTRICTED // Limited access (suspended users)

  @@schema("auth_schema")
}

enum InstitutionRoleType {
  ADMIN // Full institution administration
  MANAGER // Institution management  
  STAFF // Institution staff
  MEMBER // Basic institution member
  GUEST // Limited guest access

  @@schema("auth_schema")
}

enum DepartmentRoleType {
  HEAD // Department head
  COORDINATOR // Department coordinator
  STAFF // Department staff
  MEMBER // Basic department member

  @@schema("auth_schema")
}

enum ClassRoleType {
  TEACHER // Class teacher
  ASSISTANT // Teaching assistant
  STUDENT // Student in class
  OBSERVER // Observer (parent, admin)

  @@schema("auth_schema")
}

enum StudentEnrollmentStatus {
  ACTIVE // Currently enrolled
  SUSPENDED // Temporarily suspended
  WITHDRAWN // Withdrawn from class
  COMPLETED // Successfully completed
  FAILED // Failed the class
  DROPPED // Student dropped out
  PENDING // Enrollment pending approval

  @@schema("auth_schema")
}

// ==========================================
// SOCIAL SCHEMA - FACEBOOK-LIKE SOCIAL PLATFORM
// ==========================================

// Social Schema Enums (Renamed for multi-schema compatibility)
enum SocialPostVisibility {
  PUBLIC // Visible to everyone
  PRIVATE // Only visible to author
  FRIENDS // Visible to friends/connections only
  FOLLOWERS // Visible to followers only
  LISTED // Visible to specific lists/groups

  @@schema("social_schema")
}

enum SocialPostStatus {
  DRAFT // Still being written
  PUBLISHED // Live and visible
  ARCHIVED // Hidden but preserved
  DELETED // Soft deleted
  SCHEDULED // Scheduled for future publication

  @@schema("social_schema")
}

// ==========================================
// SOCIAL POST MODEL - FACEBOOK-LIKE STRUCTURE
// ==========================================

model SocialPost {
  id       String @id @default(uuid())
  authorId String // User ID from auth_schema

  // Post Content
  content      String // Post text content
  imageUrls    String[] // Image attachments
  videoUrls    String[] // Video attachments
  documentUrls String[] // Document attachments

  // Post Type & Context
  postType           SocialPostType @default(GENERAL)
  educationalContext String? // Course, subject, project context
  tags               String[] // Hashtags and topics

  // Academic Features
  studyGroupId  String? // Associated study group
  courseId      String? // Associated course
  subjectArea   String? // Academic subject
  academicLevel AcademicLevel? // Educational level
  // Post Settings
  status        SocialPostStatus     @default(PUBLISHED)
  visibility    SocialPostVisibility @default(PUBLIC)
  pinned        Boolean              @default(false)
  featured      Boolean              @default(false)

  // Engagement Metrics (Facebook-like)
  likeCount    Int @default(0)
  commentCount Int @default(0)
  shareCount   Int @default(0)
  viewCount    Int @default(0)

  // Timestamps
  createdAt DateTime             @default(now())
  updatedAt DateTime             @default(now()) @updatedAt
  // Relationships
  likes     SocialPostLike[]
  comments  SocialPostComment[]
  shares    SocialPostShare[]
  bookmarks SocialPostBookmark[]

  // Performance Indexes
  @@index([authorId, status])
  @@index([createdAt, featured])
  @@index([studyGroupId])
  @@index([courseId])
  @@index([status, visibility, createdAt])
  @@index([postType, academicLevel])
  @@schema("social_schema")
}

// ==========================================
// SOCIAL POST ENGAGEMENT MODELS
// ==========================================

model SocialPostLike {
  id        String   @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  reaction  String   @default("like") // like, love, helpful, insightful
  createdAt DateTime @default(now())

  post SocialPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@schema("social_schema")
}

model SocialPostComment {
  id       String  @id @default(uuid())
  postId   String
  userId   String // User ID from auth_schema
  parentId String? // For nested comments

  content   String // Comment text
  imageUrls String[] // Comment images

  // Engagement
  likeCount  Int @default(0)
  replyCount Int @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  post    SocialPost          @relation(fields: [postId], references: [id], onDelete: Cascade)
  parent  SocialPostComment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies SocialPostComment[] @relation("CommentReplies")

  @@index([postId, createdAt])
  @@index([userId])
  @@schema("social_schema")
}

model SocialPostShare {
  postId    String
  userId    String // User ID from auth_schema
  content   String? // Optional share message
  privacy   SocialPostVisibility @default(PUBLIC)
  createdAt DateTime             @default(now())

  post SocialPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@schema("social_schema")
}

model SocialPostBookmark {
  id           String   @id @default(uuid())
  postId       String
  userId       String // User ID from auth_schema
  collectionId String? // Optional collection/folder
  createdAt    DateTime @default(now())

  post SocialPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@schema("social_schema")
}

// ==========================================
// SOCIAL NETWORKING MODELS
// ==========================================

model Follow {
  id          String       @id @default(uuid())
  followerId  String // User ID who is following
  followingId String // User ID being followed
  status      FollowStatus @default(ACCEPTED)
  createdAt   DateTime     @default(now())

  @@unique([followerId, followingId])
  @@schema("social_schema")
}

model Friend {
  id          String       @id @default(uuid())
  requesterId String // User who sent request
  receiverId  String // User who received request
  status      FriendStatus @default(PENDING)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @default(now()) @updatedAt

  @@unique([requesterId, receiverId])
  @@schema("social_schema")
}

// ==========================================
// STORY SYSTEM (INSTAGRAM-LIKE)
// ==========================================

model Story {
  id       String @id @default(uuid())
  authorId String // User ID from auth_schema

  // Story Content
  content  String? // Text content
  imageUrl String? // Story image
  videoUrl String? // Story video  backgroundColor String?  // Background color for text stories

  // Story Settings
  visibility     SocialPostVisibility @default(PRIVATE)
  allowReplies   Boolean              @default(true)
  allowReactions Boolean              @default(true)

  // Story Metrics
  viewCount     Int @default(0)
  reactionCount Int @default(0)
  replyCount    Int @default(0)

  // Expiry
  expiresAt DateTime // Stories expire after 24 hours
  createdAt DateTime @default(now())

  // Relationships
  views     StoryView[]
  reactions StoryReaction[]
  replies   StoryReply[]

  @@index([authorId, expiresAt])
  @@index([createdAt])
  @@schema("social_schema")
}

model StoryView {
  id       String   @id @default(uuid())
  storyId  String
  userId   String // User ID from auth_schema
  viewedAt DateTime @default(now())

  story Story @relation(fields: [storyId], references: [id], onDelete: Cascade)

  @@unique([storyId, userId])
  @@schema("social_schema")
}

model StoryReaction {
  id        String   @id @default(uuid())
  storyId   String
  userId    String // User ID from auth_schema
  reaction  String   @default("like") // like, love, laugh, wow, sad, angry
  createdAt DateTime @default(now())

  story Story @relation(fields: [storyId], references: [id], onDelete: Cascade)

  @@unique([storyId, userId])
  @@schema("social_schema")
}

model StoryReply {
  id        String   @id @default(uuid())
  storyId   String
  userId    String // User ID from auth_schema
  content   String // Reply message
  createdAt DateTime @default(now())

  story Story @relation(fields: [storyId], references: [id], onDelete: Cascade)

  @@index([storyId, createdAt])
  @@schema("social_schema")
}

// ==========================================
// SOCIAL SCHEMA ENUMS
// ==========================================

enum SocialPostType {
  GENERAL // General posts
  STUDY_HELP // Study-related questions/help
  PROJECT_SHARE // Project showcases
  ACHIEVEMENT // Academic achievements
  EVENT_SHARE // Campus/academic events
  RESOURCE_SHARE // Educational resources
  GROUP_DISCUSSION // Study group discussions
  CAREER_ADVICE // Career guidance posts
  TIPS_TRICKS // Study tips and tricks
  MOTIVATION // Motivational posts

  @@schema("social_schema")
}

enum AcademicLevel {
  HIGH_SCHOOL
  UNDERGRADUATE
  GRADUATE
  DOCTORATE
  PROFESSIONAL
  CONTINUING_EDUCATION

  @@schema("social_schema")
}

enum FollowStatus {
  PENDING
  ACCEPTED
  BLOCKED

  @@schema("social_schema")
}

enum FriendStatus {
  PENDING
  ACCEPTED
  BLOCKED
  REJECTED

  @@schema("social_schema")
}

// ==========================================
// COURSES SCHEMA - ONLINE LEARNING PLATFORM
// ==========================================

// ==========================================
// ONLINE COURSE MODELS
// ==========================================

model OnlineCourse {
  id           String @id @default(uuid())
  instructorId String // User ID from auth_schema

  // Course Details
  title            String
  description      String
  shortDescription String?

  // Course Content
  category         CourseCategory
  subcategory      String?
  tags             String[]
  prerequisites    String[]
  learningOutcomes String[]

  // Course Metadata
  level        CourseLevel @default(BEGINNER)
  language     String      @default("English")
  duration     Int? // Total duration in hours
  totalLessons Int         @default(0)

  // Pricing & Access
  price         Float   @default(0)
  discountPrice Float?
  currency      String  @default("USD")
  isPublished   Boolean @default(false)
  isPremium     Boolean @default(false)

  // Media
  thumbnailUrl    String?
  previewVideoUrl String?

  // Course Settings
  enrollmentLimit    Int? // Max students
  startDate          DateTime?
  endDate            DateTime?
  selfPaced          Boolean   @default(true)
  certificateOffered Boolean   @default(true)

  // Statistics
  enrollmentCount Int   @default(0)
  averageRating   Float @default(0)
  totalRatings    Int   @default(0)
  totalRevenue    Float @default(0)

  // Timestamps
  createdAt     DateTime            @default(now())
  updatedAt     DateTime            @default(now()) @updatedAt
  // Relationships
  enrollments   CourseEnrollment[]
  lessons       CourseLesson[]
  reviews       CourseReview[]
  assignments   CourseAssignment[]
  quizzes       CourseQuiz[]
  materials     CourseMaterial[]
  discussions   CourseDiscussion[]
  certificates  CourseCertificate[]
  analytics     CourseAnalytics[]
  statistics    Statistics[]
  institution   Institution?        @relation("CourseInstitution", fields: [institutionId], references: [id])
  institutionId String?
  department    Department?         @relation("CourseDepartment", fields: [departmentId], references: [id])
  departmentId  String?

  @@index([category, isPublished])
  @@index([instructorId])
  @@index([level, category])
  @@index([createdAt, isPublished])
  @@schema("courses_schema")
}

model CourseEnrollment {
  id        String @id @default(uuid())
  courseId  String
  studentId String // User ID from auth_schema

  // Enrollment Details
  enrollmentDate DateTime         @default(now())
  completionDate DateTime?
  status         EnrollmentStatus @default(ACTIVE)

  // Progress Tracking
  progress        Float     @default(0) // Percentage completed (0-100)
  currentLessonId String?
  lastAccessedAt  DateTime?

  // Payment Info
  paymentAmount     Float?
  paymentMethod     String?
  paymentDate       DateTime?
  // Performance
  overallGrade      Float? // Overall course grade
  certificateIssued Boolean   @default(false)

  // Audit Fields
  createdBy  String? // Admin who created enrollment
  modifiedBy String? // Last admin who modified
  deletedAt  DateTime? // Soft delete timestamp
  deletedBy  String? // Admin who deleted

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  course       OnlineCourse           @relation(fields: [courseId], references: [id], onDelete: Cascade)
  submissions  AssignmentSubmission[]
  quizAttempts QuizAttempt[]

  @@unique([courseId, studentId])
  @@index([courseId, status, enrollmentDate])
  @@index([studentId, status])
  @@index([status, lastAccessedAt])
  @@schema("courses_schema")
}

model CourseLesson {
  id       String @id @default(uuid())
  courseId String

  // Lesson Details
  title       String
  description String?
  content     String // Lesson content/transcript

  // Lesson Structure
  chapter  String? // Chapter/section name
  order    Int // Order within course
  duration Int? // Duration in minutes

  // Media Content
  videoUrl     String?
  audioUrl     String?
  documentUrls String[]
  imageUrls    String[]

  // Lesson Settings
  isPublished Boolean @default(false)
  isFree      Boolean @default(false) // Preview lesson
  isRequired  Boolean @default(true)

  // Prerequisites
  prerequisiteLessons String[] // Lesson IDs that must be completed first

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  course   OnlineCourse     @relation(fields: [courseId], references: [id], onDelete: Cascade)
  progress LessonProgress[]

  @@index([courseId, order])
  @@index([isPublished, isFree])
  @@schema("courses_schema")
}

model LessonProgress {
  id        String @id @default(uuid())
  lessonId  String
  studentId String // User ID from auth_schema

  // Progress Details
  status         ProgressStatus @default(NOT_STARTED)
  watchTime      Int            @default(0) // Seconds watched
  completionRate Float          @default(0) // Percentage completed

  // Interaction
  lastPosition Int     @default(0) // Last video/audio position
  notes        String? // Student notes
  bookmarked   Boolean @default(false)

  // Timestamps
  startedAt      DateTime?
  completedAt    DateTime?
  lastAccessedAt DateTime  @default(now())
  createdAt      DateTime  @default(now())

  // Relationships
  lesson CourseLesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([lessonId, studentId])
  @@schema("courses_schema")
}

// ==========================================
// ASSESSMENT MODELS
// ==========================================

model CourseQuiz {
  id       String  @id @default(uuid())
  courseId String
  lessonId String? // Optional: quiz for specific lesson

  // Quiz Details
  title        String
  description  String?
  instructions String?

  // Quiz Configuration
  questions      Json // Array of questions with options
  totalQuestions Int
  passingScore   Float @default(70) // Percentage needed to pass
  timeLimit      Int? // Time limit in minutes
  maxAttempts    Int   @default(3)

  // Quiz Settings
  shuffleQuestions Boolean @default(true)
  shuffleOptions   Boolean @default(true)
  showResults      Boolean @default(true)
  isRequired       Boolean @default(false)

  // Audit Fields
  createdBy  String? // Admin/Teacher who created quiz
  modifiedBy String? // Last admin who modified
  deletedAt  DateTime? // Soft delete timestamp
  deletedBy  String? // Admin who deleted

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  course   OnlineCourse  @relation(fields: [courseId], references: [id], onDelete: Cascade)
  attempts QuizAttempt[]

  @@index([courseId, isRequired])
  @@index([lessonId, isRequired])
  @@index([createdBy, courseId])
  @@index([deletedAt, courseId])
  @@index([passingScore, courseId])
  @@schema("courses_schema")
}

model QuizAttempt {
  id           String @id @default(uuid())
  quizId       String
  studentId    String // User ID from auth_schema
  enrollmentId String

  // Attempt Details
  attemptNumber Int // 1, 2, 3, etc.
  answers       Json // Student's answers
  score         Float // Score achieved
  passed        Boolean @default(false)

  // Timing
  startedAt   DateTime  @default(now())
  submittedAt DateTime?
  timeSpent   Int? // Time spent in seconds

  // Relationships
  quiz       CourseQuiz       @relation(fields: [quizId], references: [id], onDelete: Cascade)
  enrollment CourseEnrollment @relation(fields: [enrollmentId], references: [id], onDelete: Cascade)

  @@unique([quizId, studentId, attemptNumber])
  @@index([quizId, passed])
  @@index([studentId, score])
  @@index([enrollmentId, passed])
  @@index([submittedAt, passed])
  @@index([score, passed])
  @@schema("courses_schema")
}

model CourseAssignment {
  id       String @id @default(uuid())
  courseId String

  // Assignment Details
  title        String
  description  String
  instructions String

  // Assignment Configuration
  maxPoints           Float     @default(100)
  dueDate             DateTime?
  allowLateSubmission Boolean   @default(true)
  latePenalty         Float? // Percentage penalty per day

  // Submission Settings
  fileFormats    String[] // Allowed file formats
  maxFileSize    Int? // Max file size in MB
  maxSubmissions Int      @default(1)

  // Assignment Type
  assignmentType AssignmentType @default(WRITTEN)
  isGroupWork    Boolean        @default(false)
  peerReview     Boolean        @default(false)

  // Audit Fields
  createdBy  String? // Admin/Teacher who created assignment
  modifiedBy String? // Last admin who modified
  deletedAt  DateTime? // Soft delete timestamp
  deletedBy  String? // Admin who deleted

  // Timestamps
  createdAt   DateTime               @default(now())
  updatedAt   DateTime               @default(now()) @updatedAt
  // Relationships
  course      OnlineCourse           @relation(fields: [courseId], references: [id], onDelete: Cascade)
  submissions AssignmentSubmission[]

  @@index([courseId, dueDate])
  @@index([assignmentType, courseId])
  @@index([createdBy, courseId])
  @@index([deletedAt, courseId])
  @@index([isGroupWork, courseId])
  @@schema("courses_schema")
}

model AssignmentSubmission {
  id           String @id @default(uuid())
  assignmentId String
  studentId    String // User ID from auth_schema
  enrollmentId String

  // Submission Details
  content        String? // Text submission
  fileUrls       String[] // Uploaded files
  submissionNote String? // Optional note from student

  // Grading
  grade    Float? // Points awarded
  feedback String? // Instructor feedback
  gradedAt DateTime?
  gradedBy String? // Instructor ID

  // Submission Status
  status      SubmissionStatus @default(SUBMITTED)
  isLate      Boolean          @default(false)
  submittedAt DateTime         @default(now())

  // Timestamps
  createdAt  DateTime         @default(now())
  updatedAt  DateTime         @default(now()) @updatedAt
  // Relationships
  assignment CourseAssignment @relation(fields: [assignmentId], references: [id], onDelete: Cascade)
  enrollment CourseEnrollment @relation(fields: [enrollmentId], references: [id], onDelete: Cascade)

  @@unique([assignmentId, studentId])
  @@index([assignmentId, status])
  @@index([studentId, status])
  @@index([enrollmentId, status])
  @@index([submittedAt, status])
  @@index([gradedAt, status])
  @@index([gradedBy, status])
  @@schema("courses_schema")
}

// ==========================================
// COURSE INTERACTION MODELS
// ==========================================

model CourseDiscussion {
  id       String @id @default(uuid())
  courseId String
  authorId String // User ID from auth_schema

  // Discussion Details
  title    String
  content  String
  category DiscussionCategory @default(GENERAL)

  // Discussion Settings
  isPinned Boolean @default(false)
  isLocked Boolean @default(false)

  // Engagement
  likeCount  Int @default(0)
  replyCount Int @default(0)
  viewCount  Int @default(0)

  // Audit Fields
  deletedAt DateTime? // Soft delete timestamp
  deletedBy String? // Admin/Moderator who deleted

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  course  OnlineCourse      @relation(fields: [courseId], references: [id], onDelete: Cascade)
  replies DiscussionReply[]

  @@index([courseId, category])
  @@index([createdAt, isPinned])
  @@index([authorId, courseId])
  @@index([isLocked, isPinned])
  @@index([deletedAt, courseId])
  @@schema("courses_schema")
}

model DiscussionReply {
  id           String  @id @default(uuid())
  discussionId String
  authorId     String // User ID from auth_schema
  parentId     String? // For nested replies

  content   String
  likeCount Int    @default(0)

  // Audit Fields
  deletedAt DateTime? // Soft delete timestamp
  deletedBy String? // Admin/Moderator who deleted

  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  discussion CourseDiscussion  @relation(fields: [discussionId], references: [id], onDelete: Cascade)
  parent     DiscussionReply?  @relation("ReplyHierarchy", fields: [parentId], references: [id])
  children   DiscussionReply[] @relation("ReplyHierarchy")

  @@index([discussionId, createdAt])
  @@index([authorId, discussionId])
  @@index([parentId, createdAt])
  @@index([deletedAt, discussionId])
  @@schema("courses_schema")
}

model CourseReview {
  id        String @id @default(uuid())
  courseId  String
  studentId String // User ID from auth_schema

  // Review Details
  rating  Int // 1-5 stars
  title   String?
  content String

  // Review Verification
  verified Boolean @default(false) // Verified enrollment
  helpful  Int     @default(0) // Helpful votes

  // Audit Fields
  deletedAt DateTime? // Soft delete timestamp
  deletedBy String? // Admin who deleted review

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  course OnlineCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([courseId, studentId])
  @@index([courseId, rating])
  @@index([verified, rating])
  @@index([studentId, rating])
  @@index([deletedAt, courseId])
  @@schema("courses_schema")
}

model CourseMaterial {
  id       String @id @default(uuid())
  courseId String

  // Material Details
  title        String
  description  String?
  materialType MaterialType

  // File Information
  fileUrl       String?
  fileName      String?
  fileSize      Int? // Size in bytes
  downloadCount Int     @default(0)

  // Access Control
  isPublic           Boolean @default(false)
  requiresEnrollment Boolean @default(true)

  // Audit Fields
  createdBy  String? // Admin/Teacher who uploaded
  modifiedBy String? // Last admin who modified
  deletedAt  DateTime? // Soft delete timestamp
  deletedBy  String? // Admin who deleted

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  course OnlineCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@index([courseId, materialType])
  @@index([isPublic, materialType])
  @@index([createdBy, courseId])
  @@index([deletedAt, courseId])
  @@schema("courses_schema")
}

model CourseCertificate {
  id        String @id @default(uuid())
  courseId  String
  studentId String // User ID from auth_schema

  // Certificate Details
  certificateNumber String    @unique
  issuedDate        DateTime  @default(now())
  expiryDate        DateTime?

  // Certificate Data
  studentName    String
  courseName     String
  instructorName String
  grade          Float?
  certificateUrl String? // URL to certificate PDF

  // Verification
  verificationCode String  @unique
  isVerified       Boolean @default(true)

  // Audit Fields
  generatedBy String? // System/Admin who generated
  revokedAt   DateTime? // Certificate revocation timestamp
  revokedBy   String? // Admin who revoked

  // Timestamps
  createdAt DateTime @default(now())

  // Relationships
  course OnlineCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([courseId, studentId])
  @@index([studentId, isVerified])
  @@index([certificateNumber])
  @@index([verificationCode])
  @@index([revokedAt, isVerified])
  @@schema("courses_schema")
}

model CourseAnalytics {
  id       String   @id @default(uuid())
  courseId String
  date     DateTime @default(now())

  // Engagement Metrics
  enrollments     Int   @default(0)
  completions     Int   @default(0)
  dropouts        Int   @default(0)
  averageProgress Float @default(0)

  // Content Metrics
  totalWatchTime Int   @default(0) // Total minutes watched
  averageRating  Float @default(0)
  totalRevenue   Float @default(0)

  // Performance Metrics
  quizAverageScore         Float @default(0)
  assignmentSubmissionRate Float @default(0)
  discussionParticipation  Float @default(0)

  // Audit Fields
  calculatedBy String? // System process that calculated metrics
  calculatedAt DateTime @default(now())

  // Relationships
  course OnlineCourse @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([courseId, date])
  @@index([date, courseId])
  @@index([enrollments, date])
  @@index([averageRating, date])
  @@schema("courses_schema")
}

// ==========================================
// COURSES SCHEMA ENUMS
// ==========================================

enum CourseCategory {
  TECHNOLOGY
  BUSINESS
  DESIGN
  MARKETING
  DEVELOPMENT
  DATA_SCIENCE
  PHOTOGRAPHY
  MUSIC
  HEALTH
  FITNESS
  LANGUAGE
  ACADEMIC
  TEST_PREP
  PERSONAL_DEVELOPMENT

  @@schema("courses_schema")
}

enum CourseLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  ALL_LEVELS

  @@schema("courses_schema")
}

enum EnrollmentStatus {
  ACTIVE
  COMPLETED
  DROPPED
  SUSPENDED
  REFUNDED

  @@schema("courses_schema")
}

enum ProgressStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
  SKIPPED

  @@schema("courses_schema")
}

enum AssignmentType {
  WRITTEN
  PROJECT
  PRESENTATION
  CODE
  DESIGN
  VIDEO
  PEER_REVIEW

  @@schema("courses_schema")
}

enum SubmissionStatus {
  SUBMITTED
  GRADED
  RETURNED
  LATE
  MISSING

  @@schema("courses_schema")
}

enum DiscussionCategory {
  GENERAL
  QUESTIONS
  ANNOUNCEMENTS
  TECHNICAL_HELP
  ASSIGNMENTS
  PROJECTS
  FEEDBACK

  @@schema("courses_schema")
}

enum MaterialType {
  PDF
  VIDEO
  AUDIO
  PRESENTATION
  SPREADSHEET
  CODE
  DATASET
  TEMPLATE
  REFERENCE

  @@schema("courses_schema")
}

// ==========================================
// JOBS SCHEMA - FACEBOOK-LIKE JOB POSTING SYSTEM
// ==========================================

// ==========================================
// JOB POST MODEL - FACEBOOK-LIKE STRUCTURE
// ==========================================

model JobPost {
  id       String @id @default(uuid())
  authorId String // User ID from auth_schema

  // Required Category Selection
  jobCategory JobCategory // PRIVATE or GOVERNMENT (required)

  // Job Details
  title        String
  description  String
  content      String? // Rich text content
  company      String
  location     String
  jobType      JobType  @default(FULL_TIME)
  salary       String?
  salaryMin    Int?
  salaryMax    Int?
  currency     String   @default("USD")
  remote       Boolean  @default(false)
  // Requirements & Skills
  requirements String[] // Job requirements
  skills       String[] // Required skills
  experience   String? // Experience level
  education    String? // Education requirements
  benefits     String[] // Job benefits

  // Post Metadata
  status     JobStatus         @default(ACTIVE)
  visibility JobPostVisibility @default(PUBLIC)
  featured   Boolean           @default(false)
  urgent     Boolean           @default(false)

  // Application Info
  applicationUrl      String?
  applicationEmail    String?
  applicationDeadline DateTime?

  // Engagement Metrics (Facebook-like)
  viewCount        Int @default(0)
  likeCount        Int @default(0)
  commentCount     Int @default(0)
  shareCount       Int @default(0)
  applicationCount Int @default(0)

  // Media
  imageUrls      String[] // Job images
  attachmentUrls String[] // Documents, PDFs

  // SEO & Discoverability
  tags         String[] // Searchable tags
  keywords     String[] // SEO keywords
  // Timestamps & Audit
  expiresAt    DateTime?
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @default(now()) @updatedAt
  deletedAt    DateTime? // Soft delete
  deletedBy    String? // Admin who deleted
  modifiedBy   String? // Last modifier
  // Relationships
  likes        JobPostLike[]
  comments     JobPostComment[]
  shares       JobPostShare[]
  applications JobApplication[]

  // Performance Indexes
  @@index([jobCategory, status])
  @@index([location, jobType])
  @@index([createdAt])
  @@index([featured, urgent])
  @@index([status, visibility, createdAt])
  @@index([authorId, status])
  @@index([applicationDeadline, status])
  @@schema("jobs_schema")
}

// ==========================================
// JOB POST ENGAGEMENT MODELS
// ==========================================

model JobPostLike {
  id        String   @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  reaction  String   @default("like") // like, love, helpful, etc.
  createdAt DateTime @default(now())

  post JobPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@index([userId, createdAt])
  @@index([postId, reaction])
  @@schema("jobs_schema")
}

model JobPostComment {
  id        String    @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  parentId  String? // For nested comments/replies
  content   String
  edited    Boolean   @default(false)
  deletedAt DateTime? // Soft delete
  deletedBy String? // Moderator who deleted
  createdAt DateTime  @default(now())
  updatedAt DateTime  @default(now()) @updatedAt

  post    JobPost          @relation(fields: [postId], references: [id], onDelete: Cascade)
  parent  JobPostComment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies JobPostComment[] @relation("CommentReplies")

  @@index([postId, createdAt])
  @@index([userId, postId])
  @@index([parentId, createdAt])
  @@index([deletedAt, postId])
  @@schema("jobs_schema")
}

model JobPostShare {
  id        String   @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  caption   String? // User's comment when sharing
  platform  String? // Where it was shared (LinkedIn, Twitter, etc.)
  createdAt DateTime @default(now())

  post JobPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@index([userId, createdAt])
  @@index([platform, createdAt])
  @@schema("jobs_schema")
}

// ==========================================
// JOB APPLICATION MODEL
// ==========================================

model JobApplication {
  id          String @id @default(uuid())
  jobPostId   String
  applicantId String // User ID from auth_schema

  // Application Details
  coverLetter String?
  resumeUrl   String?
  portfolio   String?
  contactInfo Json? // Phone, LinkedIn, etc.

  // Application Status
  status     ApplicationStatus @default(PENDING)
  appliedAt  DateTime          @default(now())
  reviewedAt DateTime?
  responseAt DateTime?

  // Recruiter Notes
  recruiterNotes String?
  rating         Int? // 1-5 star rating

  // Audit Fields
  reviewedBy  String? // HR/Recruiter who reviewed
  modifiedBy  String? // Last modifier
  withdrawnAt DateTime? // Application withdrawal
  rejectedAt  DateTime? // Rejection timestamp

  // Relationships
  jobPost JobPost @relation(fields: [jobPostId], references: [id], onDelete: Cascade)

  @@unique([jobPostId, applicantId])
  @@index([status, appliedAt])
  @@index([applicantId, status])
  @@index([reviewedBy, status])
  @@index([rating, status])
  @@index([withdrawnAt, appliedAt])
  @@schema("jobs_schema")
}

// ==========================================
// SALARY RANGE MODEL
// ==========================================

model SalaryRange {
  id        String  @id @default(uuid())
  title     String // "Entry Level", "Mid Level", "Senior", etc.
  minSalary Int
  maxSalary Int
  currency  String  @default("USD")
  location  String
  jobType   JobType

  // Audit Fields
  createdBy String? // Admin who created range
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  @@index([location, jobType])
  @@index([minSalary, maxSalary])
  @@index([currency, location])
  @@schema("jobs_schema")
}

// ==========================================
// JOBS SCHEMA ENUMS
// ==========================================

enum JobPostVisibility {
  PUBLIC // Visible to everyone
  PRIVATE // Only visible to author
  FRIENDS // Visible to friends/connections only
  FOLLOWERS // Visible to followers only
  LISTED // Visible to specific lists/groups

  @@schema("jobs_schema")
}

enum JobCategory {
  PRIVATE // Private sector jobs
  GOVERNMENT // Government/public sector jobs

  @@schema("jobs_schema")
}

enum JobType {
  FULL_TIME
  PART_TIME
  CONTRACT
  FREELANCE
  INTERNSHIP
  TEMPORARY

  @@schema("jobs_schema")
}

enum JobStatus {
  ACTIVE
  PAUSED
  FILLED
  EXPIRED
  ARCHIVED

  @@schema("jobs_schema")
}

enum ApplicationStatus {
  PENDING
  REVIEWING
  SHORTLISTED
  INTERVIEWED
  OFFERED
  HIRED
  REJECTED
  WITHDRAWN

  @@schema("jobs_schema")
}

// ==========================================
// FREELANCING SCHEMA - FREELANCE PROJECT PLATFORM
// ==========================================

// ==========================================
// FREELANCING ENUMS
// ==========================================

enum FreelanceCategory {
  HYBRID // Mix of remote and on-site work
  ONLINE // Fully online/remote work
  REMOTE // Remote work (synonym for online)

  @@schema("freelancing_schema")
}

enum PaymentType {
  FIXED // Fixed price project
  HOURLY // Hourly rate
  MILESTONE // Milestone-based payments

  @@schema("freelancing_schema")
}

enum ProjectComplexity {
  SIMPLE // Basic projects
  STANDARD // Standard complexity
  COMPLEX // High complexity projects
  EXPERT // Expert-level projects

  @@schema("freelancing_schema")
}

enum ProjectStatus {
  OPEN // Accepting proposals
  IN_PROGRESS // Project started
  COMPLETED // Project finished
  CANCELLED // Project cancelled
  ON_HOLD // Temporarily paused

  @@schema("freelancing_schema")
}

enum ProposalStatus {
  PENDING // Waiting for client review
  ACCEPTED // Proposal accepted
  REJECTED // Proposal rejected
  WITHDRAWN // Freelancer withdrew
  SHORTLISTED // Under consideration

  @@schema("freelancing_schema")
}

enum FreelancingPostVisibility {
  PUBLIC // Visible to everyone
  PRIVATE // Only visible to author
  FRIENDS // Visible to connections only
  FOLLOWERS // Visible to followers only
  LISTED // Visible to specific lists/groups

  @@schema("freelancing_schema")
}

// ==========================================
// FREELANCE POST MODEL - FACEBOOK-LIKE STRUCTURE
// ==========================================

model FreelancePost {
  id       String @id @default(uuid())
  authorId String // User ID from auth_schema

  // Required Category Selection
  freelanceCategory FreelanceCategory // HYBRID, ONLINE, or REMOTE (required)

  // Project Details
  title       String
  description String
  content     String? // Rich text project description
  budget      String?
  budgetMin   Decimal?
  budgetMax   Decimal?
  currency    String      @default("USD")
  paymentType PaymentType @default(FIXED)

  // Project Scope
  complexity ProjectComplexity @default(STANDARD)
  duration   String? // "1 week", "2 months", etc.
  startDate  DateTime?
  deadline   DateTime?

  // Skills & Requirements
  skills       String[] // Required skills
  requirements String[] // Project requirements
  tools        String[] // Required tools/software
  experience   String? // Experience level needed

  // Location (for HYBRID projects)
  location   String? // City, country
  timezone   String? // Preferred timezone
  // Post Metadata
  status     ProjectStatus             @default(OPEN)
  visibility FreelancingPostVisibility @default(PUBLIC)
  featured   Boolean                   @default(false)
  urgent     Boolean                   @default(false)

  // Engagement Metrics (Facebook-like)
  viewCount     Int @default(0)
  likeCount     Int @default(0)
  commentCount  Int @default(0)
  shareCount    Int @default(0)
  proposalCount Int @default(0)

  // Media
  imageUrls      String[] // Project images
  attachmentUrls String[] // Documents, references

  // SEO & Discoverability
  tags           String[] // Searchable tags
  keywords       String[] // SEO keywords
  // Client Info
  clientRating   Decimal? // Client's average rating
  clientLocation String?
  responseTime   String? // Client's avg response time

  // Audit Fields
  deletedAt  DateTime? // Soft delete timestamp
  deletedBy  String? // Admin who deleted
  modifiedBy String? // Last modifier

  // Timestamps
  expiresAt DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @default(now()) @updatedAt

  // Relationships
  likes     FreelancePostLike[]
  comments  FreelancePostComment[]
  shares    FreelancePostShare[]
  proposals Proposal[]

  @@index([freelanceCategory, status])
  @@index([budgetMin, budgetMax])
  @@index([complexity, duration])
  @@index([createdAt])
  @@index([featured, urgent])
  @@index([authorId, status])
  @@index([location, freelanceCategory])
  @@index([deletedAt, status])
  @@schema("freelancing_schema")
}

// ==========================================
// FREELANCE POST ENGAGEMENT MODELS
// ==========================================

model FreelancePostLike {
  id        String   @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  reaction  String   @default("like") // like, interested, bookmarked
  createdAt DateTime @default(now())

  post FreelancePost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@index([userId, createdAt])
  @@index([reaction, postId])
  @@schema("freelancing_schema")
}

model FreelancePostComment {
  id        String    @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  parentId  String? // For nested comments/replies
  content   String
  edited    Boolean   @default(false)
  deletedAt DateTime? // Soft delete
  deletedBy String? // Moderator who deleted
  createdAt DateTime  @default(now())
  updatedAt DateTime  @default(now()) @updatedAt

  post    FreelancePost          @relation(fields: [postId], references: [id], onDelete: Cascade)
  parent  FreelancePostComment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies FreelancePostComment[] @relation("CommentReplies")

  @@index([postId, createdAt])
  @@index([userId, postId])
  @@index([parentId, createdAt])
  @@index([deletedAt, postId])
  @@schema("freelancing_schema")
}

model FreelancePostShare {
  id        String   @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  caption   String? // User's comment when sharing
  platform  String? // Where it was shared
  createdAt DateTime @default(now())

  post FreelancePost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@index([userId, createdAt])
  @@index([platform, createdAt])
  @@schema("freelancing_schema")
}

// ==========================================
// PROPOSAL MODEL
// ==========================================

model Proposal {
  id              String @id @default(uuid())
  freelancePostId String
  freelancerId    String // User ID from auth_schema

  // Proposal Details
  coverLetter    String
  proposedBudget Decimal?
  timeline       String? // "2 weeks", "1 month"
  availability   String? // "Full-time", "Part-time"

  // Freelancer Info
  portfolioUrls  String[] // Portfolio links
  previousWork   String[] // Relevant work samples
  certifications String[] // Relevant certifications

  // Communication
  questions String? // Questions for client
  notes     String? // Additional notes

  // Status & Tracking
  status      ProposalStatus @default(PENDING)
  submittedAt DateTime       @default(now())
  reviewedAt  DateTime?
  responseAt  DateTime?

  // Client Feedback
  clientRating   Int? // 1-5 star rating
  clientFeedback String?

  // Audit Fields
  withdrawnAt DateTime? // Proposal withdrawal
  rejectedAt  DateTime? // Rejection timestamp
  modifiedBy  String? // Last modifier

  // Relationships
  freelancePost FreelancePost @relation(fields: [freelancePostId], references: [id], onDelete: Cascade)

  @@unique([freelancePostId, freelancerId])
  @@index([status, submittedAt])
  @@index([freelancerId, status])
  @@index([clientRating, status])
  @@index([withdrawnAt, submittedAt])
  @@schema("freelancing_schema")
}

// ==========================================
// FREELANCE RATING & REVIEW MODEL
// ==========================================

model FreelanceReview {
  id           String @id @default(uuid())
  projectId    String // Reference to completed project
  clientId     String // User ID from auth_schema
  freelancerId String // User ID from auth_schema

  // Review Details
  rating  Int // 1-5 stars
  title   String?
  content String

  // Rating Categories
  qualityRating Int? // Work quality (1-5)
  timelyRating  Int? // Timeliness (1-5)
  commRating    Int? // Communication (1-5)

  // Metadata
  isPublic Boolean @default(true)
  verified Boolean @default(false)
  helpful  Int     @default(0) // Helpful votes

  // Audit Fields
  deletedAt DateTime? // Soft delete
  deletedBy String? // Admin who deleted

  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  @@index([freelancerId, rating])
  @@index([clientId, rating])
  @@index([verified, isPublic])
  @@index([deletedAt, freelancerId])
  @@schema("freelancing_schema")
}

// ==========================================
// NEWS SCHEMA - EDUCATIONAL NEWS PLATFORM
// ==========================================

// ==========================================
// NEWS ENUMS
// ==========================================

enum NewsPostVisibility {
  PUBLIC // Visible to everyone
  PRIVATE // Only visible to author
  FRIENDS // Visible to friends/connections only
  FOLLOWERS // Visible to followers only
  LISTED // Visible to specific lists/groups

  @@schema("news_schema")
}

enum NewsType {
  OFFICIAL // Official institutional news
  NON_OFFICIAL // User-generated/community news

  @@schema("news_schema")
}

enum NewsCategory {
  GENERAL
  ACADEMIC
  ADMISSIONS
  EVENTS
  SPORTS
  RESEARCH
  POLICY
  TECHNOLOGY
  CAREER
  SCHOLARSHIPS
  INTERNATIONAL
  ALUMNI

  @@schema("news_schema")
}

enum PublishStatus {
  DRAFT // Still being written
  REVIEW // Under editorial review
  SCHEDULED // Scheduled for publication
  PUBLISHED // Live and public
  ARCHIVED // Archived/historical
  RETRACTED // Retracted due to errors

  @@schema("news_schema")
}

// ==========================================
// NEWS MODELS
// ==========================================

model NewsPost {
  id       String @id @default(uuid())
  authorId String // User ID from auth_schema

  // Required Category Selection
  newsType NewsType // OFFICIAL or NON_OFFICIAL (required)

  // Article Details
  title    String
  subtitle String?
  content  String // Rich text content
  excerpt  String? // Short summary

  // Content Metadata
  category NewsCategory @default(GENERAL)
  tags     String[] // Article tags
  keywords String[] // SEO keywords

  // Source Information
  source      String? // News source
  sourceUrl   String? // Original source URL
  author      String? // Original author name
  publishedAt DateTime? // Original publish date

  // Media
  featuredImage  String? // Main article image
  imageUrls      String[] // Additional images
  videoUrls      String[] // Video content
  attachmentUrls String[] // Documents, PDFs
  // Post Settings
  status         PublishStatus      @default(DRAFT)
  visibility     NewsPostVisibility @default(PUBLIC)
  featured       Boolean            @default(false)
  breaking       Boolean            @default(false) // Breaking news flag

  // Engagement Metrics (Facebook-like)
  viewCount    Int  @default(0)
  likeCount    Int  @default(0)
  commentCount Int  @default(0)
  shareCount   Int  @default(0)
  readingTime  Int? // Estimated reading time in minutes

  // SEO & Discovery
  slug            String? @unique // URL-friendly slug
  metaTitle       String?
  metaDescription String?

  // Editorial
  editorNote  String? // Editor's note
  corrections String[] // Article corrections
  retractions String[] // Retractions if any

  // Geographic
  location      String? // News location/region
  institutionId String? // Related institution ID
  // Timestamps & Audit
  expiresAt     DateTime? // When article expires
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @default(now()) @updatedAt
  deletedAt     DateTime? // Soft delete
  deletedBy     String? // Admin who deleted
  editorId      String? // Editor who approved/modified
  // Relationships
  likes         NewsPostLike[]
  comments      NewsPostComment[]
  shares        NewsPostShare[]
  analytics     NewsAnalytics[]

  // Performance Indexes
  @@index([newsType, status])
  @@index([category, featured])
  @@index([createdAt, publishedAt])
  @@index([breaking, featured])
  @@index([institutionId])
  @@index([status, visibility, createdAt])
  @@index([authorId, status])
  @@index([slug])
  @@schema("news_schema")
}

model NewsPostLike {
  id        String   @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  reaction  String   @default("like") // like, informative, helpful, etc.
  createdAt DateTime @default(now())

  post NewsPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@schema("news_schema")
}

model NewsPostComment {
  id        String   @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  parentId  String? // For nested comments/replies
  content   String
  edited    Boolean  @default(false)
  flagged   Boolean  @default(false) // Moderation flag
  approved  Boolean  @default(true) // Moderation approval
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  post    NewsPost          @relation(fields: [postId], references: [id], onDelete: Cascade)
  parent  NewsPostComment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies NewsPostComment[] @relation("CommentReplies")

  @@index([approved, flagged])
  @@schema("news_schema")
}

model NewsPostShare {
  id        String   @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  caption   String? // User's comment when sharing
  platform  String? // Where it was shared (Facebook, Twitter, etc.)
  createdAt DateTime @default(now())

  post NewsPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@schema("news_schema")
}

model NewsAnalytics {
  id     String @id @default(uuid())
  postId String @unique

  // Engagement Analytics
  totalViews     Int      @default(0)
  uniqueViews    Int      @default(0)
  avgReadingTime Int? // Average time spent reading
  bounceRate     Decimal? // Percentage who left quickly

  // Social Analytics
  totalShares    Int      @default(0)
  totalComments  Int      @default(0)
  totalLikes     Int      @default(0)
  engagementRate Decimal? // Overall engagement percentage

  // Traffic Analytics
  referralSources Json? // Where traffic came from
  deviceTypes     Json? // Mobile, desktop, tablet breakdown
  locations       Json? // Geographic data

  // Content Performance
  clickThroughRate Decimal? // CTR for external links
  conversionRate   Decimal? // Goal conversion rate
  // Audit Fields
  calculatedBy     String? // System process that calculated metrics
  calculatedAt     DateTime @default(now())

  // Relationships
  post NewsPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, calculatedAt])
  @@index([calculatedAt])
  @@index([totalViews, calculatedAt])
  @@index([engagementRate, calculatedAt])
  @@schema("courses_schema")
}

// ==========================================
// DUPLICATE ENUMS REMOVED TO FIX COMPILATION ERRORS
// ==========================================
// Note: Course-related enums are defined earlier in the file

// ==========================================
// COMMUNITY SCHEMA - MISSING MODELS AND ENUMS  
// ==========================================

// Missing Community model
model Community {
  id          String   @id @default(uuid())
  name        String
  description String?
  type        String   @default("GENERAL")
  isPublic    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now()) @updatedAt

  // Relationships
  posts     CommunityPost[]
  resources CommunityResource[]
  events    CommunityEvent[]

  @@schema("community_schema")
}

// Missing PostType enum
enum PostType {
  DISCUSSION
  QUESTION
  ANNOUNCEMENT
  RESOURCE_SHARE
  EVENT
  POLL

  @@schema("community_schema")
}

// Missing ResourceType enum  
enum ResourceType {
  DOCUMENT
  VIDEO
  AUDIO
  IMAGE
  LINK
  DATASET
  CODE
  TEMPLATE

  @@schema("community_schema")
}

// ==========================================
// JOBS SCHEMA - FACEBOOK-LIKE JOB POSTING SYSTEM
// ==========================================

// ==========================================
// JOB POST MODEL - FACEBOOK-LIKE STRUCTURE
// ==========================================

model CommunityPost {
  id          String @id @default(uuid())
  communityId String
  authorId    String // User ID from auth_schema

  // Post Content
  title        String?
  content      String
  imageUrls    String[]
  videoUrls    String[]
  documentUrls String[]

  // Post Classification
  postType PostType @default(DISCUSSION)
  category String? // Custom category
  tags     String[]

  // Post Settings
  isPinned         Boolean @default(false)
  isLocked         Boolean @default(false)
  isAnnouncement   Boolean @default(false)
  requiresApproval Boolean @default(false)

  // Engagement Metrics
  likeCount    Int @default(0)
  commentCount Int @default(0)
  shareCount   Int @default(0)
  viewCount    Int @default(0)

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  community Community              @relation(fields: [communityId], references: [id], onDelete: Cascade)
  likes     CommunityPostLike[]
  comments  CommunityPostComment[]

  @@index([communityId, createdAt])
  @@index([authorId])
  @@index([postType, isPinned])
  @@schema("community_schema")
}

model CommunityPostLike {
  id        String   @id @default(uuid())
  postId    String
  userId    String // User ID from auth_schema
  reaction  String   @default("like")
  createdAt DateTime @default(now())

  post CommunityPost @relation(fields: [postId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@schema("community_schema")
}

model CommunityPostComment {
  id       String  @id @default(uuid())
  postId   String
  authorId String // User ID from auth_schema
  parentId String? // For nested comments

  content   String
  imageUrls String[]

  likeCount  Int @default(0)
  replyCount Int @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  post    CommunityPost          @relation(fields: [postId], references: [id], onDelete: Cascade)
  parent  CommunityPostComment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies CommunityPostComment[] @relation("CommentReplies")

  @@index([postId, createdAt])
  @@schema("community_schema")
}

model CommunityResource {
  id          String @id @default(uuid())
  communityId String
  uploaderId  String // User ID from auth_schema

  // Resource Details
  title        String
  description  String?
  resourceType ResourceType
  category     String?
  tags         String[]

  // File Information
  fileUrl  String?
  fileName String?
  fileSize Int? // Size in bytes
  mimeType String?

  // External Resources
  externalUrl String? // Link to external resource

  // Access Control
  isPublic      Boolean @default(true)
  downloadCount Int     @default(0)

  // Approval System
  isApproved Boolean   @default(true)
  approvedBy String? // Moderator ID
  approvedAt DateTime?

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  community Community @relation(fields: [communityId], references: [id], onDelete: Cascade)

  @@index([communityId, resourceType])
  @@index([uploaderId])
  @@index([isApproved, isPublic])
  @@schema("community_schema")
}

model CommunityEvent {
  id            String  @id @default(uuid())
  communityId   String
  organizerId   String // User ID from auth_schema
  institutionId String? // Institution ID from hub_schema

  // Event Details
  title       String
  description String
  agenda      String?

  // Event Logistics
  eventType EventType @default(STUDY_SESSION)
  startTime DateTime
  endTime   DateTime
  timezone  String    @default("UTC")

  // Location
  isOnline   Boolean @default(true)
  meetingUrl String? // Video call link
  location   String? // Physical location

  // Event Settings
  maxAttendees      Int? // Attendee limit
  requiresApproval  Boolean @default(false)
  isRecurring       Boolean @default(false)
  recurrencePattern String? // RRULE format

  // Visibility
  isPublic    Boolean @default(true)
  allowGuests Boolean @default(false)

  // Resources
  materials    String[] // Pre-event materials
  recordingUrl String? // Post-event recording

  // Statistics
  attendeeCount   Int @default(0)
  interestedCount Int @default(0)

  // Timestamps
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @default(now()) @updatedAt
  // Relationships
  community   Community       @relation(fields: [communityId], references: [id], onDelete: Cascade)
  institution Institution?    @relation("InstitutionEvent", fields: [institutionId], references: [id])
  attendees   EventAttendee[]

  @@index([communityId, startTime])
  @@index([organizerId])
  @@index([startTime, isPublic])
  @@schema("community_schema")
}

model EventAttendee {
  id      String @id @default(uuid())
  eventId String
  userId  String // User ID from auth_schema

  // Attendance Details
  status   EventAttendanceStatus @default(INTERESTED)
  joinedAt DateTime? // When they joined the event
  leftAt   DateTime? // When they left the event

  // RSVP
  rsvpAt   DateTime @default(now())
  response String? // Optional RSVP message

  // Permissions
  canInvite   Boolean @default(false)
  isModerator Boolean @default(false)

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  event CommunityEvent @relation(fields: [eventId], references: [id], onDelete: Cascade)

  @@unique([eventId, userId])
  @@schema("community_schema")
}

// ==========================================
// FEEDBACK SCHEMA - FEEDBACK & REVIEW SYSTEM
// ==========================================

model Feedback {
  id     String @id @default(uuid())
  userId String // User ID from auth_schema

  // Feedback Content
  title        String
  description  String
  feedbackType FeedbackType
  category     FeedbackCategory @default(OTHER)

  // Context Information
  moduleContext String? // Which module/section
  pageUrl       String? // Where feedback was given
  userAgent     String? // Browser info
  deviceInfo    String? // Device information

  // Classification
  priority FeedbackPriority @default(NORMAL)
  status   FeedbackStatus   @default(PENDING)
  tags     String[] // Custom tags

  // Rating (if applicable)
  rating Int? // 1-5 star rating

  // Processing
  assignedTo          String? // Staff member ID
  internalNotes       String? // Staff notes
  resolutionNotes     String? // Resolution details
  estimatedResolution DateTime? // Expected resolution date

  // Media Attachments
  attachmentUrls String[] // Screenshots, documents

  // Sentiment Analysis
  sentimentScore      SentimentScore? // Auto-analyzed sentiment
  sentimentConfidence Float? // Confidence in sentiment analysis

  // Visibility
  isPublic    Boolean @default(false)
  isAnonymous Boolean @default(false)

  // Follow-up
  followUpRequired Boolean   @default(false)
  followUpDate     DateTime?

  // Timestamps
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @default(now()) @updatedAt
  resolvedAt DateTime?

  // Relationships
  responses FeedbackResponse[]
  votes     FeedbackVote[]

  @@index([userId, feedbackType])
  @@index([status, priority])
  @@index([category, createdAt])
  @@index([assignedTo, status])
  @@schema("feedback_schema")
}

model FeedbackResponse {
  id          String @id @default(uuid())
  feedbackId  String
  responderId String // User ID (staff or user)

  // Response Content
  content    String
  isOfficial Boolean @default(false) // Staff response
  isInternal Boolean @default(false) // Internal note

  // Response Type
  responseType ResponseType @default(COMMENT)

  // Media
  attachmentUrls String[]

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  feedback Feedback @relation(fields: [feedbackId], references: [id], onDelete: Cascade)

  @@index([feedbackId, createdAt])
  @@index([responderId, isOfficial])
  @@schema("feedback_schema")
}

model FeedbackVote {
  id         String @id @default(uuid())
  feedbackId String
  userId     String // User ID from auth_schema

  // Vote Details
  isHelpful Boolean // Upvote/downvote
  voteType  VoteType @default(HELPFUL)

  // Timestamps
  createdAt DateTime @default(now())

  // Relationships
  feedback Feedback @relation(fields: [feedbackId], references: [id], onDelete: Cascade)

  @@unique([feedbackId, userId])
  @@schema("feedback_schema")
}

model Review {
  id         String @id @default(uuid())
  reviewerId String // User ID from auth_schema

  // Review Target
  targetType ReviewTargetType // What is being reviewed
  targetId   String // ID of the target entity

  // Review Content
  title   String?
  content String
  rating  Int // 1-5 star rating

  // Review Classification
  reviewCategory ReviewCategory @default(GENERAL)
  tags           String[]

  // Review Verification
  isVerified       Boolean @default(false) // Verified purchase/enrollment
  verificationData Json? // Verification details

  // Review Moderation
  isModerated      Boolean @default(false)
  moderatedBy      String? // Moderator ID
  moderationReason String?

  // Engagement
  helpfulCount Int @default(0)
  reportCount  Int @default(0)

  // Media
  imageUrls String[]
  videoUrls String[]

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  votes   ReviewVote[]
  reports ReviewReport[]

  @@index([targetType, targetId])
  @@index([reviewerId, createdAt])
  @@index([rating, isVerified])
  @@schema("feedback_schema")
}

model ReviewVote {
  id       String @id @default(uuid())
  reviewId String
  userId   String // User ID from auth_schema

  isHelpful Boolean // Helpful or not helpful
  createdAt DateTime @default(now())

  review Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)

  @@unique([reviewId, userId])
  @@schema("feedback_schema")
}

model ReviewReport {
  id         String @id @default(uuid())
  reviewId   String
  reporterId String // User ID from auth_schema

  // Report Details
  reason      ReportReason
  description String?

  // Report Status
  status         ReportStatus @default(PENDING)
  resolvedBy     String? // Moderator ID
  resolutionNote String?

  // Timestamps
  createdAt  DateTime  @default(now())
  resolvedAt DateTime?

  review Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)

  @@index([reviewId, status])
  @@index([reporterId])
  @@schema("feedback_schema")
}

model Survey {
  id        String @id @default(uuid())
  creatorId String // User ID from auth_schema (admin/staff)

  // Survey Details
  title        String
  description  String?
  instructions String?

  // Survey Configuration
  surveyType             SurveyType @default(FEEDBACK)
  isAnonymous            Boolean    @default(false)
  allowMultipleResponses Boolean    @default(false)

  // Target Audience
  targetAudience String[] // User roles/groups
  targetCourses  String[] // Specific courses

  // Survey Questions
  questions Json // Survey questions structure

  // Survey Status
  isActive  Boolean   @default(false)
  startDate DateTime?
  endDate   DateTime?

  // Statistics
  responseCount  Int   @default(0)
  completionRate Float @default(0)

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  responses SurveyResponse[]

  @@index([creatorId, isActive])
  @@index([surveyType, startDate])
  @@schema("feedback_schema")
}

model SurveyResponse {
  id          String  @id @default(uuid())
  surveyId    String
  responderId String? // User ID (null if anonymous)

  // Response Data
  responses  Json // Answers to survey questions
  timeSpent  Int? // Time spent in seconds
  isComplete Boolean @default(false)

  // Response Metadata
  deviceInfo String?
  ipAddress  String? // For analytics (anonymized)
  userAgent  String?

  // Timestamps
  startedAt   DateTime  @default(now())
  completedAt DateTime?

  survey Survey @relation(fields: [surveyId], references: [id], onDelete: Cascade)

  @@index([surveyId, isComplete])
  @@index([responderId])
  @@schema("feedback_schema")
}

enum FeedbackType {
  GENERAL_FEEDBACK
  BUG_REPORT
  FEATURE_REQUEST
  COURSE_REVIEW
  INSTRUCTOR_REVIEW
  PLATFORM_REVIEW
  SERVICE_FEEDBACK
  SUGGESTION
  COMPLAINT
  TESTIMONIAL

  @@schema("feedback_schema")
}

enum FeedbackStatus {
  PENDING
  UNDER_REVIEW
  IN_PROGRESS
  RESOLVED
  CLOSED
  REJECTED

  @@schema("feedback_schema")
}

enum FeedbackPriority {
  LOW
  NORMAL
  HIGH
  URGENT
  CRITICAL

  @@schema("feedback_schema")
}

enum FeedbackCategory {
  USER_EXPERIENCE
  TECHNICAL_ISSUE
  CONTENT_QUALITY
  PERFORMANCE
  SECURITY
  ACCESSIBILITY
  MOBILE_APP
  WEB_PLATFORM
  PAYMENT
  SUPPORT
  FEATURE
  OTHER

  @@schema("feedback_schema")
}

enum SentimentScore {
  VERY_NEGATIVE
  NEGATIVE
  NEUTRAL
  POSITIVE
  VERY_POSITIVE

  @@schema("feedback_schema")
}

enum ResponseType {
  COMMENT
  SOLUTION
  UPDATE
  CLARIFICATION
  ESCALATION
  CLOSURE

  @@schema("feedback_schema")
}

enum VoteType {
  HELPFUL
  UNHELPFUL
  SPAM
  INAPPROPRIATE

  @@schema("feedback_schema")
}

enum ReviewTargetType {
  COURSE
  INSTRUCTOR
  PLATFORM
  FREELANCER
  JOB_POSTER
  CONTENT
  FEATURE
  SERVICE

  @@schema("feedback_schema")
}

enum ReviewCategory {
  GENERAL
  QUALITY
  VALUE_FOR_MONEY
  USER_EXPERIENCE
  CUSTOMER_SERVICE
  TECHNICAL_PERFORMANCE
  CONTENT_ACCURACY
  INSTRUCTOR_EFFECTIVENESS

  @@schema("feedback_schema")
}

enum ReportReason {
  SPAM
  INAPPROPRIATE_CONTENT
  HARASSMENT
  FALSE_INFORMATION
  COPYRIGHT_VIOLATION
  FAKE_REVIEW
  OFFENSIVE_LANGUAGE
  OTHER

  @@schema("feedback_schema")
}

enum ReportStatus {
  PENDING
  UNDER_REVIEW
  RESOLVED
  DISMISSED

  @@schema("feedback_schema")
}

enum SurveyType {
  FEEDBACK
  SATISFACTION
  FEATURE_REQUEST
  USER_RESEARCH
  MARKET_RESEARCH
  ACADEMIC_SURVEY

  @@schema("feedback_schema")
}

// ==========================================
// STATISTICS SCHEMA - AGGREGATED STATISTICAL DATA
// ==========================================

// ==========================================
// STATISTICS MODELS

model Statistics {
  id            String   @id @default(uuid())
  institutionId String // Related institution
  departmentId  String? // Related department
  courseId      String? // Related course
  userId        String? // Related user (student or instructor)
  date          DateTime @default(now())

  // Enrollment Statistics
  totalEnrollments   Int @default(0)
  newEnrollments     Int @default(0)
  droppedEnrollments Int @default(0)

  // Course Completion Statistics
  totalCompletions Int   @default(0)
  completionRate   Float @default(0) // Percentage (0-100)

  // Revenue Statistics
  totalRevenue   Float @default(0)
  averageRevenue Float @default(0)

  // Engagement Statistics
  totalLogins   Int @default(0)
  activeUsers   Int @default(0)
  inactiveUsers Int @default(0)

  // Performance Statistics
  averageGrade Float @default(0)
  passRate     Float @default(0) // Percentage (0-100)

  // Timestamps
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @default(now()) @updatedAt
  // Relationships
  institution Institution   @relation(fields: [institutionId], references: [id], onDelete: Cascade)
  department  Department?   @relation(fields: [departmentId], references: [id], onDelete: Cascade)
  course      OnlineCourse? @relation(fields: [courseId], references: [id], onDelete: Cascade)
  user        User?         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([institutionId, date])
  @@index([departmentId, date])
  @@index([courseId, date])
  @@index([userId, date])
  @@schema("statistics_schema")
}

// ==========================================
// EDU MATRIX HUB SCHEMA - CENTRALIZED HUB FOR EDUMATRIX Thousands of institutions (school colleges, universities, etc.) and their departments, courses, events, etc. Manages the core data for the EduMatrix platform, including institutions, departments, courses, and community events. This schema serves as the backbone for the entire platform, providing a unified structure for educational entities and their relationships. 
// ==========================================

// ==========================================
// HUB MODELS
// ==========================================

model Institution {
  id          String            @id @default(uuid())
  name        String
  description String?
  type        InstitutionType   @default(UNIVERSITY)
  status      InstitutionStatus @default(ACTIVE)

  // Address & Contact  address          String?
  city        String?
  state       String?
  country     String?
  zipCode     String?
  phoneNumber String?
  email       String?
  website     String?
  // Metadata
  logoUrl     String?
  bannerUrl   String?

  // Audit Fields
  createdBy  String? // Admin who created institution
  modifiedBy String? // Last admin who modified
  deletedAt  DateTime? // Soft delete timestamp
  deletedBy  String? // Admin who deleted

  createdAt              DateTime                 @default(now())
  updatedAt              DateTime                 @default(now()) @updatedAt // Relationships
  departments            Department[]             @relation("DepartmentInstitution")
  courses                OnlineCourse[]           @relation("CourseInstitution")
  events                 CommunityEvent[]         @relation("InstitutionEvent")
  statistics             Statistics[]
  applications           InstitutionApplication[] @relation("InstitutionApplications")
  enrollments            InstitutionEnrollment[]  @relation("InstitutionEnrollments")
  programs               Program[]
  traditionalCourses     Course[]
  staff                  Staff[]
  students               Student[]
  apiKeys                ApiKey[]
  webhooks               Webhook[]
  moduleIntegrations     ModuleIntegration[]
  tenantSchemas          TenantSchema[]
  institutionalAnalytics InstitutionalAnalytics[]

  @@index([name])
  @@index([type, status])
  @@index([city, country])
  @@index([status, createdAt])
  @@index([createdBy, status])
  @@schema("edu_matrix_hub_schema")
}

model Department {
  id            String           @id @default(uuid())
  name          String
  description   String?
  institutionId String
  headId        String? // User ID of the department head
  status        DepartmentStatus @default(ACTIVE)

  // Audit Fields
  createdBy  String? // Admin who created department
  modifiedBy String? // Last admin who modified
  deletedAt  DateTime? // Soft delete timestamp
  deletedBy  String? // Admin who deleted

  // Metadata
  createdAt           DateTime              @default(now())
  updatedAt           DateTime              @default(now()) @updatedAt
  // Relationships
  institution         Institution           @relation("DepartmentInstitution", fields: [institutionId], references: [id], onDelete: Cascade)
  // Note: head reference needs to be handled carefully due to cross-schema relationships
  members             DepartmentMember[]
  courses             OnlineCourse[]        @relation("CourseDepartment")
  statistics          Statistics[]
  traditionalCourses  Course[]              @relation("DepartmentCourses")
  staff               Staff[]
  departmentAnalytics DepartmentAnalytics[]

  @@index([institutionId, name])
  @@index([status, institutionId])
  @@index([headId, status])
  @@index([createdAt, status])
  @@index([deletedAt, institutionId])
  @@schema("edu_matrix_hub_schema")
}

// ==========================================
// NOTIFICATIONS SCHEMA - NOTIFICATION MANAGEMENT SYSTEM
// ==========================================

// ==========================================
// ENUMS FOR NOTIFICATIONS SCHEMA
// ==========================================

enum NotificationType {
  SYSTEM_ALERT
  COURSE_UPDATE
  ASSIGNMENT_DUE
  GRADE_POSTED
  MESSAGE_RECEIVED
  COMMENT_REPLY
  POST_LIKED
  FOLLOW_REQUEST
  FRIEND_REQUEST
  EVENT_REMINDER
  JOB_APPLICATION
  FREELANCE_PROPOSAL
  NEWS_PUBLISHED
  FEEDBACK_RESPONSE
  ACHIEVEMENT_UNLOCKED
  PAYMENT_RECEIVED
  ENROLLMENT_CONFIRMED
  CERTIFICATE_ISSUED

  @@schema("notifications_schema")
}

enum NotificationCategory {
  EDUCATIONAL
  SOCIAL
  FINANCIAL
  ADMINISTRATIVE
  TECHNICAL
  MARKETING
  SECURITY
  ACHIEVEMENT

  @@schema("notifications_schema")
}

enum NotificationPriority {
  LOW
  NORMAL
  HIGH
  URGENT
  CRITICAL

  @@schema("notifications_schema")
}

enum NotificationChannel {
  IN_APP
  EMAIL
  SMS
  PUSH
  WEBHOOK

  @@schema("notifications_schema")
}

enum NotificationStatus {
  PENDING
  SENT
  DELIVERED
  READ
  DISMISSED
  FAILED

  @@schema("notifications_schema")
}

enum DeliveryStatus {
  PENDING
  PROCESSING
  DELIVERED
  FAILED
  BOUNCED
  BLOCKED

  @@schema("notifications_schema")
}

enum DigestFrequency {
  IMMEDIATE
  HOURLY
  DAILY
  WEEKLY
  NEVER

  @@schema("notifications_schema")
}

enum InteractionType {
  VIEWED
  CLICKED
  DISMISSED
  SNOOZED
  SHARED
  REPORTED

  @@schema("notifications_schema")
}

model Notification {
  id     String @id @default(uuid())
  userId String // User ID from auth_schema

  // Notification Content
  title        String
  message      String
  shortMessage String? // For SMS/push notifications

  // Notification Classification
  type     NotificationType
  category NotificationCategory
  priority NotificationPriority @default(NORMAL)

  // Context & Actions
  entityType  String? // Type of related entity (Post, Course, etc.)
  entityId    String? // ID of related entity
  actionUrl   String? // URL to take action
  actionLabel String? // Label for action button

  // Rich Content
  imageUrl String? // Notification image
  iconUrl  String? // Notification icon
  data     Json? // Additional structured data

  // Delivery Settings
  channels     NotificationChannel[] // Delivery channels
  scheduledFor DateTime? // Scheduled delivery time
  expiresAt    DateTime? // When notification expires

  // Status Tracking
  status      NotificationStatus @default(PENDING)
  isRead      Boolean            @default(false)
  readAt      DateTime?
  dismissedAt DateTime?

  // Grouping
  groupId      String? // For grouping related notifications
  batchId      String? // For batch processing
  // Metadata
  sourceSystem String? // Which system generated this
  templateId   String? // Template used for generation
  campaignId   String? // Marketing campaign ID
  preferenceId String? // Reference to notification preference

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  preference   NotificationPreference?   @relation(fields: [preferenceId], references: [id])
  deliveries   NotificationDelivery[]
  interactions NotificationInteraction[]

  @@index([userId, status])
  @@index([type, category])
  @@index([createdAt, priority])
  @@index([groupId, batchId])
  @@index([scheduledFor, status])
  @@schema("notifications_schema")
}

model NotificationDelivery {
  id             String              @id @default(uuid())
  notificationId String
  channel        NotificationChannel

  // Delivery Details
  status           DeliveryStatus @default(PENDING)
  recipientAddress String // Email, phone, device token

  // Provider Information
  provider   String? // Email/SMS provider
  providerId String? // Provider's message ID

  // Delivery Tracking
  sentAt       DateTime?
  deliveredAt  DateTime?
  failedAt     DateTime?
  errorMessage String?
  retryCount   Int       @default(0)

  // Response Tracking
  opened    Boolean   @default(false)
  openedAt  DateTime?
  clicked   Boolean   @default(false)
  clickedAt DateTime?

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  notification Notification @relation(fields: [notificationId], references: [id], onDelete: Cascade)

  @@index([notificationId])
  @@index([status, sentAt])
  @@schema("notifications_schema")
}

model NotificationPreference {
  id     String @id @default(uuid())
  userId String @unique // User ID from auth_schema

  // Global Settings
  globalEnabled Boolean @default(true)
  emailEnabled  Boolean @default(true)
  smsEnabled    Boolean @default(false)
  pushEnabled   Boolean @default(true)

  // Frequency Settings
  digestFrequency DigestFrequency @default(DAILY)
  quietHoursStart String? // "22:00"
  quietHoursEnd   String? // "08:00"
  timezone        String          @default("UTC")

  // Category Preferences
  educationalNotifications    Boolean @default(true)
  socialNotifications         Boolean @default(true)
  financialNotifications      Boolean @default(true)
  administrativeNotifications Boolean @default(true)
  technicalNotifications      Boolean @default(false)
  marketingNotifications      Boolean @default(false)
  securityNotifications       Boolean @default(true)
  achievementNotifications    Boolean @default(true)

  // Specific Type Preferences
  courseUpdates        Boolean @default(true)
  assignmentReminders  Boolean @default(true)
  gradeNotifications   Boolean @default(true)
  messageNotifications Boolean @default(true)
  socialInteractions   Boolean @default(true)
  jobOpportunities     Boolean @default(false)
  newsUpdates          Boolean @default(false)

  // Channel Preferences per Category (stored as JSON for flexibility)
  educationalChannels    Json? // Array of NotificationChannel enums
  socialChannels         Json? // Array of NotificationChannel enums
  financialChannels      Json? // Array of NotificationChannel enums
  administrativeChannels Json? // Array of NotificationChannel enums

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  // Relationships
  notifications Notification[]

  @@schema("notifications_schema")
}

model NotificationTemplate {
  id String @id @default(uuid())

  // Template Identification
  templateKey String  @unique // Unique identifier
  name        String // Human readable name
  description String?

  // Template Content
  titleTemplate   String // Title with placeholders
  messageTemplate String // Message with placeholders
  shortTemplate   String? // Short message template

  // Template Configuration
  type     NotificationType
  category NotificationCategory
  priority NotificationPriority  @default(NORMAL)
  channels NotificationChannel[]

  // Template Variables
  variables  Json // Available variables for template
  sampleData Json? // Sample data for testing

  // Template Settings
  isActive         Boolean @default(true)
  requiresApproval Boolean @default(false)

  // Localization
  language      String @default("en")
  localizations Json? // Other language versions

  // Metadata
  version   String @default("1.0")
  createdBy String // User ID

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  @@index([templateKey, isActive])
  @@index([type, category])
  @@schema("notifications_schema")
}

model NotificationGroup {
  id String @id @default(uuid())

  // Group Details
  name        String
  description String?
  groupKey    String  @unique // For programmatic access

  // Group Configuration
  type             NotificationType
  category         NotificationCategory
  maxNotifications Int? // Max notifications in group
  mergeTimeWindow  Int? // Time window for merging (minutes)

  // Group Status
  isActive Boolean @default(true)

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  @@index([groupKey, isActive])
  @@schema("notifications_schema")
}

model NotificationInteraction {
  id             String @id @default(uuid())
  notificationId String
  userId         String // User ID from auth_schema

  // Interaction Details
  interactionType InteractionType
  interactionData Json? // Additional interaction data

  // Timestamps
  createdAt DateTime @default(now())

  notification Notification @relation(fields: [notificationId], references: [id], onDelete: Cascade)

  @@index([notificationId, interactionType])
  @@index([userId, createdAt])
  @@schema("notifications_schema")
}

model NotificationAnalytics {
  id   String   @id @default(uuid())
  date DateTime

  // Volume Metrics
  totalSent      Int @default(0)
  totalDelivered Int @default(0)
  totalFailed    Int @default(0)
  totalRead      Int @default(0)
  totalClicked   Int @default(0)

  // Channel Breakdown
  emailSent      Int @default(0)
  emailDelivered Int @default(0)
  smsSent        Int @default(0)
  smsDelivered   Int @default(0)
  pushSent       Int @default(0)
  pushDelivered  Int @default(0)

  // Category Breakdown
  educationalSent Int @default(0)
  socialSent      Int @default(0)
  financialSent   Int @default(0)

  // Performance Metrics
  averageDeliveryTime Int   @default(0) // Seconds
  openRate            Float @default(0) // Percentage
  clickRate           Float @default(0) // Percentage

  // Timestamps
  createdAt DateTime @default(now())

  @@unique([date])
  @@schema("notifications_schema")
}

// ==========================================
// EDU MATRIX HUB SCHEMA ENUMS
// ==========================================

enum InstitutionType {
  UNIVERSITY
  COLLEGE
  SCHOOL
  ACADEMY
  TRAINING_CENTER

  @@schema("edu_matrix_hub_schema")
}

enum InstitutionStatus {
  ACTIVE
  SUSPENDED
  INACTIVE
  PENDING
  ARCHIVED

  @@schema("edu_matrix_hub_schema")
}

enum InstitutionApplicationStatus {
  PENDING // Application submitted, awaiting review
  UNDER_REVIEW // Admin is reviewing
  ACCEPTED // Application approved
  REJECTED // Application denied
  WITHDRAWN // Applicant withdrew
  EXPIRED // Application deadline passed

  @@schema("edu_matrix_hub_schema")
}

enum InstitutionMemberRole {
  OWNER // Institution creator/owner
  ADMIN // Institution administrator  
  PRINCIPAL // School principal
  DEPARTMENT_HEAD // Department head
  TEACHER // Faculty/instructor
  STUDENT // Enrolled student
  STAFF // Administrative staff
  GUEST // Guest/visitor
  ALUMNI // Former student

  @@schema("edu_matrix_hub_schema")
}

enum InstitutionMemberStatus {
  ACTIVE
  SUSPENDED
  INACTIVE
  PENDING
  EXPELLED
  GRADUATED
  TRANSFERRED

  @@schema("edu_matrix_hub_schema")
}

enum DepartmentStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  REORGANIZING

  @@schema("edu_matrix_hub_schema")
}

enum EventType {
  ACADEMIC
  WORKSHOP
  SEMINAR
  MEETING
  STUDY_SESSION
  PRESENTATION
  SOCIAL

  @@schema("edu_matrix_hub_schema")
}

enum EventAttendanceStatus {
  INTERESTED
  GOING
  MAYBE
  NOT_GOING
  ATTENDED
  NO_SHOW

  @@schema("edu_matrix_hub_schema")
}

// ==========================================
// EDUCATIONAL HUB SCHEMA
// ==========================================
// Domain: Institution Management & Educational Structure
// Schema: edu_matrix_hub_schema
// Description: Core educational institution management including 
//              institutions, departments, programs, staff, students, 
//              API management, and multi-tenant infrastructure

// ==========================================
// DUPLICATE ENUMS REMOVED TO FIX COMPILATION ERRORS
// Original definitions exist in earlier sections of the schema
// ==========================================

enum AttendanceStatus {
  PRESENT
  ABSENT
  LATE
  EXCUSED
  PARTIAL

  @@schema("edu_matrix_hub_schema")
}

enum StaffRole {
  ADMIN
  TEACHER
  COORDINATOR
  LIBRARIAN
  STAFF

  @@schema("edu_matrix_hub_schema")
}

enum StaffStatus {
  ACTIVE
  ON_LEAVE
  INACTIVE
  TERMINATED

  @@schema("edu_matrix_hub_schema")
}

enum StudentStatus {
  ACTIVE
  INACTIVE
  GRADUATED
  SUSPENDED
  WITHDRAWN

  @@schema("edu_matrix_hub_schema")
}

enum ProgramType {
  UNDERGRADUATE
  GRADUATE
  DIPLOMA
  CERTIFICATE
  PROFESSIONAL

  @@schema("edu_matrix_hub_schema")
}

enum SubscriptionTier {
  BASIC
  STANDARD
  PREMIUM
  ENTERPRISE

  @@schema("edu_matrix_hub_schema")
}

enum SchemaStatus {
  ACTIVE
  INACTIVE
  MAINTENANCE
  MIGRATING

  @@schema("edu_matrix_hub_schema")
}

enum OperationType {
  CREATE
  UPDATE
  DELETE
  BACKUP
  RESTORE
  MIGRATE

  @@schema("edu_matrix_hub_schema")
}

enum OperationStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
  CANCELLED

  @@schema("edu_matrix_hub_schema")
}

enum GradeType {
  QUIZ
  ASSIGNMENT
  EXAM
  PROJECT
  PARTICIPATION
  FINAL

  @@schema("edu_matrix_hub_schema")
}

// ==========================================
// CORE INSTITUTION MODELS
// ==========================================

// ==========================================
// DUPLICATE MODELS REMOVED TO FIX COMPILATION ERRORS
// Original Institution and Department models exist in earlier sections
// ==========================================

// InstitutionMember model is defined in auth.prisma - using cross-schema reference

model InstitutionApplication {
  id              String                       @id @default(uuid())
  applicantUserId String // References User from auth_schema
  institutionId   String
  status          InstitutionApplicationStatus @default(PENDING)
  applicationData Json                         @default("{}")

  // Application Processing
  reviewedByUserId String? // Admin who reviewed
  reviewedAt       DateTime?
  reviewNotes      String?
  rejectionReason  String?

  submittedAt DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  institution Institution            @relation("InstitutionApplications", fields: [institutionId], references: [id])
  enrollment  InstitutionEnrollment? // Created when accepted

  @@unique([applicantUserId, institutionId])
  @@schema("edu_matrix_hub_schema")
}

model InstitutionEnrollment {
  id            String           @id @default(uuid())
  studentUserId String // References User from auth_schema
  institutionId String
  applicationId String           @unique
  studentId     String // Institution student ID
  status        EnrollmentStatus @default(ACTIVE)
  enrolledAt    DateTime         @default(now())
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt

  // Relations
  institution Institution            @relation("InstitutionEnrollments", fields: [institutionId], references: [id])
  application InstitutionApplication @relation(fields: [applicationId], references: [id])

  @@unique([institutionId, studentId])
  @@schema("edu_matrix_hub_schema")
}

// ==========================================
// DUPLICATE DEPARTMENT MODEL REMOVED TO FIX COMPILATION ERRORS
// Original Department model exists in earlier section
// ==========================================

// DepartmentMember model is defined in auth.prisma - using cross-schema reference

model Program {
  id            String      @id @default(uuid())
  institutionId String
  name          String
  code          String
  type          ProgramType
  duration      Int // Duration in months/semesters
  description   String
  requirements  String[]    @default([])
  credits       Int? // Total credits required
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  // Relations
  institution Institution          @relation(fields: [institutionId], references: [id])
  courses     Course[]
  students    Student[]            @relation("StudentProgram")
  programReqs ProgramRequirement[]
  attendance  Attendance[]         @relation("ProgramAttendance")

  @@unique([institutionId, code])
  @@schema("edu_matrix_hub_schema")
}

model ProgramRequirement {
  id          String   @id @default(uuid())
  programId   String
  type        String // "CORE", "ELECTIVE", "PREREQUISITE"
  description String
  credits     Int
  courses     String[] @default([])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  program Program @relation(fields: [programId], references: [id])

  @@schema("edu_matrix_hub_schema")
}

model Course {
  id            String             @id @default(uuid())
  institutionId String
  departmentId  String
  programId     String?
  code          String
  name          String
  description   String
  credits       Int
  syllabus      String?
  prerequisites String[]           @default([])
  isActive      Boolean            @default(true)
  createdAt     DateTime           @default(now())
  updatedAt     DateTime           @updatedAt
  // Relations
  institution   Institution        @relation(fields: [institutionId], references: [id])
  department    Department         @relation("DepartmentCourses", fields: [departmentId], references: [id])
  program       Program?           @relation(fields: [programId], references: [id])
  instructors   CourseInstructor[]
  // enrollments CourseEnrollment[] - defined in courses.prisma
  attendance    Attendance[]
  grades        Grade[]
  assignments   Assignment[]
  examinations  Examination[]
  schedule      Schedule[]

  @@unique([institutionId, code])
  @@schema("edu_matrix_hub_schema")
}

model CourseInstructor {
  id           String   @id @default(uuid())
  courseId     String
  instructorId String // References Staff.id
  role         String   @default("PRIMARY") // PRIMARY, ASSISTANT, GUEST
  assignedAt   DateTime @default(now())
  isActive     Boolean  @default(true)

  // Relations
  course     Course @relation(fields: [courseId], references: [id])
  instructor Staff  @relation(fields: [instructorId], references: [id])

  @@unique([courseId, instructorId])
  @@schema("edu_matrix_hub_schema")
}

// CourseEnrollment model is defined in courses.prisma - using cross-schema reference

// ==========================================
// PEOPLE MODELS (STAFF & STUDENTS)
// ==========================================

model Staff {
  id              String      @id @default(uuid())
  userId          String      @unique // References User from auth_schema
  institutionId   String
  departmentId    String
  employeeId      String // Institution-specific employee ID
  role            StaffRole
  status          StaffStatus @default(ACTIVE)
  hireDate        DateTime    @default(now())
  contractType    String? // Full-time, Part-time, Contract
  salary          Decimal?
  qualifications  String[]    @default([])
  specializations String[]    @default([])
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  // Relations
  institution       Institution        @relation(fields: [institutionId], references: [id])
  department        Department         @relation(fields: [departmentId], references: [id])
  courseInstructors CourseInstructor[]

  @@unique([institutionId, employeeId])
  @@schema("edu_matrix_hub_schema")
}

model Student {
  id             String             @id @default(uuid())
  userId         String             @unique // References User from auth_schema
  institutionId  String
  studentId      String // Institution-specific student ID
  programId      String?
  year           Int?
  semester       Int?
  status         StudentStatus      @default(ACTIVE)
  enrollmentDate DateTime           @default(now())
  graduationDate DateTime?
  gpa            Decimal?
  totalCredits   Int?               @default(0)
  createdAt      DateTime           @default(now())
  updatedAt      DateTime           @updatedAt
  // Relations
  institution    Institution        @relation(fields: [institutionId], references: [id])
  program        Program?           @relation("StudentProgram", fields: [programId], references: [id])
  // enrollments  CourseEnrollment[]    - defined in courses.prisma
  attendance     Attendance[]
  grades         Grade[]
  // assignments  AssignmentSubmission[] - defined in courses.prisma
  examResults    ExamResult[]
  payments       Payment[]
  scholarships   ScholarshipAward[]

  @@unique([institutionId, studentId])
  @@schema("edu_matrix_hub_schema")
}

// ==========================================
// ACADEMIC ACTIVITY MODELS
// ==========================================

model Attendance {
  id        String           @id @default(uuid())
  courseId  String
  studentId String
  programId String?
  date      DateTime         @db.Date
  status    AttendanceStatus
  note      String?
  markedAt  DateTime         @default(now())
  updatedAt DateTime         @updatedAt

  // Relations
  course  Course   @relation(fields: [courseId], references: [id])
  student Student  @relation(fields: [studentId], references: [id])
  program Program? @relation("ProgramAttendance", fields: [programId], references: [id])

  @@unique([courseId, studentId, date])
  @@schema("edu_matrix_hub_schema")
}

model Grade {
  id        String    @id @default(uuid())
  studentId String
  courseId  String
  type      GradeType
  score     Decimal
  maxScore  Decimal
  weight    Decimal   @default(1.0)
  feedback  String?
  gradedAt  DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  // Relations
  student Student @relation(fields: [studentId], references: [id])
  course  Course  @relation(fields: [courseId], references: [id])

  @@unique([studentId, courseId, type])
  @@schema("edu_matrix_hub_schema")
}

model Assignment {
  id           String   @id @default(uuid())
  courseId     String
  title        String
  description  String
  dueDate      DateTime
  maxScore     Decimal
  weight       Decimal  @default(1.0)
  instructions String?
  attachments  String[] @default([])
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  // Relations
  course       Course   @relation(fields: [courseId], references: [id])
  // submissions AssignmentSubmission[] - defined in courses.prisma

  @@schema("edu_matrix_hub_schema")
}

// AssignmentSubmission model is defined in courses.prisma - using cross-schema reference

model Examination {
  id           String   @id @default(uuid())
  courseId     String
  title        String
  description  String?
  examDate     DateTime
  duration     Int // Duration in minutes
  maxScore     Decimal
  weight       Decimal  @default(1.0)
  instructions String?
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Relations
  course  Course       @relation(fields: [courseId], references: [id])
  results ExamResult[]

  @@schema("edu_matrix_hub_schema")
}

model ExamResult {
  id            String    @id @default(uuid())
  examinationId String
  studentId     String
  score         Decimal
  answers       Json?     @default("{}")
  startedAt     DateTime
  submittedAt   DateTime?
  gradedAt      DateTime?
  feedback      String?

  // Relations
  examination Examination @relation(fields: [examinationId], references: [id])
  student     Student     @relation(fields: [studentId], references: [id])

  @@unique([examinationId, studentId])
  @@schema("edu_matrix_hub_schema")
}

model Schedule {
  id        String   @id @default(uuid())
  courseId  String
  dayOfWeek Int // 0 = Sunday, 1 = Monday, etc.
  startTime String // HH:MM format
  endTime   String // HH:MM format
  room      String?
  building  String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  course Course @relation(fields: [courseId], references: [id])

  @@schema("edu_matrix_hub_schema")
}

// ==========================================
// FINANCIAL MODELS
// ==========================================

model Payment {
  id            String    @id @default(uuid())
  studentId     String
  amount        Decimal
  currency      String    @default("USD")
  type          String // TUITION, FEES, BOOKS, etc.
  description   String?
  status        String    @default("PENDING") // PENDING, COMPLETED, FAILED, REFUNDED
  paymentMethod String?
  transactionId String?
  dueDate       DateTime?
  paidAt        DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  student Student @relation(fields: [studentId], references: [id])

  @@schema("edu_matrix_hub_schema")
}

model ScholarshipAward {
  id         String   @id @default(uuid())
  studentId  String
  name       String
  amount     Decimal
  currency   String   @default("USD")
  type       String // MERIT, NEED_BASED, ATHLETIC, etc.
  startDate  DateTime
  endDate    DateTime
  status     String   @default("ACTIVE") // ACTIVE, SUSPENDED, COMPLETED
  conditions String? // Terms and conditions
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  // Relations
  student Student @relation(fields: [studentId], references: [id])

  @@schema("edu_matrix_hub_schema")
}

// ==========================================
// SYSTEM MANAGEMENT MODELS
// ==========================================

model ApiKey {
  id            String    @id @default(uuid())
  institutionId String
  key           String    @unique
  name          String
  description   String?
  scopes        String[]  @default([])
  isActive      Boolean   @default(true)
  expiresAt     DateTime?
  createdAt     DateTime  @default(now())
  lastUsedAt    DateTime?
  usageCount    Int       @default(0)

  // Relations
  institution Institution @relation(fields: [institutionId], references: [id])

  @@schema("edu_matrix_hub_schema")
}

model Webhook {
  id            String    @id @default(uuid())
  institutionId String
  name          String
  url           String
  events        String[]  @default([])
  isActive      Boolean   @default(true)
  secret        String
  headers       Json?     @default("{}")
  retryCount    Int       @default(3)
  timeout       Int       @default(30) // seconds
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastTriggered DateTime?

  // Relations
  institution Institution @relation(fields: [institutionId], references: [id])

  @@schema("edu_matrix_hub_schema")
}

model ModuleIntegration {
  id            String   @id @default(uuid())
  institutionId String
  moduleName    String // "courses", "social", "jobs", etc.
  isEnabled     Boolean  @default(false)
  configuration Json     @default("{}")
  permissions   String[] @default([])
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  institution Institution @relation(fields: [institutionId], references: [id])

  @@unique([institutionId, moduleName])
  @@schema("edu_matrix_hub_schema")
}

// ==========================================
// MULTI-TENANT INFRASTRUCTURE
// ==========================================

model TenantSchema {
  id            String       @id @default(uuid())
  institutionId String       @unique
  schemaName    String       @unique
  status        SchemaStatus @default(ACTIVE)
  configuration Json         @default("{}")
  version       Int          @default(1)
  tableCount    Int          @default(0)
  storageUsed   BigInt       @default(0)
  quotaLimit    BigInt
  lastOptimized DateTime?
  lastBackup    DateTime?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  // Relations
  institution Institution       @relation(fields: [institutionId], references: [id])
  operations  SchemaOperation[]

  @@schema("edu_matrix_hub_schema")
}

model SchemaOperation {
  id          String          @id @default(uuid())
  schemaId    String
  type        OperationType
  status      OperationStatus @default(PENDING)
  description String
  metadata    Json?           @default("{}")
  error       String?
  startedAt   DateTime?
  completedAt DateTime?
  duration    Int? // Duration in seconds
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  // Relations
  schema TenantSchema @relation(fields: [schemaId], references: [id])

  @@schema("edu_matrix_hub_schema")
}

// ==========================================
// ANALYTICS MODELS
// ==========================================

model InstitutionalAnalytics {
  id             String   @id @default(uuid())
  institutionId  String
  date           DateTime @db.Date
  totalStudents  Int      @default(0)
  totalStaff     Int      @default(0)
  totalCourses   Int      @default(0)
  totalPrograms  Int      @default(0)
  activeUsers    Int      @default(0)
  storageUsed    BigInt   @default(0)
  apiCalls       Int      @default(0)
  averageGpa     Decimal?
  attendanceRate Decimal?
  completionRate Decimal?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Relations
  institution Institution @relation(fields: [institutionId], references: [id])

  @@unique([institutionId, date])
  @@schema("edu_matrix_hub_schema")
}

model DepartmentAnalytics {
  id             String   @id @default(uuid())
  departmentId   String
  date           DateTime @db.Date
  totalStudents  Int      @default(0)
  totalStaff     Int      @default(0)
  totalCourses   Int      @default(0)
  averageGpa     Decimal?
  attendanceRate Decimal?
  completionRate Decimal?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Relations
  department Department @relation(fields: [departmentId], references: [id])

  @@unique([departmentId, date])
  @@schema("edu_matrix_hub_schema")
}

// ==========================================
