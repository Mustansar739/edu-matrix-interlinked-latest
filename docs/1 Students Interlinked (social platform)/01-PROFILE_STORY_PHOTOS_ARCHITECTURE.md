/**
 * @fileoverview Profile & Story Photos Architecture Documentation
 * @module MediaManagement
 * @category CoreInfrastructure
 * 
 * @description
 * Comprehensive architecture for managing profile photos and story photos
 * using dual ImageKit accounts to maximize free tier benefits while
 * ensuring scalability and performance.
 * 
 * @infrastructure Multi-account ImageKit deployment
 * @compliance GDPR, CCPA, PDPA compliant
 * @security Image scanning and optimization
 */

# Profile & Story Photos Management System

## System Overview

### Infrastructure Setup
```typescript
interface ImageKitSetup {
  accounts: {
    profilePhotos: {
      purpose: "Permanent profile photos";
      storage: "5GB total storage";
      bandwidth: "20GB monthly transfer";
      publicKey: "public_9v/KFB0ETFj9WxIfj2FfckvEniY=";
      privateKey: "private_jldgFuXJEXdj5b/msEJYVe15zVk=";
      urlEndpoint: "https://ik.imagekit.io/vlsjmvsqt/";
    };
    storyPhotos: {
      purpose: "24h temporary stories";
      storage: "5GB total storage";
      bandwidth: "20GB monthly transfer";
      publicKey: "public_T26XbZ4em8nFu52O4QHaQIZSAKc=";
      privateKey: "private_/EpCsMPiCJ0YETjb6sW11lJm7tE=";
      urlEndpoint: "https://ik.imagekit.io/yidykj9zd";
    };
  };
}
```

## 1. Profile Photos System

### Storage Requirements
- Size max Limit: 20KB per photo
- Dimensions: 300x300px
- Format: WebP
- Optimization: Server-side compression
- Storage Quota: 5GB (Account 1)

### Operations Management
```typescript
interface ProfilePhotoOps {
  monthly: {
    uploads: {
      limit: "1M operations/month";
      estimated: "~100K uploads/month";
      buffer: "900K ops for other operations";
    };
    optimizations: {
      compression: "Automatic WebP conversion";
      resizing: "300x300px standard";
      quality: "80% quality setting";
    };
    cleanup: {
      trigger: "On photo update";
      process: "Delete previous photo";
      frequency: "Real-time cleanup";
    };
  };
}
```

### Capacity Planning
```typescript
interface StorageCalculations {
  profilePhotos: {
    photoSize: "25KB per photo";
    totalStorage: "10GB = 10,000,000KB";
    safetyBuffer: "10% storage reserved";
  };
}
```

## 2. Story Photos System

### Storage Requirements
- Size Limit: 100KB per photo
- Format: WebP
- Optimization: Server-side compression
- Storage Quota: 10GB (Account 2)

### Operations Management
```typescript
interface StoryPhotoOps {
  cleanup: {
    frequency: "Hourly cleanup job";
    target: "Photos > 24h old";
    process: "Batch deletion";
    logging: "Deletion audit trail";
  };
  monitoring: {
    storage: {
      threshold: "80% capacity alert";
      metrics: "Hourly usage stats";
      trending: "Growth predictions";
    };
    operations: {
      tracking: "Usage monitoring";
      alerts: "90% threshold warning";
      optimization: "Batch processing";
    };
  };
}
```

## 3. Operation Optimization Strategy

### Upload Process
```typescript
interface UploadOptimization {
  preprocessing: {
    clientSide: {
      compression: "Browser-based compression";
      resizing: "Client-side dimension check";
      validation: "Format and size validation";
    };
    serverSide: {
      optimization: "Final size optimization";
      conversion: "WebP conversion";
      verification: "Security scanning";
    };
  };
  batchProcessing: {
    stories: {
      grouping: "Batch uploads by user";
      timing: "Off-peak processing";
      cleanup: "Grouped deletions";
    };
  };
}
```

### Operation Conservation
```typescript
interface OperationSaving {
  strategies: {
    caching: {
      cdn: "Edge caching enabled";
      browser: "Local storage cache";
      redis: "URL cache for 24h";
    };
    batching: {
      uploads: "Group story uploads";
      deletions: "Batch cleanup jobs";
      updates: "Grouped profile updates";
    };
    optimization: {
      compression: "Pre-upload optimization";
      validation: "Client-side checks";
      deduplication: "Prevent duplicate uploads";
    };
  };
}
```

## 4. Implementation Guidelines

### Profile Photo Management
1. Upload Flow:
   - Client-side compression
   - Dimension validation
   - Format checking
   - Server-side optimization
   - WebP conversion
   - CDN distribution

2. Update Process:
   - Upload new photo
   - Verify successful upload
   - Delete old photo
   - Update database reference
   - Clear caches

3. Operation Conservation:
   - Implement upload cooldown
   - Enforce size limits
   - Enable strong caching
   - Batch status updates
   - Optimize cleanup jobs

### Story Photo Management
1. Upload Flow:
   - Batch upload support
   - Progressive optimization
   - Parallel processing
   - CDN distribution
   - Expiration tagging

2. Cleanup Process:
   - Hourly cleanup jobs
   - Batch deletions
   - Storage reclamation
   - Cache invalidation
   - Metric updates

3. Operation Conservation:
   - Group story uploads
   - Batch deletions
   - Optimize cleanup timing
   - Cache aggressively
   - Monitor usage patterns

## 5. Monitoring & Alerts

### System Metrics
```typescript
interface MonitoringSystem {
  storage: {
    usage: "Current storage levels";
    trending: "Growth patterns";
    predictions: "Capacity forecasting";
  };
  operations: {
    tracking: "Operation counts";
    limits: "Threshold monitoring";
    optimization: "Usage patterns";
  };
  performance: {
    upload: "Upload success rates";
    delivery: "CDN performance";
    cleanup: "Deletion success";
  };
}
```

### Alert Thresholds
1. Storage Alerts:
   - 80% capacity warning
   - 90% capacity critical
   - Growth rate alerts
   - Cleanup failure alerts

2. Operation Alerts:
   - 80% monthly limit warning
   - 90% monthly limit critical
   - Batch failure notifications
   - Performance degradation

## 6. Backup & Recovery

### Backup Strategy
```typescript
interface BackupSystem {
  profiles: {
    frequency: "Daily incremental";
    retention: "30-day history";
    verification: "Integrity checks";
  };
  stories: {
    frequency: "6-hour snapshots";
    retention: "48-hour history";
    cleanup: "Automatic expiry";
  };
}
```

## 7. Security & Compliance

### Security Measures
```typescript
interface SecurityControls {
  upload: {
    validation: "File type verification";
    scanning: "Malware detection";
    authentication: "Signed uploads";
  };
  access: {
    profiles: "Public read, auth write";
    stories: "Controlled access";
    deletion: "Owner only";
  };
}
```

