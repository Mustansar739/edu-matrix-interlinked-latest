/**
 * @fileoverview VPS Deployment Architecture
 * WHAT: Define VPS deployment strategy for microservices
 * WHERE: Used for EDU Matrix Interlinked platform
 * HOW: Single VPS with containerized services
 */

# Microservices VPS Deployment Architecture

## CRITICAL ARCHITECTURE PRINCIPLES
This project follows a pure microservices architecture from day one, with an initial cost-effective deployment on a single VPS. The architecture ensures:
1. True microservices separation in code and data
2. Event-driven communication between services
3. Independent scalability when needed
4. Zero code changes during scaling

## 1. Initial VPS Strategy (First Year)

### Hardware Configuration
```typescript
interface VPSConfig {
  specs: {
    cpu: "2 vCPU cores";
    ram: "8GB";
    ssd: "100GB NVMe";
    bandwidth: "8TB";
  };
  
  optimization: {
    dockerContainers: "Service isolation";
    resourceLimits: "Per-service constraints";
    swapMemory: "4GB with swappiness=10";
    serviceOptimization: "Database, Redis, Kafka tuning";
  };
}
```

### Service Distribution
```typescript
interface ServiceDeployment {
  core: {
    nextjs: "Next.js application";
    eduMatrixHub: "Institution management";
    studentsInterlinked: "Social platform";
    courses: "Course platform";
  };
  
  infrastructure: {
    postgres: "Multi-tenant database";
    redis: "Caching layer";
    kafka: "Message broker";
  };
}
```

### B. Resource Allocation

#### Initial Budget-Friendly Setup (Starting Phase)
```typescript
interface InitialBudgetVPS {
  hardware: {
    cpu: "2 vCPU cores";
    ram: "8GB";
    ssd: "100GB NVMe";
    bandwidth: "8TB";
  };

  resourceOptimization: {
    swap: {
      size: "4GB";
      swappiness: 10;  // Lower value for better performance
    };
    systemTuning: {
      nginx: {
        workerProcesses: 2;
        workerConnections: 2048;
        keepAliveTimeout: 65;
      };
      postgres: {
        maxConnections: 100;
        sharedBuffers: "2GB";
        effectiveCacheSize: "4GB";
      };
      redis: {
        maxmemory: "2GB";
        maxmemoryPolicy: "allkeys-lru";
      };
      kafka: {
        heapSize: "1GB";
        retentionSize: "25GB";
        partitionCount: "minimal";
      };
    };
    containerLimits: {
      nextjs: {
        cpu: "0.8 cores";
        memory: "3GB";
      };
      postgres: {
        cpu: "0.6 cores";
        memory: "2GB";
      };
      redis: {
        cpu: "0.3 cores";
        memory: "2GB";
      };
      kafka: {
        cpu: "0.3 cores";
        memory: "1GB";
      };
    };
  };

  optimizations: {
    caching: {
      aggressive: true;
      browserCache: "7 days";
      cdnUsage: "Static assets";
    };
    compression: {
      gzip: true;
      brotli: true;
      imageOptim: true;
    };
    database: {
      connectionPool: 50;
      statementCache: true;
      queryOptimization: true;
    };
  };
}
```

#### Future Heavy-Load Setup (Scale-Up Phase)
```typescript
interface InitialVPSSetup {
  hardware: {
    cpu: "8 cores";
    ram: "32GB";
    ssd: "500GB NVMe";
    bandwidth: "Unmetered";
  };

  containerization: {
    platform: "Docker";
    orchestration: "Docker Compose";
    networking: "Internal Docker networks";
  };

  services: {
    databases: {
      postgres: {
        isolation: "Schemas per service";
        backup: "Daily snapshots";
        monitoring: "Per-service metrics";
      };
      redis: {
        partitioning: "Database per service";
        persistence: "AOF enabled";
        backup: "RDB snapshots";
      };
    };
    messaging: {
      kafka: {
        partitions: "Service-based";
        replication: "Minimal for VPS";
        retention: "Size-based cleanup";
      };
    };
    applications: {
      nextjs: {
        scaling: "PM2 cluster mode";
        instances: "Based on CPU cores";
        memory: "Controlled per instance";
      };
    };
  };

  security: {
    networkIsolation: "Docker networks per service";
    accessControl: "Service-specific credentials";
    monitoring: "Per-service metrics";
  };
}
```

