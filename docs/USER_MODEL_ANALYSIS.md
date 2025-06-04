# EDU MATRIX INTERLINKED - USER MODEL ANALYSIS
## How a Single User Connects to All Platform Models

## EXECUTIVE SUMMARY

The **User model** in `auth_schema` serves as the **central hub** connecting to all 11 domain schemas in the EDU Matrix Interlinked platform. A single user can simultaneously engage with every module through their unique `userId` string reference, creating a unified educational ecosystem.

---

## 🏗️ USER MODEL ARCHITECTURE

### **Core User Model Location**: `prisma/schemas/auth.prisma`

```prisma
model User {
  id                       String                  @id @default(uuid())
  email                    String                  @unique
  username                 String                  @unique
  role                     UserRoleType            @default(USER)
  
  // Educational Context Fields
  institutionId            String?                 // Current institution
  departmentId             String?                 // Department within institution
  studentId                String?                 // Student ID for STUDENT role
  employeeId               String?                 // Employee ID for staff
  
  // Academic Profile
  major                    String?                 
  graduationYear           Int?                    
  degree                   String?                 
  specialization           String?                 
  academicYear             String?                 
  qualifications           String[]                
  
  // Role-Based Access Control (RBAC)
  managedDepartments       String[]                // For DEPARTMENT_HEAD
  teachingClasses          String[]                // For TEACHER
  enrolledClasses          String[]                // For STUDENT
  supervisedStudents       String[]                // For TEACHER/ADVISOR
  parentOfStudents         String[]                // For PARENT
}
```

---

## 🔄 CROSS-SCHEMA CONNECTION STRATEGY

### **Connection Method**: String-Based References
- **Each domain schema** references users via `String userId` fields
- **No direct foreign keys** to avoid circular dependencies
- **Single source of truth** maintained in `auth_schema`

---

## 📊 USER CONNECTIONS BY DOMAIN SCHEMA

### **1. 🔐 AUTH SCHEMA (`auth_schema`)**
**User's Core Identity & Permissions**

```prisma
User (Central Model)
├── RoleAssignment[]        // Multiple roles across institutions
├── InstitutionMember[]     // Institution memberships
├── DepartmentMember[]      // Department memberships  
├── ClassMember[]           // Class enrollments
├── TeachingAssignment[]    // Teaching responsibilities
├── StudentEnrollment[]     // Course enrollments
├── Session[]               // Login sessions
└── AuditLog[]              // Activity tracking
```

**User Connection**: Direct ownership and relationships

---

### **2. 👥 SOCIAL SCHEMA (`social_schema`)**
**Student Social Platform (Facebook-like)**

```prisma
SocialPost
├── authorId: String        // User who created the post
├── SocialPostLike[]        // Users who liked
├── SocialPostComment[]     // User comments
└── SocialPostShare[]       // User shares

Follow
├── followerId: String      // User doing the following
└── followingId: String     // User being followed

Friend
├── userId: String          // First user
└── friendId: String        // Second user

Story
├── authorId: String        // User who posted story
└── StoryView[]             // Users who viewed

UserSkill
├── userId: String          // User with skill
└── endorsements[]          // Users who endorsed

Certificate
└── userId: String          // Certificate owner
```

**User Connection**: Creates posts, follows friends, shares content, builds academic profile

---

### **3. 💼 JOBS SCHEMA (`jobs_schema`)**
**Employment Opportunities Portal**

```prisma
JobPost
├── authorId: String        // Employer/HR posting job
├── JobApplication[]        // Users applying
├── JobPostLike[]          // Users who liked post
├── JobPostComment[]       // User comments
└── JobPostBookmark[]      // Users who bookmarked

JobApplication
├── applicantId: String     // User applying for job
└── JobApplicationReview[] // HR reviews

JobAlert
└── userId: String          // User receiving alerts

SavedJob
└── userId: String          // User who saved job
```

**User Connection**: Posts jobs (employers), applies for jobs (job seekers), engages with job content

---

### **4. 🎯 FREELANCING SCHEMA (`freelancing_schema`)**
**Freelance Project Marketplace**

```prisma
FreelancePost
├── authorId: String        // Client posting project
├── FreelanceProposal[]     // Freelancer proposals
├── FreelancePostLike[]     // Users who liked
├── FreelancePostComment[]  // User comments
└── FreelancePostBookmark[] // Users who bookmarked

FreelanceProposal
├── freelancerId: String    // User submitting proposal
└── FreelanceContract[]     // Contracts created

FreelanceProfile
├── userId: String          // Freelancer profile
└── portfolio[]             // User's work samples

ClientReview
├── clientId: String        // Client giving review
└── freelancerId: String    // Freelancer being reviewed
```

**User Connection**: Posts projects (clients), submits proposals (freelancers), builds freelance reputation

---

### **5. 📰 NEWS SCHEMA (`news_schema`)**
**Educational News & Updates**

