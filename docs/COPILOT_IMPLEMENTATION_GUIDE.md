/**
 * @fileoverview GitHub Copilot Implementation Guidelines
 * WHY: Define strict development process and implementation standards
 * WHERE: Used as the primary reference for all development work
 * HOW: Implements four-phase development process with extensive documentation
 */

# GitHub Copilot Implementation Guidelines

## 1. Development Process

### A. Deep Thinking Phase
```typescript
interface ThinkingProcess {
  analysis: {
    context: "Complete system understanding",
    implications: "Architectural impact",
    challenges: "Potential bottlenecks",
    security: "Security implications",
    scale: "Scalability concerns"
  },
  perspective: {
    experience: "30 years of coding expertise",
    patterns: "Historical best practices",
    pitfalls: "Common failure points",
    evolution: "Future maintenance"
  }
}
```

### B. Problem Analysis Phase
```typescript
interface ProblemAnalysis {
  breakdown: {
    components: "Logical system parts",
    dependencies: "Inter-service impacts",
    constraints: "System limitations",
    requirements: "Critical features"
  },
  evaluation: {
    performance: "Scaling capabilities",
    security: "Threat modeling",
    maintenance: "Long-term viability",
    compliance: "Regulatory needs"
  }
}
```

### C. Planning Phase
```typescript
interface ImplementationPlan {
  strategy: {
    approach: "Implementation method",
    phases: "Deployment stages",
    validation: "Testing strategy",
    rollback: "Recovery plans"
  },
  documentation: {
    architecture: "System design",
    interfaces: "API contracts",
    deployment: "Operation guides",
    maintenance: "Support procedures"
  }
}
```

### D. Implementation Phase
```typescript
interface ImplementationStandards {
  documentation: {
    files: {
      header: "Purpose and context",
      inline: "Code explanations",
      api: "Interface contracts"
    },
    comments: {
      why: "Purpose explanation",
      where: "Usage context",
      how: "Implementation details"
    }
  },
  quality: {
    security: "Best practices",
    performance: "Optimization",
    testing: "Coverage requirements",
    monitoring: "Observability"
  }
}
```

## 2. Architecture Understanding

### A. Core Architecture Principles
```typescript
interface ArchitectureGuidelines {
  pattern: {
    type: "True Microservices",
    initialDb: "Shared PostgreSQL with schema isolation",
    communication: "Event-driven via Kafka",
    scaling: "Independent per service"
  },
  boundaries: {
    services: "Complete isolation",
    data: "Schema-per-service",
    events: "Domain events only",
    apis: "Service-specific endpoints"
  }
}
```

### B. Service Organization
1. Initial Phase Structure:
   ```
   /app
     /(services)                  # Service route groups
       /(service-name)           # Service-specific routes
         /api                    # Service API routes
         /(features)            # Service features
     /lib
       /services               # Service implementations
         /(service-name)       # Service-specific code
   ```

2. Future Extraction Structure:
   ```
   /(service-name)-service      # Independent service
     /app                      # Next.js app
     /lib                      # Business logic
     /prisma                   # Service schema
     /docker                   # Service containers
   ```

## 3. Code Generation Rules

### A. Service Isolation
```typescript
interface CopilotRules {
  suggestions: {
    imports: "No cross-service imports",
    database: "Schema-specific queries only",
    events: "Domain events for communication",
    state: "Service-isolated state"
  },
  patterns: {
    routing: "Service-grouped routes",
    data: "Repository pattern",
    caching: "Service-specific caching",
    validation: "Domain-driven validation"
  }
}
```

### B. Implementation Guidelines
1. Route Handlers:
   ```typescript
   // Example: Edu Matrix Hub course creation
   // WHY: Handle course creation within college service
   // WHERE: Used in matrix-college service API
   // HOW: Validates and creates course in college schema
   async function createCourse(req: Request) {
     // Ensure we're in college service context
     validateServiceContext('matrix-college');
     
     // Use college-specific repository
     const courseRepo = new CollegeCourseRepository();
     
     // Emit domain event after creation
     await eventBus.emit('college.course.created');
   }
   ```

