# Kafka Usage Guide: Main App vs Socket.IO Server

## 🎯 **When to Use Kafka Where**

### **Socket.IO Server (Current Setup) ✅**
**Perfect for real-time events that need immediate delivery:**
- ✅ Chat messages
- ✅ Live notifications  
- ✅ User presence updates
- ✅ Real-time feeds
- ✅ Voice/video call events

### **Main App (New Setup) 🆕**
**Perfect for background processing and business events:**
- 🔄 **Background Jobs**: Email sending, file processing
- 📊 **Analytics**: User behavior tracking, metrics
- 🏢 **Business Events**: User registration, payments, enrollments
- 🔗 **Integrations**: Third-party API sync, webhooks
- 📝 **Audit Logs**: Security events, compliance tracking

## 🚀 **How to Use Kafka in Main App**

### 1. **Background Email Processing**
```typescript
import { queueEmail } from '@/lib/kafka'

// In your API route or server action
await queueEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  template: 'welcome',
  data: { name: 'John' }
})
```

### 2. **Business Event Publishing**
```typescript
import { publishBusinessEvent } from '@/lib/kafka'

// User registration
await publishBusinessEvent('user_registered', {
  userId: user.id,
  email: user.email,
  userType: 'student'
})

// Course enrollment
await publishBusinessEvent('course_enrolled', {
  userId: user.id,
  courseId: course.id,
  price: course.price
})
```

### 3. **Analytics Tracking**
```typescript
import { trackEvent } from '@/lib/kafka'

// Track user actions
await trackEvent({
  userId: user.id,
  event: 'course_viewed',
  properties: {
    courseId: course.id,
    category: course.category,
    source: 'search'
  }
})
```

### 4. **Audit Logging**
```typescript
import { logAudit } from '@/lib/kafka'

// Log important actions
await logAudit({
  userId: user.id,
  action: 'profile_updated',
  resource: 'user',
  details: { fields: ['email', 'name'] }
})
```

### 5. **Notification Queue**
```typescript
import { queueNotification } from '@/lib/kafka'

// Queue notification for background processing
await queueNotification({
  userId: user.id,
  type: 'course_reminder',
  title: 'Class Starting Soon',
  message: 'Your class starts in 15 minutes'
})
```

## 🔧 **Environment Setup**

Add to your `.env.local`:
```env
KAFKA_BROKERS=localhost:29092
```

## 🏗️ **Complete Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Main App      │    │   Socket.IO     │    │     Kafka       │
│   (Next.js)     │    │    Server       │    │   (Docker)      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ Business Events │───▶│ Real-time Events│───▶│ All Events      │
│ Background Jobs │───▶│ Chat Messages   │───▶│ Message Broker  │
│ Analytics       │───▶│ Notifications   │───▶│ Event Store     │
│ Integrations    │───▶│ Live Updates    │───▶│ Stream Process  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📝 **Real Example Usage in Your App**

### User Registration Flow:
```typescript
// app/api/auth/register/route.ts
import { publishBusinessEvent, queueEmail, logAudit } from '@/lib/kafka'

export async function POST(request: NextRequest) {
  // Create user in database
  const user = await createUser(userData)
  
  // Publish business event (for analytics, integrations)
  await publishBusinessEvent('user_registered', {
    userId: user.id,
    email: user.email,
    userType: user.role
  })
  
  // Queue welcome email (background processing)
  await queueEmail({
    to: user.email,
    subject: 'Welcome to Edu Matrix!',
    template: 'welcome',
    data: { name: user.name }
  })
  
  // Log audit trail
  await logAudit({
    userId: user.id,
    action: 'user_registered',
    resource: 'user',
    details: { email: user.email }
  })
  
  return NextResponse.json({ success: true })
}
```

### Course Purchase Flow:
```typescript
// app/api/courses/purchase/route.ts
import { publishBusinessEvent, queueEmail } from '@/lib/kafka'

export async function POST(request: NextRequest) {
  // Process payment
  const payment = await processPayment(paymentData)
  
  // Enroll user in course
  const enrollment = await enrollUser(userId, courseId)
  
  // Publish business events
  await publishBusinessEvent('payment_completed', {
    userId,
    paymentId: payment.id,
    amount: payment.amount
  })
  
  await publishBusinessEvent('course_enrolled', {
    userId,
    courseId,
    enrollmentDate: new Date()
  })
  
  // Queue confirmation email
  await queueEmail({
    to: user.email,
    subject: 'Course Access Granted!',
    template: 'course_access',
    data: { courseName: course.name }
  })
}
```

## 🔄 **Event Processing Workers**

You can create background workers to process Kafka events:

```typescript
// scripts/kafka-worker.ts
import { consumer, KAFKA_TOPICS } from '@/lib/kafka'

async function startEmailWorker() {
  await consumer.subscribe({ topics: [KAFKA_TOPICS.EMAIL_QUEUE] })
  
  await consumer.run({
    eachMessage: async ({ message }) => {
      const emailData = JSON.parse(message.value.toString())
      
      // Process email
      await sendEmail(emailData)
    }
  })
}
```

## ✅ **Summary: Your Perfect Setup**

1. **Socket.IO Server**: Handles real-time events (chat, notifications, live updates)
2. **Main App**: Handles business events (registrations, payments, analytics)
3. **Kafka**: Central event hub connecting everything
4. **Background Workers**: Process queued events asynchronously

This gives you:
- 🚀 **Real-time features** via Socket.IO
- 🔄 **Reliable background processing** via Kafka
- 📊 **Event-driven architecture** for scalability
- 🔍 **Complete audit trail** for compliance
- 📈 **Analytics pipeline** for insights

**Test it**: Visit `/api/kafka-example` to see Kafka in action!
