/**
 * @fileoverview User Feedback Platform Schema Implementation
 * WHY: Define comprehensive schema for user feedback and improvement suggestions
 * WHERE: Used in user_feedback_platform_schema database schema
 * HOW: Implements enterprise-grade feedback system with analytics
 */

# User Feedback Platform Schema Implementation

## 1. Feedback Models

### Feedback Schema
```prisma
// Base feedback model
model Feedback {
  id              String    @id @default(uuid())
  type            FeedbackType
  status          FeedbackStatus @default(PENDING)
  
  // Basic Info
  title           String
  description     String    @db.Text
  category        FeedbackCategory
  priority        Priority  @default(MEDIUM)
  
  // Author
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  isAnonymous     Boolean   @default(false)
  
  // Context
  module          Module    // Which part of the system
  feature         String?   // Specific feature
  url             String?   // Related URL
  metadata        Json?     // Additional context
  
  // Media
  attachments     Attachment[]
  screenshots     Screenshot[]
  
  // Related Items
  tags            Tag[]
  votes           Vote[]
  comments        Comment[]
  
  // Resolution
  assigneeId      String?
  assignee        User?     @relation("AssignedFeedback", fields: [assigneeId], references: [id])
  resolution      Resolution?
  
  // Tracking
  viewCount       Int       @default(0)
  voteCount       Int       @default(0)
  commentCount    Int       @default(0)
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  resolvedAt      DateTime?

  @@schema("user_feedback_platform_schema")
}

// Feedback resolution
model Resolution {
  id              String    @id @default(uuid())
  feedbackId      String    @unique
  feedback        Feedback  @relation(fields: [feedbackId], references: [id])
  
  // Resolution Details
  status          ResolutionStatus @default(PLANNED)
  response        String    @db.Text
  solution        String?   @db.Text
  
  // Timeline
  plannedFor      DateTime?
  implementedAt   DateTime?
  
  // Assignee
  resolvedById    String?
  resolvedBy      User?     @relation(fields: [resolvedById], references: [id])
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("user_feedback_platform_schema")
}
```

## 2. Interaction Models

### Comment Schema
```prisma
// Feedback comments
model Comment {
  id              String    @id @default(uuid())
  feedbackId      String
  feedback        Feedback  @relation(fields: [feedbackId], references: [id])
  
  // Content
  content         String    @db.Text
  authorId        String
  author          User      @relation(fields: [authorId], references: [id])
  isInternal      Boolean   @default(false)
  
  // Threading
  parentId        String?
  parent          Comment?  @relation("CommentThread", fields: [parentId], references: [id])
  replies         Comment[] @relation("CommentThread")
  
  // Attachments
  attachments     Attachment[]
  
  // Moderation
  status          CommentStatus @default(ACTIVE)
  moderatedBy     String?
  moderatedAt     DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  editedAt        DateTime?

  @@schema("user_feedback_platform_schema")
}

// User votes
model Vote {
  id              String    @id @default(uuid())
  feedbackId      String
  feedback        Feedback  @relation(fields: [feedbackId], references: [id])
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  type            VoteType
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([feedbackId, userId])
  @@schema("user_feedback_platform_schema")
}
```

## 3. Survey Models

### Survey Schema
```prisma
// Feedback survey
model Survey {
  id              String    @id @default(uuid())
  title           String
  description     String    @db.Text
  type            SurveyType
  status          SurveyStatus @default(DRAFT)
  
  // Configuration
  questions       Question[]
  settings        SurveySettings?
  
  // Targeting
  audience        Audience[]
  triggers        Trigger[]
  
  // Response Collection
  responses       Response[]
  analytics       SurveyAnalytics?
  
  // Schedule
  startDate       DateTime?
  endDate         DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  publishedAt     DateTime?

  @@schema("user_feedback_platform_schema")
}

// Survey question
model Question {
  id              String    @id @default(uuid())
  surveyId        String
  survey          Survey    @relation(fields: [surveyId], references: [id])
  
  // Question Details
  text            String
  type            QuestionType
  required        Boolean   @default(false)
  order          Int
  
  // Configuration
  options         Json?     // For multiple choice
  validation      Json?     // Validation rules
  logic           Json?     // Skip logic
  
  // Responses
  answers         Answer[]
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("user_feedback_platform_schema")
}
```

