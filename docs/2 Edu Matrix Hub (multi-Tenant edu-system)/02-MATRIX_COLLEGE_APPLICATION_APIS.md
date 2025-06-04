/**
 * @fileoverview Edu Matrix Hub Application APIs
 * WHY: Define API endpoints for all application flows
 * WHERE: Used for implementing application processes
 * HOW: RESTful API definitions with request/response schemas
 */

# Edu Matrix Hub Application APIs

## 1. Institution Creation APIs

### A. Institution Application
```typescript
/**
 * Create Institution Application
 * POST /api/institutions/apply
 */
interface CreateInstitutionRequest {
  name: string;
  type: "UNIVERSITY" | "COLLEGE" | "SCHOOL" | "ACADEMY";
  details: {
    email: string;
    phone: string;
    address: string;
    website?: string;
    contactPerson: {
      name: string;
      role: string;
      email: string;
      phone: string;
    };
  };
  documents: {
    registrationProof: string; // Document URL
    taxDocuments: string;      // Document URL
    licenses: string[];        // Document URLs
  };
}

interface CreateInstitutionResponse {
  applicationId: string;
  status: "PENDING_REVIEW";
  submittedAt: string;
  estimatedReviewTime: string;
}

/**
 * Check Application Status
 * GET /api/institutions/application/:id
 */
interface ApplicationStatus {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "NEEDS_INFO";
  feedback?: string;
  nextSteps?: string[];
  credentials?: {
    adminEmail: string;
    temporaryPassword: string;
    setupUrl: string;
  };
}
```

### B. Institution Setup
```typescript
/**
 * Complete Institution Setup
 * POST /api/institutions/:id/setup
 */
interface InstitutionSetupRequest {
  departments: Array<{
    name: string;
    code: string;
    head?: {
      name: string;
      email: string;
    };
  }>;
  roles: Array<{
    name: string;
    permissions: string[];
    level: number;
  }>;
  academic: {
    programs: Array<{
      name: string;
      type: "UNDERGRADUATE" | "GRADUATE" | "DIPLOMA";
      duration: number;
      departments: string[];
    }>;
    calendar: {
      startMonth: number;
      terms: number;
    };
  };
  branding?: {
    logo: string;
    colors: {
      primary: string;
      secondary: string;
    };
  };
}

interface InstitutionSetupResponse {
  success: boolean;
  institution: {
    id: string;
    status: "ACTIVE";
    features: string[];
    quotas: {
      students: number;
      storage: number;
      bandwidth: number;
    };
  };
}
```

## 2. Role Application APIs

### A. Teacher Applications
```typescript
/**
 * Submit Teacher Application
 * POST /api/institutions/:id/teachers/apply
 */
interface TeacherApplicationRequest {
  personal: {
    name: string;
    email: string;
    phone: string;
    address: string;
    qualifications: Array<{
      degree: string;
      institution: string;
      year: number;
      certificate: string; // Document URL
    }>;
  };
  professional: {
    experience: Array<{
      institution: string;
      role: string;
      from: string;
      to: string;
      reference?: {
        name: string;
        contact: string;
      };
    }>;
    subjects: string[];
    specializations: string[];
  };
  preferences: {
    departments: string[];
    courses: string[];
    availability: {
      fullTime: boolean;
      startDate: string;
    };
  };
  documents: {
    resume: string;        // Document URL
    certificates: string[];
    identityProof: string;
    additionalDocs?: string[];
  };
}

/**
 * Review Teacher Application
 * POST /api/institutions/:id/teachers/:applicationId/review
 */
interface TeacherApplicationReview {
  action: "APPROVE" | "REJECT" | "REQUEST_INFO";
  feedback?: string;
  department?: string;
  courses?: string[];
  credentials?: {
    email: string;
    temporaryPassword: string;
  };
}
```

### B. Student Applications
```typescript
/**
 * Submit Student Application
 * POST /api/institutions/:id/students/apply
 */
interface StudentApplicationRequest {
  personal: {
    name: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    guardian: {
      name: string;
      relationship: string;
      contact: string;
    };
  };
  academic: {
    previousEducation: Array<{
      level: string;
      institution: string;
      year: number;
      grade: number;
      certificate: string; // Document URL
    }>;
    entranceExams?: Array<{
      name: string;
      score: number;
      certificate: string;
    }>;
  };
  enrollment: {
    programId: string;
    intake: string;
    scholarshipNeeded: boolean;
  };
  documents: {
    transcripts: string[];
    identityProof: string;
    photo: string;
    additionalDocs?: string[];
  };
}

/**
 * Process Student Application
 * POST /api/institutions/:id/students/:applicationId/process
 */
interface StudentApplicationProcess {
  action: "APPROVE" | "REJECT" | "WAITLIST";
  program: {
    id: string;
    batch: string;
    section?: string;
  };
  scholarship?: {
    type: string;
    amount: number;
    duration: string;
  };
  credentials?: {
    studentId: string;
    email: string;
    password: string;
  };
}
```

