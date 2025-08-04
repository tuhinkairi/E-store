import { User } from "../../model/ExportModel.js";

 
export default function DeleteUser(app) {
  // API endpoint to delete a user
  app.delete("/api/v1/user/delete/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      console.log("thsi sis id",userId)
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.clearCookie("elegance_session");
      res.status(200).json({ message: `User ${userId} deleted successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting user", error: err.message });
    }
  });
}
