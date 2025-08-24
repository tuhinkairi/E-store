
import type { SortOption } from "../types/product";


export const categories = ['All', 'Signature', 'Essential', 'Timeless', 'Luxury'];

export const collections = ['All', 'Heritage', 'Modern'];

export const sortOptions: SortOption[] = [
  { value: 'name', label: 'Name' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' }
];