### Compliance Implementation
```typescript
interface ComplianceSystem {
  gdpr: {
    consent: "Upload consent tracking";
    deletion: "Right to erasure";
    access: "Data portability";
  };
  audit: {
    logging: "Operation tracking";
    retention: "Log maintenance";
    reporting: "Compliance reports";
  };
}
```

## 8. Monthly Operation Allocation Strategy

### Profile Photos (Account 1)
```typescript
interface ProfileOperationBudget {
  monthly: {
    totalOperations: "1M operations/month";
    allocation: {
      uploads: {
        budget: "300K operations";
        usage: "New user registrations + profile updates";
        optimization: "Client-side preprocessing to reduce operations";
      };
      reads: {
        budget: "600K operations";
        optimization: "Heavy CDN caching";
        strategy: "7-day cache duration";
      };
      deletions: {
        budget: "100K operations";
        batching: "Group deletions hourly";
        timing: "Off-peak execution";
      };
    };
  };
  
  conservation: {
    caching: {
      profileUrls: "7-day Redis cache";
      cdnConfig: "7-day edge cache";
      browser: "24-hour local storage";
    };
    batching: {
      uploads: "Queue and process in batches";
      deletions: "Hourly cleanup jobs";
      updates: "Batch status updates";
    };
  };
}
```

### Story Photos (Account 2)
```typescript
interface StoryOperationBudget {
  monthly: {
    totalOperations: "1M operations/month";
    allocation: {
      uploads: {
        budget: "400K operations";
        batching: "Group uploads by user session";
        optimization: "Client-side preprocessing";
      };
      reads: {
        budget: "400K operations";
        caching: "24-hour CDN cache";
        strategy: "Progressive loading";
      };
      deletions: {
        budget: "200K operations";
        process: "Batch cleanup every hour";
        optimization: "Group by expiration time";
      };
    };
  };

  conservation: {
    cleanup: {
      frequency: "Hourly batch jobs";
      grouping: "Delete by expiration windows";
      timing: "Run during low-traffic periods";
    };
    caching: {
      cdnConfig: "24-hour edge cache";
      browser: "Session storage cache";
    };
  };
}
```

## 9. Operation Tracking System

### Monitoring Dashboard
```typescript
interface OperationMonitoring {
  realtime: {
    counters: {
      uploads: "Current day upload count";
      reads: "Current day read operations";
      deletions: "Current day deletion count";
    };
    alerts: {
      threshold: "80% daily allocation";
      critical: "90% monthly allocation";
      trending: "Unusual usage patterns";
    };
  };
  
  analytics: {
    daily: {
      patterns: "Usage pattern analysis";
      peaks: "Peak usage times";
      optimization: "Operation saving opportunities";
    };
    monthly: {
      trends: "Monthly usage trends";
      forecasting: "Usage predictions";
      recommendations: "Optimization suggestions";
    };
  };
}
```

### Emergency Measures
```typescript
interface EmergencyControls {
  highUsage: {
    throttling: {
      uploadLimits: "Reduce per-user limits";
      readLimits: "Increase cache durations";
      priority: "Essential operations only";
    };
    optimization: {
      forcedBatching: "Mandatory operation grouping";
      cacheExtension: "Extended cache periods";
      deferredCleanup: "Postpone non-critical cleanup";
    };
    recovery: {
      planB: "Temporary second account failover";
      monitoring: "Enhanced usage tracking";
      alerting: "Stakeholder notifications";
    };
  };
}
```

## 10. Technical Implementation Strategy

### URL Structure & CDN Configuration
```typescript
interface CDNConfiguration {
  profilePhotos: {
    domain: {
      primary: "profiles.yourdomain.com";
      format: "profiles.yourdomain.com/[userId]/[hash].webp";
      transforms: "?width=300&height=300&quality=80";
    };
    caching: {
      headers: {
        cacheControl: "public, max-age=604800"; // 7 days
        immutable: "true";
        vary: "Accept";
      };
    };
  };
  
  storyPhotos: {
    domain: {
      primary: "stories.yourdomain.com";
      format: "stories.yourdomain.com/[userId]/[timestamp].webp";
      transforms: "?width=1080&height=1920&quality=80";
    };
    caching: {
      headers: {
        cacheControl: "public, max-age=86400"; // 24 hours
        immutable: "true";
        vary: "Accept";
      };
    };
  };
}
```

### API Rate Limiting
```typescript
interface RateLimiting {
  profileUpdates: {
    anonymous: "No uploads allowed";
    authenticated: {
      updates: "1 upload per 24h";
      cooldown: "24h between changes";
      user: "delte:own";

      override: "Admin can bypass";
    };
  };
  
  storyUploads: {
    anonymous: "No uploads allowed";
    authenticated: {
      daily: "24 photos per 24h";
      batch: "5 photos per request"; // corrected batch limit
      cooldown: "5 minutes between batches";
      user: "delete:own"; // added user permission
    };
  };
}
```

## 11. Operational Efficiency Guidelines

### Best Practices
1. Profile Photos:
   - Always validate dimensions client-side
   - Compress before upload
   - Use WebP format
   - Implement upload cooldown
   - Cache aggressively

2. Story Photos:
   - Batch uploads when possible
   - Implement progressive loading
   - Use WebP format
   - Enable background cleanup
   - Monitor storage usage

### Monthly Operation Conservation
1. Upload Optimization:
   - Client-side validation
   - Batch processing
   - Compression before upload
   - Format validation
   - Size restrictions

2. Read Optimization:
   - Aggressive CDN caching
   - Browser caching
   - Progressive loading
   - Image optimization
   - Lazy loading

3. Deletion Strategy:
   - Batch processing
   - Off-peak execution
   - Automated cleanup
   - Storage monitoring
   - Operation logging

## 12. Success Metrics

### Performance KPIs
```typescript
interface PerformanceMetrics {
  uploads: {
    profileSpeed: "< 2 seconds";
    storySpeed: "< 3 seconds";
    successRate: "> 99%";
    optimizationRate: "> 95%";
  };
  
  delivery: {
    loadTime: "< 200ms";
    cacheHitRate: "> 95%";
    availability: "99.99%";
    globalLatency: "< 100ms";
  };
  
  operations: {
    utilizationTarget: "< 80%";
    batchEfficiency: "> 90%";
    cleanupSuccess: "> 99%";
    errorRate: "< 0.1%";
  };
}
```

### Monitoring Checklist
- Daily operation count tracking
- Storage utilization monitoring
- CDN performance metrics
- Error rate monitoring
- Cleanup job success rate
- Cache hit ratio tracking
- Global delivery latency
- Upload success rates

## 13. User Upload Handling

