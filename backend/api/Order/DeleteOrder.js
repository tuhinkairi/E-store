import VerifyToken from "../../middleware/VerifyToken.js";
import { Order, Product, User } from "../../model/ExportModel.js";
import { isValidObjectId } from "./Order.js";

export default function DeleteOrder(app) {
  app.delete("/api/v1/order/delete/:id", VerifyToken, async (req, res) => {
    console.log(`/api/v1/order/delete/${req.params.id}, Timestamp: ${new Date().toISOString()}`)
    
    const startTime = Date.now();
    const userId = req.user?.id;
    const orderId = req.params.id;
    const requestId = Math.random().toString(36).substr(2, 9); // Generate unique request ID
    
    // Log incoming request
    console.log(`[DELETE_ORDER] Request initiated - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${orderId}, Timestamp: ${new Date().toISOString()}`);
    console.log(`[DELETE_ORDER] Admin status - UserID: ${userId}, RequestID: ${requestId}, IsAdmin: ${req.user?.isAdmin || false}, IP: ${req.ip}`);

    try {
      const { id } = req.params;

      // Validation with logging
      console.log(`[DELETE_ORDER] Starting validation - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);

      if (!isValidObjectId(id)) {
        console.warn(`[DELETE_ORDER] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Invalid ObjectId format, OrderID: ${id}`);
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      // Admin authorization check
      if (!req.user.isAdmin) {
        console.warn(`[DELETE_ORDER] Authorization failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Non-admin user attempted order deletion, OrderID: ${id}`);
        return res.status(403).json({
          success: false,
          message:
            "Only administrators can delete orders. Users can cancel orders instead.",
        });
      }

      console.log(`[DELETE_ORDER] Authorization passed - UserID: ${userId}, RequestID: ${requestId}, Admin confirmed for OrderID: ${id}`);

      // Find the order
      console.log(`[DELETE_ORDER] Fetching order details - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);
      
      const order = await Order.findById(id);

      if (!order) {
        console.warn(`[DELETE_ORDER] Order not found - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Log order details before deletion
      console.log(`[DELETE_ORDER] Order found - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Order details:`, {
        orderNumber: order.orderNumber,
        orderUserId: order.userId,
        status: order.status,
        totalAmount: order.totalAmount,
        itemsCount: order.items?.length || 0,
        createdAt: order.createdAt
      });

      // Restore stock for all items if order is being deleted
      if (order.status !== "Cancelled") {
        console.log(`[DELETE_ORDER] Restoring stock - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Order status: ${order.status}, Items to restore: ${order.items.length}`);
        
        for (let i = 0; i < order.items.length; i++) {
          const item = order.items[i];
          console.log(`[DELETE_ORDER] Restoring stock for item ${i + 1}/${order.items.length} - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Quantity to restore: ${item.quantity}`);
          
          try {
            await Product.findByIdAndUpdate(item.productId, {
              $inc: { stock: item.quantity },
            });
            console.log(`[DELETE_ORDER] Stock restored successfully - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Quantity restored: ${item.quantity}`);
          } catch (stockError) {
            console.error(`[DELETE_ORDER] Stock restoration failed - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Error: ${stockError.message}`);
            // Continue with deletion even if stock restoration fails for some items
          }
        }
      } else {
        console.log(`[DELETE_ORDER] Skipping stock restoration - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Reason: Order already cancelled`);
      }

      // Remove order from user's orders array
      console.log(`[DELETE_ORDER] Removing order from user array - UserID: ${userId}, RequestID: ${requestId}, OrderUserId: ${order.userId}, OrderID: ${id}`);
      
      await User.findByIdAndUpdate(order.userId, {
        $pull: { orders: order._id },
      });

      console.log(`[DELETE_ORDER] Order removed from user array - UserID: ${userId}, RequestID: ${requestId}, OrderUserId: ${order.userId}`);

      // Delete the order
      console.log(`[DELETE_ORDER] Deleting order from database - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);
      
      await Order.findByIdAndDelete(id);

      // Calculate final response time
      const responseTime = Date.now() - startTime;

      // Log successful completion with metrics
      console.log(`[DELETE_ORDER] Order deleted successfully - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Response time: ${responseTime}ms`);
      console.log(`[DELETE_ORDER] Deletion summary - Admin: ${userId}, RequestID: ${requestId}, Deleted OrderID: ${id}, Order number: ${order.orderNumber}, Items restored: ${order.status !== "Cancelled" ? order.items.length : 0}, Total amount freed: $${order.totalAmount}`);

      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      // Log comprehensive error details
      console.error(`[DELETE_ORDER] Error occurred - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${orderId}, Response time: ${responseTime}ms`);
      console.error(`[DELETE_ORDER] Error details:`, {
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
        console.error(`[DELETE_ORDER] Database error - UserID: ${userId}, RequestID: ${requestId}, Error type: ${error.name}, Code: ${error.code}`);
      }

      if (error.name === 'CastError') {
        console.error(`[DELETE_ORDER] Cast error (likely invalid ID) - UserID: ${userId}, RequestID: ${requestId}, Value: ${error.value}, Path: ${error.path}`);
      }

      // Security concern logging
      if (error.message.includes('permission') || error.message.includes('authorization')) {
        console.error(`[DELETE_ORDER] Security concern - UserID: ${userId}, RequestID: ${requestId}, Potential unauthorized access attempt`);
      }

      res.status(500).json({
        success: false,
        message: "Failed to delete order",
        error: error.message,
      });
    }
  });
}