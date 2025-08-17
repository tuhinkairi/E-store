import mongoose from "mongoose";
import VerifyToken from "../../middleware/VerifyToken.js";
import { Wishlist } from "../../model/ExportModel.js";

// 3. UPDATE WISHLIST ITEM
export default function UpdateWishlistItem(app) {
  app.patch("/api/v1/wishlist/update", VerifyToken, async (req, res) => {
    console.log(`/api/v1/wishlist/update, Timestamp: ${new Date().toISOString()}`);
    const startTime = Date.now();
    const userId = req.user?.id;
    const requestId = Math.random().toString(36).substr(2, 9);
    
    console.log(`[UPDATE_WISHLIST] Request initiated - UserID: ${userId}, RequestID: ${requestId}, Timestamp: ${new Date().toISOString()}`);
    console.log(`[UPDATE_WISHLIST] Request body summary - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${req.body.productId || 'not specified'}, Updates: Size: ${req.body.preferredSize || 'unchanged'}, Color: ${req.body.preferredColor || 'unchanged'}`);

    try {
      const { productId, preferredSize, preferredColor } = req.body;

      console.log(`[UPDATE_WISHLIST] Starting validation - UserID: ${userId}, RequestID: ${requestId}`);

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        console.warn(`[UPDATE_WISHLIST] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Invalid userId from token`);
        return res.status(401).json({
          success: false,
          message: "User authentication required"
        });
      }

      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        console.warn(`[UPDATE_WISHLIST] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Invalid or missing productId - ${productId}`);
        return res.status(400).json({
          success: false,
          message: "Valid product ID is required"
        });
      }

      if (preferredSize === undefined && preferredColor === undefined) {
        console.warn(`[UPDATE_WISHLIST] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: No update data provided`);
        return res.status(400).json({
          success: false,
          message: "At least one field (preferredSize or preferredColor) is required to update"
        });
      }

      console.log(`[UPDATE_WISHLIST] Validation passed - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}`);

      // Find wishlist
      console.log(`[UPDATE_WISHLIST] Searching for wishlist - UserID: ${userId}, RequestID: ${requestId}`);
      
      const wishlist = await Wishlist.findOne({ userId });

      if (!wishlist) {
        console.warn(`[UPDATE_WISHLIST] Wishlist not found - UserID: ${userId}, RequestID: ${requestId}`);
        return res.status(404).json({
          success: false,
          message: "Wishlist not found"
        });
      }

      console.log(`[UPDATE_WISHLIST] Wishlist found - UserID: ${userId}, RequestID: ${requestId}, Items count: ${wishlist.items.length}`);

      // Find item to update
      const item = wishlist.items.find(item => item.productId.toString() === productId);

      if (!item) {
        console.warn(`[UPDATE_WISHLIST] Item not found in wishlist - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}`);
        return res.status(404).json({
          success: false,
          message: "Product not found in wishlist"
        });
      }

      console.log(`[UPDATE_WISHLIST] Item found - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}, Current size: ${item.preferredSize || 'none'}, Current color: ${item.preferredColor || 'none'}`);

      // Update preferences
      const oldSize = item.preferredSize;
      const oldColor = item.preferredColor;

      if (preferredSize !== undefined) item.preferredSize = preferredSize;
      if (preferredColor !== undefined) item.preferredColor = preferredColor;

      console.log(`[UPDATE_WISHLIST] Item updated - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}, Size: ${oldSize || 'none'} → ${item.preferredSize || 'none'}, Color: ${oldColor || 'none'} → ${item.preferredColor || 'none'}`);

      // Save wishlist
      await wishlist.save();
      console.log(`[UPDATE_WISHLIST] Wishlist saved - UserID: ${userId}, RequestID: ${requestId}, WishlistID: ${wishlist._id}`);

      // Populate for response
      await wishlist.populate("items.productId", "name price originalPrice image category colors sizes");

      const responseTime = Date.now() - startTime;
      console.log(`[UPDATE_WISHLIST] Item updated successfully - UserID: ${userId}, RequestID: ${requestId}, ProductID: ${productId}, Response time: ${responseTime}ms`);

      res.status(200).json({
        success: true,
        message: "Item preferences updated successfully",
        data: wishlist
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.error(`[UPDATE_WISHLIST] Error occurred - UserID: ${userId}, RequestID: ${requestId}, Response time: ${responseTime}ms`);
      console.error(`[UPDATE_WISHLIST] Error details:`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
        timestamp: new Date().toISOString()
      });

      res.status(500).json({
        success: false,
        message: "Failed to update item preferences",
        error: error.message
      });
    }
  });
}
