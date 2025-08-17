import VerifyToken from "../../middleware/VerifyToken.js";
import { Wishlist, Product } from "../../model/ExportModel.js";
import mongoose from "mongoose";

// GET WISHLIST
export default function GetWishlist(app) {
  app.get("/api/v1/wishlist/get", VerifyToken, async (req, res) => {
    console.log(`/api/v1/wishlist/get, Timestamp: ${new Date().toISOString()}`);
    const startTime = Date.now();
    const userId = req.user?.id;
    const requestId = Math.random().toString(36).substr(2, 9);
    
    console.log(`[GET_WISHLIST] Request initiated - UserID: ${userId}, RequestID: ${requestId}, Timestamp: ${new Date().toISOString()}`);

    try {
      console.log(`[GET_WISHLIST] Starting validation - UserID: ${userId}, RequestID: ${requestId}`);

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        console.warn(`[GET_WISHLIST] Validation failed - UserID: ${userId}, RequestID: ${requestId}, Reason: Invalid userId from token`);
        return res.status(401).json({
          success: false,
          message: "User authentication required"
        });
      }

      console.log(`[GET_WISHLIST] Validation passed - UserID: ${userId}, RequestID: ${requestId}`);

      // Find wishlist for the user
      console.log(`[GET_WISHLIST] Searching for user's wishlist - UserID: ${userId}, RequestID: ${requestId}`);
      
      let wishlist = await Wishlist.findOne({ userId })
        .populate("items.productId", "name price originalPrice image category colors sizes stock status")
        .lean();

      if (!wishlist) {
        console.log(`[GET_WISHLIST] No wishlist found - UserID: ${userId}, RequestID: ${requestId}, Returning empty wishlist`);
        
        const responseTime = Date.now() - startTime;
        console.log(`[GET_WISHLIST] Empty wishlist returned - UserID: ${userId}, RequestID: ${requestId}, Response time: ${responseTime}ms`);
        
        return res.status(200).json({
          success: true,
          message: "Wishlist is empty",
          data: {
            userId,
            items: [],
            totalItems: 0,
            createdAt: null,
            updatedAt: null
          }
        });
      }

      // Filter out items where product no longer exists
      const validItems = wishlist.items.filter(item => item.productId);
      const removedItemsCount = wishlist.items.length - validItems.length;

      if (removedItemsCount > 0) {
        console.log(`[GET_WISHLIST] Found ${removedItemsCount} invalid items - UserID: ${userId}, RequestID: ${requestId}, Filtering out deleted products`);
        wishlist.items = validItems;
      }

      const responseTime = Date.now() - startTime;
      console.log(`[GET_WISHLIST] Wishlist retrieved successfully - UserID: ${userId}, RequestID: ${requestId}, Items count: ${validItems.length}, Response time: ${responseTime}ms`);

      res.status(200).json({
        success: true,
        message: "Wishlist retrieved successfully",
        data: {
          ...wishlist,
          totalItems: validItems.length
        }
      });

    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.error(`[GET_WISHLIST] Error occurred - UserID: ${userId}, RequestID: ${requestId}, Response time: ${responseTime}ms`);
      console.error(`[GET_WISHLIST] Error details:`, {
        message: error.message,
        stack: error.stack,
        name: error.name,
        timestamp: new Date().toISOString()
      });

      res.status(500).json({
        success: false,
        message: "Failed to retrieve wishlist",
        error: error.message
      });
    }
  });
}