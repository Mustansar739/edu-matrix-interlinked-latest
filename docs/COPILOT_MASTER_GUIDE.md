/**
 * @fileoverview Master Guide for GitHub Copilot Implementation
 * WHY: Provide clear architectural guidance for true microservices implementation
 * WHERE: Used as the primary reference for all code generation
 * HOW: Defines clear patterns, boundaries, and implementation strategies
 */

# EDU Matrix Interlinked - Copilot Master Guide

## 1. Project Context Understanding

### A. System Overview
```typescript
interface ProjectContext {
  type: "Enterprise Education Platform",
  scale: {
    users: "1M+ concurrent users",
    institutions: "10k+ educational institutions",
    dailyTransactions: {
      attendance: "1M+ records/day",
      examSubmissions: "100k+ submissions/day",
      classes: "100k+ active classes"
    }
  },
  architecture: {
    pattern: "True microservices with initial shared database",
    deployment: "Multi-region with auto-scaling",
    dataIsolation: "Schema-per-service with tenant isolation",
    realtime: "WebSocket + Kafka event streaming"
  },
  services: {
    matrixCollege: {
      type: "Core LMS Platform",
      features: {
        multiTenant: "Complete institution isolation",
        automation: "AI-powered exam grading",
        attendance: "Real-time tracking & reporting",
        roleBasedAccess: ["Institution Admin", "Department Head", "Teacher", "Student", "Parent"]
      }
    },
    studentsPlatform: {
      type: "Social Learning Network",
      features: {
        feed: "Academic social interactions",
        collaboration: "Peer learning system",
        content: "Educational resource sharing"
      }
    },
    coursePlatform: {
      type: "Learning Management",
      features: {
        courseDelivery: "Interactive learning",
        progress: "Student tracking",
        assessment: "Automated grading"
      }
    },
    freelancing: {
      type: "Educational Marketplace",
      features: {
        gigs: "Educational services",
        matching: "Skill-based pairing",
        payments: "Secure transactions"
      }
    },
    jobPortal: {
      type: "Career Platform",
      features: {
        listings: "Educational jobs",
        applications: "Career tracking",
        matching: "AI-powered recommendations"
      }
    },
    newsSystem: {
      type: "Educational Updates",
      features: {
        content: "Academic news",
        alerts: "Institution updates",
        notifications: "Real-time delivery"
      }
    },
    communityRooms: {
      type: "Discussion Platform",
      features: {
        rooms: "Topic-based discussions",
        moderation: "Content filtering",
        engagement: "Academic interactions"
      }
    },
    statistics: {
      type: "Analytics Engine",
      features: {
        metrics: "Performance tracking",
        insights: "Data visualization",
        reporting: "Custom analytics"
      }
    },
    feedback: {
      type: "User Experience",
      features: {
        collection: "Multi-channel feedback",
        analysis: "Sentiment tracking",
        improvements: "Action tracking"
      }
    }
  }
}
```

### B. Core Architecture Principles
1. Service Independence:
   ```typescript
   interface ServiceIsolation {
     codebase: "Complete separation",
     data: "Schema-per-service isolation",
     scaling: "Independent scalability",
     deployment: "Zero-downtime extraction"
   }
   ```

2. Data Strategy:
   ```typescript
   interface DataStrategy {
     initial: {
       database: "Shared PostgreSQL",
       isolation: "Schema per service",
       access: "Service-specific users"
     },
     future: {
       separation: "Zero-code-change extraction",
       migration: "Live replication with dual-write",
       consistency: "Event-driven synchronization"
     }
   }
   ```

## 2. Implementation Guidelines

### A. Service Architecture
```typescript
interface ServiceImplementation {
  structure: {
    app: {
      routes: "/(service-name)/*",
      api: "/api/(service-name)/*",
      handlers: "Service-specific logic"
    },
    lib: {
      models: "Service domain models",
      repositories: "Data access layer",
      events: "Domain events",
      utils: "Service utilities"
    }
  }
}
```

### B. Code Generation Rules
1. Service Routes:
   ```typescript
   // Example: Edu Matrix Hub Course Creation
   // WHY: Handle course management within college service
   // WHERE: /app/(matrix-college)/courses/route.ts
   // HOW: Implements course creation with schema isolation
   export async function POST(req: Request) {
     // Validate service context
     ensureServiceContext('matrix-college');
     
     // Use service-specific repository
     const repo = new CollegeCourseRepository();
     
     // Emit domain event
     await eventBus.emit('college.course.created');
   }
   ```

2. Data Access:
   ```typescript
   // Example: Service Repository Pattern
   // WHY: Maintain data isolation
   // WHERE: /lib/services/matrix-college/repositories
   // HOW: Implements schema-specific queries
   class BaseRepository {
     protected schema: string;
     
     constructor(schema: string) {
       this.schema = schema;
     }
     
     protected async query() {
       await prisma.$executeRaw`SET search_path TO ${this.schema}`;
       // Execute query within schema context
     }
   }
   ```

### B. Edu Matrix Hub Core Service Patterns

```typescript
interface MatrixCollegeService {
  tenantIsolation: {
    data: {
      schema: {
        naming: "matrix_college_${institution_id}_schema",
        access: "Institution-specific database users",
        migration: "Tenant-aware migrations",
        backup: "Per-institution backup policies"
      },
      caching: {
        redis: {
          keyPattern: "matrix_college:${institution_id}:*",
          isolation: "Dedicated Redis DB per institution",
          ttl: "Service-specific expiration"
        }
      },
      storage: {
        structure: "/institutions/${institution_id}/*",
        cdn: "Institution-specific edge caching",
        backup: "Automated tenant backups"
      }
    },
    compute: {
      resources: {
        quota: "Institution-specific limits",
        scaling: "Dynamic resource allocation",
        monitoring: "Per-tenant metrics"
      }
    }
  },

  roleHierarchy: {
    supremeAdmin: {
      scope: "Platform-wide control",
      abilities: [
        "Approve new institutions",
        "Monitor all institutions",
        "Manage platform features",
        "Access global analytics"
      ]
    },
    institutionAdmin: {
      scope: "Single institution management",
      abilities: [
        "Manage institution users",
        "Configure institution settings",
        "Access institution analytics",
        "Handle applications"
      ]
    },
    departmentHead: {
      scope: "Department-level control",
      abilities: [
        "Manage department staff",
        "Monitor department performance",
        "Handle teacher applications",
        "Department reporting"
      ]
    },
    teacher: {
      scope: "Class-level management",
      abilities: [
        "Take attendance",
        "Conduct exams",
        "Grade assignments",
        "Communicate with students"
      ]
    },
    student: {
      scope: "Personal learning access",
      abilities: [
        "Access courses",
        "Take exams",
        "View grades",
        "Submit assignments"
      ]
    },
    parent: {
      scope: "Child monitoring",
      abilities: [
        "View child's progress",
        "Monitor attendance",
        "Access reports",
        "Communicate with teachers"
      ]
    }
  },

  databasePatterns: {
    queries: {
      attendance: {
        insert: `
          SET search_path TO matrix_college_\${institution_id}_schema;
          INSERT INTO attendance (
            student_id, class_id, status, marked_by, marked_at
          ) VALUES ($1, $2, $3, $4, NOW())
        `,
        select: `
          SET search_path TO matrix_college_\${institution_id}_schema;
          SELECT * FROM attendance 
          WHERE institution_id = \${institution_id}
          AND class_id = $1
        `
      },
      exam: {
        aiGrading: `
          SET search_path TO matrix_college_\${institution_id}_schema;
          WITH graded_answers AS (
            SELECT 
              answer_id,
              openai_grade_answer(answer_text) as ai_grade,
              openai_feedback(answer_text) as feedback
            FROM exam_answers
            WHERE submission_id = $1
          )
          UPDATE exam_answers ea
          SET 
            ai_grade = ga.ai_grade,
            ai_feedback = ga.feedback,
            graded_at = NOW()
          FROM graded_answers ga
          WHERE ea.answer_id = ga.answer_id
        `
      }
    },
    transactions: {
      examGrading: `
        BEGIN;
        SET search_path TO matrix_college_\${institution_id}_schema;
        
        -- Update grades
        UPDATE exam_submissions
        SET status = 'GRADED', 
            total_score = calculated_score,
            graded_at = NOW()
        WHERE submission_id = $1;

        -- Notify student
        INSERT INTO notifications (
          user_id, type, data, created_at
        ) VALUES (
          (SELECT student_id FROM exam_submissions WHERE submission_id = $1),
          'EXAM_GRADED',
          jsonb_build_object(
            'exam_id', (SELECT exam_id FROM exam_submissions WHERE submission_id = $1),
            'score', calculated_score
          ),
          NOW()
        );

        COMMIT;
      `
    }
  },

  realtime: {
    attendance: {
      event: "matrix_college.attendance.marked",
      payload: {
        institution_id: "string",
        class_id: "string",
        teacher_id: "string",
        student_id: "string",
        status: "PRESENT | ABSENT | LATE",
        timestamp: "Date"
      },
      handlers: [
        "UpdateAttendanceStats",
        "NotifyParents",
        "NotifyAdmin",
        "UpdateDashboards"
      ]
    },
    exam: {
      event: "matrix_college.exam.graded",
      payload: {
        institution_id: "string",
        exam_id: "string",
        student_id: "string",
        score: "number",
        feedback: "string",
        timestamp: "Date"
      },
      handlers: [
        "UpdateGradeBook",
        "NotifyStudent",
        "NotifyParents",
        "UpdateAnalytics"
      ]
    }
  },

  apiPatterns: {
    attendance: {
      route: "/api/matrix-college/[institution_id]/attendance",
      method: "POST",
      validation: {
        institution_id: "Must match user context",
        teacher_id: "Must be authorized teacher",
        class_id: "Must be assigned class",
        students: "Must be enrolled students"
      },
      response: {
        status: "201 CREATED",
        data: {
          attendance_id: "string",
          processed_count: "number",
          timestamp: "Date"
        }
      }
    },
    exam: {
      route: "/api/matrix-college/[institution_id]/exams/[exam_id]/grade",
      method: "POST",
      validation: {
        institution_id: "Must match user context",
        exam_id: "Must be valid exam",
        teacher_id: "Must be exam creator",
        answers: "Must be valid submissions"
      },
      response: {
        status: "200 OK",
        data: {
          graded_count: "number",
          average_score: "number",
          completion_time: "number"
        }
      }
    }
  }
}
```

