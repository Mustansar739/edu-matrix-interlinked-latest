# EDU MATRIX INTERLINKED - SCHEMAS AND MODELS STRUCTURE

## Schema Overview
The Edu Matrix Interlinked platform uses a multi-schema architecture with 12 distinct schemas, each serving specific domain functionalities. The system supports multi-tenant educational institutions with comprehensive social features, job boards, freelancing platforms, and educational management.

**✅ STATUS**: All critical cross-schema relation violations have been systematically removed in Phase 1 fixes. Schema now compiles successfully.

**🔧 RECENT UPDATES**: Multi-tenant support added with `institutionId` fields and corresponding indexes for efficient institution-based filtering.

---

## 1. AUTH_SCHEMA
**Domain**: Authentication & Authorization  
**Purpose**: User management, security, and access control

### Models:
- **User** - Core user model with roles, permissions, and profile data
- **InstitutionMember** - Institution membership management
- **DepartmentMember** - Department-level memberships (✅ Fixed malformed fields)
- **ClassMember** - Class/course memberships  
- **TeachingAssignment** - Teacher-course assignments
- **StudentEnrollment** - Student course enrollments
- **Account** - NextAuth 5 OAuth accounts
- **Session** - User session management
- **VerificationToken** - Email/phone verification tokens
- **PasswordReset** - Password reset functionality
- **EmailVerification** - Email verification workflow
- **AuthAttempt** - Login attempt tracking
- **AuditLog** - Security audit logging

### Additional Models:
- **UserRole** - User role definitions
- **UserPermission** - User permission management
- **UserSession** - Extended session tracking
- **UserPreference** - User preference settings
- **UserSetting** - User configuration settings
- **UserDevice** - Device management
- **UserLocation** - Location tracking

**Total Models**: 20

---

## 2. SOCIAL_SCHEMA
**Domain**: Social Networking Platform  
**Purpose**: Facebook-like social features for educational community

### Core Social Models:
- **SocialPost** - Main social posts with rich content (✅ Multi-tenant support added)
- **SocialPostLike** - Post likes/reactions
- **SocialPostComment** - Post comments with threading
- **SocialPostShare** - Post sharing functionality  
- **SocialPostBookmark** - Post bookmarking
- **Follow** - User following relationships
- **Friend** - Friend connections

### Story Features:
- **Story** - Instagram-like stories
- **StoryView** - Story view tracking
- **StoryReaction** - Story reactions
- **StoryReply** - Story replies

### Additional Features:
- **PostMedia** - Media attachments
- **PostTag** - Post tagging system
- **SocialGroup** - Social groups
- **GroupMember** - Group memberships
- **GroupPost** - Group-specific posts
- **SocialEvent** - Social events
- **EventAttendee** - Event attendance

**Total Models**: 17

---

## 3. COURSES_SCHEMA
**Domain**: Online Course Management  
**Purpose**: Comprehensive online learning platform (Coursera-like)

### Core Course Models:
- **OnlineCourse** - Main course information (✅ Cross-schema relations removed)
- **CourseEnrollment** - Student course enrollments
- **CourseLesson** - Individual lessons within courses
- **LessonProgress** - Student lesson progress tracking

### Assessment Models:
- **CourseQuiz** - Course assessments and quizzes
- **QuizAttempt** - Quiz attempts and scores
- **CourseAssignment** - Course assignments
- **AssignmentSubmission** - Assignment submissions

### Interaction Models:
- **CourseDiscussion** - Course discussion forums
- **DiscussionReply** - Discussion replies
- **CourseReview** - Course ratings and reviews

### Resource Models:
- **CourseMaterial** - Course resources and materials
- **CourseCertificate** - Course completion certificates
- **CourseAnalytics** - Course performance analytics

### Additional Models:
- **CourseModule** - Course modules
- **ModuleLesson** - Module lessons
- **LessonResource** - Lesson resources
- **CourseNotification** - Course notifications
- **CourseCategory** - Course categorization
- **CourseTag** - Course tagging
- **CoursePrerequisite** - Course prerequisites

