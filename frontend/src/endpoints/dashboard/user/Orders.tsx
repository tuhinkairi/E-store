// components/dashboard/Orders.tsx
import React from 'react';
import { Eye, Download, RotateCcw } from 'lucide-react';
import type { OrdersProps, OrderStatus } from '../../../types/dashboard';
import type { OrderResponse } from '../../../types/order';

const Orders: React.FC<OrdersProps> = ({
  orders,
  orderFilter,
  setOrderFilter
}) => {
  // console.log(orders)
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

  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'all') return true;
    return order.status === orderFilter;
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderFilter(e.target.value as OrderStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-light text-sage-900">Your Orders</h2>
        {filteredOrders.length>0 &&
          <div className="flex items-center space-x-4">
            <select
              value={orderFilter}
              onChange={handleFilterChange}
              className="border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream"
            >
              <option value="all">All Orders</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        }
      </div>

      <div className="space-y-4">
        {filteredOrders.length ? filteredOrders.map((order) => (
          <div key={order.orderNumber} className="bg-cream border border-sage-200 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2 ">
                  <h3 className="font-medium text-sage-900">{order.orderNumber}</h3>
                </div>
                <p className="text-sage-600 text-sm mb-2">
                  Ordered on {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="text-sm text-sage-600">
                  {order.items.map((product, index) => (
                    <div key={index}> {product.name} {product.rating} {product.price}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <div className="text-right">
                  <p className="font-medium text-sage-900">${order.totalAmount}</p>
                  <p className="text-sm text-sage-600">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-sage-600 hover:text-sage-900 border border-sage-200 rounded-lg hover:bg-sage-50">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-sage-600 hover:text-sage-900 border border-sage-200 rounded-lg hover:bg-sage-50">
                    <Download className="h-4 w-4" />
                  </button>
                  {order.status === 'Delivered' && (
                    <button className="p-2 text-sage-600 hover:text-sage-900 border border-sage-200 rounded-lg hover:bg-sage-50">
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center p-6 bg-sage-50 rounded-lg">
            <p className="text-sage-600 text-2xl">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;