import Product from "../../model/Product.js";

export default function DeleteProduct(app) {
  // Delete a product by ID
  app.delete("/api/v1/product/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting product" });
    }
  });
}