### D. Students Platform Service Patterns

```typescript
interface StudentsPlatformService {
  dataIsolation: {
    schema: {
      name: "students_platform_schema",
      tables: {
        posts: {
          institution_context: "institution_id",
          visibility: "public | institution | class",
          content_type: "text | achievement | project"
        },
        connections: {
          types: "peer | mentor | study_group",
          context: "institution_id",
          status: "pending | active | blocked"
        },
        study_groups: {
          scope: "institution_specific",
          access: "members_only",
          type: "course | project | topic"
        }
      }
    },
    caching: {
      feed: {
        key: "feed:${user_id}:${institution_id}",
        ttl: "15 minutes",
        invalidation: "On new post | interaction"
      },
      connections: {
        key: "network:${user_id}:${institution_id}",
        ttl: "1 hour",
        update: "On connection change"
      }
    }
  },

  feedAlgorithm: {
    ranking: {
      factors: {
        relevance: "Course & topic matching",
        recency: "Time decay factor",
        engagement: "Interaction score",
        network: "Connection strength"
      },
      contexts: {
        academic: {
          weight: 0.4,
          signals: ["course_match", "study_topics", "academic_level"]
        },
        social: {
          weight: 0.3,
          signals: ["mutual_connections", "past_interactions", "shared_groups"]
        },
        institutional: {
          weight: 0.3,
          signals: ["same_institution", "department_relevance", "faculty_posts"]
        }
      }
    },
    queries: {
      getFeed: `
        WITH ranked_posts AS (
          SELECT 
            p.*,
            calculate_relevance(
              p.topic_vector,
              get_user_interests($1)
            ) as relevance_score,
            calculate_recency(p.created_at) as time_score,
            get_engagement_score(p.id) as engagement_score
          FROM posts p
          WHERE (
            p.institution_id = $2
            OR p.visibility = 'public'
            OR exists(
              SELECT 1 FROM connections c
              WHERE c.user_id = $1 
              AND c.connected_user_id = p.user_id
              AND c.status = 'active'
            )
          )
          AND p.created_at > NOW() - INTERVAL '7 days'
        )
        SELECT *,
          (
            relevance_score * 0.4 +
            time_score * 0.3 +
            engagement_score * 0.3
          ) as final_score
        FROM ranked_posts
        ORDER BY final_score DESC
        LIMIT 50
      `
    }
  },

  interactions: {
    patterns: {
      post: {
        creation: {
          validation: "Institution context check",
          processing: "Topic extraction & vectorization",
          notification: "Relevant audience alert"
        },
        engagement: {
          types: ["like", "comment", "share", "save"],
          tracking: "Real-time counters",
          notifications: "Interest-based alerts"
        }
      },
      connection: {
        request: {
          rules: "Institution-aware networking",
          limits: "Rate limiting per user",
          validation: "Academic relationship check"
        },
        management: {
          actions: ["accept", "reject", "block", "report"],
          privacy: "Institutional boundaries",
          monitoring: "Abuse prevention"
        }
      }
    },
    realtime: {
      channels: {
        personal: "user:${id}:notifications",
        feed: "institution:${id}:feed",
        groups: "group:${id}:updates"
      },
      events: {
        post: {
          created: "posts.new",
          engaged: "posts.interaction",
          trending: "posts.viral"
        },
        connection: {
          requested: "network.request",
          updated: "network.status_change",
          trending: "network.growing"
        }
      }
    }
  },

  academicFeatures: {
    studyGroups: {
      creation: {
        validation: {
          context: "Institution verification",
          purpose: "Academic focus check",
          size: "Member limits"
        },
        setup: {
          channels: "Group communication",
          resources: "Study materials",
          analytics: "Activity tracking"
        }
      },
      collaboration: {
        tools: {
          discussion: "Threaded conversations",
          resources: "Shared materials",
          planning: "Study schedules"
        },
        monitoring: {
          activity: "Participation metrics",
          content: "Academic relevance",
          behavior: "Code of conduct"
        }
      }
    },
    peerLearning: {
      matching: {
        criteria: {
          academic: "Course & topic alignment",
          level: "Study progress",
          availability: "Schedule compatibility"
        },
        algorithm: {
          weights: {
            topic_match: 0.4,
            skill_level: 0.3,
            activity_pattern: 0.3
          }
        }
      },
      tracking: {
        metrics: {
          sessions: "Study meetings",
          topics: "Areas covered",
          outcomes: "Learning goals"
        },
        feedback: {
          collection: "Peer reviews",
          analysis: "Effectiveness scoring",
          improvement: "Recommendations"
        }
      }
    }
  }
}
```

### E. Integration Events

```typescript
interface LearningNetworkEvents {
  // Students Platform -> Edu Matrix Hub
  studyGroupCreated: {
    event: "students.group.created",
    producer: "StudentsPlatform",
    consumer: "MatrixCollege",
    payload: {
      group_id: "string",
      institution_id: "string",
      course_id: "string",
      topic: "string",
      members: "string[]",
      created_at: "Date"
    },
    action: "Link group to course"
  },

  // Students Platform -> Course Platform
  peerTutoringSessions: {
    event: "students.tutoring.completed",
    producer: "StudentsPlatform",
    consumer: "CoursePlatform",
    payload: {
      session_id: "string",
      tutor_id: "string",
      student_id: "string",
      course_id: "string",
      topics: "string[]",
      duration: "number",
      rating: "number"
    },
    action: "Update learning analytics"
  },

  // Students Platform -> Statistics
  socialEngagementMetrics: {
    event: "students.engagement.daily",
    producer: "StudentsPlatform",
    consumer: "Statistics",
    payload: {
      date: "Date",
      institution_id: "string",
      metrics: {
        active_users: "number",
        posts_created: "number",
        interactions: "number",
        study_sessions: "number"
      }
    },
    action: "Update social metrics"
  }
}
```

### F. Course Platform Service Patterns

```typescript
interface CoursePlatformService {
  courseManagement: {
    structure: {
      course: {
        metadata: {
          institution_id: "string",
          type: "self_paced | scheduled",
          level: "beginner | intermediate | advanced",
          certification: "verified | audit"
        },
        content: {
          modules: "Ordered learning units",
          resources: "Study materials & media",
          assessments: "Quizzes & assignments"
        },
        delivery: {
          schedule: "Release timeline",
          access: "Enrollment rules",
          progress: "Completion tracking"
        }
      },
      module: {
        components: {
          video: "Lecture recordings",
          reading: "Text materials",
          practice: "Exercises",
          quiz: "Unit tests"
        },
        tracking: {
          progress: "Completion status",
          engagement: "Time spent",
          performance: "Assessment scores"
        }
      }
    },
    enrollment: {
      validation: {
        prerequisites: "Course requirements",
        capacity: "Class size limits",
        payment: "Fee verification"
      },
      process: {
        registration: "Student enrollment",
        access: "Material provision",
        tracking: "Progress monitoring"
      }
    }
  },

  contentDelivery: {
    video: {
      storage: {
        cdn: "Edge-optimized delivery",
        quality: "Adaptive streaming",
        backup: "Multi-region copies"
      },
      streaming: {
        protocol: "HLS with encryption",
        adaptation: "Bandwidth-based",
        analytics: "Viewing patterns"
      }
    },
    materials: {
      distribution: {
        storage: "S3 with CDN",
        access: "Signed URLs",
        caching: "Browser optimization"
      },
      tracking: {
        downloads: "Usage metrics",
        engagement: "Reading time",
        sharing: "Distribution control"
      }
    }
  },

  learningAnalytics: {
    tracking: {
      student: {
        progress: "Module completion",
        performance: "Assessment scores",
        engagement: "Activity metrics"
      },
      course: {
        effectiveness: "Learning outcomes",
        engagement: "Student activity",
        completion: "Success rates"
      }
    },
    analysis: {
      patterns: {
        learning: "Study behaviors",
        difficulty: "Problem areas",
        success: "Achievement factors"
      },
      recommendations: {
        content: "Material suggestions",
        pace: "Learning speed",
        support: "Help resources"
      }
    }
  },

  assessment: {
    types: {
      quiz: {
        format: "Multiple choice | Short answer",
        grading: "Automated scoring",
        feedback: "Immediate response"
      },
      assignment: {
        submission: "File upload | Text entry",
        grading: "Manual | AI-assisted",
        feedback: "Detailed review"
      },
      project: {
        definition: "Objectives & criteria",
        submission: "Portfolio format",
        evaluation: "Rubric-based scoring"
      }
    },
    automation: {
      grading: {
        engine: "OpenAI integration",
        rules: "Scoring criteria",
        validation: "Teacher review"
      },
      feedback: {
        generation: "AI-powered insights",
        customization: "Teacher adjustments",
        delivery: "Student-specific"
      }
    }
  },

  queries: {
    courseAccess: `
      WITH enrolled_courses AS (
        SELECT c.*
        FROM courses c
        JOIN enrollments e ON c.id = e.course_id
        WHERE e.student_id = $1
        AND e.status = 'active'
        AND c.institution_id = $2
      )
      SELECT 
        c.*,
        get_progress($1, c.id) as completion,
        get_next_unit($1, c.id) as next_lesson
      FROM enrolled_courses c
      ORDER BY c.start_date DESC
    `,
    moduleProgress: `
      SELECT 
        m.*,
        COALESCE(mp.status, 'not_started') as status,
        mp.completed_at,
        mp.time_spent
      FROM modules m
      LEFT JOIN module_progress mp ON 
        mp.module_id = m.id 
        AND mp.student_id = $1
      WHERE m.course_id = $2
      ORDER BY m.sequence_no
    `
  }
}
```

