# 🎓 EDU Matrix Interlinked - Ultimate GitHub Copilot Context

<!-- CRITICAL PROJECT METADATA FOR OPTIMAL AI UNDERSTANDING -->

**Core Framework:** Next.js 15.2.3 (App Router + Turbopack)  
**Primary Language:** TypeScript 5.8.2 (Strict Mode + Full Type Coverage)  
**Database Stack:** PostgreSQL 16 + Prisma ORM 6.5.0 (Multi-tenant Schema-per-Institution) **[Docker Container]**  
**Authentication:** NextAuth.js 5.0 (Official Beta - Credentials + OAuth)  
**UI System:** shadcn/ui (100% Official Components) + Tailwind CSS 4.0.15  
**Real-time Stack:** Socket.IO 4.8.1 + Apache Kafka 4.0 (KRaft) + Redis 7.2+ **[All Docker Containers]**  
**State Management:** Redux Toolkit 2.6.1 + Redux Persist  
**Architecture:** 9-Module Microservices Ecosystem (Multi-tenant SaaS)  
**AI Integration:** Google Gemini + Custom Educational AI  
**Deployment:** Docker Compose (Official Images Only) **[PostgreSQL + Redis + Kafka + Socket.IO Containers]**

## 🚨 CRITICAL COPILOT INSTRUCTIONS

1. **UI Components:** ONLY use official shadcn/ui components - NO external UI libraries
2. **Framework:** Follow Next.js 15 App Router patterns exclusively
3. **Database:** Every query MUST include tenant isolation (institutionId filtering)
4. **Authentication:** Use NextAuth.js 5 patterns only
5. **TypeScript:** Strict typing required for all functions/components
6. **Multi-tenant:** Schema-per-institution with complete data isolation

---

## 🎯 PROJECT OVERVIEW - Essential Context for GitHub Copilot

### What EDU Matrix Interlinked Is

**EDU Matrix Interlinked** is a revolutionary **Complete Digital Education Ecosystem** serving **10+ million users** across **10,000+ educational institutions** globally. This is not just another educational platform - it's a comprehensive SaaS solution that combines:

- **Social Learning Platform** (Facebook-like for education with Stories, Posts & Trending)
- **Multi-tenant Institution Management** (Complete digital transformation)
- **Course Marketplace** (Coursera-style learning)
- **Career Development Hub** (Jobs + Freelancing with social features)
- **Educational News Hub** (News platform with Stories, Posts & Trending)
- **Real-time Communication** (Video calls + Chat + Collaboration)

### Mission & Revolutionary Impact

Transform the global education landscape by providing the world's first unified digital ecosystem where:
- **10+ Million Students** engage in social learning and career development
- **10,000+ Educational Institutions** achieve complete digital transformation
- **1+ Million Teachers/Professors** deliver modern AI-powered education
- **5+ Million Parents** monitor children's progress in real-time
- **100,000+ Employers** connect with talented graduates

### Technical Scale & Complexity

```typescript
interface ProjectComplexity {
  userScale: {
    totalUsers: "10+ million registered users globally",
    institutions: "10,000+ schools, colleges, universities",
    dailyActiveUsers: "2+ million daily active users",
    concurrentConnections: "500K+ real-time Socket.IO connections",
    dataVolume: "Petabytes of educational data with complete isolation"
  },
  technicalScope: {
    microservices: "9 independent modules with isolated databases",
    realTimeOps: "24/7 operations with <1s response times",
    aiIntegration: "Google Gemini for automated educational processes",
    multiTenant: "Schema-per-institution with enterprise RBAC",
    globalScale: "Multi-region deployment with CDN optimization"
  },
  businessComplexity: {
    monetization: "Freemium + Premium + Enterprise subscriptions",
    compliance: "GDPR + FERPA + SOC2 + CCPA compliance",
    languages: "Multi-language support for global market",
    customization: "White-label solutions for institutions"
  }
}
```

---

## 🏗️ ARCHITECTURE - 9 Microservices Ecosystem (Critical for Copilot)

### Complete Module Architecture Map

```typescript
interface EDUMatrixEcosystem {
  modules: {    1: {
      name: "students-interlinked",
      description: "Facebook-like social learning platform for 10M+ students with Stories, Posts & Trending",
      primaryFeatures: ["Social Stories", "Educational Posts", "Trending Topics", "Academic Networking"],
      route: "/students-interlinked",
      database: "social_learning_db (isolated per institution)",
      realTime: "Socket.IO for instant social interactions + notifications",
      scale: "Millions of posts, comments, likes per day"
    },
    2: {
      name: "edu-matrix-hub", 
      description: "Multi-tenant digital institution management ecosystem",
      primaryFeatures: ["Institution Management", "RBAC", "AI Exams", "Real-time Attendance"],
      route: "/edu-matrix-hub",
      database: "institution_management_db (schema-per-institution)",
      realTime: "Real-time attendance tracking + parent notifications",
      scale: "10,000+ institutions, millions of users with complete isolation"
    },
    3: {
      name: "courses",
      description: "Comprehensive course marketplace and delivery (Coursera-like)",
      primaryFeatures: ["Course Creation", "Video Streaming", "Certificates", "Progress Analytics"],
      route: "/courses", 
      database: "course_marketplace_db",
      realTime: "Live video streaming + interactive assessments",
      scale: "100K+ courses, millions of enrollments"
    },    4: {
      name: "freelancing",
      description: "Educational freelancing platform with Stories, Posts & Trending for skills and projects",
      primaryFeatures: ["Project Stories", "Freelancer Posts", "Trending Skills", "Escrow Payments"],
      route: "/freelancing",
      database: "freelance_platform_db",
      realTime: "Real-time project collaboration + messaging",
      scale: "500K+ freelancers, millions of projects"
    },    5: {
      name: "jobs",
      description: "Career portal with Stories, Posts & Trending for job marketplace and AI matching",
      primaryFeatures: ["Career Stories", "Job Success Posts", "Trending Jobs", "AI Resume Builder"],
      route: "/jobs",
      database: "career_portal_db", 
      realTime: "Live application updates + interview notifications",
      scale: "1M+ job seekers, 100K+ employers"
    },    6: {
      name: "edu-news",
      description: "Educational news hub with Stories, Posts & Trending for content curation and community",
      primaryFeatures: ["News Stories", "Article Posts", "Trending News", "Social Sharing"],
      route: "/edu-news",
      database: "educational_news_db",
      realTime: "Live news updates + breaking education news",
      scale: "Daily news for global education community"
    },
    7: {
      name: "community-room",
      description: "Advanced real-time communication and collaboration platform",
      primaryFeatures: ["Video Conferences", "Screen Sharing", "File Collaboration", "Whiteboard"],
      route: "/community-room", 
      database: "communication_platform_db",
      realTime: "Socket.IO for all communication features + WebRTC",
      scale: "500K+ concurrent video calls, millions of messages"
    },
    8: {
      name: "about",
      description: "Platform analytics, statistics, and business intelligence",
      primaryFeatures: ["Real-time Analytics", "Platform Metrics", "Business Intelligence", "Performance Monitoring"],
      route: "/about",
      database: "analytics_reporting_db",
      realTime: "Live platform statistics and user metrics",
      scale: "Real-time processing of billions of data points"
    },
    9: {
      name: "feedback",
      description: "Comprehensive feedback and survey management system",
      primaryFeatures: ["Dynamic Surveys", "Feedback Analytics", "Sentiment Analysis", "Response Management"],
      route: "/feedback",
      database: "feedback_survey_db", 
      realTime: "Real-time feedback processing + notifications",
      scale: "Millions of feedback responses and surveys"
    }  }
}
```

### 🌟 **Unified Social Features Architecture** (Facebook-like across 4 modules)

The following modules implement identical Facebook-like social features for consistent user experience:

#### **Modules with Social Features:**
1. **Students Interlinked** - Academic social networking
2. **Freelancing** - Professional freelancer networking  
3. **Jobs** - Career networking and job marketplace
4. **Edu News** - Educational news and journalism

#### **Core Social Features (Implemented in all 4 modules):**

```typescript
interface UnifiedSocialFeatures {
  stories: {
    type: "Instagram/Facebook-like 24-hour stories",
    features: ["Rich media", "Reactions", "Replies", "Highlights"],
    content: "Module-specific content (academic/professional/career/news)"
  },
  posts: {
    type: "Facebook-like posts with rich interactions",  
    features: ["Like", "Comment", "Share", "Save", "Rich media"],
    content: "Module-specific discussions and content sharing"
  },
  trending: {
    type: "Real-time trending algorithm across all content",
    features: ["Trending topics", "Trending posts", "Trending users"],
    algorithm: "AI-powered engagement-based trending detection"
  },
  realTime: {
    notifications: "Instant notifications for all social interactions",
    updates: "Live feed updates and real-time engagement",
    messaging: "Socket.IO for instant communication"
  }
}
```

#### **Module-Specific Social Content:**
- **Students Interlinked**: Academic achievements, study materials, campus life
- **Freelancing**: Project updates, skill showcases, work portfolio  
- **Jobs**: Career milestones, job search journey, professional insights
- **Edu News**: Breaking news, editorial opinions, educational updates

```
  "about": {
    description: "Platform statistics and information",
    features: ["Analytics", "Platform Info", "Metrics Dashboard"],
    route: "/about"
  },
  "feedback": {
    description: "User feedback and survey system",
    features: ["Feedback Forms", "Surveys", "Analytics"],
    route: "/feedback"
  }
}
```

### Project Directory Structure (Essential for Copilot Navigation)

