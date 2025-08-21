import { useEffect, useState } from 'react';
import {
  User,
  Package,
  Heart,
  CreditCard,
  MapPin,
  Settings,
  RotateCcw,
  Gift,
} from 'lucide-react';
import type { PaymentMethod, SidebarItem, TabType, User as UserProps } from '../../../types/dashboard';
import Orders from './Orders';
import Wishlist from './Wishlist';
import Addresses from './Addresses';
import PaymentMethods from './PaymentMethods';
import AccountSettings from './AccountSetting';
import PlaceholderContent from './PlaceHolder';
import DashboardHeader from './DashboardHeader';
import Sidebar from './SideBar';
import Overview from './Overview';
import { useNavigate } from 'react-router-dom';
import { useValidateToken } from '../../../hooks/useValidateToken';
import LoadingScreen from '../../../components/fallback/LoadingScreen';
import type { WishlistResult } from '../../../types/wishlist';
import type { OrderResponse } from '../../../types/order';

// Component imports

const UserDashboard = () => {
  const navigate = useNavigate()
  const {isValid, loading, userData} = useValidateToken()
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState('all');
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistResult[]>([]);
  useEffect(() => {
    if (!isValid) {
      console.log(userData)
      navigate("/login")
    }
    setOrders(userData?.orders ?? []);
    setWishlistItems(userData?.wishlist ?? []);
  },[isValid, navigate,userData])

  
  // Sample data - in a real app this would come from your API
  const user: UserProps = {
    name: userData?.firstName+" "+userData?.lastName,
    email: userData?.email ?? "N/A",
    joinDate: userData?.createdAt ? userData?.createdAt.split("T")[0] : "N/A",
    totalOrders: userData?.orders?.length??0,
    totalSpent: 2840,
    loyaltyPoints: 1250,
    avatar: null
  };

  const paymentMethods: PaymentMethod[] = [
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

  const sidebarItems: SidebarItem[] = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw },
    { id: 'loyalty', label: 'Loyalty Program', icon: Gift },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  if (loading) {
    return <LoadingScreen/>
  }
  
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Overview
            user={user}
            orders={orders}
            wishlistItems={wishlistItems}
            setActiveTab={setActiveTab}
          />
        );
      case 'orders':
        return (
          <Orders
            orders={orders}
            orderFilter={orderFilter}
            setOrderFilter={setOrderFilter}
          />
        );
      case 'wishlist':
        return <Wishlist wishlistItems={wishlistItems} />;
      case 'addresses':
        return <Addresses  address={userData}/>;
      case 'payment':
        return <PaymentMethods paymentMethods={paymentMethods} />;
      case 'settings':
        return <AccountSettings/>;
      case 'returns':
        return <PlaceholderContent message="Returns & Exchanges coming soon..." />;
        case 'loyalty':
          return <PlaceholderContent message="Loyalty Program details coming soon..." />;
          default:
            return <PlaceholderContent />;
          }
        };
        
  return (
    <div className="min-h-screen bg-sage-50">
      <DashboardHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
          sidebarItems={sidebarItems}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;