### G. Course Platform Events

```typescript
interface LearningEvents {
  // Course Platform -> Edu Matrix Hub
  courseCompletion: {
    event: "course.student.completed",
    producer: "CoursePlatform",
    consumer: "MatrixCollege",
    payload: {
      student_id: "string",
      course_id: "string",
      institution_id: "string",
      completion_date: "Date",
      final_grade: "number",
      certificate_id: "string"
    },
    action: "Update academic record"
  },

  // Course Platform -> Students Platform
  learningMilestone: {
    event: "course.milestone.achieved",
    producer: "CoursePlatform",
    consumer: "StudentsPlatform",
    payload: {
      student_id: "string",
      course_id: "string",
      milestone_type: "module_completed | certification | achievement",
      details: "object",
      achieved_at: "Date"
    },
    action: "Post to social feed"
  },

  // Course Platform -> Statistics
  learningAnalytics: {
    event: "course.analytics.daily",
    producer: "CoursePlatform",
    consumer: "Statistics",
    payload: {
      date: "Date",
      institution_id: "string",
      course_id: "string",
      metrics: {
        active_learners: "number",
        completion_rate: "number",
        avg_assessment_score: "number",
        engagement_minutes: "number"
      }
    },
    action: "Update learning metrics"
  }
}
```

### H. Freelancing Platform Patterns

```typescript
interface FreelancingService {
  marketplace: {
    gigs: {
      categories: {
        tutoring: "One-on-one teaching",
        courseCreation: "Educational content",
        assignment: "Academic assistance",
        research: "Study support"
      },
      validation: {
        academic: "Educational relevance",
        quality: "Service standards",
        pricing: "Fair rate check",
        compliance: "Policy adherence"
      }
    },
    matching: {
      algorithm: {
        factors: {
          expertise: "Subject knowledge",
          rating: "Past performance",
          availability: "Schedule match",
          location: "Time zone/region"
        },
        weights: {
          skills: 0.4,
          reviews: 0.3,
          response: 0.2,
          completion: 0.1
        }
      },
      filters: {
        academic: "Subject area",
        level: "Education stage",
        budget: "Price range",
        schedule: "Time slots"
      }
    }
  },

  serviceDelivery: {
    workflow: {
      stages: {
        request: "Service booking",
        acceptance: "Provider confirmation",
        payment: "Secure escrow",
        delivery: "Service provision",
        completion: "Work submission",
        review: "Feedback exchange"
      },
      automation: {
        reminders: "Milestone alerts",
        updates: "Status changes",
        completion: "Auto-verification"
      }
    },
    quality: {
      monitoring: {
        metrics: "Service standards",
        feedback: "User ratings",
        disputes: "Issue tracking"
      },
      assurance: {
        review: "Quality checks",
        standards: "Best practices",
        support: "Help resources"
      }
    }
  },

  transactions: {
    payment: {
      processing: {
        escrow: "Secure holding",
        release: "Milestone-based",
        refunds: "Dispute resolution"
      },
      security: {
        encryption: "PCI compliance",
        fraud: "Detection system",
        verification: "Identity checks"
      }
    },
    queries: {
      earnings: `
        SELECT 
          u.id as provider_id,
          COUNT(t.id) as completed_gigs,
          SUM(t.amount) as total_earnings,
          AVG(r.rating) as avg_rating
        FROM transactions t
        JOIN users u ON t.provider_id = u.id
        JOIN reviews r ON t.gig_id = r.gig_id
        WHERE t.status = 'completed'
        AND t.created_at > NOW() - INTERVAL '30 days'
        GROUP BY u.id
      `,
      performance: `
        SELECT 
          g.id as gig_id,
          g.title,
          COUNT(b.id) as bookings,
          AVG(r.rating) as satisfaction,
          SUM(t.amount) as revenue
        FROM gigs g
        LEFT JOIN bookings b ON g.id = b.gig_id
        LEFT JOIN transactions t ON b.id = t.booking_id
        LEFT JOIN reviews r ON g.id = r.gig_id
        WHERE g.provider_id = $1
        GROUP BY g.id, g.title
      `
    }
  },

  reputation: {
    scoring: {
      factors: {
        ratings: "Client feedback",
        completion: "Success rate",
        responsiveness: "Communication",
        expertise: "Subject mastery"
      },
      calculation: {
        weights: {
          recent: "Last 30 days",
          overall: "Account lifetime",
          trend: "Improvement pattern"
        }
      }
    },
    verification: {
      academic: {
        credentials: "Degree verification",
        experience: "Teaching history",
        specialization: "Subject expertise"
      },
      performance: {
        metrics: "Service quality",
        reliability: "Completion rate",
        satisfaction: "Client happiness"
      }
    }
  }
}
```

### I. Freelancing Platform Events

```typescript
interface MarketplaceEvents {
  // Freelancing -> Statistics
  serviceMetrics: {
    event: "freelancing.metrics.daily",
    producer: "FreelancingPlatform",
    consumer: "Statistics",
    payload: {
      date: "Date",
      metrics: {
        active_gigs: "number",
        completed_services: "number",
        total_earnings: "number",
        avg_satisfaction: "number",
        dispute_rate: "number"
      }
    },
    action: "Update marketplace analytics"
  },

  // Freelancing -> Edu Matrix Hub
  tutorVerification: {
    event: "freelancing.tutor.verified",
    producer: "FreelancingPlatform",
    consumer: "MatrixCollege",
    payload: {
      tutor_id: "string",
      institution_id: "string",
      subjects: "string[]",
      credentials: "object",
      verification_date: "Date"
    },
    action: "Update teacher qualifications"
  },

  // Freelancing -> Course Platform
  serviceCompletion: {
    event: "freelancing.service.completed",
    producer: "FreelancingPlatform",
    consumer: "CoursePlatform",
    payload: {
      service_id: "string",
      type: "tutoring | content_creation",
      provider_id: "string",
      client_id: "string",
      subject: "string",
      duration: "number",
      rating: "number"
    },
    action: "Update learning history"
  }
}
```

### J. Job Portal Service Patterns

