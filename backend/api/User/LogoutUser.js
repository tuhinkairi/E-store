export default function Logout(app) {
  app.post("/api/v1/user/logout", async (req, res) => {
    try {
      // todo take the token from the req not as a parameter
      const { token } = req.body;
      // let user;
      
      // If token is provided, verify and extract user data
      if (token && token!=="") {
        try {
          if (!process.env.JWT_KEY) {
            throw new Error("Missing JWT secret key");
          }

          // getting user so we can use to tract
          // const userdata = jwt.verify(token, process.env.JWT_KEY);
          // console.log("Decoded token data:", userdata);

          // user = await User.findOne({ email: userdata.email });
          // if (!user) {
          //   return res.status(404).json({ message: "User not found" });
          // }
          
          res.clearCookie("elegance_session");
          return res.json({ message: "Logout successfully" });
        } catch (tokenError) {
          console.error("Token verification error:", tokenError.message);
          res.clearCookie("elegance_session");
          return res.status(401).json({ message: "Invalid or expired token" });
        }
      }else{
        
        return res.status(401).json({ message: "no token provided" });
      }
    } catch (err) {
      console.error("Error in /api/v1/user/logout:", err.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
