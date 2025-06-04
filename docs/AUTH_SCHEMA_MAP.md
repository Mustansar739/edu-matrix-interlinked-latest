# EDU Matrix Interlinked - Authentication Map
# TWO AUTHENTICATION SYSTEMS  
## 1. SimpleAuth - General Platform Access
## 2. EduMatrixAuth - Institution-Based Access

# Advanced Authentication System for Edu Matrix Hub

## 1. System Architecture Overview



EDU Matrix Interlinked - Authentication Map

Overview

The EDU Matrix Interlinked Authentication System is a multi-layered authentication architecture designed to support millions of users across multiple institutions, ensuring data security, seamless access, and role-based controls. The system is divided into two primary authentication mechanisms:

1. SimpleAuth - General Platform Access

Allows users to register and access basic platform features.

Enables users to explore public student interlinked, explore educational institutions (schools, colleges, universities etc and apply), courses, job listings, freelance marketplaces, and community discussions.

Provides email-based authentication, password hashing, and session management.

## 2. EduMatrixAuth - Institution-Based Access

Required for institutional roles such as Admin, Department Head, Teacher, Student, and Parent.

Implements multi-factor authentication (MFA), role-based access control (RBAC), and tenant-specific data isolation.

Ensures granular access permissions based on institution-specific policies.

### Authentication Methods
- **Username & Password**: Standard login method with secure hashing.
- **Multi-Factor Authentication**: Additional verification via SMS or email.


```mermaid
graph TD
    A[User Registration] -->|Identity Verification| B[Core Authentication System]
    B -->|Access Public Features| C[General Platform Access]
    B -->|Institutional Access| D[Edu Matrix Hub Multi-Tenant System]
    
    subgraph "Public Features"
        C1[Explore Courses]
        C2[View Job Listings]
        C3[Join Community Discussions]
        C4[Freelance Marketplace]
        C5[Educational News]
    end
    
    subgraph "Institution-Based Access (EduMatrixAuth)"
        D1[Apply for Institution Role]
        D2[Institution Admin Review]
        D3[Approval/Rejection Process]
        D4[Role-Specific Dashboard Access]
    end
    
    D -->|Granted Access| E[Role-Based Authentication]

    subgraph "Role-Based Access"
        E1[Supreme Admin - Full System Control]
        E2[Institution Admin - Institution Management]
        E3[Department Head - Department Oversight]
        E4[Teacher - Classroom & Course Management]
        E5[Student - Learning & Assignments]
        E6[Parent - Child Progress Monitoring]
    end
```

## 2. Authentication & Access Flow

### A. General Authentication Flow
```mermaid
sequenceDiagram
    User->>Platform: Register
    Platform->>Auth System: Identity Verification
    Auth System->>User: Grant Public Access
    User->>Platform: Browse Features & Apply for Institution Role
```

### B. Institution-Specific Authentication (EduMatrixAuth)
```mermaid
sequenceDiagram
    User->>Institution: Submit Application
    Institution->>Admin: Review Application
    Admin->>EduMatrixAuth: Approve Role
    EduMatrixAuth->>User: Assign Role & Provide Access
```

## 3. Multi-Tenant Role-Based Access Control (RBAC)

```mermaid
graph TD
    subgraph "System-Wide Role Hierarchy"
        A[Supreme Admin] -->|Manages Platform| B[Institution Admin]
        B -->|Oversees Institution| C[Department Head]
        C -->|Manages Departments| D[Teacher]
        D -->|Handles Courses & Exams| E[Student]
        E -->|Learning & Assignments| F[Parent]
    end
```

### Role-Specific Responsibilities
| Role | Responsibilities |
|----------------|----------------|
| **Supreme Admin** | Complete system control, institution approvals, security enforcement |
| **Institution Admin** | Manages institution settings, staff, students, financials |
| **Department Head** | Oversees department operations, teacher assignments, analytics |
| **Teacher** | Conducts classes, manages students, grades assignments |
| **Student** | Accesses learning resources, submits work, takes exams |
| **Parent** | Monitors child progress, communicates with teachers |

## 4. Data Isolation & Security Enforcement

### Multi-Tenant Data Management Strategy
```mermaid
graph TD
    A[Institution] -->|Tenant Isolation via Institution ID| B[Dedicated Data Storage]
    B -->|Enforced by| C[Row-Level Security (RLS)]
    B -->|Access Controlled by| D[Role-Based Permissions (RBAC)]
    B -->|Monitored by| E[Audit Logging & Security Alerts]
```

### Security Architecture
- **Public Access Security**: Email verification, strong password policies, device-based authentication
- **Institutional Security**: Multi-factor authentication (MFA), encrypted data storage, access control lists (ACLs)
- **Enterprise-Level Protection**: Real-time audit logs, AI-driven anomaly detection, institution-level firewall enforcement

## 5. Authentication Lifecycle & Access Management

### A. User Access & Transition Flow
```mermaid
graph TD
    A[User Registers] -->|SimpleAuth| B[Public Access Granted]
    B -->|Applies for Role| C[Institution Review Process]
    C -->|Approved| D[Institution-Specific Dashboard]
    C -->|Rejected| E[Reapply or Appeal]
```

### B. System Monitoring & Compliance Enforcement
```mermaid
graph TD
    A[User Activity] -->|Track Access Logs| B[Security Monitoring System]
    B -->|Analyze Anomalies| C[Real-Time Security Alerts]
    C -->|Auto-Enforce Policies| D[RBAC Permission Adjustments]
    D -->|Optimize User Experience| E[System Performance Monitoring]
```

### Continuous System Enhancements
1. **Adaptive Access Control**: adjustment for dynamic permissions
2. **Scalability Optimization**: Ensuring seamless authentication for millions of users

/**
 * @fileoverview Authentication Schema Documentation 
 * WHAT: Define database schema for auth system
 * WHERE: Used across EDU Matrix Interlinked platform
 * HOW: Prisma schema implementation
 */

# Authentication Schema Map

## 1. Core Schema Structure

### A. User Authentication
```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  role          Role      @default(STUDENT)
  tenantId      String?   // For Edu Matrix Hub users
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  profile       Profile?
  institution   Institution? @relation(fields: [tenantId], references: [id])
  sessions      Session[]
}