### File Upload Processing
```typescript
interface UploadHandling {
  preprocessing: {
    clientSide: {
      validation: {
        size: "Up to 5MB allowed";
        formats: ["jpg", "png", "webp", "jpeg", "gif"];
        dimensions: "Any dimensions accepted";
      };
      optimization: {
        compress: "Browser-based compression";
        resize: "Maintain aspect ratio";
        preview: "Generate thumbnail";
      };
    };
    serverSide: {
      security: {
        scanning: "Malware detection";
        validation: "Deep file inspection";
        sanitization: "Metadata stripping";
      };
      transformation: {
        profiles: {
          resize: "300x300px output";
          format: "Convert to WebP";
          quality: "80% quality";
          size: "~25KB target";
        };
        stories: {
          resize: "1080x1920px max";
          format: "Convert to WebP";
          quality: "80% quality";
          size: "~100KB target";
        };
      };
    };
  };
}
```

### Upload Flow Management
```typescript
interface UploadFlow {
  profiles: {
    steps: {
      initial: "Accept any image up to 5MB";
      validate: "Check file validity";
      process: "Server-side optimization";
      store: "Save to Cloudflare R2";
      cleanup: "Remove old photo";
    };
    optimization: {
      strategy: "Progressive quality reduction";
      targetSize: "25KB final size";
      fallback: "Further compression if needed";
    };
  };
  stories: {
    steps: {
      initial: "Accept any image up to 5MB";
      validate: "Verify file integrity";
      process: "Optimize for stories";
      store: "Save with expiry tag";
      schedule: "Set deletion timer";
    };
    optimization: {
      strategy: "Quality-size balance";
      targetSize: "100KB final size";
      priority: "Maintain visual quality";
    };
  };
}
```

## 14. Dynamic Image Processing

### Quality Optimization
```typescript
interface QualityControl {
  profiles: {
    compression: {
      initial: "Start at 80% quality";
      steps: "Reduce by 5% until target";
      minimum: "40% quality floor";
      strategy: "Maintain facial clarity";
    };
    dimensions: {
      target: "300x300px";
      method: "Smart cropping";
      focus: "Face detection";
      fallback: "Center crop";
    };
  };
  stories: {
    compression: {
      initial: "Start at 80% quality";
      steps: "Reduce by 5% until target";
      minimum: "50% quality floor";
      strategy: "Preserve image detail";
    };
    dimensions: {
      max: "1080x1920px";
      method: "Maintain aspect ratio";
      focus: "Content-aware scaling";
      fallback: "Letterboxing";
    };
  };
}
```

### Processing Pipeline
```typescript
interface ProcessingPipeline {
  preprocessing: {
    validation: {
      type: "Check MIME type";
      size: "Verify file size";
      dimensions: "Check image dimensions";
    };
    optimization: {
      strip: "Remove EXIF data";
      decode: "Validate image data";
      analyze: "Assess complexity";
    };
  };
  processing: {
    resize: {
      algorithm: "Lanczos3 resampling";
      mode: "Content-aware";
      quality: "High-quality scaling";
    };
    compress: {
      format: "WebP conversion";
      quality: "Dynamic adjustment";
      metadata: "Strip non-essential";
    };
  };
  postprocessing: {
    verify: {
      size: "Check final size";
      quality: "Validate output";
      format: "Confirm WebP";
    };
    optimize: {
      cache: "Set cache headers";
      cdn: "Push to edge";
      cleanup: "Remove temp files";
    };
  };
}
```

## 15. Error Handling & Recovery

### Upload Error Management
```typescript
interface ErrorHandling {
  clientSide: {
    validation: {
      size: "File too large error";
      format: "Invalid format error";
      network: "Connection error retry";
    };
    recovery: {
      retry: "Automatic retry logic";
      resume: "Resumable uploads";
      fallback: "Quality reduction";
    };
  };
  serverSide: {
    processing: {
      timeout: "Processing timeout";
      resource: "Resource exhaustion";
      storage: "Storage capacity";
    };
    mitigation: {
      queue: "Processing queue";
      scaled: "Scaled processing";
      cleanup: "Resource recovery";
    };
  };
}
```

## 16. Real-Time Processing & Notifications

### Upload Progress Tracking
```typescript
interface ProgressTracking {
  realtime: {
    upload: {
      progress: "Percentage complete";
      speed: "Upload speed stats";
      remaining: "Time estimation";
      stage: "Current process step";
    };
    processing: {
      status: "Processing stage";
      quality: "Current quality level";
      attempts: "Compression attempts";
      completion: "ETA to finish";
    };
  };
  notifications: {
    start: {
      message: "Upload started";
      details: "File size and type";
    };
    progress: {
      processing: "Optimization status";
      compression: "Size reduction stats";
      quality: "Quality adjustments";
    };
    completion: {
      success: "Upload finished";
      url: "Photo URL ready";
      stats: "Final image details";
    };
  };
}
```

### User Feedback System
```typescript
interface FeedbackSystem {
  statusUpdates: {
    visual: {
      progress: "Progress bar";
      preview: "Live thumbnail";
      processing: "Status indicators";
    };
    messages: {
      uploading: "Uploading your photo...";
      optimizing: "Making your photo perfect...";
      finishing: "Almost there...";
      complete: "Photo ready!";
    };
  };
  errorHandling: {
    userFacing: {
      size: "Photo too large, optimizing...";
      format: "Converting format...";
      quality: "Adjusting quality...";
      retry: "Retrying upload...";
    };
    actions: {
      autoRetry: "Automatic retry";
      manualRetry: "Retry button";
      cancel: "Cancel upload";
      reset: "Start over";
    };
  };
}
```

### Processing Queue Management
```typescript
interface QueueManagement {
  priorities: {
    profilePhotos: {
      priority: "High priority";
      timeout: "30 seconds max";
      retries: "3 attempts";
    };
    storyPhotos: {
      priority: "Normal priority";
      timeout: "60 seconds max";
      retries: "2 attempts";
    };
  };
  concurrency: {
    limits: {
      perUser: "2 concurrent uploads";
      global: "50 concurrent processes";
      perRegion: "20 processes/region";
    };
    throttling: {
      rules: "Rate limiting";
      cooldown: "Upload cooldowns";
      distribution: "Load balancing";
    };
  };
}
```

## 17. High Availability & Redundancy

### Regional Distribution
```typescript
interface RegionalStrategy {
  photoStorage: {
    primary: {
      profileAccount: {
        regions: ["ASIA", "EU", "US"];
        replication: "Real-time sync";
        failover: "Auto region switch";
      };
      storyAccount: {
        regions: ["ASIA", "EU", "US"];
        replication: "Near real-time";
        cleanup: "Cross-region sync";
      };
    };
    backup: {
      coldStorage: {
        type: "Weekly backup";
        retention: "90 days";
        recovery: "24h SLA";
      };
      warmStorage: {
        type: "Daily backup";
        retention: "30 days";
        recovery: "1h SLA";
      };
    };
  };
}
```

