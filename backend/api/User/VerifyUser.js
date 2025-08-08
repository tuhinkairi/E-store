// VerifyUser.js
import { comparePassword } from "../../middleware/UserAuth.js";
import { User } from "../../model/ExportModel.js";
import tokenGenerate from "../../middleware/JWTauth.js";
import { VerifyToken } from "../../middleware/VerifyToken.js";

export default function VerifyUser(app) {
  app.post("/api/v1/user/login", VerifyToken, async (req, res) => {
    const startTime = Date.now();
    const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      const { email, password } = req.body;
      const authenticated = req.authenticated;

      console.log(`[${new Date().toISOString()}] [INFO] [${requestId}] POST /api/v1/user/login - Login attempt`, {
        email: email ? `${email.substring(0, 3)}***${email.substring(email.lastIndexOf('@'))}` : 'not provided',
        hasPassword: !!password,
        isAuthenticated: authenticated,
        userAgent: req.headers['user-agent'],
        ip: req.ip || req.connection.remoteAddress
      });

      // Handle already authenticated user
      if (authenticated) {
        try {
          const user = req.user;
          const userDetails = req.userDetails;
          const newToken = tokenGenerate(user);    
          
          res.cookie("elegance_session", newToken, { 
            maxAge: 360000, // Consider increasing this (currently 6 minutes)
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });

          const responseTime = Date.now() - startTime;
          console.log(`[${new Date().toISOString()}] [INFO] [${requestId}] Token-based authentication successful`, {
            userId: user.id,
            email: userDetails?.email ? `${userDetails.email.substring(0, 3)}***${userDetails.email.substring(userDetails.email.lastIndexOf('@'))}` : 'unknown',
            responseTime: `${responseTime}ms`
          });

          return res.status(200).json({
            message: "Authenticated successfully via token",
            token: newToken,
            user: userDetails,
            requestId
          });

        } catch (tokenError) {
          console.error(`[${new Date().toISOString()}] [ERROR] [${requestId}] Token verification error`, {
            error: tokenError.message,
            stack: tokenError.stack
          });
          return res.status(401).json({ 
            message: "Invalid or expired token",
            requestId 
          });
        }
      }

      // Validate email and password for new login
      if (!email || !password) {
        console.log(`[${new Date().toISOString()}] [WARN] [${requestId}] Missing credentials`, {
          hasEmail: !!email,
          hasPassword: !!password
        });
        return res.status(400).json({ 
          message: "Email and password are required",
          requestId 
        });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log(`[${new Date().toISOString()}] [WARN] [${requestId}] Invalid email format`, {
          email: `${email.substring(0, 3)}***`
        });
        return res.status(400).json({ 
          message: "Invalid email format",
          requestId 
        });
      }

      const user = await User.findOne({ email: email });
      if (!user) {
        console.log(`[${new Date().toISOString()}] [WARN] [${requestId}] User not found`, {
          email: `${email.substring(0, 3)}***${email.substring(email.lastIndexOf('@'))}`
        });
        return res.status(404).json({ 
          message: "Invalid email or password", // Don't reveal if user exists
          requestId 
        });
      }

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        console.log(`[${new Date().toISOString()}] [WARN] [${requestId}] Invalid password attempt`, {
          userId: user._id,
          email: `${email.substring(0, 3)}***${email.substring(email.lastIndexOf('@'))}`
        });
        return res.status(401).json({ 
          message: "Invalid email or password",
          requestId 
        });
      }

      // Generate new token for successful login
      const tokenPayload = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      };
      const newToken = tokenGenerate(tokenPayload);
      
      res.cookie("elegance_session", newToken, { 
        maxAge: 3600000, // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Prepare user data (exclude sensitive information)
      const safeUserData = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
        // Add other safe fields as needed
      };

      const responseTime = Date.now() - startTime;
      console.log(`[${new Date().toISOString()}] [INFO] [${requestId}] Login successful`, {
        userId: user._id,
        email: `${email.substring(0, 3)}***${email.substring(email.lastIndexOf('@'))}`,
        isAdmin: user.isAdmin,
        responseTime: `${responseTime}ms`
      });

      return res.status(200).json({
        message: "Authenticated successfully",
        token: newToken,
        user: safeUserData,
        requestId
      });

    } catch (err) {
      const responseTime = Date.now() - startTime;
      console.error(`[${new Date().toISOString()}] [ERROR] [${requestId}] Login endpoint error`, {
        error: err.message,
        stack: err.stack,
        email: req.body?.email ? `${req.body.email.substring(0, 3)}***` : 'not provided',
        responseTime: `${responseTime}ms`
      });
      
      return res.status(500).json({ 
        message: "Internal Server Error",
        requestId,
        ...(process.env.NODE_ENV !== 'production' && { error: err.message })
      });
    }
  });
}

