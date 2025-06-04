/**
 * @fileoverview Jobs Platform Schema Implementation
 * WHY: Define comprehensive schema for educational and tech job marketplace
 * WHERE: Used in jobs_platform_schema database schema
 * HOW: Implements enterprise-grade job platform with advanced matching
 */

# Jobs Platform Schema Implementation

## 1. Job Models

### Job Schema
```prisma
// Base job model
model Job {
  id              String    @id @default(uuid())
  slug            String    @unique  // URL-friendly identifier
  status          JobStatus @default(DRAFT)
  
  // Basic Info
  title           String
  description     String    @db.Text
  type            JobType
  level           ExperienceLevel
  
  // Job Details
  responsibilities String[]
  requirements    String[]
  qualifications  String[]
  skills          String[]
  
  // Employment Details
  employmentType  EmploymentType
  locationType    LocationType
  location        Location?
  salary         SalaryRange?
  benefits       String[]
  
  // Institutional Context
  institutionId   String
  institution     Institution @relation(fields: [institutionId], references: [id])
  departmentId    String?
  department      Department? @relation(fields: [departmentId], references: [id])
  
  // Application Settings
  deadline        DateTime?
  maxApplications Int?
  hideAfterDeadline Boolean @default(true)
  
  // Stats & Analytics
  views           Int       @default(0)
  applications    JobApplication[]
  saves           JobSave[]
  analytics       JobAnalytics?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  publishedAt     DateTime?
  expiresAt       DateTime?

  @@schema("jobs_platform_schema")
}

// Salary information
model SalaryRange {
  id              String    @id @default(uuid())
  jobId           String    @unique
  job             Job       @relation(fields: [jobId], references: [id])
  
  // Salary Details
  min             Float
  max             Float
  currency        String
  period          SalaryPeriod
  isNegotiable    Boolean   @default(false)
  
  // Additional Benefits
  equity          String?
  bonus           String?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("jobs_platform_schema")
}
```

## 2. Application Models

### Application Schema
```prisma
// Job application model
model JobApplication {
  id              String    @id @default(uuid())
  jobId           String
  job             Job       @relation(fields: [jobId], references: [id])
  applicantId     String
  applicant       User      @relation(fields: [applicantId], references: [id])
  status          ApplicationStatus @default(PENDING)
  
  // Application Details
  coverLetter     String    @db.Text
  resume          String    // Resume URL
  portfolioUrl    String?
  
  // Interview Process
  interviews      Interview[]
  feedback        Feedback[]
  
  // Additional Documents
  documents       Document[]
  
  // Communication
  messages        Message[]
  notes           Note[]
  
  // Timeline
  submittedAt     DateTime  @default(now())
  lastActivity    DateTime  @default(now())
  processedAt     DateTime?
  withdrawnAt     DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([jobId, applicantId])
  @@schema("jobs_platform_schema")
}

// Interview model
model Interview {
  id              String    @id @default(uuid())
  applicationId   String
  application     JobApplication @relation(fields: [applicationId], references: [id])
  
  // Interview Details
  type            InterviewType
  round           Int       @default(1)
  scheduledAt     DateTime
  duration        Int       // Minutes
  
  // Location/Link
  location        String?   // Physical location
  meetingLink     String?   // Virtual meeting link
  
  // Participants
  interviewers    Interviewer[]
  
  // Status
  status          InterviewStatus @default(SCHEDULED)
  feedback        InterviewFeedback?
  
  // Notes
  notes           String?   @db.Text
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("jobs_platform_schema")
}
```

## 3. Analytics Models

