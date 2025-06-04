/**
 * @fileoverview API Integration Guide
 * WHAT: Define API integration patterns
 * WHERE: Used across EDU Matrix Interlinked platform
 * HOW: REST API implementation with Next.js API routes
 */

# API Integration Guide

## Base URLs
- Development: `http://localhost:3000/api`
- Production: `https://api.edumatrixhub.com`

## Authentication
All API endpoints require authentication using JWT tokens:
```http
Authorization: Bearer <token>
```

## Core Services

### 1. Students Interlinked API
Base path: `/api/students-interlinked`
- POST `/posts` - Create social post
- GET `/feed` - Get personalized feed
- PUT `/profile` - Update student profile

### 2. Edu Matrix Hub API
Base path: `/api/edu-matrix-hub`
- POST `/institutions` - Register institution
- GET `/institutions/:id` - Get institution details
- PUT `/institutions/:id` - Update institution
- POST `/departments` - Create department
- GET `/analytics` - Get institution analytics

### 3. Course Platform API
Base path: `/api/courses`
- POST `/courses` - Create course
- GET `/courses/:id` - Get course details
- PUT `/courses/:id/enroll` - Enroll student
- GET `/progress/:courseId` - Get course progress

## Rate Limiting
- Standard tier: 100 requests/minute
- Enterprise tier: 1000 requests/minute

## Error Handling
```typescript
interface ErrorResponse {
  error: string;
  code: string;
  details?: Record<string, any>;
}
```

## Webhooks
Configure webhook endpoints to receive real-time updates:
```typescript
interface WebhookPayload {
  event: string;
  data: Record<string, any>;
  timestamp: string;
}
```

## 1. Core API Structure

### Service APIs
```typescript
interface APIStructure {
  studentsInterlinked: {
    posts: "/api/social/posts",
    interactions: "/api/social/interactions",
    feed: "/api/social/feed"
  },
  eduMatrixHub: {
    attendance: "/api/institution/attendance",
    exams: "/api/institution/exams",
    courses: "/api/institution/courses",
    students: "/api/institution/students"
  },
  courses: "/api/courses/*",
  freelancing: "/api/freelance/*",
  jobs: "/api/jobs/*",
  news: "/api/news/*",
  community: "/api/community/*"
};
```

## Axios Configuration

### Base Setup
```typescript
interface AxiosArchitecture {
  instances: {
    main: {
      baseURL: "/api",
      timeout: 10000,
      retries: 3
    },
    auth: {
      baseURL: "/api/auth",
      timeout: 5000,
      withCredentials: true
    },
    upload: {
      baseURL: "/api/upload",
      timeout: 30000,
      maxBodyLength: Infinity
    }
  },

  interceptors: {
    request: [
      "authToken",
      "tenantId",
      "deviceInfo",
      "cacheControl"
    ],
    response: [
      "errorHandler",
      "cacheManager",
      "retryManager"
    ]
  }
}
```

## Caching Strategy

### Cache Configuration
```typescript
interface CacheStrategy {
  layers: {
    memory: {
      max: 100,
      ttl: 300,  // 5 minutes
      invalidation: "LRU"
    },
    persistent: {
      storage: "indexedDB",
      maxAge: 86400,  // 24 hours
      maxSize: "50MB"
    }
  },

  policies: {
    GET: {
      cache: true,
      staleWhileRevalidate: true,
      maxAge: 300
    },
    POST: {
      cache: false,
      invalidatesTags: ["list", "detail"]
    }
  }
}
```

## Error Handling

### Retry Logic
```typescript
interface RetryStrategy {
  conditions: {
    network: [
      "ECONNABORTED",
      "ETIMEDOUT",
      "ENOTFOUND"
    ],
    http: [
      500,  // Server Error
      502,  // Bad Gateway
      503,  // Service Unavailable
      504   // Gateway Timeout
    ]
  },

  backoff: {
    type: "exponential",
    initialDelay: 1000,
    maxDelay: 10000,
    maxRetries: 3
  }
}
```

### Error Recovery
```typescript
interface ErrorRecovery {
  handlers: {
    authentication: {
      401: "Refresh token",
      403: "Clear session"
    },
    validation: {
      400: "Field validation",
      422: "Data validation"
    },
    server: {
      500: "Retry with backoff",
      503: "Circuit breaker"
    }
  },

  userFeedback: {
    toast: "Brief notifications",
    modal: "Detailed errors",
    inline: "Field-level errors"
  }
}
```

## Offline Support

### Request Queue
```typescript
interface OfflineQueue {
  storage: {
    type: "indexedDB",
    table: "pendingRequests",
    maxAge: 604800  // 7 days
  },

  sync: {
    strategy: "background",
    batch: true,
    maxBatchSize: 10,
    conflictResolution: "server-wins"
  }
}
```

## Implementation Guidelines

### 1. Setup Phase
```typescript
// Base configuration
const axiosConfig = {
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Instance creation
const api = axios.create(axiosConfig);
```

### 2. Interceptor Setup
```typescript
// Request interceptor
api.interceptors.request.use(
  config => {
    // Add auth token
    config.headers.Authorization = `Bearer ${getToken()}`;
    // Add tenant ID
    config.headers['X-Tenant-ID'] = getCurrentTenant();
    return config;
  }
);

// Response interceptor
api.interceptors.response.use(
  response => {
    // Cache successful responses
    cacheManager.set(response);
    return response;
  },
  error => {
    // Handle errors with retry logic
    return errorHandler(error);
  }
);
```

### 3. Cache Implementation
```typescript
const cacheManager = {
  set: (response) => {
    const key = generateCacheKey(response.config);
    cache.set(key, {
      data: response.data,
      timestamp: Date.now()
    });
  },
  get: (config) => {
    const key = generateCacheKey(config);
    return cache.get(key);
  }
};
```

## Success Metrics

### Performance Targets
- API Response: < 100ms
- Cache Hit Rate: > 95%
- Error Recovery: > 99%
- Offline Sync: 100%
- Zero data loss

### Reliability Goals
- 99.99% uptime
- < 0.1% error rate
- 100% retry success
- Zero stale cache
- Complete offline support