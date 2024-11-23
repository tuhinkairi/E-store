import tokenGenerate  from "../../middleware/JWTauth.js";
import {hashPassword} from "../../middleware/UserAuth.js";
import User from "../../model/User.js";

export default function CreateUser(app) {
  // Create a new user
  app.post("/api/v1/user/register",hashPassword, async (req, res) => {
    try {
      const { firstName, lastName, email, password, phoneNumber } = req.body;
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });
      user.createdAt = Date.now()
      const token = tokenGenerate(user)

      await user.save();
      res.status(201).json({ message: "User created successfully", token:token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating user" });
    }
  });
}