### Failover Mechanisms
```typescript
interface FailoverSystem {
  detection: {
    healthChecks: {
      frequency: "30-second intervals";
      timeout: "5-second threshold";
      consecutive: "3 failures trigger";
    };
    metrics: {
      latency: "> 500ms warning";
      errors: "> 1% error rate";
      capacity: "> 90% utilization";
    };
  };
  response: {
    automatic: {
      regionSwitch: "Auto region failover";
      loadBalance: "Traffic redistribution";
      notification: "Admin alerts";
    };
    manual: {
      override: "Force region switch";
      recovery: "Manual failback";
      maintenance: "Planned downtime";
    };
  };
  recovery: {
    steps: {
      isolation: "Identify failure scope";
      mitigation: "Apply fixes";
      validation: "Verify service";
      restoration: "Resume traffic";
    };
    verification: {
      integrity: "Data consistency check";
      performance: "Service level checks";
      monitoring: "Extended observation";
    };
  };
}
```

### Resource Management
```typescript
interface ResourceAllocation {
  quotaManagement: {
    accounts: {
      profile: {
        storage: "80% max utilization";
        operations: "90% threshold alert";
        bandwidth: "Unlimited (CDN)";
      };
      story: {
        storage: "70% max utilization";
        operations: "85% threshold alert";
        bandwidth: "Unlimited (CDN)";
      };
    };
    cleanup: {
      automatic: {
        trigger: "75% storage usage";
        target: "Reduce to 60%";
        priority: "Least accessed first";
      };
      emergency: {
        trigger: "95% storage usage";
        action: "Aggressive cleanup";
        notification: "Admin intervention";
      };
    };
  };
  scaling: {
    rules: {
      storage: "Linear expansion";
      operations: "Burst handling";
      processing: "Auto-scaling";
    };
    limits: {
      maxStorage: "10GB per account";
      maxOps: "1M ops/month";
      concurrency: "100 uploads/minute";
    };
  };
}
```

## 18. System Maintenance & Health

### Automated Maintenance Tasks
```typescript
interface MaintenanceSystem {
  daily: {
    storageCleanup: {
      profiles: {
        orphaned: "Remove unlinked photos";
        duplicates: "Clean duplicate entries";
        corrupted: "Remove invalid files";
      };
      stories: {
        expired: "Remove 24h+ stories";
        failed: "Clean failed uploads";
        temp: "Clear temp files";
      };
    };
    operationReset: {
      counters: "Reset daily counters";
      metrics: "Update usage stats";
      alerts: "Clear resolved alerts";
    };
  };
  weekly: {
    optimization: {
      storage: {
        defrag: "Storage optimization";
        compress: "Deep compression";
        verify: "Data integrity";
      };
      performance: {
        cache: "Cache warmup";
        cdn: "CDN optimization";
        routes: "Route optimization";
      };
    };
  };
  monthly: {
    analytics: {
      usage: "Operation patterns";
      growth: "Storage trends";
      performance: "Speed metrics";
    };
    planning: {
      capacity: "Storage forecasting";
      scaling: "Growth planning";
      optimization: "Efficiency review";
    };
  };
}
```

### Health Monitoring
```typescript
interface HealthMonitoring {
  metrics: {
    storage: {
      usage: "Current/Max capacity";
      growth: "Usage trajectory";
      efficiency: "Space utilization";
    };
    operations: {
      rate: "Operations per minute";
      latency: "Processing times";
      errors: "Failure rates";
    };
    delivery: {
      speed: "Download times";
      cache: "Hit/Miss ratios";
      availability: "Edge status";
    };
  };
  alerts: {
    critical: {
      storage: "> 90% capacity";
      operations: "> 95% quota";
      errors: "> 5% failure rate";
    };
    warning: {
      storage: "> 80% capacity";
      operations: "> 85% quota";
      errors: "> 2% failure rate";
    };
    info: {
      storage: "> 70% capacity";
      operations: "> 75% quota";
      errors: "> 1% failure rate";
    };
  };
  recovery: {
    automatic: {
      retry: "Failed operations";
      cleanup: "Storage recovery";
      rebalance: "Load distribution";
    };
    manual: {
      intervention: "Admin actions";
      scaling: "Resource adjustment";
      migration: "Data transfer";
    };
  };
}
```

### System Reports
```typescript
interface ReportingSystem {
  daily: {
    operations: {
      uploads: "Total uploads/success rate";
      processing: "Average processing time";
      delivery: "CDN performance";
    };
    storage: {
      usage: "Current storage levels";
      cleanup: "Space recovered";
      efficiency: "Compression rates";
    };
  };
  weekly: {
    trends: {
      usage: "Usage patterns";
      performance: "Speed metrics";
      reliability: "Error rates";
    };
    optimization: {
      suggestions: "Improvement areas";
      forecasts: "Growth predictions";
      actions: "Required changes";
    };
  };
  monthly: {
    overview: {
      capacity: "Storage utilization";
      operations: "Usage statistics";
      costs: "Resource efficiency";
    };
    planning: {
      growth: "Scaling needs";
      improvements: "Optimization plans";
      risks: "Potential issues";
    };
  };
}
```

## 19. Story Upload Restrictions

### Story Cooldown System
```typescript
interface StoryCooldown {
  timeRestrictions: {
    uploadCooldown: {
      duration: "24 hours strict";
      start: "Last story upload timestamp";
      override: "No admin bypass allowed";
      timezone: "UTC standardization";
    };
    autoDeletion: {
      trigger: "24 hours after upload";
      grace: "No extension allowed";
      process: "Automatic background job";
      notification: "15min before deletion";
    };
  };

  userControls: {
    allowed: {
      delete: "Manual deletion anytime";
      view: "Story stats & metrics";
      track: "Remaining time check";
    };
    restricted: {
      upload: "During 24h cooldown";
      extend: "No duration extension";
      restore: "No deleted story recovery";
    };
  };
}
```

### Cooldown Implementation
```typescript
interface CooldownTracking {
  userState: {
    lastUpload: {
      timestamp: "UTC timestamp";
      tracking: "Per user tracking";
      storage: "Redis + Database";
      validation: "Multi-layer check";
    };
    currentStory: {
      status: "active | deleted | none";
      expiresAt: "24h from upload";
      deleteJob: "Scheduled task ID";
    };
  };

  validation: {
    preUpload: {
      cooldownCheck: "Verify 24h elapsed";
      activeCheck: "No existing story";
      userStatus: "Account validation";
    };
    enforcement: {
      strict: "No override options";
      batching: "No multi-upload";
      bypass: "No special cases";
    };
  };
}
```

### Deletion Management
```typescript
interface DeletionSystem {
  automatic: {
    scheduler: {
      timing: "24h from upload";
      precision: "Minute-level accuracy";
      batching: "Group by expiration";
    };
    process: {
      cleanup: "Storage reclamation";
      logging: "Deletion audit trail";
      notification: "User alert system";
    };
  };

  manual: {
    userControls: {
      trigger: "Delete button";
      confirmation: "Required prompt";
      immediate: "Instant removal";
    };
    processing: {
      storage: "Immediate cleanup";
      cache: "CDN invalidation";
      logging: "User-initiated flag";
    };
  };
}
```

