import VerifyToken from "../../middleware/VerifyToken.js";
import { Order, Product } from "../../model/ExportModel.js";
import { calculateEstimatedDelivery, generateOrderNumber, isValidObjectId } from "./Order.js";

export default function CreateOrder(app) {
  app.post("/api/v1/order/create", VerifyToken, async (req, res) => {
    try {
      const { items, paymentMethod, shippingAddress, notes } = req.body;

      // Validation
      if (!items || !Array.isArray(items) || items.length === 0) {
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
        return res.status(400).json({
          success: false,
          message: "Complete shipping address is required",
        });
      }

      // Validate and process order items
      let totalAmount = 0;
      const processedItems = [];

      for (const item of items) {
        if (!item.productId || !item.quantity || item.quantity < 1) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid item data. ProductId and quantity (min 1) are required",
          });
        }

        if (!isValidObjectId(item.productId)) {
          return res.status(400).json({
            success: false,
            message: `Invalid product ID: ${item.productId}`,
          });
        }

        // Check if product exists and get current price
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.productId}`,
          });
        }

        // Check stock availability
        if (product.stock < item.quantity) {
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
        totalAmount += product.price * item.quantity;

        // Update product stock
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }

      // Create the order
      const newOrder = new Order({
        userId: req.user.id,
        items: processedItems,
        totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
        paymentMethod: paymentMethod || "pending",
        shippingAddress,
        orderNumber: generateOrderNumber(),
        estimatedDelivery: calculateEstimatedDelivery(),
        notes: notes || undefined,
      });

      const savedOrder = await newOrder.save();

      // Add order to user's orders array
      await User.findByIdAndUpdate(req.user.id, {
        $push: { orders: savedOrder._id },
      });

      // Populate product details for response
      const populatedOrder = await Order.findById(savedOrder._id)
        .populate("userId", "firstName lastName email")
        .populate("items.productId", "name price category image");

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: populatedOrder,
      });
    } catch (error) {
      console.error("Create order error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
    }
  });
}
