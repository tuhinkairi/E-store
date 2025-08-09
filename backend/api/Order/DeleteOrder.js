import VerifyToken from "../../middleware/VerifyToken.js";
import { Order } from "../../model/ExportModel.js";
import { isValidObjectId } from "./Order.js";

export default function DeleteOrder(app) {
  app.delete("/api/v1/order/delete/:id", VerifyToken, async (req, res) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      // Only admins can delete orders
      if (!req.user.isAdmin) {
        return res.status(403).json({
          success: false,
          message:
            "Only administrators can delete orders. Users can cancel orders instead.",
        });
      }

      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Restore stock for all items if order is being deleted
      if (order.status !== "Cancelled") {
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: item.quantity },
          });
        }
      }

      // Remove order from user's orders array
      await User.findByIdAndUpdate(order.userId, {
        $pull: { orders: order._id },
      });

      await Order.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    } catch (error) {
      console.error("Delete order error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete order",
        error: error.message,
      });
    }
  });
}
