import { useCallback, useEffect, useState } from 'react';
import { Heart, Star, Truck, Shield, RotateCcw, Minus, Plus, ShoppingCart } from 'lucide-react';
import { redirect, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import getProductById from '../../../axios/product/getProductById';
import { selectProduct } from '../../../store/features/ProductSlice';
import LoadingScreen from '../../../components/fallback/LoadingScreen';

interface ProductTemp {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  isOnSale?: boolean;
  isNew?: boolean;
  colors: { name: string; hex: string; }[];
  sizes: string[];
  images: string[];
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  inStock: boolean;
  stockCount: number;
}

const ProductDetail = () => {
  const id = useParams().id;
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true) // Start with loading true
  const product = useAppSelector(s => s.products.selectedProduct)
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Get wishlist data safely 
  const wishlist = useAppSelector(s => s.user?.wishlist) || [];
  const wishlisted = product ? wishlist.find(w => w.productId._id === product._id) : null;

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      // Check if product exists and has the required data
      if (product && product.price && product._id === id) {
        //console.log("Product already loaded", product._id, id);
        setLoading(false);
        return;
      }

      //console.log("Fetching product for ID:", id);
      const productResult = await getProductById(id);
      if (productResult && productResult.price) {
        dispatch(selectProduct(productResult));
      }
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, id, product]);

  // Initialize component state when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(0);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : "");
      setSelectedImage(0);
      setQuantity(1);
      setIsFavorite(wishlisted ? true : false);
    }
  }, [product, wishlisted]);

  // Fetch product data on mount or ID change
  useEffect(() => {
    fetchProduct();
  }, [id, fetchProduct]); // Only depend on ID, not on product

  const productTemp: ProductTemp = {
    id: 1,
    name: "Premium Cotton Polo Shirt",
    brand: "ELYSIAN",
    price: 229.99,
    originalPrice: 279.99,
    rating: 4,
    reviews: 128,
    isOnSale: true,
    colors: [
      { name: "Sage Green", hex: "#8B9A7A" },
      { name: "Forest Green", hex: "#4A5A3A" },
      { name: "Deep Forest", hex: "#2A3A1A" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["polo-1", "polo-2", "polo-3", "polo-4"],
    description: "Crafted from the finest 100% premium cotton, this polo shirt embodies timeless elegance and contemporary sophistication. The classic design features a refined collar, three-button placket, and tailored fit that flatters every silhouette.",
    features: [
      "100% Premium Cotton Construction",
      "Breathable and moisture-wicking fabric",
      "Classic three-button placket",
      "Ribbed collar and cuffs",
      "Side vents for comfortable fit",
      "Machine washable",
      "Pre-shrunk fabric"
    ],
    specifications: {
      "Material": "100% Premium Cotton",
      "Fit": "Classic Tailored",
      "Care": "Machine Wash Cold",
      "Origin": "Made in Portugal",
      "Weight": "200gsm",
      "Season": "All Season"
    },
    inStock: true,
    stockCount: 24
  };

  const relatedProducts = [
    { id: 2, name: "Premium Cotton T-Shirt", price: 89.99, image: "tshirt-1" },
    { id: 3, name: "Linen Blend Shirt", price: 189.99, image: "shirt-1" },
    { id: 4, name: "Merino Wool Sweater", price: 299.99, image: "sweater-1" },
    { id: 5, name: "Classic Chinos", price: 159.99, image: "pants-1" }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  const handleQuantityChange = (change: number) => {
    const maxStock = parseInt(product?.stock != undefined ? product?.stock : "1");
    setQuantity(prev => Math.max(1, Math.min(maxStock, prev + change)));
  };

  // Show loading screen while fetching or if product is null
  if (loading || !product) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F6F0' }}>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-[#6B7A5A]">
            <span>Home</span> <span className="mx-2">/</span>
            <span>Collections</span> <span className="mx-2">/</span>
            <span>Polo Shirts</span> <span className="mx-2">/</span>
            <span className="text-[#2A3A1A]">{product.name || "Premium Cotton Polo Shirt"}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden border border-[#E5E7E1] relative">
              {product.originalPrice && product.price < product.originalPrice && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 text-sm font-medium rounded">
                  SALE -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-[#F6F7F4] rounded-lg flex items-center justify-center">
                  <span className="text-8xl">👔</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg border-2 overflow-hidden transition-all ${selectedImage === index ? 'border-[#8B9A7A]' : 'border-[#E5E7E1] hover:border-[#8B9A7A]'
                    }`}
                >
                  <div className="w-full h-full bg-[#F6F7F4] flex items-center justify-center">
                    <span className="text-2xl">👔</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-light text-[#2A3A1A] mb-2">{product.name || productTemp.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating > 0 ? product.rating : productTemp.rating)}
                </div>
                <span className="text-[#2A3A1A] font-medium">{product.rating > 0 ? product.rating : productTemp.rating}</span>
              </div>
              <span className="text-[#8B9A7A]">({product.reviews === 0 ? productTemp.reviews : product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-light text-[#2A3A1A]">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-[#8B9A7A] line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="bg-red-100 text-red-800 px-2 py-1 text-sm rounded">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[#6B7A5A] leading-relaxed">{product.description || productTemp.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-[#2A3A1A] font-medium mb-3">Color</h3>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === index
                          ? 'border-[#2A3A1A] ring-2 ring-[#8B9A7A] ring-opacity-30'
                          : 'border-[#E5E7E1] hover:border-[#8B9A7A]'
                        }`}
                      style={{ backgroundColor: typeof color === 'string' ? color : color || color }}
                      title={typeof color === 'string' ? color : color || 'Color'}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-[#2A3A1A] font-medium mb-3">Size</h3>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border rounded-lg text-sm font-medium transition-all ${selectedSize === size
                          ? 'border-[#2A3A1A] bg-[#2A3A1A] text-white'
                          : 'border-[#E5E7E1] text-[#6B7A5A] hover:border-[#8B9A7A]'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button className="text-[#8B9A7A] text-sm mt-2 underline hover:text-[#6B7A5A]">
                  Size Guide
                </button>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-[#2A3A1A] font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E5E7E1] rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-[#F6F7F4] transition-colors"
                  >
                    <Minus size={16} className="text-[#6B7A5A]" />
                  </button>
                  <span className="px-4 py-3 text-[#2A3A1A] font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-[#F6F7F4] transition-colors"
                  >
                    <Plus size={16} className="text-[#6B7A5A]" />
                  </button>
                </div>
                <span className="text-[#8B9A7A] text-sm">
                  {product.stock || 0} in stock
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button className="flex-1 bg-[#2A3A1A] text-white py-4 px-6 rounded-lg hover:bg-[#4A5A3A] transition-colors font-medium flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-4 border border-[#E5E7E1] rounded-lg hover:border-[#8B9A7A] transition-colors"
                >
                  <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-[#6B7A5A]"} />
                </button>
              </div>
              <button
                onClick={() => redirect(`/${id}/place-order`)}
                className="w-full bg-[#C4A556] text-white py-4 px-6 rounded-lg hover:bg-[#B49546] transition-colors font-medium"
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-[#E5E7E1] pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Truck size={24} className="text-[#8B9A7A]" />
                  <span className="text-sm text-[#6B7A5A]">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RotateCcw size={24} className="text-[#8B9A7A]" />
                  <span className="text-sm text-[#6B7A5A]">Easy Returns</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Shield size={24} className="text-[#8B9A7A]" />
                  <span className="text-sm text-[#6B7A5A]">2 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg border border-[#E5E7E1] mb-12">
          <div className="border-b border-[#E5E7E1]">
            <nav className="flex">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab
                      ? 'border-[#8B9A7A] text-[#2A3A1A]'
                      : 'border-transparent text-[#6B7A5A] hover:text-[#2A3A1A]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-[#2A3A1A] mb-4">Product Features</h3>
                  <ul className="space-y-2">
                    {productTemp.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-[#6B7A5A]">
                        <div className="w-2 h-2 bg-[#8B9A7A] rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-medium text-[#2A3A1A] mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(productTemp.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-[#E5E7E1]">
                      <span className="text-[#6B7A5A] font-medium">{key}:</span>
                      <span className="text-[#2A3A1A]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-[#2A3A1A]">Customer Reviews</h3>
                  <button className="bg-[#8B9A7A] text-white px-4 py-2 rounded-lg hover:bg-[#6B7A5A] transition-colors">
                    Write a Review
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-light text-[#2A3A1A]">{product.rating > 0 ? product.rating : productTemp.rating}</div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {renderStars(product.rating > 0 ? product.rating : productTemp.rating)}
                    </div>
                    <div className="text-sm text-[#8B9A7A]">{product.reviews === 0 ? productTemp.reviews : product.reviews} reviews</div>
                  </div>

                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm text-[#6B7A5A] w-2">{stars}</span>
                        <Star size={12} className="text-[#8B9A7A]" />
                        <div className="flex-1 bg-[#E5E7E1] rounded-full h-2">
                          <div
                            className="bg-[#8B9A7A] h-2 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#8B9A7A] w-8">{Math.floor(Math.random() * 50)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-light text-[#2A3A1A] mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-[#E5E7E1] overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-[#F6F7F4] flex items-center justify-center">
                  <span className="text-4xl">👔</span>
                </div>
                <div className="p-4">
                  <h3 className="text-[#2A3A1A] font-medium mb-2">{item.name}</h3>
                  <p className="text-[#8B9A7A] font-medium">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;