```prisma
NewsPost
├── authorId: String        // User posting news
├── NewsPostLike[]          // Users who liked
├── NewsPostComment[]       // User comments
├── NewsPostShare[]         // Users who shared
└── NewsPostBookmark[]      // Users who bookmarked

NewsComment
├── authorId: String        // User commenting
└── NewsCommentLike[]       // Users who liked comment

NewsSubscription
└── userId: String          // User subscribed to category
```

**User Connection**: Creates news content, engages with articles, subscribes to categories

---

### **6. 📚 COURSES SCHEMA (`courses_schema`)**
**Online Learning Management System**

```prisma
OnlineCourse
├── instructorId: String    // Teacher/instructor
├── CourseEnrollment[]      // Student enrollments
├── CourseDiscussion[]      // Course discussions
└── CourseReview[]          // Student reviews

CourseEnrollment
└── studentId: String       // Enrolled student

LessonProgress
└── studentId: String       // Student's progress

QuizAttempt
└── studentId: String       // Student taking quiz

AssignmentSubmission
├── studentId: String       // Student submitting
└── gradedBy: String        // Teacher grading

CourseDiscussion
├── authorId: String        // User starting discussion
└── CourseDiscussionReply[] // User replies

CourseReview
└── studentId: String       // Student reviewing course
```

**User Connection**: Teaches courses (instructors), enrolls in courses (students), tracks progress, submits assignments

---

### **7. 🏛️ COMMUNITY SCHEMA (`community_schema`)**
**Study Groups & Academic Communities**

```prisma
Community
├── creatorId: String       // User who created community
├── CommunityMember[]       // Community members
├── CommunityPost[]         // Community posts
└── CommunityEvent[]        // Community events

CommunityMember
└── userId: String          // Community member

CommunityPost
├── authorId: String        // User posting in community
└── CommunityPostComment[]  // User comments

CommunityEvent
├── organizerId: String     // Event organizer
└── EventAttendee[]         // Users attending

EventAttendee
└── userId: String          // User attending event
```

**User Connection**: Creates/joins study groups, participates in academic communities, organizes events

---

### **8. 💬 FEEDBACK SCHEMA (`feedback_schema`)**
**Reviews & Feedback System**

```prisma
Feedback
├── userId: String          // User giving feedback
├── FeedbackResponse[]      // Admin responses
└── FeedbackVote[]          // User votes

Review
├── reviewerId: String      // User writing review
├── ReviewVote[]            // Users voting on review
└── ReviewReport[]          // Users reporting review

Survey
├── SurveyResponse[]        // User responses
└── createdBy: String       // User who created survey

SurveyResponse
└── userId: String          // User responding to survey
```

**User Connection**: Provides feedback, writes reviews, participates in surveys, votes on content

---

### **9. 🔔 NOTIFICATIONS SCHEMA (`notifications_schema`)**
**Real-time Messaging & Alerts**

```prisma
Notification
├── userId: String          // User receiving notification
├── NotificationDelivery[]  // Delivery tracking
└── NotificationInteraction[] // User interactions

NotificationPreference
└── userId: String          // User's notification settings

NotificationGroup
├── createdBy: String       // User creating group
└── members[]               // User IDs in group

NotificationInteraction
└── userId: String          // User interacting with notification
```

**User Connection**: Receives notifications, manages preferences, interacts with alerts

---

### **10. 📈 STATISTICS SCHEMA (`statistics_schema`)**
**Analytics & Performance Tracking**

```prisma
UserAnalytics
└── userId: String          // User being analyzed

ContentAnalytics
└── createdBy: String       // Content creator analytics

AcademicAnalytics
└── studentId: String       // Student performance analytics

Report
├── createdBy: String       // User generating report
└── ReportExecution[]       // Execution tracking

CustomMetric
└── createdBy: String       // User who created metric
```

**User Connection**: Analytics tracked for user behavior, academic performance, content creation

---

### **11. 🏫 EDU MATRIX HUB SCHEMA (`edu_matrix_hub_schema`)**
**Institution Management & Infrastructure**

```prisma
Institution
├── createdBy: String       // User who registered institution
├── InstitutionMember[]     // Institution members
└── InstitutionApplication[] // Application tracking

InstitutionApplication  
└── applicantId: String     // User applying for institution

Department
├── headId: String          // Department head user
└── DepartmentStaff[]       // Department staff

Program
└── coordinatorId: String   // Program coordinator

Staff
└── userId: String          // Staff member

Student
└── userId: String          // Student

Course
├── instructorId: String    // Course instructor
└── CourseEnrollment[]      // Student enrollments

APIKey
└── userId: String          // API key owner

WebhookEndpoint
└── createdBy: String       // User who created webhook
```

**User Connection**: Manages institutions, enrolls in programs, teaches courses, uses API services

---

## 🎯 SINGLE USER JOURNEY EXAMPLE

### **Student User Scenario**: "Sarah Thompson"
**UserID**: `usr_sarah_123`  
**Role**: `STUDENT`  
**Institution**: "MIT"

