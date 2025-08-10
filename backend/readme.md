# User API Testing Collection

This document provides comprehensive test cases for all User API endpoints using various testing methods.

## Prerequisites

```javascript
// Test Configuration
const BASE_URL = "http://localhost:3000/api/v1/user";
const ADMIN_TOKEN = "your_admin_jwt_token_here";
const USER_TOKEN = "your_user_jwt_token_here";
const TEST_USER_ID = "64a7b8c9d1e2f3a4b5c6d7e8";

// Headers
const ADMIN_HEADERS = {
  "Authorization": `Bearer ${ADMIN_TOKEN}`,
  "Content-Type": "application/json",
  "x-request-id": `test_${Date.now()}`
};

const USER_HEADERS = {
  "Authorization": `Bearer ${USER_TOKEN}`,
  "Content-Type": "application/json",
  "x-request-id": `test_${Date.now()}`
};

const PUBLIC_HEADERS = {
  "Content-Type": "application/json",
  "x-request-id": `test_${Date.now()}`
};
```

---

## 1. User Registration Tests 🌐

### Test Case 1.1: Successful User Registration
```javascript
const testUserRegistrationSuccess = async () => {
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "SecurePass123!",
    birthDate: "1990-05-15",
    phone: "+1234567890",
    marketingConsent: true,
    genderPreference: "male",
    stylePreferences: ["casual", "formal"],
    priceRange: "50-100",
    addressType: "home",
    street: "123 Main St",
    apartment: "Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    categories: ["clothing", "accessories"],
    occasions: ["work", "casual"],
    orderUpdates: true,
    promotionalEmails: false,
    smsNotifications: true,
    styleRecommendations: true,
    isAdmin: false
  };

  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: PUBLIC_HEADERS,
      body: JSON.stringify(userData)
    });
    
    const result = await response.json();
    console.log('✅ User Registration Success:', result);
    
    // Store token for other tests
    if (result.token) {
      localStorage.setItem('test_user_token', result.token);
    }
    
    return result;
  } catch (error) {
    console.error('❌ User Registration Failed:', error);
  }
};
```

### Test Case 1.2: Registration with Missing Required Fields
```javascript
const testUserRegistrationMissingFields = async () => {
  const invalidData = {
    firstName: "John",
    email: "john@example.com"
    // Missing: lastName, password (required fields)
  };

  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(invalidData)
  });
  
  const result = await response.json();
  console.log('Expected 400 Error for missing fields:', result);
};
```

### Test Case 1.3: Registration with Duplicate Email
```javascript
const testUserRegistrationDuplicateEmail = async () => {
  const userData = {
    firstName: "Jane",
    lastName: "Smith",
    email: "john.doe@example.com", // Same email as previous test
    password: "AnotherPass123!",
    marketingConsent: false,
    stylePreferences: ["casual"],
    addressType: "home",
    street: "456 Oak Ave",
    city: "Boston",
    state: "MA",
    zipCode: "02101",
    country: "USA",
    categories: ["clothing"],
    occasions: ["casual"],
    orderUpdates: true,
    promotionalEmails: false,
    smsNotifications: false,
    styleRecommendations: false
  };

  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(userData)
  });
  
  const result = await response.json();
  console.log('Expected 400 Error for duplicate email:', result);
};
```

### Test Case 1.4: Registration with Invalid Email Format
```javascript
const testUserRegistrationInvalidEmail = async () => {
  const userData = {
    firstName: "Invalid",
    lastName: "Email",
    email: "not-an-email", // Invalid format
    password: "ValidPass123!",
    marketingConsent: false,
    stylePreferences: ["casual"],
    addressType: "home",
    street: "789 Pine St",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    country: "USA",
    categories: ["clothing"],
    occasions: ["casual"],
    orderUpdates: true,
    promotionalEmails: false,
    smsNotifications: false,
    styleRecommendations: false
  };

  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(userData)
  });
  
  const result = await response.json();
  console.log('Expected validation error for invalid email:', result);
};
```

### Test Case 1.5: Registration with Optional Fields Only
```javascript
const testUserRegistrationMinimalData = async () => {
  const minimalData = {
    firstName: "Minimal",
    lastName: "User",
    email: "minimal.user@example.com",
    password: "MinimalPass123!",
    marketingConsent: false,
    stylePreferences: ["casual"],
    addressType: "home",
    street: "321 Elm St",
    city: "Denver",
    state: "CO",
    zipCode: "80201",
    country: "USA",
    categories: ["clothing"],
    occasions: ["casual"],
    orderUpdates: false,
    promotionalEmails: false,
    smsNotifications: false,
    styleRecommendations: false
  };

  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(minimalData)
  });
  
  const result = await response.json();
  console.log('✅ Minimal Registration Success:', result);
};
```

---

## 2. User Login Tests 🌐

### Test Case 2.1: Successful Login with Credentials
```javascript
const testUserLoginSuccess = async () => {
  const loginData = {
    email: "john.doe@example.com",
    password: "SecurePass123!"
  };

  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(loginData)
  });
  
  const result = await response.json();
  console.log('✅ User Login Success:', result);
  
  // Store token for other tests
  if (result.token) {
    localStorage.setItem('test_user_token', result.token);
  }
  
  return result;
};
```