### Error Prevention
```typescript
interface ErrorPrevention {
  uploadAttempts: {
    cooldownActive: {
      message: "Must wait 24h between stories";
      remaining: "Time until next upload";
      suggestion: "Delete current story first";
    };
    validation: {
      timestamp: "Server-side verification";
      consistency: "Cross-region check";
      integrity: "Database validation";
    };
  };

  raceConditions: {
    handling: {
      manualDelete: "Cancel auto-deletion job";
      autoDelete: "Clear user story state";
      upload: "Atomic state updates";
    };
    recovery: {
      inconsistency: "Auto-heal state";
      orphaned: "Cleanup job catch";
      mismatch: "State reconciliation";
    };
  };
}
```

## 20. User Interaction & Feedback

### Story Upload UI
```typescript
interface StoryUploadUI {
  statusChecks: {
    preUpload: {
      cooldownStatus: {
        active: "Show remaining time";
        inactive: "Show upload button";
        format: "Hours:Minutes:Seconds";
      };
      existingStory: {
        present: "Show current story";
        deleteOption: "Option to delete";
        timeLeft: "Show expiry countdown";
      };
    };
    feedback: {
      blocked: {
        message: "Next story available in ${timeLeft}";
        action: "View current story";
        hint: "Delete current to upload new";
      };
      allowed: {
        message: "Upload new story";
        warning: "24h cooldown after upload";
        hint: "Can delete anytime";
      };
    };
  };

  progressTracking: {
    storyLife: {
      total: "24 hour countdown";
      remaining: "Time until auto-delete";
      alerts: ["12h left", "1h left", "15min left"];
    };
    cooldown: {
      total: "24 hour restriction";
      remaining: "Time until next upload";
      alerts: ["12h left", "1h left", "15min left"];
    };
  };
}
```

## 21. Story Social Interactions

### Like System
```typescript
interface StoryLikeSystem {
  features: {
    persistence: {
      type: "Permanent storage";
      duration: "Retained after story expiry";
      storage: "PostgreSQL + Redis cache";
    };
    operations: {
      toggle: "Like/unlike action";
      count: "Real-time counter";
      status: "User like status";
    };
    analytics: {
      tracking: "Like patterns";
      metrics: "Engagement stats";
      trending: "Popular stories";
    };
  };

  implementation: {
    storage: {
      primary: {
        table: "story_likes";
        fields: ["story_id", "user_id", "created_at"];
        indexes: ["user_id", "story_id"];
      };
      cache: {
        key: "story:{id}:likes";
        ttl: "7 days";
        structure: "Sorted set";
      };
    };
    queries: {
      optimization: {
        batching: "Bulk like operations";
        caching: "Cached like counts";
        prefetch: "Popular stories";
      };
    };
  };
}
```

### Comment System
```typescript
interface StoryCommentSystem {
  features: {
    commenting: {
      enabled: "Always active";
      format: "Rich text support";
      threading: "Nested replies";
      editing: "Edit own comments";
    };
    moderation: {
      filters: "Auto content filter";
      reports: "User reporting";
      actions: "Mod controls";
    };
    notifications: {
      mentions: "@username mentions";
      replies: "Reply notifications";
      likes: "Comment like alerts";
    };
  };

  storage: {
    database: {
      table: "story_comments";
      fields: [
        "id",
        "story_id",
        "user_id",
        "parent_id",
        "content",
        "created_at"
      ];
      indexes: [
        "story_id",
        "user_id",
        "parent_id"
      ];
    };
    caching: {
      keys: {
        comments: "story:{id}:comments";
        count: "story:{id}:comment_count";
      };
      strategy: "Write-through";
      invalidation: "Selective update";
    };
  };

  operations: {
    create: {
      validation: "Content rules";
      notification: "Author alert";
      indexing: "Search update";
    };
    reply: {
      threading: "3 levels max";
      notification: "Parent alert";
      validation: "Reply rules";
    };
    delete: {
      permission: "Own or mod only";
      cascade: "Delete replies";
      cleanup: "Update counts";
    };
  };
}
```

### Text Formatting
```typescript
interface StoryTextFormat {
  formatting: {
    text: {
      bold: "**text**";
      italic: "*text*";
      heading: "# text";
      link: "[text](url)";
    };
    validation: {
      maxLength: "500 characters";
      urlCheck: "Safe links only";
      sanitize: "HTML escape";
    };
    storage: {
      format: "Markdown";
      render: "HTML output";
      cache: "Rendered content";
    };
  };

  editor: {
    toolbar: {
      basic: ["bold", "italic", "heading"];
      insert: ["link", "mention"];
      actions: ["undo", "redo"];
    };
    preview: {
      realtime: "Live preview";
      sanitized: "Safe rendering";
      responsive: "Mobile ready";
    };
  };

  rendering: {
    pipeline: {
      parse: "Markdown parsing";
      sanitize: "XSS prevention";
      format: "HTML output";
      cache: "Result caching";
    };
    optimization: {
      prerender: "Common formats";
      cache: "Rendered HTML";
      update: "Selective refresh";
    };
  };
}
```

### Social Integration
```typescript
interface StorySocialFeatures {
  engagement: {
    metrics: {
      likes: "Total likes count";
      comments: "Comment count";
      shares: "Share count";
      views: "View analytics";
    };
    tracking: {
      trending: "Popular stories";
      engagement: "User interaction";
      retention: "View duration";
    };
  };

  notifications: {
    triggers: {
      like: "New story like";
      comment: "New comment/reply";
      mention: "@username tag";
    };
    delivery: {
      push: "Push notification";
      inApp: "App notification";
      email: "Email digest";
    };
  };

  discovery: {
    feeds: {
      timeline: "User timeline";
      explore: "Trending stories";
      following: "Following feed";
    };
    algorithms: {
      ranking: "Engagement based";
      filtering: "User preferences";
      personalization: "Interest match";
    };
  };
}
```

### Performance Optimization
```typescript
interface SocialPerformance {
  caching: {
    likes: {
      counter: "Redis counter";
      status: "User like status";
      lists: "Liked by users";
    };
    comments: {
      recent: "Latest comments";
      counts: "Comment totals";
      popular: "Top comments";
    };
    content: {
      rendered: "Formatted text";
      media: "CDN cached";
      metadata: "Story info";
    };
  };

  realtime: {
    websocket: {
      likes: "Like updates";
      comments: "New comments";
      presence: "Viewing users";
    };
    optimization: {
      batching: "Grouped updates";
      debouncing: "Rate limiting";
      compression: "Data minimization";
    };
  };

  scaling: {
    database: {
      sharding: "User-based shards";
      replicas: "Read replicas";
      indexes: "Optimized queries";
    };
    caching: {
      layers: "Multi-level cache";
      strategy: "Write-through";
      eviction: "LRU policy";
    };
  };
}
```

## 22. Social Feature Resource Management

