import VerifyToken from "../../middleware/VerifyToken.js";
import { Order } from "../../model/ExportModel.js";

export default function GetOrderStats(app) {
  app.post("/api/v1/order/status", VerifyToken, async (req, res) => {
    console.log(`/api/v1/order/status/, Timestamp: ${new Date().toISOString()}`)
    
    const startTime = Date.now();
    const userId = req.user?.id;
    const requestId = Math.random().toString(36).substr(2, 9); // Generate unique request ID
    
    // Log incoming request
    console.log(`[GET_ORDER_STATS] Request initiated - UserID: ${userId}, RequestID: ${requestId}, Timestamp: ${new Date().toISOString()}`);
    console.log(`[GET_ORDER_STATS] Admin access attempt - UserID: ${userId}, RequestID: ${requestId}, IsAdmin: ${req.user?.isAdmin || false}, IP: ${req.ip}`);

    try {
      // Admin authorization check
      if (!req.user.isAdmin) {
        console.warn(`[GET_ORDER_STATS] Authorization failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Non-admin user attempted to access order statistics`);
        return res.status(403).json({
          success: false,
          message: "Admin access required",
        });
      }

      console.log(`[GET_ORDER_STATS] Authorization passed - UserID: ${userId}, RequestID: ${requestId}, Admin confirmed`);

      // Execute aggregation queries
      console.log(`[GET_ORDER_STATS] Starting aggregation queries - UserID: ${userId}, RequestID: ${requestId}`);

      // Overview statistics aggregation
      console.log(`[GET_ORDER_STATS] Executing overview aggregation - UserID: ${userId}, RequestID: ${requestId}`);
      const statsStartTime = Date.now();
      
      const stats = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: "$totalAmount" },
            averageOrderValue: { $avg: "$totalAmount" },
          },
        },
      ]);

      const statsQueryTime = Date.now() - statsStartTime;
      console.log(`[GET_ORDER_STATS] Overview aggregation completed - UserID: ${userId}, RequestID: ${requestId}, Query time: ${statsQueryTime}ms`);

      // Status statistics aggregation
      console.log(`[GET_ORDER_STATS] Executing status aggregation - UserID: ${userId}, RequestID: ${requestId}`);
      const statusStartTime = Date.now();
      
      const statusStats = await Order.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      const statusQueryTime = Date.now() - statusStartTime;
      console.log(`[GET_ORDER_STATS] Status aggregation completed - UserID: ${userId}, RequestID: ${requestId}, Query time: ${statusQueryTime}ms, Status groups found: ${statusStats.length}`);

      // Payment statistics aggregation
      console.log(`[GET_ORDER_STATS] Executing payment aggregation - UserID: ${userId}, RequestID: ${requestId}`);
      const paymentStartTime = Date.now();
      
      const paymentStats = await Order.aggregate([
        {
          $group: {
            _id: "$paymentStatus",
            count: { $sum: 1 },
          },
        },
      ]);

      const paymentQueryTime = Date.now() - paymentStartTime;
      console.log(`[GET_ORDER_STATS] Payment aggregation completed - UserID: ${userId}, RequestID: ${requestId}, Query time: ${paymentQueryTime}ms, Payment groups found: ${paymentStats.length}`);

      // Process and log results
      const overview = stats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
      };

      console.log(`[GET_ORDER_STATS] Overview statistics - UserID: ${userId}, RequestID: ${requestId}, Results:`, {
        totalOrders: overview.totalOrders,
        totalRevenue: `$${overview.totalRevenue?.toFixed(2) || '0.00'}`,
        averageOrderValue: `$${overview.averageOrderValue?.toFixed(2) || '0.00'}`
      });

      // Log status breakdown
      console.log(`[GET_ORDER_STATS] Status breakdown - UserID: ${userId}, RequestID: ${requestId}, Status stats:`, 
        statusStats.map(stat => `${stat._id}: ${stat.count}`).join(', ') || 'No status data'
      );

      // Log payment breakdown
      console.log(`[GET_ORDER_STATS] Payment breakdown - UserID: ${userId}, RequestID: ${requestId}, Payment stats:`, 
        paymentStats.map(stat => `${stat._id}: ${stat.count}`).join(', ') || 'No payment data'
      );

      // Calculate total response time
      const responseTime = Date.now() - startTime;
      const totalQueryTime = statsQueryTime + statusQueryTime + paymentQueryTime;

      // Log successful completion with performance metrics
      console.log(`[GET_ORDER_STATS] Request completed successfully - UserID: ${userId}, RequestID: ${requestId}, Total response time: ${responseTime}ms, Aggregation time: ${totalQueryTime}ms`);
      console.log(`[GET_ORDER_STATS] Statistics summary - UserID: ${userId}, RequestID: ${requestId}, Total orders analyzed: ${overview.totalOrders}, Revenue: $${overview.totalRevenue?.toFixed(2) || '0.00'}, Avg order: $${overview.averageOrderValue?.toFixed(2) || '0.00'}`);

      res.status(200).json({
        success: true,
        data: {
          overview: overview,
          statusBreakdown: statusStats,
          paymentBreakdown: paymentStats,
        },
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      // Log comprehensive error details
      console.error(`[GET_ORDER_STATS] Error occurred - UserID: ${userId}, RequestID: ${requestId}, Response time: ${responseTime}ms`);
      console.error(`[GET_ORDER_STATS] Error details:`, {
        message: error.message,
        stack: error.stack,
        code: error.code,
        name: error.name,
        timestamp: new Date().toISOString(),
        requestData: {
          userIsAdmin: req.user?.isAdmin || false,
          userAgent: req.get('User-Agent'),
          origin: req.get('Origin')
        }
      });

      // Log specific error types
      if (error.name === 'MongoError' || error.name === 'MongooseError') {
        console.error(`[GET_ORDER_STATS] Database error - UserID: ${userId}, RequestID: ${requestId}, Error type: ${error.name}, Code: ${error.code}`);
      }

      // Aggregation-specific errors
      if (error.message.includes('aggregation') || error.message.includes('pipeline')) {
        console.error(`[GET_ORDER_STATS] Aggregation pipeline error - UserID: ${userId}, RequestID: ${requestId}, Pipeline stage might be invalid`);
      }

      // Performance concerns
      if (responseTime > 5000) { // If query takes more than 5 seconds
        console.error(`[GET_ORDER_STATS] Performance concern - UserID: ${userId}, RequestID: ${requestId}, Slow query detected: ${responseTime}ms, Consider indexing optimization`);
      }

      // Security concern logging
      if (error.message.includes('permission') || error.message.includes('authorization')) {
        console.error(`[GET_ORDER_STATS] Security concern - UserID: ${userId}, RequestID: ${requestId}, Potential unauthorized stats access attempt`);
      }

      res.status(500).json({
        success: false,
        message: "Failed to retrieve order statistics",
        error: error.message,
      });
    }
  });
}