### C. Resource Allocation
```typescript
interface ResourceAllocation {
  compute: {
    cpu: "2 vCPU cores per service",
    memory: "4GB per service",
    scaling: "Auto-scaling enabled"
  },
  storage: {
    type: "NVMe SSD",
    size: "100GB per service",
    backup: "Automated daily"
  }
}
```

### D. Database Strategy
```typescript
interface DatabaseStrategy {
  initialPhase: {
    shared: {
      instance: "Single PostgreSQL server";
      isolation: "Schema per service";
      backup: "Per-schema backups";
    };
    separation: {
      schemas: {
        naming: "service_name_schema";
        migrations: "Service-specific";
        access: "Limited to owner service";
      };
      preparation: {
        sharding: "Tenant-based design";
        extraction: "Clean boundaries";
        migration: "Zero-downtime ready";
      };
    };
  };

  scalingTriggers: {
    performance: "Query time > 100ms";
    storage: "80% capacity";
    connections: "75% max_connections";
    load: "CPU > 70% sustained";
  };
}
```

### E. Resource Management
```typescript
interface ResourceManagement {
  allocation: {
    nextjs: {
      cpu: "45% total CPU";
      memory: "40% total RAM";
    };
    postgres: {
      cpu: "25% total CPU";
      memory: "30% total RAM";
    };
    redis: {
      cpu: "15% total CPU";
      memory: "20% total RAM";
    };
    kafka: {
      cpu: "15% total CPU";
      memory: "10% total RAM";
    };
  };

  monitoring: {
    metrics: ["CPU", "Memory", "Disk IO", "Network"];
    alerts: {
      cpu: "> 80% for 5min";
      memory: "> 85% usage";
      disk: "> 80% usage";
      load: "> 80% sustained";
    };
  };
}
```

## 2. Service Architecture

### A. Microservices Implementation
```typescript
interface ServiceArchitecture {
  principles: {
    isolation: {
      code: "Complete separation";
      data: "Schema-level isolation";
      deployment: "Container per service";
    };
    communication: {
      pattern: "Event-driven";
      protocol: "Kafka messages";
      sync: "REST when needed";
    };
    scalability: {
      design: "Scale-ready from start";
      extraction: "Zero-code-change ready";
      migration: "Data consistency assured";
    };
  };

  services: {
    studentsPlatform: {
      name: "Students Interlinked";
      type: "Social Platform";
      domain: "Student interactions & networking";
      database: "students_db";
      apis: ["/api/social/*", "/api/posts/*"];
      events: ["PostCreated", "ConnectionMade"];
    };

    matrixCollege: {
      name: "Edu Matrix Hub";
      type: "Educational Management";
      domain: "Institution & learning management";
      database: "institutions_db";
      apis: ["/api/institutions/*", "/api/courses/*"];
      events: ["CourseCreated", "AttendanceUpdates","completeDigitalEducatinoalSystem", "GradeUpdated"];
    };

    coursePlatform: {
      name: "Courses System";
      type: "Learning Platform";
      domain: "Course delivery & management";
      database: "courses_db";
      apis: ["/api/learning/*", "/api/content/*"];
      events: ["LessonCompleted", "ContentUpdated"];
    };

    freelancingSystem: {
      name: "Freelancing Platform";
      type: "Marketplace";
      domain: "Freelance opportunities";
      database: "freelance_db";
      apis: ["/api/gigs/*", "/api/proposals/*"];
      events: ["GigPosted", "ProposalSubmitted"];
    };

    jobPortal: {
      name: "Jobs System";
      type: "Career Platform";
      domain: "Job listings & applications";
      database: "jobs_db";
      apis: ["/api/jobs/*", "/api/applications/*"];
      events: ["JobPosted", "ApplicationSubmitted"];
    };

    newsSystem: {
      name: "Edu News";
      type: "Content Platform";
      domain: "Educational news & updates";
      database: "news_db";
      apis: ["/api/news/*", "/api/articles/*"];
      events: ["NewsPublished", "ArticleUpdated"];
    };

    communitySystem: {
      name: "Community Rooms";
      type: "Collaboration Platform";
      domain: "Discussion & interaction";
      database: "community_db";
      apis: ["/api/rooms/*", "/api/discussions/*"];
      events: ["RoomCreated", "MessageSent"];
    };

    statisticsSystem: {
      name: "Statistics Platform";
      type: "Analytics System";
      domain: "Data analysis & reporting";
      database: "analytics_db";
      apis: ["/api/stats/*", "/api/reports/*"];
      events: ["StatUpdated", "ReportGenerated"];
    };

    feedbackSystem: {
      name: "User Feedback";
      type: "Feedback Platform";
      domain: "User feedback & improvements";
      database: "feedback_db";
      apis: ["/api/feedback/*", "/api/surveys/*"];
      events: ["FeedbackSubmitted", "SurveyCompleted"];
    };
  };
}
```

