// components/dashboard/Wishlist.tsx
import { Package, Trash2 } from 'lucide-react';
import type { WishlistResult } from '../../../types/wishlist';
import { useCallback } from 'react';
import removeItemWishlist from '../../../axios/user/removeItemWishlist';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateUserAuthField } from '../../../store/features/UserSlice';
import { setLoading } from '../../../store/features/GlobalSlice';
import LoadingScreen from '../../../components/fallback/LoadingScreen';

function Wishlist({ wishlistItems }: { wishlistItems: WishlistResult[] }) {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(s=>s.loading.isLoading)
  const HandelRemoveItem = useCallback((id: string) => {
    removeItemWishlist(id).then((data) => {
      if (data) {
        dispatch(setLoading(true))
        dispatch(updateUserAuthField({ field: "wishlist", value: data }))
      }
    }).finally(() => {
      dispatch(setLoading(false))
    })
  }, [dispatch])
  if (loading) {
    <LoadingScreen fullScreen/>
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-sage-900">Your Wishlist</h2>
        <p className="text-sage-600">{wishlistItems.length} items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.productId._id} className="bg-cream border border-sage-200 rounded-lg overflow-hidden">
            <div className="aspect-square bg-sage-50 flex items-center justify-center">
              <Package className="h-12 w-12 text-sage-600" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-sage-900 mb-1">{item.productId.name}</h3>
              <p className="text-sage-900 font-light mb-2">${item.productId.price}</p>
              <p className="text-sm text-sage-600 mb-4">
                {item.productId.stock ? 'In Stock' : 'Out of Stock'}
              </p>
              <div className="flex space-x-2">
                <button
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${item.productId.stock
                      ? 'bg-sage-900 text-cream hover:bg-sage-800'
                      : 'bg-sage-200 text-sage-600 cursor-not-allowed'
                    }`}
                  disabled={!item.productId.stock}
                >
                  Add to Cart
                </button>
                <button onClick={() => HandelRemoveItem(item.productId._id)} className="p-2 text-sage-600 hover:text-sage-900 border border-sage-200 rounded-lg hover:bg-sage-50">
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