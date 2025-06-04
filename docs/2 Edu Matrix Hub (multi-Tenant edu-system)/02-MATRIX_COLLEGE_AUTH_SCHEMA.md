/**
 * @fileoverview Edu Matrix Hub Authentication Schema
 * WHY: Define comprehensive schema for authentication and authorization
 * WHERE: Used in auth_schema database schema
 * HOW: Implements multi-tenant auth with complete institution isolation
 */

# Edu Matrix Hub Authentication Schema

## 1. Core Authentication Models

### User Authentication Schema
```prisma
// Base authentication model
model Auth {
  id              String    @id @default(uuid())
  institutionId   String    // Multi-tenant identifier
  userId          String    @unique
  username        String    @unique
  email           String    @unique
  passwordHash    String
  salt            String    // Password salt
  status          AuthStatus @default(PENDING_VERIFICATION)
  
  // MFA Configuration
  mfaEnabled      Boolean   @default(false)
  mfaSecret       String?   // TOTP secret
  backupCodes     String[]  // Recovery codes
  
  // Security Settings
  failedAttempts  Int       @default(0)
  lockedUntil     DateTime?
  passwordUpdatedAt DateTime @default(now())
  
  // Active Sessions
  sessions        Session[]
  
  // Parent-Child Relationships
  parentLinks     ParentLink[] @relation("ParentAuth")
  studentLinks    ParentLink[] @relation("StudentAuth")
  
  // Relationships
  user            User      @relation(fields: [userId], references: [id])
  institution     Institution @relation(fields: [institutionId], references: [id])
  
  // Audit
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  lastLogin       DateTime?

  @@schema("auth_schema")
}

// Parent-Child relationship model
model ParentLink {
  id              String    @id @default(uuid())
  parentAuthId    String    // Parent's auth record
  studentAuthId   String    // Student's auth record
  status          LinkStatus @default(PENDING)
  createdAt       DateTime  @default(now())
  approvedAt      DateTime?
  
  // Relationships
  parentAuth      Auth      @relation("ParentAuth", fields: [parentAuthId], references: [id])
  studentAuth     Auth      @relation("StudentAuth", fields: [studentAuthId], references: [id])

  @@unique([parentAuthId, studentAuthId])
  @@schema("auth_schema")
}

// Authentication status tracking
enum AuthStatus {
  PENDING_VERIFICATION
  ACTIVE
  INACTIVE
  LOCKED
  SUSPENDED

  @@schema("auth_schema")
}

// Parent-Child link status
enum LinkStatus {
  PENDING
  ACTIVE
  REVOKED
  EXPIRED

  @@schema("auth_schema")
}

// OAuth account connections
model OAuthAccount {
  id              String    @id @default(uuid())
  authId          String
  auth            Auth      @relation(fields: [authId], references: [id])
  provider        String    // oauth provider name
  providerUserId  String    // provider's user id
  accessToken     String
  refreshToken    String?
  expiresAt       DateTime?
  
  // Provider Data
  profile         Json      // Raw profile data
  scope           String[]  // Granted scopes
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([provider, providerUserId])
  @@schema("auth_schema")
}

// Session management with enhanced role context
model Session {
  id              String    @id @default(uuid())
  authId          String
  auth            Auth      @relation(fields: [authId], references: [id])
  token           String    @unique    // JWT token
  refreshToken    String?   @unique    // Refresh token
  
  // Enhanced Context
  institutionId   String    // Institution context
  roles           String[]  // Active roles
  parentContext   Json?     // Parent access details
  
  // Device Info
  userAgent       String?
  ipAddress       String?
  deviceId        String?
  
  // Validity
  expiresAt       DateTime
  lastActivity    DateTime  @default(now())
  isValid         Boolean   @default(true)

  @@schema("auth_schema")
}
```

## 2. Role & Permission Models

### Authorization Schema
```prisma
// Role definition with hierarchy
model Role {
  id              String    @id @default(uuid())
  institutionId   String    // Institution context
  name            String
  description     String?
  type            RoleType  @default(CUSTOM)
  
  // Enhanced Role Properties
  level          Int       // Hierarchy level
  isParentRole   Boolean   @default(false)
  allowedScopes  String[]  // Permitted access scopes
  
  // Hierarchy
  parentId        String?   // Parent role for inheritance
  parent          Role?     @relation("RoleHierarchy", fields: [parentId], references: [id])
  children        Role[]    @relation("RoleHierarchy")
  
  // Permissions
  permissions     Permission[]
  users           UserRole[]
  
  // Audit
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([institutionId, name])
  @@schema("auth_schema")
}

// User role assignment with enhanced tracking
model UserRole {
  id              String    @id @default(uuid())
  userId          String
  roleId          String
  institutionId   String    // Institution context
  
  // Role Details
  role            Role      @relation(fields: [roleId], references: [id])
  assignedBy      String    // User ID who assigned
  expiresAt       DateTime? // Optional expiration
  
  // Enhanced Status
  isActive        Boolean   @default(true)
  isParentRole    Boolean   @default(false)
  parentContext   Json?     // Parent role details
  
  // Audit
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([userId, roleId])
  @@schema("auth_schema")
}

// Permission definition with parent context
model Permission {
  id              String    @id @default(uuid())
  name            String
  description     String?
  
  // Access Control
  resource        String    // Resource identifier
  action          String    // Allowed action
  conditions      Json?     // Additional conditions
  parentAccess    Boolean   @default(false) // Parent permission flag
  
  // Relationships
  roles           Role[]    // Roles with this permission
  
  // Audit
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([resource, action])
  @@schema("auth_schema")
}

// Role types
enum RoleType {
  SYSTEM          // Built-in system roles
  CUSTOM          // Custom institution roles
  TEMPORARY       // Time-limited roles
  PARENT          // Parent-specific roles

  @@schema("auth_schema")
}
```

