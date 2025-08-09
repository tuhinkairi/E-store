import VerifyToken from "../../middleware/VerifyToken.js";
import { Order } from "../../model/ExportModel.js";
import { isValidObjectId } from "./Order.js";

export default function UpdateOrder(app) {
  app.patch("/api/v1/order/update-order/:id", VerifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const {
        status,
        paymentStatus,
        paymentMethod,
        trackingNumber,
        actualDelivery,
        notes,
        estimatedDelivery,
      } = req.body;

      if (!isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      let query = { _id: id };

      // If not admin, only allow access to own orders and limited updates
      if (!req.user.isAdmin) {
        query.userId = req.user.id;

        // Regular users can only cancel pending orders
        if (status && status !== "Cancelled") {
          return res.status(403).json({
            success: false,
            message: "You can only cancel your orders",
          });
        }
      }

      const existingOrder = await Order.findOne(query);

      if (!existingOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Validate status transitions
      const validStatuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
      ];
      const validPaymentStatuses = ["Pending", "Paid", "Failed", "Refunded"];

      if (status && !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status",
        });
      }

      if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid payment status",
        });
      }

      // Build update object
      const updateData = {};

      if (status !== undefined) updateData.status = status;
      if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;
      if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;
      if (trackingNumber !== undefined)
        updateData.trackingNumber = trackingNumber;
      if (notes !== undefined) updateData.notes = notes;
      if (estimatedDelivery !== undefined)
        updateData.estimatedDelivery = new Date(estimatedDelivery);

      // Auto-set delivery date when status becomes "Delivered"
      if (status === "Delivered" && !actualDelivery) {
        updateData.actualDelivery = new Date();
      } else if (actualDelivery !== undefined) {
        updateData.actualDelivery = new Date(actualDelivery);
      }

      // Handle order cancellation - restore stock
      if (status === "Cancelled" && existingOrder.status !== "Cancelled") {
        for (const item of existingOrder.items) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: item.quantity },
          });
        }
      }

      const updatedOrder = await Order.findOneAndUpdate(query, updateData, {
        new: true,
        runValidators: true,
      })
        .populate("userId", "firstName lastName email")
        .populate("items.productId", "name price category image");

      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        data: updatedOrder,
      });
    } catch (error) {
      console.error("Update order error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update order",
        error: error.message,
      });
    }
  });
}