2. Data Access:
   ```typescript
   // Example: College repository pattern
   // WHY: Isolate college data access
   // WHERE: Used in college service only
   // HOW: Maintains schema isolation
   class CollegeCourseRepository {
     private schema = 'matrix_college_schema';
     
     async findCourse(id: string) {
       // Ensure schema isolation
       return prisma.$queryRaw`
         SET search_path TO ${this.schema};
         SELECT * FROM courses WHERE id = ${id}
       `;
     }
   }
   ```

## 4. Error Handling & Observability

### A. Error Management
```typescript
interface ErrorHandlingFramework {
  hierarchy: {
    base: {
      name: "ServiceError",
      properties: {
        code: "Error identifier",
        status: "HTTP status",
        traceId: "Correlation ID",
        timestamp: "Occurrence time"
      }
    },
    types: {
      validation: "Input validation failures",
      authorization: "Permission issues",
      business: "Domain logic errors",
      technical: "System failures",
      external: "Third-party errors"
    }
  },

  handling: {
    strategies: {
      retry: {
        conditions: "Transient failures",
        backoff: "Exponential with jitter",
        limits: "Maximum attempts",
        cleanup: "Resource release"
      },
      fallback: {
        degradation: "Reduced functionality",
        caching: "Stale data usage",
        alternatives: "Backup services",
        notification: "User feedback"
      }
    },
    recovery: {
      automatic: {
        detection: "Error patterns",
        resolution: "Self-healing",
        verification: "Health checks",
        reporting: "Status updates"
      },
      manual: {
        alerting: "Team notification",
        escalation: "Priority levels",
        documentation: "Resolution steps",
        tracking: "Issue lifecycle"
      }
    }
  }
}
```

### B. Observability Implementation
```typescript
interface ObservabilityFramework {
  tracing: {
    spans: {
      http: "API requests",
      database: "Query operations",
      cache: "Redis operations",
      events: "Kafka messages"
    },
    context: {
      user: "Request initiator",
      tenant: "Institution context",
      service: "Component name",
      instance: "Server identifier"
    },
    sampling: {
      rules: {
        errors: "100% capture",
        performance: "Latency based",
        standard: "Fixed percentage"
      }
    }
  },

  metrics: {
    types: {
      business: {
        usage: "Feature adoption",
        engagement: "User activity",
        conversion: "Goal completion",
        retention: "User returns"
      },
      technical: {
        latency: "Response times",
        errors: "Failure rates",
        saturation: "Resource usage",
        traffic: "Request volume"
      }
    },
    collection: {
      method: "Push with batching",
      interval: "15-second resolution",
      aggregation: "Statistical summaries",
      retention: "30-day history"
    }
  },

  logging: {
    levels: {
      error: "System failures",
      warn: "Potential issues",
      info: "State changes",
      debug: "Detailed flow",
      trace: "Development data"
    },
    structure: {
      standard: {
        timestamp: "ISO 8601 format",
        level: "Severity indicator",
        service: "Component name",
        message: "Event description"
      },
      context: {
        trace: "Correlation ID",
        user: "Actor identifier",
        tenant: "Institution ID",
        action: "Operation name"
      }
    }
  },

  alerting: {
    rules: {
      critical: {
        response: "Immediate action",
        notification: "Call + SMS",
        escalation: "5-minute delay",
        resolution: "Highest priority"
      },
      warning: {
        response: "Investigation needed",
        notification: "Email + Slack",
        escalation: "30-minute delay",
        resolution: "Normal priority"
      }
    },
    thresholds: {
      error_rate: "> 1% requests",
      latency_p95: "> 500ms",
      cpu_usage: "> 80% sustained",
      memory: "> 85% utilization"
    }
  }
}
```

