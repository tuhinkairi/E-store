import mongoose from "mongoose";
import { Product } from "../../model/ExportModel.js";
import VerifyToken from "../../middleware/VerifyToken.js";

export default function DeleteProduct(app) {
  // Delete a product by ID - only admin can delete
  app.delete("/api/v1/product/delete/:id", VerifyToken, async (req, res) => {
    try {
      // Check if user is authenticated and is admin
      if (!req.authenticated) {
        return res.status(401).json({ 
          message: "Authentication required" 
        });
      }

      if (!req.user.isAdmin) {
        return res.status(403).json({ 
          message: "Access denied. Admin privileges required." 
        });
      }

      const { id } = req.params;

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ 
          message: "Invalid product ID format" 
        });
      }

      // Find and delete the product
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({ 
          message: "Product not found" 
        });
      }

      res.status(200).json({ 
        message: "Product deleted successfully",
        deletedProduct: {
          id: product._id,
          name: product.name
        }
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      
      // Handle cast errors (invalid ObjectId)
      if (error.name === 'CastError') {
        return res.status(400).json({ 
          message: "Invalid product ID format" 
        });
      }

      res.status(500).json({ 
        message: "Error deleting product",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
}