```
EDU-MATRIX-INTERLINKED/ (Root Directory)
├── 📁 app/ (Next.js 15 App Router - Primary Application Code)
│   ├── 🏠 layout.tsx (Root layout with all providers + global config)
│   ├── 🏠 page.tsx (Landing page + hero section)
│   ├── 🎨 globals.css (Global Tailwind + custom styles)
│   ├── 📱 favicon.ico (Platform favicon)
│   │
│   ├── 📂 api/ (API Routes for All 9 Modules + Authentication)
│   │   ├── 🔐 auth/[...nextauth]/ (NextAuth.js 5 configuration)
│   │   ├── 👥 students-interlinked/ (Social platform APIs)
│   │   │   ├── posts/route.ts (CRUD for social posts)
│   │   │   ├── stories/route.ts (Stories management)
│   │   │   └── feed/route.ts (Personalized social feed)
│   │   ├── 🏫 edu-matrix-hub/ (Institution management APIs)
│   │   │   ├── institutions/route.ts (Institution CRUD)
│   │   │   ├── attendance/route.ts (Real-time attendance)
│   │   │   ├── exams/route.ts (AI-powered examinations)
│   │   │   └── analytics/route.ts (Institutional analytics)
│   │   ├── 📚 courses/ (Course platform APIs)
│   │   │   ├── marketplace/route.ts (Course catalog)
│   │   │   ├── enrollment/route.ts (Course enrollment)
│   │   │   └── progress/route.ts (Learning progress)
│   │   ├── 💼 freelancing/ (Freelancing platform APIs)
│   │   ├── 💼 jobs/ (Job portal APIs)
│   │   ├── 📰 edu-news/ (Educational news APIs)
│   │   ├── 💬 community-room/ (Real-time communication APIs)
│   │   ├── 📊 about/ (Platform statistics APIs)
│   │   └── 📝 feedback/ (Feedback system APIs)
│   │
│   ├── 📂 auth/ (Authentication Pages)
│   │   ├── signin/page.tsx (Login with credentials + OAuth)
│   │   ├── signup/page.tsx (Registration with role selection)
│   │   └── error/page.tsx (Authentication error handling)
│   │
│   ├── 📂 dashboard/ (Unified User Dashboard)
│   │   ├── page.tsx (Main dashboard with module cards)
│   │   ├── profile/page.tsx (User profile management)
│   │   └── settings/page.tsx (User preferences + settings)
│   │
│   ├── 📂 students-interlinked/ (Module 1: Social Platform)
│   │   ├── page.tsx (Main social feed + trending)
│   │   ├── create-post/page.tsx (Post creation interface)
│   │   ├── profile/[id]/page.tsx (User profile pages)
│   │   ├── stories/page.tsx (Stories view + creation)
│   │   ├── trending/page.tsx (Trending content discovery)
│   │   └── search/page.tsx (Social content search)
│   │
│   ├── 📂 edu-matrix-hub/ (Module 2: Institution Management)
│   │   ├── page.tsx (Institution dashboard + overview)
│   │   ├── institutions/
│   │   │   ├── page.tsx (Institution listing + management)
│   │   │   ├── [id]/page.tsx (Individual institution view)
│   │   │   └── register/page.tsx (New institution registration)
│   │   ├── attendance/
│   │   │   ├── page.tsx (Attendance dashboard)
│   │   │   ├── mark/page.tsx (Attendance marking interface)
│   │   │   └── reports/page.tsx (Attendance analytics)
│   │   ├── exams/
│   │   │   ├── page.tsx (Exam management dashboard)
│   │   │   ├── create/page.tsx (AI-powered exam creation)
│   │   │   ├── take/[id]/page.tsx (Exam taking interface)
│   │   │   └── results/page.tsx (Results + analytics)
│   │   └── analytics/page.tsx (Institutional performance metrics)
│   │
│   ├── 📂 courses/ (Module 3: Course Marketplace)
│   │   ├── page.tsx (Course catalog + search)
│   │   ├── [courseId]/
│   │   │   ├── page.tsx (Course details + enrollment)
│   │   │   ├── learn/page.tsx (Course learning interface)
│   │   │   └── certificate/page.tsx (Certificate generation)
│   │   ├── create/page.tsx (Course creation wizard)
│   │   ├── my-courses/page.tsx (Enrolled + created courses)
│   │   └── instructor/
│   │       ├── dashboard/page.tsx (Instructor analytics)
│   │       └── earnings/page.tsx (Revenue tracking)
│   │
│   ├── 📂 freelancing/ (Module 4: Freelancing Platform)
│   │   ├── page.tsx (Freelancing dashboard + gigs)
│   │   ├── gigs/
│   │   │   ├── page.tsx (Browse available gigs)
│   │   │   ├── [id]/page.tsx (Individual gig details)
│   │   │   └── create/page.tsx (Create new gig)
│   │   ├── portfolio/page.tsx (Portfolio builder + showcase)
│   │   ├── proposals/page.tsx (Proposal management)
│   │   └── earnings/page.tsx (Payment tracking + analytics)
│   │
│   ├── 📂 jobs/ (Module 5: Job Portal)
│   │   ├── page.tsx (Job listings + search)
│   │   ├── [jobId]/page.tsx (Job details + application)
│   │   ├── applications/page.tsx (Application tracking)
│   │   ├── resume/
│   │   │   ├── page.tsx (Resume builder interface)
│   │   │   └── preview/page.tsx (Resume preview + download)
│   │   ├── interviews/page.tsx (Interview scheduling)
│   │   └── employer/
│   │       ├── dashboard/page.tsx (Employer dashboard)
│   │       ├── post-job/page.tsx (Job posting interface)
│   │       └── candidates/page.tsx (Candidate management)
│   │
│   ├── 📂 edu-news/ (Module 6: Educational News)
│   │   ├── page.tsx (News feed + categories)
│   │   ├── [articleId]/page.tsx (Article reading interface)
│   │   ├── categories/[category]/page.tsx (Category-specific news)
│   │   ├── publish/page.tsx (News publishing interface)
│   │   └── trending/page.tsx (Trending educational news)
│   │
│   ├── 📂 community-room/ (Module 7: Communication)
│   │   ├── page.tsx (Community dashboard + rooms)
│   │   ├── rooms/
│   │   │   ├── page.tsx (Room browser + discovery)
│   │   │   ├── [roomId]/page.tsx (Chat room interface)
│   │   │   └── create/page.tsx (Room creation)
│   │   ├── video-call/[callId]/page.tsx (Video call interface)
│   │   ├── messages/page.tsx (Direct messaging)
│   │   └── files/page.tsx (Shared files management)
│   │
│   ├── 📂 about/ (Module 8: Platform Information)
│   │   ├── page.tsx (About platform + team)
│   │   ├── statistics/page.tsx (Live platform metrics)
│   │   ├── team/page.tsx (Team information)
│   │   └── careers/page.tsx (Join our team)
│   │
│   └── 📂 feedback/ (Module 9: Feedback System)
│       ├── page.tsx (Feedback dashboard + forms)
│       ├── surveys/
│       │   ├── page.tsx (Survey management)
│       │   ├── [surveyId]/page.tsx (Take survey)
│       │   └── create/page.tsx (Survey builder)
│       ├── analytics/page.tsx (Feedback analytics)
│       └── responses/page.tsx (Response management)
│
├── 📁 components/ (React Components - Organized by Module)
│   ├── 📂 ui/ (shadcn/ui Official Components - CRITICAL)
│   │   ├── button.tsx (Primary button component)
│   │   ├── card.tsx (Card layout component)
│   │   ├── input.tsx (Form input component)
│   │   ├── label.tsx (Form label component)
│   │   ├── dialog.tsx (Modal dialog component)
│   │   ├── sheet.tsx (Sliding sheet component)
│   │   ├── toast.tsx (Notification toast)
│   │   ├── avatar.tsx (User avatar component)
│   │   ├── badge.tsx (Status badge component)
│   │   ├── tabs.tsx (Tab navigation component)
│   │   ├── select.tsx (Dropdown select component)
│   │   ├── textarea.tsx (Multi-line text input)
│   │   ├── checkbox.tsx (Checkbox input)
│   │   ├── radio-group.tsx (Radio button group)
│   │   ├── switch.tsx (Toggle switch)
│   │   ├── progress.tsx (Progress bar component)
│   │   ├── separator.tsx (Visual separator)
│   │   ├── table.tsx (Data table component)
│   │   ├── calendar.tsx (Date picker component)
│   │   ├── form.tsx (Form wrapper component)
│   │   └── ... (All other official shadcn/ui components)
│   │
│   ├── 📂 0-navbar-landingPage/ (Global Navigation)
│   │   ├── Navbar.tsx (Main navigation with role-based menu)
│   │   ├── MobileMenu.tsx (Responsive mobile navigation)
│   │   └── UserDropdown.tsx (User account dropdown)
│   │
│   ├── 📂 1-Students-Interlinked/ (Social Platform Components)
│   │   ├── CreatePostArea.tsx (Post creation with media upload)
│   │   ├── Feed.tsx (Infinite scroll social feed)
│   │   ├── PostCard.tsx (Individual post with interactions)
│   │   ├── StoriesSection.tsx (Stories carousel + creation)
│   │   ├── TrendingTopics.tsx (Trending content discovery)
│   │   ├── UserProfile.tsx (User profile display)
│   │   ├── SearchBar.tsx (Social content search)
│   │   └── NotificationCenter.tsx (Real-time notifications)
│   │
│   ├── 📂 2-Edu-Matrix-Hub/ (Institution Management Components)
│   │   ├── InstitutionDashboard.tsx (Main institutional overview)
│   │   ├── AttendanceTracker.tsx (Real-time attendance marking)
│   │   ├── ExamManager.tsx (AI-powered exam system)
│   │   ├── ProgressMonitor.tsx (Student progress tracking)
│   │   ├── ParentPortal.tsx (Parent communication interface)
│   │   ├── TeacherDashboard.tsx (Teacher management tools)
│   │   ├── StudentRegistry.tsx (Student enrollment management)
│   │   └── InstitutionSettings.tsx (Institution configuration)
│   │
│   ├── 📂 3-Courses/ (Course Platform Components)
│   │   ├── CourseCard.tsx (Course display card)
│   │   ├── VideoPlayer.tsx (Custom video player with progress)
│   │   ├── CourseCreator.tsx (Course creation wizard)
│   │   ├── ProgressTracker.tsx (Learning progress visualization)
│   │   ├── CertificateGenerator.tsx (Digital certificate creation)
│   │   ├── QuizBuilder.tsx (Interactive quiz creation)
│   │   └── DiscussionForum.tsx (Course discussion board)
│   │
│   ├── 📂 4-Freelancing/ (Freelancing Components)
│   │   ├── GigCard.tsx (Freelancing gig display)
│   │   ├── PortfolioBuilder.tsx (Portfolio creation interface)
│   │   ├── PaymentManager.tsx (Payment processing + escrow)
│   │   ├── ProposalForm.tsx (Gig proposal submission)
│   │   ├── SkillMatcher.tsx (AI-powered skill matching)
│   │   └── ProjectChat.tsx (Real-time project communication)
│   │
│   ├── 📂 5-Jobs/ (Job Portal Components)
│   │   ├── JobCard.tsx (Job listing display)
│   │   ├── ApplicationForm.tsx (Job application interface)
│   │   ├── ResumeBuilder.tsx (AI-powered resume builder)
│   │   ├── InterviewScheduler.tsx (Interview booking system)
│   │   ├── CareerMatcher.tsx (AI career recommendations)
│   │   └── EmployerDashboard.tsx (Employer management tools)
│   │
│   ├── 📂 6-Edu-News/ (Educational News Components)
│   │   ├── NewsCard.tsx (News article display)
│   │   ├── NewsEditor.tsx (Rich text news editor)
│   │   ├── CategoryFilter.tsx (News category filtering)
│   │   ├── TrendingNews.tsx (Trending news widget)
│   │   └── NewsletterSignup.tsx (Newsletter subscription)
│   │
│   ├── 📂 7-Community-Room/ (Communication Components)
│   │   ├── ChatRoom.tsx (Real-time chat interface)
│   │   ├── VideoCall.tsx (Video conferencing component)
│   │   ├── ScreenShare.tsx (Screen sharing functionality)
│   │   ├── FileShare.tsx (File upload + sharing)
│   │   ├── Whiteboard.tsx (Collaborative whiteboard)
│   │   └── RoomManager.tsx (Room creation + management)
│   │
│   ├── 📂 8-About-Stats/ (Statistics Components)
│   │   ├── StatisticsCard.tsx (Metric display cards)
│   │   ├── AnalyticsDashboard.tsx (Comprehensive analytics)
│   │   ├── LiveMetrics.tsx (Real-time platform metrics)
│   │   └── PerformanceChart.tsx (Performance visualization)
│   │
│   ├── 📂 9-Feedback/ (Feedback Components)
│   │   ├── FeedbackForm.tsx (Dynamic feedback forms)
│   │   ├── SurveyBuilder.tsx (Survey creation interface)
│   │   ├── ResponseAnalytics.tsx (Feedback analytics)
│   │   └── SentimentAnalysis.tsx (AI sentiment analysis)
│   │
│   └── 📂 auth/ (Authentication Components)
│       ├── LoginForm.tsx (Credentials + OAuth login)
│       ├── SignupForm.tsx (Multi-step registration)
│       ├── ProtectedRoute.tsx (Route protection wrapper)
│       ├── RoleGuard.tsx (Role-based access control)
│       └── SessionProvider.tsx (Session state management)
│
├── 📁 lib/ (Core Utilities & Configurations)
│   ├── 🔧 prisma.ts (Database connection + query utilities)
│   ├── 🔐 auth.ts (NextAuth.js 5 configuration + providers)
│   ├── 🔴 redis.ts (Redis client + caching utilities)
│   ├── 🔌 socket.ts (Socket.IO client + server config)
│   ├── 📨 kafka.ts (Apache Kafka producer + consumer)
│   ├── 🛠️ utils.ts (Utility functions + helpers)
│   ├── ✅ validations.ts (Zod validation schemas)
│   ├── 🎨 cn.ts (Tailwind class name utilities)
│   └── 📂 redux/ (Redux Toolkit State Management)
│       ├── store.ts (Main store configuration)
│       ├── 📂 slices/ (Feature-specific state slices)
│       │   ├── authSlice.ts (Authentication state)
│       │   ├── studentsInterlinkedSlice.ts (Social platform state)
│       │   ├── eduMatrixHubSlice.ts (Institution management state)
│       │   ├── coursesSlice.ts (Course platform state)
│       │   ├── freelancingSlice.ts (Freelancing state)
│       │   ├── jobsSlice.ts (Job portal state)
│       │   ├── newsSlice.ts (News platform state)
│       │   ├── communitySlice.ts (Communication state)
│       │   └── uiSlice.ts (UI preferences state)
│       └── hooks.ts (Typed Redux hooks for TypeScript)
│
├── 📁 prisma/ (Database Schema & Migrations)
│   ├── 📊 schema.prisma (Multi-tenant database schema)
│   ├── 📂 migrations/ (Database migration files)
│   ├── 🌱 seed.ts (Database seeding scripts)
│   └── 📂 sql/ (Custom SQL scripts for complex operations)
│
├── 📁 types/ (TypeScript Type Definitions)
│   ├── 🔐 auth.ts (Authentication + session types)
│   ├── 📊 database.ts (Prisma + database types)
│   ├── 🔌 api.ts (API request + response types)
│   ├── 🔴 redis.ts (Redis data structure types)
│   ├── 📨 socket.ts (Socket.IO event types)
│   └── 📂 modules/ (Module-specific type definitions)
│       ├── students-interlinked.ts (Social platform types)
│       ├── edu-matrix-hub.ts (Institution management types)
│       ├── courses.ts (Course platform types)
│       ├── freelancing.ts (Freelancing platform types)
│       ├── jobs.ts (Job portal types)
│       ├── edu-news.ts (News platform types)
│       ├── community-room.ts (Communication platform types)
│       ├── about.ts (Analytics + statistics types)
│       └── feedback.ts (Feedback system types)
│
├── 📁 public/ (Static Assets & Resources)
│   ├── 📂 images/ (Image assets + media)
│   ├── 📂 icons/ (SVG icons + favicons)
│   ├── 📂 documents/ (PDF documents + resources)
│   └── 📂 uploads/ (User-generated content storage)
│
├── 📁 hooks/ (Custom React Hooks)
│   ├── useAuth.ts (Authentication utilities)
│   ├── useSocket.ts (Real-time Socket.IO hook)
│   ├── useLocalStorage.ts (Browser storage utilities)
│   ├── useInfiniteScroll.ts (Infinite scrolling implementation)
│   └── useMultiTenant.ts (Multi-tenant data isolation)
│
├── 📁 middleware/ (Next.js Middleware)
│   ├── auth.ts (Authentication middleware)
│   ├── rateLimit.ts (API rate limiting)
│   ├── multiTenant.ts (Tenant isolation middleware)
│   └── logging.ts (Request logging + monitoring)
│
├── 📁 constants/ (Application Constants)
│   ├── roles.ts (User roles + permissions)
│   ├── routes.ts (Application route constants)
│   ├── api.ts (API endpoint constants)
│   └── config.ts (App configuration constants)
│
├── 📁 utils/ (Additional Utility Functions)
│   ├── formatters.ts (Data formatting utilities)
│   ├── validators.ts (Input validation utilities)
│   ├── encryption.ts (Data encryption utilities)
│   └── notifications.ts (Notification utilities)
│
├── 📄 docker-compose.yml (Production Docker environment)
├── 📄 Dockerfile (Container configuration)
├── 📄 package.json (Dependencies + scripts)
├── 📄 tsconfig.json (TypeScript configuration)
├── 📄 tailwind.config.ts (Tailwind CSS configuration)
├── 📄 next.config.ts (Next.js configuration)
├── 📄 eslint.config.js (ESLint configuration)
├── 📄 prettier.config.js (Prettier configuration)
├── 📄 .env.example (Environment variables template)
├── 📄 .env.local (Local development environment)
├── 📄 .gitignore (Git ignore rules)
└── 📄 README.md (Project documentation)
```
│   ├── 3-Courses/                 # Course Platform Components
│   │   ├── CourseCard.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── CourseCreator.tsx
│   │   └── ProgressTracker.tsx
│   ├── 4-Freelancing/             # Freelancing Components
│   │   ├── GigCard.tsx
│   │   ├── PortfolioBuilder.tsx
│   │   └── PaymentManager.tsx
│   ├── 5-Jobs/                    # Job Portal Components
│   │   ├── JobCard.tsx
│   │   ├── ApplicationForm.tsx
│   │   └── ResumeBuilder.tsx
│   ├── 6-Edu-News/                # News Hub Components
│   │   ├── NewsCard.tsx
│   │   ├── NewsEditor.tsx
│   │   └── CategoryFilter.tsx
│   ├── 7-Community-Room/          # Communication Components
│   │   ├── ChatRoom.tsx
│   │   ├── VoiceCall.tsx
│   │   └── FileShare.tsx
│   ├── 8-About-Stats/             # Statistics Components
│   │   ├── StatisticsCard.tsx
│   │   └── AnalyticsDashboard.tsx
│   ├── 9-Feedback/                # Feedback Components
│   │   ├── FeedbackForm.tsx
│   │   └── SurveyBuilder.tsx
│   └── auth/                      # Authentication Components
│       ├── LoginForm.tsx
│       ├── SignupForm.tsx
│       └── ProtectedRoute.tsx
├── lib/                           # Utility Libraries & Configurations
│   ├── prisma.ts                  # Database connection (PostgreSQL)
│   ├── auth.ts                    # NextAuth.js 5 configuration
│   ├── redis.ts                   # Redis connection (caching)
│   ├── socket.ts                  # Socket.IO configuration
│   ├── kafka.ts                   # Apache Kafka configuration
│   ├── utils.ts                   # Utility functions
│   ├── validations.ts             # Zod validation schemas
│   └── redux/                     # Redux Toolkit store
│       ├── store.ts               # Main store configuration
│       ├── slices/                # Feature slices
│       └── hooks.ts               # Typed Redux hooks
├── prisma/                        # Database Schema & Migrations
│   ├── schema.prisma              # Multi-tenant database schema
│   ├── migrations/                # Database migrations
│   └── seed.ts                    # Database seeding
├── types/                         # TypeScript Type Definitions
│   ├── auth.ts                    # Authentication types
│   ├── database.ts                # Database types
│   ├── api.ts                     # API response types
│   └── modules/                   # Module-specific types
│       ├── students-interlinked.ts
│       ├── edu-matrix-hub.ts
│       ├── courses.ts
│       ├── freelancing.ts
│       ├── jobs.ts
│       ├── edu-news.ts
│       ├── community-room.ts
│       ├── about.ts
│       └── feedback.ts
├── public/                        # Static Assets
│   ├── images/                    # Image assets
│   ├── icons/                     # Icon assets
│   └── documents/                 # Document assets
├── docker-compose.yml             # Development environment setup
├── Dockerfile                     # Container configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── next.config.ts                 # Next.js configuration
├── prisma.config.ts               # Prisma configuration
└── README.md                      # Project documentation
```
│   ---

## 💻 COMPLETE TECH STACK - 100% Official Latest Packages (Critical for Copilot)

### Core Framework & Language (Latest Stable Versions)

```json
{
  "next": "15.2.3",                   // Next.js with App Router + Turbopack (Latest)
  "react": "19.0.0",                  // React 19 with concurrent features
  "react-dom": "19.0.0",              // React DOM for web rendering
  "typescript": "5.8.2",              // TypeScript with strict mode configuration
  "@types/node": "^22.10.0",          // Node.js type definitions (Latest)
  "@types/react": "^19.0.0",          // React type definitions (Compatible)
  "@types/react-dom": "^19.0.0"       // React DOM type definitions
}
```

### UI Framework & Design System (100% Official shadcn/ui - MANDATORY)

```json
{
  "tailwindcss": "^4.0.15",                      // Latest Tailwind CSS framework
  "postcss": "^8.5.1",                           // PostCSS for CSS processing
  "autoprefixer": "^10.4.20",                    // CSS vendor prefixing
  
  // shadcn/ui Core Dependencies (CRITICAL - USE ONLY THESE)
  "@radix-ui/react-avatar": "^1.0.4",           // Avatar component primitives
  "@radix-ui/react-alert-dialog": "^1.0.5",     // Alert dialog primitives
  "@radix-ui/react-aspect-ratio": "^1.0.3",     // Aspect ratio primitives
  "@radix-ui/react-checkbox": "^1.0.4",         // Checkbox component primitives
  "@radix-ui/react-dialog": "^1.0.5",           // Dialog/Modal primitives
  "@radix-ui/react-dropdown-menu": "^2.0.6",    // Dropdown menu primitives
  "@radix-ui/react-hover-card": "^1.0.7",       // Hover card primitives
  "@radix-ui/react-label": "^2.0.2",            // Label component primitives
  "@radix-ui/react-menubar": "^1.0.4",          // Menubar component primitives
  "@radix-ui/react-navigation-menu": "^1.1.4",  // Navigation menu primitives
  "@radix-ui/react-popover": "^1.0.7",          // Popover component primitives
  "@radix-ui/react-progress": "^1.0.3",         // Progress bar primitives
  "@radix-ui/react-radio-group": "^1.1.3",      // Radio group primitives
  "@radix-ui/react-scroll-area": "^1.0.5",      // Scroll area primitives
  "@radix-ui/react-select": "^2.0.0",           // Select component primitives
  "@radix-ui/react-separator": "^1.0.3",        // Separator component primitives
  "@radix-ui/react-slider": "^1.1.2",           // Slider component primitives
  "@radix-ui/react-switch": "^1.0.3",           // Switch component primitives
  "@radix-ui/react-tabs": "^1.0.4",             // Tabs component primitives
  "@radix-ui/react-toast": "^1.1.5",            // Toast notification primitives
  "@radix-ui/react-toggle": "^1.0.3",           // Toggle component primitives
  "@radix-ui/react-toggle-group": "^1.0.4",     // Toggle group primitives
  "@radix-ui/react-tooltip": "^1.0.7",          // Tooltip component primitives
  
  // shadcn/ui Utility Dependencies
  "class-variance-authority": "^0.7.0",          // Component variant management (CVA)
  "clsx": "^2.1.0",                             // Conditional className utility
  "tailwind-merge": "^2.2.0",                  // Tailwind class merging utility
  "cmdk": "^0.2.0",                            // Command palette component
  
  // Icons & Visual Elements (Official for shadcn/ui)
  "lucide-react": "^0.400.0",                  // Icon library (official for shadcn/ui)
  "@tabler/icons-react": "^3.0.0",            // Additional icons (optional)
  
  // Form & Validation Integration
  "react-hook-form": "^7.48.2",               // Form state management
  "@hookform/resolvers": "^3.3.2",            // Form validation resolvers
  "zod": "^3.22.4"                            // Schema validation (integrates with forms)
}
```

### Database & ORM Stack (Latest Prisma with Multi-tenant Support)

```json
{
  "prisma": "^6.5.0",                    // Latest Prisma ORM with enhanced performance
  "@prisma/client": "^6.5.0",           // Prisma client for database operations
  "@prisma/adapter-pg": "^6.5.0",       // PostgreSQL adapter for Prisma
  "pg": "^8.11.3",                      // PostgreSQL client for Node.js
  "@types/pg": "^8.11.0",               // PostgreSQL client type definitions
  "pgvector": "^0.1.8"                  // Vector extension for AI/ML features (optional)
}
```

### Authentication Stack (NextAuth.js 5 Official - Beta Stable)

```json
{
  "next-auth": "^5.0.0-beta.4",         // NextAuth.js v5 (latest stable beta)
  "@auth/prisma-adapter": "^2.0.0",     // Prisma adapter for NextAuth.js 5
  "bcryptjs": "^2.4.3",                 // Password hashing utility
  "@types/bcryptjs": "^2.4.6",          // bcryptjs type definitions
  "jsonwebtoken": "^9.0.2",             // JWT token generation and verification
  "@types/jsonwebtoken": "^9.0.5",      // JWT type definitions
  "jose": "^5.1.3",                     // JWT operations for NextAuth.js 5
  "oauth4webapi": "^2.4.0"              // OAuth 2.0 client library (NextAuth.js 5 dependency)
}
```

### State Management Stack (Official Redux Toolkit)

```json
{
  "@reduxjs/toolkit": "^2.6.1",         // Official Redux Toolkit for state management
  "react-redux": "^9.2.0",              // React bindings for Redux (latest)
  "redux-persist": "^6.0.0",            // State persistence library
  "next-redux-wrapper": "^8.1.0",       // Next.js Redux integration
  "immer": "^10.0.3",                   // Immutable state updates (RTK dependency)
  "reselect": "^5.0.1"                  // Memoized state selectors
}
```

### Real-time Communication Stack (Latest Official Versions)

```json
{
  "socket.io": "^4.8.1",                // WebSocket communication server (latest)
  "socket.io-client": "^4.8.1",         // WebSocket client for browser
  "kafkajs": "^2.2.4",                  // Apache Kafka client for Node.js
  "redis": "^4.6.13",                   // Redis client for caching
  "ioredis": "^5.3.2",                  // Enhanced Redis client with cluster support
  "@socket.io/redis-adapter": "^8.2.1", // Redis adapter for Socket.IO scaling
  "ws": "^8.16.0",                      // WebSocket library (Socket.IO dependency)
  "@types/ws": "^8.5.10"                // WebSocket type definitions
}
```

### AI & Services
```json
{
  "@google/generative-ai": "^0.12.0",
  "@ai-sdk/google": "^0.0.24",
  "imagekit": "^5.2.0",
  "resend": "^3.2.0",
  "stripe": "^14.21.0"
}
```

### Development Tools & Build System (Latest Official)

```json
{
  "eslint": "^8.57.0",                  // Code linting and quality
  "eslint-config-next": "^15.2.3",     // Next.js ESLint configuration
  "@typescript-eslint/eslint-plugin": "^6.21.0", // TypeScript ESLint rules
  "@typescript-eslint/parser": "^6.21.0", // TypeScript ESLint parser
  "prettier": "^3.2.5",                // Code formatting tool
  "prettier-plugin-tailwindcss": "^0.5.11", // Tailwind CSS class sorting
  "husky": "^9.0.11",                  // Git hooks for automation
  "lint-staged": "^15.2.2",            // Pre-commit linting
  "turbo": "^1.12.4",                  // Monorepo build system (optional)
  "@turbo/gen": "^1.12.4",             // Turbo code generation
  "concurrently": "^8.2.2"             // Run multiple npm scripts
}
```

### Testing Framework (Production-Ready Testing)

```json
{
  "jest": "^29.7.0",                           // Testing framework
  "@testing-library/react": "^14.2.1",        // React component testing
  "@testing-library/jest-dom": "^6.4.2",      // Jest DOM matchers
  "@testing-library/user-event": "^14.5.2",   // User interaction testing
  "cypress": "^13.6.6",                       // End-to-end testing
  "@playwright/test": "^1.40.1",              // Alternative E2E testing
  "msw": "^2.0.11",                          // API mocking for tests
  "jest-environment-jsdom": "^29.7.0"         // JSDOM environment for Jest
}
```

### Additional Utility Libraries (Performance & UX)

```json
{
  "date-fns": "^3.0.6",                // Date manipulation library
  "react-intersection-observer": "^9.5.3", // Intersection Observer hook
  "framer-motion": "^10.16.16",        // Animation library (optional)
  "react-hotkeys-hook": "^4.4.1",      // Keyboard shortcuts
  "use-debounce": "^10.0.0",           // Debouncing hooks
  "react-window": "^1.8.8",            // Virtualization for large lists
  "react-query": "^3.39.3",            // Server state management (alternative to RTK Query)
  "@tanstack/react-query": "^5.17.15", // TanStack Query (React Query v5)
  "sharp": "^0.33.1"                   // Image processing (Next.js optimization)
}
```
  "@testing-library/jest-dom": "^6.4.2", // Jest DOM matchers
  "cypress": "^13.6.6"                  // End-to-end testing
}
```