### C. Department Head Applications
```typescript
/**
 * Submit Department Head Application
 * POST /api/institutions/:id/department-heads/apply
 */
interface DepartmentHeadApplication {
  personal: {
    name: string;
    email: string;
    phone: string;
    qualifications: Array<{
      degree: string;
      specialization: string;
      institution: string;
      year: number;
    }>;
  };
  professional: {
    experience: Array<{
      role: string;
      institution: string;
      duration: number;
      achievements: string[];
    }>;
    leadership: {
      roles: string[];
      projects: string[];
      vision: string;
    };
  };
  department: {
    id: string;
    plans: string;
    initiatives: string[];
  };
  references: Array<{
    name: string;
    position: string;
    institution: string;
    contact: string;
  }>;
  documents: {
    resume: string;
    certificates: string[];
    publications?: string[];
    recommendations?: string[];
  };
}

/**
 * Review Department Head Application
 * POST /api/institutions/:id/department-heads/:applicationId/review
 */
interface DepartmentHeadReview {
  action: "APPROVE" | "REJECT" | "INTERVIEW";
  department: {
    id: string;
    role: string;
    startDate: string;
  };
  interview?: {
    date: string;
    type: "ONLINE" | "IN_PERSON";
    panel: string[];
  };
  credentials?: {
    email: string;
    password: string;
    accessLevel: string[];
  };
}
```

### D. Parent Account APIs
```typescript
/**
 * Request Parent Access
 * POST /api/institutions/:id/parents/request
 */
interface ParentAccessRequest {
  parent: {
    name: string;
    email: string;
    phone: string;
    relationship: "FATHER" | "MOTHER" | "GUARDIAN";
  };
  student: {
    id: string;
    name: string;
    proof: string; // Document URL proving relationship
  };
  verification: {
    idProof: string;
    address: string;
    additional?: {
      courtOrder?: string;
      guardianship?: string;
    };
  };
}

/**
 * Verify Parent-Student Relationship
 * POST /api/institutions/:id/parents/:requestId/verify
 */
interface ParentVerification {
  studentId: string;
  action: "APPROVE" | "REJECT";
  accessLevel: {
    academic: boolean;
    financial: boolean;
    attendance: boolean;
    communication: boolean;
  };
  restrictions?: {
    timeRestricted: boolean;
    dataLimits: string[];
  };
}
```

## 3. Application Processing APIs

### A. Document Verification
```typescript
/**
 * Verify Document Authenticity
 * POST /api/documents/verify
 */
interface DocumentVerification {
  documentId: string;
  type: "ACADEMIC" | "IDENTITY" | "PROFESSIONAL";
  checks: {
    digital: boolean;
    manual: boolean;
    thirdParty: boolean;
  };
  institution?: {
    name: string;
    contact: string;
  };
}

/**
 * Document Verification Result
 * GET /api/documents/:id/status
 */
interface VerificationResult {
  status: "VERIFIED" | "REJECTED" | "PENDING";
  checks: {
    completed: string[];
    pending: string[];
    failed: string[];
  };
  validity: {
    isValid: boolean;
    expiryDate?: string;
    restrictions?: string[];
  };
}
```

### B. Application Analytics
```typescript
/**
 * Get Application Statistics
 * GET /api/institutions/:id/applications/stats
 */
interface ApplicationStats {
  overview: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  byType: {
    teachers: number;
    students: number;
    departmentHeads: number;
    parents: number;
  };
  processing: {
    averageTime: number;
    currentBacklog: number;
    peakTimes: string[];
  };
  trends: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
}
```

## 4. Integration Guidelines

### A. Implementation Notes
1. Authentication:
   - All endpoints require valid JWT
   - Institution context required in header
   - Role-based access control enforced

2. File Uploads:
   - Use pre-signed URLs for documents
   - Support multi-part uploads
   - Implement virus scanning
   - Enforce file type restrictions

3. Rate Limiting:
   - Applications: 10/hour per IP
   - Document uploads: 50/hour per user
   - Verification requests: 100/hour per institution

4. Error Handling:
   - Use standard error codes
   - Provide detailed error messages
   - Implement retry mechanisms
   - Log all failures

### B. Security Requirements
1. Document Security:
   - Encrypt at rest
   - Scan for malware
   - Validate digital signatures
   - Enforce access controls

2. Data Protection:
   - Validate all inputs
   - Sanitize file names
   - Implement audit logs
   - Monitor suspicious activity

3. Access Control:
   - Role validation
   - Institution isolation
   - Permission checking
   - Activity tracking