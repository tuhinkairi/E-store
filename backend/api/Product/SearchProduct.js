import { Product } from "../../model/ExportModel.js";

export default function SearchProduct(app) {
  // Search for products - public endpoint, no authentication required
  app.post("/api/v1/product/search", async (req, res) => {
    try {
      const { 
        name, 
        description, 
        category, 
        collections,
        colors,
        sizes,
        minPrice, 
        maxPrice,
        is_New,
        isFavorite,
        minRating,
        searchText, // For general text search across name and description
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.body;

      console.log("Search request body:", req.body);

      // Build dynamic search query
      const searchQuery = {};

      // Text-based searches with regex for partial matching
      if (name) {
        searchQuery.name = { $regex: name, $options: 'i' };
      }

      if (description) {
        searchQuery.description = { $regex: description, $options: 'i' };
      }

      if (category) {
        searchQuery.category = { $regex: category, $options: 'i' };
      }

      if (collections) {
        searchQuery.collections = { $regex: collections, $options: 'i' };
      }

      // General text search across name and description
      if (searchText) {
        searchQuery.$or = [
          { name: { $regex: searchText, $options: 'i' } },
          { description: { $regex: searchText, $options: 'i' } },
          { category: { $regex: searchText, $options: 'i' } },
          { collections: { $regex: searchText, $options: 'i' } }
        ];
      }

      // Array field searches
      if (colors && Array.isArray(colors) && colors.length > 0) {
        searchQuery.colors = { $in: colors };
      }

      if (sizes && Array.isArray(sizes) && sizes.length > 0) {
        searchQuery.sizes = { $in: sizes };
      }

      // Price range filter
      if (minPrice !== undefined || maxPrice !== undefined) {
        searchQuery.price = {};
        if (minPrice !== undefined) searchQuery.price.$gte = parseFloat(minPrice);
        if (maxPrice !== undefined) searchQuery.price.$lte = parseFloat(maxPrice);
      }

      // Boolean filters
      if (is_New !== undefined) {
        searchQuery.is_New = Boolean(is_New);
      }

      if (isFavorite !== undefined) {
        searchQuery.isFavorite = Boolean(isFavorite);
      }

      // Rating filter
      if (minRating !== undefined) {
        searchQuery.rating = { $gte: parseFloat(minRating) };
      }

      // Only search products that are in stock
      searchQuery.stock = { $gt: 0 };

      console.log("Constructed search query:", JSON.stringify(searchQuery, null, 2));

      // Pagination
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
      const skip = (pageNum - 1) * limitNum;

      // Sorting
      const sort = {};
      const validSortFields = ['createdAt', 'updatedAt', 'price', 'name', 'rating', 'reviews'];
      const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
      sort[sortField] = sortOrder === 'asc' ? 1 : -1;

      // Execute search query
      const [products, totalProducts] = await Promise.all([
        Product.find(searchQuery)
          .populate('image')
          .sort(sort)
          .skip(skip)
          .limit(limitNum)
          .lean(),
        Product.countDocuments(searchQuery)
      ]);

      console.log(`Found ${products.length} products out of ${totalProducts} total matches`);

      // Calculate pagination info
      const totalPages = Math.ceil(totalProducts / limitNum);
      const hasNextPage = pageNum < totalPages;
      const hasPrevPage = pageNum > 1;

      // Return results (empty array instead of 404 for better UX)
      res.status(200).json({
        message: products.length > 0 ? "Products found successfully" : "No products match your search criteria",
        products,
        searchCriteria: {
          name,
          description,
          category,
          collections,
          colors,
          sizes,
          minPrice,
          maxPrice,
          is_New,
          isFavorite,
          minRating,
          searchText
        },
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProducts,
          hasNextPage,
          hasPrevPage,
          limit: limitNum
        }
      });

    } catch (error) {
      console.error("Error searching products:", error);
      
      // Handle specific error types
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: "Invalid search parameters",
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }

      res.status(500).json({ 
        message: "Error searching products",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
}