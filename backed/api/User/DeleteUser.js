import User from "../../model/User.js";
 
export default function DeleteUser(app) {
  // API endpoint to delete a user
  app.delete("/api/v1/user/delete/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: `User ${userId} deleted successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting user" });
    }
  });
}