### B. Data Independence
```typescript
interface DataIndependence {
  initial: {
    storage: {
      type: "Shared PostgreSQL";
      isolation: "Schema per service";
      access: "Service-specific users";
    };
    scaling: {
      preparation: "Sharding ready";
      extraction: "Clean boundaries";
      migration: "Zero downtime";
    };
  };

  future: {
    separation: {
      trigger: "Performance/scale needs";
      process: "Schema to database";
      consistency: "Event-driven sync";
    };
  };
}
```

## 3. Scaling Strategy

### A. Growth Indicators
```typescript
interface ScalingIndicators {
  database: {
    queries: "> 100ms average";
    connections: "> 75% capacity";
    storage: "> 80% usage";
  };
  application: {
    response: "> 200ms average";
    memory: "> 85% usage";
    cpu: "> 80% sustained";
  };
  traffic: {
    concurrent: "> 10k users";
    requests: "> 1k/second";
    bandwidth: "> 80% capacity";
  };
}
```

### B. Service Extraction Order
1. High-Load Services First:
   - Edu Matrix Hub (institutions)
   - Authentication service
   - Course platform

2. Supporting Services:
   - Social features
   - Job/Freelance platform
   - Analytics system

### C. Extraction Process
```typescript
interface ExtractionProcess {
  preparation: {
    monitoring: "Identify bottlenecks";
    analysis: "Impact assessment";
    planning: "Migration strategy";
  };
  execution: {
    database: {
      clone: "Schema to new instance";
      sync: "Real-time replication";
      switch: "Zero-downtime cutover";
    };
    application: {
      deploy: "New service instance";
      route: "Traffic migration";
      verify: "Health checks";
    };
    cleanup: {
      validate: "Data consistency";
      remove: "Old schema cleanup";
      document: "Update architecture";
    };
  };
}
```

## 4. Unified Monitoring & Management

### A. Performance Tracking & Health Checks
```typescript
interface UnifiedMonitoring {
  metrics: {
    critical: {
      interval: "15s";
      retention: "7 days";
      metrics: ["CPU", "Memory", "Latency", "Errors"];
    },
    business: {
      interval: "1m";
      retention: "30 days";
      metrics: ["Users", "Requests", "Conversions"];
    },
    health: {
      endpoints: {
        liveness: "/health/live";
        readiness: "/health/ready";
        interval: "30s";
      },
      dependencies: {
        services: ["database", "redis", "kafka"];
        timeout: "2s";
      }
    }
  },
  automation: {
    recovery: {
      conditions: ["OOM", "High CPU", "Error Spikes"];
      actions: ["Scale", "Cache Clear", "Restart"];
      cooldown: "5m";
    },
    optimization: {
      scheduled: ["Vacuum", "Cache Prune", "Log Rotate"];
      triggers: ["Memory > 85%", "CPU > 80%", "Disk > 75%"];
    }
  }
}
```

### B. Resource Management
```typescript
interface ResourceManagement {
  allocation: {
    nextjs: {
      cpu: "45% total CPU";
      memory: "40% total RAM";
    };
    postgres: {
      cpu: "25% total CPU";
      memory: "30% total RAM";
    };
    redis: {
      cpu: "15% total CPU";
      memory: "20% total RAM";
    };
    kafka: {
      cpu: "15% total CPU";
      memory: "10% total RAM";
    };
  };

  monitoring: {
    metrics: ["CPU", "Memory", "Disk IO", "Network"];
    alerts: {
      cpu: "> 80% for 5min";
      memory: "> 85% usage";
      disk: "> 80% usage";
      load: "> 80% sustained";
    };
  };
}
```

### C. Backup Strategy
```typescript
interface BackupStrategy {
  database: {
    full: "Daily snapshots";
    incremental: "6-hour intervals";
    retention: "30 days history";
  };
  application: {
    config: "Version controlled";
    assets: "Daily sync";
    logs: "7 days retention";
  };
  recovery: {
    rto: "< 1 hour";
    rpo: "< 6 hours";
    testing: "Monthly validation";
  };
}
```

## 5. Implementation Guidelines

### A. Development Rules
1. Service Independence
   - Complete code isolation
   - Schema-level data separation
   - Event-driven communication
   - Independent deployability