---

## 📋 DETAILED MODULE BREAKDOWN - Critical for GitHub Copilot Understanding

### 1. Students Interlinked (Social Learning Platform) 📱

**Purpose:** Facebook-like social platform specifically designed for educational content and student interaction.

**Route:** `/students-interlinked`

**Core Social Features (Facebook-like Architecture):**

#### 📸 **Stories System** (Instagram/Facebook Stories)
- **Academic Stories:** Share daily academic achievements, study progress, exam preparations
- **Study Session Stories:** Live study sessions, group work, project updates
- **Campus Life Stories:** University events, campus activities, social moments
- **24-Hour Auto-Delete:** Stories automatically expire after 24 hours
- **Story Reactions:** Quick reactions (like, love, wow) and story replies
- **Story Highlights:** Save important academic stories as permanent highlights

#### 📝 **Post System** (Facebook-like Posts)
- **Academic Posts:** Share study materials, research findings, academic discussions
- **Question Posts:** Ask academic questions with community answers
- **Achievement Posts:** Share academic achievements, certifications, project completions
- **Study Group Posts:** Collaborative study materials and group announcements
- **Media Posts:** Images, videos, documents, PDFs with educational content
- **Post Interactions:** Like, comment, share, save functionality with real-time updates

#### 🔥 **Trending System** (What's Popular)
- **Trending Topics:** Most discussed academic subjects and topics
- **Trending Posts:** Most liked, shared, and commented educational content
- **Trending Stories:** Popular academic stories across the platform
- **Trending Study Materials:** Most downloaded and shared study resources
- **Trending Questions:** Most answered and helpful academic questions
- **Trending Students:** Most active and helpful community members

**Technical Implementation:**
```typescript
interface StudentsInterlinkedFeatures {
  stories: {
    creation: "Rich media story creation with text, images, videos",
    viewing: "Instagram-like story viewer with swipe navigation",
    reactions: "Real-time story reactions and replies",
    highlights: "Permanent story collections for academic achievements"
  },
  posts: {
    creation: "Facebook-like post editor with rich media support",
    feed: "Algorithmic feed with educational content prioritization",
    interactions: "Real-time likes, comments, shares with notifications",
    privacy: "Educational-focused privacy controls and visibility settings"
  },
  trending: {
    algorithm: "AI-powered trending detection based on engagement metrics",
    categories: "Trending in different academic subjects and topics",
    realTime: "Live trending updates with Socket.IO",
    personalization: "Personalized trending based on user interests"
  },
  realTime: "Socket.IO for instant social interactions and live updates",
  mediaUpload: "ImageKit for optimized image/video uploads in stories/posts",
  notifications: "Push notifications for social engagement and trending alerts"
}
```

**Key Components:**
- `StoriesSection.tsx` - Instagram-like stories with academic focus
- `CreateStoryModal.tsx` - Story creation with educational templates
- `PostCreator.tsx` - Facebook-like post creation interface
- `SocialFeed.tsx` - Main feed with stories and posts
- `PostCard.tsx` - Individual post display with academic context
- `TrendingSection.tsx` - Trending topics, posts, and content discovery
- `StoryViewer.tsx` - Full-screen story viewing experience

### 2. Edu Matrix Hub (Digital Institution Management Ecosystem) 🏫

**Purpose:** Comprehensive digital transformation platform for thousands of educational institutions worldwide.

**Route:** `/edu-matrix-hub`

**Scale & Critical Understanding:**
- **Multi-Institutional:** Serves 10,000+ schools, colleges, and universities globally
- **Multi-Million Users:** Students, teachers, professors, parents, administrators
- **Complete Digital Transformation:** Replace traditional paper-based systems entirely
- **Real-time Operations:** 24/7 institutional management with instant updates

**Core Features & Architecture:**
```typescript
interface EduMatrixHubEcosystem {
  institutionManagement: {
    registration: "Institution onboarding and verification process",
    profileBuilding: "Custom branding and institutional setup",
    multiTenant: "Schema-per-institution with complete data isolation",
    customization: "Institution-specific workflows and configurations"
  },
  academicOperations: {
    attendance: "Real-time attendance tracking with parent notifications",
    examinations: "AI-powered exam creation and automated grading using Google Gemini",
    courses: "Complete curriculum and course management system",
    grading: "Real-time grade updates with analytics and insights",
    scheduling: "Dynamic class and resource scheduling system"
  },
  communication: {
    parents: "Real-time parent portal with progress monitoring", 
    students: "Student portal with academic access and resources",
    teachers: "Teacher dashboard with class management tools",
    announcements: "Institution-wide communication system"
  },
  analytics: {
    performance: "Student and institutional performance analytics",
    attendance: "Attendance patterns and insights",
    financial: "Fee management and financial tracking",
    compliance: "Regulatory compliance and reporting"
  }
}
```

