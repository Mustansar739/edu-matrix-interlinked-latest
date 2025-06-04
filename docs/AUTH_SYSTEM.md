/\*\*

- @fileoverview Authentication System Architecture
- WHAT: Define authentication strategy for platform
- WHERE: Used across EDU Matrix Interlinked
- HOW: Dual authentication system implementation
  \*/

# Authentication System Architecture

## Tech Stack

- Next.js 15+ with App Router
- NextAuth.js for authentication
- JWT for token management
- Redis 7+ for session storage
- PostgreSQL 15+ for user data
- TypeScript 5+ for type safety

## Implementation Architecture

### Authentication Flow

```typescript
interface AuthSystem {
  providers: {
    credentials: "Email/Password";
    oauth: ["Google"];
    jwt: "JSON Web Tokens";
  };

  storage: {
    sessions: "Redis 7+";
    users: "PostgreSQL 15+";
    cache: "Redis Cluster";
  };

  security: {
    tokens: "JWT with rotation";
    encryption: "AES-256";
    mfa: "Time-based OTP";
  };
}
```

### Session Management

```typescript
interface SessionManagement {
  store: {
    type: "Redis Cluster";
    ttl: "24 hours";
    refresh: "Sliding window";
  };

  tokens: {
    access: "15 minutes";
    refresh: "7 days";
    rotation: "On refresh";
  };
}
```

## Authentication Flow

### 1. User Authentication

```typescript
interface AuthFlow {
  login: {
    endpoint: "/api/auth/login";
    method: "POST";
    tokenExpiry: "24h";
  };
  register: {
    endpoint: "/api/auth/register";
    method: "POST";
    verification: true;
  };
}
```

### 2. Token Management

- JWT-based authentication
- Redis session storage
- Secure HTTP-only cookies
- CSRF protection

### 3. Role-Based Access

```typescript
enum UserRoles {
  STUDENT = "student",
  INSTITUTION = "institution",
  ADMIN = "admin",
}
```

## Security Features

### 1. Password Security

- Argon2 hashing
- Pepper and salt
- Rate limiting
- Breach detection

### 2. Session Management

- Token rotation
- Concurrent sessions
- Device tracking
- Auto-logout

### 3. Protection Measures

- XSS prevention
- CSRF tokens
- SQL injection
- Input validation

## API Integration

### 1. Protected Routes

```typescript
const protectedRoutes = [
  "/api/edu-matrix-hub/*",
  "/api/students/*",
  "/api/courses/*",
];
```

### 2. Auth Headers

```typescript
interface AuthHeaders {
  "X-User-Id": string;
  "X-User-Role": UserRoles;
  "X-CSRF-Token": string;
}
```

## Error Handling

### 1. Auth Errors

- Invalid credentials
- Expired tokens
- Missing permissions
- Rate limit exceeded

### 2. Recovery Process

- Password reset
- Account recovery
- Session cleanup
- Audit logging

## Dual Authentication Architecture

### 1. SimpleAuth (Public Platform Access)

For accessing basic platform features:

- Social feed (Students Interlinked)
- Course browsing
- Institution exploration
- Job/Freelance listings
- Educational news
- Community chat

### 2. EduMatrixAuth (Institution Access)

For accessing Edu Matrix Hub features:

- Institution-specific access
- Role-based permissions (Admin, Teacher, Student, Parent)
- Multi-factor authentication
- Tenant isolation
- Automated permissions

## System Overview

Highly scalable authentication system handling 1M+ concurrent users with:

- Multi-provider authentication (OAuth + Credentials)
- Redis-backed session management
- Role-based access control (RBAC)
- Multi-region token validation
- Real-time security monitoring

## Core Components

### 1. Authentication Providers