### Storage Impact Analysis
```typescript
interface SocialStorageImpact {
  likes: {
    storage: {
      record: {
        size: "~20 bytes per like";
        fields: ["story_id", "user_id", "timestamp"];
        indexing: "~10 bytes overhead";
      };
      calculation: {
        daily: "~100K likes × 30 bytes = 3MB/day";
        monthly: "~90MB/month";
        retention: "Permanent storage";
      };
    };
    operations: {
      writes: "100K/day estimated";
      reads: "1M/day estimated";
      cleanup: "None (permanent)";
    };
  };

  comments: {
    storage: {
      record: {
        size: "~500 bytes per comment";
        fields: ["text", "metadata", "relations"];
        indexing: "~50 bytes overhead";
      };
      calculation: {
        daily: "~50K comments × 550 bytes = 27.5MB/day";
        monthly: "~825MB/month";
        retention: "90 days";
      };
    };
    operations: {
      writes: "50K/day estimated";
      reads: "500K/day estimated";
      cleanup: "Automated 90-day purge";
    };
  };

  formatted_text: {
    storage: {
      record: {
        size: "~1KB per story text";
        cache: "~500 bytes rendered HTML";
        metadata: "~100 bytes formatting";
      };
      calculation: {
        daily: "~10K stories × 1.6KB = 16MB/day";
        monthly: "~480MB/month";
        retention: "24 hours";
      };
    };
    operations: {
      writes: "10K/day estimated";
      reads: "100K/day estimated";
      cleanup: "24-hour auto-delete";
    };
  };
}
```

### Operation Budget Distribution
```typescript
interface OperationBudget {
  cloudflareR2: {
    account1: {
      photos: "70% allocation";
      likes: "15% allocation";
      comments: "15% allocation";
      monthly: {
        total: "1M operations";
        available: {
          photos: "700K ops";
          social: "300K ops";
        };
      };
    };
    account2: {
      stories: "60% allocation";
      likes: "20% allocation";
      comments: "20% allocation";
      monthly: {
        total: "1M operations";
        available: {
          stories: "600K ops";
          social: "400K ops";
        };
      };
    };
  };

  optimizations: {
    caching: {
      likes: {
        strategy: "Heavy caching";
        duration: "1 hour cache";
        invalidation: "Selective update";
      };
      comments: {
        strategy: "Progressive loading";
        pagination: "20 comments/page";
        caching: "5 minute cache";
      };
      text: {
        strategy: "Render caching";
        duration: "Story lifetime";
        purge: "On story delete";
      };
    };
    batching: {
      likes: {
        grouping: "100 likes/batch";
        frequency: "Every 5 minutes";
        priority: "Low priority";
      };
      comments: {
        grouping: "50 comments/batch";
        frequency: "Every 2 minutes";
        priority: "Medium priority";
      };
      cleanup: {
        grouping: "1000 records/batch";
        frequency: "Daily off-peak";
        priority: "Low priority";
      };
    };
  };
}
```

### Resource Monitoring
```typescript
interface ResourceTracking {
  metrics: {
    storage: {
      total: "Current total usage";
      breakdown: {
        photos: "Profile photo size";
        stories: "Story size";
        social: "Social data size";
      };
      trending: "Growth patterns";
    };
    operations: {
      daily: {
        likes: "Like operation count";
        comments: "Comment operation count";
        cleanup: "Cleanup operation count";
      };
      monthly: {
        tracking: "Usage vs. limits";
        forecast: "Projected usage";
        optimization: "Efficiency metrics";
      };
    };
  };

  alerts: {
    storage: {
      warning: "> 70% capacity";
      critical: "> 90% capacity";
      trend: "Unusual growth";
    };
    operations: {
      warning: "> 70% monthly limit";
      critical: "> 90% monthly limit";
      spike: "Abnormal activity";
    };
  };

  reporting: {
    daily: {
      usage: "Usage breakdown";
      trends: "Pattern analysis";
      issues: "Problem areas";
    };
    monthly: {
      summary: "Usage overview";
      recommendations: "Optimization suggestions";
      planning: "Capacity planning";
    };
  };
}
```

## 23. Story Lifetime Management

### Story Deletion Strategy
```typescript
interface StoryDeletionFlow {
  cascade: {
    story: {
      content: "Story content deletion";
      media: "Associated photos";
      metadata: "Story information";
      status: "Mark as expired";
    };
    comments: {
      mainComments: "Delete all comments";
      replies: "Cascade delete replies";
      notifications: "Clear comment notifications";
      cleanup: "Remove comment metadata";
    };
    likes: {
      handling: "Preserve like records";
      aggregation: "Update user total likes";
      statistics: "Add to lifetime stats";
      archive: "Move to like history";
    };
  };

  permanent: {
    likes: {
      storage: {
        type: "Permanent storage";
        table: "story_likes_history";
        fields: [
          "story_id",
          "user_id",
          "created_at",
          "story_deletion_date"
        ];
      };
      aggregation: {
        userStats: "Update user like counts";
        storyStats: "Add to story metrics";
        analytics: "Update engagement data";
      };
    };
  };
}
```

### Comment Cleanup Process
```typescript
interface CommentCleanup {
  deletion: {
    trigger: "Story 24h expiration";
    process: "Batch deletion job";
    cascade: "Delete all nested replies";
    notification: "Notify active commenters";
  };

  cleanup: {
    data: {
      comments: "Remove comment content";
      media: "Delete comment attachments";
      mentions: "Clear mention records";
      reports: "Archive moderation reports";
    };
    notifications: {
      clear: "Remove comment notifications";
      inform: "Notify active participants";
      archive: "Store interaction history";
    };
  };

  optimization: {
    batch: {
      size: "1000 comments per batch";
      timing: "Off-peak execution";
      retries: "3 retry attempts";
    };
    monitoring: {
      progress: "Cleanup progress tracking";
      errors: "Failed deletion logging";
      metrics: "Storage space recovered";
    };
  };
}
```

### Like Preservation System
```typescript
interface LikePreservation {
  permanent: {
    storage: {
      mainTable: "story_likes_permanent";
      indexing: ["user_id", "story_id", "created_at"];
      partitioning: "By creation month";
      archival: "Compressed storage";
    };
    aggregation: {
      userMetrics: {
        totalLikes: "Lifetime likes given";
        likePatterns: "User engagement stats";
        preferences: "Content preferences";
      };
      storyMetrics: {
        totalLikes: "Story popularity score";
        engagementRate: "Like/view ratio";
        timeToLike: "Engagement speed";
      };
    };
  };

  analytics: {
    userEngagement: {
      patterns: "Like behavior analysis";
      frequency: "Like activity timing";
      interests: "Content preferences";
    };
    contentInsights: {
      popular: "Most-liked content";
      trending: "Like velocity stats";
      retention: "Engagement duration";
    };
  };
}
```