#### **Sarah's Platform Engagement**:

1. **🔐 Authentication**: Logs in with `usr_sarah_123`
2. **📚 Courses**: Enrolled in "Advanced Machine Learning" course
3. **👥 Social**: Posted study group invite, follows 50 classmates
4. **🏛️ Community**: Member of "AI Research Group" community
5. **📰 News**: Subscribed to "Technology" news, liked 12 articles
6. **💼 Jobs**: Applied to 3 internship positions, bookmarked 15 jobs
7. **🎯 Freelancing**: Created freelancer profile, submitted 2 proposals
8. **💬 Feedback**: Submitted course feedback, rated platform 4.5/5
9. **🔔 Notifications**: Receiving course updates, job alerts, social notifications
10. **📈 Analytics**: Progress tracked across all activities
11. **🏫 Institution**: Registered as MIT student, enrolled in CS program

#### **Sarah's Data Connections**:
```sql
-- Sarah exists in ALL 11 schemas through her userId
auth_schema.User(id: 'usr_sarah_123')
├── social_schema.SocialPost(authorId: 'usr_sarah_123') [12 posts]
├── courses_schema.CourseEnrollment(studentId: 'usr_sarah_123') [5 courses]
├── jobs_schema.JobApplication(applicantId: 'usr_sarah_123') [3 applications]
├── freelancing_schema.FreelanceProfile(userId: 'usr_sarah_123') [1 profile]
├── news_schema.NewsSubscription(userId: 'usr_sarah_123') [3 categories]
├── community_schema.CommunityMember(userId: 'usr_sarah_123') [2 groups]
├── feedback_schema.Feedback(userId: 'usr_sarah_123') [4 submissions]
├── notifications_schema.Notification(userId: 'usr_sarah_123') [156 notifications]
├── statistics_schema.UserAnalytics(userId: 'usr_sarah_123') [daily tracking]
└── edu_matrix_hub_schema.Student(userId: 'usr_sarah_123') [MIT enrollment]
```

---

## 🔄 CROSS-SCHEMA RELATIONSHIP FLOW

### **User → Content Creation Flow**:
```mermaid
User(auth_schema) 
    → Creates SocialPost(social_schema)
    → Creates JobPost(jobs_schema)  
    → Creates FreelancePost(freelancing_schema)
    → Creates NewsPost(news_schema)
    → Creates Community(community_schema)
    → Submits Feedback(feedback_schema)
    → Receives Notifications(notifications_schema)
    → Generates Analytics(statistics_schema)
    → Manages Institution(edu_matrix_hub_schema)
    → Enrolls in Courses(courses_schema)
```

### **User Engagement Tracking**:
```typescript
// Example: How user engagement is tracked across schemas
interface UserEngagement {
  userId: string;
  socialActivity: {
    postsCreated: number;
    likesGiven: number;
    commentsPosted: number;
    friendsConnected: number;
  };
  academicActivity: {
    coursesEnrolled: number;
    assignmentsSubmitted: number;
    certificatesEarned: number;
    communityParticipation: number;
  };
  professionalActivity: {
    jobApplications: number;
    freelanceProposals: number;
    profileViews: number;
    skillEndorsements: number;
  };
  contentConsumption: {
    newsArticlesRead: number;
    videosWatched: number;
    notificationsReceived: number;
    feedbackSubmitted: number;
  };
}
```

---

## 💡 KEY ARCHITECTURAL BENEFITS

### **1. Single Identity Management**
- **One User Model** manages all authentication across 11 domains
- **Consistent UserID** used as foreign key in all schemas
- **Centralized RBAC** controls access across entire platform

### **2. Cross-Domain Analytics** 
- **Unified tracking** of user behavior across all modules
- **Comprehensive insights** into student/teacher/admin activities
- **Platform-wide engagement** metrics

### **3. Seamless User Experience**
- **Single login** accesses all platform features
- **Consistent profile** across all modules
- **Integrated notifications** from all domains

### **4. Scalable Architecture**
- **Modular design** allows independent schema evolution
- **No circular dependencies** between domain schemas
- **Easy to add new domains** without affecting existing ones

---

## 🚀 IMPLEMENTATION SUMMARY

The EDU Matrix Interlinked platform successfully implements a **hub-and-spoke architecture** where:

- **🎯 User Model** = Central Hub (auth_schema)
- **📊 11 Domain Schemas** = Spokes extending functionality
- **🔗 String References** = Flexible connections without coupling
- **🔄 Single User Journey** = Seamless experience across all domains

This architecture enables **any single user** to engage with **every aspect** of the educational platform while maintaining **clean separation** of concerns and **scalable modular design**.

---

**Generated on**: May 28, 2025  
**Schema Version**: Modular Multi-Schema v2.0  
**Total Schemas**: 11 domain schemas + 1 main schema  
**User Connection Points**: 80+ models across all domains
