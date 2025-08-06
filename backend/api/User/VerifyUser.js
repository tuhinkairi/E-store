import { comparePassword } from "../../middleware/UserAuth.js";
import { User } from "../../model/ExportModel.js";
import tokenGenerate from "../../middleware/JWTauth.js";
import { VerifyToken } from "../../middleware/VerifyToken.js";

export default function VerifyUser(app) {
  app.post("/api/v1/user/login", VerifyToken ,async (req, res) => {
    console.log("/api/v1/user/login",req.body)
    try {
      const { email, password } = req.body;
      const authenticated = req.authenticated

      if (authenticated) {
        try {
          const user = req.user;
          const userDetails = req.userDetails;
          const newToken = tokenGenerate(user);    
          res.cookie("elegance_session", newToken, { 
            maxAge: 360000,
            httpOnly: true, // Security: Prevent XSS
            // secure: process.env.NODE_ENV === 'production' // HTTPS only in production
          });

          return res.status(200).json({
            message: "Authenticated successfully via token",
            token: newToken,
            user: userDetails
          });
        } catch (tokenError) {
          console.error("Token verification error:", tokenError.message);
          return res.status(401).json({ message: "Invalid or expired token" });
        }
      }

      // Token not provided, validate using email and password
      else if (!email || !password) {
        return res.status(400).json({ 
          message: "Email and password are required" 
        });
      }

      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate new token for successful login
      const newToken = tokenGenerate({...user.id, ...user.email, ...user.isAdmin});
      
      // Fix: Set cookie with generated token
      res.cookie("elegance_session", newToken, { 
        maxAge: 360000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });

      return res.status(200).json({
        message: "Authenticated successfully via email and password",
        token: newToken,
        user: user
      });

    } catch (err) {
      console.error("Error in /api/v1/user/login:", err.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
