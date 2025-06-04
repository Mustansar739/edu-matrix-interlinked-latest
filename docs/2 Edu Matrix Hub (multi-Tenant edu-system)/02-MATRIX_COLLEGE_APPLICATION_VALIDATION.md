/**
 * @fileoverview Edu Matrix Hub Application Validation Rules
 * WHY: Define comprehensive validation and error handling
 * WHERE: Used for implementing application validation
 * HOW: Validation rules and error codes for all flows
 */

# Edu Matrix Hub Application Validation Rules

## 1. Institution Application Validation

### A. Name Validation
```typescript
interface InstitutionNameRules {
  minLength: 3;
  maxLength: 100;
  pattern: "^[a-zA-Z0-9 .'&-]+$";
  reserved: [
    "admin", "super", "system", "test",
    "demo", "trial", "matrix", "college"
  ];
  uniqueCheck: {
    scope: "GLOBAL";
    ignoreCase: true;
    excludeSpaces: true;
  };
}
```

### B. Document Requirements
```typescript
interface DocumentRequirements {
  registrationProof: {
    required: true;
    fileTypes: ["pdf", "jpg", "png"];
    maxSize: "10MB";
    minDpi: 300;
  };
  taxDocuments: {
    required: true;
    fileTypes: ["pdf"];
    maxSize: "5MB";
    expiryCheck: true;
  };
  licenses: {
    required: true;
    minCount: 1;
    fileTypes: ["pdf"];
    maxSize: "5MB";
    validityCheck: true;
  };
}
```

### C. Error Codes
```typescript
enum InstitutionErrorCodes {
  DUPLICATE_NAME = "INST_001",
  INVALID_TYPE = "INST_002",
  MISSING_DOCS = "INST_003",
  INVALID_CONTACT = "INST_004",
  EXPIRED_LICENSE = "INST_005",
  SETUP_INCOMPLETE = "INST_006"
}

interface ErrorResponse {
  code: InstitutionErrorCodes;
  message: string;
  field?: string;
  details?: any;
  resolution?: string;
}
```

## 2. Role Application Validation

### A. Teacher Validation
```typescript
interface TeacherValidation {
  qualifications: {
    minDegrees: 1;
    requiredFields: [
      "degree", "institution", "year", "certificate"
    ];
    yearRange: {
      min: "1960";
      max: "currentYear";
    };
  };
  experience: {
    detailsRequired: [
      "institution", "role", "duration", "responsibilities"
    ];
    referenceRequired: {
      forExperienceOver: "2_YEARS";
      fields: ["name", "position", "contact"];
    };
  };
  documents: {
    required: [
      "resume", "identityProof", "qualificationProof"
    ];
    optional: ["recommendations", "publications"];
    fileTypes: {
      resume: ["pdf", "docx"];
      certificates: ["pdf", "jpg", "png"];
      identity: ["pdf", "jpg"];
    };
  };
}
```

### B. Student Validation
```typescript
interface StudentValidation {
  personal: {
    ageRange: {
      min: 15;
      max: 65;
    };
    requiredFields: [
      "name", "dob", "contact", "guardian"
    ];
    contactVerification: {
      email: true;
      phone: true;
      guardian: true;
    };
  };
  academic: {
    previousEducation: {
      required: true;
      minRecords: 1;
      gradeFormat: {
        percentage: "0-100";
        gpa: "0.0-4.0";
      };
    };
    entranceExams: {
      validateScores: true;
      expiryCheck: true;
      cutoffEnforcement: true;
    };
  };
  documents: {
    required: [
      "transcripts",
      "identityProof",
      "photo"
    ];
    specifications: {
      photo: {
        dimensions: "350x350";
        format: ["jpg", "png"];
        maxSize: "2MB";
      };
      transcripts: {
        format: ["pdf"];
        maxSize: "10MB";
        scan: {
          dpi: 300;
          color: true;
        };
      };
    };
  };
}
```

