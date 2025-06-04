/**
 * @fileoverview Educational Freelancing Platform Schema
 * WHY: Define comprehensive schema for educational freelancing marketplace
 * WHERE: Used in freelancing_platform_schema database schema
 * HOW: Implements enterprise-grade freelancing system for educational services
 */

# Freelancing Platform Schema Implementation

## 1. Profile Models

### Freelancer Schema
```prisma
// Freelancer profile model
model FreelancerProfile {
  id              String    @id @default(uuid())
  userId          String    @unique    // Reference to auth system
  status          ProfileStatus @default(PENDING)
  
  // Basic Info
  title           String    // Professional title
  bio             String    @db.Text
  expertise       String[]  // Teaching subjects
  experience      Int       // Years of experience
  
  // Educational Background
  education       Education[]
  certifications  Certification[]
  
  // Teaching Details
  subjects        Subject[]
  levels         TeachingLevel[]
  languages      String[]
  
  // Portfolio
  samples         PortfolioItem[]
  achievements    Achievement[]
  
  // Verification
  isVerified      Boolean   @default(false)
  documents       Document[]
  ratings         Rating[]
  
  // Work History
  gigs            Gig[]
  contracts       Contract[]
  earnings        Earning[]
  
  // Settings
  availability    Availability
  preferences     Json
  notifications   NotificationSettings
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("freelancing_platform_schema")
}

// Client profile for those seeking educational services
model ClientProfile {
  id              String    @id @default(uuid())
  userId          String    @unique
  type            ClientType @default(INDIVIDUAL)
  
  // Basic Info
  name            String
  organization    String?   // For institutional clients
  requirements    String[]  // Educational needs
  
  // History
  orders          Order[]
  reviews         Review[]
  favorites       Gig[]
  
  // Preferences
  settings        Json
  notifications   NotificationSettings
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("freelancing_platform_schema")
}
```

## 2. Service Models

### Gig Schema
```prisma
// Educational service offering
model Gig {
  id              String    @id @default(uuid())
  freelancerId    String
  freelancer      FreelancerProfile @relation(fields: [freelancerId], references: [id])
  status          GigStatus @default(DRAFT)
  
  // Service Details
  title           String
  description     String    @db.Text
  category        ServiceCategory
  subcategory     String
  tags            String[]
  
  // Educational Specifics
  subject         String
  level           TeachingLevel
  learningGoals   String[]
  prerequisites   String[]
  
  // Delivery
  format          DeliveryFormat[]  // Online, In-person, Hybrid
  duration        Int               // Minutes per session
  sessions        Int               // Number of sessions
  materials       String[]          // Included resources
  
  // Pricing
  pricing         GigPricing[]
  packages        GigPackage[]
  
  // Stats & Metrics
  views           Int       @default(0)
  orders          Order[]
  ratings         Rating[]
  favorites       Int       @default(0)
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("freelancing_platform_schema")
}

// Service pricing options
model GigPricing {
  id              String    @id @default(uuid())
  gigId           String
  gig             Gig       @relation(fields: [gigId], references: [id])
  
  // Pricing Details
  title           String    // Package name
  description     String
  price           Float
  duration        Int       // Minutes
  sessions        Int
  
  // Features
  includes        String[]
  maxStudents     Int       @default(1)  // For group sessions
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("freelancing_platform_schema")
}
```

## 3. Order Models

### Order Schema
```prisma
// Service order/booking
model Order {
  id              String    @id @default(uuid())
  gigId           String
  gig             Gig       @relation(fields: [gigId], references: [id])
  clientId        String
  client          ClientProfile @relation(fields: [clientId], references: [id])
  status          OrderStatus @default(PENDING)
  
  // Order Details
  requirements    String    @db.Text
  packageId       String    // Selected pricing package
  quantity        Int       @default(1)  // Number of sessions
  schedule        DateTime[]
  
  // Payment
  amount          Float
  currency        String
  paymentStatus   PaymentStatus
  transactions    Transaction[]
  
  // Delivery
  deliverables    Deliverable[]
  messages        Message[]
  
  // Reviews
  clientReview    Review?
  freelancerReview Review?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  completedAt     DateTime?
  cancelledAt     DateTime?

  @@schema("freelancing_platform_schema")
}

// Order deliverables
model Deliverable {
  id              String    @id @default(uuid())
  orderId         String
  order           Order     @relation(fields: [orderId], references: [id])
  
  // Deliverable Details
  title           String
  description     String    @db.Text
  type            DeliverableType
  status          DeliverableStatus @default(PENDING)
  
  // Content
  files           File[]
  feedback        String?   @db.Text
  revisions       Revision[]
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  submittedAt     DateTime?
  acceptedAt      DateTime?

  @@schema("freelancing_platform_schema")
}
```