### Database Schema Updates
```typescript
interface DatabaseSchema {
  tables: {
    storyLikesPermanent: {
      fields: {
        id: "UUID primary key";
        storyId: "Story reference";
        userId: "User reference";
        createdAt: "Like timestamp";
        storyDeletedAt: "Story end timestamp";
      };
      indexes: {
        user: "User like history";
        story: "Story popularity";
        timing: "Temporal analysis";
      };
    };
    storyLikesMetrics: {
      fields: {
        userId: "User reference";
        totalLikes: "Lifetime likes count";
        monthlyLikes: "Monthly statistics";
        lastLiked: "Recent activity";
      };
      aggregation: {
        daily: "Daily totals";
        monthly: "Monthly summaries";
        yearly: "Annual statistics";
      };
    };
  };
}
```

### Operation Optimization
```typescript
interface OperationHandling {
  storyDeletion: {
    scheduling: {
      frequency: "Hourly cleanup jobs";
      batching: "Group by expiration";
      priority: "Background processing";
    };
    steps: {
      validate: "Verify expiration";
      backup: "Archive story data";
      delete: "Remove story content";
      cascade: "Clean related data";
      preserve: "Maintain like records";
    };
  };

  likeProcessing: {
    realtime: {
      count: "Update live counters";
      notify: "User notifications";
      cache: "Update like cache";
    };
    background: {
      aggregate: "Update metrics";
      analyze: "Process statistics";
      archive: "Store permanently";
    };
  };
}
```

## 24. Social Data Persistence Strategy

### Data Lifecycle Management
```typescript
interface DataPersistenceStrategy {
  storyContent: {
    temporary: {
      photo: {
        storage: "Cloudflare R2";
        duration: "24 hours maximum";
        cleanup: "Automatic deletion";
        trigger: "Time-based or manual";
      };
      text: {
        storage: "Database (temporary table)";
        duration: "24 hours maximum";
        cleanup: "Cascading deletion";
      };
    };
    comments: {
      temporary: {
        content: "Comment text & metadata";
        duration: "Deleted with story";
        cleanup: "Cascading deletion";
        notification: "Pre-deletion alert";
      };
      archival: {
        metrics: "Comment counts";
        analytics: "Engagement data";
        duration: "Permanent storage";
      };
    };
  };

  permanentData: {
    likes: {
      storage: {
        type: "PostgreSQL + Redis";
        table: "story_permanent_likes";
        indexes: ["user_id", "story_id", "timestamp"];
        fields: [
          "id: UUID",
          "story_id: UUID",
          "user_id: UUID",
          "created_at: timestamp",
          "story_deleted_at: timestamp"
        ];
      };
      metrics: {
        aggregation: "Real-time counters";
        analytics: "User engagement stats";
        trending: "Popular content tracking";
      };
    };
    engagement: {
      userStats: {
        totalLikes: "Lifetime like count";
        likedContent: "Content preferences";
        activityPatterns: "Usage analytics";
      };
      contentStats: {
        popularity: "Like metrics";
        engagement: "Interaction rates";
        trends: "Content performance";
      };
    };
  };
}
```

### Database Schema Optimization
```typescript
interface DatabaseOptimization {
  tables: {
    stories: {
      fields: {
        id: "UUID primary key";
        user_id: "User reference";
        content: "Story content/text";
        media_url: "Photo URL";
        created_at: "Creation timestamp";
        expires_at: "24h from creation";
        deleted_at: "Manual deletion time";
        status: "active | deleted | expired";
      };
      cleanup: {
        trigger: "Scheduled job";
        condition: "expires_at < now()";
        cascade: "Delete comments";
      };
    };
    storyComments: {
      fields: {
        id: "UUID primary key";
        story_id: "Story reference";
        user_id: "User reference";
        content: "Comment text";
        created_at: "Creation time";
        parent_id: "For replies";
      };
      cleanup: {
        trigger: "Story deletion";
        cascade: "true";
        archival: "Engagement metrics only";
      };
    };
    permanentLikes: {
      fields: {
        id: "UUID primary key";
        story_id: "Story reference";
        user_id: "User reference";
        created_at: "Like timestamp";
        story_deleted_at: "Story end time";
      };
      retention: {
        duration: "Permanent";
        archival: "No deletion";
        metrics: "Aggregate stats";
      };
    };
  };
}
```

### Cleanup Automation
```typescript
interface CleanupAutomation {
  storyDeletion: {
    scheduled: {
      frequency: "Every 5 minutes";
      target: "Expired stories";
      process: "Batch deletion";
      logging: "Deletion records";
    };
    manual: {
      trigger: "User deletion";
      immediate: "Process now";
      cascade: "Related data";
    };
  };

  dataRetention: {
    temporary: {
      photos: "24 hours in R2";
      comments: "With story deletion";
      notifications: "Clear on deletion";
    };
    permanent: {
      likes: "Never deleted";
      metrics: "Aggregate forever";
      analytics: "Historical data";
    };
  };

  monitoring: {
    cleanup: {
      success: "Deletion verification";
      failures: "Retry mechanism";
      orphaned: "Data consistency";
    };
    metrics: {
      timing: "Cleanup duration";
      volume: "Deleted records";
      efficiency: "Resource usage";
    };
  };
}
```

### Performance Optimization
```typescript
interface PerformanceStrategy {
  queries: {
    likes: {
      read: {
        caching: "Redis counters";
        batching: "Bulk operations";
        indexes: "Optimized lookup";
      };
      write: {
        queueing: "Write buffer";
        batching: "Grouped inserts";
        async: "Background processing";
      };
    };
    cleanup: {
      strategy: {
        partitioning: "Time-based shards";
        batching: "Bulk deletions";
        scheduling: "Off-peak hours";
      };
      optimization: {
        indexes: "Deletion efficiency";
        locks: "Minimal blocking";
        vacuum: "Space reclamation";
      };
    };
  };

  caching: {
    likes: {
      counter: "Redis increment";
      status: "User like state";
      expiry: "7 days cache";
    };
    metrics: {
      aggregates: "Hourly rollup";
      trends: "Daily analytics";
      cache: "1 hour TTL";
    };
  };
}
```

## 25. Real-time Social Interaction System

### Like Interaction Flow
```typescript
interface LikeSystem {
  realtime: {
    actions: {
      toggle: {
        frontend: "Optimistic update";
        websocket: "Pusher event";
        persistence: "Database write";
      };
      notification: {
        sender: "Like attribution";
        recipient: "Story author alert";
        aggregation: "Batch notifications";
      };
    };
    display: {
      counter: {
        redis: "Live counter update";
        debounce: "1000ms throttle";
        broadcast: "All viewers update";
      };
      animation: {
        trigger: "On like action";
        effect: "Heart animation";
        feedback: "Visual confirmation";
      };
    };
  };

  persistence: {
    operations: {
      write: {
        primary: "PostgreSQL insert";
        cache: "Redis increment";
        metrics: "Update analytics";
      };
      status: {
        check: "User like state";
        cache: "Redis bitmap";
        sync: "Background refresh";
      };
    };
  };
}
```

