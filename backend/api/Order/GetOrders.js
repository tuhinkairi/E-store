import VerifyToken from "../../middleware/VerifyToken.js";
import { Order } from "../../model/ExportModel.js";
import { isValidObjectId } from "./Order.js";

export default function GetOrders(app) {
  app.get("/api/v1/order/get-orders", VerifyToken, async (req, res) => {
    console.log(`/api/v1/order/get-orders/, Timestamp: ${new Date().toISOString()}`)
    
    const startTime = Date.now();
    const userId = req.user?.id;
    const requestId = Math.random().toString(36).substr(2, 9); // Generate unique request ID
    
    // Log incoming request
    console.log(`[GET_ORDERS] Request initiated - UserID: ${userId}, RequestID: ${requestId}, Timestamp: ${new Date().toISOString()}`);
    console.log(`[GET_ORDERS] Query parameters - UserID: ${userId}, RequestID: ${requestId}, Page: ${req.query.page || 1}, Limit: ${req.query.limit || 10}, Status filter: ${req.query.status || 'none'}, Payment status filter: ${req.query.paymentStatus || 'none'}`);
    console.log(`[GET_ORDERS] User context - UserID: ${userId}, RequestID: ${requestId}, IsAdmin: ${req.user?.isAdmin || false}, IP: ${req.ip}`);

    try {
      const { page = 1, limit = 10, status, paymentStatus } = req.query;
      const skip = (page - 1) * limit;

      console.log(`[GET_ORDERS] Processing pagination - UserID: ${userId}, RequestID: ${requestId}, Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

      let query = {};

      // If not admin, only show user's own orders
      if (!req.user.isAdmin) {
        query.userId = req.user.id;
        console.log(`[GET_ORDERS] Non-admin user - UserID: ${userId}, RequestID: ${requestId}, Filtering to user's orders only`);
      } else {
        console.log(`[GET_ORDERS] Admin user - UserID: ${userId}, RequestID: ${requestId}, Accessing all orders`);
      }

      // Add status filters if provided
      if (status) {
        query.status = status;
        console.log(`[GET_ORDERS] Status filter applied - UserID: ${userId}, RequestID: ${requestId}, Status: ${status}`);
      }
      if (paymentStatus) {
        query.paymentStatus = paymentStatus;
        console.log(`[GET_ORDERS] Payment status filter applied - UserID: ${userId}, RequestID: ${requestId}, Payment status: ${paymentStatus}`);
      }

      console.log(`[GET_ORDERS] Final query object - UserID: ${userId}, RequestID: ${requestId}, Query:`, query);

      // Execute database queries
      console.log(`[GET_ORDERS] Starting database queries - UserID: ${userId}, RequestID: ${requestId}`);
      
      const [orders, totalOrders] = await Promise.all([
        Order.find(query)
          .populate("userId", "firstName lastName email")
          .populate("items.productId", "name price category image colors sizes")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit)),
        Order.countDocuments(query)
      ]);

      console.log(`[GET_ORDERS] Database queries completed - UserID: ${userId}, RequestID: ${requestId}, Orders returned: ${orders.length}, Total orders: ${totalOrders}`);

      // Calculate pagination details
      const totalPages = Math.ceil(totalOrders / limit);
      const hasNext = skip + orders.length < totalOrders;
      const hasPrev = page > 1;

      console.log(`[GET_ORDERS] Pagination calculated - UserID: ${userId}, RequestID: ${requestId}, Current page: ${page}, Total pages: ${totalPages}, Has next: ${hasNext}, Has previous: ${hasPrev}`);

      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Log successful completion
      console.log(`[GET_ORDERS] Request completed successfully - UserID: ${userId}, RequestID: ${requestId}, Orders returned: ${orders.length}, Total orders: ${totalOrders}, Response time: ${responseTime}ms`);
      
      // Log summary statistics
      if (orders.length > 0) {
        const statusCounts = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});
        const totalValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        
        console.log(`[GET_ORDERS] Order statistics - UserID: ${userId}, RequestID: ${requestId}, Status distribution:`, statusCounts, `Total value in page: $${totalValue.toFixed(2)}`);
      }

      res.status(200).json({
        success: true,
        data: orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: totalPages,
          totalOrders,
          hasNext: hasNext,
          hasPrev: hasPrev,
        },
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      // Log comprehensive error details
      console.error(`[GET_ORDERS] Error occurred - UserID: ${userId}, RequestID: ${requestId}, Response time: ${responseTime}ms`);
      console.error(`[GET_ORDERS] Error details:`, {
        message: error.message,
        stack: error.stack,
        code: error.code,
        name: error.name,
        timestamp: new Date().toISOString(),
        requestData: {
          page: req.query.page,
          limit: req.query.limit,
          status: req.query.status,
          paymentStatus: req.query.paymentStatus,
          userIsAdmin: req.user?.isAdmin || false
        }
      });

      // Log specific error types
      if (error.name === 'MongoError' || error.name === 'MongooseError') {
        console.error(`[GET_ORDERS] Database error - UserID: ${userId}, RequestID: ${requestId}, Error type: ${error.name}, Code: ${error.code}`);
      }

      if (error.name === 'CastError') {
        console.error(`[GET_ORDERS] Cast error - UserID: ${userId}, RequestID: ${requestId}, Value: ${error.value}, Path: ${error.path}`);
      }

      res.status(500).json({
        success: false,
        message: "Failed to retrieve orders",
        error: error.message,
      });
    }
  });
}

