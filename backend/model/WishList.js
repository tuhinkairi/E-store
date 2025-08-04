import mongoose from "mongoose";

const WishlistItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  addedAt: { type: Date, default: Date.now },
  preferredSize: { type: String, required: false },
  preferredColor: { type: String, required: false },
});

const WishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: { type: [WishlistItemSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save middleware to update the `updatedAt` field
WishlistSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Remove duplicates before saving
WishlistSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    const seen = new Set();
    this.items = this.items.filter(item => {
      const productId = item.productId.toString();
      if (seen.has(productId)) {
        return false;
      }
      seen.add(productId);
      return true;
    });
  }
  next();
});


export default WishlistSchema;