## 4. Review & Rating Models

### Review Schema
```prisma
// Service review and rating
model Review {
  id              String    @id @default(uuid())
  orderId         String    @unique
  order           Order     @relation(fields: [orderId], references: [id])
  reviewerId      String    // Client or Freelancer ID
  type            ReviewType
  
  // Review Details
  rating          Float     // 1-5 stars
  comment         String    @db.Text
  attributes      Json      // Specific rating attributes
  
  // Response
  response        String?   @db.Text
  responseAt      DateTime?
  
  // Helpfulness
  helpful         Int       @default(0)
  reports         Report[]
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("freelancing_platform_schema")
}

// Detailed rating attributes
model RatingAttribute {
  id              String    @id @default(uuid())
  reviewId        String
  review          Review    @relation(fields: [reviewId], references: [id])
  
  // Attribute Details
  category        String    // Communication, Quality, etc.
  score           Float     // 1-5 rating
  weight          Float     // Importance weight
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("freelancing_platform_schema")
}
```

## 5. Payment Models

### Payment Schema
```prisma
// Payment transaction
model Transaction {
  id              String    @id @default(uuid())
  orderId         String
  order           Order     @relation(fields: [orderId], references: [id])
  
  // Transaction Details
  amount          Float
  currency        String
  type            TransactionType
  status          TransactionStatus @default(PENDING)
  
  // Payment Info
  provider        String    // Payment gateway
  providerRef     String    // External reference
  method          PaymentMethod
  
  // Security
  encrypted       Json      // Encrypted payment details
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  completedAt     DateTime?

  @@schema("freelancing_platform_schema")
}

// Earnings record
model Earning {
  id              String    @id @default(uuid())
  freelancerId    String
  freelancer      FreelancerProfile @relation(fields: [freelancerId], references: [id])
  
  // Earning Details
  amount          Float
  currency        String
  type            EarningType
  status          EarningStatus
  
  // Source
  orderId         String?
  order           Order?    @relation(fields: [orderId], references: [id])
  
  // Payout
  payoutId        String?
  payout          Payout?   @relation(fields: [payoutId], references: [id])
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("freelancing_platform_schema")
}
```

## 6. Communication Models

### Message Schema
```prisma
// Order communication
model Message {
  id              String    @id @default(uuid())
  orderId         String
  order           Order     @relation(fields: [orderId], references: [id])
  senderId        String
  
  // Message Content
  content         String    @db.Text
  type            MessageType
  attachments     File[]
  
  // Status
  isRead          Boolean   @default(false)
  readAt          DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("freelancing_platform_schema")
}

// Support ticket
model SupportTicket {
  id              String    @id @default(uuid())
  userId          String
  orderId         String?
  
  // Ticket Details
  subject         String
  description     String    @db.Text
  priority        TicketPriority
  status          TicketStatus @default(OPEN)
  
  // Communication
  messages        TicketMessage[]
  
  // Resolution
  resolution      String?   @db.Text
  resolvedBy      String?
  resolvedAt      DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("freelancing_platform_schema")
}
```

## 7. Enums & Types

```prisma
enum ProfileStatus {
  PENDING
  ACTIVE
  SUSPENDED
  VERIFIED
}

enum ClientType {
  INDIVIDUAL
  INSTITUTION
  CORPORATE
}

enum GigStatus {
  DRAFT
  PUBLISHED
  PAUSED
  DELETED
}

enum ServiceCategory {
  TUTORING
  MENTORING
  COURSE_CREATION
  CURRICULUM_DEVELOPMENT
  EXAM_PREPARATION
  RESEARCH_ASSISTANCE
}

enum TeachingLevel {
  PRIMARY
  SECONDARY
  UNDERGRADUATE
  GRADUATE
  PROFESSIONAL
}

enum DeliveryFormat {
  ONLINE_LIVE
  ONLINE_RECORDED
  IN_PERSON
  HYBRID
}

enum OrderStatus {
  PENDING
  ACCEPTED
  IN_PROGRESS
  COMPLETED
  CANCELLED
  DISPUTED
}

enum PaymentStatus {
  PENDING
  PAID
  REFUNDED
  FAILED
}

enum DeliverableStatus {
  PENDING
  SUBMITTED
  ACCEPTED
  REJECTED
  REVISED
}

enum ReviewType {
  CLIENT_REVIEW
  FREELANCER_REVIEW
}

enum TransactionType {
  PAYMENT
  REFUND
  WITHDRAWAL
  BONUS
}

enum MessageType {
  TEXT
  FILE
  SYSTEM
}

enum TicketPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}
```