### Analytics Schema
```prisma
// Job analytics
model JobAnalytics {
  id              String    @id @default(uuid())
  jobId           String    @unique
  job             Job       @relation(fields: [jobId], references: [id])
  
  // View Statistics
  totalViews      Int       @default(0)
  uniqueViews     Int       @default(0)
  
  // Application Stats
  totalApplications Int     @default(0)
  qualifiedApplicants Int   @default(0)
  conversionRate   Float    @default(0)
  
  // Source Tracking
  sourcesBreakdown Json     // Traffic sources
  deviceBreakdown  Json     // Device types
  
  // Engagement Metrics
  averageTimeOnPage Int     // Seconds
  bounceRate       Float
  
  // Demographic Data
  locationData     Json     // Geographic distribution
  experienceLevels Json     // Applicant experience
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("jobs_platform_schema")
}
```

## 4. Communication Models

### Message Schema
```prisma
// Application communication
model Message {
  id              String    @id @default(uuid())
  applicationId   String
  application     JobApplication @relation(fields: [applicationId], references: [id])
  senderId        String
  sender          User      @relation(fields: [senderId], references: [id])
  
  // Message Content
  content         String    @db.Text
  attachments     Attachment[]
  
  // Status
  isRead          Boolean   @default(false)
  readAt          DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("jobs_platform_schema")
}

// Communication templates
model Template {
  id              String    @id @default(uuid())
  institutionId   String
  institution     Institution @relation(fields: [institutionId], references: [id])
  
  // Template Details
  name            String
  type            TemplateType
  subject         String?
  content         String    @db.Text
  variables       String[]  // Template variables
  
  // Usage Stats
  useCount        Int       @default(0)
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("jobs_platform_schema")
}
```

## 5. Search Models

### Search Schema
```prisma
// Job search preferences
model JobPreferences {
  id              String    @id @default(uuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id])
  
  // Job Preferences
  jobTypes        JobType[]
  locations       String[]
  remoteOnly      Boolean   @default(false)
  
  // Salary Expectations
  minSalary       Float?
  maxSalary       Float?
  currency        String?
  
  // Skills & Experience
  skills          String[]
  experienceLevel ExperienceLevel?
  
  // Job Alerts
  alertsEnabled   Boolean   @default(true)
  alertFrequency  AlertFrequency @default(DAILY)
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("jobs_platform_schema")
}

// Saved searches
model SavedSearch {
  id              String    @id @default(uuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  // Search Criteria
  query           String?
  filters         Json      // Search filters
  
  // Alert Settings
  alertsEnabled   Boolean   @default(true)
  frequency       AlertFrequency @default(DAILY)
  
  // Stats
  lastRun         DateTime?
  matchCount      Int       @default(0)
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("jobs_platform_schema")
}
```

## 6. Enums & Types

```prisma
enum JobStatus {
  DRAFT
  PUBLISHED
  CLOSED
  FILLED
  EXPIRED
}

enum JobType {
  FULL_TIME
  PART_TIME
  CONTRACT
  TEMPORARY
  INTERNSHIP
}

enum ExperienceLevel {
  ENTRY
  JUNIOR
  MID_LEVEL
  SENIOR
  LEAD
  EXECUTIVE
}

enum EmploymentType {
  PERMANENT
  CONTRACT
  TEMPORARY
  INTERNSHIP
}

enum LocationType {
  ONSITE
  REMOTE
  HYBRID
}

enum ApplicationStatus {
  PENDING
  REVIEWING
  SHORTLISTED
  INTERVIEWING
  OFFERED
  ACCEPTED
  REJECTED
  WITHDRAWN
}

enum InterviewType {
  PHONE
  VIDEO
  ONSITE
  TECHNICAL
  HR
}

enum InterviewStatus {
  SCHEDULED
  COMPLETED
  CANCELLED
  RESCHEDULED
}

enum AlertFrequency {
  INSTANT
  DAILY
  WEEKLY
}

enum TemplateType {
  APPLICATION_RECEIVED
  INTERVIEW_INVITE
  OFFER_LETTER
  REJECTION
  FOLLOW_UP
}

enum SalaryPeriod {
  HOURLY
  DAILY
  WEEKLY
  MONTHLY
  YEARLY
}
```