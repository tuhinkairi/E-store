// components/dashboard/Sidebar.tsx
import React from 'react';
import { User, X } from 'lucide-react';
import type { SidebarProps } from '../../../types/dashboard';

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  user,
  sidebarItems
}) => {
  return (
    <>
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

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;