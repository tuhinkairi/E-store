import { useState, useMemo } from 'react';
import { filterProducts, sortProducts } from '../../../utils/FilterProduct';
import type { SortBy, ViewMode } from '../../../types/product';
import PageHeader from './PageHeader';
import SearchControls from './SearchControl';
import { categories, collections, products, sortOptions } from '../../../data/products';
import FilterSidebar from './FilterSideBar';
import ProductGrid from './ProductGrid';


const ProductListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set<number | string>());

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(
      products,
      searchTerm,
      selectedCategory,
      selectedCollection,
      priceRange
    );

    return sortProducts(filtered, sortBy);
  }, [searchTerm, selectedCategory, selectedCollection, priceRange, sortBy]);

  const toggleFavorite = (productId: number | string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedCollection('All');
    setPriceRange([0, 500]);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Our Collections"
          subtitle="Discover meticulously crafted garments that embody timeless elegance and contemporary sophistication"
        />

        <SearchControls
          searchTerm={searchTerm}
          sortBy={sortBy}
          viewMode={viewMode}
          showFilters={showFilters}
          sortOptions={sortOptions}
          onSearchChange={setSearchTerm}
          onSortChange={setSortBy}
          onViewModeChange={setViewMode}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:w-80 flex-shrink-0`}>
            <FilterSidebar
              categories={categories}
              collections={collections}
              selectedCategory={selectedCategory}
              selectedCollection={selectedCollection}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onCollectionChange={setSelectedCollection}
              onPriceRangeChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </div>

          <ProductGrid
            products={filteredAndSortedProducts}
            viewMode={viewMode}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            totalProducts={products.length}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;