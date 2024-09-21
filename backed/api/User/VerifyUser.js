import User from "../../model/User.js";
import { comparePassword } from "../../middleware/UserAuth.js";

export default function VerifyUser(app) {
  app.post("/api/v1/user/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // passwords match, authenticate the user
      res.json({ message: "Authenticated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