### Comment Interaction Flow
```typescript
interface CommentSystem {
  realtime: {
    creation: {
      submit: {
        validation: "Content check";
        persist: "Temporary storage";
        broadcast: "Live update";
      };
      display: {
        optimistic: "Instant show";
        pending: "Sync status";
        confirmed: "Server validated";
      };
    };
    interaction: {
      typing: {
        indicator: "User typing";
        timeout: "3s expiry";
        presence: "Active users";
      };
      replies: {
        threading: "Nested views";
        collapse: "Thread folding";
        navigation: "Jump to reply";
      };
    };
  };

  cleanup: {
    triggers: {
      storyDelete: "Cascade remove";
      timeExpiry: "24h deletion";
      userDelete: "Manual removal";
    };
    process: {
      order: "Bottom-up deletion";
      batching: "Group operations";
      notification: "Cleanup alert";
    };
  };
}
```

### Notification Management
```typescript
interface NotificationSystem {
  events: {
    likes: {
      single: "Individual like";
      batch: "Multiple likes";
      milestone: "Count thresholds";
    };
    comments: {
      new: "New comment";
      reply: "Thread response";
      mention: "@username tag";
    };
    story: {
      expiring: "15min warning";
      deleted: "Manual removal";
      archived: "24h expiry";
    };
  };

  delivery: {
    channels: {
      inApp: {
        toast: "Temporary alert";
        inbox: "Notification center";
        badge: "Unread counter";
      };
      push: {
        web: "Browser push";
        mobile: "Device notification";
        priority: "Importance level";
      };
    };
    batching: {
      strategy: "Group similar";
      frequency: "5min intervals";
      limit: "Max 3 per batch";
    };
  };
}
```

### Analytics Integration
```typescript
interface AnalyticsSystem {
  tracking: {
    engagement: {
      likes: {
        count: "Total interactions";
        timing: "Time patterns";
        users: "Unique engagers";
      };
      comments: {
        volume: "Comment count";
        depth: "Thread levels";
        quality: "Content length";
      };
    };
    retention: {
      stories: {
        views: "Watch duration";
        completion: "Full views";
        returns: "Repeat visits";
      };
      social: {
        interaction: "Action rate";
        sharing: "Viral factor";
        stickiness: "Return rate";
      };
    };
  };

  reporting: {
    metrics: {
      realtime: {
        active: "Current viewers";
        engagement: "Live actions";
        trending: "Hot content";
      };
      aggregate: {
        daily: "24h summary";
        weekly: "7-day trends";
        monthly: "Growth patterns";
      };
    };
    insights: {
      content: {
        popular: "Top stories";
        engagement: "Best times";
        audience: "User segments";
      };
      behavior: {
        patterns: "Usage flows";
        preferences: "Content types";
        retention: "Return factors";
      };
    };
  };
}
```

## 26. Role-Based Access Control (RBAC)

### Access Role Hierarchy
```typescript
interface RoleHierarchy {
  roles: {
    superAdmin: {
      level: "Highest";
      inherit: "All permissions";
      scope: "Global system access";
    };
    instituteAdmin: {
      level: "High";
      inherit: ["moderator"];
      scope: "Institution-wide";
    };
    moderator: {
      level: "Medium";
      inherit: ["user"];
      scope: "Content moderation";
    };
    user: {
      level: "Basic";
      inherit: [];
      scope: "Self content";
    };
    guest: {
      level: "Minimal";
      inherit: [];
      scope: "Public content only";
    };
  };
}
```

### Permission Matrix
```typescript
interface PermissionMatrix {
  profilePhotos: {
    upload: {
      self: ["user", "moderator", "instituteAdmin", "superAdmin"];
      others: ["superAdmin"];
    };
    delete: {
      self: ["user", "moderator", "instituteAdmin", "superAdmin"];
      others: ["moderator", "instituteAdmin", "superAdmin"];
    };
    view: {
      public: ["guest", "user", "moderator", "instituteAdmin", "superAdmin"];
      private: ["self", "moderator", "instituteAdmin", "superAdmin"];
    };
  };

  stories: {
    upload: {
      self: ["user", "moderator", "instituteAdmin", "superAdmin"];
      others: ["superAdmin"];
    };
    delete: {
      self: ["user", "moderator", "instituteAdmin", "superAdmin"];
      others: ["moderator", "instituteAdmin", "superAdmin"];
    };
    comment: {
      create: ["user", "moderator", "instituteAdmin", "superAdmin"];
      delete: {
        own: ["user", "moderator", "instituteAdmin", "superAdmin"];
        others: ["moderator", "instituteAdmin", "superAdmin"];
      };
    };
    like: {
      toggle: ["user", "moderator", "instituteAdmin", "superAdmin"];
      view: ["guest", "user", "moderator", "instituteAdmin", "superAdmin"];
    };
  };
}
```

### Operation Restrictions
```typescript
interface OperationRestrictions {
  rateLimit: {
    profiles: {
      user: "1 update/24h";
      moderator: "5 updates/24h";
      admin: "Unlimited";
    };
    stories: {
      user: "1 story/24h";
      moderator: "5 stories/24h";
      admin: "10 stories/24h";
    };
    comments: {
      user: "30/hour";
      moderator: "100/hour";
      admin: "Unlimited";
    };
  };

  contentModeration: {
    automated: {
      basic: ["profanity", "spam", "abuse"];
      advanced: ["AI detection", "duplicate check"];
    };
    manual: {
      user: "Report content";
      moderator: "Review & action";
      admin: "Policy enforcement";
    };
  };
}
```

### Access Control Implementation
```typescript
interface AccessControl {
  verification: {
    authentication: {
      jwt: "Token validation";
      session: "Active session check";
      mfa: "Required for sensitive ops";
    };
    authorization: {
      role: "Role-based checks";
      scope: "Operation scope validation";
      ownership: "Resource ownership verification";
    };
  };

  enforcement: {
    middleware: {
      routes: "Route protection";
      operations: "Action validation";
      resources: "Resource access control";
    };
    caching: {
      permissions: "Redis cached roles";
      invalidation: "Role update triggers";
      ttl: "15 minutes cache";
    };
  };

  auditing: {
    logging: {
      access: "Access attempts";
      changes: "Permission changes";
      violations: "Security incidents";
    };
    monitoring: {
      patterns: "Access patterns";
      anomalies: "Unusual activity";
      breaches: "Security breaches";
    };
  };
}
```

### Role Transitions
```typescript
interface RoleTransitions {
  elevation: {
    temporary: {
      duration: "Time-limited access";
      approval: "Multi-level authorization";
      logging: "Audit trail required";
    };
    permanent: {
      process: "Formal review required";
      approval: "Admin authorization";
      notification: "All stakeholders";
    };
  };

  revocation: {
    automatic: {
      trigger: "Policy violation";
      timeout: "Temporary elevation expiry";
      inactivity: "Extended non-usage";
    };
    manual: {
      process: "Admin initiated";
      notification: "User notification";
      appeal: "Appeal process";
    };
  };
}