import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  CreditCard, 
  MapPin, 
  Settings, 
  ShoppingBag, 
  Eye, 
  Bell,
  Gift,
  RotateCcw,
  Edit,
  Plus,
  Trash2,
  Download,
  ChevronRight,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState('all');
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  // Sample data - in a real app this would come from your API
  const user = {
    name: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    joinDate: "March 2023",
    totalOrders: 24,
    totalSpent: 2840,
    loyaltyPoints: 1250,
    avatar: null
  };

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 485,
      items: 2,
      products: ["Heritage Cashmere Coat", "Classic Oxford Shirt"]
    },
    {
      id: "ORD-2024-002", 
      date: "2024-01-20",
      status: "shipped",
      total: 225,
      items: 1,
      products: ["Merino Wool Sweater"]
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-25", 
      status: "processing",
      total: 395,
      items: 1,
      products: ["Wool Trench Coat"]
    }
  ];

  const wishlistItems = [
    { id: 1, name: "Silk Blouse", price: 185, image: null, inStock: true },
    { id: 2, name: "Tailored Blazer", price: 345, image: null, inStock: false },
    { id: 3, name: "Classic Oxford Shirt", price: 165, image: null, inStock: true }
  ];

  const addresses = [
    {
      id: 1,
      type: "Home",
      isDefault: true,
      name: "Sarah Mitchell",
      street: "123 Heritage Lane",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States"
    },
    {
      id: 2,
      type: "Office",
      isDefault: false,
      name: "Sarah Mitchell",
      street: "456 Business Ave",
      city: "New York", 
      state: "NY",
      zip: "10002",
      country: "United States"
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2026",
      isDefault: true
    },
    {
      id: 2,
      type: "Mastercard", 
      last4: "8888",
      expiryMonth: "08",
      expiryYear: "2025",
      isDefault: false
    }
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw },
    { id: 'loyalty', label: 'Loyalty Program', icon: Gift },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  const getStatusColor = (status) => {
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

  const renderOverview = () => (
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
              <div key={order.id} className="flex items-center justify-between p-4 border border-sage-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Package className="h-5 w-5 text-sage-600" />
                  <div>
                    <p className="font-medium text-sage-900">{order.id}</p>
                    <p className="text-sm text-sage-600">{order.products[0]} {order.items > 1 && `+${order.items - 1} more`}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sage-900">${order.total}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-light text-sage-900">Your Orders</h2>
        <div className="flex items-center space-x-4">
          <select 
            value={orderFilter} 
            onChange={(e) => setOrderFilter(e.target.value)}
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
                <p className="text-sage-600 text-sm mb-2">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                <div className="text-sm text-sage-600">
                  {order.products.map((product, index) => (
                    <div key={index}>{product}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-sage-900">${order.total}</p>
                  <p className="text-sm text-sage-600">{order.items} item{order.items > 1 ? 's' : ''}</p>
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

  const renderWishlist = () => (
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

  const renderAddresses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-sage-900">Shipping Addresses</h2>
        <button className="bg-sage-900 text-cream px-4 py-2 rounded-lg hover:bg-sage-800 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-cream border border-sage-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-sage-900">{address.type}</h3>
                {address.isDefault && (
                  <span className="bg-gold-400 text-sage-900 px-2 py-1 rounded-full text-xs font-medium">
                    Default
                  </span>
                )}
              </div>
              <button className="text-sage-600 hover:text-sage-900">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sage-600 text-sm space-y-1">
              <p className="font-medium text-sage-900">{address.name}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-sage-900">Payment Methods</h2>
        <button className="bg-sage-900 text-cream px-4 py-2 rounded-lg hover:bg-sage-800 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-cream border border-sage-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-sage-900 rounded flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-cream" />
                </div>
                <div>
                  <p className="font-medium text-sage-900">
                    {method.type} ending in {method.last4}
                  </p>
                  <p className="text-sm text-sage-600">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
                {method.isDefault && (
                  <span className="bg-gold-400 text-sage-900 px-2 py-1 rounded-full text-xs font-medium">
                    Default
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button className="text-sage-600 hover:text-sage-900 p-2">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-sage-600 hover:text-sage-900 p-2">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-sage-900">Account Settings</h2>

      <div className="bg-cream border border-sage-200 rounded-lg">
        <div className="p-6 border-b border-sage-200">
          <button
            onClick={() => setShowAccountDetails(!showAccountDetails)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-medium text-sage-900">Account Details</h3>
            {showAccountDetails ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
        {showAccountDetails && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-900 mb-1">First Name</label>
                <input 
                  type="text" 
                  defaultValue="Sarah"
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-900 mb-1">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Mitchell"
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Email Address</label>
              <input 
                type="email" 
                defaultValue={user.email}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream"
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-sage-900 text-cream px-4 py-2 rounded-lg hover:bg-sage-800">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="bg-cream border border-sage-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-sage-900 mb-4">Email Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-3" />
              <span className="text-sage-900">Order updates</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-3" />
              <span className="text-sage-900">Promotional emails</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-sage-900">SMS notifications</span>
            </label>
          </div>
        </div>

        <div className="bg-cream border border-sage-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-sage-900 mb-4">Security</h3>
          <div className="space-y-3">
            <button className="text-sage-600 hover:text-sage-900 text-sm">
              Change Password
            </button>
            <button className="text-sage-600 hover:text-sage-900 text-sm block">
              Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'orders': return renderOrders();
      case 'wishlist': return renderWishlist();
      case 'addresses': return renderAddresses();
      case 'payment': return renderPayment();
      case 'settings': return renderSettings();
      default: return <div className="text-center py-12 text-sage-600">Coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <header className="bg-cream border-b border-sage-200 px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-sage-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sage-900 rounded-full flex items-center justify-center">
                <span className="text-cream font-medium">E</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-light text-sage-900">ELYSIAN</h1>
                <p className="text-sm text-sage-600">My Account</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-sage-600" />
            <div className="w-8 h-8 bg-sage-200 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-sage-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-cream border-r border-sage-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-lg font-medium text-sage-900">Menu</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-sage-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="mt-4 lg:mt-8">
            <div className="px-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-sage-200 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-sage-600" />
                </div>
                <div>
                  <p className="font-medium text-sage-900">{user.name}</p>
                  <p className="text-sm text-sage-600">Premium Member</p>
                </div>
              </div>
            </div>
            
            <ul className="space-y-1 px-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-sage-900 text-cream'
                          : 'text-sage-600 hover:bg-sage-100 hover:text-sage-900'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default UserDashboard;