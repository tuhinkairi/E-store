import React from 'react';
import type { FilterSidebarProps } from '../../../types/product';

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  collections,
  selectedCategory,
  selectedCollection,
  priceRange,
  onCategoryChange,
  onCollectionChange,
  onPriceRangeChange,
  onClearFilters
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-sage-200/30 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-sage-900">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-sage-600 hover:text-sage-800"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-sage-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="mr-2 text-gold-500 focus:ring-gold-400"
                />
                <span className="text-sm text-sage-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sage-900 mb-3">Collection</h4>
          <div className="space-y-2">
            {collections.map(collection => (
              <label key={collection} className="flex items-center">
                <input
                  type="radio"
                  name="collection"
                  value={collection}
                  checked={selectedCollection === collection}
                  onChange={(e) => onCollectionChange(e.target.value)}
                  className="mr-2 text-gold-500 focus:ring-gold-400"
                />
                <span className="text-sm text-sage-700">{collection}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-sage-900 mb-3">Price Range</h4>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([0, parseInt(e.target.value)])}
              className="w-full accent-gold-500"
            />
            <div className="flex justify-between text-sm text-sage-600">
              <span>$0</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;