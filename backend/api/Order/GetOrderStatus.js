import VerifyToken from "../../middleware/VerifyToken.js";
import { Order } from "../../model/ExportModel.js";

export default function GetOrderStats(app) {
  app.post("/api/v1/order/status", VerifyToken, async (req, res) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Admin access required",
        });
      }

      const stats = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: "$totalAmount" },
            averageOrderValue: { $avg: "$totalAmount" },
          },
        },
      ]);

      const statusStats = await Order.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      const paymentStats = await Order.aggregate([
        {
          $group: {
            _id: "$paymentStatus",
            count: { $sum: 1 },
          },
        },
      ]);

      res.status(200).json({
        success: true,
        data: {
          overview: stats[0] || {
            totalOrders: 0,
            totalRevenue: 0,
            averageOrderValue: 0,
          },
          statusBreakdown: statusStats,
          paymentBreakdown: paymentStats,
        },
      });
    } catch (error) {
      console.error("Get order stats error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve order statistics",
        error: error.message,
      });
    }
  });
}
