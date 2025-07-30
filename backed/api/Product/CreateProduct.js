import Product from "../../model/Product.js";

export default function CreateProduct(app) {
  // Create a new product
  app.post("/api/v1/product/create", async (req, res) => {
    try {
      const { name, description, price, category,group, size, color, stock } = req.body;
      const product = new Product({
        name,
        description,
        price,
        category,
        group,
        size,
        color,
        stock,
      });
      product.createdAt = Date.now();
      await product.save();
      res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating product" });
    }
  });
}