```typescript
interface AuthProviders {
  oauth: {
    google: {
      enabled: true;
      scopes: ["profile", "email", "openid"];
      allowedDomains: string[]; // Educational domains
    };
    github: {
      enabled: true;
      scopes: ["user", "user:email"];
    };
    linkedin: {
      enabled: true;
      scopes: ["r_liteprofile", "r_emailaddress"];
    };
  };

  credentials: {
    enabled: true;
    passwordPolicy: {
      minLength: 12;
      requireUppercase: true;
      requireNumbers: true;
      requireSpecialChars: true;
      preventCommonPasswords: true;
    };
  };

  mfa: {
    type: "TOTP";
    backupCodes: 10;
    rememberDevice: true;
    forceEnable: boolean; // Required for admins
  };
}
```

### 2. NextAuth Implementation

```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Implement secure password verification
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
};

export default NextAuth(authOptions);
```

### 3. Password Encryption & Storage

```typescript
const passwordSecurity: PasswordSecurity = {
  hashing: {
    algorithm: "Argon2id",
    params: {
      memoryCost: 8192,  // 8MB instead of 64MB
      timeCost: 3,       // 3 iterations (Keeps security strong)
      parallelism: 2,    // 2 threads (Less CPU load)
      saltLength: 16,    // 16 bytes salt (Best practice)
      hashLength: 32,    // 32 bytes hash (Strong security)
    },
  },
};


  storage: {
    passwordHash: string;   // Argon2id hash
    lastChanged: DateTime;
    historyCount: number;   // Previous password hashes
    failedAttempts: number;
    lockoutUntil: DateTime;
  };
}

// Password hashing implementation
import { hash, verify } from "argon2";

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, {
    type: argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4
  });
};

const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  return await verify(hash, password);
};
```

### 4. Role-Based Access Control (RBAC)

```typescript
interface RBACSystem {
  roles: {
    SUPER_ADMIN: "Complete system access";
    INSTITUTION_ADMIN: "Institution-wide access";
    TEACHER: "Class and course access";
    STUDENT: "Learning platform access";
    PARENT: "Child data access";
    GUEST: "Public content access";
  };

  permissions: {
    users: {
      create: Role[];
      read: Role[];
      update: Role[];
      delete: Role[];
    };
    courses: {
      create: Role[];
      enroll: Role[];
      teach: Role[];
      manage: Role[];
    };
    content: {
      create: Role[];
      view: Role[];
      edit: Role[];
      delete: Role[];
    };
  };

  validation: {
    checkPermission: (user: User, action: string, resource: string) => boolean;
    enforceAccess: (permission: string) => MiddlewareFunction;
  };
}

// RBAC Implementation
const checkPermission = (
  user: User,
  action: string,
  resource: string
): boolean => {
  const userRole = user.role;
  const permissionMatrix = getPermissionMatrix();
  return permissionMatrix[userRole]?.[resource]?.[action] || false;
};

// RBAC Middleware
const enforceAccess = (permission: string) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextFunction
  ) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const hasPermission = checkPermission(session.user, permission, req.url);
    if (!hasPermission) return res.status(403).json({ error: "Forbidden" });

    return next();
  };
};
```

### 5. JWT Session Management

```typescript
interface JWTConfig {
  token: {
    accessToken: {
      expiry: "7d";
      algorithm: "ES256";
      payload: {
        userId: string;
        role: string;
        permissions: string[];
      };
    };
    refreshToken: {
      expiry: "30d";
      rotationPolicy: "each-use";
      family: string;
    };
  };

  security: {
    privateKey: string;
    publicKey: string;
    keyRotation: "30d";
    blacklist: string[];
  };
}

// JWT Implementation
import { SignJWT, jwtVerify } from "jose";
import { generateKeyPair } from "crypto";

const generateToken = async (payload: any): Promise<string> => {
  const privateKey = await getPrivateKey();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "ES256" })
    .setExpirationTime("15m")
    .setIssuedAt()
    .sign(privateKey);
};

const verifyToken = async (token: string): Promise<any> => {
  const publicKey = await getPublicKey();
  const { payload } = await jwtVerify(token, publicKey);
  return payload;
};
```