### C. Implementation Examples
```typescript
// Example: Error handling implementation
// WHY: Ensure consistent error management across services
// WHERE: Used in all service request handlers
// HOW: Implements structured error capture and response
async function handleServiceError(
  error: unknown,
  context: RequestContext
): Promise<ErrorResponse> {
  // Standardize error structure
  const serviceError = normalizeError(error);
  
  // Capture error context
  const errorContext = {
    service: context.service,
    tenant: context.institution_id,
    user: context.user_id,
    trace: context.trace_id
  };

  // Log with proper context
  logger.error("Service operation failed", {
    error: serviceError,
    context: errorContext
  });

  // Track error metrics
  metrics.increment("service.errors", {
    type: serviceError.type,
    service: context.service
  });

  // Create trace span
  const span = tracer.createSpan("error_handling", {
    error: true,
    ...errorContext
  });

  try {
    // Attempt recovery if possible
    if (isRecoverable(serviceError)) {
      await attemptRecovery(serviceError, context);
    }

    // Alert if critical
    if (isCritical(serviceError)) {
      await alerting.notify({
        severity: "critical",
        error: serviceError,
        context: errorContext
      });
    }

    // Format user-safe response
    return formatErrorResponse(serviceError);

  } finally {
    span.end();
  }
}
```

## 5. Database Interactions

### A. Schema Isolation
```typescript
// Example: Schema isolation pattern
// WHY: Maintain service data boundaries
// WHERE: All database interactions
// HOW: Explicit schema setting
const dbInteraction = {
  preparation: 'SET search_path TO ${schema}',
  validation: 'SELECT current_schema()',
  cleanup: 'RESET search_path'
};
```

### B. Query Patterns
1. Service-Specific Queries:
   ```typescript
   // Correct: Schema-isolated query
   const users = await prisma.$queryRaw`
     SET search_path TO ${serviceSchema};
     SELECT * FROM users WHERE tenant_id = ${tenantId}
   `;

   // Incorrect: Cross-schema query
   // const users = await prisma.user.findMany({
   //   where: { schema: 'other_service' }  // WRONG!
   // });
   ```

## 6. Event Communication

### A. Event Patterns
```typescript
interface EventGuidelines {
  naming: "${service}.${entity}.${action}",
  payload: "Minimal necessary data",
  version: "Event schema version",
  handling: "Service-specific handlers"
}
```

### B. Implementation Examples:
```typescript
// Example: Event emission
// WHY: Cross-service communication
// WHERE: After state changes
// HOW: Through Kafka broker
async function emitCourseCreated(course: Course) {
  await kafka.emit('matrix-college.course.created', {
    id: course.id,
    name: course.name,
    // Only necessary data
  });
}
```

## 7. API Design

### A. Endpoint Structure
```typescript
interface APIGuidelines {
  routes: "/api/(service-name)/*",
  handlers: "Service-specific logic",
  validation: "Domain-driven validation",
  responses: "Standard response format"
}
```

### B. Implementation Pattern:
```typescript
// Example: API route handler
// WHY: Handle service-specific request
// WHERE: Service API endpoints
// HOW: With service isolation
export async function POST(req: Request) {
  // Ensure service context
  validateServiceContext();

  // Use service repositories
  const repo = new ServiceRepository();

  // Emit service events
  await eventBus.emit('service.action.completed');
}
```

## 8. State Management

### A. Service State
```typescript
interface StateGuidelines {
  scope: "Service-bounded state",
  sharing: "Event-driven updates",
  caching: "Service-specific caches",
  persistence: "Schema-isolated storage"
}
```

### B. Implementation Rules:
1. State Isolation:
   - Keep state within service boundaries
   - Use events for cross-service updates
   - Maintain service-specific caching
   - Implement service-level persistence

## 9. Testing Patterns

### A. Test Organization
```typescript
interface TestGuidelines {
  scope: "Service-specific tests",
  isolation: "Independent test data",
  mocking: "External service mocks",
  coverage: "Service boundary coverage"
}
```

### B. Implementation Examples:
```typescript
// Example: Service test
// WHY: Validate service behavior
// WHERE: Service test suite
// HOW: With isolated testing
describe('MatrixCollege Service', () => {
  beforeEach(() => {
    // Set service context
    setServiceContext('matrix-college');
    
    // Use service schema
    mockDatabase.setSchema('matrix_college_schema');
  });
});
```

## 10. Security Considerations

