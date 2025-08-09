import VerifyToken from "../../middleware/VerifyToken.js";
import { Order, Product, User } from "../../model/ExportModel.js";
import { calculateEstimatedDelivery, generateOrderNumber, isValidObjectId } from "./Order.js";

export default function CreateOrder(app) {
  app.post("/api/v1/order/create", VerifyToken, async (req, res) => {
    console.log(`/api/v1/order/create, Timestamp: ${new Date().toISOString()}`)
    const startTime = Date.now();
    const userId = req.user?.id;
    const requestId = Math.random().toString(36).substr(2, 9); // Generate unique request ID
    
    // Log incoming request
    console.log(`[CREATE_ORDER] Request initiated - UserID: ${userId}, RequestID: ${requestId}, Timestamp: ${new Date().toISOString()}`);
    console.log(`[CREATE_ORDER] Request body summary - UserID: ${userId}, RequestID: ${requestId}, Items count: ${req.body.items?.length || 0}, Payment method: ${req.body.paymentMethod || 'not specified'}`);

    try {
      const { items, paymentMethod, shippingAddress, notes } = req.body;

      // Validation with logging
      console.log(`[CREATE_ORDER] Starting validation - UserID: ${userId}, RequestID: ${requestId}`);

      if (!items || !Array.isArray(items) || items.length === 0) {
        console.warn(`[CREATE_ORDER] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Missing or invalid items array`);
        return res.status(400).json({
          success: false,
          message: "Order items are required",
        });
      }

      if (
        !shippingAddress ||
        !shippingAddress.street ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.zipCode ||
        !shippingAddress.country
      ) {
        console.warn(`[CREATE_ORDER] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Incomplete shipping address`);
        return res.status(400).json({
          success: false,
          message: "Complete shipping address is required",
        });
      }

      console.log(`[CREATE_ORDER] Basic validation passed - UserID: ${userId}, RequestID: ${requestId}, Items to process: ${items.length}`);

      // Validate and process order items
      let totalAmount = 0;
      const processedItems = [];

      console.log(`[CREATE_ORDER] Processing order items - UserID: ${userId}, RequestID: ${requestId}`);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(`[CREATE_ORDER] Processing item ${i + 1}/${items.length} - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Quantity: ${item.quantity}`);

        if (!item.productId || !item.quantity || item.quantity < 1) {
          console.warn(`[CREATE_ORDER] Item validation failed - UserID: ${userId}, RequestID: ${requestId}, Item ${i + 1}: Invalid productId or quantity`);
          return res.status(400).json({
            success: false,
            message:
              "Invalid item data. ProductId and quantity (min 1) are required",
          });
        }

        if (!isValidObjectId(item.productId)) {
          console.warn(`[CREATE_ORDER] Invalid ObjectId - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}`);
          return res.status(400).json({
            success: false,
            message: `Invalid product ID: ${item.productId}`,
          });
        }

        // Check if product exists and get current price
        console.log(`[CREATE_ORDER] Fetching product details - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}`);
        
        const product = await Product.findById(item.productId);
        if (!product) {
          console.warn(`[CREATE_ORDER] Product not found - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}`);
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.productId}`,
          });
        }

        console.log(`[CREATE_ORDER] Product found - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Name: ${product.name}, Price: $${product.price}, Stock: ${product.stock}`);

        // Check stock availability
        if (product.stock < item.quantity) {
          console.warn(`[CREATE_ORDER] Insufficient stock - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Available: ${product.stock}, Requested: ${item.quantity}`);
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product: ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
          });
        }

        const processedItem = {
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: product.price, // Use current product price
          size: item.size || undefined,
          color: item.color || undefined,
        };

        processedItems.push(processedItem);
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        console.log(`[CREATE_ORDER] Item processed - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Item total: $${itemTotal.toFixed(2)}`);

        // Update product stock
        console.log(`[CREATE_ORDER] Updating stock - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}, Reducing stock by: ${item.quantity}`);
        
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });

        console.log(`[CREATE_ORDER] Stock updated successfully - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${item.productId}`);
      }

      console.log(`[CREATE_ORDER] All items processed - UserID: ${userId}, RequestID: ${requestId}, Total items: ${processedItems.length}, Total amount: $${totalAmount.toFixed(2)}`);

      // Create the order
      const orderNumber = generateOrderNumber();
      const estimatedDelivery = calculateEstimatedDelivery();
      
      console.log(`[CREATE_ORDER] Creating order - UserID: ${userId}, RequestID: ${requestId}, Order number: ${orderNumber}, Estimated delivery: ${estimatedDelivery}`);

      const newOrder = new Order({
        userId: req.user.id,
        items: processedItems,
        totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
        paymentMethod: paymentMethod || "pending",
        shippingAddress,
        orderNumber: orderNumber,
        estimatedDelivery: estimatedDelivery,
        notes: notes || undefined,
      });

      const savedOrder = await newOrder.save();
      console.log(`[CREATE_ORDER] Order saved to database - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${savedOrder._id}, Order number: ${orderNumber}`);

      // Add order to user's orders array
      console.log(`[CREATE_ORDER] Updating user orders array - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${savedOrder._id}`);
      
      await User.findByIdAndUpdate(req.user.id, {
        $push: { orders: savedOrder._id },
      });

      console.log(`[CREATE_ORDER] User orders array updated - UserID: ${userId}, RequestID: ${requestId}`);

      // Populate product details for response
      console.log(`[CREATE_ORDER] Populating order details for response - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${savedOrder._id}`);
      
      const populatedOrder = await Order.findById(savedOrder._id)
        .populate("userId", "firstName lastName email")
        .populate("items.productId", "name price category image");

      // Calculate final response time
      const responseTime = Date.now() - startTime;

      // Log successful completion
      console.log(`[CREATE_ORDER] Order created successfully - UserID: ${userId}, RequestID: ${requestId}, OrderID: ${savedOrder._id}, Order number: ${orderNumber}, Total amount: $${savedOrder.totalAmount}, Response time: ${responseTime}ms`);
      console.log(`[CREATE_ORDER] Order summary - UserID: ${userId}, RequestID: ${requestId}, Items: ${processedItems.length}, Payment method: ${paymentMethod || 'pending'}, Delivery address: ${shippingAddress.city}, ${shippingAddress.state}`);

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: populatedOrder,
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      // Log comprehensive error details
      console.error(`[CREATE_ORDER] Error occurred - UserID: ${userId}, RequestID: ${requestId}, Response time: ${responseTime}ms`);
      console.error(`[CREATE_ORDER] Error details:`, {
        message: error.message,
        stack: error.stack,
        code: error.code,
        name: error.name,
        timestamp: new Date().toISOString(),
        requestData: {
          itemsCount: req.body.items?.length || 0,
          paymentMethod: req.body.paymentMethod,
          hasShippingAddress: !!req.body.shippingAddress
        }
      });

      // Log specific error types
      if (error.name === 'MongoError' || error.name === 'MongooseError') {
        console.error(`[CREATE_ORDER] Database error - UserID: ${userId}, RequestID: ${requestId}, Error type: ${error.name}, Code: ${error.code}`);
      }

      if (error.name === 'ValidationError') {
        console.error(`[CREATE_ORDER] Validation error - UserID: ${userId}, RequestID: ${requestId}, Validation errors:`, error.errors);
      }

      // Log potential stock inconsistency issues
      if (error.message.includes('stock') || error.message.includes('inventory')) {
        console.error(`[CREATE_ORDER] Potential stock inconsistency - UserID: ${userId}, RequestID: ${requestId}, Error: ${error.message}`);
      }

      res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
    }
  });
}