2. Scaling Preparation
   - Design for extraction
   - Clean service boundaries
   - Schema-first migrations
   - Event-sourced updates

3. Monitoring Setup
   - Service-level metrics
   - Resource monitoring
   - Performance tracking
   - Error logging

### B. Deployment Process
1. Initial Setup
   - VPS provisioning
   - Docker installation
   - Network configuration
   - Security hardening

2. Service Deployment
   - Container builds
   - Network isolation
   - Resource limits
   - Health checks

3. Database Setup
   - Schema separation
   - User permissions
   - Backup configuration
   - Monitoring tools

## 6. Operational Procedures

### A. Regular Maintenance
1. Daily Tasks
   - Log rotation
   - Backup verification
   - Performance checks
   - Error monitoring

2. Weekly Tasks
   - Security updates
   - Resource optimization
   - Capacity planning
   - Performance analysis

3. Monthly Tasks
   - Backup testing
   - Disaster recovery drills
   - Security audits
   - Performance tuning

### B. Emergency Procedures
1. High Load Handling
   - Resource reallocation
   - Cache optimization
   - Query optimization
   - Traffic management

2. Service Recovery
   - Automated failover
   - Manual intervention
   - Data consistency checks
   - Incident documentation

## 7. Documentation Requirements

### A. Service Documentation
1. Architecture Overview
   - Service boundaries
   - Data ownership
   - Event contracts
   - API specifications

2. Operational Guides
   - Deployment procedures
   - Scaling triggers
   - Maintenance tasks
   - Emergency responses

### B. Monitoring Documentation
1. Metrics Collection
   - Key indicators
   - Alert thresholds
   - Response procedures
   - Escalation paths

2. Performance Baselines
   - Normal ranges
   - Warning levels
   - Critical thresholds
   - Response times

## 8. Docker Implementation

### A. Docker Compose Structure
```typescript
interface DockerConfig {
  services: {
    nginx: {
      image: "nginx:alpine";
      volumes: [
        "./nginx.conf:/etc/nginx/nginx.conf",
        "./certs:/etc/nginx/certs",
        "./static:/usr/share/nginx/html"
      ];
      ports: ["443:443", "80:80"];
      resources: {
        limits: {
          cpu: "2";
          memory: "4GB";
        };
      };
    };
    nextjs: {
      build: "./";
      volumes: ["./:/app"];
      env_file: ".env";
      resources: {
        limits: {
          cpu: "4";
          memory: "16GB";
        };
      };
    };
    postgres: {
      image: "postgres:15";
      volumes: ["pgdata:/var/lib/postgresql/data"];
      env_file: ".env";
      resources: {
        limits: {
          cpu: "2";
          memory: "8GB";
        };
      };
    };
    redis: {
      image: "redis:7";
      volumes: ["redisdata:/data"];
      command: "redis-server --appendonly yes";
      resources: {
        limits: {
          cpu: "1";
          memory: "4GB";
        };
      };
    };
    kafka: {
      image: "confluentinc/cp-kafka:7.0.0";
      volumes: ["kafkadata:/var/lib/kafka/data"];
      resources: {
        limits: {
          cpu: "1";
          memory: "4GB";
        };
      };
    };
  };
}
```

### B. Network Configuration
```typescript
interface NetworkSetup {
  networks: {
    frontend: {
      driver: "bridge";
      internal: false;
      services: ["nginx", "nextjs"];
    };
    backend: {
      driver: "bridge";
      internal: true;
      services: ["nextjs", "postgres", "redis", "kafka"];
    };
  };
  security: {
    tlsVersion: "TLSv1.3";
    ciphers: "HIGH:!aNULL:!MD5";
    certificates: {
      provider: "Let's Encrypt";
      renewal: "Automatic";
    };
  };
}
```

## 9. Security Implementation

### A. Access Control
```typescript
interface SecurityConfig {
  firewall: {
    inbound: {
      web: ["80/tcp", "443/tcp"];
      ssh: "22/tcp";
      icmp: "ALLOW";
    };
    outbound: "ALLOW ALL";
    rateLimit: {
      requests: "1000/minute";
      connections: "100/second";
    };
  };
  ddosProtection: {
    layer3: "UDP/ICMP flood protection";
    layer4: "SYN flood protection";
    layer7: {
      rateLimit: "Per-IP limits";
      blacklist: "Auto-blocking";
    };
  };
  ssl: {
    provider: "Let's Encrypt";
    type: "Wildcard certificate";
    renewal: "Auto-renewal";
  };
}
```

