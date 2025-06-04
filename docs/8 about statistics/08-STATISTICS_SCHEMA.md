/**
 * @fileoverview Education Statistics Platform Schema Implementation
 * WHY: Define comprehensive schema for educational analytics and metrics
 * WHERE: Used in statistics_platform_schema database schema
 * HOW: Implements enterprise-grade analytics system with real-time tracking
 */

# Statistics Platform Schema Implementation

## 1. Core Analytics Models

### Metric Schema
```prisma
// Base metric model
model Metric {
  id              String    @id @default(uuid())
  code            String    @unique  // Metric identifier
  name            String
  description     String    @db.Text
  type            MetricType
  category        MetricCategory
  
  // Metric Configuration
  unit            String?
  format          String?   // Display format
  aggregation     AggregationType
  isRealTime      Boolean   @default(false)
  
  // Data Points
  dataPoints      DataPoint[]
  alerts          Alert[]
  
  // Access Control
  visibility      MetricVisibility @default(PUBLIC)
  accessRoles     Role[]
  
  // Validation
  minValue        Float?
  maxValue        Float?
  threshold       Float?
  
  // Metadata
  tags            Tag[]
  source          String?   // Data source
  frequency       UpdateFrequency
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  lastUpdated     DateTime?

  @@schema("statistics_platform_schema")
}

// Metric data point
model DataPoint {
  id              String    @id @default(uuid())
  metricId        String
  metric          Metric    @relation(fields: [metricId], references: [id])
  
  // Data Values
  value           Float
  timestamp       DateTime  @default(now())
  
  // Context
  dimension       Json?     // Additional dimensions
  source          String?   // Data source
  confidence      Float?    // Data quality score
  
  // Metadata
  tags            String[]
  notes           String?
  
  // Validation
  isValid         Boolean   @default(true)
  validatedAt     DateTime?
  validatedBy     String?

  @@schema("statistics_platform_schema")
}
```

## 2. Educational Analytics Models

### Performance Schema
```prisma
// Institution performance
model InstitutionPerformance {
  id              String    @id @default(uuid())
  institutionId   String
  institution     Institution @relation(fields: [institutionId], references: [id])
  
  // Academic Metrics
  enrollment      EnrollmentMetrics
  academics       AcademicMetrics
  engagement      EngagementMetrics
  satisfaction    SatisfactionMetrics
  
  // Financial Metrics
  revenue         RevenueMetrics
  expenses        ExpenseMetrics
  efficiency      EfficiencyMetrics
  
  // Resource Metrics
  facilities      FacilityMetrics
  faculty         FacultyMetrics
  resources       ResourceMetrics
  
  // Timeline
  period          String    // Academic period
  startDate       DateTime
  endDate         DateTime
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("statistics_platform_schema")
}

// Student analytics
model StudentAnalytics {
  id              String    @id @default(uuid())
  studentId       String
  student         User      @relation(fields: [studentId], references: [id])
  
  // Academic Performance
  courses         CoursePerformance[]
  grades          GradeMetrics
  attendance      AttendanceMetrics
  participation   ParticipationMetrics
  
  // Learning Analytics
  progress        ProgressMetrics
  engagement      StudentEngagement
  activity        ActivityMetrics
  
  // Timeline
  period          String    // Academic period
  startDate       DateTime
  endDate         DateTime
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("statistics_platform_schema")
}
```

## 3. Tracking Models

### Event Schema
```prisma
// Analytics event
model Event {
  id              String    @id @default(uuid())
  type            EventType
  category        EventCategory
  
  // Event Data
  data            Json
  metadata        Json?
  
  // Context
  userId          String?
  user            User?     @relation(fields: [userId], references: [id])
  sessionId       String?
  deviceId        String?
  
  // Source
  source          String
  sourceType      SourceType
  sourceId        String?
  
  // Location
  ip              String?
  userAgent       String?
  location        Json?
  
  // Timestamps
  timestamp       DateTime  @default(now())
  processedAt     DateTime?

  @@schema("statistics_platform_schema")
}

// Event aggregation
model EventAggregate {
  id              String    @id @default(uuid())
  eventType       EventType
  period          String    // Aggregation period
  
  // Aggregate Data
  count           Int       @default(0)
  uniqueUsers     Int       @default(0)
  data            Json      // Aggregated metrics
  
  // Timeline
  startDate       DateTime
  endDate         DateTime
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("statistics_platform_schema")
}
```

