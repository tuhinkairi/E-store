// components/dashboard/Overview.tsx
import React from 'react';
import { ShoppingBag, CreditCard, Heart, Package, ChevronRight } from 'lucide-react';
import type { OverviewProps } from '../../../types/dashboard';
import type { OrderResponse } from '../../../types/order';

const Overview: React.FC<OverviewProps> = ({
  user,
  orders,
  wishlistItems,
  setActiveTab
}) => {
  const getStatusColor = (status: OrderResponse['status']): string => {
    switch (status) {
      // "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned";
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-pink-100 text-pink-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-gold-400 text-sage-900';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Returned': return 'bg-orange-100 text-orange-800';
      default: return 'bg-sage-200 text-sage-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-sage-900 to-sage-700 rounded-lg p-6 text-cream">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light mb-2">Welcome back, {user.name}</h2>
            <p className="text-cream-80">Member since {user.joinDate}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light">{user.loyaltyPoints}</div>
            <div className="text-cream-70 text-sm">Loyalty Points</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-cream border border-sage-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm">Total Orders</p>
              <p className="text-2xl font-light text-sage-900">{user.totalOrders}</p>
            </div>
            <ShoppingBag className="h-8 w-8 text-sage-600" />
          </div>
        </div>

        <div className="bg-cream border border-sage-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm">Total Spent</p>
              <p className="text-2xl font-light text-sage-900">${user.totalSpent}</p>
            </div>
            <CreditCard className="h-8 w-8 text-sage-600" />
          </div>
        </div>

        <div className="bg-cream border border-sage-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm">Wishlist Items</p>
              <p className="text-2xl font-light text-sage-900">{wishlistItems.length}</p>
            </div>
            <Heart className="h-8 w-8 text-sage-600" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-cream border border-sage-200 rounded-lg">
        <div className="p-6 border-b border-sage-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-sage-900">Recent Orders</h3>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-sage-600 hover:text-sage-900 text-sm flex items-center"
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.orderNumber} className="flex items-center justify-between p-4 border border-sage-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Package className="h-5 w-5 text-sage-600" />
                  <div>
                    <p className="font-medium text-sage-900">{order.orderNumber}</p>
                    <p className="text-sm text-sage-600">
                      {order.items[0].name} {order.items.length > 1 && `+${order.items.length - 1} more`}
                    </p>
                  </div>
                  <p className="text-sage-600 text-sm mb-2 ml-5">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right flex items-center space-x-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <p className="font-medium text-sage-900">${order.totalAmount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;