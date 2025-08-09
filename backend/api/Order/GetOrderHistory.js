import VerifyToken from "../../middleware/VerifyToken.js";
import { Order } from "../../model/ExportModel.js";

export default function GetUserOrderHistory(app) {
  app.post("", VerifyToken, async (req, res) => {
    try {
      const userId = req.user.id;

      const orders = await Order.find({ userId })
        .populate("items.productId", "name price category image")
        .sort({ createdAt: -1 });

      const summary = {
        totalOrders: orders.length,
        totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0),
        ordersByStatus: {},
      };

      orders.forEach((order) => {
        summary.ordersByStatus[order.status] =
          (summary.ordersByStatus[order.status] || 0) + 1;
      });

      res.status(200).json({
        success: true,
        data: {
          orders,
          summary,
        },
      });
    } catch (error) {
      console.error("Get user order history error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve order history",
        error: error.message,
      });
    }
  });
}
