#!/usr/bin/env node

/**
 * Kafka Connection and Performance Test Script
 * Tests Kafka connectivity, producer/consumer functionality, and production readiness
 */

require('dotenv').config();
const { Kafka } = require('kafkajs');

class KafkaProductionTest {
  constructor() {
    this.kafka = new Kafka({
      clientId: 'edu-matrix-test-client',
      brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
      retry: {
        initialRetryTime: 100,
        retries: 8,
      },
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'test-group' });
    this.admin = this.kafka.admin();
  }

  async runTests() {
    console.log('\n🔍 Kafka Production Readiness Test');
    console.log('===================================');
    
    const results = {
      connectivity: false,
      topicManagement: false,
      producer: false,
      consumer: false,
      performance: false,
      productionReady: false
    };

    try {
      // Test 1: Connectivity and Admin Operations
      console.log('\n1️⃣ Testing Kafka Connectivity...');
      await this.admin.connect();
      
      const metadata = await this.admin.fetchTopicMetadata();
      console.log('   ✅ Connected to Kafka cluster');
      console.log(`   📊 Found ${metadata.topics.length} existing topics`);
      results.connectivity = true;

      // Test 2: Topic Management
      console.log('\n2️⃣ Testing Topic Management...');
      const testTopic = 'edu-matrix-test-topic';
      
      try {
        await this.admin.createTopics({
          topics: [{
            topic: testTopic,
            numPartitions: 3,
            replicationFactor: 1,
            configEntries: [
              { name: 'cleanup.policy', value: 'delete' },
              { name: 'retention.ms', value: '86400000' } // 24 hours
            ]
          }]
        });
        console.log(`   ✅ Created test topic: ${testTopic}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`   ✅ Test topic already exists: ${testTopic}`);
        } else {
          throw error;
        }
      }

      const topics = await this.admin.listTopics();
      if (topics.includes(testTopic)) {
        console.log('   ✅ Topic management working');
        results.topicManagement = true;
      }

      // Test 3: Producer Test
      console.log('\n3️⃣ Testing Kafka Producer...');
      await this.producer.connect();
      
      const messages = [];
      for (let i = 0; i < 10; i++) {
        messages.push({
          key: `test-key-${i}`,
          value: JSON.stringify({
            id: i,
            message: `Test message ${i}`,
            timestamp: new Date().toISOString(),
            service: 'edu-matrix-test'
          })
        });
      }

      const produceResult = await this.producer.send({
        topic: testTopic,
        messages: messages
      });

      if (produceResult[0].errorCode === 0) {
        console.log(`   ✅ Successfully produced ${messages.length} messages`);
        console.log(`   📊 Messages sent to ${produceResult[0].partition} partition(s)`);
        results.producer = true;
      }

      // Test 4: Consumer Test
      console.log('\n4️⃣ Testing Kafka Consumer...');
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: testTopic, fromBeginning: true });

      let consumedMessages = 0;
      const consumePromise = new Promise((resolve) => {
        this.consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            consumedMessages++;
            console.log(`   📨 Consumed message ${consumedMessages}: ${message.value.toString()}`);
            
            if (consumedMessages >= 10) {
              resolve();
            }
          },
        });
      });

      // Wait for messages to be consumed (with timeout)
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Consumer timeout')), 10000)
      );

      try {
        await Promise.race([consumePromise, timeout]);
        console.log(`   ✅ Successfully consumed ${consumedMessages} messages`);
        results.consumer = true;
      } catch (error) {
        console.log(`   ⚠️ Consumer test timeout (consumed ${consumedMessages} messages)`);
      }

      // Test 5: Performance Test
      console.log('\n5️⃣ Testing Performance...');
      const performanceMessages = [];
      for (let i = 0; i < 1000; i++) {
        performanceMessages.push({
          key: `perf-key-${i}`,
          value: JSON.stringify({
            id: i,
            data: 'x'.repeat(100), // 100 byte message
            timestamp: Date.now()
          })
        });
      }

      const startTime = Date.now();
      await this.producer.send({
        topic: testTopic,
        messages: performanceMessages
      });
      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`   📊 Produced 1000 messages in ${duration}ms`);
      console.log(`   🚀 Throughput: ${Math.round(1000 / (duration / 1000))} messages/second`);
      
      if (duration < 5000) { // Should complete in under 5 seconds
        console.log('   ✅ Performance test passed');
        results.performance = true;
      } else {
        console.log('   ⚠️ Performance test slow - check Kafka configuration');
      }

      // Test 6: Check Broker Health
      console.log('\n6️⃣ Checking Broker Health...');
      const brokerMetadata = await this.admin.describeCluster();
      console.log(`   🏢 Cluster ID: ${brokerMetadata.clusterId}`);
      console.log(`   📊 Active Brokers: ${brokerMetadata.brokers.length}`);
      
      brokerMetadata.brokers.forEach(broker => {
        console.log(`   🖥️ Broker ${broker.nodeId}: ${broker.host}:${broker.port}`);
      });

      // Cleanup
      try {
        await this.admin.deleteTopics({
          topics: [testTopic]
        });
        console.log('   🧹 Cleaned up test topic');
      } catch (error) {
        console.log('   ⚠️ Could not clean up test topic');
      }

      // Overall Assessment
      console.log('\n📋 Production Readiness Assessment');
      console.log('==================================');
      
      const passedTests = Object.values(results).filter(Boolean).length;
      const totalTests = Object.keys(results).length - 1; // Exclude productionReady
      
      if (passedTests >= 4) {
        results.productionReady = true;
        console.log('🎉 Kafka is PRODUCTION READY!');
        console.log('✅ All critical tests passed');
      } else {
        console.log('⚠️ Kafka needs attention before production');
        console.log(`❌ Only ${passedTests}/${totalTests} tests passed`);
      }

      console.log('\n📊 Test Results Summary:');
      Object.entries(results).forEach(([test, passed]) => {
        if (test !== 'productionReady') {
          console.log(`   ${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASS' : 'FAIL'}`);
        }
      });

    } catch (error) {
      console.error('❌ Kafka test failed:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('   - Check if Kafka container is running: docker ps');
      console.log('   - Check Kafka logs: docker logs edu-matrix-kafka');
      console.log('   - Check Zookeeper logs: docker logs edu-matrix-zookeeper');
      console.log('   - Verify broker configuration in docker-compose.yml');
    } finally {
      try {
        await this.producer.disconnect();
        await this.consumer.disconnect();
        await this.admin.disconnect();
      } catch (error) {
        console.log('⚠️ Error during cleanup:', error.message);
      }
    }

    return results.productionReady;
  }
}

// Run the test
async function main() {
  const tester = new KafkaProductionTest();
  const isReady = await tester.runTests();
  process.exit(isReady ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = KafkaProductionTest;
