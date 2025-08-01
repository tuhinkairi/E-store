// components/dashboard/DashboardHeader.tsx
import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import type { DashboardHeaderProps } from '../../../types/dashboard';

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  sidebarOpen,
  setSidebarOpen
}) => {
  return (
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
  );
};

export default DashboardHeader;