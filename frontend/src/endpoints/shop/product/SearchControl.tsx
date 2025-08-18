import React from 'react';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import type { SearchControlsProps, SortBy } from '../../../types/product';

const SearchControls: React.FC<SearchControlsProps> = ({
  searchTerm,
  sortBy,
  viewMode,
  sortOptions,
  onSearchChange,
  onSortChange,
  onViewModeChange,
  onToggleFilters
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-8">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-600 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-sage-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleFilters}
          className="lg:hidden flex items-center gap-2 px-4 py-3 border border-sage-200/30 rounded-lg hover:bg-sage-50 transition-colors"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
        
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
            className="appearance-none bg-white border border-sage-200/30 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-600 w-5 h-5 pointer-events-none" />
        </div>
        
        <div className="flex border border-sage-200/30 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-3 ${viewMode === 'grid' ? 'bg-sage-800 text-cream' : 'bg-white text-sage-600 hover:bg-sage-50'} transition-colors`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-3 ${viewMode === 'list' ? 'bg-sage-800 text-cream' : 'bg-white text-sage-600 hover:bg-sage-50'} transition-colors`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchControls;