import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { AccountSettingsProps } from '../../../types/dashboard';

const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  return (
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
                  defaultValue={user.name.split(' ')[0]}
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-900 mb-1">Last Name</label>
                <input 
                  type="text" 
                  defaultValue={user.name.split(' ')[1] || ''}
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
};

export default AccountSettings;