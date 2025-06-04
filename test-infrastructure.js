#!/usr/bin/env node
// ==========================================
// INFRASTRUCTURE CONNECTIVITY TEST SCRIPT
// ==========================================
// Deep testing of Redis, Kafka, and Socket.IO connectivity

const { createClient } = require('redis');
const { Kafka } = require('kafkajs');
const { Client } = require('pg');
const io = require('socket.io-client');

// Configuration from environment
const config = {
  redis: {
    host: 'localhost',
    port: 6379,
    password: '9a8b7c6d5e4f3210987654321fedcba0987654321fedcba0987654321fedcba'
  },
  kafka: {
    brokers: ['localhost:9092'],
    clientId: 'infrastructure-test'
  },
  postgres: {
    user: 'edu_matrix_user',
    password: '7f9e2a4b8c1d3e5f6789012345678901abcdef1234567890abcdef12345678',
    host: 'localhost',
    port: 5432,
    database: 'edu_matrix_db'
  },
  socketio: {
    url: 'http://localhost:3001'
  }
};

let results = {
  redis: { status: 'pending', tests: {} },
  kafka: { status: 'pending', tests: {} },
  postgres: { status: 'pending', tests: {} },
  socketio: { status: 'pending', tests: {} }
};

// Redis Tests
async function testRedis() {
  console.log('🔴 Testing Redis...');
  
  try {
    const client = createClient({
      socket: {
        host: config.redis.host,
        port: config.redis.port
      },
      password: config.redis.password
    });

    await client.connect();
    results.redis.tests.connection = '✅ Connected';

    // Test basic operations
    await client.set('test:infrastructure', JSON.stringify({ 
      timestamp: new Date().toISOString(),
      test: 'infrastructure-connectivity'
    }));
    results.redis.tests.write = '✅ Write successful';

    const data = await client.get('test:infrastructure');
    if (data) {
      results.redis.tests.read = '✅ Read successful';
    }

    // Test pub/sub
    const publisher = client.duplicate();
    await publisher.connect();
    
    const subscriber = client.duplicate();
    await subscriber.connect();
    
    let pubsubReceived = false;
    await subscriber.subscribe('test:channel', (message) => {
      pubsubReceived = true;
      results.redis.tests.pubsub = '✅ Pub/Sub working';
    });
    
    await publisher.publish('test:channel', 'test-message');
    
    // Wait for message
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (!pubsubReceived) {
      results.redis.tests.pubsub = '❌ Pub/Sub failed';
    }

    // Cleanup
    await client.del('test:infrastructure');
    await client.disconnect();
    await publisher.disconnect();
    await subscriber.disconnect();
    
    results.redis.status = '✅ All tests passed';
    
  } catch (error) {
    results.redis.status = `❌ Failed: ${error.message}`;
  }
}

// Kafka Tests
async function testKafka() {
  console.log('🟡 Testing Kafka...');
  
  try {
    const kafka = new Kafka({
      clientId: config.kafka.clientId,
      brokers: config.kafka.brokers
    });

    // Test admin operations
    const admin = kafka.admin();
    await admin.connect();
    results.kafka.tests.adminConnection = '✅ Admin connected';

    const topics = await admin.listTopics();
    results.kafka.tests.listTopics = `✅ Found ${topics.length} topics`;

    // Test producer
    const producer = kafka.producer();
    await producer.connect();
    results.kafka.tests.producerConnection = '✅ Producer connected';

    const testMessage = {
      topic: 'edu-matrix-test-topic',
      messages: [{
        key: 'test-key',
        value: JSON.stringify({
          timestamp: new Date().toISOString(),
          test: 'infrastructure-connectivity',
          source: 'external-test'
        })
      }]
    };

    await producer.send(testMessage);
    results.kafka.tests.produce = '✅ Message produced';

    // Test consumer
    const consumer = kafka.consumer({ groupId: 'test-group' });
    await consumer.connect();
    results.kafka.tests.consumerConnection = '✅ Consumer connected';

    await consumer.subscribe({ topic: 'edu-matrix-test-topic' });
    
    let messageReceived = false;
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        messageReceived = true;
        results.kafka.tests.consume = '✅ Message consumed';
        await consumer.stop();
      }
    });

    // Wait for message
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!messageReceived) {
      results.kafka.tests.consume = '❌ No message received';
    }

    // Cleanup
    await producer.disconnect();
    await consumer.disconnect();
    await admin.disconnect();
    
    results.kafka.status = '✅ All tests passed';
    
  } catch (error) {
    results.kafka.status = `❌ Failed: ${error.message}`;
  }
}