### 6. Schema Validation with Zod

```typescript
// Validation Schemas
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email is too short")
    .max(255, "Email is too long"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .max(128, "Password is too long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must include uppercase, lowercase, number and special character"
    ),
});

export const registrationSchema = loginSchema.extend({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  role: z.enum(["STUDENT", "TEACHER", "PARENT", "INSTITUTION_ADMIN"]),
  institution: z.string().optional(),
});

// Frontend Implementation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <input type="password" {...register("password")} />
      {errors.password && <span>{errors.password.message}</span>}
      <button type="submit">Login</button>
    </form>
  );
};
```

### 7. OTP Verification System

```typescript
interface OTPSystem {
  generation: {
    length: 6;
    expiry: "10m";
    type: "numeric";
    algorithm: "SHA256";
  };

  delivery: {
    email: {
      provider: "Resend";
      template: "OTP_VERIFICATION";
      maxRetries: 3;
    };
    sms: {
      provider: "Twilio";
      template: "SMS_OTP";
      maxRetries: 3;
    };
  };

  verification: {
    maxAttempts: 3;
    lockoutDuration: "15m";
    cooldown: "1m";
  };
}

// OTP Implementation
import { totp } from "otplib";

const generateOTP = async (userId: string): Promise<string> => {
  const secret = await generateSecret();
  const otp = totp.generate(secret);

  await redis.set(
    `otp:${userId}`,
    { otp, attempts: 0 },
    "EX",
    600 // 10 minutes
  );

  return otp;
};

const verifyOTP = async (userId: string, otp: string): Promise<boolean> => {
  const storedData = await redis.get(`otp:${userId}`);
  if (!storedData) return false;

  const { otp: storedOTP, attempts } = storedData;
  if (attempts >= 3) throw new Error("Max attempts exceeded");

  if (otp !== storedOTP) {
    await redis.hincrby(`otp:${userId}`, "attempts", 1);
    return false;
  }

  await redis.del(`otp:${userId}`);
  return true;
};
```

### 8. Persistent Authentication System

```typescript
interface RateLimiting {
  login: {
    window: "15m";
    max: 5;
    blockDuration: "1h";
  };

  otp: {
    generation: {
      window: "24h";
      max: 5;
    };
    verification: {
      window: "15m";
      max: 3;
    };
  };

  passwordReset: {
    window: "24h";
    max: 3;
    blockDuration: "24h";
  };
}
```

### 2. Brute Force Protection

- IP-based rate limiting
- Account lockout after failed attempts
- Progressive delays between attempts
- Suspicious activity monitoring

### 3. Session Security

- Secure session cookie settings
- CSRF token protection
- Session invalidation on security events
- Device fingerprinting

## Error Handling & Logging

### 1. Authentication Errors

```typescript
interface AuthErrors {
  types: {
    INVALID_CREDENTIALS: "Invalid email or password";
    ACCOUNT_LOCKED: "Account temporarily locked";
    INVALID_TOKEN: "Invalid or expired token";
    PERMISSION_DENIED: "Insufficient permissions";
  };

  handling: {
    logging: "Error details to log";
    userMessage: "User-friendly message";
    actionRequired: "Required user action";
  };
}
```

### 2. Security Logging

- Authentication attempts
- Password changes
- Permission changes
- Security events
- Suspicious activities

## Monitoring & Analytics

### 1. Security Metrics

- Login success/failure rates
- MFA adoption rates
- Session durations
- Permission usage patterns
- Security event frequencies

### 2. Performance Metrics

- Authentication response times
- Token validation speed
- Cache hit rates
- Error frequencies
- API latencies

## Implementation Guidelines

### 1. Security Best Practices

- Always use HTTPS with HSTS
- Implement proper CORS policies
- Use secure HTTP-only cookies
- Enable MFA for sensitive roles
- Regular security audits
- Token rotation and cleanup
- Session invalidation on security events