### A. Security Patterns
```typescript
interface SecurityGuidelines {
  authentication: "Service-level auth",
  authorization: "Service-specific roles",
  validation: "Domain-driven validation",
  encryption: "Service-sensitive data"
}
```

### B. Implementation Rules:
1. Security Boundaries:
   - Implement service-level security
   - Maintain service-specific roles
   - Validate within service context
   - Encrypt sensitive service data

## 2. Problem Discussion Process

### A. Question Analysis Framework
```typescript
interface DiscussionProcess {
  initialAnalysis: {
    scope: {
      impact: "System-wide effects",
      boundaries: "Service limitations",
      dependencies: "Inter-service relationships",
      risks: "Potential challenges"
    },
    context: {
      technical: "Technical implications",
      business: "Business requirements",
      users: "User experience impact",
      operations: "Operational concerns"
    }
  },

  solutionExploration: {
    approaches: {
      immediate: "Short-term solutions",
      strategic: "Long-term strategies",
      hybrid: "Phased implementation",
      alternatives: "Different options"
    },
    evaluation: {
      pros: "Advantages analysis",
      cons: "Disadvantages review",
      risks: "Risk assessment",
      mitigation: "Risk management"
    }
  },

  recommendationFramework: {
    structure: {
      context: "Problem background",
      analysis: "Detailed evaluation",
      options: "Available solutions",
      recommendation: "Preferred approach"
    },
    validation: {
      technical: "Architecture alignment",
      scalability: "Growth support",
      maintenance: "Long-term viability",
      compliance: "Regulatory adherence"
    }
  }
}
```

### B. Discussion Guidelines

1. Initial Response:
   ```typescript
   interface ResponsePattern {
     acknowledgment: {
       understanding: "Problem comprehension",
       clarification: "Any unclear points",
       scope: "Impact assessment"
     },
     analysis: {
       immediate: "Quick insights",
       deeper: "Underlying issues",
       context: "System implications"
     }
   }
   ```

2. Deep Dive Process:
   ```typescript
   interface AnalysisProcess {
     technical: {
       architecture: "System design impact",
       performance: "Scaling considerations",
       security: "Security implications",
       maintenance: "Support requirements"
     },
     business: {
       value: "Solution benefits",
       constraints: "Implementation limits",
       timeline: "Delivery schedule",
       resources: "Required resources"
     }
   }
   ```

3. Solution Exploration:
   ```typescript
   interface SolutionFramework {
     options: {
       immediate: "Quick wins",
       shortTerm: "Near-term solutions",
       longTerm: "Strategic approaches",
       hybrid: "Combined strategies"
     },
     evaluation: {
       effort: "Implementation work",
       impact: "System effects",
       risks: "Potential issues",
       benefits: "Expected gains"
     }
   }
   ```

### C. Documentation Requirements

1. Discussion Documentation:
   ```typescript
   interface DiscussionRecord {
     context: {
       problem: "Issue description",
       background: "Relevant history",
       constraints: "Known limitations",
       requirements: "Must-have features"
     },
     analysis: {
       technical: "Technical review",
       architectural: "Design impact",
       operational: "Running concerns",
       maintenance: "Support needs"
     },
     resolution: {
       approach: "Chosen solution",
       rationale: "Decision reasons",
       timeline: "Implementation plan",
       validation: "Success criteria"
     }
   }
   ```

2. Follow-up Actions:
   ```typescript
   interface ActionItems {
     documentation: {
       updates: "Documentation changes",
       patterns: "New patterns",
       guidelines: "Updated standards"
     },
     implementation: {
       planning: "Development plans",
       validation: "Testing strategy",
       deployment: "Release approach",
       monitoring: "Success tracking"
     }
   }
   ```

This structured approach ensures that all problem discussions:
1. Start with deep understanding
2. Consider all implications
3. Explore multiple solutions
4. Document decisions thoroughly
5. Plan concrete next steps
6. Maintain system integrity

## 3. Compliance & Security Standards

