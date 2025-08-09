import VerifyToken from "../../middleware/VerifyToken.js";
import { Order } from "../../model/ExportModel.js";
import { isValidObjectId } from "./Order.js";

export default function GetOrders(app) {
  app.get("/api/v1/order/get-orders", VerifyToken, async (req, res) => {
    try {
      const { page = 1, limit = 10, status, paymentStatus } = req.query;
      const skip = (page - 1) * limit;

      let query = {};

      // If not admin, only show user's own orders
      if (!req.user.isAdmin) {
        query.userId = req.user.id;
      }

      // Add status filters if provided
      if (status) {
        query.status = status;
      }
      if (paymentStatus) {
        query.paymentStatus = paymentStatus;
      }

      const orders = await Order.find(query)
        .populate("userId", "firstName lastName email")
        .populate("items.productId", "name price category image colors sizes")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalOrders = await Order.countDocuments(query);

      res.status(200).json({
        success: true,
        data: orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalOrders / limit),
          totalOrders,
          hasNext: skip + orders.length < totalOrders,
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      console.error("Get orders error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve orders",
        error: error.message,
      });
    }
  });
}
export function GetOrderById(app){
    app.get("/api/v1/order/get-orders/:id",VerifyToken, async (req, res) =>{

        try {
            const { id } = req.params;
            
            if (!isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid order ID"
                });
    }
    
    let query = { _id: id };
    
    // If not admin, only allow access to own orders
    if (!req.user.isAdmin) {
        query.userId = req.user.id;
    }
    
    const order = await Order.findOne(query)
    .populate('userId', 'firstName lastName email phone')
    .populate('items.productId', 'name price category image colors sizes description');
    
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }
    
    res.status(200).json({
        success: true,
        data: order
    });
    
} catch (error) {
    console.error("Get order by ID error:", error);
    res.status(500).json({
        success: false,
        message: "Failed to retrieve order",
        error: error.message
    });
}
} )
};