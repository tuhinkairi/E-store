import jwt from "jsonwebtoken";
import { User } from "../model/ExportModel.js";
const VerifyToken = async (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers["authorization"];
    if (req.body.email && req.body.password ) {
      console.log(`[${new Date().toISOString()}] [INFO]` ," -- email and password present while verification")
      req.authenticated = false;
      next();
      return
    }

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1].split("\"")[1]?? authHeader.split(" ")[1];
    }
    console.log(Date.now() ," -- Token Recived --", token);
    if (!token && req.cookies && req.cookies.elegance_session) {
      token = req.cookies.elegance_session;
    }

    if (!token) {
      return res.status(401).json({
        message: "Access token required. Please login.",
      });
    }

    if (!process.env.JWT_KEY) {
      console.error("JWT_KEY environment variable not set");
      return res.status(500).json({
        message: "Server configuration error",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log("decoded data", decoded);
    const user =
    (await User.findById(decoded.id).select("-password")) ||
    User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    
    req.user = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    
    req.userDetails = user;
    req.authenticated = true;
    console.log("token verified!")
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        message: "Invalid token. Please login again.",
      });
    }

    return res.status(500).json({
      message: "Authentication failed",
    });
  }
};
export default VerifyToken