### A. Data Protection Requirements
```typescript
interface ComplianceFramework {
  gdpr: {
    dataHandling: {
      collection: "Explicit consent",
      storage: "Encrypted at rest",
      processing: "Documented purpose",
      deletion: "Right to forget"
    },
    userRights: {
      access: "Data export capability",
      correction: "Data modification",
      portability: "Standard formats",
      erasure: "Complete removal"
    }
  },

  ccpa: {
    requirements: {
      disclosure: "Data usage clarity",
      optOut: "Usage rejection",
      deletion: "Data removal",
      access: "Information review"
    },
    implementation: {
      notice: "Clear privacy policy",
      controls: "User preferences",
      verification: "Identity check",
      tracking: "Usage monitoring"
    }
  },

  pdpa: {
    principles: {
      consent: "Express permission",
      purpose: "Clear objectives",
      minimization: "Required data only",
      accuracy: "Data correctness"
    },
    measures: {
      security: "Data protection",
      retention: "Storage limits",
      transfer: "Cross-border rules",
      breach: "Incident reporting"
    }
  }
}
```

### B. Security Implementation
```typescript
interface SecurityStandards {
  authentication: {
    methods: {
      primary: "JWT with refresh",
      mfa: "Time-based OTP",
      biometric: "Optional enhancement",
      social: "OAuth integration"
    },
    session: {
      duration: "15 minute tokens",
      refresh: "7 day maximum",
      rotation: "On security events",
      revocation: "Immediate capability"
    }
  },

  authorization: {
    rbac: {
      roles: "Hierarchical structure",
      permissions: "Granular control",
      contexts: "Service boundaries",
      audit: "Access logging"
    },
    validation: {
      requests: "Input sanitization",
      responses: "Data filtering",
      files: "Content verification",
      actions: "Operation checks"
    }
  },

  encryption: {
    data: {
      atRest: "AES-256-GCM",
      inTransit: "TLS 1.3",
      backups: "Encrypted storage",
      keys: "Secure key management"
    },
    processes: {
      keyRotation: "Annual schedule",
      verification: "Integrity checks",
      monitoring: "Security events",
      recovery: "Key restoration"
    }
  }
}
```

### C. Implementation Checklist
```typescript
interface SecurityChecklist {
  development: {
    review: {
      code: "Security analysis",
      dependencies: "Vulnerability scan",
      configs: "Secure settings",
      secrets: "Safe handling"
    },
    testing: {
      security: "Penetration tests",
      compliance: "Regulation checks",
      performance: "Load testing",
      recovery: "Failover drills"
    }
  },

  deployment: {
    validation: {
      configuration: "Security settings",
      certificates: "SSL/TLS setup",
      firewalls: "Network rules",
      monitoring: "Security alerts"
    },
    documentation: {
      procedures: "Security protocols",
      incidents: "Response plans",
      contacts: "Emergency numbers",
      recovery: "Restore process"
    }
  }
}
```

### D. Monitoring Requirements
```typescript
interface SecurityMonitoring {
  realtime: {
    alerts: {
      critical: "Immediate response",
      warning: "Investigation needed",
      info: "Tracking purpose"
    },
    metrics: {
      authentication: "Login attempts",
      authorization: "Access patterns",
      resources: "Usage monitoring",
      errors: "Security events"
    }
  },

  reporting: {
    audit: {
      trails: "Action logging",
      access: "Data usage",
      changes: "System updates",
      incidents: "Security events"
    },
    compliance: {
      status: "Regulation adherence",
      gaps: "Required actions",
      updates: "Policy changes",
      training: "Staff education"
    }
  }
}
```

These standards ensure:
1. Regulatory compliance
2. Data protection
3. Access control
4. Security monitoring
5. Incident response
6. Audit capabilities
7. Recovery procedures

## 6. Testing Strategy

### A. Multi-Level Testing Approach
```typescript
interface TestingFramework {
  levels: {
    unit: {
      scope: "Individual components",
      isolation: "Mocked dependencies",
      coverage: "95% minimum",
      tooling: "Jest + Testing Library"
    },
    integration: {
      scope: "Service boundaries",
      setup: "Containerized deps",
      coverage: "85% minimum",
      validation: "Contract testing"
    },
    e2e: {
      scope: "User workflows",
      environment: "Staging replica",
      coverage: "Critical paths",
      performance: "Load testing"
    }
  },

  performance: {
    load: {
      concurrent: "1M+ users simulation",
      duration: "24-hour sustained",
      metrics: "Response times + errors",
      thresholds: "p95 < 200ms"
    },
    stress: {
      scaling: "2x target load",
      recovery: "Graceful degradation",
      resources: "Usage patterns",
      limits: "Breaking points"
    }
  }
}
```

