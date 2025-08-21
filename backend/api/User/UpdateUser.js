// UpdateUser.js
import VerifyToken from "../../middleware/VerifyToken.js";
import { User } from "../../model/ExportModel.js";

export default function UpdateUser(app) {
  app.patch("/api/v1/user/update/", VerifyToken, async (req, res) => {
    const startTime = Date.now();
    const requestId =
      req.headers["x-request-id"] ||
      `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      console.log("userid ->", req?.user?.id);
      const userId = req?.user?.id;
      const updates = req?.body;
      const authenticatedUserId = req.user?.id;

      console.log(
        `[${new Date().toISOString()}] [INFO] [${requestId}] PATCH /api/v1/user/update/:id - Update attempt`,
        {
          targetUserId: userId,
          authenticatedUserId: authenticatedUserId,
          updateFields: Object.keys(updates),
          isAuthenticated: req.authenticated,
          userAgent: req.headers["user-agent"],
          ip: req.ip || req.connection.remoteAddress,
        }
      );

      // Fix the authentication logic (was inverted)
      if (!req.authenticated) {
        console.log(
          `[${new Date().toISOString()}] [WARN] [${requestId}] Unauthorized update attempt`,
          {
            targetUserId: userId,
            hasToken: !!req.headers.authorization,
          }
        );
        return res.status(401).json({
          message: "Authentication required",
          requestId,
        });
      }

      // Validate user ID format
      if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
        console.log(
          `[${new Date().toISOString()}] [WARN] [${requestId}] Invalid user ID format`,
          {
            providedId: userId,
          }
        );
        return res.status(400).json({
          message: "Invalid user ID format",
          requestId,
        });
      }

      // Authorization check - users can only update their own profile unless admin
      const isAdmin = req.user?.isAdmin;
      const isSelfUpdate = authenticatedUserId === userId;

      if (!isSelfUpdate && !isAdmin) {
        console.log(
          `[${new Date().toISOString()}] [WARN] [${requestId}] Forbidden update attempt`,
          {
            authenticatedUserId,
            targetUserId: userId,
            isAdmin,
          }
        );
        return res.status(403).json({
          message: "Insufficient permissions",
          requestId,
        });
      }

      // Validate and sanitize updates
      const allowedFields = [
        "firstName",
        "lastName",
        "email",
        "password",
        "birthDate",
        "phone",
        "marketingConsent",
        "genderPreference",
        "stylePreferences",
        "priceRange",
        "addressType",
        "street",
        "apartment",
        "city",
        "state",
        "zipCode",
        "country",
        "categories",
        "occasions",
        "orderUpdates",
        "promotionalEmails",
        "smsNotifications",
        "styleRecommendations",
        "isAdmin",
        "cart",
        "updatedAt",
      ];
      const adminOnlyFields = ["isAdmin"];

      const sanitizedUpdates = {};
      const rejectedFields = [];

      for (const [key, value] of Object.entries(updates)) {
        if (allowedFields.includes(key)) {
          sanitizedUpdates[key] = value;
        } else if (adminOnlyFields.includes(key) && isAdmin) {
          sanitizedUpdates[key] = value;
        } else {
          rejectedFields.push(key);
        }
      }

      if (rejectedFields.length > 0) {
        console.log(
          `[${new Date().toISOString()}] [WARN] [${requestId}] Rejected update fields`,
          {
            rejectedFields,
            isAdmin,
            userId: authenticatedUserId,
          }
        );
      }

      // Don't allow empty updates
      if (Object.keys(sanitizedUpdates).length === 0) {
        console.log(
          `[${new Date().toISOString()}] [WARN] [${requestId}] No valid fields to update`
        );
        return res.status(400).json({
          message: "No valid fields to update",
          requestId,
        });
      }

      // Add update timestamp
      sanitizedUpdates.updatedAt = new Date();

      const user = await User.findByIdAndUpdate(userId, sanitizedUpdates, {
        new: true,
        runValidators: true, // Run mongoose validators
      }).select("-password"); // Exclude password from response

      if (!user) {
        console.log(
          `[${new Date().toISOString()}] [WARN] [${requestId}] User not found for update`,
          {
            targetUserId: userId,
          }
        );
        return res.status(404).json({
          message: "User not found",
          requestId,
        });
      }

      const responseTime = Date.now() - startTime;
      console.log(
        `[${new Date().toISOString()}] [INFO] [${requestId}] User updated successfully`,
        {
          updatedUserId: userId,
          updatedFields: Object.keys(sanitizedUpdates),
          updatedBy: authenticatedUserId,
          responseTime: `${responseTime}ms`,
        }
      );

      res.json({
        message: "User updated successfully",
        user,
        updatedFields: Object.keys(sanitizedUpdates),
        requestId,
      });
    } catch (err) {
      const responseTime = Date.now() - startTime;
      console.error(
        `[${new Date().toISOString()}] [ERROR] [${requestId}] Error updating user`,
        {
          error: err.message,
          stack: err.stack,
          targetUserId: req.user?.id,
          authenticatedUserId: req.user?.id,
          responseTime: `${responseTime}ms`,
        }
      );

      // Handle specific mongoose errors
      if (err.name === "ValidationError") {
        return res.status(400).json({
          message: "Validation error",
          errors: Object.values(err.errors).map((e) => e.message),
          requestId,
        });
      }

      if (err.name === "CastError") {
        return res.status(400).json({
          message: "Invalid user ID format",
          requestId,
        });
      }

      res.status(500).json({
        message: "Internal Server Error",
        requestId,
        ...(process.env.NODE_ENV !== "production" && { error: err.message }),
      });
    }
  });
}
