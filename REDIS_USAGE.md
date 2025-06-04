# Redis Usage in Main Next.js App

Your Redis is already configured in Docker and Socket.IO server. Here's how to use it in your main Next.js app:

## Quick Start

```typescript
import { setCache, getCache, cacheOrFetch, checkRateLimit } from '@/lib/redis'

// 1. Basic caching
await setCache('user:123', { name: 'John', email: 'john@example.com' }, 3600)
const user = await getCache('user:123')

// 2. Cache with automatic fetch
const posts = await cacheOrFetch(
  'posts:recent',
  async () => {
    // Your database query here
    return await db.posts.findMany({ take: 10 })
  },
  300 // 5 minutes
)

// 3. Rate limiting
const rateLimit = await checkRateLimit('user:123', 100, 3600) // 100 requests per hour
if (!rateLimit.allowed) {
  throw new Error('Rate limit exceeded')
}
```

## Environment Variables

Add to your `.env.local`:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_password_if_any
```

## Use Cases in Your App

### 1. API Routes
```typescript
// app/api/courses/route.ts
export async function GET() {
  const courses = await cacheOrFetch(
    'courses:featured',
    async () => await fetchCoursesFromDB(),
    600 // 10 minutes
  )
  return NextResponse.json(courses)
}
```

### 2. Server Components
```typescript
// app/dashboard/page.tsx
import { cacheOrFetch } from '@/lib/redis'

export default async function Dashboard() {
  const stats = await cacheOrFetch(
    'dashboard:stats',
    async () => await getDashboardStats(),
    300
  )
  
  return <div>{/* Your dashboard */}</div>
}
```

### 3. Authentication
```typescript
// app/api/auth/login/route.ts
export async function POST(request: NextRequest) {
  const clientIp = request.headers.get('x-forwarded-for') || 'anonymous'
  
  const rateLimit = await checkRateLimit(`login:${clientIp}`, 5, 900) // 5 attempts per 15 min
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 })
  }
  
  // Your login logic
}
```

### 4. Session Storage
```typescript
// Store session data
await setCache(`session:${sessionId}`, {
  userId: user.id,
  permissions: user.permissions,
  lastActivity: Date.now()
}, 86400) // 24 hours

// Get session data
const session = await getCache(`session:${sessionId}`)
```

## Key Features

- ✅ **Simple**: Just import and use
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Error handling**: Graceful fallbacks
- ✅ **Logging**: Integrated with your app logger
- ✅ **Rate limiting**: Built-in rate limiting helper
- ✅ **TTL support**: Automatic expiration
- ✅ **JSON serialization**: Handles objects automatically

## Testing

Visit `/api/example-redis` to test the Redis integration:
- GET: Tests caching and cache-or-fetch
- POST: Tests rate limiting and data storage
