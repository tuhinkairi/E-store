// interfaces/dashboard.interfaces.ts
import type { WishlistResult } from "./wishlist";

export interface User {
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  avatar: string | null;
}

export interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: number;
  products: string[];
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string | null;
  inStock: boolean;
}

export interface Address {
  id: number;
  type: string;
  isDefault: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentMethod {
  id: number;
  type: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

export interface SidebarItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: TabType) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  user: User;
  sidebarItems: SidebarItem[];
}

export interface OverviewProps {
  user: User;
  orders: Order[];
  wishlistItems: WishlistResult[];
  setActiveTab: (tab: TabType) => void;
}

export interface OrdersProps {
  orders: Order[];
  orderFilter: string;
  setOrderFilter: (filter: string) => void;
}

export interface WishlistProps {
  wishlistItems: WishlistItem[];
}

export interface AddressesProps {
  addresses: Address[];
}

export interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
}

export interface AccountSettingsProps {
  user: User;
}

export type OrderStatus = 'delivered' | 'shipped' | 'processing' | 'cancelled' | 'all';
export type TabType = 'overview' | 'orders' | 'wishlist' | 'addresses' | 'payment' | 'returns' | 'loyalty' | 'settings';