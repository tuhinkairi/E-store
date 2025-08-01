// components/dashboard/Wishlist.tsx
import React from 'react';
import { Package, Trash2 } from 'lucide-react';
import type { WishlistProps } from '../../../types/dashboard';

const Wishlist: React.FC<WishlistProps> = ({ wishlistItems }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-sage-900">Your Wishlist</h2>
        <p className="text-sage-600">{wishlistItems.length} items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-cream border border-sage-200 rounded-lg overflow-hidden">
            <div className="aspect-square bg-sage-50 flex items-center justify-center">
              <Package className="h-12 w-12 text-sage-600" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-sage-900 mb-1">{item.name}</h3>
              <p className="text-sage-900 font-light mb-2">${item.price}</p>
              <p className="text-sm text-sage-600 mb-4">
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
              <div className="flex space-x-2">
                <button 
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                    item.inStock 
                      ? 'bg-sage-900 text-cream hover:bg-sage-800' 
                      : 'bg-sage-200 text-sage-600 cursor-not-allowed'
                  }`}
                  disabled={!item.inStock}
                >
                  Add to Cart
                </button>
                <button className="p-2 text-sage-600 hover:text-sage-900 border border-sage-200 rounded-lg hover:bg-sage-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;