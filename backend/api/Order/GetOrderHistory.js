import VerifyToken from "../../middleware/VerifyToken.js";
import { Order } from "../../model/ExportModel.js";

export default function GetUserOrderHistory(app) {
  app.post("/api/v1/order/history", VerifyToken, async (req, res) => {
    console.log(`/api/v1/order/history, Timestamp: ${new Date().toISOString()}`)
    const startTime = Date.now();
    const userId = req.user?.id;
    
    // Log incoming request
    console.log(`[ORDER_HISTORY] Request initiated - UserID: ${userId}, Timestamp: ${new Date().toISOString()}`);
    
    try {
      if (!userId) {
        console.warn(`[ORDER_HISTORY] Missing user ID in request - IP: ${req.ip}`);
        return res.status(401).json({
          success: false,
          message: "User authentication required",
        });
      }

      // Log database query start
      console.log(`[ORDER_HISTORY] Starting database query for user: ${userId}`);
      
      const orders = await Order.find({ userId })
        .populate("items.productId", "name price category image")
        .sort({ createdAt: -1 });

      // Log query results
      console.log(`[ORDER_HISTORY] Database query completed - UserID: ${userId}, Orders found: ${orders.length}`);

      // Calculate summary with logging
      console.log(`[ORDER_HISTORY] Calculating order summary for user: ${userId}`);
      
      const summary = {
        totalOrders: orders.length,
        totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0),
        ordersByStatus: {},
      };

      orders.forEach((order) => {
        summary.ordersByStatus[order.status] =
          (summary.ordersByStatus[order.status] || 0) + 1;
      });

      // Log summary statistics
      console.log(`[ORDER_HISTORY] Summary calculated - UserID: ${userId}, Total Orders: ${summary.totalOrders}, Total Spent: $${summary.totalSpent.toFixed(2)}, Status Distribution:`, summary.ordersByStatus);

      // Calculate response time
      const responseTime = Date.now() - startTime;
      
      // Log successful response
      console.log(`[ORDER_HISTORY] Request completed successfully - UserID: ${userId}, Response Time: ${responseTime}ms, Orders Returned: ${orders.length}`);

      res.status(200).json({
        success: true,
        data: {
          orders,
          summary,
        },
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      // Log detailed error information
      console.error(`[ORDER_HISTORY] Error occurred - UserID: ${userId}, Response Time: ${responseTime}ms`);
      console.error(`[ORDER_HISTORY] Error Details:`, {
        message: error.message,
        stack: error.stack,
        code: error.code,
        name: error.name,
        timestamp: new Date().toISOString()
      });

      // Log additional context for database errors
      if (error.name === 'MongoError' || error.name === 'MongooseError') {
        console.error(`[ORDER_HISTORY] Database Error Context - UserID: ${userId}, Error Type: ${error.name}`);
      }

      res.status(500).json({
        success: false,
        message: "Failed to retrieve order history",
        error: error.message,
      });
    }
  });
}