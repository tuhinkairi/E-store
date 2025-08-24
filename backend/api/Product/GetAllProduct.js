import { Product } from "../../model/ExportModel.js";
import mongoose from "mongoose";

export default function GetAllProduct(app) {
  // Get all products - public endpoint, no authentication required
  app.get("/api/v1/product/all", async (req, res) => {
    try {
      const {
        id,
        search,
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
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
            message: "Invalid product ID format",
            error: "ID must be a valid MongoDB ObjectId"
          });
        }
        filter._id = new mongoose.Types.ObjectId(id);
      }

      // Handle search functionality - FIXED: Only apply if not searching by ID
      if (search && search.trim() && !id) {
        const searchTerm = search.trim();
        filter.$or = [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { brand: { $regex: searchTerm, $options: "i" } },
          { category: { $regex: searchTerm, $options: "i" } },
          { collections: { $regex: searchTerm, $options: "i" } },
          // Handle tags array properly
          { tags: { $elemMatch: { $regex: searchTerm, $options: "i" } } }
        ];
      }

      // FIXED: Only apply other filters if not searching by ID
      if (!id) {
        // Category filter - exact match or case-insensitive partial match
        if (category && category.trim()) {
          const categoryTerm = category.trim();
          // Try exact match first, then partial match
          filter.category = { $regex: `^${categoryTerm}$`, $options: "i" };
        }

        // Collections filter
        if (collections && collections.trim()) {
          const collectionsTerm = collections.trim();
          filter.collections = { $regex: collectionsTerm, $options: "i" };
        }

        // Colors filter - FIXED: handle both string and array fields
        if (colors && colors.trim()) {
          const colorArray = colors.split(",")
            .map(color => color.trim())
            .filter(Boolean)
            .map(color => new RegExp(color, "i")); // Case-insensitive matching
          
          if (colorArray.length > 0) {
            // Handle both array field and string field
            filter.$or = filter.$or ? [
              ...filter.$or,
              { colors: { $in: colorArray } },
              { color: { $in: colorArray } } // In case you have singular field
            ] : [
              { colors: { $in: colorArray } },
              { color: { $in: colorArray } }
            ];
          }
        }

        // Sizes filter - FIXED: similar to colors
        if (sizes && sizes.trim()) {
          const sizeArray = sizes.split(",")
            .map(size => size.trim())
            .filter(Boolean);
          
          if (sizeArray.length > 0) {
            // Handle both exact match and case-insensitive match
            const sizeRegexArray = sizeArray.map(size => new RegExp(`^${size}$`, "i"));
            filter.sizes = { $in: sizeRegexArray };
          }
        }

        // New products filter - FIXED: proper boolean handling
        if (is_New !== undefined && is_New !== "" && is_New !== null) {
          if (typeof is_New === 'string') {
            filter.is_New = is_New.toLowerCase() === 'true';
          } else {
            filter.is_New = Boolean(is_New);
          }
        }

        // Price range filter - FIXED: ensure proper number conversion
        if (minPrice !== undefined || maxPrice !== undefined) {
          filter.price = {};
          
          if (minPrice !== undefined && minPrice !== "" && !isNaN(Number(minPrice))) {
            filter.price.$gte = Number(minPrice);
          }
          
          if (maxPrice !== undefined && maxPrice !== "" && !isNaN(Number(maxPrice))) {
            filter.price.$lte = Number(maxPrice);
          }
          
          // Remove empty price filter
          if (Object.keys(filter.price).length === 0) {
            delete filter.price;
          }
        }
      }

      console.log("Applied filter:", JSON.stringify(filter, null, 2)); // Debug log

      // If searching by ID, return single product without pagination
      if (id) {
        const product = await Product.findOne(filter)
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

      // Calculate pagination - FIXED: ensure positive numbers
      const pageNum = Math.max(1, parseInt(page) || 1);
      const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10));
      const skip = (pageNum - 1) * limitNum;

      // Build sort object - FIXED: validate sort parameters
      const validSortFields = [
        "createdAt", "updatedAt", "price", "name", 
        "rating", "views", "salesCount"
      ];
      
      const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
      const sortDirection = sortOrder && sortOrder.toLowerCase() === "asc" ? 1 : -1;
      const sort = { [sortField]: sortDirection };

      console.log("Sort object:", sort); // Debug log
      console.log("Pagination - Page:", pageNum, "Limit:", limitNum, "Skip:", skip); // Debug log

      // Execute query with proper error handling
      const [products, totalProducts] = await Promise.all([
        Product.find(filter)
          .populate("image") // Add populate path if needed: .populate("image", "url alt")
          .sort(sort)
          .skip(skip)
          .limit(limitNum)
          .lean()
          .catch(err => {
            console.error("Error in products query:", err);
            throw err;
          }),
        Product.countDocuments(filter)
          .catch(err => {
            console.error("Error in count query:", err);
            throw err;
          })
      ]);

      console.log(`Found ${totalProducts} total products, returning ${products.length}`); // Debug log
      
      // Calculate pagination info
      const totalPages = Math.ceil(totalProducts / limitNum);
      const hasNextPage = pageNum < totalPages;
      const hasPrevPage = pageNum > 1;

      // Enhanced response
      res.status(200).json({
        message: products.length > 0
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
          startIndex: totalProducts > 0 ? skip + 1 : 0,
          endIndex: Math.min(skip + limitNum, totalProducts),
        },
        appliedFilters: {
          search: search?.trim() || null,
          category: category?.trim() || null,
          collections: collections?.trim() || null,
          minPrice: minPrice && !isNaN(Number(minPrice)) ? Number(minPrice) : null,
          maxPrice: maxPrice && !isNaN(Number(maxPrice)) ? Number(maxPrice) : null,
          colors: colors ? colors.split(",").map(c => c.trim()).filter(Boolean) : null,
          sizes: sizes ? sizes.split(",").map(s => s.trim()).filter(Boolean) : null,
          is_New: is_New !== undefined && is_New !== "" ? (is_New === "true" || is_New === true) : null,
          sortBy: sortField,
          sortOrder: sortDirection === 1 ? "asc" : "desc",
        },
        debug: process.env.NODE_ENV === "development" ? {
          filterUsed: filter,
          sortUsed: sort
        } : undefined,
        meta: {
          timestamp: new Date().toISOString(),
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

      if (error.name === 'ValidationError') {
        return res.status(400).json({
          message: "Validation error in query parameters",
          error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
      }

      res.status(500).json({
        message: "Internal server error while retrieving products",
        error: process.env.NODE_ENV === "development" ? {
          message: error.message,
          stack: error.stack,
          query: req.query
        } : undefined,
      });
    }
  });

  // Separate endpoint for getting a single product by ID
  app.get("/api/v1/product/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid product ID format",
          error: "ID must be a valid MongoDB ObjectId"
        });
      }

      const product = await Product.findById(id).lean();

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
          productId: id
        });
      }

      // Optional: Increment view count (run in background)
      Product.findByIdAndUpdate(id, { $inc: { views: 1 } }).exec().catch(console.error);

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