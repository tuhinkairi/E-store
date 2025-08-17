
export interface WhislistItem {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string[];
  colors: string[];
  sizes: string[];
  stock: number;
}

export interface WishlistResult {
  productId: WhislistItem;
  preferredSize: string;
  preferredColor: string;
  _id: string;
  addedAt: string; // ISO date string
}