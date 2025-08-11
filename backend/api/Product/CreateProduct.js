import VerifyToken from "../../middleware/VerifyToken.js";
import { Product } from "../../model/ExportModel.js";


export default function CreateProduct(app) {
  // Create a new product - only admin can create
  app.post("/api/v1/product/create", VerifyToken, async (req, res) => {
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

      // Extract fields according to the schema
      const { 
        name, 
        description, 
        price, 
        originalPrice,
        category,
        collections, // Note: schema uses 'collections', not 'collection'
        image,
        rating,
        reviews,
        colors, // Schema uses 'colors' array, not 'color'
        sizes,  // Schema uses 'sizes' array, not 'size'
        stock,
        is_New,
        isFavorite
      } = req.body;

      // Validate required fields
      if (!name || !description || !category || !collections || !colors || !sizes) {
        return res.status(400).json({ 
          message: "Missing required fields: name, description, category, collections, colors, and sizes are required" 
        });
      }

      // Validate price
      if (price === undefined || price === null || price < 0) {
        return res.status(400).json({ 
          message: "Price is required and must be non-negative" 
        });
      }

      // Validate stock
      if (stock === undefined || stock === null || stock < 0) {
        return res.status(400).json({ 
          message: "Stock is required and must be non-negative" 
        });
      }

      // Validate arrays
      if (!Array.isArray(colors) || colors.length === 0) {
        return res.status(400).json({ 
          message: "Colors must be a non-empty array" 
        });
      }

      if (!Array.isArray(sizes) || sizes.length === 0) {
        return res.status(400).json({ 
          message: "Sizes must be a non-empty array" 
        });
      }

      // Create product object matching schema
      const productData = {
        name,
        description,
        price,
        category,
        collections,
        colors,
        sizes,
        stock,
        image
      };

      // Add optional fields if provided
      if (originalPrice !== undefined) productData.originalPrice = originalPrice;
      if (image !== undefined) productData.image = image;
      if (rating !== undefined) productData.rating = rating;
      if (reviews !== undefined) productData.reviews = reviews;
      if (is_New !== undefined) productData.is_New = is_New;
      if (isFavorite !== undefined) productData.isFavorite = isFavorite;

      const product = new Product(productData);
      await product.save();

      res.status(201).json({ 
        message: "Product created successfully", 
        product 
      });
    } catch (error) {
      console.error("Error creating product:", error);
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationErrors 
        });
      }

      res.status(500).json({ 
        message: "Error creating product",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
}