// PostgreSQL Tests  
async function testPostgres() {
  console.log('🟢 Testing PostgreSQL...');
  
  try {
    const client = new Client({
      user: config.postgres.user,
      password: config.postgres.password,
      host: config.postgres.host,
      port: config.postgres.port,
      database: config.postgres.database
    });

    await client.connect();
    results.postgres.tests.connection = '✅ Connected';

    // Test basic query
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    results.postgres.tests.query = '✅ Query successful';

    // Test table operations
    await client.query(`
      CREATE TABLE IF NOT EXISTS test_infrastructure (
        id SERIAL PRIMARY KEY,
        data JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    results.postgres.tests.createTable = '✅ Table created';

    await client.query(
      'INSERT INTO test_infrastructure (data) VALUES ($1)',
      [JSON.stringify({ test: 'infrastructure-connectivity', timestamp: new Date().toISOString() })]
    );
    results.postgres.tests.insert = '✅ Insert successful';

    const selectResult = await client.query('SELECT * FROM test_infrastructure ORDER BY id DESC LIMIT 1');
    if (selectResult.rows.length > 0) {
      results.postgres.tests.select = '✅ Select successful';
    }

    // Cleanup
    await client.query('DROP TABLE IF EXISTS test_infrastructure');
    await client.end();
    
    results.postgres.status = '✅ All tests passed';
    
  } catch (error) {
    results.postgres.status = `❌ Failed: ${error.message}`;
  }
}

// Socket.IO Tests
async function testSocketIO() {
  console.log('🔵 Testing Socket.IO...');
  
  try {
    const socket = io(config.socketio.url, {
      transports: ['websocket', 'polling']
    });

    return new Promise((resolve) => {
      let connected = false;
      
      socket.on('connect', () => {
        connected = true;
        results.socketio.tests.connection = '✅ Connected';
        
        // Test message sending
        socket.emit('test:ping', { timestamp: new Date().toISOString() });
        results.socketio.tests.emit = '✅ Message sent';
        
        socket.disconnect();
        results.socketio.status = '✅ Connection test passed';
        resolve();
      });

      socket.on('connect_error', (error) => {
        results.socketio.status = `❌ Connection failed: ${error.message}`;
        resolve();
      });

      // Timeout after 5 seconds
      setTimeout(() => {
        if (!connected) {
          results.socketio.status = '❌ Connection timeout';
          socket.disconnect();
        }
        resolve();
      }, 5000);
    });
    
  } catch (error) {
    results.socketio.status = `❌ Failed: ${error.message}`;
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Infrastructure Deep-Dive Testing...\n');
  
  const startTime = Date.now();
  
  await Promise.all([
    testRedis(),
    testKafka(), 
    testPostgres(),
    testSocketIO()
  ]);
  
  const endTime = Date.now();
  
  console.log('\n📊 INFRASTRUCTURE TEST RESULTS');
  console.log('=====================================');
  
  Object.entries(results).forEach(([service, result]) => {
    console.log(`\n${service.toUpperCase()}: ${result.status}`);
    Object.entries(result.tests).forEach(([test, status]) => {
      console.log(`  ${test}: ${status}`);
    });
  });
  
  console.log(`\n⏱️  Total test time: ${endTime - startTime}ms`);
  console.log('=====================================\n');
  
  // Summary
  const passed = Object.values(results).filter(r => r.status.includes('✅')).length;
  const total = Object.keys(results).length;
  
  if (passed === total) {
    console.log('🎉 ALL INFRASTRUCTURE TESTS PASSED!');
    process.exit(0);
  } else {
    console.log(`⚠️  ${passed}/${total} services passed tests`);
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

runTests().catch(console.error);
