#!/usr/bin/env node
// ==========================================
// DATABASE CONNECTIONS VERIFICATION SCRIPT
// ==========================================
// Comprehensive test for Redis, Kafka, and PostgreSQL connections

require('dotenv').config();
const Redis = require('ioredis');
const { Kafka } = require('kafkajs');
const { testConnection: testPostgresConnection, query, closePool } = require('../utils/database');
const { logger } = require('../utils/logger');

// Connection test results
const results = {
  postgres: { status: 'pending', details: null },
  redis: { status: 'pending', details: null },
  kafka: { status: 'pending', details: null }
};

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// PostgreSQL Connection Test
async function testPostgreSQL() {
  console.log(colorize('\n🐘 Testing PostgreSQL Connection...', 'blue'));
  
  try {
    // Test basic connection
    const connected = await testPostgresConnection();
    if (!connected) {
      throw new Error('Basic connection test failed');
    }

    // Test database operations
    const versionResult = await query('SELECT version()');
    const dbVersion = versionResult.rows[0].version;
    
    // Test table access (if available)
    let tableCount = 0;
    try {
      const tableResult = await query(`
        SELECT COUNT(*) as count 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      tableCount = parseInt(tableResult.rows[0].count);
    } catch (error) {
      console.log(colorize('  ⚠️  Warning: Could not count tables (may be empty database)', 'yellow'));
    }

    results.postgres = {
      status: 'success',
      details: {
        version: dbVersion.split(' ').slice(0, 2).join(' '),
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        tableCount,
        connectionString: process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@')
      }
    };

    console.log(colorize('  ✅ PostgreSQL connection successful', 'green'));
    console.log(colorize(`  📊 Database: ${process.env.POSTGRES_DB}`, 'cyan'));
    console.log(colorize(`  👤 User: ${process.env.POSTGRES_USER}`, 'cyan'));
    console.log(colorize(`  📈 Tables: ${tableCount}`, 'cyan'));
    console.log(colorize(`  🔢 Version: ${results.postgres.details.version}`, 'cyan'));
    
  } catch (error) {
    results.postgres = {
      status: 'error',
      details: { error: error.message }
    };
    console.log(colorize('  ❌ PostgreSQL connection failed', 'red'));
    console.log(colorize(`  💥 Error: ${error.message}`, 'red'));
  }
}

// Redis Connection Test
async function testRedis() {
  console.log(colorize('\n🔴 Testing Redis Connection...', 'blue'));
  
  let redis = null;
  try {
    // Create Redis connection
    redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      family: 4
    });

    // Test connection
    await redis.connect();
    
    // Test operations
    const testKey = 'socketio:test:' + Date.now();
    await redis.set(testKey, 'test-value', 'EX', 10);
    const value = await redis.get(testKey);
    await redis.del(testKey);
    
    // Get Redis info
    const info = await redis.info();
    const redisVersion = info.match(/redis_version:([^\r\n]+)/)?.[1] || 'unknown';
    const connectedClients = info.match(/connected_clients:([^\r\n]+)/)?.[1] || '0';
    const usedMemory = info.match(/used_memory_human:([^\r\n]+)/)?.[1] || 'unknown';

    results.redis = {
      status: 'success',
      details: {
        version: redisVersion,
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || '6379',
        connectedClients,
        usedMemory,
        passwordProtected: !!process.env.REDIS_PASSWORD
      }
    };

    console.log(colorize('  ✅ Redis connection successful', 'green'));
    console.log(colorize(`  🌐 Host: ${results.redis.details.host}:${results.redis.details.port}`, 'cyan'));
    console.log(colorize(`  🔢 Version: ${redisVersion}`, 'cyan'));
    console.log(colorize(`  👥 Connected clients: ${connectedClients}`, 'cyan'));
    console.log(colorize(`  💾 Memory usage: ${usedMemory}`, 'cyan'));
    console.log(colorize(`  🔒 Password protected: ${results.redis.details.passwordProtected}`, 'cyan'));
    
  } catch (error) {
    results.redis = {
      status: 'error',
      details: { error: error.message }
    };
    console.log(colorize('  ❌ Redis connection failed', 'red'));
    console.log(colorize(`  💥 Error: ${error.message}`, 'red'));
  } finally {
    if (redis) {
      try {
        await redis.disconnect();
      } catch (err) {
        // Ignore disconnect errors
      }
    }
  }
}

// Kafka Connection Test
async function testKafka() {
  console.log(colorize('\n📨 Testing Kafka Connection...', 'blue'));
  
  let kafka = null;
  let admin = null;
  let producer = null;
  
  try {
    // Create Kafka client
    kafka = new Kafka({
      clientId: 'connection-test',
      brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
      retry: {
        initialRetryTime: 100,
        retries: 3
      },
      connectionTimeout: 3000,
      requestTimeout: 30000
    });

    // Test admin connection
    admin = kafka.admin();
    await admin.connect();
    
    // Get cluster metadata
    const metadata = await admin.fetchTopicMetadata();
    const brokers = metadata.brokers.length;
    const topics = metadata.topics.length;
    
    // List topics
    const topicsList = await admin.listTopics();
    
    // Test producer
    producer = kafka.producer();
    await producer.connect();
    
    // Send test message
    const testTopic = 'test-connection-' + Date.now();
    try {
      await producer.send({
        topic: testTopic,
        messages: [{
          key: 'test',
          value: JSON.stringify({ test: true, timestamp: Date.now() })
        }]
      });
    } catch (err) {
      // Topic might not exist, that's okay for connection test
      console.log(colorize('  ⚠️  Note: Test message send failed (topic may not exist)', 'yellow'));
    }

    results.kafka = {
      status: 'success',
      details: {
        brokers: process.env.KAFKA_BROKERS || 'localhost:9092',
        brokerCount: brokers,
        topicCount: topics,
        availableTopics: topicsList.slice(0, 10), // Show first 10 topics
        clientId: 'connection-test'
      }
    };

    console.log(colorize('  ✅ Kafka connection successful', 'green'));
    console.log(colorize(`  🌐 Brokers: ${results.kafka.details.brokers}`, 'cyan'));
    console.log(colorize(`  🖥️  Broker count: ${brokers}`, 'cyan'));
    console.log(colorize(`  📂 Topic count: ${topics}`, 'cyan'));
    if (topicsList.length > 0) {
      console.log(colorize(`  📋 Available topics: ${topicsList.slice(0, 5).join(', ')}${topicsList.length > 5 ? '...' : ''}`, 'cyan'));
    }
    
  } catch (error) {
    results.kafka = {
      status: 'error',
      details: { error: error.message }
    };
    console.log(colorize('  ❌ Kafka connection failed', 'red'));
    console.log(colorize(`  💥 Error: ${error.message}`, 'red'));
  } finally {
    // Clean up connections
    try {
      if (producer) await producer.disconnect();
      if (admin) await admin.disconnect();
    } catch (err) {
      // Ignore disconnect errors
    }
  }
}

// Summary Report
function printSummary() {
  console.log(colorize('\n' + '='.repeat(60), 'cyan'));
  console.log(colorize('📊 CONNECTION VERIFICATION SUMMARY', 'cyan'));
  console.log(colorize('='.repeat(60), 'cyan'));
  
  const statuses = Object.values(results);
  const successful = statuses.filter(r => r.status === 'success').length;
  const failed = statuses.filter(r => r.status === 'error').length;
  
  console.log(colorize(`\n✅ Successful connections: ${successful}/3`, 'green'));
  console.log(colorize(`❌ Failed connections: ${failed}/3`, failed > 0 ? 'red' : 'green'));
  
  Object.entries(results).forEach(([service, result]) => {
    const statusColor = result.status === 'success' ? 'green' : 'red';
    const statusIcon = result.status === 'success' ? '✅' : '❌';
    console.log(colorize(`${statusIcon} ${service.toUpperCase()}: ${result.status}`, statusColor));
  });
  
  if (successful === 3) {
    console.log(colorize('\n🎉 All database connections are working properly!', 'green'));
    console.log(colorize('🚀 Your Socket.IO server is ready to run.', 'green'));
  } else {
    console.log(colorize('\n⚠️  Some connections failed. Please check your configuration.', 'yellow'));
    console.log(colorize('🔧 Verify your .env file and Docker services are running.', 'yellow'));
  }
  
  console.log(colorize('\n' + '='.repeat(60), 'cyan'));
}

// Environment validation
function validateEnvironment() {
  console.log(colorize('🔍 Validating Environment Configuration...', 'blue'));
  
  const requiredVars = {
    'DATABASE_URL': process.env.DATABASE_URL,
    'POSTGRES_USER': process.env.POSTGRES_USER,
    'POSTGRES_PASSWORD': process.env.POSTGRES_PASSWORD,
    'POSTGRES_DB': process.env.POSTGRES_DB,
    'REDIS_HOST': process.env.REDIS_HOST,
    'REDIS_PORT': process.env.REDIS_PORT,
    'REDIS_PASSWORD': process.env.REDIS_PASSWORD,
    'KAFKA_BROKERS': process.env.KAFKA_BROKERS
  };
  
  const missing = Object.entries(requiredVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);
    
  if (missing.length > 0) {
    console.log(colorize(`❌ Missing environment variables: ${missing.join(', ')}`, 'red'));
    return false;
  }
  
  console.log(colorize('✅ All required environment variables are set', 'green'));
  return true;
}

// Main execution
async function main() {
  console.log(colorize('🔍 EDU MATRIX INTERLINKED - DATABASE CONNECTION VERIFICATION', 'cyan'));
  console.log(colorize('=' .repeat(70), 'cyan'));
  
  // Validate environment
  if (!validateEnvironment()) {
    process.exit(1);
  }
  
  // Run all tests
  await testPostgreSQL();
  await testRedis();
  await testKafka();
  
  // Print summary
  printSummary();
  
  // Cleanup
  try {
    await closePool();
  } catch (err) {
    // Ignore cleanup errors
  }
  
  // Exit with appropriate code
  const hasErrors = Object.values(results).some(r => r.status === 'error');
  process.exit(hasErrors ? 1 : 0);
}

// Handle errors
process.on('unhandledRejection', (reason, promise) => {
  console.error(colorize('❌ Unhandled Rejection:', 'red'), reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error(colorize('❌ Uncaught Exception:', 'red'), error);
  process.exit(1);
});

// Run the verification
main().catch(error => {
  console.error(colorize('❌ Verification script failed:', 'red'), error);
  process.exit(1);
});
