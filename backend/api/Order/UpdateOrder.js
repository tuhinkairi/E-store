import VerifyToken from "../../middleware/VerifyToken.js";
import { Order, Product } from "../../model/ExportModel.js";
import { isValidObjectId } from "./Order.js";

export default function UpdateOrder(app) {
  app.patch("/api/v1/order/update-order/:id", VerifyToken, async (req, res) => {
    console.log(`/api/v1/order/update-order/${req.params.id}, Timestamp: ${new Date().toISOString()}`)
    
    const startTime = Date.now();
    const userId = req.user?.id;
    const orderId = req.params.id;
    const requestId = Math.random().toString(36).substr(2, 9); // Generate unique request ID
    
    // Log incoming request
    console.log(`[UPDATE_ORDER] Request initiated - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${orderId}, Timestamp: ${new Date().toISOString()}`);
    console.log(`[UPDATE_ORDER] Update request details - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${orderId}, Fields to update:`, Object.keys(req.body));
    console.log(`[UPDATE_ORDER] User context - UserID: ${userId}, RequestID: ${requestId}, IsAdmin: ${req.user?.isAdmin || false}, IP: ${req.ip}`);

    try {
      const { id } = req.params;
      const {
        status,
        paymentStatus,
        paymentMethod,
        trackingNumber,
        actualDelivery,
        notes,
        estimatedDelivery,
      } = req.body;

      // Log incoming update data
      console.log(`[UPDATE_ORDER] Update data received - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Update fields:`, {
        status: status || 'unchanged',
        paymentStatus: paymentStatus || 'unchanged',
        paymentMethod: paymentMethod || 'unchanged',
        trackingNumber: trackingNumber ? 'provided' : 'unchanged',
        actualDelivery: actualDelivery || 'unchanged',
        estimatedDelivery: estimatedDelivery || 'unchanged',
        notes: notes ? 'provided' : 'unchanged'
      });

      // Validation with logging
      console.log(`[UPDATE_ORDER] Starting validation - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);

      if (!isValidObjectId(id)) {
        console.warn(`[UPDATE_ORDER] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Invalid ObjectId format, OrderID: ${id}`);
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      console.log(`[UPDATE_ORDER] ObjectId validation passed - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);

      let query = { _id: id };

      // If not admin, only allow access to own orders and limited updates
      if (!req.user.isAdmin) {
        query.userId = req.user.id;
        console.log(`[UPDATE_ORDER] Non-admin user - UserID: ${userId}, RequestID: ${requestId}, Filtering to user's own orders only`);

        // Regular users can only cancel pending orders
        if (status && status !== "Cancelled") {
          console.warn(`[UPDATE_ORDER] Authorization failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Non-admin user attempted non-cancellation status change, Status: ${status}`);
          return res.status(403).json({
            success: false,
            message: "You can only cancel your orders",
          });
        }
        
        if (status === "Cancelled") {
          console.log(`[UPDATE_ORDER] User cancellation request - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);
        }
      } else {
        console.log(`[UPDATE_ORDER] Admin access - UserID: ${userId}, RequestID: ${requestId}, Full update permissions for OrderID: ${id}`);
      }

      console.log(`[UPDATE_ORDER] Query object constructed - UserID: ${userId}, RequestID: ${requestId}, Query:`, query);

      // Find existing order
      console.log(`[UPDATE_ORDER] Fetching existing order - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);
      
      const existingOrder = await Order.findOne(query);

      if (!existingOrder) {
        console.warn(`[UPDATE_ORDER] Order not found - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Query:`, query);
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Log existing order details
      console.log(`[UPDATE_ORDER] Existing order found - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Current state:`, {
        orderNumber: existingOrder.orderNumber,
        currentStatus: existingOrder.status,
        currentPaymentStatus: existingOrder.paymentStatus,
        totalAmount: existingOrder.totalAmount,
        itemsCount: existingOrder.items?.length || 0,
        orderOwner: existingOrder.userId
      });

      // Validate status transitions
      console.log(`[UPDATE_ORDER] Validating status transitions - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);

      const validStatuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
      ];
      const validPaymentStatuses = ["Pending", "Paid", "Failed", "Refunded"];

      if (status && !validStatuses.includes(status)) {
        console.warn(`[UPDATE_ORDER] Invalid status - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Invalid status: ${status}, Valid statuses:`, validStatuses);
        return res.status(400).json({
          success: false,
          message: "Invalid order status",
        });
      }

      if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
        console.warn(`[UPDATE_ORDER] Invalid payment status - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Invalid payment status: ${paymentStatus}, Valid statuses:`, validPaymentStatuses);
        return res.status(400).json({
          success: false,
          message: "Invalid payment status",
        });
      }

      // Log status transition if applicable
      if (status && status !== existingOrder.status) {
        console.log(`[UPDATE_ORDER] Status transition - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, From: ${existingOrder.status} → To: ${status}`);
      }

      if (paymentStatus && paymentStatus !== existingOrder.paymentStatus) {
        console.log(`[UPDATE_ORDER] Payment status transition - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, From: ${existingOrder.paymentStatus || 'undefined'} → To: ${paymentStatus}`);
      }

      // Build update object
      console.log(`[UPDATE_ORDER] Building update object - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);
      
      const updateData = {};

      if (status !== undefined) updateData.status = status;
      if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;
      if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;
      if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
      if (notes !== undefined) updateData.notes = notes;
      if (estimatedDelivery !== undefined) updateData.estimatedDelivery = new Date(estimatedDelivery);

      // Auto-set delivery date when status becomes "Delivered"
      if (status === "Delivered" && !actualDelivery) {
        updateData.actualDelivery = new Date();
        console.log(`[UPDATE_ORDER] Auto-setting delivery date - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Delivery date: ${updateData.actualDelivery}`);
      } else if (actualDelivery !== undefined) {
        updateData.actualDelivery = new Date(actualDelivery);
        console.log(`[UPDATE_ORDER] Manual delivery date set - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Delivery date: ${updateData.actualDelivery}`);
      }

      console.log(`[UPDATE_ORDER] Update object created - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Update fields:`, Object.keys(updateData));

      // Handle order cancellation - restore stock
      if (status === "Cancelled" && existingOrder.status !== "Cancelled") {
        console.log(`[UPDATE_ORDER] Processing cancellation - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Restoring stock for ${existingOrder.items.length} items`);
        
        for (let i = 0; i < existingOrder.items.length; i++) {
          const item = existingOrder.items[i];
          console.log(`[UPDATE_ORDER] Restoring stock for item ${i + 1}/${existingOrder.items.length} - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Quantity: ${item.quantity}`);
          
          try {
            await Product.findByIdAndUpdate(item.productId, {
              $inc: { stock: item.quantity },
            });
            console.log(`[UPDATE_ORDER] Stock restored successfully - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Quantity restored: ${item.quantity}`);
          } catch (stockError) {
            console.error(`[UPDATE_ORDER] Stock restoration failed - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Error: ${stockError.message}`);
            // Continue with update even if stock restoration fails for some items
          }
        }
        
        console.log(`[UPDATE_ORDER] Stock restoration completed - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);
      } else if (status === "Cancelled") {
        console.log(`[UPDATE_ORDER] Order already cancelled - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Skipping stock restoration`);
      }

      // Update the order
      console.log(`[UPDATE_ORDER] Updating order in database - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);
      
      const updatedOrder = await Order.findOneAndUpdate(query, updateData, {
        new: true,
        runValidators: true,
      })
        .populate("userId", "firstName lastName email")
        .populate("items.productId", "name price category image");

      console.log(`[UPDATE_ORDER] Order updated successfully - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}`);

      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Log successful completion with change summary
      console.log(`[UPDATE_ORDER] Request completed successfully - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Response time: ${responseTime}ms`);
      console.log(`[UPDATE_ORDER] Update summary - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${id}, Order number: ${updatedOrder.orderNumber}, Changes:`, {
        statusChange: existingOrder.status !== updatedOrder.status ? `${existingOrder.status} → ${updatedOrder.status}` : 'none',
        paymentStatusChange: existingOrder.paymentStatus !== updatedOrder.paymentStatus ? `${existingOrder.paymentStatus || 'none'} → ${updatedOrder.paymentStatus}` : 'none',
        trackingAdded: trackingNumber ? 'yes' : 'no',
        stockRestored: status === "Cancelled" && existingOrder.status !== "Cancelled" ? existingOrder.items.length : 0
      });

      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        data: updatedOrder,
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      // Log comprehensive error details
      console.error(`[UPDATE_ORDER] Error occurred - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${orderId}, Response time: ${responseTime}ms`);
      console.error(`[UPDATE_ORDER] Error details:`, {
        message: error.message,
        stack: error.stack,
        code: error.code,
        name: error.name,
        timestamp: new Date().toISOString(),
        requestData: {
          orderId: orderId,
          updateFields: Object.keys(req.body),
          userIsAdmin: req.user?.isAdmin || false,
          userAgent: req.get('User-Agent')
        }
      });

      // Log specific error types
      if (error.name === 'MongoError' || error.name === 'MongooseError') {
        console.error(`[UPDATE_ORDER] Database error - UserID: ${userId}, RequestID: ${requestId}, Error type: ${error.name}, Code: ${error.code}`);
      }

      if (error.name === 'ValidationError') {
        console.error(`[UPDATE_ORDER] Validation error - UserID: ${userId}, RequestID: ${requestId}, Validation errors:`, error.errors);
      }

      if (error.name === 'CastError') {
        console.error(`[UPDATE_ORDER] Cast error - UserID: ${userId}, RequestID: ${requestId}, Value: ${error.value}, Path: ${error.path}`);
      }

      // Business logic errors
      if (error.message.includes('stock') || error.message.includes('inventory')) {
        console.error(`[UPDATE_ORDER] Stock operation error - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${orderId}, Error: ${error.message}`);
      }

      // Security concern logging
      if (error.message.includes('permission') || error.message.includes('authorization')) {
        console.error(`[UPDATE_ORDER] Security concern - UserID: ${userId}, RequestID: ${requestId}, Potential unauthorized update attempt for OrderID: ${orderId}`);
      }

      // Date/time parsing errors
      if (error.message.includes('date') || error.message.includes('Date')) {
        console.error(`[UPDATE_ORDER] Date parsing error - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${orderId}, Likely invalid date format in request`);
      }

      res.status(500).json({
        success: false,
        message: "Failed to update order",
        error: error.message,
      });
    }
  });
}