```typescript
interface JobPortalService {
  jobManagement: {
    listings: {
      types: {
        academic: "Teaching & Research",
        administration: "Educational Admin",
        support: "Learning Support",
        technical: "EdTech Roles"
      },
      validation: {
        requirements: "Qualification check",
        institution: "Employer verification",
        compliance: "Employment laws",
        standards: "Quality criteria"
      }
    },
    matching: {
      algorithm: {
        criteria: {
          qualifications: "Academic match",
          experience: "Teaching/Admin",
          skills: "Technical/Soft",
          location: "Geographic"
        },
        weights: {
          education: 0.4,
          relevance: 0.3,
          experience: 0.2,
          culture: 0.1
        }
      },
      recommendations: {
        candidates: "AI-matched profiles",
        positions: "Relevant openings",
        insights: "Career guidance"
      }
    }
  },

  applications: {
    workflow: {
      stages: {
        submission: "Application sent",
        screening: "Initial review",
        assessment: "Skill verification",
        interview: "Candidate meetings",
        decision: "Final selection",
        onboarding: "Role transition"
      },
      automation: {
        tracking: "Status updates",
        scheduling: "Interview booking",
        feedback: "Auto-responses"
      }
    },
    processing: {
      validation: {
        credentials: "Degree verification",
        experience: "Reference check",
        eligibility: "Work rights"
      },
      assessment: {
        skills: "Technical testing",
        teaching: "Demo lessons",
        culture: "Team fit"
      }
    }
  },

  analytics: {
    recruitment: {
      metrics: {
        applications: "Submission stats",
        conversion: "Stage progression",
        efficiency: "Time-to-hire",
        quality: "Hire performance"
      },
      insights: {
        trends: "Market analysis",
        demographics: "Candidate pools",
        success: "Placement factors"
      }
    },
    queries: {
      placementStats: `
        SELECT 
          i.name as institution,
          p.department,
          COUNT(a.id) as applications,
          COUNT(h.id) as hires,
          AVG(h.time_to_hire) as avg_hire_time
        FROM job_posts p
        JOIN institutions i ON p.institution_id = i.id
        LEFT JOIN applications a ON p.id = a.post_id
        LEFT JOIN hires h ON a.id = h.application_id
        WHERE p.created_at > NOW() - INTERVAL '90 days'
        GROUP BY i.name, p.department
      `,
      candidatePool: `
        WITH qualified_candidates AS (
          SELECT 
            c.id,
            c.specialization,
            COUNT(q.id) as qualifications,
            AVG(e.years) as exp_years
          FROM candidates c
          JOIN qualifications q ON c.id = q.candidate_id
          JOIN experience e ON c.id = e.candidate_id
          WHERE c.status = 'active'
          GROUP BY c.id, c.specialization
        )
        SELECT 
          specialization,
          COUNT(*) as pool_size,
          AVG(qualifications) as avg_quals,
          AVG(exp_years) as avg_experience
        FROM qualified_candidates
        GROUP BY specialization
      `
    }
  },

  careerDevelopment: {
    guidance: {
      planning: {
        assessment: "Skill evaluation",
        pathing: "Career trajectories",
        goals: "Development plans"
      },
      resources: {
        training: "Skill enhancement",
        mentoring: "Professional guidance",
        networking: "Industry connections"
      }
    },
    tracking: {
      progress: {
        milestones: "Career achievements",
        skills: "Competency growth",
        impact: "Value creation"
      },
      support: {
        feedback: "Performance reviews",
        coaching: "Improvement areas",
        recognition: "Achievement awards"
      }
    }
  }
}
```

### K. Job Portal Events

```typescript
interface CareerEvents {
  // Job Portal -> Edu Matrix Hub
  teacherPlacement: {
    event: "jobs.teacher.hired",
    producer: "JobPortal",
    consumer: "MatrixCollege",
    payload: {
      teacher_id: "string",
      institution_id: "string",
      role: "string",
      department: "string",
      start_date: "Date",
      qualifications: "object[]"
    },
    action: "Update institution staff"
  },

  // Job Portal -> Statistics
  employmentMetrics: {
    event: "jobs.metrics.daily",
    producer: "JobPortal",
    consumer: "Statistics",
    payload: {
      date: "Date",
      metrics: {
        open_positions: "number",
        applications: "number",
        placements: "number",
        avg_time_to_hire: "number",
        retention_rate: "number"
      }
    },
    action: "Update employment analytics"
  },

  // Job Portal -> Course Platform
  skillRequirements: {
    event: "jobs.skills.trending",
    producer: "JobPortal",
    consumer: "CoursePlatform",
    payload: {
      analysis_period: "string",
      top_skills: [{
        name: "string",
        demand_score: "number",
        growth_rate: "number"
      }],
      recommended_courses: "string[]"
    },
    action: "Update course recommendations"
  }
}
```

### L. News System Patterns

```typescript
interface NewsSystemService {
  contentManagement: {
    categories: {
      institutional: {
        types: "Announcements | Updates | Events",
        scope: "Institution-specific",
        targeting: "Role-based delivery"
      },
      educational: {
        types: "Research | Innovation | Policy",
        scope: "Public education sector",
        curation: "Expert-verified content"
      },
      community: {
        types: "Success Stories | Best Practices",
        scope: "Platform-wide sharing",
        moderation: "Quality-controlled"
      }
    },
    publishing: {
      workflow: {
        creation: "Content authoring",
        review: "Editorial checks",
        approval: "Publishing clearance",
        scheduling: "Timed release"
      },
      distribution: {
        channels: {
          web: "Responsive layout",
          mobile: "Push notifications",
          email: "Newsletter digests",
          api: "Content syndication"
        },
        targeting: {
          roles: "User position based",
          interests: "Topic preferences",
          relevance: "AI-matched content"
        }
      }
    }
  },

  personalization: {
    preferences: {
      topics: "Subject areas",
      frequency: "Update schedule",
      format: "Content type",
      language: "Preferred locale"
    },
    recommendations: {
      algorithm: {
        factors: {
          role: "User position",
          history: "Reading patterns",
          engagement: "Interaction rates",
          context: "Current relevance"
        },
        weights: {
          institutional: 0.4,
          educational: 0.3,
          engagement: 0.3
        }
      },
      delivery: {
        timing: "Optimal delivery",
        format: "Preferred medium",
        grouping: "Related content"
      }
    }
  },

  analytics: {
    engagement: {
      metrics: {
        views: "Content reach",
        interactions: "User engagement",
        sharing: "Viral spread",
        feedback: "User responses"
      },
      insights: {
        popular: "Trending topics",
        impact: "Content effectiveness",
        audience: "Reader segments"
      }
    },
    queries: {
      contentPerformance: `
        SELECT 
          n.title,
          n.category,
          COUNT(v.id) as views,
          COUNT(DISTINCT v.user_id) as unique_readers,
          AVG(v.read_time) as avg_read_time,
          COUNT(i.id) as interactions
        FROM news n
        LEFT JOIN views v ON n.id = v.news_id
        LEFT JOIN interactions i ON n.id = i.news_id
        WHERE n.published_at > NOW() - INTERVAL '7 days'
        GROUP BY n.id, n.title, n.category
        ORDER BY views DESC
      `,
      userEngagement: `
        WITH user_stats AS (
          SELECT 
            u.id,
            u.role,
            COUNT(v.id) as total_views,
            COUNT(DISTINCT n.category) as categories_read,
            AVG(v.read_time) as avg_session
          FROM users u
          JOIN views v ON u.id = v.user_id
          JOIN news n ON v.news_id = n.id
          WHERE v.viewed_at > NOW() - INTERVAL '30 days'
          GROUP BY u.id, u.role
        )
        SELECT 
          role,
          COUNT(*) as user_count,
          AVG(total_views) as avg_views,
          AVG(categories_read) as avg_categories,
          AVG(avg_session) as avg_read_time
        FROM user_stats
        GROUP BY role
      `
    }
  },

  realtime: {
    notifications: {
      triggers: {
        urgent: "Breaking updates",
        scheduled: "Regular digests",
        personalized: "Interest matches"
      },
      channels: {
        push: "Mobile notifications",
        email: "Newsletter updates",
        inApp: "Platform alerts",
        web: "Browser notifications"
      }
    },
    tracking: {
      metrics: {
        delivery: "Notification success",
        opens: "Alert engagement",
        actions: "User responses"
      },
      optimization: {
        timing: "Delivery windows",
        format: "Content presentation",
        frequency: "Update intervals"
      }
    }
  }
}
```

### M. News System Events

```typescript
interface NewsEvents {
  // News System -> Edu Matrix Hub
  institutionalUpdate: {
    event: "news.institution.published",
    producer: "NewsSystem",
    consumer: "MatrixCollege",
    payload: {
      institution_id: "string",
      news_id: "string",
      type: "announcement | update | event",
      content: {
        title: "string",
        body: "string",
        media: "string[]"
      },
      audience: {
        roles: "string[]",
        departments: "string[]"
      },
      metadata: {
        priority: "number",
        expiry: "Date"
      }
    },
    action: "Notify institution members"
  },

  // News System -> Statistics
  contentAnalytics: {
    event: "news.analytics.hourly",
    producer: "NewsSystem",
    consumer: "Statistics",
    payload: {
      timestamp: "Date",
      metrics: {
        content_published: "number",
        total_views: "number",
        unique_readers: "number",
        avg_read_time: "number",
        engagement_rate: "number"
      },
      breakdowns: {
        by_category: "object",
        by_institution: "object",
        by_role: "object"
      }
    },
    action: "Update analytics dashboards"
  },

  // News System -> Students Platform
  educationalTrends: {
    event: "news.trends.detected",
    producer: "NewsSystem",
    consumer: "StudentsPlatform",
    payload: {
      trend_id: "string",
      topic: "string",
      relevance_score: "number",
      related_content: "string[]",
      discussion_prompts: "string[]"
    },
    action: "Create trending discussions"
  }
}
```

### N. Community Rooms Patterns

