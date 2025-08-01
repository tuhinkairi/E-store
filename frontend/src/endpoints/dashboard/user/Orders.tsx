// components/dashboard/Orders.tsx
import React from 'react';
import { Eye, Download, RotateCcw } from 'lucide-react';
import type { Order, OrdersProps, OrderStatus } from '../../../types/dashboard';

const Orders: React.FC<OrdersProps> = ({
  orders,
  orderFilter,
  setOrderFilter
}) => {
  const getStatusColor = (status: Order['status']): string => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-gold-400 text-sage-900';
      case 'cancelled': return 'bg-red-100 text-red-800';
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
        <div className="flex items-center space-x-4">
          <select 
            value={orderFilter} 
            onChange={handleFilterChange}
            className="border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream"
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-cream border border-sage-200 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sage-900">{order.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sage-600 text-sm mb-2">
                  Ordered on {new Date(order.date).toLocaleDateString()}
                </p>
                <div className="text-sm text-sage-600">
                  {order.products.map((product, index) => (
                    <div key={index}>{product}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-sage-900">${order.total}</p>
                  <p className="text-sm text-sage-600">
                    {order.items} item{order.items > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-sage-600 hover:text-sage-900 border border-sage-200 rounded-lg hover:bg-sage-50">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-sage-600 hover:text-sage-900 border border-sage-200 rounded-lg hover:bg-sage-50">
                    <Download className="h-4 w-4" />
                  </button>
                  {order.status === 'delivered' && (
                    <button className="p-2 text-sage-600 hover:text-sage-900 border border-sage-200 rounded-lg hover:bg-sage-50">
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;