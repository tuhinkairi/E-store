import Product from "../../model/Product.js";

export default function SearchProduct(app) {
  // Search for a product by name or category
  app.get("/api/v1/product/search", async (req, res) => {
    try {
      const { name, category } = req.query;
      const query = {};

      if (name) {
        query.name = { $regex: name, $options: "i" }; // Case-insensitive search
      }
      if (category) {
        query.category = { $regex: category, $options: "i" }; // Case-insensitive search
      }

      const products = await Product.find(query);

      if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }

      res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error searching products" });
    }
  });
}
