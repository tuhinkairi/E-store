import VerifyToken from "../../middleware/VerifyToken.js";
import mongoose from "mongoose";
import { Product } from "../../model/ExportModel.js";

export default function UpdateProduct(app) {
  // Update an existing product - only admin can update
  app.patch("/api/v1/product/update/:id", VerifyToken, async (req, res) => {
    try {
      // Check if user is authenticated and is admin
      if (!req.authenticated) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      if (!req.user.isAdmin) {
        return res.status(403).json({
          message: "Access denied. Admin privileges required.",
        });
      }

      const { id } = req.params;
      const updates = req.body;

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid product ID format",
        });
      }

      // Remove fields that shouldn't be updated directly
      const restrictedFields = ["_id", "__v", "createdAt"];
      restrictedFields.forEach((field) => delete updates[field]);

      // Validate update data
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          message: "No valid fields provided for update",
        });
      }

      // Validate specific fields if they exist in updates
      if (
        updates.price !== undefined &&
        (updates.price < 0 || isNaN(updates.price))
      ) {
        return res.status(400).json({
          message: "Price must be a non-negative number",
        });
      }

      if (
        updates.originalPrice !== undefined &&
        (updates.originalPrice < 0 || isNaN(updates.originalPrice))
      ) {
        return res.status(400).json({
          message: "Original price must be a non-negative number",
        });
      }

      if (
        updates.stock !== undefined &&
        (updates.stock < 0 ||
          isNaN(updates.stock) ||
          !Number.isInteger(Number(updates.stock)))
      ) {
        return res.status(400).json({
          message: "Stock must be a non-negative integer",
        });
      }

      if (
        updates.rating !== undefined &&
        (updates.rating < 0 || updates.rating > 5 || isNaN(updates.rating))
      ) {
        return res.status(400).json({
          message: "Rating must be between 0 and 5",
        });
      }

      if (
        updates.reviews !== undefined &&
        (updates.reviews < 0 ||
          isNaN(updates.reviews) ||
          !Number.isInteger(Number(updates.reviews)))
      ) {
        return res.status(400).json({
          message: "Reviews count must be a non-negative integer",
        });
      }

      // Validate arrays
      if (updates.colors !== undefined) {
        if (!Array.isArray(updates.colors) || updates.colors.length === 0) {
          return res.status(400).json({
            message: "Colors must be a non-empty array",
          });
        }
      }

      if (updates.sizes !== undefined) {
        if (!Array.isArray(updates.sizes) || updates.sizes.length === 0) {
          return res.status(400).json({
            message: "Sizes must be a non-empty array",
          });
        }
      }

      // Validate required string fields if they exist
      const requiredStringFields = [
        "name",
        "description",
        "category",
        "collections",
      ];
      for (const field of requiredStringFields) {
        if (
          updates[field] !== undefined &&
          (!updates[field] ||
            typeof updates[field] !== "string" ||
            updates[field].trim().length === 0)
        ) {
          return res.status(400).json({
            message: `${
              field.charAt(0).toUpperCase() + field.slice(1)
            } must be a non-empty string`,
          });
        }
      }
      // image update
      if (updates.image !== undefined) {
        if (!Array.isArray(updates.image)) {
          return res.status(400).json({ message: "Image must be an array" });
        }
        if (updates.image.length === 0) {
          updates.image = null; // or []
        } else {
          for (const img of updates.image) {
            if (typeof img !== "string" || !img.trim()) {
              return res
                .status(400)
                .json({ message: "Each image must be a non-empty string URL" });
            }
          }
        }
      }

      // Set updatedAt timestamp
      updates.updatedAt = new Date();

      // Update the product
      const product = await Product.findByIdAndUpdate(id, updates, {
        new: true, // Return updated document
        runValidators: true, // Run mongoose validation
      });

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        message: "Product updated successfully",
        product,
        updatedFields: Object.keys(updates).filter(
          (key) => key !== "updatedAt"
        ),
      });
    } catch (error) {
      console.error("Error updating product:", error);

      // Handle validation errors
      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (err) => err.message
        );
        return res.status(400).json({
          message: "Validation error",
          errors: validationErrors,
        });
      }

      // Handle cast errors (invalid ObjectId)
      if (error.name === "CastError") {
        return res.status(400).json({
          message: "Invalid data format provided",
        });
      }

      res.status(500).json({
        message: "Error updating product",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  });
}
