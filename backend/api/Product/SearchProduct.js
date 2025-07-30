import Product from "../../model/Product.js";

export default function SearchProduct(app) {
  // Search for a product by name or category
  app.post("/api/v1/product/search", async (req, res) => {
    try {
      // Extract query parameters from the request
      // const { name, description ,price, category, group, size, color } = req.body;
      const data = req.body
      console.log(req.body)
      
      // Use the query object to find matching products in the database
      let products
      if (data) {
        
        products = await Product.find(data);
      }

      // If no products are found, return a 404 response with a message
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }

      // If products are found, return a 200 response with a success message and the products
      res
        .status(200)
        .json({ message: "Products retrieved successfully", products });
    } catch (error) {
      // Log any errors that occur during the search process
      console.error(error);

      // Return a 500 response with an error message
      res.status(500).json({ message: "Error searching products" });
    }
  });
}
