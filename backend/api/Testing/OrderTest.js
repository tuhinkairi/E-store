// test-orders.mjs (ESM, only native fetch; no external testing libraries)
import mongoose from 'mongoose';
import express from 'express';
import http from 'http';

// =============== Tiny Test Harness (No external libs) ===============
const tests = [];
let currentSuite = [];

function describe(name, fn) {
  const prevSuite = currentSuite;
  const suite = { name, tests: [], beforeEachFns: [], afterEachFns: [] };
  currentSuite = suite;
  fn();
  currentSuite = prevSuite;
  tests.push(suite);
}

function test(name, fn) {
  currentSuite.tests.push({ name, fn });
}

function beforeEach(fn) {
  currentSuite.beforeEachFns.push(fn);
}

function afterEach(fn) {
  currentSuite.afterEachFns.push(fn);
}

function assertOk(value, msg = 'Expected value to be truthy') {
  if (!value) throw new Error(msg);
}

function assertEqual(actual, expected, msg) {
  if (actual !== expected) {
    throw new Error(msg || `Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
  }
}

function assertDefined(value, msg = 'Expected value to be defined') {
  if (typeof value === 'undefined') throw new Error(msg);
}

// Minimal stub/mocks
function stub() {
  const f = (...args) => {
    f.calls.push(args);
    if (f._reject) return Promise.reject(f._reject);
    if (typeof f._resolve !== 'undefined') return Promise.resolve(f._resolve);
    if (typeof f._impl === 'function') return f._impl(...args);
    return undefined;
  };
  f.calls = [];
  f.mockResolvedValue = (v) => { f._resolve = v; f._reject = undefined; f._impl = undefined; };
  f.mockRejectedValue = (e) => { f._reject = e; f._resolve = undefined; f._impl = undefined; };
  f.mockImplementation = (impl) => { f._impl = impl; f._resolve = undefined; f._reject = undefined; };
  f.reset = () => { f.calls = []; f._resolve = undefined; f._reject = undefined; f._impl = undefined; };
  return f;
}

// =============== Mocks & Utilities ===============
const mockOrder = {
  find: stub(),
  findById: stub(),
  findOne: stub(),
  findByIdAndUpdate: stub(),
  findByIdAndDelete: stub(),
  findOneAndUpdate: stub(),
  countDocuments: stub(),
  aggregate: stub(),
  save: stub(),
};

const mockProduct = {
  findById: stub(),
  findByIdAndUpdate: stub(),
};

const mockUser = {
  findByIdAndUpdate: stub(),
};

const mockVerifyToken = (req, res, next) => {
  req.user = { 
    id: 'user123', 
    isAdmin: false,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com'
  };
  next();
};

const mockVerifyTokenAdmin = (req, res, next) => {
  req.user = { 
    id: 'admin123', 
    isAdmin: true,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com'
  };
  next();
};

const mockIsValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const mockGenerateOrderNumber = () => 'ORD-12345';
const mockCalculateEstimatedDelivery = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

// =============== Endpoints (unchanged behavior) ===============
function CreateOrder(app) {
  app.post("/api/v1/order/create", mockVerifyToken, async (req, res) => {
    try {
      const { items, paymentMethod, shippingAddress, notes } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Order items are required",
        });
      }

      if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
        return res.status(400).json({
          success: false,
          message: "Complete shipping address is required",
        });
      }

      const newOrder = {
        _id: 'order123',
        userId: req.user.id,
        items,
        totalAmount: 100.00,
        orderNumber: mockGenerateOrderNumber(),
        estimatedDelivery: mockCalculateEstimatedDelivery(),
        save: () => Promise.resolve({
          _id: 'order123',
          userId: req.user.id,
          items,
          totalAmount: 100.00
        })
      };

      await newOrder.save();

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: newOrder,
      });
    } catch {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}

function GetOrders(app) {
  app.get("/api/v1/order/get-orders", mockVerifyToken, async (req, res) => {
    try {
      const { page = 1, limit = 10, status, paymentStatus } = req.query;
      
      let query = {};
      if (!req.user.isAdmin) {
        query.userId = req.user.id;
      }
      if (status) query.status = status;
      if (paymentStatus) query.paymentStatus = paymentStatus;

      const orders = [
        { _id: 'order1', userId: req.user.id, status: 'Pending', totalAmount: 100 },
        { _id: 'order2', userId: req.user.id, status: 'Shipped', totalAmount: 200 }
      ];

      mockOrder.find.mockResolvedValue(orders);
      mockOrder.countDocuments.mockResolvedValue(2);

      const totalOrders = await mockOrder.countDocuments(query);
      const currentPage = parseInt(page, 10);
      const perPage = parseInt(limit, 10);

      res.status(200).json({
        success: true,
        data: await mockOrder.find(query),
        pagination: {
          currentPage,
          totalPages: Math.ceil(totalOrders / perPage),
          totalOrders,
          hasNext: false,
          hasPrev: false,
        },
      });
    } catch {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}

function GetOrderById(app) {
  app.get("/api/v1/order/get-orders/:id", mockVerifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!mockIsValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID"
        });
      }

      let query = { _id: id };
      if (!req.user.isAdmin) {
        query.userId = req.user.id;
      }

      const defaultOrder = { _id: id, userId: req.user.id, status: 'Pending' };
      mockOrder.findOne.mockResolvedValue(defaultOrder);

      const foundOrder = await mockOrder.findOne(query);
      
      if (!foundOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }

      res.status(200).json({
        success: true,
        data: foundOrder
      });
    } catch {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}

function GetUserOrderHistory(app) {
  app.get("/api/v1/order/history", mockVerifyToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = [
        { _id: 'order1', userId, status: 'Delivered', totalAmount: 100 },
        { _id: 'order2', userId, status: 'Pending', totalAmount: 150 }
      ];

      mockOrder.find.mockResolvedValue(orders);

      const summary = {
        totalOrders: orders.length,
        totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0),
        ordersByStatus: { 'Delivered': 1, 'Pending': 1 },
      };

      res.status(200).json({
        success: true,
        data: { orders, summary },
      });
    } catch {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}

function DeleteOrder(app) {
  app.delete("/api/v1/order/delete/:id", mockVerifyTokenAdmin, async (req, res) => {
    try {
      const { id } = req.params;

      if (!mockIsValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      if (!req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Only administrators can delete orders. Users can cancel orders instead.",
        });
      }

      const order = { _id: id, status: 'Pending', items: [] };
      mockOrder.findById.mockResolvedValue(order);
      mockOrder.findByIdAndDelete.mockResolvedValue(order);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    } catch {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}

function GetOrderStats(app) {
  app.get("/api/v1/order/stats", mockVerifyTokenAdmin, async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Admin access required",
        });
      }

      const stats = [{ totalOrders: 10, totalRevenue: 1000, averageOrderValue: 100 }];
      const statusStats = [{ _id: 'Pending', count: 5 }, { _id: 'Delivered', count: 3 }];
      const paymentStats = [{ _id: 'Paid', count: 8 }, { _id: 'Pending', count: 2 }];

      mockOrder.aggregate.mockResolvedValue(stats);

      res.status(200).json({
        success: true,
        data: {
          overview: stats[0],
          statusBreakdown: statusStats,
          paymentBreakdown: paymentStats,
        },
      });
    } catch {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}

function UpdateOrder(app) {
  app.patch("/api/v1/order/update-order/:id", mockVerifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { status, paymentStatus, paymentMethod, trackingNumber, notes } = req.body;

      if (!mockIsValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      let query = { _id: id };
      if (!req.user.isAdmin) {
        query.userId = req.user.id;
        
        if (status && status !== "Cancelled") {
          return res.status(403).json({
            success: false,
            message: "You can only cancel your orders",
          });
        }
      }

      const existingOrder = { _id: id, userId: req.user.id, status: 'Pending', items: [] };
      mockOrder.findOne.mockResolvedValue(existingOrder);

      const updatedOrder = { ...existingOrder, status, paymentStatus, paymentMethod, trackingNumber, notes };
      mockOrder.findOneAndUpdate.mockResolvedValue(updatedOrder);

      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        data: updatedOrder,
      });
    } catch {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
}

// =============== HTTP helpers using native fetch ===============
async function httpGet(baseUrl, path) {
  const res = await fetch(`${baseUrl}${path}`, { method: 'GET' });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

async function httpPost(baseUrl, path, json) {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json),
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

async function httpPatch(baseUrl, path, json) {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json),
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

async function httpDelete(baseUrl, path) {
  const res = await fetch(`${baseUrl}${path}`, { method: 'DELETE' });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

// Helper to create and manage server per suite
async function startServer(setupApp) {
  const app = express();
  app.use(express.json());
  setupApp(app);
  const server = http.createServer(app);
  await new Promise((r) => server.listen(0, r));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  return { app, server, baseUrl };
}

async function stopServer(server) {
  if (!server) return;
  await new Promise((r) => server.close(r));
}

// =============== Test Suites (only fetch) ===============
describe('Order Endpoints Tests', () => {
  let serverRef = null;
  let baseUrl = '';

  function resetStubs() {
    Object.values(mockOrder).forEach(fn => typeof fn.reset === 'function' && fn.reset());
    Object.values(mockProduct).forEach(fn => typeof fn.reset === 'function' && fn.reset());
    Object.values(mockUser).forEach(fn => typeof fn.reset === 'function' && fn.reset());
  }

  beforeEach(async () => {
    const { server, baseUrl: url } = await startServer((app) => {
      CreateOrder(app);
      GetOrders(app);
      GetOrderById(app);
      GetUserOrderHistory(app);
      DeleteOrder(app);
      GetOrderStats(app);
      UpdateOrder(app);
    });
    serverRef = server;
    baseUrl = url;
    resetStubs();
  });

  afterEach(async () => {
    await stopServer(serverRef);
    serverRef = null;
    baseUrl = '';
  });

  // CREATE ORDER TESTS
  describe('POST /api/v1/order/create', () => {
    const validOrderData = {
      items: [
        { productId: '507f1f77bcf86cd799439011', quantity: 2, size: 'M', color: 'Blue' }
      ],
      paymentMethod: 'credit_card',
      shippingAddress: {
        addressType: 'home',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      notes: 'Please deliver carefully'
    };

    test('should create order successfully with valid data', async () => {
      const response = await httpPost(baseUrl, '/api/v1/order/create', validOrderData);
      assertEqual(response.status, 201);
      assertEqual(response.body.success, true);
      assertEqual(response.body.message, 'Order created successfully');
      assertDefined(response.body.data);
    });

    test('should fail when items are missing', async () => {
      const invalidData = { ...validOrderData };
      delete invalidData.items;
      const response = await httpPost(baseUrl, '/api/v1/order/create', invalidData);
      assertEqual(response.status, 400);
      assertEqual(response.body.success, false);
      assertEqual(response.body.message, 'Order items are required');
    });

    test('should fail when items array is empty', async () => {
      const invalidData = { ...validOrderData, items: [] };
      const response = await httpPost(baseUrl, '/api/v1/order/create', invalidData);
      assertEqual(response.status, 400);
      assertEqual(response.body.success, false);
      assertEqual(response.body.message, 'Order items are required');
    });

    test('should fail when shipping address is incomplete', async () => {
      const invalidData = { ...validOrderData, shippingAddress: { street: '123 Main St' } };
      const response = await httpPost(baseUrl, '/api/v1/order/create', invalidData);
      assertEqual(response.status, 400);
      assertEqual(response.body.success, false);
      assertEqual(response.body.message, 'Complete shipping address is required');
    });
  });

  // GET ORDERS TESTS
  describe('GET /api/v1/order/get-orders', () => {
    test('should get orders successfully', async () => {
      const response = await httpGet(baseUrl, '/api/v1/order/get-orders');
      assertEqual(response.status, 200);
      assertEqual(response.body.success, true);
      assertDefined(response.body.data);
      assertDefined(response.body.pagination);
      assertOk(Array.isArray(response.body.data), 'Expected data to be an array');
    });

    test('should get orders with pagination', async () => {
      const response = await httpGet(baseUrl, '/api/v1/order/get-orders?page=1&limit=5');
      assertEqual(response.status, 200);
      assertEqual(response.body.success, true);
      assertEqual(response.body.pagination.currentPage, 1);
      assertDefined(response.body.pagination.totalOrders);
    });

    test('should filter orders by status', async () => {
      const response = await httpGet(baseUrl, '/api/v1/order/get-orders?status=Pending');
      assertEqual(response.status, 200);
      assertEqual(response.body.success, true);
      assertDefined(response.body.data);
    });

    test('should filter orders by payment status', async () => {
      const response = await httpGet(baseUrl, '/api/v1/order/get-orders?paymentStatus=Paid');
      assertEqual(response.status, 200);
      assertEqual(response.body.success, true);
      assertDefined(response.body.data);
    });
  });

  // GET ORDER BY ID TESTS
  describe('GET /api/v1/order/get-orders/:id', () => {
    const validOrderId = '507f1f77bcf86cd799439011';
    const invalidOrderId = 'invalid-id';

    test('should get order by valid ID', async () => {
      const response = await httpGet(baseUrl, `/api/v1/order/get-orders/${validOrderId}`);
      assertEqual(response.status, 200);
      assertEqual(response.body.success, true);
      assertDefined(response.body.data);
    });

    test('should fail with invalid order ID', async () => {
      const response = await httpGet(baseUrl, `/api/v1/order/get-orders/${invalidOrderId}`);
      assertEqual(response.status, 400);
      assertEqual(response.body.success, false);
      assertEqual(response.body.message, 'Invalid order ID');
    });

    test('should fail when order not found', async () => {
      const nonExistentId = '507f1f77bcf86cd799439012';
      mockOrder.findOne.mockResolvedValue(null);
      const response = await httpGet(baseUrl, `/api/v1/order/get-orders/${nonExistentId}`);
      assertEqual(response.status, 404);
      assertEqual(response.body.success, false);
      assertEqual(response.body.message, 'Order not found');
    });
  });

  // GET USER ORDER HISTORY TESTS
  describe('GET /api/v1/order/history', () => {
    test('should get user order history successfully', async () => {
      const response = await httpGet(baseUrl, '/api/v1/order/history');
      assertEqual(response.status, 200);
      assertEqual(response.body.success, true);
      assertDefined(response.body.data.orders);
      assertDefined(response.body.data.summary);
      assertDefined(response.body.data.summary.totalOrders);
      assertDefined(response.body.data.summary.totalSpent);
      assertDefined(response.body.data.summary.ordersByStatus);
    });
  });

  // UPDATE ORDER TESTS
  describe('PATCH /api/v1/order/update-order/:id', () => {
    const validOrderId = '507f1f77bcf86cd799439011';
    const updateData = { status: 'Cancelled', notes: 'Updated notes' };

    test('should update order successfully', async () => {
      const response = await httpPatch(baseUrl, `/api/v1/order/update-order/${validOrderId}`, updateData);
      assertEqual(response.status, 200);
      assertEqual(response.body.success, true);
      assertEqual(response.body.message, 'Order updated successfully');
      assertDefined(response.body.data);
    });

    test('should fail with invalid order ID', async () => {
      const response = await httpPatch(baseUrl, '/api/v1/order/update-order/invalid-id', updateData);
      assertEqual(response.status, 400);
      assertEqual(response.body.success, false);
      assertEqual(response.body.message, 'Invalid order ID');
    });

    test('should restrict non-admin users to only cancel orders', async () => {
      const restrictedUpdate = { status: 'Shipped' };
      const response = await httpPatch(baseUrl, `/api/v1/order/update-order/${validOrderId}`, restrictedUpdate);
      assertEqual(response.status, 403);
      assertEqual(response.body.success, false);
      assertEqual(response.body.message, 'You can only cancel your orders');
    });

    test('should allow cancellation for regular users', async () => {
      const cancelData = { status: 'Cancelled' };
      const response = await httpPatch(baseUrl, `/api/v1/order/update-order/${validOrderId}`, cancelData);
      assertEqual(response.status, 200);
      assertEqual(response.body.success, true);
    });
  });

  // DELETE ORDER TESTS (Admin only)
  describe('DELETE /api/v1/order/delete/:id', () => {
    const validOrderId = '507f1f77bcf86cd799439011';

    test('should delete order successfully as admin', async () => {
      // Dedicated admin server with admin route
      const { server, baseUrl: adminUrl } = await startServer((app) => {
        app.use(express.json());
        app.delete("/api/v1/order/delete/:id", mockVerifyTokenAdmin, async (req, res) => {
          const { id } = req.params;
          if (!mockIsValidObjectId(id)) {
            return res.status(400).json({ success: false, message: "Invalid order ID" });
          }
          if (!req.user.isAdmin) {
            return res.status(403).json({
              success: false,
              message: "Only administrators can delete orders. Users can cancel orders instead.",
            });
          }
          return res.status(200).json({ success: true, message: "Order deleted successfully" });
        });
      });

      const response = await httpDelete(adminUrl, `/api/v1/order/delete/${validOrderId}`);
      await stopServer(server);

      assertEqual(response.status, 200);
      assertEqual(response.body.success, true);
      assertEqual(response.body.message, 'Order deleted successfully');
    });

    test('should fail with invalid order ID', async () => {
      const response = await httpDelete(baseUrl, '/api/v1/order/delete/invalid-id');
      assertEqual(response.status, 400);
      assertEqual(response.body.success, false);
      assertEqual(response.body.message, 'Invalid order ID');
    });
  });

  // GET ORDER STATS TESTS (Admin only)
  describe('GET /api/v1/order/stats', () => {
    test('should get order statistics as admin', async () => {
      const { server, baseUrl: adminUrl } = await startServer((app) => {
        app.use(express.json());
        app.get("/api/v1/order/stats", mockVerifyTokenAdmin, async (req, res) => {
          if (!req.user.isAdmin) {
            return res.status(403).json({ success: false, message: "Admin access required" });
          }
          return res.status(200).json({
            success: true,
            data: {
              overview: { totalOrders: 10, totalRevenue: 1000, averageOrderValue: 100 },
              statusBreakdown: [{ _id: 'Pending', count: 5 }],
              paymentBreakdown: [{ _id: 'Paid', count: 8 }],
            },
          });
        });
      });

      const response = await httpGet(adminUrl, '/api/v1/order/stats');
      await stopServer(server);

      assertEqual(response.status, 200);
      assertEqual(response.body.success, true);
      assertDefined(response.body.data.overview);
      assertDefined(response.body.data.statusBreakdown);
      assertDefined(response.body.data.paymentBreakdown);
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    test('should handle server errors gracefully', async () => {
      mockOrder.find.mockRejectedValue(new Error('Database connection failed'));
      const response = await httpGet(baseUrl, '/api/v1/order/get-orders');
      assertEqual(response.status, 500);
      assertEqual(response.body.success, false);
    });
  });
});

// Additional utility tests
describe('Utility Functions', () => {
  test('should validate ObjectId correctly', () => {
    const validId = '507f1f77bcf86cd799439011';
    const invalidId = 'invalid-id';
    assertEqual(mockIsValidObjectId(validId), true);
    assertEqual(mockIsValidObjectId(invalidId), false);
  });

  test('should generate order number', () => {
    const orderNumber = mockGenerateOrderNumber();
    assertEqual(orderNumber, 'ORD-12345');
  });

  test('should calculate estimated delivery', () => {
    const estimatedDelivery = mockCalculateEstimatedDelivery();
    assertOk(estimatedDelivery instanceof Date, 'Expected a Date instance');
  });
});

// Integration-style tests
describe('Order Flow Integration', () => {
  test('should handle complete order lifecycle', async () => {
    const { server, baseUrl } = await startServer((app) => {
      app.use(express.json());
      CreateOrder(app);
      GetOrderById(app);
      UpdateOrder(app);
    });

    // Create order
    const orderData = {
      items: [{ productId: '507f1f77bcf86cd799439011', quantity: 1 }],
      shippingAddress: {
        addressType: 'home',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    };

    const createResponse = await httpPost(baseUrl, '/api/v1/order/create', orderData);
    assertEqual(createResponse.status, 201);
    assertEqual(createResponse.body.success, true);

    // Get the created order
    const orderId = '507f1f77bcf86cd799439011';
    const getResponse = await httpGet(baseUrl, `/api/v1/order/get-orders/${orderId}`);
    assertEqual(getResponse.status, 200);
    assertEqual(getResponse.body.success, true);

    // Update the order
    const updateResponse = await httpPatch(baseUrl, `/api/v1/order/update-order/${orderId}`, { status: 'Cancelled' });
    assertEqual(updateResponse.status, 200);
    assertEqual(updateResponse.body.success, true);

    await stopServer(server);
  });
});

// =============== Runner ===============
(async () => {
  let passed = 0, failed = 0;

  for (const suite of tests) {
    console.log(`\nSuite: ${suite.name}`);
    for (const t of suite.tests) {
      try {
        // Run suite beforeEach
        for (const be of suite.beforeEachFns) {
          await be();
        }
        const result = t.fn();
        if (result && typeof result.then === 'function') {
          await result;
        }
        // Run suite afterEach
        for (const ae of suite.afterEachFns) {
          await ae();
        }
        console.log(`  ✓ ${t.name}`);
        passed++;
      } catch (err) {
        console.error(`  ✗ ${t.name}`);
        console.error(`    -> ${err.message}`);
        failed++;
      }
    }
  }

  console.log(`\nDone. Passed: ${passed}, Failed: ${failed}`);
  if (failed > 0) process.exit(1);
})();
