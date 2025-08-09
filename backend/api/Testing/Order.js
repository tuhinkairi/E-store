// testConfig.js - Centralized test configuration and utilities

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ==================== TEST ENVIRONMENT CONFIG ====================

export const TEST_CONFIG = {
  // Server Configuration
  SERVER: {
    BASE_URL: process.env.TEST_BASE_URL || "http://localhost:3000",
    API_VERSION: process.env.API_VERSION || "v1",
    TIMEOUT: parseInt(process.env.TEST_TIMEOUT) || 10000, // 10 seconds
    RETRY_ATTEMPTS: parseInt(process.env.TEST_RETRY) || 3
  },

  // Authentication Tokens (Update these with real tokens)
  AUTH: {
    ADMIN_TOKEN: process.env.TEST_ADMIN_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTY0MzkyYTAxM2IyYzAwM2UxYjVmNyIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3NTQ3MjIzMzcsImV4cCI6MTc1NTMyNzEzN30.i-UDB8R8cF5OrStyzc66xxvHThpF2Y518-QJ0pHJCrA",
    USER_TOKEN: process.env.TEST_USER_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTZmMWI4MjhlNjUyMWI2NTA5NjU0ZSIsImVtYWlsIjoiam9obi5kb2UxMkBleGFtcGxlLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NTQ3MjI3NDQsImV4cCI6MTc1NTMyNzU0NH0.5AGlildyDBojzr2FYhucW_t5vu1e-dPOlQBEYu5z1ng",
    INVALID_TOKEN: "invalid.jwt.token"
  },

  // Test Data IDs (Update these with real IDs from your database)
  TEST_DATA: {
    PRODUCT_ID: process.env.TEST_PRODUCT_ID || "689623962d657524337a5bda",
    USER_ID: process.env.TEST_USER_ID || "6896f1b828e6521b6509654e",
    ADMIN_ID: process.env.TEST_ADMIN_ID || "68964392a013b2c003e1b5f7"
  },

  // Test Execution Settings
  EXECUTION: {
    DELAY_BETWEEN_TESTS: 200, // milliseconds
    CONCURRENT_REQUESTS: 5,
    ENABLE_LOAD_TESTS: process.env.ENABLE_LOAD_TESTS === 'true',
    ENABLE_CLEANUP: process.env.ENABLE_CLEANUP !== 'false',
    VERBOSE_LOGGING: process.env.VERBOSE_TESTS === 'true'
  },

  // Expected Response Times (in milliseconds)
  PERFORMANCE: {
    FAST_RESPONSE: 500,
    ACCEPTABLE_RESPONSE: 2000,
    SLOW_RESPONSE: 5000
  }
};

// ==================== SHARED TEST UTILITIES ====================

export class TestRunner {
  constructor() {
    this.results = { passed: 0, failed: 0, skipped: 0, total: 0 };
    this.startTime = null;
    this.testData = {};
  }

  start() {
    this.startTime = Date.now();
    console.log(`🚀 Test Suite Started: ${new Date().toISOString()}`);
  }

  // Assertion methods
  assert = {
    equals: (actual, expected, message) => {
      if (actual === expected) {
        this.logPass(message);
      } else {
        this.logFail(message, `Expected: ${expected}, Got: ${actual}`);
      }
    },

    truthy: (value, message) => {
      if (value) {
        this.logPass(message);
      } else {
        this.logFail(message, `Expected truthy value, got: ${value}`);
      }
    },

    statusCode: (actual, expected, message) => {
      if (actual === expected) {
        this.logPass(`${message} (${actual})`);
      } else {
        this.logFail(message, `Expected status: ${expected}, Got: ${actual}`);
      }
    },

    contains: (actual, expected, message) => {
      if (actual && actual.includes && actual.includes(expected)) {
        this.logPass(message);
      } else {
        this.logFail(message, `"${actual}" should contain "${expected}"`);
      }
    },

    hasProperty: (obj, prop, message) => {
      if (obj && obj.hasOwnProperty(prop)) {
        this.logPass(message);
      } else {
        this.logFail(message, `Object missing property: ${prop}`);
      }
    }
  };

  logPass(message) {
    console.log(`  ✅ ${message}`);
    this.results.passed++;
    this.results.total++;
  }

  logFail(message, details = '') {
    console.log(`  ❌ ${message}`);
    if (details) console.log(`     ${details}`);
    this.results.failed++;
    this.results.total++;
  }

  logSkip(message) {
    console.log(`  ⚠️ SKIP: ${message}`);
    this.results.skipped++;
    this.results.total++;
  }

  logTest(name) {
    console.log(`\n🧪 ${name}`);
  }

  logSection(name) {
    console.log(`\n${'='.repeat(50)}\n📋 ${name}\n${'='.repeat(50)}`);
  }

