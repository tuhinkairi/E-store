import { Product } from "../../model/ExportModel.js";

export default function GetAllProduct(app) {
  // Get all products - public endpoint, no authentication required
  app.get("/api/v1/product/all", async (req, res) => {
    try {
      const {
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

      if (category) filter.category = { $regex: category, $options: "i" };
      if (collections)
        filter.collections = { $regex: collections, $options: "i" };
      if (colors) filter.colors = { $in: colors.split(",") };
      if (sizes) filter.sizes = { $in: sizes.split(",") };
      if (is_New !== undefined) filter.is_New = is_New === "true";

      // Price range filter
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseFloat(minPrice);
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
      }

      // Calculate pagination
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, Math.min(100, parseInt(limit))); // Max 100 items per page
      const skip = (pageNum - 1) * limitNum;

      // Build sort object
      const sort = {};
      const validSortFields = [
        "createdAt",
        "updatedAt",
        "price",
        "name",
        "rating",
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

      // Return empty array instead of 404 for better UX
      res.status(200).json({
        message:
          products.length > 0
            ? "Products retrieved successfully"
            : "No products found",
        products,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProducts,
          hasNextPage,
          hasPrevPage,
          limit: limitNum,
        },
        filters: {
          category,
          collections,
          minPrice,
          maxPrice,
          colors,
          sizes,
          is_New,
        },
      });
    } catch (error) {
      console.error("Error retrieving products:", error);

      res.status(500).json({
        message: "Error retrieving products",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  });
}
