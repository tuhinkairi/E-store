import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, required: false, min: 0, default: null },
  category: { type: String, required: true },
  collections: { type: String, required: true },
  image: {
    type: [String],
    required: false,
    default: null,
  },
  // Changed from ObjectId reference
  rating: { type: Number, required: false, min: 0, max: 5, default: 0 },
  reviews: { type: Number, required: false, min: 0, default: 0 },
  colors: { type: [String], required: true }, // Renamed from 'color'
  sizes: { type: [String], required: true }, // Renamed from 'size'
  stock: { type: Number, required: true, min: 0 },
  is_New: { type: Boolean, required: true, default: false }, // Fixed 'require' typo
  isFavorite: { type: Boolean, required: true, default: false }, // Fixed 'require' typo
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save middleware to update the `updatedAt` field
ProductSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default ProductSchema;