  async sleep(ms = TEST_CONFIG.EXECUTION.DELAY_BETWEEN_TESTS) {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  // HTTP request wrapper with error handling
  async request(url, options = {}) {
    const startTime = Date.now();
    
    try {
      const response = await fetch(url, {
        timeout: TEST_CONFIG.SERVER.TIMEOUT,
        ...options
      });
      
      const responseTime = Date.now() - startTime;
      
      if (TEST_CONFIG.EXECUTION.VERBOSE_LOGGING) {
        console.log(`  ⏱️ Response time: ${responseTime}ms`);
      }
      
      // Log slow responses
      if (responseTime > TEST_CONFIG.PERFORMANCE.SLOW_RESPONSE) {
        console.log(`  ⚠️ Slow response: ${responseTime}ms`);
      }
      
      return response;
      
    } catch (error) {
      console.log(`  ❌ Request failed: ${error.message}`);
      throw error;
    }
  }

  // Generate summary report
  generateSummary() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    const successRate = this.results.total > 0 ? 
      ((this.results.passed / this.results.total) * 100).toFixed(1) : 0;

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST EXECUTION SUMMARY');
    console.log('='.repeat(60));
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`📈 Total Tests: ${this.results.total}`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️ Skipped: ${this.results.skipped}`);
    console.log(`🎯 Success Rate: ${successRate}%`);

    // Performance insights
    const testsPerSecond = (this.results.total / duration).toFixed(2);
    console.log(`⚡ Tests per second: ${testsPerSecond}`);

    if (this.results.failed === 0) {
      console.log('\n🎉 ALL TESTS PASSED! 🎉');
    } else {
      console.log(`\n⚠️ ${this.results.failed} test(s) failed. Review output above.`);
    }

    return {
      success: this.results.failed === 0,
      summary: this.results,
      duration: parseFloat(duration),
      successRate: parseFloat(successRate)
    };
  }
}

// ==================== HTTP HELPERS ====================

export const HttpClient = {
  createHeaders: (token = null, additionalHeaders = {}) => ({
    "Authorization": token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
    "x-request-id": `test_${Date.now()}`,
    ...additionalHeaders
  }),

  get: async (url, token = null) => {
    return await fetch(url, {
      method: 'GET',
      headers: HttpClient.createHeaders(token)
    });
  },

  post: async (url, data, token = null) => {
    return await fetch(url, {
      method: 'POST',
      headers: HttpClient.createHeaders(token),
      body: JSON.stringify(data)
    });
  },

  patch: async (url, data, token = null) => {
    return await fetch(url, {
      method: 'PATCH',
      headers: HttpClient.createHeaders(token),
      body: JSON.stringify(data)
    });
  },

  delete: async (url, token = null) => {
    return await fetch(url, {
      method: 'DELETE',
      headers: HttpClient.createHeaders(token)
    });
  }
};

// ==================== SAMPLE DATA FACTORY ====================

export const DataFactory = {
  createOrderData: (overrides = {}) => ({
    items: [
      {
        productId: TEST_CONFIG.TEST_DATA.PRODUCT_ID,
        quantity: 2,
        size: "M",
        color: "blue"
      }
    ],
    paymentMethod: "credit_card",
    shippingAddress: {
      addressType: "home",
      street: "123 Test Street",
      apartment: "Apt 4B",
      city: "Test City",
      state: "TS",
      zipCode: "12345",
      country: "USA"
    },
    notes: "Test order from automated tests",
    ...overrides
  }),

  createInvalidOrderData: (invalidField) => {
    const data = DataFactory.createOrderData();
    
    switch (invalidField) {
      case 'noItems':
        delete data.items;
        break;
      case 'emptyItems':
        data.items = [];
        break;
      case 'invalidProductId':
        data.items[0].productId = "invalid_id";
        break;
      case 'noShippingAddress':
        delete data.shippingAddress;
        break;
      case 'incompleteAddress':
        delete data.shippingAddress.street;
        break;
      default:
        break;
    }
    
    return data;
  },

  createUpdateData: (type = 'user') => {
    const baseUpdate = {
      notes: "Updated via automated test"
    };

    switch (type) {
      case 'user':
        return {
          ...baseUpdate,
          status: "Cancelled"
        };
      case 'admin':
        return {
          ...baseUpdate,
          status: "Processing",
          paymentStatus: "Paid",
          trackingNumber: `TRK${Date.now()}`
        };
      case 'invalid':
        return {
          ...baseUpdate,
          status: "InvalidStatus"
        };
      default:
        return baseUpdate;
    }
  }
};

// ==================== VALIDATION HELPERS ====================

export const Validators = {
  isValidResponse: (response, result) => {
    return response && result && typeof result === 'object';
  },

  isSuccessResponse: (response, result) => {
    return response.status >= 200 && response.status < 300 && result.success === true;
  },

  isErrorResponse: (response, result) => {
    return response.status >= 400 && result.success === false;
  },

  hasRequiredOrderFields: (order) => {
    const required = ['_id', 'userId', 'items', 'totalAmount', 'status', 'paymentStatus', 'orderNumber'];
    return required.every(field => order.hasOwnProperty(field));
  },

  isValidOrderStatus: (status) => {
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];
    return validStatuses.includes(status);
  },

  isValidPaymentStatus: (status) => {
    const validStatuses = ['Pending', 'Paid', 'Failed', 'Refunded'];
    return validStatuses.includes(status);
  }
};

// ==================== ENVIRONMENT SETUP ====================

export const setupTestEnvironment = async () => {
  console.log('🔧 Setting up test environment...');

  // Check required environment variables
  const requiredEnvVars = ['JWT_KEY'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.log('❌ Missing environment variables:', missingVars.join(', '));
    return false;
  }

  // Check server connectivity
  try {
    const healthCheck = await fetch(`${TEST_CONFIG.SERVER.BASE_URL}/api/health`);
    if (healthCheck.status === 200) {
      console.log('✅ Server is responsive');
    } else {
      console.log('⚠️ Server health check returned:', healthCheck.status);
    }
  } catch (error) {
    console.log('❌ Cannot connect to server:', error.message);
    return false;
  }

  // Validate test tokens (basic check)
  const tokenPattern = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/;
  
  if (!tokenPattern.test(TEST_CONFIG.AUTH.ADMIN_TOKEN) && 
      TEST_CONFIG.AUTH.ADMIN_TOKEN !== "your_admin_jwt_token_here") {
    console.log('⚠️ Admin token format appears invalid');
  }

  if (!tokenPattern.test(TEST_CONFIG.AUTH.USER_TOKEN) && 
      TEST_CONFIG.AUTH.USER_TOKEN !== "your_user_jwt_token_here") {
    console.log('⚠️ User token format appears invalid');
  }

  console.log('✅ Test environment setup complete');
  return true;
};

// ==================== TEST DATA CLEANUP ====================

export const cleanupTestData = async () => {
  console.log('\n🧹 Cleaning up test data...');
  
  const cleanupTasks = [];
  
  // Add cleanup tasks here as needed
  // Example: Delete test orders, reset product stock, etc.
  
  try {
    await Promise.all(cleanupTasks);
    console.log('✅ Test data cleanup completed');
  } catch (error) {
    console.log('⚠️ Some cleanup tasks failed:', error.message);
  }
};

// ==================== EXAMPLE .env FILE ====================

export const generateExampleEnv = () => {
  const envContent = `
# Example .env file for testing
# Copy this to your .env file and update with real values

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
MONGODB_TEST_URI=mongodb://localhost:27017/ecommerce_test

# JWT Secret
JWT_KEY=your_super_secret_jwt_key_here

# Server
PORT=3000
NODE_ENV=development

# Test Configuration
TEST_BASE_URL=http://localhost:3000
TEST_ADMIN_TOKEN=your_actual_admin_jwt_token
TEST_USER_TOKEN=your_actual_user_jwt_token
TEST_PRODUCT_ID=actual_product_id_from_database
TEST_USER_ID=actual_user_id_from_database
TEST_TIMEOUT=10000
ENABLE_LOAD_TESTS=false
ENABLE_CLEANUP=true
VERBOSE_TESTS=false

# API Configuration
API_VERSION=v1
CLIENT_URL=http://localhost:3000
`;

  console.log('📝 Example .env configuration:');
  console.log(envContent);
  
  return envContent;
};

// ==================== EXPORT ALL ====================

export default {
  TEST_CONFIG,
  TestRunner,
  HttpClient,
  DataFactory,
  Validators,
  setupTestEnvironment,
  cleanupTestData,
  generateExampleEnv
};

/*
🔧 USAGE INSTRUCTIONS:

1. CREATE .env FILE:
   - Copy the example .env content above
   - Update with your actual values
   - Save as .env in your project root

2. UPDATE TOKENS:
   - Get valid JWT tokens from your auth system
   - Update TEST_ADMIN_TOKEN and TEST_USER_TOKEN
   - Ensure tokens have appropriate permissions

3. UPDATE TEST DATA IDs:
   - Create or find actual product/user IDs in your database
   - Update TEST_PRODUCT_ID and TEST_USER_ID

4. IMPORT IN TEST FILES:
   import { TEST_CONFIG, TestRunner, HttpClient } from './testConfig.js';

5. EXAMPLE USAGE:
   const runner = new TestRunner();
   runner.start();
   
   const response = await HttpClient.get('/api/v1/orders', TEST_CONFIG.AUTH.USER_TOKEN);
   runner.assert.statusCode(response.status, 200, 'Should get orders');
   
   runner.generateSummary();

6. ENVIRONMENT VARIABLES:
   - All configuration can be overridden via environment variables
   - Useful for CI/CD pipelines and different environments
   - Set VERBOSE_TESTS=true for detailed logging
*/