### Test Case 2.2: Login with Valid Token (Already Authenticated)
```javascript
const testUserLoginWithToken = async () => {
  const storedToken = localStorage.getItem('test_user_token');
  
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${storedToken}`,
      "Content-Type": "application/json",
      "x-request-id": `test_${Date.now()}`
    },
    body: JSON.stringify({}) // Empty body since token is used
  });
  
  const result = await response.json();
  console.log('✅ Token-based Authentication Success:', result);
};
```

### Test Case 2.3: Login with Invalid Credentials
```javascript
const testUserLoginInvalidCredentials = async () => {
  const invalidLoginData = {
    email: "john.doe@example.com",
    password: "WrongPassword123!"
  };

  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(invalidLoginData)
  });
  
  const result = await response.json();
  console.log('Expected 401 Error for invalid credentials:', result);
};
```

### Test Case 2.4: Login with Non-existent Email
```javascript
const testUserLoginNonexistentEmail = async () => {
  const nonexistentLoginData = {
    email: "nonexistent@example.com",
    password: "AnyPassword123!"
  };

  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(nonexistentLoginData)
  });
  
  const result = await response.json();
  console.log('Expected 404 Error for non-existent user:', result);
};
```

### Test Case 2.5: Login with Missing Fields
```javascript
const testUserLoginMissingFields = async () => {
  const incompleteLoginData = {
    email: "john.doe@example.com"
    // Missing password
  };

  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(incompleteLoginData)
  });
  
  const result = await response.json();
  console.log('Expected 400 Error for missing password:', result);
};
```

### Test Case 2.6: Login with Invalid Email Format
```javascript
const testUserLoginInvalidEmailFormat = async () => {
  const invalidEmailData = {
    email: "invalid-email-format",
    password: "ValidPassword123!"
  };

  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(invalidEmailData)
  });
  
  const result = await response.json();
  console.log('Expected 400 Error for invalid email format:', result);
};
```

---

## 3. Update User Tests 🔒

### Test Case 3.1: Successful User Self-Update
```javascript
const testUserUpdateSuccess = async () => {
  const updateData = {
    firstName: "John Updated",
    phone: "+1987654321",
    stylePreferences: ["casual", "formal", "business"],
    priceRange: "100-200",
    city: "Los Angeles",
    state: "CA"
  };

  const response = await fetch(`${BASE_URL}/update/`, {
    method: 'PATCH',
    headers: USER_HEADERS,
    body: JSON.stringify(updateData)
  });
  
  const result = await response.json();
  console.log('✅ User Update Success:', result);
};
```

### Test Case 3.2: Admin Update Another User
```javascript
const testAdminUpdateUser = async (targetUserId) => {
  const updateData = {
    firstName: "Admin Updated Name",
    isAdmin: false,
    marketingConsent: false
  };

  // Modify headers to target specific user (this would need API modification)
  const adminHeaders = {
    ...ADMIN_HEADERS,
    'target-user-id': targetUserId // Custom header approach
  };

  const response = await fetch(`${BASE_URL}/update/`, {
    method: 'PATCH',
    headers: adminHeaders,
    body: JSON.stringify(updateData)
  });
  
  const result = await response.json();
  console.log('✅ Admin Update Success:', result);
};
```

### Test Case 3.3: Update with Invalid Fields
```javascript
const testUserUpdateInvalidFields = async () => {
  const invalidUpdateData = {
    email: "invalid-email-format", // Invalid email
    birthDate: "invalid-date", // Invalid date
    phone: "123", // Invalid phone format
    invalidField: "should be rejected"
  };

  const response = await fetch(`${BASE_URL}/update/`, {
    method: 'PATCH',
    headers: USER_HEADERS,
    body: JSON.stringify(invalidUpdateData)
  });
  
  const result = await response.json();
  console.log('Expected validation errors:', result);
};
```

### Test Case 3.4: Update with Empty Data
```javascript
const testUserUpdateEmptyData = async () => {
  const emptyUpdateData = {};

  const response = await fetch(`${BASE_URL}/update/`, {
    method: 'PATCH',
    headers: USER_HEADERS,
    body: JSON.stringify(emptyUpdateData)
  });
  
  const result = await response.json();
  console.log('Expected 400 Error for no fields:', result);
};
```

### Test Case 3.5: Non-admin User Trying to Update Admin Fields
```javascript
const testUserUpdateAdminFields = async () => {
  const adminFieldsData = {
    isAdmin: true // Regular user trying to make themselves admin
  };

  const response = await fetch(`${BASE_URL}/update/`, {
    method: 'PATCH',
    headers: USER_HEADERS,
    body: JSON.stringify(adminFieldsData)
  });
  
  const result = await response.json();
  console.log('Admin fields should be rejected for non-admin:', result);
};
```

### Test Case 3.6: Unauthorized Update Attempt
```javascript
const testUserUpdateUnauthorized = async () => {
  const updateData = {
    firstName: "Unauthorized Update"
  };

  const response = await fetch(`${BASE_URL}/update/`, {
    method: 'PATCH',
    headers: PUBLIC_HEADERS, // No token
    body: JSON.stringify(updateData)
  });
  
  const result = await response.json();
  console.log('Expected 401 Error for no authentication:', result);
};
```

---

## 4. Delete User Tests 🔒

### Test Case 4.1: Successful User Self-Deletion
```javascript
const testUserDeleteSuccess = async () => {
  // Create a temporary user first for deletion
  const tempUser = await testUserRegistrationMinimalData();
  
  // Use the token from registration
  const tempHeaders = {
    "Authorization": `Bearer ${tempUser.token}`,
    "Content-Type": "application/json",
    "x-request-id": `test_${Date.now()}`
  };

  const response = await fetch(`${BASE_URL}/delete/`, {
    method: 'DELETE',
    headers: tempHeaders
  });
  
  const result = await response.json();
  console.log('✅ User Deletion Success:', result);
};
```

### Test Case 4.2: Delete User Without Authentication
```javascript
const testUserDeleteUnauthorized = async () => {
  const response = await fetch(`${BASE_URL}/delete/`, {
    method: 'DELETE',
    headers: PUBLIC_HEADERS // No authentication token
  });
  
  const result = await response.json();
  console.log('Expected 401 Error for no authentication:', result);
};
```

### Test Case 4.3: Delete User with Invalid Token
```javascript
const testUserDeleteInvalidToken = async () => {
  const invalidHeaders = {
    "Authorization": "Bearer invalid_token_here",
    "Content-Type": "application/json",
    "x-request-id": `test_${Date.now()}`
  };

  const response = await fetch(`${BASE_URL}/delete/`, {
    method: 'DELETE',
    headers: invalidHeaders
  });
  
  const result = await response.json();
  console.log('Expected 401/403 Error for invalid token:', result);
};
```

---

## 5. Get Users Tests 🔒

### Test Case 5.1: Get All Users (Admin)
```javascript
const testGetAllUsersAdmin = async () => {
  const response = await fetch(`${BASE_URL}/get`, {
    method: 'GET',
    headers: ADMIN_HEADERS
  });
  
  const result = await response.json();
  console.log('✅ Get All Users Success:', result);
};
```

### Test Case 5.2: Get Users Without Authentication
```javascript
const testGetAllUsersUnauthorized = async () => {
  const response = await fetch(`${BASE_URL}/get`, {
    method: 'GET',
    headers: PUBLIC_HEADERS // No authentication
  });
  
  const result = await response.json();
  console.log('Expected 401 Error for no authentication:', result);
};
```

### Test Case 5.3: Get Users with Regular User Token
```javascript
const testGetAllUsersRegularUser = async () => {
  const response = await fetch(`${BASE_URL}/get`, {
    method: 'GET',
    headers: USER_HEADERS // Regular user token
  });
  
  const result = await response.json();
  console.log('Should work if endpoint allows authenticated users:', result);
};
```

---

## Complete Test Suite Runner

### JavaScript Test Runner
```javascript
const runAllUserTests = async () => {
  console.log('🚀 Starting User API Tests...\n');
  
  try {
    // 1. Registration Tests
    console.log('📝 Testing User Registration...');
    await testUserRegistrationSuccess();
    await testUserRegistrationMissingFields();
    await testUserRegistrationDuplicateEmail();
    await testUserRegistrationInvalidEmail();
    await testUserRegistrationMinimalData();
    
    // 2. Login Tests
    console.log('\n🔑 Testing User Login...');
    await testUserLoginSuccess();
    await testUserLoginWithToken();
    await testUserLoginInvalidCredentials();
    await testUserLoginNonexistentEmail();
    await testUserLoginMissingFields();
    await testUserLoginInvalidEmailFormat();
    
    // 3. Update Tests
    console.log('\n✏️ Testing User Update...');
    await testUserUpdateSuccess();
    await testUserUpdateInvalidFields();
    await testUserUpdateEmptyData();
    await testUserUpdateAdminFields();
    await testUserUpdateUnauthorized();
    
    // 4. Get Users Tests
    console.log('\n📋 Testing Get Users...');
    await testGetAllUsersAdmin();
    await testGetAllUsersUnauthorized();
    await testGetAllUsersRegularUser();
    
    // 5. Delete User Tests (run last as it removes users)
    console.log('\n🗑️ Testing User Deletion...');
    await testUserDeleteSuccess();
    await testUserDeleteUnauthorized();
    await testUserDeleteInvalidToken();
    
    console.log('\n✅ All user tests completed!');
  } catch (error) {
    console.error('❌ User test suite failed:', error);
  }
};

