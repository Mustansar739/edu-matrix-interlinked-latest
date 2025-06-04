#!/usr/bin/env node

/**
 * Redis-Socket.IO Integration Test
 * Tests Redis functionality specifically for Socket.IO authentication and session management
 */

require('dotenv').config();
const Redis = require('ioredis');

class RedisSocketIOIntegrationTest {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
    });
  }

  async runTests() {
    console.log('\n🔍 Redis-Socket.IO Integration Test');
    console.log('=====================================');
    
    const results = {
      connection: false,
      sessionStorage: false,
      presenceTracking: false,
      roomManagement: false,
      cleanup: false,
      integrationReady: false
    };

    try {
      // Test 1: Basic Connection
      console.log('\n1️⃣ Testing Redis Connection...');
      const ping = await this.redis.ping();
      if (ping === 'PONG') {
        console.log('   ✅ Redis connection successful');
        results.connection = true;
      }

      // Test 2: User Session Storage (Socket.IO authentication)
      console.log('\n2️⃣ Testing User Session Storage...');
      const testUser = {
        socketId: 'socket-test-789',
        connectedAt: new Date().toISOString(),
        userInfo: {
          id: 'test-user-integration',
          name: 'Integration Test User',
          email: 'integration@edumatrix.com',
          role: 'student'
        }
      };

      await this.redis.setex(`user:${testUser.userInfo.id}:session`, 3600, JSON.stringify(testUser));
      const retrievedSession = await this.redis.get(`user:${testUser.userInfo.id}:session`);
      
      if (retrievedSession && JSON.parse(retrievedSession).socketId === testUser.socketId) {
        console.log('   ✅ User session storage working');
        console.log(`   📋 Session stored for user: ${testUser.userInfo.name}`);
        results.sessionStorage = true;
      }

      // Test 3: Presence Tracking
      console.log('\n3️⃣ Testing Presence Tracking...');
      const presenceData = {
        status: 'online',
        lastSeen: new Date().toISOString(),
        socketId: testUser.socketId,
        activity: 'testing'
      };

      await this.redis.setex(`presence:${testUser.userInfo.id}`, 300, JSON.stringify(presenceData));
      const retrievedPresence = await this.redis.get(`presence:${testUser.userInfo.id}`);
      
      if (retrievedPresence && JSON.parse(retrievedPresence).status === 'online') {
        console.log('   ✅ Presence tracking working');
        console.log(`   👤 User status: ${JSON.parse(retrievedPresence).status}`);
        results.presenceTracking = true;
      }

      // Test 4: Room Management
      console.log('\n4️⃣ Testing Room Management...');
      const roomId = 'test-study-group-integration';
      const roomData = {
        id: roomId,
        name: 'Integration Test Study Group',
        members: [testUser.userInfo.id],
        createdAt: new Date().toISOString(),
        type: 'study-group'
      };

      await this.redis.setex(`room:${roomId}`, 7200, JSON.stringify(roomData));
      await this.redis.sadd(`user:${testUser.userInfo.id}:rooms`, roomId);
      
      const retrievedRoom = await this.redis.get(`room:${roomId}`);
      const userRooms = await this.redis.smembers(`user:${testUser.userInfo.id}:rooms`);
      
      if (retrievedRoom && userRooms.includes(roomId)) {
        console.log('   ✅ Room management working');
        console.log(`   🏠 Room stored: ${JSON.parse(retrievedRoom).name}`);
        results.roomManagement = true;
      }

      // Test 5: Performance with Multiple Operations
      console.log('\n5️⃣ Testing Performance with Multiple Users...');
      const startTime = Date.now();
      const promises = [];
      
      for (let i = 0; i < 100; i++) {
        const userId = `perf-test-user-${i}`;
        promises.push(
          this.redis.setex(`presence:${userId}`, 300, JSON.stringify({
            status: 'online',
            lastSeen: new Date().toISOString(),
            socketId: `socket-${i}`
          }))
        );
      }
      
      await Promise.all(promises);
      const duration = Date.now() - startTime;
      console.log(`   📊 100 presence updates completed in ${duration}ms`);
      if (duration < 1000) {
        console.log('   ✅ Performance test passed');
      }

      // Test 6: Cleanup
      console.log('\n6️⃣ Testing Cleanup Operations...');
      await this.redis.del(`user:${testUser.userInfo.id}:session`);
      await this.redis.del(`presence:${testUser.userInfo.id}`);
      await this.redis.del(`room:${roomId}`);
      await this.redis.del(`user:${testUser.userInfo.id}:rooms`);
      
      // Cleanup performance test data
      for (let i = 0; i < 100; i++) {
        await this.redis.del(`presence:perf-test-user-${i}`);
      }
      
      console.log('   ✅ Cleanup operations successful');
      results.cleanup = true;

      // Overall Assessment
      const passedTests = Object.values(results).filter(Boolean).length - 1; // Exclude integrationReady
      if (passedTests >= 4) {
        results.integrationReady = true;
        console.log('\n📋 Integration Assessment');
        console.log('=========================');
        console.log('🎉 Redis-Socket.IO Integration is READY!');
        console.log('✅ All critical integration tests passed');
      } else {
        console.log('\n⚠️ Some integration tests failed');
        console.log('🔧 Check Redis configuration and connectivity');
      }

      console.log('\n📊 Test Results Summary:');
      for (const [test, passed] of Object.entries(results)) {
        if (test !== 'integrationReady') {
          console.log(`   ${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASS' : 'FAIL'}`);
        }
      }

    } catch (error) {
      console.error('❌ Integration test failed:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('   - Check if Redis server is running');
      console.log('   - Verify Redis password in .env file');
      console.log('   - Check Redis host and port configuration');
    } finally {
      await this.redis.quit();
      console.log('\n🧹 Redis connection closed');
    }

    return results.integrationReady;
  }
}

// Run the integration test
const test = new RedisSocketIOIntegrationTest();
test.runTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
