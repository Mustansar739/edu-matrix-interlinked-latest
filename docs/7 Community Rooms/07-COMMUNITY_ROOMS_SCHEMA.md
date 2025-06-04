/**
 * @fileoverview Community Rooms Platform Schema Implementation
 * WHY: Define comprehensive schema for educational community interactions
 * WHERE: Used in community_rooms_platform_schema database schema
 * HOW: Implements enterprise-grade real-time community platform
 */

# Community Rooms Platform Schema Implementation

## 1. Room Models

### Room Schema
```prisma
// Base room model
model Room {
  id              String    @id @default(uuid())
  slug            String    @unique  // URL-friendly identifier
  status          RoomStatus @default(ACTIVE)
  
  // Basic Info
  name            String
  description     String    @db.Text
  type            RoomType
  visibility      RoomVisibility @default(PUBLIC)
  
  // Room Settings
  maxParticipants Int?      // Optional limit
  isModerated     Boolean   @default(false)
  allowGuests     Boolean   @default(false)
  
  // Features
  features        RoomFeature[]
  settings        Json?     // Room-specific settings
  
  // Organization
  categoryId      String?
  category        Category? @relation(fields: [categoryId], references: [id])
  tags            Tag[]
  
  // Management
  ownerId         String
  owner           User      @relation("RoomOwner", fields: [ownerId], references: [id])
  moderators      Moderator[]
  
  // Participants
  members         Member[]
  activeSessions  Session[]
  
  // Content
  channels        Channel[]
  messages        Message[]
  events          Event[]
  resources       Resource[]
  
  // Educational Context
  institutionId   String?
  institution     Institution? @relation(fields: [institutionId], references: [id])
  courseId        String?
  course          Course?   @relation(fields: [courseId], references: [id])
  
  // Analytics
  analytics       RoomAnalytics?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  archivedAt      DateTime?

  @@schema("community_rooms_platform_schema")
}

// Room channel
model Channel {
  id              String    @id @default(uuid())
  roomId          String
  room            Room      @relation(fields: [roomId], references: [id])
  
  // Channel Info
  name            String
  description     String?   @db.Text
  type            ChannelType
  
  // Access Control
  isPrivate       Boolean   @default(false)
  allowedRoles    Role[]
  
  // Content
  messages        Message[]
  pins            PinnedMessage[]
  files           File[]
  
  // Settings
  settings        Json?     // Channel-specific settings
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([roomId, name])
  @@schema("community_rooms_platform_schema")
}
```

## 2. Messaging Models

### Message Schema
```prisma
// Room message
model Message {
  id              String    @id @default(uuid())
  roomId          String
  room            Room      @relation(fields: [roomId], references: [id])
  channelId       String?
  channel         Channel?  @relation(fields: [channelId], references: [id])
  
  // Message Content
  content         String    @db.Text
  type            MessageType @default(TEXT)
  metadata        Json?     // Message-specific metadata
  
  // Author
  authorId        String
  author          User      @relation(fields: [authorId], references: [id])
  isSystemMessage Boolean   @default(false)
  
  // Threading
  parentId        String?   // For thread replies
  parent          Message?  @relation("MessageThread", fields: [parentId], references: [id])
  replies         Message[] @relation("MessageThread")
  
  // Rich Content
  attachments     Attachment[]
  mentions        Mention[]
  reactions       Reaction[]
  
  // Moderation
  status          MessageStatus @default(ACTIVE)
  moderatedBy     String?
  moderatedAt     DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  editedAt        DateTime?
  deletedAt       DateTime?

  @@schema("community_rooms_platform_schema")
}

// Message attachment
model Attachment {
  id              String    @id @default(uuid())
  messageId       String
  message         Message   @relation(fields: [messageId], references: [id])
  
  // File Details
  type            FileType
  url             String
  name            String
  size            Int
  mimeType        String
  
  // Metadata
  metadata        Json?     // File-specific metadata
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("community_rooms_platform_schema")
}
```

## 3. Member Models

### Participant Schema
```prisma
// Room member
model Member {
  id              String    @id @default(uuid())
  roomId          String
  room            Room      @relation(fields: [roomId], references: [id])
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  // Membership Details
  role            Role      @default(MEMBER)
  status          MemberStatus @default(ACTIVE)
  nickname        String?   // Room-specific nickname
  
  // Permissions
  permissions     Permission[]
  
  // Activity
  lastSeen        DateTime  @default(now())
  totalMessages   Int       @default(0)
  
  // Settings
  notifications   NotificationSetting @default(ALL)
  isAdmin         Boolean   @default(false)
  
  // Timestamps
  joinedAt        DateTime  @default(now())
  leftAt          DateTime?

  @@unique([roomId, userId])
  @@schema("community_rooms_platform_schema")
}

// Room moderator
model Moderator {
  id              String    @id @default(uuid())
  roomId          String
  room            Room      @relation(fields: [roomId], references: [id])
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  // Moderator Details
  permissions     ModeratorPermission[]
  scope           ModeratorScope @default(FULL)
  
  // Activity
  actionsLog      ModeratorAction[]
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([roomId, userId])
  @@schema("community_rooms_platform_schema")
}
```