### B. Database Security
```typescript
interface DBSecurity {
  authentication: {
    method: "Scram-SHA-256";
    ssl: "Required";
    passwordPolicy: "Strong";
  };
  authorization: {
    schemas: {
      access: "Per-service roles";
      privileges: "Minimal required";
    };
    monitoring: {
      audit: "All privileged actions";
      logging: "Security events";
    };
  };
}
```

## 10. Unified Cache Strategy
```typescript
interface UnifiedCacheStrategy {
  layers: {
    browser: {
      static: {
        duration: "30d";
        validation: "ETag";
        revalidate: "stale-while-revalidate=86400";
      },
      dynamic: {
        duration: "1h";
        vary: ["Accept", "Authorization"];
      }
    },
    application: {
      memory: {
        size: "256MB";
        ttl: "1h";
      },
      redis: {
        keyspace: {
          volatile: "1h";
          persistent: "12h";
          session: "24h";
        },
        eviction: "volatile-lru";
      }
    },
    database: {
      prepared: {
        statements: 1000;
        timeout: "24h";
      },
      results: {
        size: "100MB";
        ttl: "5m";
      }
    }
  }
}
```

## 11. Resource Optimization
```typescript
interface ResourceOptimization {
  system: {
    kernel: {
      swappiness: 10;
      cacheLimit: "75%";
      tcpTweaks: {
        backlog: 4096;
        fastOpen: true;
      }
    },
    limits: {
      openFiles: 65535;
      maxProcesses: 4096;
    }
  },
  services: {
    priorities: {
      critical: ["nginx", "postgres"],
      supporting: ["redis", "kafka"]
    },
    limits: {
      cpu: "Never exceed 85%";
      memory: "Never exceed 90%";
      disk: "Alert at 80%";
    }
  },
  recovery: {
    automatic: {
      triggers: ["OOM", "High Load", "Disk Full"];
      actions: ["Clear Cache", "Scale Down", "Rotate Logs"];
    },
    manual: {
      conditions: ["Persistent Issues", "Security Events"];
      procedures: ["Investigation", "Service Restore"];
    }
  }
}
```

## 12. High-Scale & Multi-Region Architecture
### A. Regional Distribution
```typescript
interface HighScaleArchitecture {
  regions: {
    primary: {
      location: "US-East";
      services: "All core services";
      capacity: "40% total load";
      database: "Primary master";
    },
    secondary: {
      locations: ["EU", "Asia", "ME"];
      services: "Region-specific";
      capacity: "20% load each";
      database: "Regional masters";
    }
  },
  
  loadBalancing: {
    global: {
      dns: "GeoDNS routing";
      cdn: "CloudFlare/Cloudfront";
      healthChecks: "30s interval";
    },
    regional: {
      algorithm: "Least connections";
      sticky: "WebSocket sessions";
      failover: "Cross-region";
    }
  }
}
```

### B. Data Flow & Consistency
```typescript
interface DataManagement {
  replication: {
    mode: "Multi-master async";
    delay: "< 100ms target";
    conflict: "Vector clocks + LWW";
  },
  sharding: {
    strategy: "Geographic + tenant";
    balance: "Auto-rebalance";
    migration: "Background + throttled";
  },
  caching: {
    redis: {
      mode: "Active-active";
      sync: "Cross-region replication";
      ttl: "Region-specific policies";
    },
    cdn: {
      purge: "Selective invalidation";
      preload: "Predictive warming";
      rules: "Path + geo-based";
    }
  }
}
```

### C. Regional Performance
```typescript
interface RegionalOptimization {
  resources: {
    compute: {
      baseline: "70% normal load";
      burst: "95% peak capacity";
      reserve: "30% headroom";
    },
    memory: {
      baseline: "60% steady state";
      cache: "30% working set";
      reserve: "10% burst buffer";
    }
  },
  optimization: {
    database: {
      indexes: "Region-specific coverage";
      queries: "Read-local preferred";
      timeout: "Distance-based";
    },
    caching: {
      local: "In-memory LRU";
      regional: "Redis cluster";
      global: "CDN rules";
    }
  }
}
```

## 13. Tenant-Aware Architecture
### A. Resource Management
```typescript
interface TenantScaling {
  resources: {
    compute: {
      guaranteed: "0.5 core per 1k users";
      memory: "2GB per 1k users";
      burst: {
        maxCpu: "2x guaranteed";
        duration: "15 minute max";
      }
    },
    storage: {
      base: "10GB per tenant";
      scaling: "Auto-expand 5GB chunks";
      cache: {
        initial: "100MB";
        maxSize: "5GB per tenant";
      }
    }
  },
  monitoring: {
    usage: "Per-tenant metrics";
    trends: "7-day prediction";
    alerts: "80% threshold";
  }
}
```

