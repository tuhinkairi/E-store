// utils/productUtils.ts

import type { ProductItem } from "../types/product";

export const filterProducts = (
  products: ProductItem[],
  searchTerm: string,
  selectedCategory: string,
  selectedCollection: string,
  priceRange: number[]
): ProductItem[] => {
  return products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesCollection = selectedCollection === 'All' || product.collection === selectedCollection;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesCollection && matchesPrice;
  });
};

export const sortProducts = (products: ProductItem[], sortBy: string): ProductItem[] => {
  const sorted = [...products];
  
  sorted.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.is_New ? 1 : 0) - (a.is_New ? 1 : 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return sorted;
};