```typescript
interface CommunityRoomsService {
  roomManagement: {
    categories: {
      academic: {
        types: "Study Groups | Research Teams | Course Discussions",
        access: "Institution Members",
        features: "Academic Tools Integration"
      },
      professional: {
        types: "Faculty Forums | Department Spaces | Admin Groups",
        access: "Role-Based",
        features: "Professional Networking"
      },
      interest: {
        types: "Subject Clubs | Project Teams | Hobby Groups",
        access: "Open/Closed Groups",
        features: "Interest-Based Networking"
      }
    },
    lifecycle: {
      creation: {
        validation: {
          purpose: "Academic Relevance",
          ownership: "Creator Credentials",
          rules: "Community Guidelines"
        },
        setup: {
          configuration: "Room Settings",
          roles: "Moderator Assignment",
          tools: "Feature Activation"
        }
      },
      management: {
        moderation: {
          content: "Post Filtering",
          behavior: "User Management",
          reports: "Issue Handling"
        },
        engagement: {
          activities: "Discussion Prompts",
          events: "Virtual Meetups",
          resources: "Shared Materials"
        }
      }
    }
  },

  discussions: {
    threading: {
      structure: {
        main: "Topic Thread",
        replies: "Nested Comments",
        mentions: "User References",
        tags: "Topic Markers"
      },
      features: {
        formatting: "Rich Text Support",
        attachments: "Multi-Media Files",
        code: "Syntax Highlighting",
        math: "LaTeX Rendering"
      }
    },
    realtime: {
      messaging: {
        delivery: "Instant Updates",
        presence: "User Status",
        typing: "Activity Indicators",
        reactions: "Quick Responses"
      },
      notifications: {
        triggers: "New Posts | Mentions | Replies",
        delivery: "Push | Email | In-App",
        preferences: "User Settings"
      }
    }
  },

  collaboration: {
    tools: {
      whiteboard: {
        features: "Real-time Drawing",
        sharing: "Collaborative Access",
        export: "Save & Download"
      },
      documents: {
        editing: "Collaborative Writing",
        versioning: "Change History",
        comments: "Feedback System"
      },
      meetings: {
        scheduling: "Event Planning",
        integration: "Video Platforms",
        recording: "Session Archives"
      }
    },
    resources: {
      library: {
        types: "Documents | Media | Links",
        organization: "Folder Structure",
        search: "Content Discovery"
      },
      sharing: {
        permissions: "Access Control",
        tracking: "Usage Analytics",
        citations: "Source Attribution"
      }
    }
  },

  analytics: {
    engagement: {
      metrics: {
        activity: "Post Volume",
        participation: "Active Users",
        retention: "Return Rate",
        quality: "Content Value"
      },
      analysis: {
        patterns: "Usage Trends",
        influence: "Key Contributors",
        impact: "Learning Outcomes"
      }
    },
    queries: {
      roomActivity: `
        SELECT 
          r.name,
          r.category,
          COUNT(DISTINCT u.id) as active_users,
          COUNT(p.id) as post_count,
          AVG(EXTRACT(EPOCH FROM (p.created_at - p.parent_id::timestamp))) as avg_response_time
        FROM rooms r
        JOIN posts p ON r.id = p.room_id
        JOIN users u ON p.user_id = u.id
        WHERE p.created_at > NOW() - INTERVAL '7 days'
        GROUP BY r.id, r.name, r.category
        ORDER BY active_users DESC
      `,
      userEngagement: `
        WITH user_metrics AS (
          SELECT 
            u.id,
            u.role,
            COUNT(DISTINCT r.id) as rooms_joined,
            COUNT(p.id) as posts_made,
            COUNT(DISTINCT DATE(p.created_at)) as active_days
          FROM users u
          JOIN room_members rm ON u.id = rm.user_id
          JOIN rooms r ON rm.room_id = r.id
          LEFT JOIN posts p ON u.id = p.user_id
          WHERE rm.joined_at > NOW() - INTERVAL '30 days'
          GROUP BY u.id, u.role
        )
        SELECT 
          role,
          AVG(rooms_joined) as avg_rooms,
          AVG(posts_made) as avg_posts,
          AVG(active_days) as avg_active_days,
          COUNT(*) as user_count
        FROM user_metrics
        GROUP BY role
      `
    }
  },

  moderation: {
    policies: {
      content: {
        rules: "Community Guidelines",
        filters: "Automated Screening",
        actions: "Moderation Responses"
      },
      behavior: {
        standards: "Code of Conduct",
        monitoring: "Activity Tracking",
        enforcement: "Progressive Actions"
      }
    },
    automation: {
      screening: {
        text: "Content Analysis",
        media: "File Scanning",
        links: "URL Validation"
      },
      actions: {
        flags: "Issue Detection",
        queue: "Review System",
        appeals: "Dispute Resolution"
      }
    }
  }
}
```

### O. Community Rooms Events

```typescript
interface CommunityEvents {
  // Community Rooms -> Edu Matrix Hub
  academicDiscussion: {
    event: "community.discussion.academic",
    producer: "CommunityRooms",
    consumer: "MatrixCollege",
    payload: {
      room_id: "string",
      institution_id: "string",
      course_id: "string",
      topic: {
        title: "string",
        tags: "string[]",
        type: "question | discussion | resource"
      },
      engagement: {
        participants: "number",
        responses: "number",
        quality_score: "number"
      },
      metadata: {
        created_at: "Date",
        last_activity: "Date"
      }
    },
    action: "Track academic engagement"
  },

  // Community Rooms -> Statistics
  roomAnalytics: {
    event: "community.analytics.daily",
    producer: "CommunityRooms",
    consumer: "Statistics",
    payload: {
      date: "Date",
      metrics: {
        active_rooms: "number",
        new_discussions: "number",
        total_participation: "number",
        response_rates: "number"
      },
      categories: {
        academic: "object",
        professional: "object",
        interest: "object"
      },
      quality: {
        engagement_depth: "number",
        content_value: "number",
        response_quality: "number"
      }
    },
    action: "Update community analytics"
  },

  // Community Rooms -> Students Platform
  learningInteraction: {
    event: "community.learning.interaction",
    producer: "CommunityRooms",
    consumer: "StudentsPlatform",
    payload: {
      interaction_id: "string",
      type: "peer_help | group_study | resource_share",
      participants: "string[]",
      context: {
        subject: "string",
        topic: "string",
        resources: "string[]"
      },
      outcome: {
        resolution: "boolean",
        helpfulness: "number",
        knowledge_gain: "number"
      }
    },
    action: "Update learning network"
  }
}
```

### P. Statistics Service Patterns

```typescript
interface StatisticsService {
  analytics: {
    educational: {
      metrics: {
        attendance: {
          tracking: "Daily rates",
          patterns: "Time series analysis",
          comparisons: "Cross-institution benchmarks"
        },
        performance: {
          academic: "Grade distributions",
          improvement: "Progress tracking",
          predictions: "AI-based forecasting"
        },
        engagement: {
          course: "Material interaction",
          platform: "Feature usage",
          social: "Network participation"
        }
      },
      insights: {
        trends: "Learning patterns",
        correlations: "Success factors",
        recommendations: "Improvement strategies"
      }
    },
    operational: {
      infrastructure: {
        usage: "Resource utilization",
        scaling: "Growth patterns",
        performance: "System metrics"
      },
      security: {
        access: "Authentication patterns",
        threats: "Risk indicators",
        compliance: "Regulatory metrics"
      }
    }
  },

  dataProcessing: {
    ingestion: {
      streaming: {
        sources: "Kafka topics",
        processing: "Real-time aggregation",
        storage: "Time-series data"
      },
      batch: {
        collection: "Daily aggregates",
        transformation: "Data warehousing",
        archival: "Historical storage"
      }
    },
    aggregation: {
      realtime: {
        windows: "Moving averages",
        triggers: "Alert thresholds",
        caching: "Hot metrics"
      },
      historical: {
        periods: "Time-based grouping",
        rollups: "Data summarization",
        cleanup: "Data retention"
      }
    }
  },

  reporting: {
    dashboards: {
      institutional: {
        overview: "Key performance indicators",
        detailed: "Department metrics",
        comparative: "Benchmark analysis"
      },
      administrative: {
        operational: "System health",
        financial: "Resource utilization",
        compliance: "Audit metrics"
      }
    },
    automation: {
      scheduling: {
        daily: "Operational reports",
        weekly: "Performance summaries",
        monthly: "Strategic analysis"
      },
      distribution: {
        email: "Automated delivery",
        api: "Data access",
        export: "File generation"
      }
    }
  },

  queries: {
    performance: {
      institutional: `
        WITH institution_metrics AS (
          SELECT 
            i.id,
            i.name,
            COUNT(DISTINCT s.id) as student_count,
            COUNT(DISTINCT c.id) as course_count,
            AVG(a.attendance_rate) as avg_attendance,
            AVG(e.completion_rate) as exam_completion,
            AVG(e.average_score) as avg_score
          FROM institutions i
          JOIN students s ON i.id = s.institution_id
          JOIN courses c ON i.id = c.institution_id
          JOIN attendance_stats a ON i.id = a.institution_id
          JOIN exam_stats e ON i.id = e.institution_id
          WHERE DATE_TRUNC('month', NOW()) = DATE_TRUNC('month', stats_date)
          GROUP BY i.id, i.name
        )
        SELECT 
          *,
          PERCENT_RANK() OVER (ORDER BY avg_attendance) as attendance_rank,
          PERCENT_RANK() OVER (ORDER BY exam_completion) as completion_rank,
          PERCENT_RANK() OVER (ORDER BY avg_score) as performance_rank
        FROM institution_metrics
      `,
      platform: `
        WITH hourly_metrics AS (
          SELECT 
            DATE_TRUNC('hour', timestamp) as hour,
            COUNT(*) as requests,
            AVG(response_time) as avg_latency,
            COUNT(DISTINCT user_id) as active_users,
            SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) as errors
          FROM system_logs
          WHERE timestamp > NOW() - INTERVAL '24 hours'
          GROUP BY DATE_TRUNC('hour', timestamp)
        )
        SELECT 
          hour,
          requests,
          avg_latency,
          active_users,
          errors,
          LAG(requests, 1) OVER (ORDER BY hour) as prev_requests,
          LAG(active_users, 1) OVER (ORDER BY hour) as prev_active_users
        FROM hourly_metrics
        ORDER BY hour DESC
      `
    },
    analytics: {
      learning: `
        WITH learning_metrics AS (
          SELECT 
            c.id as course_id,
            c.name as course_name,
            c.institution_id,
            COUNT(DISTINCT e.student_id) as enrolled_students,
            AVG(cp.completion_rate) as avg_completion,
            AVG(cp.engagement_score) as avg_engagement,
            AVG(a.assessment_score) as avg_assessment
          FROM courses c
          JOIN enrollments e ON c.id = e.course_id
          JOIN course_progress cp ON e.id = cp.enrollment_id
          JOIN assessments a ON e.student_id = a.student_id
          WHERE e.status = 'active'
          AND cp.updated_at > NOW() - INTERVAL '30 days'
          GROUP BY c.id, c.name, c.institution_id
        )
        SELECT 
          *,
          NTILE(4) OVER (ORDER BY avg_completion) as completion_quartile,
          NTILE(4) OVER (ORDER BY avg_engagement) as engagement_quartile,
          NTILE(4) OVER (ORDER BY avg_assessment) as performance_quartile
        FROM learning_metrics
      `
    }
  },

  machineLeaning: {
    models: {
      prediction: {
        dropout: "Risk assessment",
        performance: "Grade forecasting",
        engagement: "Participation trends"
      },
      recommendation: {
        courses: "Learning paths",
        resources: "Study materials",
        peers: "Study groups"
      }
    },
    training: {
      pipeline: {
        preprocessing: "Data cleaning",
        validation: "Model testing",
        deployment: "Production release"
      },
      schedule: {
        daily: "Incremental updates",
        weekly: "Full retraining",
        monitoring: "Model performance"
      }
    }
  }
}
```

