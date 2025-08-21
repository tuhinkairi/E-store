import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { logout, updateUserAuthField } from '../../../store/features/UserSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import type { UserProps } from '../../../types/user';
import { useNavigate } from 'react-router-dom';


const AccountSettings: React.FC = () => {
  const navigate = useNavigate()   
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user); // Adjust based on your store structure
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  // Local state for form inputs to handle controlled components
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  });

  // add price range dynamic
  const Budget = (): string => {
    const userRange: number = user?.priceRange ? parseInt(user.priceRange.toString().split("-")[1]) : 50;
    if (typeof user?.priceRange !== 'string') {
      return "budget"; // Default to budget if priceRange is not a string
    }
    if (userRange <= 50) {
      return "0-50";
    }
    else if (userRange <= 150) {
      return "50-150";
    }
    else if (userRange <= 300) {
      return "150-300";
    }
    else {
      return "+300";
    }
  }
  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }
  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle saving changes to Redux
  const handleSaveChanges = () => {
    if (user) {
      dispatch(updateUserAuthField({ field: 'firstName', value: formData.firstName }));
      dispatch(updateUserAuthField({ field: 'lastName', value: formData.lastName }));
      dispatch(updateUserAuthField({ field: 'email', value: formData.email }));

      // Optionally show success message or trigger API call here
      alert('Changes saved successfully!');
    }
  };

  // Handle checkbox changes for preferences
  const handlePreferenceChange = (field: keyof UserProps, checked: boolean) => {
    if (user) {
      dispatch(updateUserAuthField({ field, value: checked }));
    }
  };

  // Return early if no user data
  if (!user) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-light text-sage-900">Account Settings</h2>
        <div className="bg-cream border border-sage-200 rounded-lg p-6">
          <p className="text-sage-600">Please log in to view account settings.</p>
        </div>
      </div>
    );
  }

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
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-900 mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Phone</label>
              <input
                type="tel"
                value={user.phone || ''}
                onChange={(e) => dispatch(updateUserAuthField({ field: 'phone', value: e.target.value }))}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Birth Date</label>
              <input
                type="date"
                value={user.birthDate || ''}
                onChange={(e) => dispatch(updateUserAuthField({ field: 'birthDate', value: e.target.value }))}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="bg-sage-900 text-cream px-4 py-2 rounded-lg hover:bg-sage-800 transition-colors"
              >
                Save Account Changes
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="bg-cream border border-sage-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-sage-900 mb-4">Email Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.orderUpdates || false}
                onChange={(e) => handlePreferenceChange('orderUpdates', e.target.checked)}
                className="mr-3 rounded border-sage-300 text-sage-600 focus:ring-sage-400"
              />
              <span className="text-sage-900">Order updates</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.promotionalEmails || false}
                onChange={(e) => handlePreferenceChange('promotionalEmails', e.target.checked)}
                className="mr-3 rounded border-sage-300 text-sage-600 focus:ring-sage-400"
              />
              <span className="text-sage-900">Promotional emails</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.smsNotifications || false}
                onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                className="mr-3 rounded border-sage-300 text-sage-600 focus:ring-sage-400"
              />
              <span className="text-sage-900">SMS notifications</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.styleRecommendations || false}
                onChange={(e) => handlePreferenceChange('styleRecommendations', e.target.checked)}
                className="mr-3 rounded border-sage-300 text-sage-600 focus:ring-sage-400"
              />
              <span className="text-sage-900">Style recommendations</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user.marketingConsent || false}
                onChange={(e) => handlePreferenceChange('marketingConsent', e.target.checked)}
                className="mr-3 rounded border-sage-300 text-sage-600 focus:ring-sage-400"
              />
              <span className="text-sage-900">Marketing consent</span>
            </label>
          </div>
        </div>

        <div className="bg-cream border border-sage-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-sage-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Gender Preference</label>
              <select
                value={user.genderPreference.toLocaleLowerCase() || ''}
                onChange={(e) => dispatch(updateUserAuthField({ field: 'genderPreference', value: e.target.value }))}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              >
                <option value="">Select preference</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Price Range</label>
              <select
                value={Budget()}
                onChange={(e) => dispatch(updateUserAuthField({ field: 'priceRange', value: e.target.value }))}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              >
                <option value="">Select range</option>
                <option value="0-50">Budget ($0-$50)</option>
                <option value="50-150">Mid-range ($50-$150)</option>
                <option value="150-300">Premium ($150-$300)</option>
                <option value="+300">Luxury ($300+)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-cream border border-sage-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-sage-900 mb-4">Address Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-900 mb-1">Street Address</label>
                <input
                  type="text"
                  value={user.street || ''}
                  onChange={(e) => dispatch(updateUserAuthField({ field: 'street', value: e.target.value }))}
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-900 mb-1">Apartment/Unit</label>
                <input
                  type="text"
                  value={user.apartment || ''}
                  onChange={(e) => dispatch(updateUserAuthField({ field: 'apartment', value: e.target.value }))}
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-sage-900 mb-1">City</label>
                <input
                  type="text"
                  value={user.city || ''}
                  onChange={(e) => dispatch(updateUserAuthField({ field: 'city', value: e.target.value }))}
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-900 mb-1">State</label>
                <input
                  type="text"
                  value={user.state || ''}
                  onChange={(e) => dispatch(updateUserAuthField({ field: 'state', value: e.target.value }))}
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-900 mb-1">ZIP Code</label>
                <input
                  type="text"
                  value={user.zipCode || ''}
                  onChange={(e) => dispatch(updateUserAuthField({ field: 'zipCode', value: e.target.value }))}
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Country</label>
              <input
                type="text"
                value={user.country || ''}
                onChange={(e) => dispatch(updateUserAuthField({ field: 'country', value: e.target.value }))}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSaveChanges}
          className="ml-auto block bg-sage-900 text-cream px-4 py-2 rounded-lg hover:bg-sage-800 transition-colors"
        >
          Save Changes
        </button>

        <div className="bg-cream border border-sage-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-sage-900 mb-4">Security</h3>

          <div className="space-y-3">
            <button className="text-sage-600 hover:text-sage-900 text-sm transition-colors">
              Change Password
            </button>
            <button className="text-sage-600 hover:text-sage-900 text-sm block transition-colors">
              Two-Factor Authentication
            </button>
            <div className="pt-2 border-t border-sage-200 mt-4">
              <p className="text-xs text-sage-500">
                Account created: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-xs text-sage-500">
                Last updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
            <button
              onClick={handleLogout}
              className="float-right block bg-red-600 text-cream px-4 py-2 mb-6 rounded-lg hover:bg-red-500 transition-colors"
            >
              Logout
            </button>
      </div>
    </div>
  );
};

export default AccountSettings;