### B. Load Balancing
```typescript
interface TenantRouting {
  strategy: {
    primary: "Tenant locality";
    fallback: "Cross-region";
  },
  limits: {
    api: {
      base: "1000 req/min/tenant";
      burst: "2x for 5 minutes";
    },
    websocket: {
      connections: "100 per tenant";
      messages: "1000/sec/tenant";
    }
  }
}
```

### C. Isolation & Security
```typescript
interface TenantIsolation {
  network: {
    ingress: "Tenant-specific IPs";
    routing: "Tenant-aware paths";
    protection: "Per-tenant WAF rules";
  },
  data: {
    schema: "Per-tenant schemas";
    backup: "Tenant-specific schedule";
    caching: {
      redis: "Tenant prefixes";
      memory: "Fair share allocation";
    }
  }
}
```

### D. Specific Instructions for GitHub Copilot

```typescript
interface CopilotInstructions {
  architecting: {
    principles: {
      separation: "Complete service isolation";
      communication: "Event-driven async";
      stateManagement: "Distributed and resilient";
      scaling: "Independent per service";
    };
    patterns: {
      cqrs: "Command Query Responsibility Segregation";
      eventSourcing: "Append-only event logs";
      circuitBreaker: "Failure isolation";
      backpressure: "Load shedding strategies";
    };
  };

  development: {
    initialization: {
      setup: "Multi-stage Docker builds";
      config: "Environment-based settings";
      monitoring: "Telemetry from day one";
    };
    practices: {
      caching: "Multi-layer with fallbacks";
      database: "Prepared + parameterized only";
      apis: "Rate limited + circuit breakers";
      websockets: "Clustered + sticky sessions";
    };
  };

  deployment: {
    strategy: {
      rollout: "Blue-green with canary";
      testing: "Staged environment promotion";
      fallback: "Automated rollback triggers";
      monitoring: "Progressive health checks";
    };
    automation: {
      scaling: "Predictive + reactive rules";
      healing: "Self-recovery procedures";
      optimization: "Resource usage analysis";
      maintenance: "Zero-downtime updates";
    };
  };

  security: {
    implementation: {
      authentication: "Multi-factor + session mgmt";
      authorization: "Role-based + tenant context";
      encryption: "TLS 1.3 + field-level";
      monitoring: "Behavior analysis + alerting";
    };
    compliance: {
      dataProtection: "GDPR, CCPA, PDPA ready";
      auditing: "Complete action trailing";
      reporting: "Automated compliance checks";
      isolation: "Strict tenant boundaries";
    };
  };
}
```

## 14. Multi-Region Deployment Architecture

### A. Geographic Distribution Strategy
```typescript
interface MultiRegionArchitecture {
  deployment: {
    mainRegions: {
      usEast: {
        role: "Primary hub";
        services: "All core services";
        database: "Primary master";
        capacity: "40% total load";
      };
      euWest: {
        role: "Secondary hub";
        services: "All core services";
        database: "Regional master";
        capacity: "30% total load";
      };
      asiaPacific: {
        role: "Secondary hub";
        services: "All core services";
        database: "Regional master";
        capacity: "30% total load";
      };
    };

    edgeLocations: {
      points: "50+ global locations";
      services: ["CDN", "DNS", "WAF"];
      caching: "Static + dynamic rules";
      routing: "Latency-based";
    };
  };

  dataSync: {
    database: {
      replication: {
        mode: "Multi-master async";
        delay: "< 100ms target";
        conflict: "Vector clocks + LWW";
      };
      sharding: {
        strategy: "Geographic + tenant";
        balance: "Auto-rebalance";
        migration: "Background + throttled";
      };
    };

    cache: {
      redis: {
        mode: "Active-active";
        sync: "Cross-region replication";
        ttl: "Region-specific policies";
      };
      cdn: {
        purge: "Selective invalidation";
        preload: "Predictive warming";
        rules: "Path + geo-based";
      };
    };
  };
}
```

