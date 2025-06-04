# 🔍 User Module Connection Verification Guide

## Overview

The Edu Matrix Interlinked system consists of **12 interconnected modules** that work together to provide a comprehensive educational platform. Each user must have proper access and connections to relevant modules based on their role, profession, and institutional affiliations.

## 📋 System Architecture

### Available Modules

1. **`auth_schema`** - Core authentication and user management
2. **`social_schema`** - Social networking features (Facebook-like)
3. **`courses_schema`** - Learning management system (Coursera-like)
4. **`jobs_schema`** - Job board and career opportunities
5. **`freelancing_schema`** - Freelancing marketplace
6. **`rating_schema`** - Universal rating and review system
7. **`news_schema`** - Educational news and announcements
8. **`community_schema`** - Forums and community engagement
9. **`messages_schema`** - Direct messaging system
10. **`notifications_schema`** - Real-time notification system
11. **`statistics_schema`** - Analytics and reporting
12. **`hub_schema`** - Central institution management hub

## 🔐 User Connection Points

### Core User Model Fields

```prisma
model User {
  // Primary identifiers
  id            String       @id @default(uuid())
  email         String       @unique
  username      String       @unique
  profession    UserProfession // Determines access patterns
  isVerified    Boolean      @default(false)
  
  // Institutional connections
  institutionId String?      // Primary institution
  departmentId  String?      // Primary department
  
  // Access control
  permissions   String[]     // Dynamic permissions
  accessLevel   AccessLevel  @default(BASIC)
  dataScope     DataScopeType @default(SELF)
  
  // Permission flags
  canCreateCourses   Boolean @default(false)
  canManageGrades    Boolean @default(false)
  canViewAnalytics   Boolean @default(false)
  canManageUsers     Boolean @default(false)
  canAccessReports   Boolean @default(false)
  canModerateContent Boolean @default(false)
}
```

### Relationship Tables

- **`InstitutionMember`** - Links users to institutions
- **`DepartmentMember`** - Links users to departments
- **`ClassMember`** - Links users to specific classes/courses
- **`TeachingAssignment`** - Links teachers to classes
- **`StudentEnrollment`** - Links students to courses

## ✅ Verification Process

### 1. Basic Identity Verification

```typescript
// Check core user data
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    institutionMemberships: true,
    departmentMemberships: true,
    classMemberships: true,
    teachingAssignments: true,
    studentEnrollments: true
  }
});

// Verify required fields
const hasAuthAccess = user.isVerified && user.email && user.username;
```

### 2. Module-Specific Access Rules

#### Auth Schema (Required for all)
- ✅ User must be verified
- ✅ Must have email and username
- ✅ Must have basic profile completion

#### Social Schema
- ✅ User must be verified
- ✅ All verified users get social access

#### Courses Schema
- ✅ Students: Must have active enrollments
- ✅ Teachers: Must have teaching assignments
- ✅ Admins: Must have `canCreateCourses` permission

#### Jobs Schema
- ✅ All verified users except students (unless specifically granted)
- ✅ Based on profession and verification status

#### Hub Schema
- ✅ Must have institution connections
- ✅ OR have `canManageUsers` permission

### 3. Permission-Based Access

```typescript
// Check permission flags for advanced features
const hasStatisticsAccess = user.canViewAnalytics || user.accessLevel === 'ADMIN';
const hasHubAccess = institutionConnections.length > 0 || user.canManageUsers;
```

## 🛠️ Implementation

### Using the Verification Functions

```typescript
import { verifyUserModuleConnections, setupUserModuleConnections } from '@/lib/user-module-verification';

// Verify a user's access to all modules
const verification = await verifyUserModuleConnections(userId);

// Setup missing connections automatically
await setupUserModuleConnections(userId, institutionId);

// Generate verification report
await generateUserVerificationReport(userId);
```

### API Endpoints

- **POST** `/api/verify-user-modules` - Verify user's module access
- **POST** `/api/setup-user-modules` - Auto-setup missing connections

### Web Interface

Access the verification interface at:
```
/test/user-verification
```

## 🔧 Common Verification Scenarios

### New Student Registration

1. **Create user account** with `profession: STUDENT`
2. **Verify email** to set `isVerified: true`
3. **Assign to institution** via `InstitutionMember`
4. **Enroll in courses** via `StudentEnrollment`
5. **Auto-grant permissions**: `['READ_PROFILE', 'UPDATE_PROFILE', 'ACCESS_SOCIAL', 'ENROLL_COURSES']`

### New Teacher Registration

1. **Create user account** with `profession: TEACHER`
2. **Verify email and credentials**
3. **Assign to institution and department**
4. **Create teaching assignments**
5. **Auto-grant permissions**: `['CREATE_COURSES', 'MANAGE_CLASSES', 'GRADE_STUDENTS']`

### Institution Admin Setup

1. **Create user account** with `profession: ACADEMIC_ADMIN`
2. **Assign elevated access level**: `accessLevel: ADVANCED`
3. **Grant management permissions**: `canManageUsers: true, canViewAnalytics: true`
4. **Setup institution leadership role**

## 🔍 Verification Checklist

### For Each New User, Verify:

- [ ] **Basic Profile**: Email, username, profession set
- [ ] **Verification Status**: `isVerified: true`
- [ ] **Institution Connection**: At least one active `InstitutionMember` record
- [ ] **Department Assignment**: Relevant `DepartmentMember` records
- [ ] **Course Access**: Appropriate `ClassMember`, `TeachingAssignment`, or `StudentEnrollment`
- [ ] **Permissions Array**: Populated with role-appropriate permissions
- [ ] **Access Level**: Set according to user role (`BASIC`, `ADVANCED`, `ADMIN`)
- [ ] **Module Flags**: Permission booleans set correctly

### Automated Verification

Run periodic checks using:

```typescript
// Check all users for missing connections
const issues = await verifyAllUsersModuleConnections();

// Log users with problems
console.log(`Found ${issues.length} users with missing connections`);
```

## 🚨 Troubleshooting

### Common Issues

1. **User can't access courses**
   - Check if `StudentEnrollment` or `TeachingAssignment` exists
   - Verify `classMemberships` are active

2. **Missing social features**
   - Ensure `isVerified: true`
   - Check if user has basic social permissions

3. **No institution access**
   - Verify `InstitutionMember` record exists and `isActive: true`
   - Check `institutionId` field in user record

4. **Analytics not accessible**
   - Verify `canViewAnalytics: true` or `accessLevel: ADMIN`
   - Check if user has appropriate profession

### Auto-Fix Commands

```typescript
// Fix missing basic connections
await setupUserModuleConnections(userId);

// Fix specific institution connection
await setupUserModuleConnections(userId, institutionId);

// Batch fix all users
const problemUsers = await verifyAllUsersModuleConnections();
for (const user of problemUsers) {
  await setupUserModuleConnections(user.userId);
}
```

## 📊 Monitoring & Reporting

### Daily Health Checks

1. **Run verification report** for all new users
2. **Check connection percentages** across user types
3. **Monitor failed access attempts** by module
4. **Track permission grant/revoke events**

### Key Metrics

- **Connection Success Rate**: `(users_with_full_access / total_users) * 100`
- **Module Adoption**: Usage statistics per module
- **Permission Distribution**: How permissions are distributed across user types
- **Institution Coverage**: Percentage of users with institution connections

This verification system ensures that every user in your Edu Matrix Interlinked platform has appropriate access to all relevant modules based on their role, maintaining security while providing seamless user experience.
