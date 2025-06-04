/**
 * @fileoverview User Profile Database Schema
 * @module UserProfileSchema
 * @category Database
 * 
 * @description
 * Prisma schema definitions for the user profile system.
 * Implements dynamic resume functionality with complete
 * SEO optimization and real-time updates.
 */

# User Profile Schema Implementation

```prisma
// Main profile model with SEO-optimized fields
model Profile {
  id              String    @id @default(uuid())
  userId          String    @unique
  username        String    @unique
  name            String
  headline        String    @db.Text
  avatar          String?
  coverImage      String?
  summary         String    @db.Text
  
  // Contact Information (Privacy controlled)
  email           String    @unique
  phone           String?
  website         String?
  socialLinks     Json?     // Store as {platform: url}
  
  // Location Details
  country         String
  city            String?
  isRemote        Boolean   @default(false)
  
  // Professional Details
  currentRole     String?
  currentOrg      String?
  startDate       DateTime?
  
  // Platform Activity
  coursesCompleted Int      @default(0)
  teachingHours    Int      @default(0)
  studentsHelped   Int      @default(0)
  projectsDelivered Int     @default(0)
  averageRating    Float    @default(0)
  
  // Relations
  experience      Experience[]
  education       Education[]
  certifications  Certification[]
  skills          ProfileSkill[]
  languages       Language[]
  portfolio       PortfolioItem[]
  publications    Publication[]
  awards          Award[]
  testimonials    Testimonial[]
  
  // Career Preferences
  desiredRoles    String[]
  industries      String[]
  workTypes       String[]  // ["Full-time", "Part-time", "Contract", "Freelance"]
  locationPref    Json      // {remote, onsite, hybrid, preferred: string[]}
  
  // SEO & Visibility
  seoMetadata     Json      // {title, description, keywords}
  schemaMarkup    Json      // Schema.org Person data
  visibility      Json      // {profile, contact, activity} visibility settings
  
  // System Fields
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  searchVector    Unsupported("tsvector")?

  @@index([searchVector], type: Gin)
  @@schema("user_profile_schema")
}

// Professional experience
model Experience {
  id              String    @id @default(uuid())
  profileId       String
  profile         Profile   @relation(fields: [profileId], references: [id])
  role           String
  organization   String
  startDate      DateTime
  endDate        DateTime?
  description    String    @db.Text
  achievements   String[]
  skills         String[]
  type           String    // "Full-time", "Part-time", "Contract"
  
  @@schema("user_profile_schema")
}

// Educational background
model Education {
  id              String    @id @default(uuid())
  profileId       String
  profile         Profile   @relation(fields: [profileId], references: [id])
  degree         String
  field          String
  institution    String
  year           Int
  grade          String?
  achievements   String[]
  certifications String[]
  
  @@schema("user_profile_schema")
}

// Professional certifications
model Certification {
  id              String    @id @default(uuid())
  profileId       String
  profile         Profile   @relation(fields: [profileId], references: [id])
  name           String
  issuer         String
  issueDate      DateTime
  expiryDate     DateTime?
  verificationId String?
  verificationUrl String?
  
  @@schema("user_profile_schema")
}

// Skills with endorsements
model ProfileSkill {
  id              String    @id @default(uuid())
  profileId       String
  profile         Profile   @relation(fields: [profileId], references: [id])
  name           String
  type           String    // "technical" or "soft"
  level          String    // "Beginner", "Intermediate", "Advanced", "Expert"
  yearsOfExp     Int
  endorsements   Int       @default(0)
  projects       String[]  // Related project references
  
  @@schema("user_profile_schema")
}

// Language proficiencies
model Language {
  id              String    @id @default(uuid())
  profileId       String
  profile         Profile   @relation(fields: [profileId], references: [id])
  name           String
  level          String    // "Basic", "Intermediate", "Fluent", "Native"
  
  @@schema("user_profile_schema")
}

// Portfolio projects
model PortfolioItem {
  id              String    @id @default(uuid())
  profileId       String
  profile         Profile   @relation(fields: [profileId], references: [id])
  title          String
  description    String    @db.Text
  role           String
  technologies   String[]
  url            String?
  images         String[]
  highlights     String[]
  
  @@schema("user_profile_schema")
}

// Publications
model Publication {
  id              String    @id @default(uuid())
  profileId       String
  profile         Profile   @relation(fields: [profileId], references: [id])
  title          String
  publisher      String
  publishDate    DateTime
  url            String?
  citations      Int       @default(0)
  
  @@schema("user_profile_schema")
}

// Awards & Recognition
model Award {
  id              String    @id @default(uuid())
  profileId       String
  profile         Profile   @relation(fields: [profileId], references: [id])
  title          String
  issuer         String
  issueDate      DateTime
  description    String    @db.Text
  
  @@schema("user_profile_schema")
}

// Professional testimonials
model Testimonial {
  id              String    @id @default(uuid())
  profileId       String
  profile         Profile   @relation(fields: [profileId], references: [id])
  text           String    @db.Text
  author         String
  authorRole     String
  date           DateTime
  
  @@schema("user_profile_schema")
}

// Profile visibility enum
enum VisibilityLevel {
  PUBLIC
  PRIVATE
  CONNECTIONS
}

// Skill level enum
enum SkillLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}

// Language proficiency enum
enum LanguageLevel {
  BASIC
  INTERMEDIATE
  FLUENT
  NATIVE
}

// Availability status enum
enum AvailabilityStatus {
  ACTIVELY_LOOKING
  OPEN
  NOT_LOOKING
}
```