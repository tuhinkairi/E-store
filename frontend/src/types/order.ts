
export interface OrderItem {
  productId: string;   // Reference to Product
  quantity: number;
  priceAtPurchase: number;              // Price locked at purchase
  size?: string;                        // Optional size
  color?: string;                       // Optional color
}

export interface ShippingAddress {
  addressType: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order{
  userId: string;      // Reference to User
  items: OrderItem[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  paymentMethod?: string;
  shippingAddress: ShippingAddress;
  orderNumber: string;                  // Unique order identifier
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