**Total Models**: 21

---

## 4. JOBS_SCHEMA
**Domain**: Job Posting Platform  
**Purpose**: Facebook-style job posting and application system

### Core Job Models:
- **JobPost** - Job postings with social features (✅ Multi-tenant support added)
- **JobPostLike** - Job post likes
- **JobPostComment** - Job post comments
- **JobPostShare** - Job post sharing
- **JobApplication** - Job applications
- **SalaryRange** - Job salary information

### Additional Models:
- **JobCategory** - Job categorization
- **JobSkill** - Job skills
- **JobCompany** - Company information
- **JobLocation** - Job locations
- **ApplicationStatus** - Application tracking

**Total Models**: 11

---

## 5. FREELANCING_SCHEMA
**Domain**: Freelancing Marketplace  
**Purpose**: Educational freelancing platform with social features

### Core Freelance Models:
- **FreelancePost** - Freelance project postings (✅ Multi-tenant support added)
- **FreelancePostLike** - Freelance post likes
- **FreelancePostComment** - Freelance post comments
- **FreelancePostShare** - Freelance post sharing
- **Proposal** - Freelancer proposals
- **FreelanceReview** - Freelancer reviews and ratings

### Additional Models:
- **FreelanceSkill** - Freelancer skills
- **FreelancePortfolio** - Portfolio management
- **FreelanceContract** - Contract management
- **FreelancePayment** - Payment tracking
- **FreelanceDispute** - Dispute resolution
- **FreelanceMilestone** - Project milestones

**Total Models**: 12

---

## 6. RATING_SCHEMA
**Domain**: Universal Rating System  
**Purpose**: Cross-platform rating and review system

### Rating Models:
- **UniversalRating** - Universal rating system (✅ Cross-schema relations removed)
- **RatingCategoryScore** - Category-based ratings
- **RatingRelationship** - Rating relationships

### Additional Models:
- **RatingCategory** - Rating categories
- **RatingCriteria** - Rating criteria
- **RatingAnalytics** - Rating analytics
- **RatingReport** - Rating reports
- **RatingResponse** - Rating responses

**Total Models**: 8

---

## 7. NEWS_SCHEMA
**Domain**: News and Updates Platform  
**Purpose**: Educational news with comprehensive Facebook-like social interaction features

### Core News Models:
- **NewsPost** - Main news posts with rich content, verification, categorization, and engagement metrics (✅ Multi-tenant support added)
- **NewsPostLike** - News post likes/reactions (like, love, informative, helpful)
- **NewsPostComment** - News post comments with nested threading and moderation
- **NewsPostShare** - News post sharing with custom captions and platform tracking
- **NewsAnalytics** - Comprehensive news engagement and performance analytics

### Additional Models:
- **NewsCategory** - News categorization
- **NewsTag** - News tagging
- **NewsSource** - News sources
- **NewsSubscription** - News subscriptions
- **NewsNotification** - News notifications

### Enums:
- **NewsType** - Educational content classification (EDUCATIONAL, INSTITUTIONAL, ACADEMIC, etc.)
- **NewsCategory** - News categorization (GENERAL, ADMISSIONS, EXAMINATIONS, etc.)
- **NewsPostStatus** - Post lifecycle (DRAFT, PUBLISHED, SCHEDULED, ARCHIVED, DELETED)
- **NewsPostVisibility** - Access control (PUBLIC, INSTITUTION_ONLY, STUDENTS_ONLY, etc.)
- **NewsPriority** - Content priority levels (LOW, NORMAL, HIGH, URGENT, BREAKING)

**Total Models**: 10

---

## 8. COMMUNITY_SCHEMA
**Domain**: Community Engagement Platform  
**Purpose**: Forums, discussions, and community events

### Core Community Models:
- **ChatGroup** - Community groups (✅ Multi-tenant support added)
- **ChatGroupMember** - Group memberships
- **ChatMessage** - Group messages
- **VoiceCall** - Voice call functionality
- **VoiceCallParticipant** - Call participants
- **UserInterest** - User interests
- **UserMatch** - User matching system

