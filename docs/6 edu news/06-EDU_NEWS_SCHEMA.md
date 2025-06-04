/**
 * @fileoverview Educational News Platform Schema Implementation
 * WHY: Define comprehensive schema for educational news and content platform
 * WHERE: Used in edu_news_platform_schema database schema
 * HOW: Implements enterprise-grade news platform with content management
 */

# Educational News Platform Schema Implementation

## 1. Article Models

### Article Schema
```prisma
// Base article model
model Article {
  id              String    @id @default(uuid())
  slug            String    @unique  // URL-friendly identifier
  status          ArticleStatus @default(DRAFT)
  
  // Basic Info
  title           String
  subtitle        String?
  description     String    @db.Text
  content         String    @db.Text
  type            ArticleType
  
  // SEO & Meta
  metaTitle       String?
  metaDescription String?
  keywords        String[]
  
  // Media
  featuredImage   String?
  gallery         String[]
  videoUrl        String?
  
  // Categories & Tags
  categoryId      String
  category        Category  @relation(fields: [categoryId], references: [id])
  tags            Tag[]
  
  // Author & Source
  authorId        String
  author          User      @relation(fields: [authorId], references: [id])
  source          String?
  sourceUrl       String?
  
  // Engagement
  views           Int       @default(0)
  likes           Like[]
  comments        Comment[]
  shares          Share[]
  bookmarks       Bookmark[]
  
  // Educational Context
  institutions    Institution[]
  subjects        Subject[]
  educationLevel  EducationLevel[]
  
  // Publication Details
  publishedAt     DateTime?
  featuredUntil   DateTime?
  isSponsored     Boolean   @default(false)
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("edu_news_platform_schema")
}

// Category organization
model Category {
  id              String    @id @default(uuid())
  name            String    @unique
  slug            String    @unique
  description     String?   @db.Text
  parentId        String?
  parent          Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children        Category[] @relation("CategoryHierarchy")
  articles        Article[]
  
  // SEO & Meta
  metaTitle       String?
  metaDescription String?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("edu_news_platform_schema")
}
```

## 2. Engagement Models

### Interaction Schema
```prisma
// Article comments
model Comment {
  id              String    @id @default(uuid())
  articleId       String
  article         Article   @relation(fields: [articleId], references: [id])
  authorId        String
  author          User      @relation(fields: [authorId], references: [id])
  
  // Comment Content
  content         String    @db.Text
  parentId        String?   // For nested comments
  parent          Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies         Comment[] @relation("CommentReplies")
  
  // Moderation
  status          CommentStatus @default(PENDING)
  moderatedBy     String?
  moderatedAt     DateTime?
  
  // Engagement
  likes           CommentLike[]
  reports         Report[]
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("edu_news_platform_schema")
}

// User reactions
model Like {
  id              String    @id @default(uuid())
  articleId       String
  article         Article   @relation(fields: [articleId], references: [id])
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  type            ReactionType
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([articleId, userId])
  @@schema("edu_news_platform_schema")
}
```

## 3. Content Management Models

### Publishing Schema
```prisma
// Editorial workflow
model Editorial {
  id              String    @id @default(uuid())
  articleId       String    @unique
  article         Article   @relation(fields: [articleId], references: [id])
  
  // Workflow Status
  status          EditorialStatus @default(DRAFT)
  currentStage    String
  assignedTo      String?
  
  // Review Process
  reviewers       Reviewer[]
  reviews         Review[]
  revisions       Revision[]
  
  // Publication
  scheduledFor    DateTime?
  publishedAt     DateTime?
  publishedBy     String?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("edu_news_platform_schema")
}

// Content revisions
model Revision {
  id              String    @id @default(uuid())
  editorialId     String
  editorial       Editorial @relation(fields: [editorialId], references: [id])
  authorId        String
  author          User      @relation(fields: [authorId], references: [id])
  
  // Revision Content
  content         String    @db.Text
  changeLog       String    @db.Text
  version         Int
  
  // Review Status
  status          RevisionStatus @default(PENDING)
  reviewedBy      String?
  reviewedAt      DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("edu_news_platform_schema")
}
```

## 4. Analytics Models

### Tracking Schema
```prisma
// Article analytics
model ArticleAnalytics {
  id              String    @id @default(uuid())
  articleId       String    @unique
  article         Article   @relation(fields: [articleId], references: [id])
  
  // View Statistics
  totalViews      Int       @default(0)
  uniqueViews     Int       @default(0)
  averageReadTime Int       // Seconds
  
  // Engagement Metrics
  totalLikes      Int       @default(0)
  totalComments   Int       @default(0)
  totalShares     Int       @default(0)
  
  // Source Tracking
  referrers       Json      // Traffic sources
  devices         Json      // Device types
  
  // Audience Demographics
  locations       Json      // Geographic data
  educationLevels Json      // Reader education
  institutions    Json      // Institution distribution
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("edu_news_platform_schema")
}

// User engagement tracking
model UserEngagement {
  id              String    @id @default(uuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  // Reading History
  articlesRead    ArticleRead[]
  preferences     Json
  
  // Interaction Stats
  totalComments   Int       @default(0)
  totalLikes      Int       @default(0)
  totalShares     Int       @default(0)
  
  // Time Tracking
  readingTime     Int       // Minutes
  lastActive      DateTime  @default(now())
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("edu_news_platform_schema")
}
```

## 5. Integration Models

### Educational Context Schema
```prisma
// Subject areas
model Subject {
  id              String    @id @default(uuid())
  name            String    @unique
  description     String?   @db.Text
  parentId        String?
  parent          Subject?  @relation("SubjectHierarchy", fields: [parentId], references: [id])
  children        Subject[] @relation("SubjectHierarchy")
  articles        Article[]
  
  // Educational Context
  educationLevels EducationLevel[]
  institutions    Institution[]
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("edu_news_platform_schema")
}

// Institution integration
model InstitutionNews {
  id              String    @id @default(uuid())
  institutionId   String
  institution     Institution @relation(fields: [institutionId], references: [id])
  
  // News Settings
  featuredArticles Article[]
  categories      Category[]
  subjects        Subject[]
  
  // Customization
  branding        Json?
  settings        Json?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("edu_news_platform_schema")
}
```

## 6. Enums & Types

```prisma
enum ArticleStatus {
  DRAFT
  PENDING_REVIEW
  APPROVED
  PUBLISHED
  ARCHIVED
  REJECTED
}

enum ArticleType {
  NEWS
  FEATURE
  OPINION
  RESEARCH
  ANNOUNCEMENT
  PRESS_RELEASE
}

enum CommentStatus {
  PENDING
  APPROVED
  REJECTED
  FLAGGED
}

enum ReactionType {
  LIKE
  LOVE
  CELEBRATE
  INSIGHTFUL
  CURIOUS
}

enum EditorialStatus {
  DRAFT
  IN_REVIEW
  REVISION_REQUESTED
  APPROVED
  SCHEDULED
  PUBLISHED
}

enum RevisionStatus {
  PENDING
  APPROVED
  REJECTED
  REQUESTED_CHANGES
}

enum EducationLevel {
  PRIMARY
  SECONDARY
  UNDERGRADUATE
  GRADUATE
  PROFESSIONAL
  ALL
}
```