### B. Global Traffic Management
```typescript
interface GlobalTraffic {
  routing: {
    algorithms: {
      primary: "Latency-based";
      backup: "Geographic proximity";
      fallback: "Round-robin";
    };
    policies: {
      failover: "Cross-region automatic";
      throttling: "Region-specific limits";
      blackhole: "Attack mitigation";
    };
  };

  loadBalancing: {
    global: {
      dns: {
        ttl: "30s during normal";
        healthChecks: "15s interval";
        failover: "2 failed = reroute";
      };
      cdn: {
        distribution: "Even across edges";
        acceleration: "TCP optimization";
        compression: "Dynamic per type";
      };
    };
    regional: {
      ingress: {
        method: "Least outstanding requests";
        sessions: "Sticky by client ip";
        buffers: "Adaptive queuing";
      };
      services: {
        method: "Weighted round-robin";
        health: "Custom per service";
        circuit: "Per-service breakers";
      };
    };
  };

  ddosProtection: {
    layers: {
      network: {
        scrubbing: "Always-on";
        blacklists: "Auto-updated";
        rateLimit: "Adaptive thresholds";
      };
      application: {
        challenges: "Progressive complexity";
        rateLimit: "User-based rules";
        behavior: "ML-based detection";
      };
    };
  };
}
```

### C. Cross-Region Data Consistency
```typescript
interface DataConsistency {
  strategy: {
    writes: {
      sync: {
        critical: "Wait all regions";
        normal: "Wait quorum";
        bulk: "Async with retry";
      };
      async: {
        queuing: "Kafka cross-region";
        batching: "Size + time window";
        retry: "Exponential backoff";
      };
    };
    reads: {
      consistency: {
        strong: "Primary only";
        eventual: "Any replica";
        bounded: "Max 100ms stale";
      };
      routing: {
        strategy: "Nearest healthy";
        fallback: "Cross-region jump";
        stale: "Accept if emergency";
      };
    };
  };

  conflictResolution: {
    detection: {
      method: "Vector clocks";
      scope: "Per-entity basis";
      threshold: "1s time diff max";
    };
    resolution: {
      automatic: {
        simple: "Last-write-wins";
        complex: "Merge function";
        custom: "Domain-specific rules";
      };
      manual: {
        queue: "Conflict resolution";
        notify: "Admin alert";
        logging: "Audit trail";
      };
    };
  };
}
```

### D. Regional Performance Optimization
```typescript
interface RegionalOptimization {
  resources: {
    allocation: {
      compute: {
        baseline: "70% normal load";
        burst: "95% peak capacity";
        reserve: "30% headroom";
      };
      memory: {
        baseline: "60% steady state";
        cache: "30% working set";
        reserve: "10% burst buffer";
      };
    };
    scaling: {
      rules: {
        predictive: "ML-based forecasting";
        reactive: "Load-based triggers";
        schedule: "Known peak times";
      };
      limits: {
        min: "Base capacity always";
        max: "Budget constrained";
        step: "25% increments";
      };
    };
  };

  optimization: {
    database: {
      indexes: {
        coverage: "Region-specific";
        maintenance: "Local timezone";
        stats: "Daily refresh";
      };
      queries: {
        routing: "Read-local preferred";
        caching: "Region-aware TTL";
        timeout: "Distance-based";
      };
    };
    caching: {
      strategy: {
        local: "In-memory LRU";
        regional: "Redis cluster";
        global: "CDN rules";
      };
      warming: {
        startup: "Pre-load essentials";
        predictive: "Usage pattern";
        recovery: "Post-incident";
      };
    };
  };
}
```

## 14. Tenant-Aware Scaling Guidelines

### A. Multi-Tenant Resource Management
```typescript
interface TenantScaling {
  tenantIsolation: {
    compute: {
      guaranteed: {
        cpu: "0.5 core per 1k users";
        memory: "2GB per 1k users";
        iops: "1k IOPS per tenant";
      };
      bursting: {
        maxCpu: "2x guaranteed";
        maxMemory: "1.5x guaranteed";
        duration: "15 minute max";
      };
    };
    storage: {
      data: {
        base: "10GB per tenant";
        scaling: "Auto-expand 5GB chunks";
        retention: "Configurable per tenant";
      };
      cache: {
        allocation: "100MB initial";
        maxSize: "5GB per tenant";
        eviction: "LRU per tenant";
      };
    };
  };

  quotaManagement: {
    monitoring: {
      usage: "Per-tenant metrics";
      trends: "7-day prediction";
      alerts: "80% threshold";
    };
    enforcement: {
      soft: "Warning at 80%";
      hard: "Block at 100%";
      grace: "1-hour overflow";
    };
  };
}
```