// Run the test suite
runAllUserTests();
```

---

## Postman Collection

### Environment Variables
```json
{
  "base_url": "http://localhost:3000/api/v1/user",
  "admin_token": "your_admin_jwt_token_here",
  "user_token": "your_user_jwt_token_here",
  "test_email": "test.user@example.com"
}
```

### Postman Pre-request Script (for Registration)
```javascript
// Generate unique email for testing
const timestamp = Date.now();
const randomString = Math.random().toString(36).substring(7);
const uniqueEmail = `test.${timestamp}.${randomString}@example.com`;

pm.environment.set("unique_email", uniqueEmail);
pm.environment.set("test_password", "TestPass123!");
```

### Postman Test Scripts

#### For Registration Request:
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has token", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('token');
    pm.expect(jsonData).to.have.property('message');
    
    // Store token for subsequent requests
    pm.environment.set("user_token", jsonData.token);
});

pm.test("Token is valid format", function () {
    const jsonData = pm.response.json();
    const token = jsonData.token;
    pm.expect(token).to.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/);
});
```

#### For Login Request:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has user data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('user');
    pm.expect(jsonData).to.have.property('token');
    pm.expect(jsonData.user).to.have.property('email');
    
    // Store token for other requests
    pm.environment.set("user_token", jsonData.token);
});

pm.test("Password not exposed", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.user).to.not.have.property('password');
});
```

#### For Update Request:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response shows updated fields", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('updatedFields');
    pm.expect(jsonData).to.have.property('user');
    pm.expect(jsonData.updatedFields).to.be.an('array');
});
```

---

## cURL Commands

### Register User
```bash
curl -X POST http://localhost:3000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -H "x-request-id: test_$(date +%s)" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "marketingConsent": true,
    "stylePreferences": ["casual"],
    "addressType": "home",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA",
    "categories": ["clothing"],
    "occasions": ["casual"],
    "orderUpdates": true,
    "promotionalEmails": false,
    "smsNotifications": true,
    "styleRecommendations": true
  }'
```

### Login User
```bash
curl -X POST http://localhost:3000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -H "x-request-id: test_$(date +%s)" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

### Update User (Self)
```bash
curl -X PATCH http://localhost:3000/api/v1/user/update/ \
  -H "Authorization: Bearer your_user_token" \
  -H "Content-Type: application/json" \
  -H "x-request-id: test_$(date +%s)" \
  -d '{
    "firstName": "John Updated",
    "phone": "+1987654321",
    "city": "Los Angeles"
  }'
```

### Get All Users (Admin)
```bash
curl -X GET http://localhost:3000/api/v1/user/get \
  -H "Authorization: Bearer your_admin_token" \
  -H "x-request-id: test_$(date +%s)"
```

### Delete User (Self)
```bash
curl -X DELETE http://localhost:3000/api/v1/user/delete/ \
  -H "Authorization: Bearer your_user_token" \
  -H "x-request-id: test_$(date +%s)"
```

---

## Performance Testing with Artillery

### Artillery Configuration
```yaml
# artillery-user-config.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 30
      arrivalRate: 5

scenarios:
  - name: "User Registration Flow"
    weight: 30
    requests:
      - post:
          url: "/api/v1/user/register"
          headers:
            x-request-id: "load_test_{{ $uuid }}"
          json:
            firstName: "Load"
            lastName: "Test{{ $randomInt(1, 1000) }}"
            email: "loadtest{{ $randomInt(1, 10000) }}@example.com"
            password: "LoadTest123!"
            marketingConsent: false
            stylePreferences: ["casual"]
            addressType: "home"
            street: "123 Load Test St"
            city: "Test City"
            state: "TS"
            zipCode: "12345"
            country: "USA"
            categories: ["clothing"]
            occasions: ["casual"]
            orderUpdates: true
            promotionalEmails: false
            smsNotifications: false
            styleRecommendations: false

  - name: "User Login Flow"
    weight: 50
    requests:
      - post:
          url: "/api/v1/user/login"
          headers:
            x-request-id: "login_test_{{ $uuid }}"
          json:
            email: "john.doe@example.com"
            password: "SecurePass123!"

  - name: "Get Users (Admin)"
    weight: 20
    requests:
      - get:
          url: "/api/v1/user/get"
          headers:
            Authorization: "Bearer {{ admin_token }}"
            x-request-id: "get_test_{{ $uuid }}"
```

Run with: `artillery run artillery-user-config.yml`

---

## Test Data Setup

### Sample Users for Testing
```javascript
const testUsers = [
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    password: "AdminPass123!",
    marketingConsent: true,
    stylePreferences: ["luxury", "formal"],
    priceRange: "200+",
    addressType: "office",
    street: "456 Admin Ave",
    city: "Admin City",
    state: "AC",
    zipCode: "54321",
    country: "USA",
    categories: ["all"],
    occasions: ["all"],
    orderUpdates: true,
    promotionalEmails: true,
    smsNotifications: true,
    styleRecommendations: true,
    isAdmin: true
  },
  {
    firstName: "Regular",
    lastName: "User",
    email: "regular@example.com",
    password: "RegularPass123!",
    phone: "+1555123456",
    birthDate: "1985-03-20",
    marketingConsent: false,
    genderPreference: "female",
    stylePreferences: ["casual", "trendy"],
    priceRange: "25-75",
    addressType: "home",
    street: "789 Regular Rd",
    apartment: "Unit 2A",
    city: "Regular Town",
    state: "RT",
    zipCode: "67890",
    country: "USA",
    categories: ["clothing", "shoes"],
    occasions: ["casual", "work"],
    orderUpdates: false,
    promotionalEmails: false,
    smsNotifications: true,
    styleRecommendations: false,
    isAdmin: false
  }
];

// Function to create test users
const setupUserTestData = async () => {
  for (const user of testUsers) {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: PUBLIC_HEADERS,
        body: JSON.stringify(user)
      });
      const result = await response.json();
      console.log(`Created test user: ${user.email}`, result);
    } catch (error) {
      console.error(`Failed to create test user ${user.email}:`, error);
    }
  }
};
```

---

## Security Testing

### Test Invalid JWT Tokens
```javascript
const testSecurityScenarios = async () => {
  const invalidTokens = [
    "invalid.token.here",
    "Bearer malformed_token",
    "expired_token_here",
    null,
    undefined,
    ""
  ];

  for (const token of invalidTokens) {
    console.log(`Testing with token: ${token}`);
    
    const headers = token ? {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    } : PUBLIC_HEADERS;

    try {
      const response = await fetch(`${BASE_URL}/get`, {
        method: 'GET',
        headers: headers
      });
      
      const result = await response.json();
      console.log(`Response for token "${token}":`, result.message);
    } catch (error) {
      console.error(`Error with token "${token}":`, error.message);
    }
  }
};
```

This comprehensive testing collection covers all User API endpoints with various scenarios including success cases, error cases, security testing, and performance testing. The tests can be run using JavaScript, Postman, cURL commands, or integrated into CI/CD pipelines for automated testing.

# Product API Documentation

## Base URL
```
/api/v1/product
```

## Authentication
- **Admin Required**: Endpoints marked with 🔒 require admin authentication
- **Public**: Endpoints marked with 🌐 are publicly accessible
- **Authentication Method**: Bearer Token in Authorization header or `elegance_session` cookie

---

## Endpoints Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/create` | 🔒 | Create a new product |
| DELETE | `/delete/:id` | 🔒 | Delete a product by ID |
| GET | `/all` | 🌐 | Get all products with filters |
| POST | `/search` | 🌐 | Search products with criteria |
| PATCH | `/update/:id` | 🔒 | Update an existing product |