**RBAC System (Role-Based Access Control):**
```typescript
enum InstitutionalRoles {
  SUPER_ADMIN = "System-wide platform administration",
  INSTITUTION_ADMIN = "Complete institutional control (Principal, President)",
  ACADEMIC_DIRECTOR = "Academic affairs management (Dean, Vice Principal)",
  DEPARTMENT_HEAD = "Department-level management",
  REGISTRAR = "Student records and enrollment management",
  PROFESSOR = "Senior teaching faculty with research access",
  TEACHER = "Primary teaching staff with class management",
  STUDENT = "Academic access and progress tracking",
  PARENT = "Child progress monitoring and communication",
  ADMINISTRATIVE_STAFF = "Administrative functions and support"
}
```

**Key Components:**
- `InstitutionDashboard.tsx` - Main institutional management interface
- `AttendanceTracker.tsx` - Real-time attendance marking and monitoring
- `ExamManager.tsx` - AI-powered examination system
- `ProgressMonitor.tsx` - Student academic progress tracking
- `ParentPortal.tsx` - Real-time parent communication dashboard

### 3. Courses (Course Marketplace & Delivery) 📚

**Purpose:** Comprehensive course creation, delivery, and marketplace platform (Coursera-like functionality).

**Route:** `/courses`

**Key Features:**
- **Course Creation:** Advanced course builder with multimedia content support
- **Video Delivery:** Optimized video streaming with progress tracking
- **Interactive Assessments:** Quizzes, assignments, and automated grading
- **Progress Tracking:** Detailed learning analytics and completion tracking
- **Certification System:** Automated certificate generation and blockchain verification
- **Payment Integration:** Stripe integration for course purchases and subscriptions
- **Instructor Tools:** Comprehensive instructor dashboard and analytics

**Technical Stack:**
```typescript
interface CoursePlatformTech {
  videoDelivery: "ImageKit for video optimization and delivery",
  payments: "Stripe for secure payment processing",
  certificates: "Automated PDF generation with digital signatures",
  analytics: "Advanced learning analytics and insights",
  ai: "Google Gemini for content recommendations and automated assessments"
}
```

### 4. Freelancing (Educational Freelancing Platform) 💼

**Purpose:** Connect students, professionals, and educators with freelance opportunities in the education sector.

**Route:** `/freelancing`

**Core Social Features (Facebook-like Architecture):**

#### 📸 **Stories System** (Freelancer Stories)
- **Project Stories:** Share ongoing project updates, work progress, behind-the-scenes
- **Skill Stories:** Showcase new skills learned, certifications earned, portfolio updates
- **Work Life Stories:** Freelancer lifestyle, workspace setups, productivity tips
- **Client Testimonial Stories:** Share positive feedback and success stories
- **Tutorial Stories:** Quick skill tutorials and educational content for other freelancers

#### 📝 **Post System** (Freelancing Posts)
- **Project Showcase Posts:** Share completed projects with detailed descriptions
- **Gig Promotion Posts:** Promote available services and expertise
- **Learning Posts:** Share educational content, tutorials, industry insights
- **Collaboration Posts:** Seek project partners or team members
- **Success Story Posts:** Share achievements, milestones, and career growth
- **Question Posts:** Ask for advice, feedback, or industry-related questions

#### 🔥 **Trending System** (What's Hot in Freelancing)
- **Trending Skills:** Most in-demand freelancing skills and technologies
- **Trending Projects:** Popular project types and requirements
- **Trending Freelancers:** Top-performing and most active freelancers
- **Trending Clients:** Most active hiring clients and companies
- **Trending Rates:** Popular pricing trends and market insights
- **Trending Categories:** Most popular freelancing categories and niches

**Key Features:**
- **Gig Posting:** Post and manage freelance gigs with educational focus
- **Skill-based Matching:** AI-powered matching algorithm for freelancers and clients
- **Portfolio Showcase:** Professional portfolio builder with educational projects
- **Secure Payments:** Escrow system with milestone-based payments
- **Rating & Reviews:** Comprehensive feedback system for quality assurance
- **Communication Tools:** Real-time messaging and project collaboration

**Technical Implementation:**
```typescript
interface FreelancingPlatformFeatures {
  stories: {
    projectUpdates: "Real-time project progress stories",
    skillShowcase: "Portfolio and skill demonstration stories",
    tutorials: "Quick educational content for freelancers"
  },
  posts: {
    portfolio: "Project showcase posts with rich media",
    gigs: "Service promotion and availability posts",
    community: "Freelancer community discussions and insights"
  },
  trending: {
    skills: "Most demanded skills in the freelancing market",
    projects: "Popular project types and trends",
    freelancers: "Top-rated and most active freelancers"
  },
  realTime: "Socket.IO for instant messaging and project updates",
  payments: "Secure escrow system with milestone tracking"
}
```

### 5. Jobs (Career Portal & Job Marketplace) 🚀

**Purpose:** Career development and job placement platform for students and graduates.

**Route:** `/jobs`

**Core Social Features (Facebook-like Architecture):**

#### 📸 **Stories System** (Career Journey Stories)
- **Job Search Stories:** Share job application progress, interview preparations
- **Interview Stories:** Interview experiences, tips, and success stories
- **Career Growth Stories:** Promotions, new job announcements, career milestones
- **Workplace Stories:** Day-in-the-life at new jobs, company culture insights
- **Skill Development Stories:** Learning new skills, training programs, certifications

#### 📝 **Post System** (Career Posts)
- **Job Success Posts:** Share job offers, career achievements, promotions
- **Industry Insight Posts:** Share knowledge about industries, companies, roles
- **Networking Posts:** Professional networking and connection building
- **Career Advice Posts:** Share tips, experiences, and guidance for job seekers
- **Company Review Posts:** Share experiences about employers and workplace culture
- **Salary Insights Posts:** Anonymous salary sharing and market insights

#### 🔥 **Trending System** (What's Hot in Careers)
- **Trending Jobs:** Most applied and in-demand job positions
- **Trending Companies:** Most popular employers and hiring companies
- **Trending Skills:** Most required skills in job postings
- **Trending Industries:** Fastest-growing and most active sectors
- **Trending Locations:** Most popular job locations and remote opportunities
- **Trending Salaries:** Salary trends and compensation insights

**Key Features:**
- **Job Listings:** Advanced job posting with educational sector focus
- **Application Management:** Complete application tracking system
- **Resume Builder:** AI-powered resume builder with templates
- **Interview Scheduling:** Automated interview coordination system
- **Employer Dashboard:** Comprehensive recruitment management tools
- **Career Guidance:** AI-powered career recommendations and resources

**Technical Implementation:**
```typescript
interface JobsPlatformFeatures {
  stories: {
    careerJourney: "Professional career milestone stories",
    jobSearchTips: "Job hunting and interview preparation stories",
    workplaceInsights: "Company culture and workplace experience stories"
  },
  posts: {
    achievements: "Career success and milestone posts",
    insights: "Industry knowledge and professional advice posts",
    networking: "Professional connection and opportunity posts"
  },
  trending: {
    jobs: "Most applied and popular job openings",
    companies: "Top hiring companies and employers",
    skills: "Most in-demand professional skills"
  },
  realTime: "Socket.IO for instant job alerts and application updates",
  matching: "AI-powered job matching based on skills and preferences"
}
```

### 6. Edu News (Educational News Hub) 📰

**Purpose:** Educational news aggregation, content management, and community discussions.

**Route:** `/edu-news`

**Core Social Features (Facebook-like Architecture):**

#### 📸 **Stories System** (News Stories)
- **Breaking News Stories:** Quick updates on important educational developments
- **Event Coverage Stories:** Live coverage of educational events, conferences
- **Behind-the-Scenes Stories:** Editorial process, newsroom insights, reporting
- **Expert Opinion Stories:** Quick takes from education experts and thought leaders
- **Community Stories:** User-generated news stories and local educational updates

#### 📝 **Post System** (News Posts)
- **News Article Posts:** Full news articles with rich media and detailed content
- **Opinion Posts:** Editorial opinions and analysis on educational topics
- **Discussion Posts:** Community discussions on current educational issues
- **Research Posts:** Share educational research findings and academic studies
- **Event Posts:** Educational events, conferences, webinars announcements
- **Policy Posts:** Educational policy updates and government announcements

#### 🔥 **Trending System** (What's Trending in Education)
- **Trending News:** Most read and shared educational news articles
- **Trending Topics:** Most discussed educational subjects and issues
- **Trending Stories:** Popular news stories across different categories
- **Trending Comments:** Most engaging community discussions
- **Trending Authors:** Most popular news writers and contributors
- **Trending Keywords:** Most searched educational terms and topics

**Key Features:**
- **News Publishing:** Advanced content management system for educational news
- **Category Management:** Organized news categories and filtering
- **Social Sharing:** Integrated sharing with other platform modules
- **Comment System:** Community discussions on educational topics
- **Bookmark System:** Save and organize important news articles

**Technical Implementation:**
```typescript
interface EduNewsPlatformFeatures {
  stories: {
    breakingNews: "Real-time breaking news stories with instant updates",
    liveEvents: "Live event coverage and reporting stories",
    editorial: "Behind-the-scenes editorial and reporting process stories"
  },
  posts: {
    articles: "Full-length news articles with rich media support",
    opinions: "Editorial opinions and expert analysis posts",
    discussions: "Community-driven discussion posts on news topics"
  },
  trending: {
    news: "Most popular and widely read news articles",
    topics: "Trending educational topics and discussions",
    engagement: "Most commented and shared content"
  },
  realTime: "Socket.IO for live news updates and breaking news alerts",
  curation: "AI-powered content curation and personalized news feeds"
}
```

### 7. Community Rooms (Real-time Communication) 💬

**Purpose:** Real-time communication and collaboration platform with advanced features.

**Route:** `/community-room`

**Key Features:**
- **Real-time Chat:** Instant messaging with educational context
- **Voice & Video Calls:** Direct communication between users
- **File Sharing:** Secure document and resource sharing
- **Screen Sharing:** Collaborative learning and presentation tools
- **Room Management:** Create and manage topic-based discussion rooms
- **Moderation Tools:** Advanced moderation for educational environments

**Real-time Architecture:**
```typescript
interface CommunityRoomsTech {
  messaging: "Socket.IO for instant messaging with delivery confirmation",
  voiceCalls: "WebRTC for peer-to-peer voice communication",
  videoCalls: "WebRTC for audio conferencing capabilities",
  fileSharing: "Secure file upload and sharing with ImageKit",
  notifications: "Real-time notification system for all interactions"
}
```

### 8. About & Statistics (Platform Information) 📊

**Purpose:** Platform analytics, statistics, and information dashboard.

**Route:** `/about`

**Key Features:**
- **Real-time Statistics:** Live platform usage and engagement metrics
- **Analytics Dashboard:** Comprehensive analytics for all modules
- **Platform Information:** About the platform, team, and mission
- **Performance Metrics:** System performance and uptime statistics

### 9. Feedback (User Feedback & Survey System) 📝

**Purpose:** Comprehensive feedback collection and survey management system.

**Route:** `/feedback`

**Key Features:**
- **Feedback Forms:** Dynamic form builder for collecting user feedback
- **Survey Management:** Create, distribute, and analyze surveys
- **Analytics Dashboard:** Detailed feedback analytics and insights
- **Response Management:** Organize and respond to user feedback
- **Satisfaction Tracking:** Monitor user satisfaction across all modules

---

## 🏗️ DEVELOPMENT GUIDELINES - Essential for GitHub Copilot

### Component Architecture (shadcn/ui + Tailwind CSS ONLY)

**CRITICAL:** Use ONLY official shadcn/ui components - NO external UI libraries

```typescript
// Standard component pattern using ONLY official shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  // Define all props with proper TypeScript types
}

export default function ComponentName({ className, children, ...props }: ComponentProps) {
  // 1. State management at the top
  const [state, setState] = useState();
  
  // 2. Event handlers
  const handleAction = () => {
    // Handle events
  };

  // 3. Return JSX with proper accessibility
  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle>Component Title</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input-id">Label Text</Label>
          <Input 
            id="input-id" 
            placeholder="Enter value..." 
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <Button 
          onClick={handleAction}
          className="w-full"
          variant="default"
          size="lg"
        >
          Submit Action
        </Button>
      </CardContent>
    </Card>
  );
}
```

### API Route Pattern (Next.js 15 App Router)

```typescript
// app/api/[module]/route.ts - Standard API pattern
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Request validation schema
const requestSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  // Define schema with Zod
});

export async function GET(request: NextRequest) {
  try {
    // 1. Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Extract query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");

    // 3. Database operations
    const data = await prisma.model.findMany({
      skip: (page - 1) * 10,
      take: 10,
      where: { userId: session.user.id }
    });

    // 4. Return response
    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse and validate body
    const body = await request.json();
    const validatedData = requestSchema.parse(body);

    // 3. Database operation
    const result = await prisma.model.create({
      data: {
        ...validatedData,
        userId: session.user.id
      }
    });

    // 4. Return success response
    return NextResponse.json({ data: result, success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors }, 
        { status: 400 }
      );
    }
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
```

### Database Schema Pattern (Prisma Multi-tenant)

```prisma
// prisma/schema.prisma - Multi-tenant pattern
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Core user model with role-based access
model User {
  id            String       @id @default(cuid())
  email         String       @unique
  name          String?
  password      String
  role          Role         @default(USER)
  institutionId String?      // Multi-tenant isolation
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  
  // Relations
  institution   Institution? @relation(fields: [institutionId], references: [id])
  posts         Post[]
  comments      Comment[]
  
  @@map("users")
}

// Institution model for multi-tenant architecture
model Institution {
  id       String  @id @default(cuid())
  name     String
  domain   String  @unique
  settings Json?
  
  // Relations
  users    User[]
  
  @@map("institutions")
}

// Example: Posts for Students Interlinked module
model Post {
  id        String    @id @default(cuid())
  content   String
  imageUrl  String?
  authorId  String
  likes     Int       @default(0)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  
  // Relations
  author    User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  comments  Comment[]
  
  @@map("posts")
}

// Enums
enum Role {
  SUPER_ADMIN
  INSTITUTION_ADMIN
  TEACHER
  STUDENT
  PARENT
  USER
}
```

### Authentication Pattern (NextAuth.js 5 Official)

