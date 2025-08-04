import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  // Basic Information - Required
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true 
  },
  password: { type: String, required: true },
  
  // Optional Basic Information
  birthDate: { type: Date }, // Optional
  phone: { 
    type: String, // Changed to String to handle various formats
    sparse: true, // Allows multiple documents with null/undefined values
    unique: true 
  },
  
  // Preferences with defaults
  marketingConsent: { type: Boolean, default: false },
  genderPreference: { type: String, trim: true }, // Optional
  stylePreferences: { type: [String], default: [] },
  priceRange: { type: String, trim: true }, // Optional, changed from default:100
  
  // Address Information - Required for shipping
  addressType: { type: String, required: true, default: "home" },
  street: { type: String, required: true, trim: true },
  apartment: { type: String, trim: true }, // Optional
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  zipCode: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  
  // User Interests
  categories: { type: [String], default: [] },
  occasions: { type: [String], default: [] },
  
  // Notification Preferences - Fixed Boolean arrays to single Boolean
  orderUpdates: { type: Boolean, default: false },
  promotionalEmails: { type: Boolean, default: false },
  smsNotifications: { type: Boolean, default: false },
  styleRecommendations: { type: Boolean, default: false },
  
  // Additional fields
  isAdmin: { type: Boolean, default: false },
  cart: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true, min: 1 }
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 }, { sparse: true });

// Pre-save middleware to update the `updatedAt` field
UserSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default UserSchema;
