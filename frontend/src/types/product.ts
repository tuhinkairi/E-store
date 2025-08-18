// interfaces/product.interfaces.ts

export interface ProductItem {
  _id: number | string;
  name: string;
  price: number;
  originalPrice: number | null;
  category: string;
  collection: string;
  image: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  is_New: boolean;
  isFavorite: boolean;
  description: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface ProductCardProps {
  product: ProductItem;
  isListView: boolean;
  favorites: Set<number | string>;
  onToggleFavorite: (productId: number | string) => void;
}

export interface FilterSidebarProps {
  categories: string[];
  collections: string[];
  selectedCategory: string;
  selectedCollection: string;
  priceRange: number[];
  onCategoryChange: (category: string) => void;
  onCollectionChange: (collection: string) => void;
  onPriceRangeChange: (range: number[]) => void;
  onClearFilters: () => void;
}

export interface SearchControlsProps {
  searchTerm: string;
  sortBy: SortBy;
  viewMode: ViewMode;
  showFilters: boolean;
  sortOptions: SortOption[];
  onSearchChange: (term: string) => void;
  onSortChange: (sortBy: SortBy) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onToggleFilters: () => void;
}

export interface ProductGridProps {
  products: ProductItem[];
  viewMode: ViewMode;
  favorites: Set<number | string>;
  onToggleFavorite: (productId: number | string) => void;
  totalProducts: number;
}

export interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export type ViewMode = 'grid' | 'list';
export type SortBy = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';