```typescript
// lib/auth.ts - Official NextAuth.js 5 configuration
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // 1. Validate input
          const { email, password } = loginSchema.parse(credentials);
          
          // 2. Find user in database
          const user = await prisma.user.findUnique({
            where: { email },
            include: { institution: true }
          });

          if (!user) return null;

          // 3. Verify password
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) return null;

          // 4. Return user object
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            institutionId: user.institutionId
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.institutionId = user.institutionId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role;
        session.user.institutionId = token.institutionId;
      }
      return session;
    }
  }
};
```

### Real-time Implementation (Socket.IO + Kafka + Redis)

```typescript
// lib/socket.ts - Socket.IO configuration with Kafka integration
import { Server } from "socket.io";
import { createServer } from "http";
import { Kafka } from "kafkajs";
import Redis from "ioredis";

// Initialize services
const kafka = new Kafka({
  clientId: "edumatrix-app",
  brokers: [process.env.KAFKA_BROKERS || "localhost:9092"]
});

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

// Socket.IO server setup
export function initializeSocketIO(httpServer: any) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXTAUTH_URL,
      methods: ["GET", "POST"]
    },
    transports: ["websocket", "polling"]
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      // Verify JWT token here
      next();
    } catch (error) {
      next(new Error("Authentication failed"));
    }
  });

  // Connection handling
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join user to their rooms based on role and institution
    socket.on("join-rooms", async (data) => {
      const { userId, institutionId, role } = data;
      
      // Join institution-specific rooms
      if (institutionId) {
        socket.join(`institution:${institutionId}`);
      }
      
      // Join role-specific rooms
      socket.join(`role:${role}`);
      socket.join(`user:${userId}`);
    });

    // Handle module-specific events
    socket.on("students-interlinked:new-post", async (data) => {
      // Broadcast to institution members
      socket.to(`institution:${data.institutionId}`).emit("new-post", data);
      
      // Send to Kafka for persistence
      await publishToKafka("students-interlinked-posts", data);
    });

    socket.on("edu-matrix-hub:attendance-update", async (data) => {
      // Notify parents and administrators
      socket.to(`institution:${data.institutionId}`).emit("attendance-update", data);
      
      // Send to Kafka
      await publishToKafka("attendance-updates", data);
    });

    socket.on("community-room:message", async (data) => {
      // Real-time chat
      socket.to(`room:${data.roomId}`).emit("new-message", data);
      
      // Persist to Kafka
      await publishToKafka("chat-messages", data);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}

// Kafka publisher function
async function publishToKafka(topic: string, message: any) {
  const producer = kafka.producer();
  await producer.connect();
  
  await producer.send({
    topic,
    messages: [{
      key: message.id || Date.now().toString(),
      value: JSON.stringify(message),
      timestamp: Date.now().toString()
    }]
  });
  
  await producer.disconnect();
}

// Hook for client-side Socket.IO usage
export function useSocket() {
  useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      
      // Join user-specific rooms
      socket.emit("join-rooms", {
        userId: session?.user?.id,
        institutionId: session?.user?.institutionId,
        role: session?.user?.role
      });
    });

    // Listen for real-time events
    socket.on("new-post", (data) => {
      // Handle new post notification
    });

    socket.on("attendance-update", (data) => {
      // Handle attendance update
    });

    socket.on("new-message", (data) => {
      // Handle new chat message
    });

    return () => socket.disconnect();
  }, []);
}
```

### Redux Toolkit State Management

```typescript
// lib/redux/store.ts - Redux Toolkit configuration
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import slices
import authSlice from "./slices/authSlice";
import studentsInterlinkedSlice from "./slices/studentsInterlinkedSlice";
import eduMatrixHubSlice from "./slices/eduMatrixHubSlice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"] // Only persist auth state
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    studentsInterlinked: studentsInterlinkedSlice,
    eduMatrixHub: eduMatrixHubSlice,
    // Add other module slices
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      }
    })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---## 🚀 DEPLOYMENT & INFRASTRUCTURE - Docker Container Architecture

### Complete Docker Container Setup (PostgreSQL + Redis + Kafka + Socket.IO)

All infrastructure services run in official Docker containers for consistent, isolated, and scalable deployment:

#### 🐳 Docker Container Services:
- **PostgreSQL 16** (postgres:16-alpine) - Primary database with multi-tenant support
- **Redis 7** (redis:7-alpine) - Caching layer + Socket.IO adapter for scaling
- **Apache Kafka** (confluentinc/cp-kafka:7.5.0) - Message broker for real-time events
- **Next.js App** (Custom Dockerfile) - Application server with integrated Socket.IO
- **All services** networked via `edumatrix-network` with persistent volumes

#### 🔗 Container Network Architecture:
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js App  │───▶│   PostgreSQL     │    │     Redis       │
│  + Socket.IO    │    │   (Database)     │    │   (Caching)     │
│   Container     │    │   Container      │    │   Container     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                                              ▲
         │              ┌─────────────────┐             │
         └─────────────▶│  Apache Kafka   │─────────────┘
                        │  (Messaging)    │
                        │   Container     │
                        └─────────────────┘
```

```yaml
# docker-compose.yml - Complete Docker container orchestration
# All services (PostgreSQL, Redis, Kafka, Socket.IO) run in isolated containers
version: "3.8"

services:
  # Next.js Application Container with integrated Socket.IO server
  edumatrix-app:
    container_name: edumatrix-nextjs-app
    build: 
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      # Database connections to PostgreSQL container
      - DATABASE_URL=postgresql://postgres:password@edumatrix-postgres:5432/edumatrix
      - DATABASE_DIRECT_URL=postgresql://postgres:password@edumatrix-postgres:5432/edumatrix
      
      # Redis & Kafka container connections
      - REDIS_URL=redis://edumatrix-redis:6379
      - KAFKA_BROKERS=edumatrix-kafka:9092
      
      # Authentication
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
        # External services
      - GOOGLE_AI_API_KEY=${GOOGLE_AI_API_KEY}
      - IMAGEKIT_PUBLIC_KEY=${IMAGEKIT_PUBLIC_KEY}
      - IMAGEKIT_PRIVATE_KEY=${IMAGEKIT_PRIVATE_KEY}
      - IMAGEKIT_URL_ENDPOINT=${IMAGEKIT_URL_ENDPOINT}
      - RESEND_API_KEY=${RESEND_API_KEY}
      
      # Real-time configuration
      - SOCKET_IO_ADAPTER=redis
      - SOCKET_IO_REDIS_URL=redis://edumatrix-redis:6379
      
      # Multi-tenant & RBAC
      - RBAC_ENABLED=true
      - TENANT_ISOLATION=true
      - ROW_LEVEL_SECURITY=enabled
    depends_on:
      - edumatrix-postgres
      - edumatrix-redis
      - edumatrix-kafka
    restart: unless-stopped
    networks:
      - edumatrix-network
  # PostgreSQL 16 Container - Official Alpine image with multi-tenant support
  edumatrix-postgres:
    container_name: edumatrix-postgres-db
    image: postgres:16-alpine  # Official PostgreSQL Docker image
    environment:
      POSTGRES_DB: edumatrix
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_INITDB_ARGS: "--auth-host=md5"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./sql/init-multi-tenant.sql:/docker-entrypoint-initdb.d/01-init.sql
    ports:
      - "5432:5432"
    restart: unless-stopped
    networks:
      - edumatrix-network
    command: |
      postgres 
      -c shared_preload_libraries=pg_stat_statements
      -c max_connections=200
      -c shared_buffers=256MB
      -c effective_cache_size=1GB
  # Redis 7 Container - Official Alpine image for caching and Socket.IO scaling
  edumatrix-redis:
    container_name: edumatrix-redis-cache
    image: redis:7-alpine  # Official Redis Docker image
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
      - ./redis/redis.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    restart: unless-stopped
    networks:
      - edumatrix-network
    sysctls:
      - net.core.somaxconn=1024
  # Apache Kafka 4.0 Container - Official Confluent image with KRaft (No Zookeeper needed)
  edumatrix-kafka:
    container_name: edumatrix-kafka-broker
    image: confluentinc/cp-kafka:7.5.0  # Official Confluent Kafka Docker image
    ports:
      - "9092:9092"
      - "9094:9094"
    environment:
      # KRaft mode configuration (Kafka 4.0 - no Zookeeper)
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://edumatrix-kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENERS: PLAINTEXT://edumatrix-kafka:29092,CONTROLLER://edumatrix-kafka:29093,PLAINTEXT_HOST://0.0.0.0:9092
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@edumatrix-kafka:29093
      KAFKA_LOG_DIRS: /tmp/kraft-combined-logs
      
      # Performance optimization
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: true
      KAFKA_NUM_PARTITIONS: 3
      KAFKA_DEFAULT_REPLICATION_FACTOR: 1
    volumes:
      - kafka_data:/tmp/kraft-combined-logs
    restart: unless-stopped
    networks:
      - edumatrix-network
    healthcheck:
      test: ["CMD-SHELL", "kafka-broker-api-versions --bootstrap-server localhost:9092"]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  postgres_data:
    name: edumatrix_postgres_data
    driver: local
  redis_data:
    name: edumatrix_redis_data
    driver: local
  kafka_data:
    name: edumatrix_kafka_data
    driver: local

networks:
  edumatrix-network:
    name: edumatrix_network
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

### Dockerfile (Optimized for Production)

```dockerfile
# Dockerfile - Multi-stage build for optimal performance
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Environment Variables for Docker Container Communication (.env.production)

```env
# PostgreSQL Container Database Configuration
DATABASE_URL="postgresql://postgres:password@edumatrix-postgres:5432/edumatrix"
DATABASE_DIRECT_URL="postgresql://postgres:password@edumatrix-postgres:5432/edumatrix"

# Redis Container Configuration (Caching + Socket.IO)
REDIS_URL="redis://edumatrix-redis:6379"
REDIS_PASSWORD=""

# Kafka Container Configuration (KRaft mode - no Zookeeper)
KAFKA_BROKERS="edumatrix-kafka:9092"
KAFKA_CLIENT_ID="edumatrix-app"

# NextAuth.js Configuration
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-super-secret-key-32-characters-long"

# Google AI Configuration
GOOGLE_AI_API_KEY="your-google-ai-api-key"
GOOGLE_AI_PROJECT_ID="your-project-id"

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY="public_your-imagekit-public-key"
IMAGEKIT_PRIVATE_KEY="private_your-imagekit-private-key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-imagekit-id"

# Email Configuration (Resend)
RESEND_API_KEY="re_your-resend-api-key"

# Payment Configuration (Stripe)
STRIPE_PUBLIC_KEY="pk_live_your-stripe-public-key"
STRIPE_SECRET_KEY="sk_live_your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="whsec_your-stripe-webhook-secret"

# Real-time Configuration (Socket.IO with Redis container adapter)
SOCKET_IO_ADAPTER="redis"
SOCKET_IO_REDIS_URL="redis://edumatrix-redis:6379"

# Multi-tenant & Security Configuration
RBAC_ENABLED="true"
TENANT_ISOLATION="true"
ROW_LEVEL_SECURITY="enabled"
DEFAULT_ROLE="STUDENT"
SUPER_ADMIN_EMAIL="admin@edumatrix.com"

# Performance & Monitoring
NODE_ENV="production"
NEXT_TELEMETRY_DISABLED="1"
LOG_LEVEL="info"
ENABLE_METRICS="true"
```

### Docker Container Deployment Commands

```bash
# Complete Docker container orchestration workflow
# 1. Clone repository
git clone https://github.com/your-username/edu-matrix-interlinked.git
cd edu-matrix-interlinked

# 2. Set up environment variables for container communication
cp .env.example .env.production
# Edit .env.production with container connection strings

# 3. Build and start all Docker containers (PostgreSQL + Redis + Kafka + App)
docker-compose -f docker-compose.yml up -d --build

# 4. Run database migrations in PostgreSQL container
docker-compose exec edumatrix-app npx prisma migrate deploy

# 5. Seed initial data in PostgreSQL container (optional)
docker-compose exec edumatrix-app npx prisma db seed

# 6. Verify all containers are running and healthy
docker-compose ps
docker-compose logs -f edumatrix-app
```

### Docker Container Monitoring & Health Checks

```bash
# Check individual container health status
docker-compose exec edumatrix-postgres pg_isready -U postgres -d edumatrix
docker-compose exec edumatrix-redis redis-cli ping
docker-compose exec edumatrix-kafka kafka-broker-api-versions --bootstrap-server localhost:9092

# Monitor container logs in real-time
docker-compose logs -f edumatrix-app       # Next.js + Socket.IO logs
docker-compose logs -f edumatrix-postgres  # PostgreSQL container logs
docker-compose logs -f edumatrix-redis     # Redis container logs  
docker-compose logs -f edumatrix-kafka     # Kafka container logs

# Container performance monitoring
docker stats                              # Resource usage per container
docker-compose top                         # Process list in all containers
```

### 🐳 Docker Container Architecture Summary

#### Container Service Details:

| **Container** | **Image** | **Purpose** | **Port** | **Volume** |
|---------------|-----------|-------------|----------|------------|
| `edumatrix-nextjs-app` | Custom Dockerfile | Next.js + Socket.IO Server | 3000 | - |
| `edumatrix-postgres-db` | postgres:16-alpine | Primary Database (Multi-tenant) | 5432 | postgres_data |
| `edumatrix-redis-cache` | redis:7-alpine | Caching + Socket.IO Adapter | 6379 | redis_data |
| `edumatrix-kafka-broker` | confluentinc/cp-kafka:7.5.0 | Message Broker (KRaft mode) | 9092 | kafka_data |

#### Inter-Container Communication:
- **Network**: `edumatrix_network` (bridge driver, subnet: 172.20.0.0/16)
- **Service Discovery**: Internal DNS resolution (container_name → IP)
- **Dependencies**: App container depends on PostgreSQL, Redis, and Kafka
- **Health Checks**: All containers have health monitoring configured

#### Container Data Persistence:
- **PostgreSQL**: Multi-tenant database schemas with persistent volume
- **Redis**: Cache data + Socket.IO session storage with persistence
- **Kafka**: Event logs and message queues with persistent storage
- **App**: Stateless container (data stored in database containers)

#### Docker Container Startup Sequence:
1. **PostgreSQL Container** starts first (database foundation)
2. **Redis Container** starts second (caching layer)
3. **Kafka Container** starts third (messaging infrastructure)
4. **Next.js App Container** starts last (depends on all services)

#### Container Environment Variables for Inter-Service Communication:
```env
# PostgreSQL Container Connection
DATABASE_URL=postgresql://postgres:password@edumatrix-postgres:5432/edumatrix

# Redis Container Connection  
REDIS_URL=redis://edumatrix-redis:6379
SOCKET_IO_REDIS_URL=redis://edumatrix-redis:6379

# Kafka Container Connection
KAFKA_BROKERS=edumatrix-kafka:9092
```

