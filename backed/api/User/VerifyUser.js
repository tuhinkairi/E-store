import User from "../../model/User.js";
import { comparePassword } from "../../middleware/UserAuth.js";
import jwt from "jsonwebtoken";

export default function VerifyUser(app) {
  app.post("/api/v1/user/login", async (req, res) => {
    try {
      const { email, password, token } = req.body;

      if (!email && !token) {
        return res.status(400).json({ message: "Email or token is required" });
      }

      let user;

      // If token is provided, verify and extract user data
      if (token) {
        try {
          if (!process.env.JWT_KEY) {
            throw new Error("Missing JWT secret key");
          }

          const userdata = jwt.verify(token, process.env.JWT_KEY);
          console.log("Decoded token data:", userdata);

          user = await User.findOne({ email: userdata.email });
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          const isValid = await comparePassword(password, user.password);
          if (!isValid) {
            return res.status(401).json({ message: "Invalid password" });
          }

          return res.json({ message: "Authenticated successfully via token" });
        } catch (tokenError) {
          console.error("Token verification error:", tokenError.message);
          return res.status(401).json({ message: "Invalid or expired token" });
        }
      }

      // Token not provided, validate using email and password
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Successfully authenticated
      res.json({ message: "Authenticated successfully via email and password" });
    } catch (err) {
      console.error("Error in /api/v1/user/login:", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