### Q. Statistics Service Events

```typescript
interface AnalyticsEvents {
  // Statistics -> Edu Matrix Hub
  performanceInsights: {
    event: "stats.insights.institution",
    producer: "Statistics",
    consumer: "MatrixCollege",
    payload: {
      institution_id: "string",
      date: "Date",
      insights: {
        attendance: {
          trend: "improving | stable | declining",
          factors: "string[]",
          recommendations: "string[]"
        },
        academic: {
          performance_trend: "object",
          risk_factors: "string[]",
          intervention_suggestions: "string[]"
        },
        operational: {
          resource_utilization: "object",
          optimization_opportunities: "string[]"
        }
      }
    },
    action: "Update institutional dashboards"
  },

  // Statistics -> Course Platform
  learningAnalytics: {
    event: "stats.analytics.learning",
    producer: "Statistics",
    consumer: "CoursePlatform",
    payload: {
      course_id: "string",
      period: "string",
      analytics: {
        engagement: {
          patterns: "object",
          bottlenecks: "string[]",
          suggestions: "string[]"
        },
        outcomes: {
          success_rate: "number",
          completion_factors: "object",
          improvement_areas: "string[]"
        }
      }
    },
    action: "Optimize learning experience"
  },

  // Statistics -> All Services
  systemHealth: {
    event: "stats.health.system",
    producer: "Statistics",
    consumer: "*",
    payload: {
      timestamp: "Date",
      service_metrics: {
        performance: {
          latency: "object",
          errors: "object",
          saturation: "object"
        },
        resources: {
          cpu: "object",
          memory: "object",
          storage: "object"
        },
        recommendations: {
          scaling: "object",
          optimization: "string[]"
        }
      }
    },
    action: "Maintain system performance"
  }
}
```

## 3. Cross-Service Patterns

### A. Error Handling
```typescript
interface ErrorHandling {
  // Service-specific error hierarchy
  errors: {
    base: "ServiceError",
    types: {
      validation: "ValidationError",
      authorization: "AuthorizationError",
      notFound: "NotFoundError",
      conflict: "ConflictError",
      system: "SystemError"
    },
    context: {
      service: "Service identifier",
      tenant: "Institution context",
      trace: "Error trace ID",
      timestamp: "Error occurrence time"
    }
  },

  // Error response structure
  response: {
    format: {
      status: "HTTP status code",
      code: "Error code",
      message: "User-friendly message",
      details: "Error specifics",
      help: "Resolution steps"
    },
    localization: {
      messages: "Translated strings",
      context: "Cultural adaptation",
      formatting: "Regional formats"
    }
  },

  // Error handling patterns
  handling: {
    validation: {
      schema: "Zod/Yup validation",
      context: "Tenant verification",
      access: "Permission check"
    },
    recovery: {
      retry: "Exponential backoff",
      fallback: "Graceful degradation",
      cleanup: "Resource cleanup"
    },
    logging: {
      levels: "DEBUG | INFO | WARN | ERROR",
      context: "Request context",
      metrics: "Error tracking"
    }
  },

  // Implementation example
  example: `
    class ServiceError extends Error {
      constructor(
        message: string,
        public code: string,
        public status: number,
        public context: {
          service: string;
          tenant?: string;
          trace: string;
          timestamp: Date;
        }
      ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
      }
    }

    class ValidationError extends ServiceError {
      constructor(
        message: string,
        details: object,
        tenant?: string
      ) {
        super(message, 'VALIDATION_ERROR', 400, {
          service: 'current-service',
          tenant,
          trace: generateTraceId(),
          timestamp: new Date()
        });
        this.details = details;
      }
    }

    // Usage example
    try {
      throw new ValidationError(
        'Invalid course enrollment data',
        { field: 'studentId', issue: 'not_found' },
        'institution_123'
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        // Handle validation error
        logger.warn({
          message: error.message,
          code: error.code,
          context: error.context,
          details: error.details
        });
        
        // Return formatted error response
        return {
          status: error.status,
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
            help: 'Please verify the student ID and try again'
          }
        };
      }
      
      // Handle other errors
      throw error;
    }
  `
}
```

### B. Security Implementation
```typescript
interface SecurityPatterns {
  // Authentication patterns
  authentication: {
    jwt: {
      payload: {
        user: "User identifier",
        institution: "Tenant context",
        role: "User role",
        permissions: "Granted permissions",
        session: "Session metadata"
      },
      configuration: {
        algorithm: "RS256",
        expiry: "15 minutes",
        refresh: "7 days",
        rotation: "Automatic refresh"
      }
    },
    mfa: {
      methods: ["TOTP", "Email", "SMS"],
      triggers: "Risk-based assessment",
      recovery: "Backup codes"
    }
  },

  // Authorization patterns
  authorization: {
    rbac: {
      roles: "Hierarchical structure",
      permissions: "Granular access",
      inheritance: "Role hierarchy"
    },
    context: {
      tenant: "Institution isolation",
      scope: "Feature access",
      temporal: "Time-based access"
    }
  },

  // Data protection
  protection: {
    encryption: {
      atRest: {
        algorithm: "AES-256-GCM",
        keyManagement: "AWS KMS",
        rotation: "Annual key rotation"
      },
      inTransit: {
        protocol: "TLS 1.3",
        ciphers: "Strong cipher suite",
        verification: "Certificate pinning"
      }
    },
    masking: {
      patterns: {
        pii: "Personal information",
        credentials: "Security data",
        academic: "Protected records"
      },
      methods: {
        hash: "One-way hashing",
        truncate: "Partial display",
        redact: "Complete hiding"
      }
    }
  },

  // Security monitoring
  monitoring: {
    audit: {
      events: "Security-relevant actions",
      trails: "Action history",
      storage: "Immutable logs"
    },
    detection: {
      patterns: "Suspicious activity",
      thresholds: "Alert triggers",
      response: "Automated actions"
    }
  },

  // Implementation example
  example: `
    async function authorizeAction(
      action: string,
      user: User,
      resource: Resource
    ): Promise<boolean> {
      // Verify user context
      if (!user.institution_id) {
        throw new AuthorizationError(
          'Missing institution context'
        );
      }

      // Verify resource ownership
      if (resource.institution_id !== user.institution_id) {
        throw new AuthorizationError(
          'Cross-institution access denied'
        );
      }

      // Check role permissions
      const allowed = await checkPermission(
        user.role,
        action,
        resource.type
      );

      if (!allowed) {
        throw new AuthorizationError(
          'Insufficient permissions'
        );
      }

      // Log security audit
      await auditLog.record({
        user_id: user.id,
        action: action,
        resource: resource.id,
        institution_id: user.institution_id,
        timestamp: new Date(),
        success: true
      });

      return true;
    }
  `
}
```

