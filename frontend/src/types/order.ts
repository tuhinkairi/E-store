import type { ProductItem } from "./product";

export interface ShippingAddress {
  addressType: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderResponse{
  userId: string;      // Reference to User
  items: ProductItem[];
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
