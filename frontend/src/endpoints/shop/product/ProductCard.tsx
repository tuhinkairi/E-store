import React from 'react';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import type { ProductCardProps } from '../../../types/product';

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isListView, 
  favorites, 
  onToggleFavorite 
}) => {
  const getColorStyle = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'white': '#fff',
      'black': '#000',
      'navy': '#1e3a8a',
      'beige': '#f5f5dc',
      'camel': '#c19a6b',
      'gray': '#6b7280',
      'cream': '#fefdf9',
      'sage': '#8B9A7A',
      'light blue': '#bfdbfe',
      'pink': '#fce7f3',
      'charcoal': '#374151',
      'ivory': '#fffff0',
      'blush': '#fdf2f8'
    };
    
    return colorMap[color.toLowerCase()] || '#d1d5db';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-sage-200/30 overflow-hidden group hover:shadow-md transition-all duration-300 ${isListView ? 'flex' : ''}`}>
      <div className={`relative ${isListView ? 'w-48 flex-shrink-0' : 'aspect-[3/4]'} overflow-hidden`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-gold-500 text-white px-2 py-1 text-xs font-medium rounded">
            NEW
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
            SALE
          </span>
        )}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart 
            className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-sage-700'}`}
          />
        </button>
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-sage-800 text-cream px-4 py-2 text-sm font-medium rounded hover:bg-sage-700 transition-colors flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>
      
      <div className={`p-4 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-sage-600 bg-sage-50 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xs text-sage-600">{product.collection}</span>
        </div>
        
        <h3 className="font-medium text-sage-900 mb-1 group-hover:text-sage-700 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-sage-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
            <span className="text-sm font-medium text-sage-700">{product.rating}</span>
          </div>
          <span className="text-sm text-sage-600">({product.reviews} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-sage-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-sage-600 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-sage-200"
                style={{ backgroundColor: getColorStyle(color) }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-sage-600">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;