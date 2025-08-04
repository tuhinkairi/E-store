import tokenGenerate from "../../middleware/JWTauth.js";
import { hashPassword } from "../../middleware/UserAuth.js";
import {User}  from "../../model/ExportModel.js";

export default function CreateUser(app) {
  // Create a new user
  app.post("/api/v1/user/register", hashPassword, async (req, res) => {
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
        styleRecommendations
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
        styleRecommendations: styleRecommendations
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

      const user = new User({...userData.email});
      user.createdAt = Date.now();
      
      const token = tokenGenerate(user);
      
      await user.save();
      
      res.cookie("elegance_session", token, { maxAge: 360000 });
      res.status(201).json({ 
        message: "User created successfully", 
        token: token 
      });
      
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