---

## 1. Create Product 🔒

### `POST /api/v1/product/create`

Creates a new product. Only accessible by admin users.

#### Headers
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "name": "Cotton T-Shirt",                    // Required: string
  "description": "Comfortable cotton t-shirt", // Required: string
  "price": 25.99,                              // Required: number (≥0)
  "originalPrice": 35.99,                      // Optional: number (≥0)
  "category": "Clothing",                      // Required: string
  "collections": "Summer Collection",          // Required: string
  "image": "64a7b8c9d1e2f3a4b5c6d7e8",        // Optional: ObjectId
  "rating": 4.5,                               // Optional: number (0-5)
  "reviews": 10,                               // Optional: number (≥0)
  "colors": ["red", "blue", "white"],          // Required: array of strings
  "sizes": ["S", "M", "L", "XL"],              // Required: array of strings
  "stock": 100,                                // Required: number (≥0)
  "is_New": true,                              // Optional: boolean
  "isFavorite": false                          // Optional: boolean
}
```

#### Success Response (201)
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "name": "Cotton T-Shirt",
    "description": "Comfortable cotton t-shirt",
    "price": 25.99,
    "originalPrice": 35.99,
    "category": "Clothing",
    "collections": "Summer Collection",
    "colors": ["red", "blue", "white"],
    "sizes": ["S", "M", "L", "XL"],
    "stock": 100,
    "rating": 0,
    "reviews": 0,
    "is_New": true,
    "isFavorite": false,
    "createdAt": "2025-08-08T10:00:00.000Z",
    "updatedAt": "2025-08-08T10:00:00.000Z"
  }
}
```

#### Error Responses
- **400**: Missing required fields or validation errors
- **401**: Authentication required
- **403**: Admin privileges required
- **500**: Server error

---

## 2. Delete Product 🔒

### `DELETE /api/v1/product/delete/:id`

Deletes a product by ID. Only accessible by admin users.

#### Headers
```
Authorization: Bearer <admin_token>
```

#### URL Parameters
- `id` (string): MongoDB ObjectId of the product to delete

#### Success Response (200)
```json
{
  "message": "Product deleted successfully",
  "deletedProduct": {
    "id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "name": "Cotton T-Shirt"
  }
}
```

#### Error Responses
- **400**: Invalid product ID format
- **401**: Authentication required
- **403**: Admin privileges required
- **404**: Product not found
- **500**: Server error

---

## 3. Get All Products 🌐

### `GET /api/v1/product/all`

Retrieves all products with optional filtering, pagination, and sorting. Public endpoint.

#### Query Parameters
```
?page=1                    // Page number (default: 1)
&limit=10                  // Items per page (default: 10, max: 100)
&category=clothing         // Filter by category (case-insensitive)
&collections=summer        // Filter by collections (case-insensitive)
&minPrice=10              // Minimum price filter
&maxPrice=50              // Maximum price filter
&colors=red,blue          // Filter by colors (comma-separated)
&sizes=M,L                // Filter by sizes (comma-separated)
&is_New=true              // Filter new products only
&sortBy=createdAt         // Sort field (createdAt, price, name, rating)
&sortOrder=desc           // Sort order (asc, desc)
```

#### Example Request
```
GET /api/v1/product/all?page=2&limit=20&category=clothing&minPrice=10&maxPrice=50&colors=red,blue&sortBy=price&sortOrder=asc
```

#### Success Response (200)
```json
{
  "message": "Products retrieved successfully",
  "products": [
    {
      "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
      "name": "Cotton T-Shirt",
      "description": "Comfortable cotton t-shirt",
      "price": 25.99,
      "category": "Clothing",
      "colors": ["red", "blue"],
      "sizes": ["M", "L"],
      "stock": 100,
      "rating": 4.5,
      "reviews": 10,
      "image": { /* populated image object */ }
    }
  ],
  "pagination": {
    "currentPage": 2,
    "totalPages": 5,
    "totalProducts": 47,
    "hasNextPage": true,
    "hasPrevPage": true,
    "limit": 20
  },
  "filters": {
    "category": "clothing",
    "minPrice": "10",
    "maxPrice": "50",
    "colors": "red,blue"
  }
}
```

#### Error Responses
- **500**: Server error

---

## 4. Search Products 🌐

### `POST /api/v1/product/search`

Advanced product search with multiple criteria. Public endpoint.

#### Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "name": "t-shirt",                    // Search in product name
  "description": "cotton",              // Search in description
  "category": "clothing",               // Search in category
  "collections": "summer",              // Search in collections
  "searchText": "cotton shirt",         // General text search across multiple fields
  "colors": ["red", "blue"],            // Filter by colors array
  "sizes": ["M", "L"],                  // Filter by sizes array
  "minPrice": 20,                       // Minimum price
  "maxPrice": 100,                      // Maximum price
  "minRating": 4,                       // Minimum rating
  "is_New": true,                       // Filter new products
  "isFavorite": false,                  // Filter favorite products
  "page": 1,                            // Page number (default: 1)
  "limit": 20,                          // Items per page (default: 20, max: 100)
  "sortBy": "price",                    // Sort field
  "sortOrder": "asc"                    // Sort order
}
```

#### Success Response (200)
```json
{
  "message": "Products found successfully",
  "products": [
    {
      "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
      "name": "Cotton T-Shirt",
      "description": "Comfortable cotton t-shirt",
      "price": 25.99,
      "category": "Clothing",
      "collections": "Summer Collection",
      "colors": ["red", "blue"],
      "sizes": ["M", "L"],
      "stock": 50,
      "rating": 4.5,
      "reviews": 15,
      "is_New": true,
      "isFavorite": false,
      "image": { /* populated image object */ }
    }
  ],
  "searchCriteria": {
    "searchText": "cotton shirt",
    "minPrice": 20,
    "maxPrice": 100,
    "colors": ["red", "blue"]
  },
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalProducts": 25,
    "hasNextPage": true,
    "hasPrevPage": false,
    "limit": 20
  }
}
```

#### Error Responses
- **400**: Invalid search parameters
- **500**: Server error

---

## 5. Update Product 🔒

### `PATCH /api/v1/product/update/:id`

Updates an existing product. Only accessible by admin users.

#### Headers
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

#### URL Parameters
- `id` (string): MongoDB ObjectId of the product to update

#### Request Body
```json
{
  "name": "Updated Product Name",       // Optional: string
  "description": "Updated description", // Optional: string
  "price": 29.99,                       // Optional: number (≥0)
  "originalPrice": 39.99,               // Optional: number (≥0)
  "category": "Updated Category",       // Optional: string
  "collections": "Updated Collection",  // Optional: string
  "image": "64a7b8c9d1e2f3a4b5c6d7e8",  // Optional: ObjectId
  "rating": 4.8,                        // Optional: number (0-5)
  "reviews": 25,                        // Optional: number (≥0)
  "colors": ["red", "blue", "green"],   // Optional: array of strings
  "sizes": ["S", "M", "L", "XL"],       // Optional: array of strings
  "stock": 75,                          // Optional: number (≥0)
  "is_New": false,                      // Optional: boolean
  "isFavorite": true                    // Optional: boolean
}
```

#### Success Response (200)
```json
{
  "message": "Product updated successfully",
  "product": {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "name": "Updated Product Name",
    "description": "Updated description",
    "price": 29.99,
    "originalPrice": 39.99,
    "category": "Updated Category",
    "collections": "Updated Collection",
    "colors": ["red", "blue", "green"],
    "sizes": ["S", "M", "L", "XL"],
    "stock": 75,
    "rating": 4.8,
    "reviews": 25,
    "is_New": false,
    "isFavorite": true,
    "createdAt": "2025-08-08T10:00:00.000Z",
    "updatedAt": "2025-08-08T12:30:00.000Z",
    "image": { /* populated image object */ }
  },
  "updatedFields": ["name", "price", "stock", "isFavorite"]
}
```

#### Error Responses
- **400**: Invalid product ID format, validation errors, or no valid fields
- **401**: Authentication required
- **403**: Admin privileges required
- **404**: Product not found
- **500**: Server error

---

## Data Models

### Product Schema
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required, ≥0),
  originalPrice: Number (optional, ≥0),
  category: String (required),
  collections: String (required),
  image: ObjectId (optional, ref: "Image"),
  rating: Number (optional, 0-5, default: 0),
  reviews: Number (optional, ≥0, default: 0),
  colors: [String] (required),
  sizes: [String] (required),
  stock: Number (required, ≥0),
  is_New: Boolean (optional, default: false),
  isFavorite: Boolean (optional, default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request (validation error, invalid format) |
| 401 | Unauthorized (authentication required) |
| 403 | Forbidden (admin privileges required) |
| 404 | Not found |
| 500 | Internal server error |

---

## Authentication Flow

1. **Login**: Obtain JWT token through authentication endpoint
2. **Include Token**: Add token to `Authorization` header as `Bearer <token>` or set as `elegance_session` cookie
3. **Admin Check**: Server validates token and checks `isAdmin` flag
4. **Access Control**: Admin-only endpoints reject non-admin users with 403 error

---

## Rate Limiting & Best Practices

- **Search Endpoints**: Use pagination to avoid large result sets
- **Validation**: All input is validated server-side
- **Error Handling**: Descriptive error messages in development mode
- **Performance**: Use lean queries and population for optimal performance
- **Security**: Admin endpoints require proper authentication and authorization

---

## Example Usage

### JavaScript (Fetch API)
```javascript
// Create product (Admin)
const createProduct = async (productData, token) => {
  const response = await fetch('/api/v1/product/create', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });
  return response.json();
};

// Search products (Public)
const searchProducts = async (searchCriteria) => {
  const response = await fetch('/api/v1/product/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(searchCriteria)
  });
  return response.json();
};

// Get all products with filters (Public)
const getAllProducts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/v1/product/all?${queryString}`);
  return response.json();
};
```

# Product API Testing Collection

This document provides comprehensive test cases for all Product API endpoints using various testing methods.

## Prerequisites

```javascript
// Test Configuration
const BASE_URL = "http://localhost:3000/api/v1/product";
const ADMIN_TOKEN = "your_admin_jwt_token_here";
const TEST_PRODUCT_ID = "64a7b8c9d1e2f3a4b5c6d7e8";
const TEST_IMAGE_ID = "64a7b8c9d1e2f3a4b5c6d7f9";

// Headers
const ADMIN_HEADERS = {
  "Authorization": `Bearer ${ADMIN_TOKEN}`,
  "Content-Type": "application/json"
};

const PUBLIC_HEADERS = {
  "Content-Type": "application/json"
};
```

---

## 1. Create Product Tests 🔒

### Test Case 1.1: Successful Product Creation (Admin)
```javascript
// JavaScript (Fetch)
const testCreateProductSuccess = async () => {
  const productData = {
    name: "Premium Cotton T-Shirt",
    description: "High-quality 100% cotton t-shirt with premium finish",
    price: 29.99,
    originalPrice: 39.99,
    category: "Clothing",
    collections: "Summer 2024",
    colors: ["white", "black", "navy"],
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
    is_New: true,
    isFavorite: false
  };

  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: ADMIN_HEADERS,
      body: JSON.stringify(productData)
    });
    
    const result = await response.json();
    console.log('✅ Create Product Success:', result);
    return result.product._id; // Save for other tests
  } catch (error) {
    console.error('❌ Create Product Failed:', error);
  }
};
```

### Test Case 1.2: Missing Required Fields
```javascript
const testCreateProductMissingFields = async () => {
  const invalidData = {
    name: "Incomplete Product",
    price: 25.99
    // Missing: description, category, collections, colors, sizes, stock
  };

  const response = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: ADMIN_HEADERS,
    body: JSON.stringify(invalidData)
  });
  
  const result = await response.json();
  console.log('Expected 400 Error:', result);
};
```

### Test Case 1.3: Invalid Price Validation
```javascript
const testCreateProductInvalidPrice = async () => {
  const invalidData = {
    name: "Invalid Price Product",
    description: "Product with negative price",
    price: -10.99, // Invalid: negative price
    category: "Test",
    collections: "Test Collection",
    colors: ["red"],
    sizes: ["M"],
    stock: 10
  };

  const response = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: ADMIN_HEADERS,
    body: JSON.stringify(invalidData)
  });
  
  const result = await response.json();
  console.log('Expected 400 Error for negative price:', result);
};
```

### Test Case 1.4: Unauthorized Access (Non-Admin)
```javascript
const testCreateProductUnauthorized = async () => {
  const productData = {
    name: "Unauthorized Product",
    description: "This should fail",
    price: 25.99,
    category: "Test",
    collections: "Test",
    colors: ["red"],
    sizes: ["M"],
    stock: 10
  };

  const response = await fetch(`${BASE_URL}/create`, {
    method: 'POST',
    headers: PUBLIC_HEADERS, // No admin token
    body: JSON.stringify(productData)
  });
  
  const result = await response.json();
  console.log('Expected 401 Error:', result);
};
```

---

## 2. Delete Product Tests 🔒

### Test Case 2.1: Successful Product Deletion (Admin)
```javascript
const testDeleteProductSuccess = async (productId) => {
  const response = await fetch(`${BASE_URL}/delete/${productId}`, {
    method: 'DELETE',
    headers: ADMIN_HEADERS
  });
  
  const result = await response.json();
  console.log('✅ Delete Product Success:', result);
};
```

### Test Case 2.2: Invalid Product ID Format
```javascript
const testDeleteProductInvalidId = async () => {
  const invalidId = "invalid-id-format";
  
  const response = await fetch(`${BASE_URL}/delete/${invalidId}`, {
    method: 'DELETE',
    headers: ADMIN_HEADERS
  });
  
  const result = await response.json();
  console.log('Expected 400 Error for invalid ID:', result);
};
```

