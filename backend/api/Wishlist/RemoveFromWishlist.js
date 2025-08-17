import mongoose from "mongoose";
import VerifyToken from "../../middleware/VerifyToken.js";
import { Wishlist } from "../../model/ExportModel.js";

// 2. REMOVE FROM WISHLIST
export default function RemoveFromWishlist(app) {
  app.delete("/api/v1/wishlist/remove", VerifyToken, async (req, res) => {
    console.log(`/api/v1/wishlist/remove, Timestamp: ${new Date().toISOString()}`);
    const startTime = Date.now();
    const userId = req.user?.id;
    const requestId = Math.random().toString(36).substr(2, 9);
    
    console.log(`[REMOVE_WISHLIST] Request initiated - UserID: ${userId}, RequestID: ${requestId}, Timestamp: ${new Date().toISOString()}`);
    console.log(`[REMOVE_WISHLIST] Request body summary - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${req.body.productId || 'not specified'}`);

    try {
      const { productId } = req.body;

      console.log(`[REMOVE_WISHLIST] Starting validation - UserID: ${userId}, RequestID: ${requestId}`);

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        console.warn(`[REMOVE_WISHLIST] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Invalid userId from token`);
        return res.status(401).json({
          success: false,
          message: "User authentication required"
        });
      }

      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        console.warn(`[REMOVE_WISHLIST] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Invalid or missing productId - ${productId}`);
        return res.status(400).json({
          success: false,
          message: "Valid product ID is required"
        });
      }

      console.log(`[REMOVE_WISHLIST] Validation passed - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}`);

      // Find wishlist
      console.log(`[REMOVE_WISHLIST] Searching for wishlist - UserID: ${userId}, RequestID: ${requestId}`);
      
      const wishlist = await Wishlist.findOne({ userId });

      if (!wishlist) {
        console.warn(`[REMOVE_WISHLIST] Wishlist not found - UserID: ${userId}, RequestID: ${requestId}`);
        return res.status(404).json({
          success: false,
          message: "Wishlist not found"
        });
      }

      console.log(`[REMOVE_WISHLIST] Wishlist found - UserID: ${userId}, RequestID: ${requestId}, Current items: ${wishlist.items.length}`);

      // Find and remove item
      const initialLength = wishlist.items.length;
      wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);

      if (wishlist.items.length === initialLength) {
        console.warn(`[REMOVE_WISHLIST] Product not found in wishlist - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}`);
        return res.status(404).json({
          success: false,
          message: "Product not found in wishlist"
        });
      }

      console.log(`[REMOVE_WISHLIST] Item removed from wishlist - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}, Remaining items: ${wishlist.items.length}`);

      // Save wishlist
      await wishlist.save();
      console.log(`[REMOVE_WISHLIST] Wishlist saved - UserID: ${userId}, RequestID: ${requestId}, WishlistID: ${wishlist._id}`);

      // Populate for response
      await wishlist.populate("items.productId", "name price originalPrice image category colors sizes stock");

      const responseTime = Date.now() - startTime;
      console.log(`[REMOVE_WISHLIST] Item removed successfully - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}, Items count: ${wishlist.items.length}, Response time: ${responseTime}ms`);

      res.status(200).json({
        success: true,
        message: "Item removed from wishlist successfully",
        data: wishlist
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.error(`[REMOVE_WISHLIST] Error occurred - UserID: ${userId}, RequestID: ${requestId}, Response time: ${responseTime}ms`);
      console.error(`[REMOVE_WISHLIST] Error details:`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
        timestamp: new Date().toISOString()
      });

      res.status(500).json({
        success: false,
        message: "Failed to remove item from wishlist",
        error: error.message
      });
    }
  });
}