### C. Performance Optimization
```typescript
interface PerformancePatterns {
  // Caching strategy
  caching: {
    layers: {
      browser: {
        types: ["Memory", "LocalStorage", "ServiceWorker"],
        policies: {
          static: "1 week",
          dynamic: "15 minutes",
          user: "1 hour"
        }
      },
      application: {
        types: ["Memory", "Redis", "CDN"],
        patterns: {
          distributed: "Consistent hashing",
          invalidation: "Event-based",
          preloading: "Predictive fetch"
        }
      },
      database: {
        types: ["Query", "Result", "Computed"],
        strategies: {
          reads: "Cache-aside",
          writes: "Write-through",
          batch: "Bulk operations"
        }
      }
    },
    keys: {
      patterns: {
        user: "u:{id}:*",
        tenant: "t:{id}:*",
        shared: "s:{type}:*"
      },
      expiry: {
        sliding: "Update on access",
        absolute: "Fixed duration",
        hybrid: "Combined approach"
      }
    }
  },

  // Query optimization
  queries: {
    patterns: {
      tenant: {
        isolation: "Schema separation",
        indexing: "Tenant-aware indexes",
        partitioning: "By institution"
      },
      access: {
        dataloader: "Batch loading",
        pagination: "Cursor-based",
        filtering: "Optimized where"
      },
      aggregation: {
        materialized: "Pre-computed views",
        incremental: "Real-time updates",
        scheduled: "Periodic refresh"
      }
    },
    example: `
      // Optimized course listing query
      const getCourses = async (
        institutionId: string,
        filters: CourseFilters,
        cursor: string,
        limit: number
      ) => {
        // Get from cache first
        const cacheKey = \`courses:${institutionId}:${hash(filters)}:${cursor}\`;
        const cached = await redis.get(cacheKey);
        if (cached) return JSON.parse(cached);

        // Efficient database query
        const courses = await prisma.$queryRaw\`
          WITH RECURSIVE course_tree AS (
            SELECT 
              c.*,
              array[c.id] as path,
              1 as level
            FROM courses c
            WHERE c.institution_id = ${institutionId}
            AND c.parent_id IS NULL

            UNION ALL

            SELECT 
              c.*,
              ct.path || c.id,
              ct.level + 1
            FROM courses c
            JOIN course_tree ct ON c.parent_id = ct.id
            WHERE c.institution_id = ${institutionId}
          )
          SELECT 
            c.*,
            COUNT(*) OVER() as total_count
          FROM course_tree c
          WHERE c.deleted_at IS NULL
          AND (${filters.level}::int IS NULL OR c.level = ${filters.level})
          AND (
            ${filters.search}::text IS NULL 
            OR c.title ILIKE '%' || ${filters.search} || '%'
          )
          AND c.id > ${cursor}
          ORDER BY c.id
          LIMIT ${limit}
        \`;

        // Cache results
        await redis.setex(cacheKey, 300, JSON.stringify(courses));
        
        return courses;
      };
    `
  },

  // Resource optimization
  resources: {
    scaling: {
      compute: {
        auto: "Load-based scaling",
        predictive: "Pattern-based",
        elastic: "Demand-driven"
      },
      storage: {
        tiering: "Access frequency",
        compression: "Adaptive levels",
        cleanup: "Automated pruning"
      }
    },
    pooling: {
      connections: {
        database: "Connection pools",
        http: "Keep-alive pools",
        workers: "Thread pools"
      },
      configuration: {
        size: "Load-based sizing",
        timeout: "Idle management",
        revival: "Auto-recovery"
      }
    }
  },

  // Content delivery
  delivery: {
    static: {
      cdn: {
        distribution: "Edge locations",
        purging: "Selective invalidation",
        warming: "Predictive caching"
      },
      optimization: {
        images: "Responsive sizing",
        bundles: "Code splitting",
        compression: "Optimal formats"
      }
    },
    dynamic: {
      streaming: {
        protocol: "HTTP/2 Push",
        chunking: "Progressive loading",
        priority: "Critical paths"
      },
      realtime: {
        websocket: "Connection pools",
        multiplexing: "Stream sharing",
        backpressure: "Flow control"
      }
    }
  },

  // Monitoring and tuning
  monitoring: {
    metrics: {
      latency: "Request timing",
      throughput: "Operation rate",
      saturation: "Resource usage",
      errors: "Failure rates"
    },
    optimization: {
      bottlenecks: "Performance profiling",
      tuning: "Parameter adjustment",
      validation: "A/B testing"
    }
  }
}
```

These patterns establish:

1. Multi-layer caching strategy
2. Efficient query patterns
3. Resource utilization
4. Content delivery optimization
5. Performance monitoring
6. Automated scaling
7. Load management

When implementing these patterns, ensure:

- Proper cache invalidation
- Query performance
- Resource efficiency
- Content delivery speed
- System scalability
- Real-time optimization
- Performance visibility

### E. Deployment Patterns
```typescript
interface DeploymentPatterns {
  // Infrastructure management
  infrastructure: {
    regions: {
      primary: {
        services: "Core deployment",
        database: "Primary cluster",
        cache: "Main Redis cluster"
      },
      secondary: {
        services: "Read replicas",
        database: "Replica clusters",
        cache: "Redis replicas"
      },
      edge: {
        cdn: "Content delivery",
        functions: "Edge computing",
        cache: "Regional caching"
      }
    },
    networking: {
      ingress: {
        loadBalancing: "Global traffic routing",
        ddos: "Attack mitigation",
        ssl: "Certificate management"
      },
      internal: {
        mesh: "Service communication",
        isolation: "Network policies",
        monitoring: "Traffic analysis"
      }
    }
  },

  // Service deployment
  services: {
    releases: {
      strategy: {
        canary: "Gradual rollout",
        blueGreen: "Zero-downtime",
        rollback: "Automatic reversion"
      },
      validation: {
        health: "Service checks",
        metrics: "Performance verification",
        dependencies: "Integration tests"
      }
    },
    scaling: {
      rules: {
        cpu: "Processor utilization",
        memory: "Memory consumption",
        requests: "Traffic patterns"
      },
      thresholds: {
        min: "Base capacity",
        max: "Resource limits",
        target: "Optimal utilization"
      }
    }
  },

  // Database operations
  database: {
    migrations: {
      strategy: {
        online: "Zero-downtime updates",
        batched: "Chunked processing",
        reversible: "Rollback support"
      },
      validation: {
        schema: "Structure verification",
        data: "Content integrity",
        performance: "Query optimization"
      }
    },
    maintenance: {
      backups: {
        full: "Complete snapshots",
        incremental: "Change tracking",
        point: "Time recovery"
      },
      optimization: {
        indexes: "Access patterns",
        vacuum: "Space reclamation",
        analyze: "Statistics update"
      }
    }
  },

  // Monitoring setup
  monitoring: {
    collection: {
      metrics: {
        system: "Resource usage",
        application: "Service health",
        business: "Domain KPIs"
      },
      tracing: {
        requests: "Path analysis",
        errors: "Problem diagnosis",
        performance: "Bottleneck detection"
      }
    },
    alerting: {
      rules: {
        critical: "Immediate action",
        warning: "Investigation needed",
        info: "Awareness only"
      },
      routing: {
        oncall: "Team rotation",
        escalation: "Response levels",
        channels: "Notification methods"
      }
    }
  },

  // Implementation example
  example: `
    // Kubernetes deployment manifest
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: matrix-college-api
      namespace: edu-matrix
    spec:
      replicas: 3
      strategy:
        type: RollingUpdate
        rollingUpdate:
          maxSurge: 1
          maxUnavailable: 0
      selector:
        matchLabels:
          app: matrix-college-api
      template:
        metadata:
          labels:
            app: matrix-college-api
        spec:
          containers:
          - name: api
            image: edu-matrix/matrix-college-api:latest
            resources:
              requests:
                cpu: "500m"
                memory: "512Mi"
              limits:
                cpu: "2000m"
                memory: "2Gi"
            readinessProbe:
              httpGet:
                path: /health
                port: 3000
              initialDelaySeconds: 5
              periodSeconds: 10
            livenessProbe:
              httpGet:
                path: /health
                port: 3000
              initialDelaySeconds: 15
              periodSeconds: 20
            env:
              - name: NODE_ENV
                value: "production"
              - name: REDIS_URL
                valueFrom:
                  secretKeyRef:
                    name: redis-credentials
                    key: url
              - name: DATABASE_URL
                valueFrom:
                  secretKeyRef:
                    name: database-credentials
                    key: url
  `
}
```

These deployment patterns ensure:

1. Multi-region availability
2. Zero-downtime updates
3. Auto-scaling capabilities
4. Database reliability
5. Performance monitoring
6. Resource optimization
7. Security compliance

## 4. Database Guidelines 

### A. Schema Management
```typescript
interface SchemaManagement {
  naming: "${service}_schema",
  access: {
    users: "Service-specific credentials",
    permissions: "Minimal required access",
    isolation: "No cross-schema queries"
  }
}
```

### B. Query Patterns:
```typescript
// Correct: Schema-isolated query
const courses = await prisma.$queryRaw`
  SET search_path TO matrix_college_schema;
  SELECT * FROM courses WHERE institution_id = ${institutionId}
`;

