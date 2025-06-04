// ==========================================
// SOCKET.IO CONNECTION TEST SCRIPT
// ==========================================
// Deep-dive testing for Socket.IO connectivity and functionality

const io = require('socket.io-client');
const axios = require('axios');

const SOCKET_URL = 'http://localhost:3001';
const TEST_TOKEN = 'test-jwt-token-for-infrastructure-testing';

async function testSocketConnection() {
  console.log('🔌 Testing Socket.IO Connection...\n');
  
  try {
    // Test 1: Health Endpoint
    console.log('📊 Testing Health Endpoint...');
    const healthResponse = await axios.get(`${SOCKET_URL}/health`);
    console.log('✅ Health Check:', JSON.stringify(healthResponse.data, null, 2));
    console.log('');
    
    // Test 2: Socket.IO Connection
    console.log('🔗 Testing Socket.IO Connection...');
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      timeout: 10000,
      auth: {
        token: TEST_TOKEN
      }
    });
    
    // Connection events
    socket.on('connect', () => {
      console.log('✅ Socket connected with ID:', socket.id);
      
      // Test 3: Basic Events
      console.log('📤 Testing basic events...');
      
      // Test ping-pong
      socket.emit('ping', { timestamp: Date.now() });
      
      // Test user presence
      socket.emit('user:online', { 
        userId: 'test-user-123',
        status: 'online'
      });
      
      // Test room joining
      socket.emit('room:join', {
        roomType: 'study-group',
        roomId: 'test-room-456'
      });
      
      setTimeout(() => {
        console.log('🔌 Disconnecting...');
        socket.disconnect();
      }, 5000);
    });
    
    socket.on('connect_error', (error) => {
      console.log('❌ Connection error:', error.message);
    });
    
    socket.on('disconnect', (reason) => {
      console.log('🔌 Disconnected:', reason);
      process.exit(0);
    });
    
    // Event responses
    socket.on('pong', (data) => {
      console.log('✅ Pong received:', data);
    });
    
    socket.on('user:status', (data) => {
      console.log('✅ User status update:', data);
    });
    
    socket.on('room:joined', (data) => {
      console.log('✅ Room joined:', data);
    });
    
    socket.on('error', (error) => {
      console.log('❌ Socket error:', error);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run tests
testSocketConnection();
