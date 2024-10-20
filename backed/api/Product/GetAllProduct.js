import Product from "../../model/Product.js";

export default function GetAllProduct(app) {
  // Get all products
  app.get("/api/v1/product/all", async (req, res) => {
    try {
      const products = await Product.find();

      if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }

      res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving products" });
    }
  });
}
