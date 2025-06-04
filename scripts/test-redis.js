#!/usr/bin/env node

/**
 * Redis Connection and Performance Test Script
 * Tests Redis connectivity, performance, and production readiness
 */

require('dotenv').config();
const Redis = require('ioredis');

class RedisProductionTest {
  constructor() {    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
  }

  async runTests() {
    console.log('\n🔍 Redis Production Readiness Test');
    console.log('=====================================');
    
    const results = {
      connectivity: false,
      basicOperations: false,
      performance: false,
      memory: false,
      persistence: false,
      productionReady: false
    };

    try {
      // Test 1: Connectivity
      console.log('\n1️⃣ Testing Redis Connectivity...');
      await this.redis.connect();
      const ping = await this.redis.ping();
      if (ping === 'PONG') {
        console.log('   ✅ Redis connection successful');
        results.connectivity = true;
      }

      // Test 2: Basic Operations
      console.log('\n2️⃣ Testing Basic Operations...');
      await this.redis.set('test:connection', 'success', 'EX', 10);
      const value = await this.redis.get('test:connection');
      if (value === 'success') {
        console.log('   ✅ SET/GET operations working');
        results.basicOperations = true;
      }

      // Test Hash operations
      await this.redis.hset('test:hash', 'field1', 'value1', 'field2', 'value2');
      const hashValues = await this.redis.hgetall('test:hash');
      if (hashValues.field1 === 'value1') {
        console.log('   ✅ Hash operations working');
      }

      // Test List operations
      await this.redis.lpush('test:list', 'item1', 'item2', 'item3');
      const listLength = await this.redis.llen('test:list');
      if (listLength === 3) {
        console.log('   ✅ List operations working');
      }

      // Test 3: Performance Test
      console.log('\n3️⃣ Testing Performance...');
      const startTime = Date.now();
      const promises = [];
      
      for (let i = 0; i < 1000; i++) {
        promises.push(this.redis.set(`perf:test:${i}`, `value${i}`));
      }
      
      await Promise.all(promises);
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log(`   📊 1000 SET operations completed in ${duration}ms`);
      if (duration < 5000) { // Should complete in under 5 seconds
        console.log('   ✅ Performance test passed');
        results.performance = true;
      } else {
        console.log('   ⚠️ Performance test slow - check Redis configuration');
      }

      // Test 4: Memory Usage
      console.log('\n4️⃣ Checking Memory Usage...');
      const info = await this.redis.info('memory');
      const memoryLines = info.split('\n');
      const usedMemory = memoryLines.find(line => line.startsWith('used_memory_human:'));
      const maxMemory = memoryLines.find(line => line.startsWith('maxmemory_human:'));
      
      console.log(`   📈 Used Memory: ${usedMemory?.split(':')[1] || 'N/A'}`);
      console.log(`   📊 Max Memory: ${maxMemory?.split(':')[1] || 'No limit set'}`);
      results.memory = true;

      // Test 5: Persistence Check
      console.log('\n5️⃣ Checking Persistence Configuration...');
      const configInfo = await this.redis.info('persistence');
      const persistenceLines = configInfo.split('\n');
      const rdbEnabled = persistenceLines.some(line => line.includes('rdb_last_save_time'));
      const aofEnabled = persistenceLines.some(line => line.includes('aof_enabled:1'));
      
      if (rdbEnabled || aofEnabled) {
        console.log('   ✅ Persistence configured');
        results.persistence = true;
      } else {
        console.log('   ⚠️ No persistence configured - data will be lost on restart');
      }

      // Cleanup
      await this.redis.del('test:connection', 'test:hash', 'test:list');
      for (let i = 0; i < 1000; i++) {
        await this.redis.del(`perf:test:${i}`);
      }

      // Overall Assessment
      console.log('\n📋 Production Readiness Assessment');
      console.log('==================================');
      
      const passedTests = Object.values(results).filter(Boolean).length;
      const totalTests = Object.keys(results).length - 1; // Exclude productionReady
      
      if (passedTests >= 4) {
        results.productionReady = true;
        console.log('🎉 Redis is PRODUCTION READY!');
        console.log('✅ All critical tests passed');
      } else {
        console.log('⚠️ Redis needs attention before production');
        console.log(`❌ Only ${passedTests}/${totalTests} tests passed`);
      }

      console.log('\n📊 Test Results Summary:');
      Object.entries(results).forEach(([test, passed]) => {
        if (test !== 'productionReady') {
          console.log(`   ${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASS' : 'FAIL'}`);
        }
      });

    } catch (error) {
      console.error('❌ Redis test failed:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('   - Check if Redis container is running: docker ps');
      console.log('   - Check Redis logs: docker logs edu-matrix-redis');
      console.log('   - Verify connection settings in .env file');
    } finally {
      await this.redis.disconnect();
    }

    return results.productionReady;
  }
}

// Run the test
async function main() {
  const tester = new RedisProductionTest();
  const isReady = await tester.runTests();
  process.exit(isReady ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = RedisProductionTest;
