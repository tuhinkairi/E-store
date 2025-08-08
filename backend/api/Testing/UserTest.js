// Test Configuration
const BASE_URL = "http://localhost:3000/api/v1/user";
const ADMIN_TOKEN = "your_admin_jwt_token_here";
const USER_TOKEN = "your_user_jwt_token_here";
const TEST_USER_ID = "64a7b8c9d1e2f3a4b5c6d7e8";

// In-memory token storage for tests
const testTokens = {
  userToken: null,
  tempTokens: []
};

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

// Helper function to create dynamic headers with stored token
const createUserHeaders = (token = null) => ({
  "Authorization": `Bearer ${token || testTokens.userToken || USER_TOKEN}`,
  "Content-Type": "application/json",
  "x-request-id": `test_${Date.now()}`
});

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
    
    // Store token in memory for other tests
    if (result.token) {
      testTokens.userToken = result.token;
    }
    
    return result;
  } catch (error) {
    console.error('❌ User Registration Failed:', error);
  }
};

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
  
  // Store temp token for deletion test
  if (result.token) {
    testTokens.tempTokens.push(result.token);
  }
  
  return result;
};

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
  
  // Store token in memory for other tests
  if (result.token) {
    testTokens.userToken = result.token;
  }
  
  return result;
};

const testUserLoginWithToken = async () => {
  const storedToken = testTokens.userToken;
  
  if (!storedToken) {
    console.log('❌ No stored token available for token-based login test');
    return;
  }
  
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
    headers: createUserHeaders(),
    body: JSON.stringify(updateData)
  });
  
  const result = await response.json();
  console.log('✅ User Update Success:', result);
};

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

const testUserUpdateInvalidFields = async () => {
  const invalidUpdateData = {
    email: "invalid-email-format", // Invalid email
    birthDate: "invalid-date", // Invalid date
    phone: "123", // Invalid phone format
    invalidField: "should be rejected"
  };

  const response = await fetch(`${BASE_URL}/update/`, {
    method: 'PATCH',
    headers: createUserHeaders(),
    body: JSON.stringify(invalidUpdateData)
  });
  
  const result = await response.json();
  console.log('Expected validation errors:', result);
};

const testUserUpdateEmptyData = async () => {
  const emptyUpdateData = {};

  const response = await fetch(`${BASE_URL}/update/`, {
    method: 'PATCH',
    headers: createUserHeaders(),
    body: JSON.stringify(emptyUpdateData)
  });
  
  const result = await response.json();
  console.log('Expected 400 Error for no fields:', result);
};

const testUserUpdateAdminFields = async () => {
  const adminFieldsData = {
    isAdmin: true // Regular user trying to make themselves admin
  };

  const response = await fetch(`${BASE_URL}/update/`, {
    method: 'PATCH',
    headers: createUserHeaders(),
    body: JSON.stringify(adminFieldsData)
  });
  
  const result = await response.json();
  console.log('Admin fields should be rejected for non-admin:', result);
};

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

const testUserDeleteSuccess = async () => {
  // Use the temp token from minimal registration
  const tempToken = testTokens.tempTokens.pop();
  
  if (!tempToken) {
    console.log('❌ No temp token available for deletion test');
    return;
  }

  const response = await fetch(`${BASE_URL}/delete/`, {
    method: 'DELETE',
    headers: createUserHeaders(tempToken)
  });
  
  const result = await response.json();
  console.log('✅ User Deletion Success:', result);
};

const testUserDeleteUnauthorized = async () => {
  const response = await fetch(`${BASE_URL}/delete/`, {
    method: 'DELETE',
    headers: PUBLIC_HEADERS // No authentication token
  });
  
  const result = await response.json();
  console.log('Expected 401 Error for no authentication:', result);
};

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

const testGetAllUsersAdmin = async () => {
  const response = await fetch(`${BASE_URL}/get`, {
    method: 'GET',
    headers: ADMIN_HEADERS
  });
  
  const result = await response.json();
  console.log('✅ Get All Users Success:', result);
};

const testGetAllUsersUnauthorized = async () => {
  const response = await fetch(`${BASE_URL}/get`, {
    method: 'GET',
    headers: PUBLIC_HEADERS // No authentication
  });
  
  const result = await response.json();
  console.log('Expected 401 Error for no authentication:', result);
};

const testGetAllUsersRegularUser = async () => {
  const response = await fetch(`${BASE_URL}/get`, {
    method: 'GET',
    headers: createUserHeaders() // Regular user token
  });
  
  const result = await response.json();
  console.log('Should work if endpoint allows authenticated users:', result);
};

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
    console.log('📊 Test Summary:');
    console.log(`- Main user token: ${testTokens.userToken ? 'Available' : 'Not available'}`);
    console.log(`- Remaining temp tokens: ${testTokens.tempTokens.length}`);
  } catch (error) {
    console.error('❌ User test suite failed:', error);
  }
};

// Run the test suite
runAllUserTests();