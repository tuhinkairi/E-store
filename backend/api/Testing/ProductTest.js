// Test Configuration
const BASE_URL = "http://localhost:3000/api/v1/product";
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTYyMTRmYmYzZjE1ODZmMjA4NThjNSIsImVtYWlsIjoiYWRtaW5AY29tcGFueTIuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzU0NjY5MzkxLCJleHAiOjE3NTUyNzQxOTF9.V1i0hWT8rZcn4gf7aOb6ei1-Z6HN3Ahs6cjB8ztYvJk";
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

const testDeleteProductSuccess = async (productId) => {
  const response = await fetch(`${BASE_URL}/delete/${productId}`, {
    method: 'DELETE',
    headers: ADMIN_HEADERS
  });
  
  const result = await response.json();
  console.log('✅ Delete Product Success:', result);
};

const testDeleteProductInvalidId = async () => {
  const invalidId = "invalid-id-format";
  
  const response = await fetch(`${BASE_URL}/delete/${invalidId}`, {
    method: 'DELETE',
    headers: ADMIN_HEADERS
  });
  
  const result = await response.json();
  console.log('Expected 400 Error for invalid ID:', result);
};

const testDeleteProductNotFound = async () => {
  const nonExistentId = "64a7b8c9d1e2f3a4b5c6d7e0"; // Valid ObjectId but doesn't exist
  
  const response = await fetch(`${BASE_URL}/delete/${nonExistentId}`, {
    method: 'DELETE',
    headers: ADMIN_HEADERS
  });
  
  const result = await response.json();
  console.log('Expected 404 Error:', result);
};

const testGetAllProductsBasic = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  const result = await response.json();
  console.log('✅ Get All Products:', result);
};

const testGetAllProductsPagination = async () => {
  const params = new URLSearchParams({
    page: '2',
    limit: '5'
  });
  
  const response = await fetch(`${BASE_URL}/all?${params}`);
  const result = await response.json();
  console.log('✅ Get Products with Pagination:', result);
};

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

const testGetAllProductsInvalidPagination = async () => {
  const params = new URLSearchParams({
    page: '-1',
    limit: '1000' // Exceeds maximum
  });
  
  const response = await fetch(`${BASE_URL}/all?${params}`);
  const result = await response.json();
  console.log('Pagination should be corrected:', result.pagination);
};

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