### 📋 Docker Container Quick Reference

#### Essential Container Commands:
```bash
# Start all containers
docker-compose up -d

# Stop all containers  
docker-compose down

# Rebuild and restart containers
docker-compose up -d --build

# View container status
docker-compose ps

# Access container shell
docker-compose exec edumatrix-postgres psql -U postgres -d edumatrix
docker-compose exec edumatrix-redis redis-cli
docker-compose exec edumatrix-app /bin/sh
```

#### Container Network Information:
- **Network Name**: `edumatrix_network`
- **PostgreSQL**: `edumatrix-postgres:5432` (internal)
- **Redis**: `edumatrix-redis:6379` (internal)  
- **Kafka**: `edumatrix-kafka:9092` (internal)
- **App**: `localhost:3000` (external)

#### Container Data Volumes:
- **postgres_data**: PostgreSQL database files
- **redis_data**: Redis cache and persistence files
- **kafka_data**: Kafka topic and log files

---

## 🏗️ TECHNICAL ARCHITECTURE - Multi-Service Container Ecosystem

```yaml
# docker-compose.scale.yml - Horizontal scaling
version: "3.8"

services:
  edumatrix-app:
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3

  edumatrix-postgres:
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '1.0'
          memory: 1G

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - edumatrix-app
    networks:
      - edumatrix-network
```

---

## 🤖 GITHUB COPILOT QUICK REFERENCE - Essential Commands & Patterns

### Critical Development Commands

```bash
# Project setup and development
pnpm install                    # Install all dependencies
pnpm run dev                   # Start development server (Next.js + Socket.IO)
pnpm run build                 # Build for production with Turbopack
pnpm run start                 # Start production server
pnpm run lint                  # Run ESLint code quality checks
pnpm run type-check            # TypeScript type checking

# Database operations (Prisma)
npx prisma generate            # Generate Prisma client after schema changes
npx prisma migrate dev         # Create and apply new migration
npx prisma migrate deploy      # Deploy migrations to production
npx prisma studio             # Open Prisma Studio database GUI
npx prisma db seed            # Seed database with initial data
npx prisma db reset           # Reset database (development only)

# shadcn/ui component management (CRITICAL)
npx shadcn-ui@latest init     # Initialize shadcn/ui in project
npx shadcn-ui@latest add button card input dialog toast  # Add core components
npx shadcn-ui@latest add form select textarea switch     # Add form components
npx shadcn-ui@latest add tabs dropdown-menu avatar      # Add navigation components

# Docker operations
docker-compose up -d          # Start all services in background
docker-compose down           # Stop all services
docker-compose logs -f app    # Follow application logs
docker-compose exec app bash  # Access container shell
```

### Essential File Patterns (What Copilot Should Know)

```typescript
// 1. Page Components (app/[module]/page.tsx)
interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ModulePage({ params, searchParams }: PageProps) {
  return (
    <div className="container mx-auto p-6">
      {/* Page content using shadcn/ui components */}
    </div>
  );
}

// 2. API Routes (app/api/[module]/route.ts)
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // API logic
}

// 3. Components (components/[module]/ComponentName.tsx)
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ComponentName({ className, children }: ComponentProps) {
  return (
    <Card className={cn("w-full", className)}>
      {children}
    </Card>
  );
}

// 4. Types (types/[module].ts)
export interface ModuleData {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### shadcn/ui Component Usage (MANDATORY PATTERN)

```typescript
// ALWAYS use these official shadcn/ui imports - NO external libraries
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Toast, useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Common UI patterns for all 9 modules:
function ExampleComponent() {
  const { toast } = useToast();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Form Title</CardTitle>
        <CardDescription>Form description</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Input Label</Label>
          <Input id="input" placeholder="Enter value..." />
        </div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => toast({ title: "Success", description: "Action completed" })}
          className="w-full"
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Module-Specific Routing (Next.js 15 App Router)

```typescript
// File structure for routing
app/
├── students-interlinked/
│   ├── page.tsx                    // /students-interlinked
│   ├── profile/[id]/page.tsx       // /students-interlinked/profile/123
│   ├── stories/page.tsx            // /students-interlinked/stories
│   └── trending/page.tsx           // /students-interlinked/trending
├── edu-matrix-hub/
│   ├── page.tsx                    // /edu-matrix-hub
│   ├── institutions/
│   │   ├── page.tsx                // /edu-matrix-hub/institutions
│   │   └── [id]/page.tsx          // /edu-matrix-hub/institutions/123
│   ├── attendance/page.tsx         // /edu-matrix-hub/attendance
│   └── exams/page.tsx             // /edu-matrix-hub/exams
├── courses/
│   ├── page.tsx                    // /courses
│   ├── [courseId]/page.tsx        // /courses/123
│   └── create/page.tsx            // /courses/create
// ... other modules follow same pattern
```

### Authentication Integration (NextAuth.js 5)

```typescript
// Server components (can directly access session)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth/signin");
  }

  return <div>Protected content for {session.user.email}</div>;
}

// Client components (use useSession hook)
"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ClientProtectedComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") redirect("/auth/signin");

  return <div>Client protected content</div>;
}
```

### Real-time Socket.IO Usage

```typescript
// Client-side hook for real-time features
"use client";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

export function useRealTimeConnection() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const socket: Socket = io();

    socket.on("connect", () => {
      // Join user-specific rooms
      socket.emit("join-rooms", {
        userId: session.user.id,
        institutionId: session.user.institutionId,
        role: session.user.role
      });
    });

    // Module-specific event listeners
    socket.on("students-interlinked:new-post", (data) => {
      // Handle new post in social feed
    });

    socket.on("edu-matrix-hub:attendance-update", (data) => {
      // Handle real-time attendance updates
    });

    socket.on("community-room:new-message", (data) => {
      // Handle real-time chat messages
    });

    return () => socket.disconnect();
  }, [session]);
}
```

### Database Operations (Prisma Pattern)

```typescript
// Standard CRUD operations with multi-tenant support
import { prisma } from "@/lib/prisma";

// Create with tenant isolation
export async function createPost(data: CreatePostData, userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { institutionId: true }
  });

  return await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
      institutionId: user?.institutionId // Tenant isolation
    }
  });
}

// Read with role-based filtering
export async function getPosts(userId: string, role: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { institutionId: true }
  });

  return await prisma.post.findMany({
    where: {
      institutionId: user?.institutionId, // Tenant filtering
      // Additional role-based filtering
    },
    include: {
      author: { select: { name: true, email: true } },
      comments: true,
      _count: { select: { likes: true } }
    },
    orderBy: { createdAt: "desc" }
  });
}
```

### Error Handling Pattern

```typescript
// Standard error handling across all modules
import { z } from "zod";

export async function apiHandler(request: NextRequest) {
  try {
    // 1. Authentication check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Input validation
    const body = await request.json();
    const validatedData = schema.parse(body);

    // 3. Business logic
    const result = await businessLogic(validatedData);

    // 4. Success response
    return NextResponse.json({ data: result, success: true });
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Key Naming Conventions

```typescript
// File naming
- Components: PascalCase (e.g., StudentDashboard.tsx)
- Pages: lowercase (e.g., student-profile/page.tsx)
- API routes: lowercase (e.g., api/students/route.ts)
- Types: PascalCase (e.g., StudentProfile.ts)
- Utilities: camelCase (e.g., formatDate.ts)

// Variable naming
- React components: PascalCase (const StudentCard = () => {})
- Functions: camelCase (const handleSubmit = () => {})
- Constants: UPPER_SNAKE_CASE (const API_BASE_URL = "")
- Interfaces: PascalCase with "I" prefix or descriptive names
- Enums: PascalCase (enum UserRole {})
```

### Environment Variables Reference

```bash
# Essential environment variables that Copilot should know about
DATABASE_URL                    # PostgreSQL connection string
NEXTAUTH_URL                   # Application URL for authentication
NEXTAUTH_SECRET                # Secret key for NextAuth.js
GOOGLE_AI_API_KEY                 # Google AI API key for AI features
REDIS_URL                      # Redis connection for caching
KAFKA_BROKERS                  # Kafka brokers for real-time events
IMAGEKIT_PUBLIC_KEY            # ImageKit for media optimization
RESEND_API_KEY                 # Email service for notifications
```

**REMEMBER: This is a multi-tenant educational platform with 9 microservice modules. Always use official shadcn/ui components, follow Next.js 15 App Router patterns, and implement proper multi-tenant data isolation in all database operations.**

---

## 📊 PROJECT STATUS & PHASE TRACKING

### Current Development Status

```typescript
interface ProjectStatus {
  phase: "Active Development",
  version: "2.1.0",
  lastUpdated: "2025-01-28",
  
  completed: [
    "✅ Core infrastructure (Next.js 15 + TypeScript + Prisma)",
    "✅ Authentication system (NextAuth.js 5)",
    "✅ Database schema design (Multi-tenant)",
    "✅ UI foundation (shadcn/ui components)",
    "✅ Real-time architecture planning (Socket.IO + Kafka)",
    "✅ Docker environment setup"
  ],
  
  inProgress: [
    "🚧 Students Interlinked module (Social platform)",
    "🚧 Basic component library expansion",
    "🚧 API route implementations"
  ],
  
  planned: [
    "📋 Edu Matrix Hub (Institution management)",
    "📋 Courses platform (Marketplace)",
    "📋 All remaining modules (Freelancing, Jobs, News, Community, About, Feedback)",
    "📋 Production deployment",
    "📋 Mobile app development"
  ]
}
```

### Success Metrics & Goals

- **Technical Excellence:** Sub-2s page loads, 99.9% uptime, zero critical vulnerabilities
- **User Adoption:** Target 1M+ users across 1,000+ institutions in first year
- **Business Impact:** Complete digital transformation for educational institutions
- **Innovation:** AI-powered educational features with real-time collaboration

---

**🎓 EDU Matrix Interlinked represents the future of digital education - combining social learning, institutional management, and career development into one comprehensive, scalable, and secure ecosystem. Every component is built with official, latest packages following modern development practices for enterprise-grade quality.**

**Last Updated:** January 28, 2025  
**Document Version:** 3.0.0  
**GitHub Repository:** https://github.com/Mustansar739/edu-matrix-interlinked-latest  
**Development Status:** Active Development

  courses: {
    id: string;
    title: string;
    content: CourseContent[];
    tenantId: string;
  };

  posts: {
    id: string;
    content: string;
    authorId: string;
    likes: number;
    comments: Comment[];
  };
}
```

### Role-Based Access Control (RBAC) - Multi-Tenant Security

```typescript
// RBAC System for Docker-deployed Multi-tenant Platform
enum Role {
  SUPER_ADMIN = "SUPER_ADMIN", // EDU Matrix Interlinked system admin
  INSTITUTION_ADMIN = "INSTITUTION_ADMIN", // Institution-level administration
  TEACHER = "TEACHER", // Course and classroom management
  STUDENT = "STUDENT", // Learning and assignment access
  USER = "USER", // General platform access
  GUEST = "GUEST", // Limited read-only access
  PARENT = "PARENT", // Student progress monitoring
}

interface Permission {
  resource: string; // Database table or API endpoint
  action: "CREATE" | "READ" | "UPDATE" | "DELETE";
  condition?: string; // Tenant isolation conditions
}

// Docker Environment RBAC Configuration
interface RolePermissions {
  [Role.SUPER_ADMIN]: {
    // Full system access across all Docker containers
    scope: "GLOBAL";
    containers: ["edumatrix-postgres", "edumatrix-redis", "edumatrix-kafka"];
    databases: "ALL_TENANTS";
  };
  [Role.INSTITUTION_ADMIN]: {
    // Institution-specific tenant access
    scope: "TENANT";
    databases: "SINGLE_TENANT";
    modules: "ALL_MODULES";
  };
  [Role.TEACHER]: {
    // Module-specific access within tenant
    scope: "MODULE";
    modules: ["edu-matrix-hub", "courses", "community-room"];
  };
  [Role.STUDENT]: {
    // Read-access with limited write permissions
    scope: "USER";
    modules: ["students-interlinked", "courses", "community-room"];
  };
}
```

---

## 🔄 REAL-TIME ARCHITECTURE

### Event-Driven System

```typescript
interface EventSystem {
  kafka: {
    topics: [
      "notifications",
      "chat-messages",
      "attendance-updates",
      "exam-results",
      "social-interactions"
    ];
    partitioning: "By tenant";
    retention: "7 days";
  };
  websocket: {
    implementation: "Socket.IO integrated within Next.js app";
    infrastructure: "Same Docker setup with Kafka/Redis/PostgreSQL";
    scaling: "Redis adapter";
    clustering: "Multi-instance support";
  };
}
```

### Notification System

- Real-time push notifications
- Email notifications via Resend
- In-app notification center
- Customizable notification preferences
- Batch processing for efficiency

---

## 🔌 SOCKET.IO IMPLEMENTATION PLAN

### Architecture Decision

**Socket.IO Only** - No separate WebSocket implementation needed

- Socket.IO handles WebSocket connections + fallbacks automatically
- Integrated within Next.js app (not standalone server)
- Connects with Kafka for event streaming and Redis for scaling

### Implementation Strategy

```typescript
// Socket.IO Server Setup (integrated in Next.js)
// /lib/socket.ts
import { Server } from "socket.io";
import { createServer } from "http";

// Socket.IO handles:
// ✅ WebSocket connections
// ✅ Fallback to polling if needed
// ✅ Connection management
// ✅ Room management for multi-tenant
// ✅ Event broadcasting
```

### Real-time Features Using Socket.IO

1. **Students Interlinked**: Live posts, comments, likes, stories
2. **Edu Matrix Hub**: Real-time attendance, live classes, notifications
3. **Courses**: Live video streaming, chat during lessons
4. **Community Rooms**: Real-time messaging and collaboration
5. **Global**: System notifications, user status updates

### Benefits of Socket.IO Over Raw WebSocket

- **Auto-fallbacks**: Handles connection issues gracefully
- **Room management**: Perfect for multi-tenant architecture
- **Event system**: Clean event-based communication
- **Broadcasting**: Easy to send to specific users/groups
- **Reconnection**: Automatic reconnection handling
- **Cross-browser**: Better compatibility than raw WebSocket

````

---

## 🎯 IMPLEMENTATION PHASES

### Phase 1: Core Infrastructure ✅
- [x] Next.js 15 setup with App Router
- [x] TypeScript configuration
- [x] Database setup with Prisma
- [x] Authentication with NextAuth.js
- [x] Basic UI components with Tailwind CSS

### Phase 2: Students Interlinked (In Progress) 🚧
- [x] Social feed implementation
- [x] Post creation and interaction
- [x] Stories system
- [ ] Real-time notifications
- [ ] Advanced search functionality