### B. Tenant-Aware Load Balancing
```typescript
interface TenantLoadBalancing {
  routing: {
    strategy: {
      primary: "Tenant locality";
      secondary: "Load distribution";
      fallback: "Cross-region";
    };
    rules: {
      affinity: "Keep tenant data local";
      antiAffinity: "Spread across zones";
      failover: "Region preference";
    };
  };

  rateControl: {
    api: {
      base: "1000 req/min/tenant";
      burst: "2x for 5 minutes";
      penalty: "Progressive backoff";
    };
    websocket: {
      connections: "100 per tenant";
      messages: "1000/sec/tenant";
      broadcast: "10k recipients max";
    };
  };
}
```

### C. Cross-Tenant Isolation
```typescript
interface TenantIsolation {
  networkSegmentation: {
    ingress: {
      dedicated: "Tenant-specific IPs";
      shared: "Rate limit per tenant";
      protection: "Per-tenant WAF rules";
    };
    internal: {
      routing: "Tenant-aware paths";
      isolation: "Virtual networks";
      monitoring: "Flow analysis";
    };
  };

  dataIsolation: {
    database: {
      schema: "Per-tenant schemas";
      connections: "Isolated pools";
      backup: "Tenant-specific schedule";
    };
    caching: {
      redis: {
        keyspace: "Tenant prefixes";
        instances: "Dedicated for large";
        eviction: "Per-tenant LRU";
      };
      memory: {
        allocation: "Fair share";
        limits: "Tenant quotas";
        cleanup: "Tenant priority";
      };
    };
  };
}
```

### D. Instructions for Implementing Tenant-Aware Scaling
```typescript
interface TenantScalingImplementation {
  initialization: {
    setup: {
      metrics: "Enable per-tenant tracking";
      quotas: "Define resource limits";
      monitoring: "Setup tenant dashboards";
    };
    baseline: {
      resource: "Initial allocation";
      scaling: "Growth triggers";
      limits: "Upper bounds";
    };
  };

  automation: {
    scaling: {
      triggers: {
        usage: "> 80% resources";
        latency: "> 100ms average";
        errors: "> 1% rate";
      };
      actions: {
        horizontal: "Add instance";
        vertical: "Increase resources";
        notification: "Alert admin";
      };
    };
    optimization: {
      analysis: {
        patterns: "Usage analytics";
        cost: "Resource efficiency";
        waste: "Idle detection";
      };
      adjustment: {
        schedule: "Peak time prep";
        resources: "Right-sizing";
        placement: "Optimal location";
      };
    };
  };

  maintenance: {
    health: {
      checks: "Per-tenant status";
      metrics: "Resource usage";
      logs: "Activity trails";
    };
    cleanup: {
      data: "Stale cleanup";
      cache: "TTL enforcement";
      sessions: "Auto-expire";
    };
  };
}
```

These configurations provide specific guidance for handling 1M+ concurrent users while maintaining system performance and reliability. The instructions for GitHub Copilot ensure consistent implementation across the entire application architecture.

## System Architecture

### Core Services
1. EDU Matrix Gateway (API Gateway)
   - Route management
   - Rate limiting
   - Authentication
   - Load balancing

2. Students Interlinked Service
   - Social network features
   - Student collaboration
   - Resource sharing

3. Edu Matrix Hub Service
   - Institution management
   - Department administration
   - Staff management
   - Student records

4. Course Management Service
   - Course creation
   - Content delivery
   - Progress tracking
   - Assessment system

## Deployment Strategy

### Infrastructure
- VPS Provider: DigitalOcean/AWS/GCP
- Container Orchestration: Kubernetes
- Service Mesh: Istio
- Monitoring: Prometheus + Grafana
- Logging: ELK Stack

### Network Architecture
```
                   [Load Balancer]
                         │
                  [API Gateway]
                         │
        ┌────────┬──────┴───────┬────────┐
        │        │              │        │
[Students API] [Hub API] [Courses API] [Auth]
        │        │              │        │
   [Service A] [Service B] [Service C] [Service D]
        │        │              │        │
    [Cache A]  [Cache B]    [Cache C]  [Cache D]
        │        │              │        │
        └────────┴──────┬───────┴────────┘
                       │
                 [Message Bus]
                       │
                  [Database]
```

## Scaling Strategy
- Horizontal scaling
- Database sharding
- Caching layers
- Message queuing

## Security Measures
- SSL/TLS encryption
- JWT authentication
- Rate limiting
- DDoS protection
- Data encryption

## Monitoring & Alerts
- Service health
- Performance metrics
- Error rates
- Resource usage
- Security events