### B. Service Testing Standards
```typescript
interface ServiceTests {
  isolation: {
    environment: {
      database: "Isolated schema",
      cache: "Dedicated instance",
      queues: "Test-specific",
      storage: "Temporary files"
    },
    dependencies: {
      external: "Containerized services",
      apis: "Mock endpoints",
      events: "Test subscribers",
      time: "Controlled clock"
    }
  },

  validation: {
    functional: {
      inputs: "Boundary testing",
      flows: "Happy + error paths",
      async: "Event completion",
      idempotency: "Retry safety"
    },
    security: {
      auth: "Permission checks",
      injection: "Input validation",
      encryption: "Data protection",
      audit: "Action logging"
    }
  }
}
```

### C. Test Implementation Examples

1. Service Integration Test:
```typescript
// Example: Course enrollment testing
// WHY: Validate cross-service workflow
// WHERE: Service integration test suites
// HOW: Tests complete enrollment flow
describe('CourseEnrollment', () => {
  // Set up isolated test environment
  const testEnv = new TestEnvironment({
    services: ['matrix-college', 'course-platform'],
    database: { isolatedSchemas: true },
    events: { trackedTopics: ['enrollment.*'] }
  });

  beforeAll(async () => {
    await testEnv.setup();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it('completes enrollment workflow', async () => {
    // Arrange test data
    const student = await createTestStudent();
    const course = await createTestCourse();

    // Act
    const result = await enrollStudentInCourse(student.id, course.id);

    // Assert direct changes
    expect(result.status).toBe('enrolled');
    
    // Assert database state
    const enrollment = await findEnrollment(student.id, course.id);
    expect(enrollment).toMatchSnapshot();

    // Assert events emitted
    const events = testEnv.getEmittedEvents();
    expect(events).toContainEqual({
      type: 'enrollment.completed',
      data: expect.objectContaining({
        studentId: student.id,
        courseId: course.id
      })
    });

    // Assert metrics captured
    const metrics = testEnv.getMetrics();
    expect(metrics).toContainEqual({
      name: 'enrollment_completed',
      value: 1,
      tags: {
        service: 'matrix-college',
        status: 'success'
      }
    });
  });
});
```

2. Load Test Scenario:
```typescript
// Example: Concurrent user load test
// WHY: Validate 1M+ user handling
// WHERE: Performance test suite
// HOW: Simulates high concurrent load
export default function loadTest() {
  const virtualUsers = 1_000_000;
  const duration = '24h';

  group('Course Platform Load', () => {
    // Simulate user mix
    const scenario = new LoadScenario({
      browsing: 0.5,    // 50% browsing
      watching: 0.3,    // 30% video streaming
      interacting: 0.2  // 20% posting/commenting
    });

    // Run with gradual ramp-up
    scenario.rampUp({
      stages: [
        { duration: '1h', target: virtualUsers * 0.2 },
        { duration: '2h', target: virtualUsers * 0.5 },
        { duration: '3h', target: virtualUsers },
        { duration: '18h', target: virtualUsers }
      ]
    });

    // Add checks
    scenario.addChecks({
      http_req_duration: ['p(95) < 200'],
      http_req_failed: ['rate < 0.01'],
      ws_connecting: ['count < 100'],
      ws_msgs_error: ['count == 0']
    });
  });
}
```

These patterns ensure:
1. Comprehensive test coverage
2. Service isolation in tests
3. Performance validation
4. Security verification
5. Reliability confirmation
6. Scalability assurance
7. Quality metrics

This document serves as the primary reference for GitHub Copilot to maintain true microservices architecture while generating code suggestions. Follow these patterns strictly to ensure proper service isolation and maintainable code structure.