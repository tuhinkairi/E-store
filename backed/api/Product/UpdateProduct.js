import Product from "../../model/Product.js";

export default function UpdateProduct(app) {
  // Update an existing product
  app.patch("/api/v1/product/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const product = await Product.findByIdAndUpdate(id, updates, { new: true });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating product" });
    }
  });
}