### Test Case 2.3: Product Not Found
```javascript
const testDeleteProductNotFound = async () => {
  const nonExistentId = "64a7b8c9d1e2f3a4b5c6d7e0"; // Valid ObjectId but doesn't exist
  
  const response = await fetch(`${BASE_URL}/delete/${nonExistentId}`, {
    method: 'DELETE',
    headers: ADMIN_HEADERS
  });
  
  const result = await response.json();
  console.log('Expected 404 Error:', result);
};
```

---

## 3. Get All Products Tests 🌐

### Test Case 3.1: Get All Products (Basic)
```javascript
const testGetAllProductsBasic = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  const result = await response.json();
  console.log('✅ Get All Products:', result);
};
```

### Test Case 3.2: Get Products with Pagination
```javascript
const testGetAllProductsPagination = async () => {
  const params = new URLSearchParams({
    page: '2',
    limit: '5'
  });
  
  const response = await fetch(`${BASE_URL}/all?${params}`);
  const result = await response.json();
  console.log('✅ Get Products with Pagination:', result);
};
```

### Test Case 3.3: Get Products with Filters
```javascript
const testGetAllProductsFiltered = async () => {
  const params = new URLSearchParams({
    category: 'clothing',
    minPrice: '20',
    maxPrice: '100',
    colors: 'red,blue',
    sizes: 'M,L',
    is_New: 'true',
    sortBy: 'price',
    sortOrder: 'asc'
  });
  
  const response = await fetch(`${BASE_URL}/all?${params}`);
  const result = await response.json();
  console.log('✅ Get Filtered Products:', result);
};
```

### Test Case 3.4: Get Products with Invalid Pagination
```javascript
const testGetAllProductsInvalidPagination = async () => {
  const params = new URLSearchParams({
    page: '-1',
    limit: '1000' // Exceeds maximum
  });
  
  const response = await fetch(`${BASE_URL}/all?${params}`);
  const result = await response.json();
  console.log('Pagination should be corrected:', result.pagination);
};
```

---

## 4. Search Products Tests 🌐

### Test Case 4.1: General Text Search
```javascript
const testSearchProductsText = async () => {
  const searchData = {
    searchText: "cotton shirt",
    page: 1,
    limit: 10
  };

  const response = await fetch(`${BASE_URL}/search`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(searchData)
  });
  
  const result = await response.json();
  console.log('✅ Text Search Results:', result);
};
```

### Test Case 4.2: Advanced Search with Multiple Criteria
```javascript
const testSearchProductsAdvanced = async () => {
  const searchData = {
    category: "clothing",
    colors: ["red", "blue"],
    sizes: ["M", "L"],
    minPrice: 20,
    maxPrice: 100,
    minRating: 4,
    is_New: true,
    sortBy: "price",
    sortOrder: "asc",
    page: 1,
    limit: 20
  };

  const response = await fetch(`${BASE_URL}/search`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(searchData)
  });
  
  const result = await response.json();
  console.log('✅ Advanced Search Results:', result);
};
```

### Test Case 4.3: Search by Specific Fields
```javascript
const testSearchProductsSpecific = async () => {
  const searchData = {
    name: "t-shirt",
    description: "cotton",
    category: "clothing",
    collections: "summer"
  };

  const response = await fetch(`${BASE_URL}/search`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(searchData)
  });
  
  const result = await response.json();
  console.log('✅ Specific Field Search Results:', result);
};
```

### Test Case 4.4: Search with No Results
```javascript
const testSearchProductsNoResults = async () => {
  const searchData = {
    searchText: "nonexistent-product-xyz123",
    minPrice: 1000000 // Unrealistic price
  };

  const response = await fetch(`${BASE_URL}/search`, {
    method: 'POST',
    headers: PUBLIC_HEADERS,
    body: JSON.stringify(searchData)
  });
  
  const result = await response.json();
  console.log('✅ No Results Search (should return empty array):', result);
};
```

---

## 5. Update Product Tests 🔒

### Test Case 5.1: Successful Product Update (Admin)
```javascript
const testUpdateProductSuccess = async (productId) => {
  const updateData = {
    name: "Updated Premium T-Shirt",
    price: 34.99,
    stock: 75,
    colors: ["white", "black", "navy", "gray"],
    is_New: false,
    isFavorite: true
  };

  const response = await fetch(`${BASE_URL}/update/${productId}`, {
    method: 'PATCH',
    headers: ADMIN_HEADERS,
    body: JSON.stringify(updateData)
  });
  
  const result = await response.json();
  console.log('✅ Update Product Success:', result);
};
```

### Test Case 5.2: Update with Invalid Data
```javascript
const testUpdateProductInvalidData = async (productId) => {
  const invalidData = {
    price: -50, // Invalid negative price
    stock: -10, // Invalid negative stock
    rating: 10, // Invalid rating (max is 5)
    colors: [], // Invalid empty array
    name: "" // Invalid empty string
  };

  const response = await fetch(`${BASE_URL}/update/${productId}`, {
    method: 'PATCH',
    headers: ADMIN_HEADERS,
    body: JSON.stringify(invalidData)
  });
  
  const result = await response.json();
  console.log('Expected 400 Validation Error:', result);
};
```

### Test Case 5.3: Update Non-existent Product
```javascript
const testUpdateProductNotFound = async () => {
  const nonExistentId = "64a7b8c9d1e2f3a4b5c6d7e0";
  const updateData = { name: "Updated Name" };

  const response = await fetch(`${BASE_URL}/update/${nonExistentId}`, {
    method: 'PATCH',
    headers: ADMIN_HEADERS,
    body: JSON.stringify(updateData)
  });
  
  const result = await response.json();
  console.log('Expected 404 Error:', result);
};
```

### Test Case 5.4: Update with No Fields
```javascript
const testUpdateProductNoFields = async (productId) => {
  const emptyData = {};

  const response = await fetch(`${BASE_URL}/update/${productId}`, {
    method: 'PATCH',
    headers: ADMIN_HEADERS,
    body: JSON.stringify(emptyData)
  });
  
  const result = await response.json();
  console.log('Expected 400 Error for no fields:', result);
};
```

---

## Complete Test Suite Runner

### JavaScript Test Runner
```javascript
const runAllTests = async () => {
  console.log('🚀 Starting Product API Tests...\n');
  
  try {
    // 1. Create Product Tests
    console.log('📝 Testing Product Creation...');
    const newProductId = await testCreateProductSuccess();
    await testCreateProductMissingFields();
    await testCreateProductInvalidPrice();
    await testCreateProductUnauthorized();
    
    // 2. Get All Products Tests
    console.log('\n📋 Testing Get All Products...');
    await testGetAllProductsBasic();
    await testGetAllProductsPagination();
    await testGetAllProductsFiltered();
    await testGetAllProductsInvalidPagination();
    
    // 3. Search Products Tests
    console.log('\n🔍 Testing Product Search...');
    await testSearchProductsText();
    await testSearchProductsAdvanced();
    await testSearchProductsSpecific();
    await testSearchProductsNoResults();
    
    // 4. Update Product Tests (use created product ID)
    if (newProductId) {
      console.log('\n✏️ Testing Product Update...');
      await testUpdateProductSuccess(newProductId);
      await testUpdateProductInvalidData(newProductId);
      await testUpdateProductNoFields(newProductId);
    }
    await testUpdateProductNotFound();
    
    // 5. Delete Product Tests
    console.log('\n🗑️ Testing Product Deletion...');
    if (newProductId) {
      await testDeleteProductSuccess(newProductId);
    }
    await testDeleteProductInvalidId();
    await testDeleteProductNotFound();
    
    console.log('\n✅ All tests completed!');
  } catch (error) {
    console.error('❌ Test suite failed:', error);
  }
};

// Run the test suite
runAllTests();
```