### 2. Performance Optimization

- Multi-layer caching strategy
- Efficient token validation
- Connection pooling for databases
- Request batching and throttling
- Edge function deployment
- Cross-region session replication
- Load balancing and failover

### 3. Monitoring & Analytics

- Real-time security metrics
- Performance monitoring
- Error tracking and alerts
- User behavior analysis
- Resource utilization
- System health checks
- Audit logging

### 4. Compliance Requirements

- GDPR data handling
- CCPA privacy controls
- PDPA compliance
- Data encryption standards
- Audit trail maintenance
- User consent tracking
- Data retention policies

### 5. Disaster Recovery

- Multi-region failover
- Session data backup
- Token recovery process
- System state recovery
- Data consistency checks
- Incident response plan
- Regular DR testing

## Success Metrics

- Auth response time < 100ms
- Session validation < 50ms
- Cache hit rate > 95%
- Error rate < 0.01%
- Availability > 99.99%
- Recovery time < 5min
- Zero data loss

/\*\*

- @fileoverview Authentication & Persistence Strategy
- @module Auth
- @category Technical
-
- @description
- Enhanced authentication implementation with persistent sessions
- and offline support
-
- Generated by Copilot
  \*/

# Authentication Enhancement Strategy

## 1. Persistent Authentication

### Local Storage Strategy

```typescript
interface AuthStorage {
  session: {
    token: "JWT with refresh token";
    user: "Basic user data";
    preferences: "UI settings";
    lastSync: "Last server sync";
  };

  persistence: {
    indexedDB: "Encrypted credentials";
    secureStore: "Biometric data";
    tokenRefresh: "Background refresh";
  };

  security: {
    encryption: "AES-256 encryption";
    biometric: "Device authentication";
    pinCode: "Offline access PIN";
  };
}
```

## 2. Multi-Device Authentication

### Device Management

```typescript
interface DeviceAuth {
  registration: {
    deviceId: "Unique device identifier";
    fingerprint: "Device fingerprint";
    capabilities: "Device features";
    trustLevel: "Device trust score";
  };

  sync: {
    preferences: "Cross-device settings";
    sessions: "Active sessions";
    notifications: "Push registration";
  };

  security: {
    verification: "2FA per device";
    revokeAccess: "Remote logout";
    activityLog: "Device history";
  };
}
```

## 3. Offline Authentication

### Local Validation

```typescript
interface OfflineAuth {
  validation: {
    cached: "Cached credentials";
    biometric: "Local biometric";
    pin: "Offline PIN code";
  };

  sync: {
    queue: "Pending actions";
    conflict: "Resolution strategy";
    backup: "Credential backup";
  };
}
```

## 4. Performance Optimization

### Fast Authentication

```typescript
interface AuthPerformance {
  initial: {
    prefetch: "Critical user data";
    parallel: "Parallel requests";
    progressive: "Progressive loading";
  };

  caching: {
    session: "Redis session store";
    permissions: "Cached RBAC rules";
    userdata: "Cached profile";
  };

  optimization: {
    tokenSize: "Minimal JWT payload";
    validation: "Local token check";
    refresh: "Background refresh";
  };
}
```

## Implementation Guidelines

### 1. Setup Process

- Implement secure credential storage
- Enable biometric authentication
- Configure offline access
- Set up cross-device sync
- Enable progressive loading

### 2. Security Measures

- Implement encryption at rest
- Enable secure key storage
- Configure token rotation
- Set up activity monitoring
- Enable fraud detection

### 3. Performance Features

- Use connection pooling
- Implement cache layers
- Enable parallel loading
- Configure prefetching
- Optimize token validation

### 4. Monitoring Setup

- Track auth metrics
- Monitor failed attempts
- Log suspicious activity
- Track performance
- Monitor device trust

## Auth System Updates

- Updated authentication flows with multi-factor support.
- Added security best practices and session management details.