## 4. Report Models

### Report Schema
```prisma
// Analytics report
model Report {
  id              String    @id @default(uuid())
  name            String
  description     String?   @db.Text
  type            ReportType
  
  // Report Configuration
  metrics         Metric[]
  filters         Json?
  sorting         Json?
  
  // Scheduling
  schedule        ReportSchedule?
  lastRun         DateTime?
  nextRun         DateTime?
  
  // Access Control
  visibility      ReportVisibility @default(PRIVATE)
  accessRoles     Role[]
  
  // Output
  format          ReportFormat
  template        String?   // Report template
  
  // Recipients
  subscribers     User[]
  distribution    DistributionList[]
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("statistics_platform_schema")
}

// Report generation
model ReportGeneration {
  id              String    @id @default(uuid())
  reportId        String
  report          Report    @relation(fields: [reportId], references: [id])
  
  // Generation Details
  status          GenerationStatus @default(PENDING)
  startTime       DateTime  @default(now())
  endTime         DateTime?
  
  // Output
  url             String?   // Report URL
  format          ReportFormat
  size            Int?      // File size
  
  // Processing
  duration        Int?      // Processing time (ms)
  error           String?   // Error message
  
  // Distribution
  distributed     Boolean   @default(false)
  distributedAt   DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("statistics_platform_schema")
}
```

## 5. Alert Models

### Alert Schema
```prisma
// Metric alert
model Alert {
  id              String    @id @default(uuid())
  metricId        String
  metric          Metric    @relation(fields: [metricId], references: [id])
  
  // Alert Configuration
  name            String
  condition       AlertCondition
  threshold       Float
  severity        AlertSeverity @default(MEDIUM)
  
  // Notification
  channels        NotificationChannel[]
  recipients      User[]
  
  // Status
  isActive        Boolean   @default(true)
  lastTriggered   DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("statistics_platform_schema")
}

// Alert history
model AlertHistory {
  id              String    @id @default(uuid())
  alertId         String
  alert           Alert     @relation(fields: [alertId], references: [id])
  
  // Trigger Details
  value           Float
  threshold       Float
  condition       AlertCondition
  
  // Status
  status          AlertStatus @default(TRIGGERED)
  resolvedAt      DateTime?
  resolvedBy      String?
  
  // Notification
  notified        Boolean   @default(false)
  notifiedAt      DateTime?
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@schema("statistics_platform_schema")
}
```

## 6. Enums & Types

```prisma
enum MetricType {
  COUNTER
  GAUGE
  HISTOGRAM
  SUMMARY
}

enum MetricCategory {
  ACADEMIC
  FINANCIAL
  ENGAGEMENT
  PERFORMANCE
  OPERATIONAL
}

enum AggregationType {
  SUM
  AVERAGE
  MIN
  MAX
  COUNT
  PERCENTILE
}

enum MetricVisibility {
  PUBLIC
  PRIVATE
  RESTRICTED
}

enum UpdateFrequency {
  REALTIME
  HOURLY
  DAILY
  WEEKLY
  MONTHLY
}

enum EventType {
  PAGE_VIEW
  INTERACTION
  TRANSACTION
  SYSTEM
  CUSTOM
}

enum EventCategory {
  USER
  CONTENT
  SYSTEM
  ANALYTICS
}

enum SourceType {
  WEB
  MOBILE
  API
  SYSTEM
}

enum ReportType {
  DASHBOARD
  DETAILED
  SUMMARY
  CUSTOM
}

enum ReportVisibility {
  PUBLIC
  PRIVATE
  RESTRICTED
}

enum ReportFormat {
  PDF
  EXCEL
  CSV
  JSON
  HTML
}

enum GenerationStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

enum AlertCondition {
  ABOVE
  BELOW
  EQUAL
  CHANGE_RATE
}

enum AlertSeverity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum AlertStatus {
  TRIGGERED
  ACKNOWLEDGED
  RESOLVED
  IGNORED
}
```