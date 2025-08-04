import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtPurchase: { type: Number, required: true, min: 0 }, // Store price at time of purchase
  size: { type: String, required: false }, // Selected size
  color: { type: String, required: false }, // Selected color
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [OrderItemSchema], required: true },
  totalAmount: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    required: true, 
    default: 'Pending',
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned']
  },
  paymentStatus: {
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Paid', 'Failed', 'Refunded']
  },
  paymentMethod: { type: String, required: false },
  shippingAddress: {
    addressType: { type: String, required: true },
    street: { type: String, required: true },
    apartment: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  orderNumber: { type: String, required: true, unique: true }, // Unique order identifier
  estimatedDelivery: { type: Date, required: false },
  actualDelivery: { type: Date, required: false },
  trackingNumber: { type: String, required: false },
  notes: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Pre-save middleware to update the `updatedAt` field
OrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate unique order number before saving
OrderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    this.orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

 

export default OrderSchema;