### Additional Models:
- **CommunityForum** - Community forums
- **ForumTopic** - Forum topics
- **ForumPost** - Forum posts
- **CommunityEvent** - Community events
- **EventAttendee** - Event attendance
- **CommunityResource** - Shared resources
- **CommunityPoll** - Community polls
- **PollVote** - Poll voting
- **CommunityAnnouncement** - Announcements

**Total Models**: 16

---

## 9. MESSAGES_SCHEMA
**Domain**: Private Messaging System  
**Purpose**: WhatsApp-like private messaging functionality

### Core Messaging Models:
- **Conversation** - Private conversations
- **ConversationParticipant** - Conversation participants
- **Message** - Private messages
- **MessageRead** - Message read status
- **MessageReaction** - Message reactions
- **TypingIndicator** - Typing indicators
- **MessageDraft** - Message drafts
- **MessageAnalytics** - Message analytics
- **BlockedUser** - Blocked users

### Additional Models:
- **MessageMedia** - Message media attachments
- **MessageForward** - Message forwarding
- **MessageThread** - Message threading
- **ConversationSettings** - Conversation settings

**Total Models**: 13

---

## 10. FEEDBACK_SCHEMA
**Domain**: Feedback and Survey System  
**Purpose**: Institutional feedback collection and management

### Core Feedback Models:
- **Feedback** - General feedback submissions
- **FeedbackResponse** - Feedback responses
- **FeedbackVote** - Feedback voting system
- **Review** - Product/service reviews
- **ReviewVote** - Review voting
- **ReviewReport** - Review reporting
- **Survey** - Survey creation and management
- **SurveyResponse** - Survey responses

### Additional Models:
- **FeedbackCategory** - Feedback categorization
- **FeedbackTemplate** - Feedback templates
- **SurveyQuestion** - Survey questions
- **QuestionOption** - Question options
- **SurveyAnalytics** - Survey analytics
- **FeedbackAnalytics** - Feedback analytics
- **ReviewAnalytics** - Review analytics
- **SurveyInvitation** - Survey invitations
- **FeedbackTag** - Feedback tagging
- **ReviewTag** - Review tagging
- **SurveyTag** - Survey tagging

**Total Models**: 19

---

## 11. NOTIFICATIONS_SCHEMA
**Domain**: Notification Management System  
**Purpose**: Real-time notifications across all platforms

### Core Notification Models:
- **Notification** - Core notification model (✅ Multi-tenant support added)
- **NotificationDelivery** - Notification delivery tracking
- **NotificationPreference** - User notification preferences
- **NotificationTemplate** - Notification templates
- **NotificationGroup** - Grouped notifications
- **NotificationInteraction** - Notification interactions
- **NotificationAnalytics** - Notification performance metrics

### Additional Models:
- **NotificationChannel** - Notification channels
- **NotificationRule** - Notification rules
- **NotificationSchedule** - Notification scheduling
- **NotificationBatch** - Batch notifications
- **NotificationFilter** - Notification filtering
- **NotificationHistory** - Notification history
- **PushSubscription** - Push notification subscriptions
- **EmailSubscription** - Email subscriptions

**Total Models**: 15

---

## 12. STATISTICS_SCHEMA
**Domain**: Analytics and Reporting  
**Purpose**: Platform-wide analytics and institutional statistics

### Statistics Models:
- **Statistics** - Comprehensive platform statistics (✅ Cross-schema relations removed)

### Additional Analytics Models:
- **UserAnalytics** - User behavior analytics
- **ContentAnalytics** - Content performance analytics
- **EngagementAnalytics** - Engagement metrics
- **TrafficAnalytics** - Traffic analysis
- **ConversionAnalytics** - Conversion tracking
- **RevenueAnalytics** - Revenue analytics
- **PerformanceMetrics** - Performance metrics
- **UsageStatistics** - Usage statistics
- **TrendAnalysis** - Trend analysis
- **ReportGeneration** - Report generation

