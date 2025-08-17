
export interface WishlistItem {
  productId: string;   // Reference to Product
  addedAt: Date;
  preferredSize?: string;
  preferredColor?: string;
}

export interface Wishlist {
  userId: string;      // Reference to User
  items: WishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}