## 3. Security & Audit Models

### Security Tracking Schema
```prisma
// Authentication attempt logging with parent context
model AuthAttempt {
  id              String    @id @default(uuid())
  authId          String?   // Optional - may be failed login
  auth            Auth?     @relation(fields: [authId], references: [id])
  
  // Attempt Details
  type            AttemptType
  status          AttemptStatus
  ipAddress       String
  userAgent       String?
  parentContext   Boolean   @default(false)
  
  // Additional Info
  failureReason   String?
  metadata        Json?
  
  // Timestamp
  createdAt       DateTime  @default(now())

  @@schema("auth_schema")
}

// Password reset tracking
model PasswordReset {
  id              String    @id @default(uuid())
  authId          String
  auth            Auth      @relation(fields: [authId], references: [id])
  
  // Reset Details
  token           String    @unique
  expiresAt       DateTime
  usedAt          DateTime?
  
  // Request Info
  requestedBy     String    // User ID or system
  ipAddress       String
  userAgent       String?
  
  // Audit
  createdAt       DateTime  @default(now())

  @@schema("auth_schema")
}

// Enhanced security audit log
model SecurityAudit {
  id              String    @id @default(uuid())
  institutionId   String    // Institution context
  
  // Event Details
  type            AuditType
  severity        AuditSeverity
  action          String
  status          String
  parentContext   Boolean   @default(false)
  
  // Context
  userId          String?   // Optional - may be system event
  resourceType    String
  resourceId      String
  
  // Additional Data
  metadata        Json?
  ipAddress       String?
  userAgent       String?
  
  // Timestamp
  createdAt       DateTime  @default(now())

  @@schema("auth_schema")
}

// Authentication attempt type
enum AttemptType {
  LOGIN
  MFA
  PASSWORD_RESET
  TOKEN_REFRESH
  PARENT_LINK
  PARENT_ACCESS

  @@schema("auth_schema")
}

// Attempt status
enum AttemptStatus {
  SUCCESS
  FAILURE
  BLOCKED
  RATE_LIMITED

  @@schema("auth_schema")
}

// Audit event type
enum AuditType {
  AUTH            // Authentication events
  ACCESS          // Access control events
  ADMIN           // Administrative actions
  SECURITY        // Security-related events
  SYSTEM          // System events
  PARENT          // Parent access events

  @@schema("auth_schema")
}

// Audit severity
enum AuditSeverity {
  INFO
  WARNING
  ERROR
  CRITICAL

  @@schema("auth_schema")
}
```

## 4. Rate Limiting & Protection

### Security Controls Schema
```prisma
// Rate limiting with parent context
model RateLimit {
  id              String    @id @default(uuid())
  key             String    // Rate limit key
  type            LimitType
  count           Int       @default(0)
  expiresAt       DateTime
  
  // Optional Context
  institutionId   String?   // Institution context if applicable
  userId          String?   // User context if applicable
  isParentAccess  Boolean   @default(false)
  
  // Timestamp
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([key, type])
  @@schema("auth_schema")
}

// IP blocking
model BlockedIP {
  id              String    @id @default(uuid())
  ipAddress       String    @unique
  reason          String
  expiresAt       DateTime?
  
  // Block Details
  blockType       BlockType
  attempts        Int       @default(0)
  parentAccess    Boolean   @default(false)
  
  // Audit
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("auth_schema")
}

// Rate limit types
enum LimitType {
  LOGIN           // Login attempts
  REGISTER        // Registration attempts
  PASSWORD_RESET  // Password reset requests
  API             // API rate limits
  PARENT_LINK     // Parent linking attempts
  PARENT_ACCESS   // Parent access attempts

  @@schema("auth_schema")
}

// IP block types
enum BlockType {
  TEMPORARY       // Short-term block
  PERMANENT       // Permanent block
  SUSPICIOUS      // Under review
  PARENT_ABUSE    // Parent access abuse

  @@schema("auth_schema")
}
```