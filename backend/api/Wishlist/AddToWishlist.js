import VerifyToken from "../../middleware/VerifyToken.js";
import { Wishlist, Product } from "../../model/ExportModel.js";
import mongoose from "mongoose";

// 1. ADD TO WISHLIST
export default function AddToWishlist(app) {
  app.post("/api/v1/wishlist/add", VerifyToken, async (req, res) => {
    console.log(`/api/v1/wishlist/add, Timestamp: ${new Date().toISOString()}`);
    const startTime = Date.now();
    const userId = req.user?.id;
    const requestId = Math.random().toString(36).substr(2, 9);
    
    console.log(`[ADD_WISHLIST] Request initiated - UserID: ${userId}, RequestID: ${requestId}, Timestamp: ${new Date().toISOString()}`);
    console.log(`[ADD_WISHLIST] Request body summary - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${req.body.productId || 'not specified'}, Has preferences: ${!!(req.body.preferredSize || req.body.preferredColor)}`);

    try {
      const { productId, preferredSize, preferredColor } = req.body;

      console.log(`[ADD_WISHLIST] Starting validation - UserID: ${userId}, RequestID: ${requestId}`);

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        console.warn(`[ADD_WISHLIST] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Invalid userId from token`);
        return res.status(401).json({
          success: false,
          message: "User authentication required"
        });
      }

      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        console.warn(`[ADD_WISHLIST] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Invalid or missing productId - ${productId}`);
        return res.status(400).json({
          success: false,
          message: "Valid product ID is required"
        });
      }

      console.log(`[ADD_WISHLIST] Validation passed - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}`);

      // Verify product exists
      console.log(`[ADD_WISHLIST] Verifying product existence - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}`);
      
      const product = await Product.findById(productId);
      if (!product) {
        console.warn(`[ADD_WISHLIST] Product not found - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}`);
        return res.status(404).json({
          success: false,
          message: `Product not found: ${productId}`
        });
      }

      console.log(`[ADD_WISHLIST] Product verified - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}, Name: ${product.name}, Price: $${product.price}`);

      // Find or create wishlist
      console.log(`[ADD_WISHLIST] Searching for existing wishlist - UserID: ${userId}, RequestID: ${requestId}`);
      
      let wishlist = await Wishlist.findOne({ userId });

      if (!wishlist) {
        console.log(`[ADD_WISHLIST] Creating new wishlist - UserID: ${userId}, RequestID: ${requestId}`);
        wishlist = new Wishlist({ userId, items: [] });
      } else {
        console.log(`[ADD_WISHLIST] Existing wishlist found - UserID: ${userId}, RequestID: ${requestId}, Current items: ${wishlist.items.length}`);
      }

      // Check for duplicate
      const existingItem = wishlist.items.find(item => item.productId.toString() === productId);
      
      if (existingItem) {
        console.warn(`[ADD_WISHLIST] Duplicate product - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}, Already exists in wishlist`);
        return res.status(409).json({
          success: false,
          message: "Product already exists in wishlist"
        });
      }

      // Add item
      wishlist.items.push({
        productId,
        preferredSize,
        preferredColor
      });

      console.log(`[ADD_WISHLIST] Item added to wishlist - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}, New items count: ${wishlist.items.length}`);

      // Save wishlist
      await wishlist.save();
      console.log(`[ADD_WISHLIST] Wishlist saved - UserID: ${userId}, RequestID: ${requestId}, WishlistID: ${wishlist._id}`);

      // Populate for response
      await wishlist.populate("items.productId", "name price originalPrice image category colors sizes");

      const responseTime = Date.now() - startTime;
      console.log(`[ADD_WISHLIST] Item added successfully - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}, Items count: ${wishlist.items.length}, Response time: ${responseTime}ms`);

      res.status(201).json({
        success: true,
        message: "Item added to wishlist successfully",
        data: wishlist
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.error(`[ADD_WISHLIST] Error occurred - UserID: ${userId}, RequestID: ${requestId}, Response time: ${responseTime}ms`);
      console.error(`[ADD_WISHLIST] Error details:`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
        timestamp: new Date().toISOString()
      });

      res.status(500).json({
        success: false,
        message: "Failed to add item to wishlist",
        error: error.message
      });
    }
  });
}