### C. Department Head Validation
```typescript
interface DepartmentHeadValidation {
  qualifications: {
    minimumDegree: "MASTERS";
    specialization: {
      required: true;
      relevanceCheck: true;
    };
    experience: {
      total: "5_YEARS";
      leadership: "2_YEARS";
    };
  };
  professional: {
    references: {
      minimum: 2;
      academic: 1;
      professional: 1;
      verification: {
        method: "EMAIL";
        timeout: "7_DAYS";
      };
    };
    vision: {
      minWords: 500;
      sections: [
        "academic", "research", "development"
      ];
    };
  };
  documents: {
    essential: [
      "cv", "certificates", "publications"
    ];
    verification: {
      method: "THIRD_PARTY";
      timeframe: "5_DAYS";
    };
  };
}
```

### D. Parent Account Validation
```typescript
interface ParentValidation {
  relationship: {
    proofRequired: true;
    validTypes: [
      "BIRTH_CERTIFICATE",
      "LEGAL_GUARDIAN",
      "COURT_ORDER"
    ];
    verification: {
      student: true;
      documents: true;
      contact: true;
    };
  };
  access: {
    levels: {
      VIEW_GRADES: "DEFAULT";
      VIEW_ATTENDANCE: "DEFAULT";
      VIEW_FEES: "DEFAULT";
      COMMUNICATE: "DEFAULT";
    };
    restrictions: {
      timeLimit: "ACADEMIC_YEAR";
      dataRetention: "1_YEAR";
      deviceLimit: 2;
    };
  };
  security: {
    mfaRequired: true;
    ipRestriction: true;
    sessionTimeout: "2_HOURS";
    activityLogging: true;
  };
}
```

## 3. Common Validation Rules

### A. Contact Information
```typescript
interface ContactValidation {
  email: {
    format: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    verification: {
      required: true;
      expiry: "24_HOURS";
      maxAttempts: 3;
    };
  };
  phone: {
    format: {
      international: true;
      acceptable: [
        "+[1-9]{1}[0-9]{3,14}"
      ];
    };
    verification: {
      required: true;
      method: "SMS";
      expiry: "10_MINUTES";
    };
  };
  address: {
    required: [
      "line1", "city", "state", "postal"
    ];
    validation: {
      postal: "COUNTRY_SPECIFIC";
      geocoding: "OPTIONAL";
    };
  };
}
```

### B. Document Validation
```typescript
interface DocumentValidation {
  global: {
    maxSize: "25MB";
    allowedTypes: [
      "pdf", "jpg", "png", "docx"
    ];
    scanning: {
      virus: true;
      malware: true;
      content: true;
    };
  };
  imageSpecific: {
    minResolution: "1200x1600";
    maxResolution: "4800x6400";
    formats: ["jpg", "png"];
    compression: {
      allowed: true;
      maxRatio: 0.8;
    };
  };
  pdfSpecific: {
    maxPages: 50;
    searchable: true;
    encryption: {
      allowed: true;
      maxLevel: "128_BIT";
    };
  };
}
```

## 4. Error Handling

### A. Validation Errors
```typescript
interface ValidationError {
  type: "VALIDATION";
  code: string;
  message: string;
  field?: string;
  value?: any;
  constraints?: string[];
  suggestion?: string;
}

interface ValidationErrorResponse {
  status: "ERROR";
  errors: ValidationError[];
  timestamp: string;
  requestId: string;
  canRetry: boolean;
}
```

### B. Processing Errors
```typescript
interface ProcessingError {
  type: "PROCESSING";
  stage: "UPLOAD" | "VERIFY" | "APPROVE";
  code: string;
  message: string;
  retry?: {
    allowed: boolean;
    after: string;
    maxAttempts: number;
  };
}

interface SystemError {
  type: "SYSTEM";
  code: string;
  message: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  action: "RETRY" | "CONTACT_SUPPORT" | "WAIT";
}
```

## 5. Implementation Guidelines

### A. Validation Implementation
1. Order of Validation:
   - Basic field validation
   - Document validation
   - Business rule validation
   - Cross-field validation
   - External service validation

2. Performance Considerations:
   - Validate client-side first
   - Batch server validations
   - Cache validation results
   - Implement timeout handlers

3. Error Communication:
   - Clear error messages
   - Field-level feedback
   - Suggested corrections
   - Progress preservation

### B. Security Guidelines
1. Input Sanitization:
   - XSS prevention
   - SQL injection protection
   - File type verification
   - Content scanning

2. Document Security:
   - Virus scanning
   - Metadata stripping
   - Format validation
   - Size restrictions

3. Access Control:
   - Role verification
   - Institution context
   - Data isolation
   - Audit logging