### Phase 3: Edu Matrix Hub (Planned) 📋
- [ ] Multi-tenant architecture implementation
- [ ] Institution onboarding system
- [ ] Attendance tracking system
- [ ] AI-powered exam grading
- [ ] Course management system

### Phase 4: Supporting Modules (Planned) 📋
- [ ] Courses platform
- [ ] Freelancing system
- [ ] Jobs portal
- [ ] News hub
- [ ] Community rooms

### Phase 5: Advanced Features (Future) 🔮
- [ ] PWA implementation
- [ ] Offline functionality
- [ ] Mobile app development
- [ ] AI chatbot integration
- [ ] Advanced analytics

---

## 🔒 SECURITY & COMPLIANCE

### Security Measures
- **Authentication:** JWT-based with NextAuth.js
- **Authorization:** Role-based access control (RBAC)
- **Data Protection:** Bcrypt password hashing
- **Input Validation:** Zod schema validation
- **API Security:** Rate limiting and request validation
- **Data Encryption:** In-transit and at-rest encryption

### Compliance Standards
- GDPR compliance for European users
- CCPA compliance for California users
- Educational data privacy (FERPA)
- Security monitoring and audit trails

---

## 📈 PERFORMANCE & SCALING

### Optimization Strategies
```typescript
interface PerformanceStrategy {
  frontend: {
    rendering: "Server Components + ISR";
    bundling: "Turbopack optimization";
    images: "Next.js Image optimization";
  };

  backend: {
    database: "Connection pooling + query optimization";
    caching: "Redis for sessions and queries";
    api: "GraphQL + REST hybrid";
    cdn: "Global content delivery";
  };

  scaling: {
    horizontal: "Container orchestration";
    database: "Read replicas + sharding";
    realtime: "Kafka partitioning";
    monitoring: "Prometheus + Grafana";
  };
}
```

### Monitoring & Analytics

- **Application Performance:** Real-time monitoring
- **User Analytics:** Behavior tracking and insights
- **System Metrics:** Resource utilization monitoring
- **Error Tracking:** Comprehensive error logging
- **Business Intelligence:** Custom dashboards and reports

---

## 🚀 DEPLOYMENT ARCHITECTURE - 100% OFFICIAL DOCKER SETUP

### Real-time Docker Configuration with RBAC (Official Images Only)

```yaml
# docker-compose.yml - Official configurations for real-time platform with RBAC
version: "3.8"

services:
  # Next.js App with integrated Socket.IO and RBAC
  edumatrix-app:
    container_name: edumatrix-nextjs-app
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@edumatrix-postgres:5432/edumatrix
      - REDIS_URL=redis://edumatrix-redis:6379
      - KAFKA_BROKERS=edumatrix-kafka:9092
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      # RBAC Configuration
      - RBAC_ENABLED=true
      - SUPER_ADMIN_EMAIL=${SUPER_ADMIN_EMAIL}
      - TENANT_ISOLATION=true
      - ROLE_CACHE_TTL=3600
    depends_on:
      - edumatrix-postgres
      - edumatrix-redis
      - edumatrix-kafka
    networks:
      - edumatrix-network

  # PostgreSQL 16 - Official image
  edumatrix-postgres:
    container_name: edumatrix-postgres-db
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: edumatrix
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      # Row-level security enabled
      POSTGRES_INITDB_ARGS: "--auth-host=md5"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./sql/rbac-init.sql:/docker-entrypoint-initdb.d/01-rbac-setup.sql
      - ./sql/tenant-isolation.sql:/docker-entrypoint-initdb.d/02-tenant-setup.sql
    ports:
      - "5432:5432"
    networks:
      - edumatrix-network

  # Redis 7 - Official image for caching and Socket.IO scaling
  edumatrix-redis:
    container_name: edumatrix-redis-cache
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    environment:
      # RBAC session management
      REDIS_PASSWORD: ${REDIS_PASSWORD}
    command: >
      redis-server 
      --appendonly yes 
      --maxmemory 256mb 
      --maxmemory-policy allkeys-lru
      --requirepass ${REDIS_PASSWORD}
    networks:
      - edumatrix-network

  # Apache Kafka 4.0 - Official Confluent image (NO Zookeeper required)
  edumatrix-kafka:
    container_name: edumatrix-kafka-broker
    image: confluentinc/cp-kafka:7.5.0
    ports:
      - "9092:9092"
      - "9094:9094"
    environment:
      # Kafka 4.0 KRaft mode (no Zookeeper)
      KAFKA_NODE_ID: 1
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: "CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT"
      KAFKA_ADVERTISED_LISTENERS: "PLAINTEXT://edumatrix-kafka:29092,PLAINTEXT_HOST://localhost:9092"
      KAFKA_LISTENERS: "PLAINTEXT://edumatrix-kafka:29092,CONTROLLER://edumatrix-kafka:29093,PLAINTEXT_HOST://0.0.0.0:9092"
      KAFKA_INTER_BROKER_LISTENER_NAME: "PLAINTEXT"
      KAFKA_CONTROLLER_LISTENER_NAMES: "CONTROLLER"
      KAFKA_CONTROLLER_QUORUM_VOTERS: "1@edumatrix-kafka:29093"
      KAFKA_PROCESS_ROLES: "broker,controller"
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 0
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: "true"
      KAFKA_LOG_DIRS: "/tmp/kraft-combined-logs"
    volumes:
      - kafka_data:/tmp/kraft-combined-logs
    networks:
      - edumatrix-network

volumes:
  postgres_data:
    name: edumatrix_postgres_data
  redis_data:
    name: edumatrix_redis_data
  kafka_data:
    name: edumatrix_kafka_data

networks:
  edumatrix-network:
    name: edumatrix_network
    driver: bridge
```

### Real-time Data Flow (100% Official Setup)

```typescript
// How real-time features work with official Docker services:

1. **Socket.IO (edumatrix-nextjs-app container)**
   ├── Handles WebSocket connections from clients
   ├── Uses Redis adapter for multi-instance scaling
   ├── Connects to edumatrix-redis:6379
   └── Publishes events to Kafka topics on edumatrix-kafka:9092

2. **Kafka Container (edumatrix-kafka-broker) - NO Zookeeper**
   ├── KRaft mode (Kafka 4.0 native consensus)
   ├── Receives events from Socket.IO
   ├── Distributes to subscribers across modules
   ├── Auto-creates topics for each module
   └── Handles event streaming between microservices

3. **Redis Container (edumatrix-redis-cache)**
   ├── Socket.IO session storage and scaling
   ├── Caching for fast data access
   ├── Pub/Sub for real-time notifications
   └── Memory optimization with LRU policy

4. **PostgreSQL Container (edumatrix-postgres-db)**
   ├── Multi-tenant data storage
   ├── Database triggers for real-time events
   ├── Prisma ORM integration
   └── Automatic schema initialization
```

### Server Communication Flow

```
Client Browser
    ↓ WebSocket
edumatrix-nextjs-app:3000 (Socket.IO)
    ↓ Event Publishing
edumatrix-kafka:9092 (KRaft Mode - No Zookeeper)
    ↓ Event Distribution
All 9 Module Subscribers
    ↓ Data Persistence
edumatrix-postgres:5432
    ↓ Caching Layer
edumatrix-redis:6379
```

### Environment Variables for Docker

```env
# Database Connection
DATABASE_URL="postgresql://postgres:password@edumatrix-postgres:5432/edumatrix"

# Redis Connection
REDIS_URL="redis://edumatrix-redis:6379"

# Kafka Connection (NO Zookeeper)
KAFKA_BROKERS="edumatrix-kafka:9092"
KAFKA_CLIENT_ID="edumatrix-app"

# NextAuth (100% Official)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google AI (Official API)
GOOGLE_AI_API_KEY="your-google-ai-key"

# Socket.IO Configuration
SOCKET_IO_ADAPTER="redis"
SOCKET_IO_REDIS_URL="redis://edumatrix-redis:6379"

# RBAC Configuration for Docker
RBAC_ENABLED="true"
SUPER_ADMIN_EMAIL="admin@edumatrix.com"
TENANT_ISOLATION="true"
ROLE_CACHE_TTL="3600"
REDIS_PASSWORD="your-redis-password"

# Multi-tenant Security
ROW_LEVEL_SECURITY="enabled"
TENANT_SCHEMA_ISOLATION="true"
DEFAULT_ROLE="GUEST"
```

### Docker Network Communication with RBAC Security

- **Internal Network**: `edumatrix_network` - All services communicate internally with RBAC
- **Named Containers**: Clear server identification with role-based access
  - `edumatrix-postgres`: Multi-tenant database with row-level security
  - `edumatrix-redis`: Session storage with password protection
  - `edumatrix-kafka`: Event streaming with tenant isolation
- **RBAC Integration**: Role-based access control across all Docker services
- **Tenant Isolation**: Schema-per-tenant architecture in PostgreSQL
- **Session Security**: Redis-based session management with role caching
- **Official Images Only**: No custom containers, 100% official configurations
- **Real-time RBAC**: Socket.IO + Kafka + Redis with permission-based routing

### CI/CD Pipeline

- **Version Control:** Git with GitHub
- **Code Quality:** ESLint + Prettier + Husky
- **Testing:** Jest + React Testing Library
- **Build:** Next.js build with TypeScript compilation
- **Deployment:** Docker containers with automated deployment

---

---

## 🎯 DEVELOPMENT GUIDELINES

### Code Standards

- **TypeScript:** Strict mode enabled, full type coverage
- **ESLint:** Next.js recommended
- **Prettier:** Consistent code formatting
- **Naming:** PascalCase for components, camelCase for variables
- **Comments:** JSDoc format for functions and components

### Component Architecture

```typescript
// Component Structure Example
interface ComponentProps {
  // Props definition with JSDoc
}

const Component: React.FC<ComponentProps> = ({
  // Destructured props
}) => {
  // Hooks
  // State management
  // Event handlers
  // Render logic

  return (
    // JSX with proper accessibility
  );
};

export default Component;
```

### Git Workflow

- **Branches:** Feature branches from main
- **Commits:** Conventional commit messages
- **Pull Requests:** Code review required
- **Deployment:** Automated via CI/CD pipeline

---

## 📊 SUCCESS METRICS

### Technical Metrics

- **Performance:** Page load times < 2s, Core Web Vitals
- **Scalability:** Support for 1M+ concurrent users
- **Uptime:** 99.9% availability SLA
- **Security:** Zero critical vulnerabilities

### Business Metrics

- **User Engagement:** Daily active users, session duration
- **Institution Adoption:** Number of onboarded institutions
- **Course Completion:** Student success rates
- **Revenue:** Subscription and transaction revenue

---

## 🔗 EXTERNAL INTEGRATIONS

### Third-Party Services

- **Google AI API:** AI-powered features
- **ImageKit:** Image optimization
- **Resend:** Email delivery
- **Stripe:** Payment processing
- **Google Analytics:** User tracking
- **Sentry:** Error monitoring

### API Endpoints

```typescript
interface APIEndpoints {
  auth: "/api/auth/*";
  users: "/api/users/*";
  posts: "/api/posts/*";
  courses: "/api/courses/*";
  institutions: "/api/institutions/*";
  notifications: "/api/notifications/*";
}
```

---

## 📚 DOCUMENTATION INDEX

### Technical Documentation

- [Architecture Overview](./docs/EDU_MATRIX_Interlinked_Architecture.md)
- [Implementation Roadmap](./docs/IMPLEMENTATION_ROADMAP.md)
- [State Management](./docs/STATE_MANAGEMENT_Architecture.md)
- [Tech Stack Details](./docs/TECH_STACK_COMPLETE.md)
- [API Integration](./docs/API_INTEGRATION.md)

### Feature Documentation

- [Authentication System](./docs/AUTH_SYSTEM.md)
- [RBAC Implementation](./docs/RBAC_IMPLEMENTATION.md)
- [Real-time Features](./docs/NEXTJS_REALTIME_IMPLEMENTATION.md)
- [PWA Implementation](./docs/PWA_IMPLEMENTATION_PLAN.md)
- [Performance Optimization](./docs/PERFORMANCE_OPTIMIZATION.md)

### Module Documentation

- [Students Interlinked](<./docs/1%20Students%20Interlinked%20(social%20platform)/>)
- [Edu Matrix Hub](<./docs/2%20Edu%20Matrix%20Hub%20(multi-Tenant%20edu-system)/>)
- [Courses Platform](<./docs/3%20Courses%20(same%20as%20coursera)/>)
- [Community Features](./docs/7%20Community%20Rooms/)

---

## 🚀 GETTING STARTED

### Prerequisites

- Node.js 22
- PostgreSQL 16+
- Redis 7+
- Kafka 4.0 (integrated with Socket.IO)
- Docker & Docker Compose
- pnpm package manager

### Installation

```bash
# Clone repository
git clone <repository-url>
cd edu-matrix-interlinked

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local

# Start database services
docker-compose up -d postgres redis kafka

# Run database migrations
pnpm prisma migrate dev

# Start development server (includes Socket.IO integration)
pnpm dev
```

### Environment Configuration

```env
# Database
DATABASE_URL="postgresql://..."
REDIS_URL="redis://localhost:6379"

# Authentication
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# External Services
GOOGLE_AI_API_KEY="..."
IMAGEKIT_PUBLIC_KEY="..."
RESEND_API_KEY="..."
```

---

## 📞 SUPPORT & CONTRIBUTION

### Development Team

- **Lead Developer:** @MuhammadMustansaar0
- **Email:** bc240419601mmu@vu.edu.pk
- **Project Duration:** days of active developmen

### Contributing Guidelines

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Issue Reporting

- Use GitHub Issues for bug reports
- Provide detailed reproduction steps
- Include environment information
- Add relevant labels and screenshots

---

## 🤖 COPILOT QUICK REFERENCE

### Key Commands for Development

```bash
pnpm run dev          # Start Next.js development server
pnpm run build        # Build for production
pnpm run start        # Start production server
npx prisma migrate dev # Run database migrations
npx prisma studio     # Open Prisma Studio
```

### Common File Locations

```
/app/[module]/         # Module pages and layouts
/components/[module]/  # Module-specific components
/lib/                  # Utility functions and configurations
/prisma/schema.prisma  # Database schema
/types/               # TypeScript type definitions
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
REDIS_URL="redis://..."
KAFKA_BROKERS="localhost:9092"
```

### Coding Standards

- Use TypeScript for all files
- Follow Next.js 15 App Router patterns
- Use **shadcn/ui components** for all UI elements (100% official)
- Use Tailwind CSS for custom styling
- Implement proper error handling
- Use NextAuth.js official methods only
- Each module is independent with own schema

### shadcn/ui Setup Commands

