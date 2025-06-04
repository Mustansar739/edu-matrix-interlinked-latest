# Schema Management System - Edu Matrix Hub

## Overview
The Schema Management System is a core component of Edu Matrix Hub that enables automated multi-tenant database management. Each institution gets its own isolated schema with proper security boundaries, monitoring, and maintenance capabilities.

## System Architecture

### 1. Database Models

#### TenantSchema
```prisma
model TenantSchema {
  id            String          @id @default(uuid())
  institutionId String          @unique
  schemaName    String          @unique // Format: inst_{institution_id}
  status        SchemaStatus    @default(ACTIVE)
  config        Json            // Tenant-specific configuration
  version       Int             @default(1)
  tableCount    Int             @default(0)
  storageUsed   BigInt         @default(0)
  quotaLimit    BigInt         // Storage quota in bytes
  lastOptimized DateTime?
  lastBackup    DateTime?
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}
```

#### SchemaOperation
```prisma
model SchemaOperation {
  id          String           @id @default(uuid())
  schemaId    String
  type        OperationType
  status      OperationStatus  @default(PENDING)
  description String
  metadata    Json?
  error       String?
  startedAt   DateTime?
  completedAt DateTime?
  duration    Int?            // In milliseconds
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
}
```

### 2. Database Functions

#### Schema Creation
The system uses PostgreSQL functions for schema operations:

```sql
edu_matrix_hub_schema.create_institution_schema(
  institution_id UUID,
  schema_name TEXT
) RETURNS TABLE (
  status TEXT,
  message TEXT,
  schema_id UUID
)
```

Features:
- Validates schema name format
- Checks institution existence
- Creates new schema
- Sets up registry entry
- Applies RLS policies
- Logs operation

#### Schema Deletion
```sql
edu_matrix_hub_schema.drop_institution_schema(
  schema_id UUID
) RETURNS TABLE (
  status TEXT,
  message TEXT
)
```

Features:
- Validates schema status
- Creates backup before dropping
- Updates registry
- Logs operation

#### Schema Backup
```sql
edu_matrix_hub_schema.backup_institution_schema(
  schema_id UUID
) RETURNS TABLE (
  status TEXT,
  message TEXT
)
```

Features:
- Creates timestamped backup
- Copies schema structure and data
- Updates backup timestamp
- Logs operation

## Implementation Guide

### 1. Database Setup

1. Create the schema registry:
   ```sql
   CREATE SCHEMA edu_matrix_hub_schema;
   ```

2. Apply necessary permissions:
   ```sql
   GRANT USAGE ON SCHEMA edu_matrix_hub_schema TO edu_matrix_admin;
   ```

3. Create required functions (see SQL Functions section)

### 2. Service Layer Implementation

Create SchemaManagementService:

```typescript
class SchemaManagementService {
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createInstitutionSchema(institutionId: string) {
    // Implementation
  }

  async dropInstitutionSchema(schemaId: string) {
    // Implementation
  }

  async backupInstitutionSchema(schemaId: string) {
    // Implementation
  }

  // Additional methods
}
```

### 3. API Layer Implementation

Create API routes under `/api/admin/schemas`:

1. **POST** - Create schema
2. **DELETE** - Drop schema
3. **GET** - List schemas
4. **PATCH** - Perform operations

### 4. Frontend Implementation

1. Create React hook:
```typescript
function useSchemaManagement(institutionId: string) {
  // Implementation returning:
  // - schemas
  // - loading state
  // - CRUD operations
  // - maintenance functions
}
```

2. Create UI component:
```typescript
function SchemaManagement({ institutionId }: Props) {
  // Implementation with:
  // - Schema list
  // - Action buttons
  // - Status indicators
  // - Usage monitoring
}
```

## Security Considerations

1. **Schema Isolation**
   - Each institution gets dedicated schema
   - RLS policies prevent cross-schema access
   - Quota enforcement per schema

2. **Operation Safety**
   - Automatic backups before destructive operations
   - Operation logging
   - Status tracking
   - Error handling