## 4. Response Models

### Response Schema
```prisma
// Survey response
model Response {
  id              String    @id @default(uuid())
  surveyId        String
  survey          Survey    @relation(fields: [surveyId], references: [id])
  
  // Respondent
  userId          String?
  user            User?     @relation(fields: [userId], references: [id])
  sessionId       String?
  deviceId        String?
  
  // Response Data
  answers         Answer[]
  metadata        Json?     // Response context
  
  // Completion
  isComplete      Boolean   @default(false)
  completedAt     DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("user_feedback_platform_schema")
}

// Question answer
model Answer {
  id              String    @id @default(uuid())
  responseId      String
  response        Response  @relation(fields: [responseId], references: [id])
  questionId      String
  question        Question  @relation(fields: [questionId], references: [id])
  
  // Answer Data
  value           Json      // Answer content
  metadata        Json?     // Answer context
  
  // Validation
  isValid         Boolean   @default(true)
  validationMsg   String?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([responseId, questionId])
  @@schema("user_feedback_platform_schema")
}
```

## 5. Analytics Models

### Feedback Analytics Schema
```prisma
// Feedback analytics
model FeedbackAnalytics {
  id              String    @id @default(uuid())
  period          String    // Analysis period
  
  // Volume Metrics
  totalFeedback   Int       @default(0)
  newFeedback     Int       @default(0)
  resolvedFeedback Int      @default(0)
  
  // Category Distribution
  categories      Json      // Feedback by category
  priorities      Json      // Feedback by priority
  modules         Json      // Feedback by module
  
  // Response Metrics
  averageResponseTime Int   // Minutes
  resolutionRate   Float    // Percentage
  satisfactionScore Float   // Out of 5
  
  // Trending
  topTags         Json      // Most used tags
  trending        Json      // Trending issues
  sentiment       Json      // Sentiment analysis
  
  // Timeline
  startDate       DateTime
  endDate         DateTime
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("user_feedback_platform_schema")
}

// Survey analytics
model SurveyAnalytics {
  id              String    @id @default(uuid())
  surveyId        String    @unique
  survey          Survey    @relation(fields: [surveyId], references: [id])
  
  // Response Metrics
  totalResponses  Int       @default(0)
  completionRate  Float     @default(0)
  averageTime     Int       // Seconds
  
  // Question Analytics
  questionStats   Json      // Stats by question
  dropoffPoints   Json      // Where users quit
  
  // Demographic Data
  demographics    Json      // Respondent demographics
  devices         Json      // Device distribution
  
  // Analysis
  trends          Json      // Response trends
  correlations    Json      // Answer correlations
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("user_feedback_platform_schema")
}
```

## 6. Enums & Types

```prisma
enum FeedbackType {
  BUG
  FEATURE_REQUEST
  IMPROVEMENT
  QUESTION
  COMPLAINT
  PRAISE
}

enum FeedbackStatus {
  PENDING
  UNDER_REVIEW
  PLANNED
  IN_PROGRESS
  COMPLETED
  REJECTED
}

enum FeedbackCategory {
  UI_UX
  PERFORMANCE
  FUNCTIONALITY
  CONTENT
  TECHNICAL
  OTHER
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum ResolutionStatus {
  PLANNED
  IN_PROGRESS
  IMPLEMENTED
  DECLINED
  DEFERRED
}

enum CommentStatus {
  ACTIVE
  EDITED
  DELETED
  FLAGGED
}

enum VoteType {
  UPVOTE
  DOWNVOTE
}

enum SurveyType {
  NPS
  SATISFACTION
  FEATURE
  USABILITY
  CUSTOM
}

enum SurveyStatus {
  DRAFT
  ACTIVE
  PAUSED
  COMPLETED
  ARCHIVED
}

enum QuestionType {
  TEXT
  SINGLE_CHOICE
  MULTIPLE_CHOICE
  RATING
  SCALE
  MATRIX
}

enum Module {
  COURSES
  MATRIX_COLLEGE
  FREELANCING
  JOBS
  COMMUNITY
  NEWS
  GENERAL
}
```