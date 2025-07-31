import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronDown, Heart, Star, ShoppingBag } from 'lucide-react';
import type { ProductItem } from '../../../types/product';

// Mock product data based on the original design
const products:ProductItem[] = [
  {
    id: 1,
    name: "Heritage Cashmere Coat",
    price: 485,
    originalPrice: null,
    category: "Signature",
    collection: "Heritage",
    image: "/api/placeholder/300/400",
    rating: 4.8,
    reviews: 24,
    colors: ["Black", "Camel", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isFavorite: false,
    description: "Hand-tailored cashmere coat with timeless silhouette"
  },
  {
    id: 2,
    name: "Classic Oxford Shirt",
    price: 165,
    originalPrice: null,
    category: "Essential",
    collection: "Modern",
    image: "/api/placeholder/300/400",
    rating: 4.6,
    reviews: 18,
    colors: ["White", "Light Blue", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isFavorite: false,
    description: "Premium cotton oxford shirt with refined details"
  },
  {
    id: 3,
    name: "Wool Trench Coat",
    price: 395,
    originalPrice: null,
    category: "Timeless",
    collection: "Heritage",
    image: "/api/placeholder/300/400",
    rating: 4.9,
    reviews: 31,
    colors: ["Beige", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isFavorite: false,
    description: "Classic wool trench with contemporary cut"
  },
  {
    id: 4,
    name: "Merino Wool Sweater",
    price: 225,
    originalPrice: 275,
    category: "Luxury",
    collection: "Modern",
    image: "/api/placeholder/300/400",
    rating: 4.7,
    reviews: 42,
    colors: ["Cream", "Gray", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isFavorite: false,
    description: "Soft merino wool sweater with elegant drape"
  },
  {
    id: 5,
    name: "Silk Blouse",
    price: 185,
    originalPrice: null,
    category: "Essential",
    collection: "Modern",
    image: "/api/placeholder/300/400",
    rating: 4.5,
    reviews: 16,
    colors: ["Ivory", "Blush", "Sage"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    isFavorite: false,
    description: "Luxurious silk blouse with fluid silhouette"
  },
  {
    id: 6,
    name: "Tailored Blazer",
    price: 345,
    originalPrice: null,
    category: "Signature",
    collection: "Heritage",
    image: "/api/placeholder/300/400",
    rating: 4.8,
    reviews: 29,
    colors: ["Black", "Charcoal", "Cream"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isFavorite: false,
    description: "Impeccably tailored blazer with modern proportions"
  }
];

const ProductListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const categories = ['All', 'Signature', 'Essential', 'Timeless', 'Luxury'];
  const collections = ['All', 'Heritage', 'Modern'];
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' }
  ];

  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesCollection = selectedCollection === 'All' || product.collection === selectedCollection;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesCollection && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedCollection, priceRange, sortBy]);

  const toggleFavorite = (productId:number|string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const ProductCard = ({ product, isListView}:{product:ProductItem, isListView:boolean}) => (
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
          onClick={() => toggleFavorite(product.id)}
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
                style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fff' : 
                         color.toLowerCase() === 'black' ? '#000' :
                         color.toLowerCase() === 'navy' ? '#1e3a8a' :
                         color.toLowerCase() === 'beige' ? '#f5f5dc' :
                         color.toLowerCase() === 'camel' ? '#c19a6b' :
                         color.toLowerCase() === 'gray' ? '#6b7280' :
                         color.toLowerCase() === 'cream' ? '#fefdf9' :
                         color.toLowerCase() === 'sage' ? '#8B9A7A' :
                         '#d1d5db' }}
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

  const FilterSidebar = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-sage-200/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-sage-900">Filters</h3>
        <button
          onClick={() => {
            setSelectedCategory('All');
            setSelectedCollection('All');
            setPriceRange([0, 500]);
            setSearchTerm('');
          }}
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
                  onChange={(e) => setSelectedCategory(e.target.value)}
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
                  onChange={(e) => setSelectedCollection(e.target.value)}
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
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
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

  return (
    <div className="min-h-screen bg-cream">
      {/* Custom styles */}
     

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-sage-900 mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-sage-600 max-w-2xl mx-auto">
            Discover meticulously crafted garments that embody timeless elegance and contemporary sophistication
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-sage-200/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border border-sage-200/30 rounded-lg hover:bg-sage-50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-sage-800 text-cream' : 'bg-white text-sage-600 hover:bg-sage-50'} transition-colors`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-sage-800 text-cream' : 'bg-white text-sage-600 hover:bg-sage-50'} transition-colors`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:w-80 flex-shrink-0`}>
            <FilterSidebar />
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sage-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sage-600 text-lg">No products found matching your criteria</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-6'
              }>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    isListView={viewMode === 'list'} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;