3. **Access Control**
   - Admin-only schema management
   - Operation-level permissions
   - Audit trail for all actions

## Usage Examples

### 1. Creating New Institution Schema

```typescript
// When new institution is created
const schemaService = new SchemaManagementService(prisma);
await schemaService.createInstitutionSchema(institution.id);
```

### 2. Managing Schemas

```typescript
// In admin dashboard
<SchemaManagement institutionId={currentInstitution.id} />
```

### 3. Schema Operations

```typescript
const { backupSchema, optimizeSchema } = useSchemaManagement(institutionId);

// Create backup
await backupSchema(schemaId);

// Optimize schema
await optimizeSchema(schemaId);
```

## Maintenance Operations

### 1. Regular Backups
- Automated daily backups
- Retention policy management
- Backup verification

### 2. Performance Optimization
- Regular VACUUM ANALYZE
- Index maintenance
- Storage cleanup

### 3. Monitoring
- Storage usage tracking
- Performance metrics
- Operation logs

## Error Handling

1. **Operation Failures**
   - Automatic rollback
   - Error logging
   - User notification
   - Retry mechanisms

2. **Resource Limits**
   - Quota monitoring
   - Usage alerts
   - Automatic suspension

3. **System Issues**
   - Connection handling
   - Timeout management
   - Failover procedures

## Best Practices

1. **Schema Naming**
   - Use consistent format: `inst_{institution_id}`
   - Validate names before creation
   - Handle collisions

2. **Operation Management**
   - Log all operations
   - Include operation metadata
   - Track timing and duration
   - Handle long-running operations

3. **Resource Management**
   - Monitor storage usage
   - Implement quotas
   - Regular optimization
   - Cleanup unused resources

## Integration Points

1. **Institution Management**
   - Automatic schema creation
   - Schema cleanup on deletion
   - Status synchronization

2. **Admin Dashboard**
   - Schema management UI
   - Usage monitoring
   - Operation controls

3. **Monitoring System**
   - Storage alerts
   - Performance metrics
   - Error reporting

## Development Workflow

1. **Setup Development Environment**
   ```bash
   # Install dependencies
   npm install

   # Run database migrations
   prisma migrate dev

   # Create schema functions
   psql -f sql/schema_management/create_institution_schema.sql
   ```

2. **Testing**
   - Unit tests for service layer
   - Integration tests for API
   - E2E tests for UI
   - Load tests for operations

3. **Deployment**
   - Database function deployment
   - Service deployment
   - UI deployment
   - Configuration updates

## Troubleshooting Guide

1. **Common Issues**
   - Schema creation failures
   - Backup errors
   - Performance problems
   - Access denied errors

2. **Resolution Steps**
   - Check operation logs
   - Verify permissions
   - Monitor resource usage
   - Review error messages

3. **Prevention**
   - Regular monitoring
   - Proactive maintenance
   - Resource planning
   - Security audits

## Migration Strategies

1. **Schema Updates**
   - Version tracking
   - Migration scripts
   - Rollback procedures
   - Data preservation

2. **System Updates**
   - Backward compatibility
   - Feature flags
   - Gradual rollout
   - Emergency rollback

## Performance Optimization

1. **Database Level**
   - Index optimization
   - Query tuning
   - Resource allocation
   - Connection pooling

2. **Application Level**
   - Caching strategies
   - Batch operations
   - Async processing
   - Resource cleanup

## Monitoring and Alerts

1. **System Health**
   - Schema status
   - Storage usage
   - Operation performance
   - Error rates

2. **Alert Conditions**
   - Storage quota near limit
   - Operation failures
   - Performance degradation
   - Security incidents

## Future Enhancements

1. **Automated Scaling**
   - Dynamic quota adjustment
   - Performance auto-tuning
   - Resource optimization

2. **Advanced Features**
   - Schema templating
   - Custom configurations
   - Advanced monitoring
   - Disaster recovery

3. **Integration Options**
   - External backup systems
   - Monitoring platforms
   - Security services
   - Analytics tools