// WRONG: Never do cross-schema queries
// const data = await prisma.otherService.findMany()
```

## 5. Security Implementation

### A. Authentication & Authorization
```typescript
interface SecurityPattern {
  auth: {
    validation: "Service context check",
    permissions: "Role-based access",
    sessions: "Tenant-aware tokens"
  },
  data: {
    encryption: "Field-level when needed",
    masking: "Sensitive data protection",
    audit: "Action logging enabled"
  }
}
```

## 6. Error Handling

### A. Service Errors
```typescript
// Example: Service-specific error handling
// WHY: Maintain clear error boundaries
// WHERE: Throughout service code
// HOW: Custom error classes per service
class MatrixCollegeError extends Error {
  constructor(
    message: string,
    public code: string,
    public context: any
  ) {
    super(message);
  }
}
```

## 7. Performance Optimization

### A. Caching Strategy
```typescript
interface CachingPattern {
  layers: {
    browser: "Service-specific cache",
    server: "Redis per service",
    database: "Query result cache"
  }
}
```

### B. Implementation:
```typescript
// Example: Service caching
// WHY: Optimize service performance
// WHERE: Service repositories
// HOW: Multi-layer caching
async function getCourseData(id: string) {
  // Check service cache first
  const cached = await redis.get(`matrix-college:course:${id}`);
  if (cached) return JSON.parse(cached);
  
  // Query with schema isolation
  const data = await prisma.$queryRaw`
    SET search_path TO matrix_college_schema;
    SELECT * FROM courses WHERE id = ${id}
  `;
  
  // Cache in service namespace
  await redis.set(`matrix-college:course:${id}`, JSON.stringify(data));
  return data;
}
```

### D. Integration Testing
```typescript
interface TestingPatterns {
  // Service integration testing
  integration: {
    scopes: {
      service: {
        internal: "Within service boundaries",
        external: "Cross-service communication",
        database: "Data persistence"
      },
      tenant: {
        isolation: "Multi-tenant separation",
        interaction: "Cross-tenant prevention",
        cleanup: "Test data management"
      }
    },
    scenarios: {
      flows: {
        academic: "Educational processes",
        administrative: "Management tasks",
        communication: "Real-time features"
      },
      conditions: {
        success: "Happy path flows",
        failure: "Error handling",
        edge: "Boundary conditions"
      }
    }
  },

  // Test environment management
  environments: {
    setup: {
      database: {
        seeding: "Test data creation",
        cleanup: "Automatic teardown",
        isolation: "Per-test schema"
      },
      services: {
        mocking: "External dependencies",
        stubs: "Network services",
        containers: "Isolated runtime"
      }
    },
    data: {
      generation: {
        factories: "Test data builders",
        fixtures: "Common scenarios",
        snapshots: "State capture"
      },
      constraints: {
        referential: "Data relationships",
        validation: "Business rules",
        consistency: "State management"
      }
    }
  },

  // Example implementation
  example: `
    describe('Course Enrollment Integration', () => {
      // Test environment setup
      const testEnv = new TestEnvironment({
        services: ['matrix-college', 'course-platform'],
        tenants: ['test-institution-1', 'test-institution-2']
      });

      beforeAll(async () => {
        await testEnv.setup();
        await testEnv.seedData({
          institutions: institutionFactory.buildList(2),
          courses: courseFactory.buildList(5),
          students: studentFactory.buildList(10)
        });
      });

      afterAll(async () => {
        await testEnv.teardown();
      });

      it('should handle cross-service enrollment flow', async () => {
        // Arrange
        const student = await studentFactory.build();
        const course = await courseFactory.build();
        
        // Act
        const result = await enrollmentService.enroll({
          studentId: student.id,
          courseId: course.id,
          institutionId: 'test-institution-1'
        });

        // Assert - Edu Matrix Hub
        const matrixRecord = await matrixService.getEnrollment(result.id);
        expect(matrixRecord).toMatchObject({
          status: 'active',
          student: student.id,
          course: course.id
        });

        // Assert - Course Platform
        const courseAccess = await coursePlatform.getStudentAccess(
          student.id,
          course.id
        );
        expect(courseAccess).toMatchObject({
          granted: true,
          materials: 'accessible',
          progress: 0
        });

        // Assert - Events
        expect(testEnv.getEmittedEvents()).toContainEqual({
          type: 'enrollment.created',
          payload: {
            student: student.id,
            course: course.id
          }
        });
      });

      it('should maintain tenant isolation', async () => {
        // Arrange
        const tenant1Student = await studentFactory.build({
          institutionId: 'test-institution-1'
        });
        const tenant2Course = await courseFactory.build({
          institutionId: 'test-institution-2'
        });

        // Act & Assert
        await expect(
          enrollmentService.enroll({
            studentId: tenant1Student.id,
            courseId: tenant2Course.id
          })
        ).rejects.toThrow('Cross-institution enrollment not allowed');
      });
    });
  `
}
```

These testing patterns ensure:

1. Proper service integration
2. Multi-tenant isolation
3. Data consistency
4. Event handling
5. Error scenarios
6. Performance validation
7. Security compliance

## 8. Testing Guidelines

### A. Service Tests
```typescript
// Example: Service-specific test
// WHY: Validate service behavior
// WHERE: Service test files
// HOW: Isolated service testing
describe('MatrixCollege Service', () => {
  beforeEach(() => {
    // Set service context
    setTestContext('matrix-college');
    
    // Use service schema
    mockDatabase.setSchema('matrix_college_schema');
  });
  
  it('should create course in isolation', async () => {
    // Test with service boundaries
  });
});
```

## 9. Critical Reminders

### A. Never Generate:
1. Cross-service imports
2. Cross-schema queries
3. Shared state between services
4. Direct service-to-service calls

### B. Always Generate:
1. Service-specific repositories
2. Schema-isolated queries
3. Event-driven communication
4. Clear service boundaries

This guide serves as the definitive reference for GitHub Copilot to maintain true microservices architecture while generating code. Follow these patterns strictly to ensure proper service isolation and maintainable code structure.

### F. Observability Patterns
```typescript
interface ObservabilityPatterns {
  // Logging strategy
  logging: {
    levels: {
      application: {
        error: "System failures",
        warn: "Potential issues",
        info: "State changes",
        debug: "Detailed flow"
      },
      security: {
        critical: "Breaches",
        alert: "Suspicious activity",
        audit: "Access logs"
      },
      business: {
        transaction: "Core operations",
        user: "User actions",
        system: "Automated tasks"
      }
    },
    context: {
      request: {
        trace: "Correlation ID",
        user: "Actor context",
        tenant: "Institution ID"
      },
      performance: {
        timing: "Duration metrics",
        resources: "Usage stats",
        dependencies: "External calls"
      }
    }
  },

  // Tracing implementation
  tracing: {
    spans: {
      http: {
        incoming: "API requests",
        outgoing: "External calls",
        internal: "Service calls"
      },
      database: {
        queries: "SQL operations",
        cache: "Redis operations",
        search: "Search queries"
      }
    },
    sampling: {
      rules: {
        error: "All errors",
        latency: "Slow requests",
        random: "Statistical sample"
      },
      rates: {
        production: "1% of traffic",
        staging: "10% of traffic",
        development: "100% of traffic"
      }
    }
  },

  // Metrics collection
  metrics: {
    system: {
      resources: {
        cpu: "Utilization rates",
        memory: "Usage patterns",
        disk: "IO operations"
      },
      network: {
        throughput: "Data transfer",
        latency: "Response times",
        errors: "Failed requests"
      }
    },
    application: {
      performance: {
        response: "Request timing",
        throughput: "Request rate",
        errors: "Failure count"
      },
      business: {
        users: "Active sessions",
        operations: "Transaction volume",
        features: "Usage patterns"
      }
    }
  },

  // Implementation example
  example: `
    // Trace middleware
    async function traceMiddleware(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const traceId = req.headers['x-trace-id'] || generateTraceId();
      const spanId = generateSpanId();
      
      // Start span
      const span = tracer.startSpan('http_request', {
        traceId,
        spanId,
        attributes: {
          service: 'matrix-college-api',
          method: req.method,
          path: req.path,
          tenant: req.institution_id
        }
      });

      // Timing metrics
      const startTime = process.hrtime();

      // Response interceptor
      const originalEnd = res.end;
      res.end = function(...args) {
        // Calculate duration
        const [seconds, nanoseconds] = process.hrtime(startTime);
        const duration = seconds * 1000 + nanoseconds / 1000000;

        // Record metrics
        metrics.recordHttpRequest({
          method: req.method,
          path: req.path,
          status: res.statusCode,
          duration
        });

        // End span
        span.setAttributes({
          status: res.statusCode,
          error: res.statusCode >= 400,
          duration
        });
        span.end();

        // Structured logging
        logger.info('http_request_completed', {
          trace_id: traceId,
          span_id: spanId,
          method: req.method,
          path: req.path,
          status: res.statusCode,
          duration,
          user: req.user?.id,
          tenant: req.institution_id
        });

        originalEnd.apply(res, args);
      };

      // Continue request
      req.traceId = traceId;
      req.spanId = spanId;
      next();
    }
  `
}
```

These observability patterns ensure:

1. Comprehensive logging
2. Distributed tracing
3. Business metrics
4. Performance monitoring
5. Error tracking
6. User analytics
7. System health visibility

// ...continue with Disaster Recovery patterns...