export function GetOrderById(app) {
  app.get("/api/v1/order/get-orders/:id", VerifyToken, async (req, res) => {
    console.log(`/api/v1/order/get-orders/${req.params.id}, Timestamp: ${new Date().toISOString()}`)
    
    const startTime = Date.now();
    const userId = req.user?.id;
    const orderId = req.params.id;
    const requestId = Math.random().toString(36).substr(2, 9); // Generate unique request ID

    // Log incoming request
    console.log(`[GET_ORDER_BY_ID] Request initiated - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${orderId}, Timestamp: ${new Date().toISOString()}`);
    console.log(`[GET_ORDER_BY_ID] User context - UserID: ${userId}, RequestID: ${requestId}, IsAdmin: ${req.user?.isAdmin || false}, IP: ${req.ip}`);

    try {
      const { id } = req.params;

      // Validation with logging
      console.log(`[GET_ORDER_BY_ID] Starting validation - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);

      if (!isValidObjectId(id)) {
        console.warn(`[GET_ORDER_BY_ID] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Invalid ObjectId format, OrderID: ${id}`);
        return res.status(400).json({
          success: false,
          message: "Invalid order ID"
        });
      }

      console.log(`[GET_ORDER_BY_ID] ObjectId validation passed - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);

      let query = { _id: id };

      // If not admin, only allow access to own orders
      if (!req.user.isAdmin) {
        query.userId = req.user.id;
        console.log(`[GET_ORDER_BY_ID] Non-admin access - UserID: ${userId}, RequestID: ${requestId}, Filtering to user's own orders only`);
      } else {
        console.log(`[GET_ORDER_BY_ID] Admin access - UserID: ${userId}, RequestID: ${requestId}, Full access to order: ${id}`);
      }

      console.log(`[GET_ORDER_BY_ID] Query object - UserID: ${userId}, RequestID: ${requestId}, Query:`, query);

      // Database query
      console.log(`[GET_ORDER_BY_ID] Executing database query - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);

      const order = await Order.findOne(query)
        .populate('userId', 'firstName lastName email phone')
        .populate('items.productId', 'name price category image colors sizes description');

      if (!order) {
        console.warn(`[GET_ORDER_BY_ID] Order not found - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Query:`, query);
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }

      // Log order details found
      console.log(`[GET_ORDER_BY_ID] Order found - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Order details:`, {
        orderNumber: order.orderNumber,
        orderUserId: order.userId._id || order.userId,
        status: order.status,
        paymentStatus: order.paymentStatus,
        totalAmount: order.totalAmount,
        itemsCount: order.items?.length || 0,
        createdAt: order.createdAt,
        estimatedDelivery: order.estimatedDelivery
      });

      // Log access type for security monitoring
      if (req.user.isAdmin && order.userId._id?.toString() !== userId) {
        console.log(`[GET_ORDER_BY_ID] Admin accessing another user's order - Admin: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Order owner: ${order.userId._id || order.userId}`);
      }

      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Log successful completion
      console.log(`[GET_ORDER_BY_ID] Request completed successfully - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Response time: ${responseTime}ms`);
      console.log(`[GET_ORDER_BY_ID] Order summary - UserID: ${userId}, RequestID: ${requestId}, Order number: ${order.orderNumber}, Status: ${order.status}, Items: ${order.items?.length}, Total: $${order.totalAmount}`);

      res.status(200).json({
        success: true,
        data: order
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      // Log comprehensive error details
      console.error(`[GET_ORDER_BY_ID] Error occurred - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${orderId}, Response time: ${responseTime}ms`);
      console.error(`[GET_ORDER_BY_ID] Error details:`, {
        message: error.message,
        stack: error.stack,
        code: error.code,
        name: error.name,
        timestamp: new Date().toISOString(),
        requestData: {
          orderId: orderId,
          userIsAdmin: req.user?.isAdmin || false,
          userAgent: req.get('User-Agent')
        }
      });

      // Log specific error types
      if (error.name === 'MongoError' || error.name === 'MongooseError') {
        console.error(`[GET_ORDER_BY_ID] Database error - UserID: ${userId}, RequestID: ${requestId}, Error type: ${error.name}, Code: ${error.code}`);
      }

      if (error.name === 'CastError') {
        console.error(`[GET_ORDER_BY_ID] Cast error (likely invalid ID) - UserID: ${userId}, RequestID: ${requestId}, Value: ${error.value}, Path: ${error.path}`);
      }

      // Security concern logging
      if (error.message.includes('permission') || error.message.includes('authorization')) {
        console.error(`[GET_ORDER_BY_ID] Security concern - UserID: ${userId}, RequestID: ${requestId}, Potential unauthorized access attempt for OrderID: ${orderId}`);
      }

      res.status(500).json({
        success: false,
        message: "Failed to retrieve order",
        error: error.message
      });
    }
  });
}