## 4. Session Models

### Active Session Schema
```prisma
// Real-time session
model Session {
  id              String    @id @default(uuid())
  roomId          String
  room            Room      @relation(fields: [roomId], references: [id])
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  // Session Info
  deviceId        String    // Client device identifier
  connectionId    String    // WebSocket connection ID
  status          SessionStatus @default(ACTIVE)
  
  // Connection Details
  ip              String?
  userAgent       String?
  location        Json?     // Geolocation data
  
  // Activity
  lastActive      DateTime  @default(now())
  lastPing        DateTime  @default(now())
  
  // Timestamps
  startedAt       DateTime  @default(now())
  endedAt         DateTime?

  @@schema("community_rooms_platform_schema")
}

// Session heartbeat
model Heartbeat {
  id              String    @id @default(uuid())
  sessionId       String
  session         Session   @relation(fields: [sessionId], references: [id])
  
  // Heartbeat Data
  timestamp       DateTime  @default(now())
  latency         Int      // Milliseconds
  status          HeartbeatStatus

  @@schema("community_rooms_platform_schema")
}
```

## 5. Analytics Models

### Room Analytics Schema
```prisma
// Room analytics
model RoomAnalytics {
  id              String    @id @default(uuid())
  roomId          String    @unique
  room            Room      @relation(fields: [roomId], references: [id])
  
  // Member Stats
  totalMembers    Int       @default(0)
  activeMembers   Int       @default(0)
  peakConcurrent  Int       @default(0)
  
  // Message Stats
  totalMessages   Int       @default(0)
  messagesPerDay  Float     @default(0)
  activeChannels  Int       @default(0)
  
  // Engagement
  messageDistribution Json  // Message frequency by hour
  memberActivity    Json   // Activity patterns
  popularTimes      Json   // Peak usage times
  
  // Content Analysis
  topContributors  Json   // Most active members
  popularContent   Json   // Most engaged content
  contentTypes     Json   // Message type distribution
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("community_rooms_platform_schema")
}

// Member analytics
model MemberAnalytics {
  id              String    @id @default(uuid())
  memberId        String    @unique
  member          Member    @relation(fields: [memberId], references: [id])
  
  // Activity Metrics
  messageCount    Int       @default(0)
  reactionCount   Int       @default(0)
  mentionCount    Int       @default(0)
  
  // Engagement
  activeTime      Int       @default(0)  // Minutes
  sessionCount    Int       @default(0)
  lastActive      DateTime  @default(now())
  
  // Interaction Patterns
  channelActivity Json     // Activity by channel
  timePatterns    Json     // Usage patterns
  interactions    Json     // Member interactions
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("community_rooms_platform_schema")
}
```

## 6. Enums & Types

```prisma
enum RoomStatus {
  ACTIVE
  ARCHIVED
  SUSPENDED
  DELETED
}

enum RoomType {
  DISCUSSION
  STUDY_GROUP
  COURSE
  RESEARCH
  SOCIAL
  PRIVATE
}

enum RoomVisibility {
  PUBLIC
  PRIVATE
  UNLISTED
  INVITATION
}

enum ChannelType {
  TEXT
  VOICE
  VIDEO
  ANNOUNCEMENT
  RESOURCE
}

enum MessageType {
  TEXT
  SYSTEM
  FILE
  CODE
  POLL
}

enum MessageStatus {
  ACTIVE
  EDITED
  DELETED
  MODERATED
}

enum Role {
  OWNER
  ADMIN
  MODERATOR
  MEMBER
  GUEST
}

enum MemberStatus {
  ACTIVE
  INACTIVE
  BANNED
  MUTED
}

enum ModeratorScope {
  FULL
  MESSAGES
  MEMBERS
  SETTINGS
}

enum SessionStatus {
  ACTIVE
  IDLE
  DISCONNECTED
}

enum HeartbeatStatus {
  HEALTHY
  LAGGING
  CRITICAL
}

enum NotificationSetting {
  ALL
  MENTIONS
  NONE
}

enum FileType {
  IMAGE
  VIDEO
  AUDIO
  DOCUMENT
  OTHER
}
```