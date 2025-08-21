import { Product } from "../../model/ExportModel.js";
import mongoose from "mongoose";

export default function GetAllProduct(app) {
  // Get all products - public endpoint, no authentication required
  app.get("/api/v1/product/all", async (req, res) => {
    try {
      const {
        id,
        search, // Added search parameter
        page = 1,
        limit = 10,
        category,
        collections,
        minPrice,
        maxPrice,
        colors,
        sizes,
        is_New,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      // Build filter object
      const filter = {};

      // Handle ID filter - if ID is provided, return specific product
      if (id) {
        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
            message: "Invalid product ID format",
            error: "ID must be a valid MongoDB ObjectId"
          });
        }
        filter._id = new mongoose.Types.ObjectId(id);
      }

      // Handle search functionality
      if (search && search.trim()) {
        const searchRegex = { $regex: search.trim(), $options: "i" };
        filter.$or = [
          { name: searchRegex },
          { description: searchRegex },
          { brand: searchRegex },
          { category: searchRegex },
          { collections: searchRegex },
          { tags: { $in: [searchRegex] } }, // If you have tags array
        ];
      }

      // Category filter
      if (category && category.trim()) {
        filter.category = { $regex: category.trim(), $options: "i" };
      }

      // Collections filter
      if (collections && collections.trim()) {
        filter.collections = { $regex: collections.trim(), $options: "i" };
      }

      // Colors filter - handle array of colors
      if (colors && colors.trim()) {
        const colorArray = colors.split(",").map(color => color.trim()).filter(Boolean);
        if (colorArray.length > 0) {
          filter.colors = { $in: colorArray };
        }
      }

      // Sizes filter - handle array of sizes
      if (sizes && sizes.trim()) {
        const sizeArray = sizes.split(",").map(size => size.trim()).filter(Boolean);
        if (sizeArray.length > 0) {
          filter.sizes = { $in: sizeArray };
        }
      }

      // New products filter
      if (is_New !== undefined && is_New !== "") {
        filter.is_New = is_New === "true" || is_New === true;
      }

      // Price range filter
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice && !isNaN(parseFloat(minPrice))) {
          filter.price.$gte = parseFloat(minPrice);
        }
        if (maxPrice && !isNaN(parseFloat(maxPrice))) {
          filter.price.$lte = parseFloat(maxPrice);
        }
      }

      // If searching by ID, return single product without pagination
      if (id) {
        const product = await Product.findById(id)
          .populate("image")
          .lean();

        if (!product) {
          return res.status(404).json({
            message: "Product not found",
            productId: id
          });
        }

        return res.status(200).json({
          message: "Product retrieved successfully",
          product,
          isSearchById: true
        });
      }

      // Calculate pagination
      const pageNum = Math.max(1, parseInt(page) || 1);
      const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10)); // Max 100 items per page
      const skip = (pageNum - 1) * limitNum;

      // Build sort object
      const sort = {};
      const validSortFields = [
        "createdAt",
        "updatedAt",
        "price",
        "name",
        "rating",
        "views", // If you track product views
        "salesCount", // If you track sales
      ];
      const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
      sort[sortField] = sortOrder === "asc" ? 1 : -1;

      // Execute query with pagination and populate image reference
      const [products, totalProducts] = await Promise.all([
        Product.find(filter)
          .populate("image") // Populate image reference if needed
          .sort(sort)
          .skip(skip)
          .limit(limitNum)
          .lean(), // Use lean() for better performance
        Product.countDocuments(filter),
      ]);

      // Calculate pagination info
      const totalPages = Math.ceil(totalProducts / limitNum);
      const hasNextPage = pageNum < totalPages;
      const hasPrevPage = pageNum > 1;

      // Enhanced response with more metadata
      res.status(200).json({
        message:
          products.length > 0
            ? `${products.length} product${products.length !== 1 ? 's' : ''} retrieved successfully`
            : "No products found matching your criteria",
        data: {
          products,
          totalCount: products.length,
        },
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProducts,
          hasNextPage,
          hasPrevPage,
          limit: limitNum,
          startIndex: skip + 1,
          endIndex: Math.min(skip + limitNum, totalProducts),
        },
        appliedFilters: {
          search: search || null,
          category: category || null,
          collections: collections || null,
          minPrice: minPrice ? parseFloat(minPrice) : null,
          maxPrice: maxPrice ? parseFloat(maxPrice) : null,
          colors: colors ? colors.split(",").map(c => c.trim()).filter(Boolean) : null,
          sizes: sizes ? sizes.split(",").map(s => s.trim()).filter(Boolean) : null,
          is_New: is_New !== undefined ? (is_New === "true") : null,
          sortBy,
          sortOrder,
        },
        meta: {
          timestamp: new Date().toISOString(),
          processingTime: Date.now(), // You can calculate actual processing time
        }
      });
    } catch (error) {
      console.error("Error retrieving products:", error);

      // Handle specific MongoDB errors
      if (error.name === 'CastError') {
        return res.status(400).json({
          message: "Invalid data format in query parameters",
          error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
      }

      res.status(500).json({
        message: "Internal server error while retrieving products",
        error: process.env.NODE_ENV === "development" ? {
          message: error.message,
          stack: error.stack
        } : undefined,
      });
    }
  });

  // Optional: Add a separate endpoint for getting a single product by ID
  app.get("/api/v1/product/:id", async (req, res) => {
    try {
      const { id } = req.params;

      // Validate MongoDB ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid product ID format",
          error: "ID must be a valid MongoDB ObjectId"
        });
      }

      const product = await Product.findById(id)
        .populate("image")
        .populate("brand", "name")
        .lean();

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
          productId: id
        });
      }

      // Optional: Increment view count
      await Product.findByIdAndUpdate(id, { $inc: { views: 1 } });

      res.status(200).json({
        message: "Product retrieved successfully",
        data: {
          product
        },
        meta: {
          timestamp: new Date().toISOString(),
        }
      });
    } catch (error) {
      console.error("Error retrieving product:", error);
      
      res.status(500).json({
        message: "Internal server error while retrieving product",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  });
}