```bash
# Initialize shadcn/ui in Next.js project
npx shadcn-ui@latest init

# Add components as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add toast
```

**Remember: This is a multi-tenant educational platform with 9 microservice modules using official shadcn/ui components throughout.**

---

**Last Updated:** May 27, 2025  
**Document Version:** 2.0.0  
**Status:** Active Development

### shadcn/ui Component Usage (100% Official)

```typescript
// Official shadcn/ui components for all modules
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toast, ToastProvider } from "@/components/ui/toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Common UI patterns across all 9 modules:
// ✅ Forms: Input, Label, Button, Select, Textarea
// ✅ Layout: Card, Container, Grid, Flex
// ✅ Feedback: Toast, Alert, Dialog, Sheet
// ✅ Navigation: Tabs, Breadcrumb, Pagination
// ✅ Data: Table, DataTable, Calendar, Chart
```

### UI Component File Structure

```
components/
├── ui/                       // shadcn/ui components (official)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── 1-Students-Interlinked/   // Module-specific components
│   ├── CreatePostArea.tsx    // Uses shadcn/ui internally
│   ├── Feed.tsx
│   └── PostCard.tsx
└── auth/                     // Auth components with shadcn/ui
    ├── LoginForm.tsx
    └── SignupForm.tsx
```

---

## 🛠️ Redux Toolkit State Management (Official Latest Implementation)

### Architecture Overview

EDU Matrix Interlinked uses Redux Toolkit (RTK)  the primary state management solution for global application state. The implementation follows modern Redux patterns with full TypeScript integration, SSR compatibility, and persistence capabilities.

### Core Dependencies
```json
{
  "@reduxjs/toolkit": "^2.6.1",
  "react-redux": "^9.2.0", 
  "redux-persist": "^6.0.0",
  "next-redux-wrapper": "^8.1.0"
}
```

### Store Configuration

**Location:** `lib/redux/store.ts`

```typescript
interface StoreArchitecture {
  structure: {
    auth: "Authentication & session management",
    studentsInterlinked: "Social platform state",
    eduMatrixHub: {
      attendance: "Real-time attendance tracking",
      exams: "AI-powered exam management", 
      courses: "Institution course management",
      notifications: "Real-time notifications",
      analytics: "Institutional analytics"
    },
    courses: "Course marketplace state",
    freelancing: "Freelance platform state", 
    jobs: "Job portal state",
    news: "Educational news state",
    community: "Real-time chat state",
    ui: "Theme & layout preferences",
    offline: "Offline queue & sync status"
  },
  
  middleware: [
    "thunk",           // Async actions with createAsyncThunk
    "serializable",    // Development serialization checks
    "persistence",     // Redux-persist integration
    "devtools"         // Redux DevTools integration
  ],
  
  persistence: {
    storage: "localStorage with SSR compatibility",
    whitelist: ["auth"],
    rehydration: "Selective state restoration"
  }
}
```

### Slice Architecture

**Primary Slices:**
- `authSlice.ts` - User authentication & session management
- `studentsInterlinkedSlice.ts` - Social platform features
- `eduMatrixHubSlice.ts` - Multi-tenant LMS functionality
- `coursesSlice.ts` - Course marketplace
- `freelancingSlice.ts` - Freelance platform
- `jobsSlice.ts` - Job portal
- `newsSlice.ts` - Educational news
- `communitySlice.ts` - Real-time chat & community
- `uiSlice.ts` - Theme & layout preferences

### TypeScript Integration

**Location:** `lib/redux/hooks.ts`

```typescript
// Typed hooks for TypeScript compatibility
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Root state type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Provider Setup

**Location:** `app/providers/ReduxProvider.tsx`

```typescript
interface ProviderFeatures {
  ssr: "SSR-compatible with client/server detection",
  persistence: "Redux-persist with PersistGate",
  hydration: "Selective state rehydration",
  fallback: "Graceful degradation for server rendering"
}
```

### Async State Management

Uses `createAsyncThunk` for:
- API calls to microservices
- Real-time data synchronization
- File uploads and processing
- AI-powered operations (Google AI integration)
- Multi-tenant data operations

### Caching Strategy

```typescript
interface CachingLayers {
  redux: "In-memory state caching",
  persist: "localStorage for auth state",
  redis: "Server-side session caching", 
  browser: "Service worker for API responses"
}
```

---

## 🏫 EDU Matrix Hub - Digital Education Institution Management Ecosystem

### Core Definition

EDU Matrix Hub is **NOT** a traditional LMS or single-system platform. It is a comprehensive **Digital Education Institution Management Ecosystem** that serves as the central management hub for thousands of educational institutions worldwide - including schools, colleges, and universities.

### Multi-Institutional Architecture

```typescript
interface EduMatrixHubEcosystem {
  scale: {
    institutions: "Thousands of registered educational institutions",
    users: "Millions of students, teachers, professors, parents, administrators",
    realTimeOperations: "24/7 digital education management",
    globalReach: "Worldwide educational institution support"
  },
  institutionTypes: {
    schools: "K-12 educational institutions",
    colleges: "Undergraduate and graduate colleges", 
    universities: "Multi-faculty research universities",
    vocationalInstitutes: "Technical and professional training centers",
    onlineInstitutions: "Digital-first educational providers"
  },
  architecture: {
    isolation: "Schema-per-institution with complete data separation",
    customization: "Institution-specific branding, workflows, and configurations",
    scalability: "Horizontal scaling to support unlimited institutions",
    security: "Enterprise-grade security with role-based access control"
  }
}
```

### Institution Registration & Profile Building

**Registration Process:**
1. **Institution Discovery & Application**
   - Educational institutions apply to join the EDU Matrix Hub ecosystem
   - Submit official documentation (accreditation, licenses, certifications)
   - Provide institutional details (type, size, academic programs, location)

2. **Verification & Approval**
   - Super Admin team verifies institutional credentials
   - Background checks and accreditation validation
   - Compliance review with local educational regulations

3. **Profile Building & Customization**
   - Institutions build comprehensive institutional profiles
   - Custom branding (logos, colors, themes, institutional identity)
   - Academic structure setup (departments, faculties, programs)
   - Calendar configuration (terms, semesters, academic year)

4. **Digital Environment Provisioning**
   - Isolated digital environment creation for each institution
   - Custom subdomain assignment (institution.edumatrix.com)
   - Database schema provisioning with complete data isolation
   - Role hierarchy and permission structure setup

### Comprehensive Role-Based Access Control (RBAC)

```typescript
interface RoleHierarchy {
  systemLevel: {
    SUPER_ADMIN: {
      description: "EDU Matrix Interlinked system administrators",
      permissions: [
        "Institution approval and management",
        "System-wide monitoring and analytics",
        "Platform configuration and updates",
        "Cross-institutional reporting",
        "Technical support and maintenance"
      ],
      scope: "Entire EDU Matrix Hub ecosystem"
    }
  },
  institutionLevel: {
    INSTITUTION_ADMIN: {
      description: "Top-level institutional administrators (Principal, President, Rector)",
      permissions: [
        "Complete institutional management",
        "User role assignment and management",
        "Institutional policy configuration",
        "Financial management and reporting",
        "Strategic planning and analytics"
      ],
      scope: "Single institution (complete access)"
    },
    ACADEMIC_DIRECTOR: {
      description: "Academic affairs management (Vice Principal, Dean)",
      permissions: [
        "Academic program management",
        "Curriculum planning and approval",
        "Faculty management and scheduling",
        "Academic calendar management",
        "Student academic progress oversight"
      ],
      scope: "Academic operations within institution"
    },
    DEPARTMENT_HEAD: {
      description: "Department-level management",
      permissions: [
        "Department faculty management",
        "Course scheduling and management",
        "Department budget and resources",
        "Faculty performance evaluation",
        "Department-specific reporting"
      ],
      scope: "Specific department within institution"
    },
    REGISTRAR: {
      description: "Student records and enrollment management",
      permissions: [
        "Student enrollment and registration",
        "Academic records management",
        "Transcript and certification issuance",
        "Student data privacy management",
        "Compliance and regulatory reporting"
      ],
      scope: "Student data and records management"
    }
  },
  academicStaff: {
    PROFESSOR: {
      description: "Senior teaching faculty with research responsibilities",
      permissions: [
        "Course creation and management",
        "Student assessment and grading",
        "Research project management",
        "Academic supervision of students",
        "Curriculum development participation"
      ],
      scope: "Assigned courses and research projects"
    },
    TEACHER: {
      description: "Primary teaching staff",
      permissions: [
        "Class management and instruction",
        "Student attendance tracking",
        "Assignment and exam creation",
        "Student progress monitoring",
        "Parent communication"
      ],
      scope: "Assigned classes and subjects"
    },
    ASSISTANT_TEACHER: {
      description: "Supporting teaching staff",
      permissions: [
        "Class assistance and support",
        "Student activity supervision",
        "Basic attendance marking",
        "Learning material preparation",
        "Student guidance and mentoring"
      ],
      scope: "Assigned support responsibilities"
    }
  },
  students: {
    STUDENT: {
      description: "Enrolled students in the institution",
      permissions: [
        "Course enrollment and access",
        "Assignment submission",
        "Grade and progress viewing",
        "Communication with teachers",
        "Institutional resource access"
      ],
      scope: "Personal academic data and enrolled courses"
    },
    STUDENT_REPRESENTATIVE: {
      description: "Elected student representatives",
      permissions: [
        "Student body representation",
        "Event organization and management",
        "Student feedback collection",
        "Communication with administration",
        "Student welfare advocacy"
      ],
      scope: "Student body representation and activities"
    }
  },
  parents: {
    PARENT: {
      description: "Parents/guardians of enrolled students",
      permissions: [
        "Child's academic progress monitoring",
        "Attendance record viewing",
        "Communication with teachers",
        "Fee payment and financial tracking",
        "Event and announcement notifications"
      ],
      scope: "Child's academic and administrative data"
    }
  },
  supportStaff: {
    ADMINISTRATIVE_STAFF: {
      description: "Administrative and support personnel",
      permissions: [
        "Administrative task management",
        "Communication and correspondence",
        "Resource and facility management",
        "Event coordination",
        "Documentation and record keeping"
      ],
      scope: "Administrative functions and support services"
    },
    IT_SUPPORT: {
      description: "Technical support staff for the institution",
      permissions: [
        "Technical troubleshooting",
        "System maintenance",
        "User account management",
        "Hardware and software support",
        "Digital resource management"
      ],
      scope: "Technical infrastructure and user support"
    }
  }
}
```

### Real-Time Digital Operations

**Core Real-Time Features:**

1. **Digital Attendance Management**
   - Real-time attendance marking by teachers during classes
   - Automated parent notifications for absences
   - Attendance analytics and pattern recognition
   - Integration with institutional attendance policies
   - Mobile app support for quick attendance marking

2. **AI-Powered Examination & Assessment System**
   - Automated exam creation using Google AI integration
   - Intelligent question bank generation
   - Real-time exam monitoring and proctoring
   - Automated grading with detailed analytics
   - Comprehensive result processing and distribution

3. **Live Academic Progress Tracking**
   - Real-time grade updates and progress monitoring
   - Parent dashboard with instant progress notifications
   - Student performance analytics and predictions
   - Teacher insights for personalized learning approaches
   - Achievement tracking and milestone recognition

4. **Dynamic Course & Curriculum Management**
   - Real-time course scheduling and updates
   - Curriculum planning with version control
   - Resource allocation and management
   - Cross-departmental coordination
   - Academic calendar synchronization

5. **Institutional Communication Hub**
   - Real-time announcements and notifications
   - Multi-channel communication (app, email, SMS)
   - Emergency alert systems
   - Event management and coordination
   - News and update distribution

### Application & User Management Ecosystem

**Student Application Process:**
- Online application submission with document verification
- Automated eligibility assessment
- Interview scheduling and management
- Admission decision workflow with automated notifications
- Enrollment process with fee payment integration
- Academic record transfer and validation

**Teacher/Professor Application Process:**
- Academic credential verification and validation
- Teaching portfolio and experience assessment
- Interview and evaluation process management
- Background check and reference verification
- Contract management and digital onboarding
- Professional development tracking and planning

**Parent/Guardian Integration:**
- Child registration and profile linking
- Real-time access to academic progress and attendance
- Direct communication channels with teachers and administration
- Fee payment portal with transaction history
- Event and announcement subscription management
- Parent-teacher meeting scheduling

### Technical Infrastructure & Architecture

```typescript
interface TechnicalArchitecture {
  database: {
    strategy: "Schema-per-institution for complete data isolation",
    scaling: "Horizontal scaling with institution-specific databases",
    backup: "Real-time backup with institution-specific recovery",
    compliance: "GDPR, FERPA, and local data protection compliance"
  },
  realTime: {
    technology: "Socket.IO + Kafka + Redis for real-time operations",
    features: "Live attendance, instant notifications, real-time analytics",
    scaling: "Multi-tenant real-time connections with role-based routing",
    performance: "Sub-second response times for critical operations"
  },
  security: {
    isolation: "Complete data separation between institutions",
    encryption: "End-to-end encryption for sensitive data",
    authentication: "Multi-factor authentication for all user types",
    authorization: "Granular RBAC with dynamic permission management"
  },
  integration: {
    apis: "RESTful APIs for third-party integration",
    exports: "Standard educational data export formats",
    imports: "Legacy system data migration tools",
    plugins: "Extensible plugin architecture for custom features"
  }
}
```

### Integration with EDU Matrix Interlinked Ecosystem

**Seamless Module Integration:**
- **Students Interlinked:** Academic social networking within institutional boundaries
- **Courses Platform:** Integration with external course marketplace for supplementary education
- **Freelancing Module:** Student work opportunity platform with institutional oversight
- **Job Portal:** Graduate career placement and alumni tracking system
- **Community Rooms:** Institutional communication and collaboration spaces
- **Educational News:** Institution-specific news and industry updates

### Institutional Analytics & Reporting

**Comprehensive Analytics Dashboard:**
- Real-time institutional performance metrics
- Student success rate tracking and analysis
- Teacher performance and development insights
- Financial management and budget tracking
- Compliance and accreditation reporting
- Parent satisfaction and engagement metrics
- Predictive analytics for institutional planning

### Digital Transformation Impact

**For Educational Institutions:**
- Complete digitization of traditional administrative processes
- Enhanced parent engagement and communication
- Improved student outcomes through real-time monitoring
- Streamlined operations with automated workflows
- Data-driven decision making with comprehensive analytics
- Reduced operational costs through digital efficiency
- Enhanced institutional reputation through modern digital presence

This ecosystem represents the future of digital education management, providing comprehensive tools for institutions to manage their entire academic and administrative operations in real-time while maintaining complete data isolation, security, and customization for each institution's unique needs.

---
