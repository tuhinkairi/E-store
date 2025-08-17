import { useState, useMemo, useEffect } from 'react';
import { filterProducts, sortProducts } from '../../../utils/FilterProduct';
import type {  ProductItem, SortBy, ViewMode } from '../../../types/product';
import PageHeader from './PageHeader';
import SearchControls from './SearchControl';
import { categories, collections, sortOptions } from '../../../data/products';
import FilterSidebar from './FilterSideBar';
import ProductGrid from './ProductGrid';
import getProduct from '../../../axios/product/getProduct';
import { setLoading } from '../../../store/features/GlobalSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import LoadingScreen from '../../../components/fallback/LoadingScreen';


const ProductListingPage = () => {
  const [products, setProductList] = useState<ProductItem[]>([]) 
  const loading = useAppSelector(s=>s.loading.isLoading)
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set<number | string>());

  // product fetching 
  useEffect(()=>{
    dispatch(setLoading(true))
    getProduct().then((data)=>{
      if(data){
        setProductList(data)
      }
    }).finally(()=>dispatch(setLoading(false)))
  },[dispatch])

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(
      products,
      searchTerm,
      selectedCategory,
      selectedCollection,
      priceRange
    );

    return sortProducts(filtered, sortBy);
  }, [searchTerm, selectedCategory, selectedCollection, priceRange, sortBy, products]);

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

  if(loading){
    return <LoadingScreen fullScreen={false}/>
  }
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