---

## Postman Collection

### Environment Variables
```json
{
  "base_url": "http://localhost:3000/api/v1/product",
  "admin_token": "your_admin_jwt_token_here",
  "test_product_id": "64a7b8c9d1e2f3a4b5c6d7e8"
}
```

### Postman Test Scripts

#### For Create Product Request:
```javascript
// Test script to add to Postman
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has product data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('message');
    pm.expect(jsonData).to.have.property('product');
    pm.expect(jsonData.product).to.have.property('_id');
    
    // Save product ID for other tests
    pm.environment.set("created_product_id", jsonData.product._id);
});

pm.test("Product has required fields", function () {
    const product = pm.response.json().product;
    pm.expect(product).to.have.property('name');
    pm.expect(product).to.have.property('description');
    pm.expect(product).to.have.property('price');
    pm.expect(product).to.have.property('colors');
    pm.expect(product).to.have.property('sizes');
});
```

#### For Search Products Request:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has search results structure", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('products');
    pm.expect(jsonData).to.have.property('pagination');
    pm.expect(jsonData).to.have.property('searchCriteria');
});

pm.test("Products array is valid", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.products).to.be.an('array');
});
```

---

## cURL Commands

### Create Product
```bash
curl -X POST http://localhost:3000/api/v1/product/create \
  -H "Authorization: Bearer your_admin_token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test Description",
    "price": 25.99,
    "category": "Test Category",
    "collections": "Test Collection",
    "colors": ["red", "blue"],
    "sizes": ["M", "L"],
    "stock": 100
  }'
```

### Get All Products with Filters
```bash
curl -X GET "http://localhost:3000/api/v1/product/all?page=1&limit=10&category=clothing&minPrice=20&maxPrice=50"
```

### Search Products
```bash
curl -X POST http://localhost:3000/api/v1/product/search \
  -H "Content-Type: application/json" \
  -d '{
    "searchText": "cotton shirt",
    "minPrice": 20,
    "maxPrice": 100,
    "page": 1,
    "limit": 10
  }'
```

### Update Product
```bash
curl -X PATCH http://localhost:3000/api/v1/product/update/64a7b8c9d1e2f3a4b5c6d7e8 \
  -H "Authorization: Bearer your_admin_token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "price": 29.99,
    "stock": 75
  }'
```

### Delete Product
```bash
curl -X DELETE http://localhost:3000/api/v1/product/delete/64a7b8c9d1e2f3a4b5c6d7e8 \
  -H "Authorization: Bearer your_admin_token"
```

---

## Performance Tests

### Load Testing with Artillery
```yaml
# artillery-config.yml
config:
  target: 'http://localhost:3000'
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "Get All Products"
    requests:
      - get:
          url: "/api/v1/product/all"
          
  - name: "Search Products"
    requests:
      - post:
          url: "/api/v1/product/search"
          json:
            searchText: "test"
            page: 1
            limit: 10
```

Run with: `artillery run artillery-config.yml`

---

## Test Data Setup

### Sample Products for Testing
```javascript
const testProducts = [
  {
    name: "Classic White T-Shirt",
    description: "100% cotton classic fit t-shirt",
    price: 19.99,
    category: "Clothing",
    collections: "Basics",
    colors: ["white", "black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
    is_New: false
  },
  {
    name: "Premium Denim Jeans",
    description: "High-quality denim with comfortable fit",
    price: 79.99,
    originalPrice: 99.99,
    category: "Clothing",
    collections: "Premium",
    colors: ["blue", "black", "grey"],
    sizes: ["28", "30", "32", "34", "36"],
    stock: 50,
    is_New: true
  },
  {
    name: "Summer Dress",
    description: "Light and breezy summer dress",
    price: 45.99,
    category: "Women's Clothing",
    collections: "Summer 2024",
    colors: ["floral", "solid blue", "white"],
    sizes: ["XS", "S", "M", "L"],
    stock: 25,
    is_New: true,
    isFavorite: true
  }
];

// Function to create test data
const setupTestData = async () => {
  for (const product of testProducts) {
    await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: ADMIN_HEADERS,
      body: JSON.stringify(product)
    });
  }
};
```
# Wishlist API Documentation

A comprehensive Node.js/Express API for managing user wishlists with MongoDB integration, JWT authentication, and detailed logging.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **JWT Authentication** - Secure user authentication with token verification
- **MongoDB Integration** - Mongoose ODM with advanced schema validation
- **Comprehensive Logging** - Detailed request/response logging with unique request IDs
- **Error Handling** - Structured error responses with proper HTTP status codes
- **Data Validation** - Input validation and sanitization
- **Population** - Automatic population of product and user references
- **Duplicate Prevention** - Built-in duplicate product prevention
- **Performance Tracking** - Response time monitoring

## 🔧 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd wishlist-api
```

2. **Install dependencies**
```bash
npm install express mongoose cors morgan winston
# or
yarn add express mongoose cors morgan winston
```

3. **Install dev dependencies (optional)**
```bash
npm install --save-dev nodemon
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
# or for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Server
PORT=3000
NODE_ENV=development

# JWT (configure in your auth middleware)
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

### Project Structure
```
project/
├── middleware/
│   └── VerifyToken.js
├── model/
│   └── ExportModel.js
├── routes/
│   └── wishlist.js
├── logs/
│   ├── error.log
│   └── combined.log
└── server.js
```

## 🗃️ Database Schema

### Wishlist Schema
```javascript
{
  userId: ObjectId (ref: 'User', required, unique),
  items: [{
    productId: ObjectId (ref: 'Product', required),
    addedAt: Date (default: now),
    preferredSize: String (optional),
    preferredColor: String (optional)
  }],
  createdAt: Date (default: now),
  updatedAt: Date (auto-updated)
}
```

### User Schema (Reference)
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  // ... other user fields
}
```

### Product Schema (Reference)
```javascript
{
  name: String (required),
  price: Number (required),
  originalPrice: Number (optional),
  image: ObjectId (ref: 'Image'),
  category: String (required),
  colors: [String] (required),
  sizes: [String] (required),
  // ... other product fields
}
```

## 🔐 Authentication

All endpoints require JWT authentication via the `VerifyToken` middleware.

### Token Format
```
Authorization: Bearer <your-jwt-token>
```

### Token Payload
```javascript
{
  id: "user-object-id",
  email: "user@example.com",
  // ... other user data
}
```

## 🚀 API Endpoints

### 1. Add to Wishlist
Add a product to the user's wishlist.

```http
POST /api/v1/wishlist/add
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "preferredSize": "L",
  "preferredColor": "Black"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Item added to wishlist successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439010",
    "items": [
      {
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Wireless Headphones",
          "price": 99.99,
          "image": "507f1f77bcf86cd799439012"
        },
        "preferredSize": "L",
        "preferredColor": "Black",
        "addedAt": "2024-08-10T10:30:00.000Z"
      }
    ],
    "createdAt": "2024-08-10T10:30:00.000Z",
    "updatedAt": "2024-08-10T10:30:00.000Z"
  }
}
```

### 2. Remove from Wishlist
Remove a product from the user's wishlist.

```http
DELETE /api/v1/wishlist/remove
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439011"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Item removed from wishlist successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439010",
    "items": [],
    "createdAt": "2024-08-10T10:30:00.000Z",
    "updatedAt": "2024-08-10T10:31:00.000Z"
  }
}
```

### 3. Update Wishlist Item
Update preferences for an existing item in the wishlist.

```http
PUT /api/v1/wishlist/update
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "preferredSize": "XL",
  "preferredColor": "Navy Blue"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Item preferences updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439010",
    "items": [
      {
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Wireless Headphones",
          "price": 99.99,
          "image": "507f1f77bcf86cd799439012"
        },
        "preferredSize": "XL",
        "preferredColor": "Navy Blue",
        "addedAt": "2024-08-10T10:30:00.000Z"
      }
    ],
    "createdAt": "2024-08-10T10:30:00.000Z",
    "updatedAt": "2024-08-10T10:32:00.000Z"
  }
}
```

## 💻 Usage Examples

### Basic Setup
```javascript
import express from 'express';
import mongoose from 'mongoose';
import WishlistRoutes from './routes/wishlist.js';

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);

// Apply wishlist routes
WishlistRoutes(app);

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Frontend Integration

#### JavaScript/Fetch
```javascript
// Add to wishlist
async function addToWishlist(productId, size, color) {
  const response = await fetch('/api/v1/wishlist/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      productId,
      preferredSize: size,
      preferredColor: color
    })
  });
  
  const data = await response.json();
  
  if (data.success) {
    console.log('Added to wishlist:', data.data);
  } else {
    console.error('Error:', data.message);
  }
}

// Remove from wishlist
async function removeFromWishlist(productId) {
  const response = await fetch('/api/v1/wishlist/remove', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ productId })
  });
  
  const data = await response.json();
  return data;
}

// Update item preferences
async function updateWishlistItem(productId, size, color) {
  const response = await fetch('/api/v1/wishlist/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      productId,
      preferredSize: size,
      preferredColor: color
    })
  });
  
  return await response.json();
}
```

#### React Example
```jsx
import { useState } from 'react';

function WishlistButton({ productId, onUpdate }) {
  const [loading, setLoading] = useState(false);
  
  const handleAddToWishlist = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ productId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        onUpdate(data.data);
        alert('Added to wishlist!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add to wishlist');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <button 
      onClick={handleAddToWishlist}
      disabled={loading}
      className="wishlist-btn"
    >
      {loading ? 'Adding...' : 'Add to Wishlist'}
    </button>
  );
}
```

## ❌ Error Handling

### HTTP Status Codes

| Status Code | Description | Example |
|-------------|-------------|---------|
| `200` | Success - Operation completed | Item updated successfully |
| `201` | Created - Item added to wishlist | Item added successfully |
| `400` | Bad Request - Invalid input data | Invalid product ID format |
| `401` | Unauthorized - Authentication required | Invalid or missing token |
| `404` | Not Found - Resource doesn't exist | Product/wishlist not found |
| `409` | Conflict - Resource already exists | Product already in wishlist |
| `500` | Internal Server Error - Server issue | Database connection error |

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

### Common Error Scenarios

#### Invalid Product ID
```json
{
  "success": false,
  "message": "Valid product ID is required"
}
```

#### Product Already in Wishlist
```json
{
  "success": false,
  "message": "Product already exists in wishlist"
}
```

#### Authentication Required
```json
{
  "success": false,
  "message": "User authentication required"
}
```

## 📝 Logging

The API provides comprehensive logging for monitoring and debugging.

### Log Levels
- **INFO**: Normal operations, request tracking
- **WARN**: Warning conditions, validation failures
- **ERROR**: Error conditions, exceptions

### Log Format
```
[OPERATION] Description - UserID: <id>, RequestID: <id>, Additional info
```

### Sample Logs
```
[ADD_WISHLIST] Request initiated - UserID: 507f1f77bcf86cd799439011, RequestID: abc123def, Timestamp: 2024-08-10T10:30:00.000Z
[ADD_WISHLIST] Product verified - UserID: 507f1f77bcf86cd799439011, RequestID: abc123def, ProductID: 507f1f77bcf86cd799439012, Name: Wireless Headphones, Price: $99.99
[ADD_WISHLIST] Item added successfully - UserID: 507f1f77bcf86cd799439011, RequestID: abc123def, ProductID: 507f1f77bcf86cd799439012, Items count: 3, Response time: 245ms
```

### Log Files
- `logs/combined.log` - All log levels
- `logs/error.log` - Error logs only

## 🧪 Testing

### Manual Testing with cURL

#### Add to Wishlist
```bash
curl -X POST http://localhost:3000/api/v1/wishlist/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "507f1f77bcf86cd799439011",
    "preferredSize": "L",
    "preferredColor": "Black"
  }'
```

#### Remove from Wishlist
```bash
curl -X DELETE http://localhost:3000/api/v1/wishlist/remove \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "507f1f77bcf86cd799439011"
  }'
```

#### Update Wishlist Item
```bash
curl -X PUT http://localhost:3000/api/v1/wishlist/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "507f1f77bcf86cd799439011",
    "preferredSize": "XL",
    "preferredColor": "Navy"
  }'
```

### Testing with Postman

1. Create a new collection called "Wishlist API"
2. Set up environment variables:
   - `baseUrl`: `http://localhost:3000`
   - `token`: `your-jwt-token`
3. Create requests for each endpoint
4. Use `{{baseUrl}}` and `{{token}}` in your requests

### Unit Testing (Optional)
```javascript
// Example with Jest and Supertest
import request from 'supertest';
import app from '../server.js';

describe('Wishlist API', () => {
  let token;
  
  beforeAll(async () => {
    // Get authentication token
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    token = response.body.token;
  });
  
  test('should add item to wishlist', async () => {
    const response = await request(app)
      .post('/api/v1/wishlist/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId: '507f1f77bcf86cd799439011',
        preferredSize: 'L'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

## 🔧 Troubleshooting

### Common Issues

#### "User authentication required"
- **Cause**: Missing or invalid JWT token
- **Solution**: Ensure token is included in Authorization header
```javascript
headers: {
  'Authorization': `Bearer ${your-token}`
}
```

#### "Product not found"
- **Cause**: Invalid product ID or product doesn't exist
- **Solution**: Verify product exists in database and ID is correct

#### "Product already exists in wishlist"
- **Cause**: Attempting to add duplicate product
- **Solution**: Check if product is already in wishlist before adding

#### "Failed to connect to MongoDB"
- **Cause**: Database connection issues
- **Solution**: 
  - Check MongoDB is running
  - Verify connection string in `.env`
  - Check network connectivity

#### "ValidationError"
- **Cause**: Invalid data format or missing required fields
- **Solution**: Check request body matches expected schema

### Debug Mode
Enable detailed logging by setting:
```env
NODE_ENV=development
```

### Performance Issues
- Monitor response times in logs
- Check database indexes
- Consider connection pooling for high traffic

### Memory Issues
- Monitor log file sizes
- Consider log rotation
- Check for memory leaks in long-running processes

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [JWT Documentation](https://jwt.io/)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the logs for detailed error information
3. Create an issue in the project repository

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.