/**
 * @fileoverview Simple User Authentication System
 * WHY: Define core user system for basic authentication
 * WHERE: Used as the base user management layer for simple auth
 * HOW: Implements simple authentication and profiles
 */

# Simple User Authentication System

## 1. User Model

```prisma
// Simple user model
model User {
  id              String    @id @default(uuid())
  email           String    @unique
  username        String    @unique
  password        String    // Hashed password
  name            String
  
  // Optional Profile
  avatar          String?   // Profile picture URL
  bio             String?   
  
  // Status
  emailVerified   Boolean   @default(false)
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@map("users")
}
```

## 2. Simple Auth Flow

### Registration:
1. User fills out basic form (email, username, password, name)
2. Validate inputs
3. Hash password
4. Create user
5. Send verification email
6. Redirect to login

### Login:
1. User enters email/username and password
2. Verify credentials
3. Create session
4. Redirect to dashboard

## 3. Session Management

```prisma
// Simple session tracking
model Session {
  id              String    @id @default(uuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  token           String    @unique    // Session token
  expiresAt       DateTime
  createdAt       DateTime  @default(now())

  @@map("sessions")
}
```