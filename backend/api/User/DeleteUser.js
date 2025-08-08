// DeleteUser.js
import VerifyToken from "../../middleware/VerifyToken.js";
import { User } from "../../model/ExportModel.js";

export default function DeleteUser(app) {
  // API endpoint to delete a user
  app.delete("/api/v1/user/delete/", VerifyToken, async (req, res) => {
    const startTime = Date.now();
    const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      const userId = req.user.id;
      
      // Enhanced logging with structured format
      console.log(`[${new Date().toISOString()}] [INFO] [${requestId}] DELETE /api/v1/user/delete/ - Starting user deletion`, {
        userId: userId,
        userAgent: req.headers['user-agent'],
        ip: req.ip || req.connection.remoteAddress
      });

      // Input validation
      if (!userId) {
        console.log(`[${new Date().toISOString()}] [WARN] [${requestId}] User ID not found in request`);
        return res.status(400).json({ 
          message: "Invalid user session",
          requestId 
        });
      }

      const user = await User.findByIdAndDelete(userId);
      
      if (!user) {
        console.log(`[${new Date().toISOString()}] [WARN] [${requestId}] User not found for deletion`, {
          attemptedUserId: userId
        });
        return res.status(404).json({ 
          message: "User not found",
          requestId 
        });
      }

      // Clear session cookie
      res.clearCookie("elegance_session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      const responseTime = Date.now() - startTime;
      console.log(`[${new Date().toISOString()}] [INFO] [${requestId}] User deleted successfully`, {
        deletedUserId: userId,
        responseTime: `${responseTime}ms`
      });

      res.status(200).json({ 
        message: "User deleted successfully",
        requestId 
      });

    } catch (err) {
      const responseTime = Date.now() - startTime;
      console.error(`[${new Date().toISOString()}] [ERROR] [${requestId}] Error deleting user`, {
        error: err.message,
        stack: err.stack,
        userId: req.user?.id,
        responseTime: `${responseTime}ms`
      });
      
      res.status(500).json({ 
        message: "Error deleting user",
        requestId,
        // Don't expose internal error details in production
        ...(process.env.NODE_ENV !== 'production' && { error: err.message })
      });
    }
  });
}

