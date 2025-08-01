import React from 'react';
import ProductCard from './ProductCard';
import type { ProductGridProps } from '../../../types/product';

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  viewMode,
  favorites,
  onToggleFavorite,
  totalProducts
}) => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sage-600">
          Showing {products.length} of {totalProducts} products
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sage-600 text-lg">No products found matching your criteria</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
          : 'space-y-6'
        }>
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isListView={viewMode === 'list'}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;