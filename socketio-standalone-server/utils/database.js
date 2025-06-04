// ==========================================
// POSTGRESQL DATABASE CONNECTION
// ==========================================
// Connection pool and query utilities for PostgreSQL

const { Pool } = require('pg');
const { logger } = require('./logger');

// Database configuration
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
  maxUses: 7500, // Close (and replace) a connection after it has been used 7500 times
};

// Create connection pool
const pool = new Pool(dbConfig);

// Handle pool errors
pool.on('error', (err) => {
  logger.error('❌ PostgreSQL pool error:', err);
});

pool.on('connect', () => {
  logger.info('✅ PostgreSQL client connected');
});

pool.on('remove', () => {
  logger.info('🔄 PostgreSQL client removed');
});

// Connection test function
async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    logger.info('✅ PostgreSQL connection test successful:', result.rows[0]);
    return true;
  } catch (error) {
    logger.error('❌ PostgreSQL connection test failed:', error.message);
    return false;
  }
}

// Query function with error handling
async function query(text, params = []) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('📊 Query executed', { 
      query: text.substring(0, 100), 
      duration: `${duration}ms`,
      rows: result.rowCount 
    });
    return result;
  } catch (error) {
    logger.error('❌ Database query error:', {
      query: text.substring(0, 100),
      error: error.message,
      params: params.length
    });
    throw error;
  }
}

// Transaction function
async function transaction(callback) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('❌ Transaction rolled back:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

// Get client for manual connection management
async function getClient() {
  return await pool.connect();
}

// Close pool
async function closePool() {
  try {
    await pool.end();
    logger.info('🔒 PostgreSQL pool closed');
  } catch (error) {
    logger.error('❌ Error closing PostgreSQL pool:', error.message);
  }
}

// Health check function
async function healthCheck() {
  try {
    const result = await query('SELECT 1 as health_check');
    return {
      status: 'healthy',
      database: 'postgresql',
      response_time: 'fast',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      database: 'postgresql',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = {
  pool,
  query,
  transaction,
  getClient,
  testConnection,
  healthCheck,
  closePool
};
