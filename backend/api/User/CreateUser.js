import tokenGenerate from "../../middleware/JWTauth.js";
import { hashPassword } from "../../middleware/UserAuth.js";
import {User}  from "../../model/ExportModel.js";

export default function CreateUser(app) {
  // Create a new user
  app.post("/api/v1/user/register", hashPassword, async (req, res) => {
    console.log("/api/v1/user/register",req.body, req.headers["authorization"])

    try {
      const {
        firstName,
        lastName,
        email,
        password,
        birthDate,
        phone,
        marketingConsent,
        genderPreference,
        stylePreferences,
        priceRange,
        addressType,
        street,
        apartment,
        city,
        state,
        zipCode,
        country,
        categories,
        occasions,
        orderUpdates,
        promotionalEmails,
        smsNotifications,
        styleRecommendations,
        isAdmin
      } = req.body;
      // Create user object with only non-empty values
      const userData = {
        firstName,
        lastName,
        email,
        password,
        marketingConsent,
        stylePreferences,
        addressType,
        street,
        city,
        state,
        zipCode,
        country,
        categories: categories,
        occasions: occasions,
        orderUpdates: orderUpdates,
        promotionalEmails: promotionalEmails,
        smsNotifications: smsNotifications,
        styleRecommendations: styleRecommendations,
        isAdmin
      };

      // Add optional fields only if they have values
      if (birthDate && birthDate !== "") {
        userData.birthDate = new Date(birthDate);
      }
      
      if (phone && phone !== "") {
        userData.phone = phone;
      }
      
      if (genderPreference && genderPreference !== "") {
        userData.genderPreference = genderPreference;
      }
      
      if (priceRange && priceRange !== "") {
        userData.priceRange = priceRange;
      }
      
      if (apartment && apartment !== "") {
        userData.apartment = apartment;
      }

      const user = new User(userData);
      user.createdAt = Date.now();
      console.log("creation userdata ->",user)
      console.log("creation ->",{id:user._id, email:user.email, isAdmin: user.isAdmin})
      const token = tokenGenerate({id:user._id, email:user.email, isAdmin: user.isAdmin});
      
      await user.save();
      
      res.cookie("elegance_session", token, { maxAge: 360000 });
      res.status(201).json({ 
        message: "User created successfully", 
        token: token 
      });
      console.log("user created successfully")
    } catch (error) {
      console.error(error);
      
      // Handle specific validation errors
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return res.status(400).json({ 
          message: `${field} already exists` 
        });
      }
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: "Validation error", 
          details: error.message 
        });
      }
      
      res.status(500).json({ message: "Error creating user", error:error.message });
    }
  });
}
