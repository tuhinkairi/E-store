import { useState, useMemo, useEffect } from 'react';
import { filterProducts, sortProducts } from '../../../utils/FilterProduct';
import type { SortBy, ViewMode } from '../../../types/product';
import PageHeader from './PageHeader';
import SearchControls from './SearchControl';
import { categories, collections, sortOptions } from '../../../data/products';
import FilterSidebar from './FilterSideBar';
import ProductGrid from './ProductGrid';
import getProduct from '../../../axios/product/getProduct';
import { setLoading } from '../../../store/features/GlobalSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import LoadingScreen from '../../../components/fallback/LoadingScreen';
import { useValidateToken } from '../../../hooks/useValidateToken';
import { updateUserAuthField } from '../../../store/features/UserSlice';
import addWishlist from '../../../axios/product/addWishlist';
import removeFromWishlist from '../../../axios/product/removeFromWishlist';
import { setProducts } from '../../../store/features/ProductSlice';


const ProductListingPage = () => {
  const { loading, userData } = useValidateToken()
  const wishlist = userData?.wishlist ?? []
  const products = useAppSelector(state => state.products.products);
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
  useEffect(() => {
    
    dispatch(setLoading(true));
    getProduct()
      .then((data) => {
        if (data) {
          dispatch(setProducts(data));
          const fevList = new Set<number | string>();
          if (userData?.wishlist) {
            userData.wishlist.forEach((e) => {
              fevList.add(e.productId._id);
            });
          }
          setFavorites(fevList);
        }
      })
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch, userData]);

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

  const toggleFavorite = async (productId: number | string) => {
    const newFavorites = new Set(favorites);
    const isCurrentlyFavorited = newFavorites.has(productId);

    // Optimistic update - update UI immediately
    if (isCurrentlyFavorited) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);

    try {
      if (isCurrentlyFavorited) {
        // Remove from wishlist
        const data = await removeFromWishlist({ productId });
        if (data) {
          const updatedWishlist = wishlist;
          updatedWishlist.filter(item=> item._id != productId)
          dispatch(updateUserAuthField({
            field: 'wishlist',
            value: updatedWishlist
          }));
        }
      } else {
        // Add to wishlist
        const data = await addWishlist({ productId: productId });
        if (data) {
          const updatedWishlist = wishlist;
          updatedWishlist.push(data)
          dispatch(updateUserAuthField({
            field: 'wishlist',
            value: updatedWishlist

          }));
        }
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
      // Revert the optimistic update
      if (isCurrentlyFavorited) {
        newFavorites.add(productId);
      } else {
        newFavorites.delete(productId);
      }
      setFavorites(newFavorites);
      // Show error message to user
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedCollection('All');
    setPriceRange([0, 500]);
    setSearchTerm('');
  };

  if (loading) {
    return <LoadingScreen fullScreen={false} />
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