**Total Models**: 10

---

## 13. EDU_MATRIX_HUB_SCHEMA
**Domain**: Educational Institution Management  
**Purpose**: Core institutional management and multi-tenant support

### Core Institution Models:
- **Institution** - Educational institutions (✅ Cross-schema relations removed)
- **Department** - Institution departments (✅ Cross-schema relations removed)
- **Program** - Academic programs
- **Course** - Traditional courses
- **Assignment** - Course assignments
- **Examination** - Examination management

### Management Models:
- **Staff** - Institution staff management
- **Student** - Student management
- **Attendance** - Attendance tracking
- **Grade** - Grading system
- **Schedule** - Class scheduling
- **Payment** - Financial transactions
- **ScholarshipAward** - Scholarship management

### Integration Models:
- **ApiKey** - API key management
- **Webhook** - Webhook integrations
- **ModuleIntegration** - Module integration settings
- **TenantSchema** - Multi-tenant schema management
- **SchemaOperation** - Schema operations tracking

### Analytics Models:
- **InstitutionalAnalytics** - Institution-level analytics
- **DepartmentAnalytics** - Department-level analytics

### Additional Models:
- **InstitutionApplication** - Institution applications
- **InstitutionEnrollment** - Institution enrollments
- **ProgramRequirement** - Program requirements
- **CourseInstructor** - Course instructor assignments
- **ExamResult** - Exam results
- **AcademicYear** - Academic year management
- **Semester** - Semester management
- **Campus** - Campus management
- **Building** - Building management
- **Room** - Room management
- **Equipment** - Equipment management
- **Library** - Library management
- **LibraryBook** - Library book management

**Total Models**: 31

---

## Architecture Summary

### Total Schemas: 12 (Previously 11)
### Total Models: 220+ (Previously 80+)

### Schema Distribution:
1. **auth_schema**: 20 models
2. **social_schema**: 17 models  
3. **courses_schema**: 21 models
4. **jobs_schema**: 11 models
5. **freelancing_schema**: 12 models
6. **rating_schema**: 8 models
7. **news_schema**: 10 models
8. **community_schema**: 16 models
9. **messages_schema**: 13 models
10. **feedback_schema**: 19 models
11. **notifications_schema**: 15 models
12. **statistics_schema**: 10 models
13. **edu_matrix_hub_schema**: 31 models

### Phase 1 Critical Fixes Completed ✅:
- **Cross-schema Relation Violations**: All removed systematically
- **Malformed Field Definitions**: Fixed DepartmentMember model
- **Multi-tenant Support**: Added `institutionId` to all content models
- **Performance Indexes**: Added institution-based filtering indexes
- **Schema Compilation**: Now compiles successfully without errors

### Key Features:
- **Multi-tenant Architecture**: Single system supporting multiple institutions
- **Cross-schema Relationships**: Models reference across schemas using string IDs only (no @relation decorators)
- **Social Features**: Facebook-like functionality across multiple domains
- **Real-time Capabilities**: Notification system and live updates
- **Comprehensive Analytics**: Platform-wide and institution-specific metrics
- **Role-based Access Control**: Fine-grained permissions system
- **Educational Management**: Complete institutional management system
- **Performance Optimized**: Proper indexing for efficient queries

### Multi-tenant Implementation:
- **Institution Isolation**: All content models include optional `institutionId`
- **Global Content**: Public content available across institutions when `institutionId` is null
- **Efficient Filtering**: Dedicated indexes for institution-based queries
- **Scalable Architecture**: Supports unlimited number of institutions

### Next Phase Priorities:
- **Phase 2**: Architecture restructuring (Profile/Resume models, Statistics relationships, Missing core models, Enum conflicts)
- **Phase 3**: Optimization & consistency (Database indexes, Data consistency rules)

---

*Last Updated: After Phase 1 Critical Fixes - Schema now fully functional and error-free*
