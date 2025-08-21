import React, { useCallback, useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Check, Save, Loader, AlertCircle, X } from 'lucide-react';
import { logout, updateUserAuthField } from '../../../store/features/UserSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import type { UserProps } from '../../../types/user';
import { useNavigate } from 'react-router-dom';
import updateUser from '../../../axios/settings/updateUser';
import { setLoading } from '../../../store/features/GlobalSlice';

interface AlertState {
  type: 'success' | 'error' | 'info';
  message: string;
  show: boolean;
}

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [alert, setAlert] = useState<AlertState>({ type: 'info', message: '', show: false });

  // Track save states for different sections
  const [saveStates, setSaveStates] = useState({
    accountDetails: false,
    emailPreferences: false,
    personalInfo: false,
    addressInfo: false
  });

  // Track if sections have unsaved changes
  const [hasChanges, setHasChanges] = useState({
    accountDetails: false,
    emailPreferences: false,
    personalInfo: false,
    addressInfo: false
  });

  // Separate form data for each section
  const [accountDetailsForm, setAccountDetailsForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthDate: user?.birthDate || ''
  });

  const [emailPreferencesForm, setEmailPreferencesForm] = useState({
    orderUpdates: user?.orderUpdates || false,
    promotionalEmails: user?.promotionalEmails || false,
    smsNotifications: user?.smsNotifications || false,
    styleRecommendations: user?.styleRecommendations || false,
    marketingConsent: user?.marketingConsent || false
  });

  const [personalInfoForm, setPersonalInfoForm] = useState({
    genderPreference: user?.genderPreference || '',
    priceRange: user?.priceRange || ''
  });

  const [addressInfoForm, setAddressInfoForm] = useState({
    street: user?.street || '',
    apartment: user?.apartment || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    country: user?.country || ''
  });

  // Initialize forms when user data changes
  useEffect(() => {
    if (user) {
      setAccountDetailsForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate || ''
      });

      setEmailPreferencesForm({
        orderUpdates: user.orderUpdates || false,
        promotionalEmails: user.promotionalEmails || false,
        smsNotifications: user.smsNotifications || false,
        styleRecommendations: user.styleRecommendations || false,
        marketingConsent: user.marketingConsent || false
      });

      setPersonalInfoForm({
        genderPreference: user.genderPreference || '',
        priceRange: user.priceRange || ''
      });

      setAddressInfoForm({
        street: user.street || '',
        apartment: user.apartment || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        country: user.country || ''
      });
    }
  }, [user]);

  // Alert management functions
  const showAlert = (type: AlertState['type'], message: string) => {
    setAlert({ type, message, show: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, show: false }));
  };

  // Helper function to show save confirmation
  const showSaveConfirmation = (section: keyof typeof saveStates) => {
    setSaveStates(prev => ({ ...prev, [section]: true }));
    setHasChanges(prev => ({ ...prev, [section]: false }));
    setTimeout(() => {
      setSaveStates(prev => ({ ...prev, [section]: false }));
    }, 2000);
  };

  // Mark section as having changes
  const markAsChanged = (section: keyof typeof hasChanges) => {
    setHasChanges(prev => ({ ...prev, [section]: true }));
  };

  // Reset form functions
  const resetAccountDetailsForm = () => {
    if (user) {
      setAccountDetailsForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate || ''
      });
      setHasChanges(prev => ({ ...prev, accountDetails: false }));
    }
  };

  const resetEmailPreferencesForm = () => {
    if (user) {
      setEmailPreferencesForm({
        orderUpdates: user.orderUpdates || false,
        promotionalEmails: user.promotionalEmails || false,
        smsNotifications: user.smsNotifications || false,
        styleRecommendations: user.styleRecommendations || false,
        marketingConsent: user.marketingConsent || false
      });
      setHasChanges(prev => ({ ...prev, emailPreferences: false }));
    }
  };

  const resetPersonalInfoForm = () => {
    if (user) {
      setPersonalInfoForm({
        genderPreference: user.genderPreference || '',
        priceRange: user.priceRange || ''
      });
      setHasChanges(prev => ({ ...prev, personalInfo: false }));
    }
  };

  const resetAddressInfoForm = () => {
    if (user) {
      setAddressInfoForm({
        street: user.street || '',
        apartment: user.apartment || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        country: user.country || ''
      });
      setHasChanges(prev => ({ ...prev, addressInfo: false }));
    }
  };

  // Budget calculation function
  // const Budget = (): string => {
  //   const userRange: number = user?.priceRange ? parseInt(user.priceRange.toString().split("-")[1]) : 50;
  //   if (typeof user?.priceRange !== 'string') {
  //     return "0-50";
  //   }
  //   if (userRange <= 50) {
  //     return "0-50";
  //   } else if (userRange <= 150) {
  //     return "50-150";
  //   } else if (userRange <= 300) {
  //     return "150-300";
  //   } else {
  //     return "+300";
  //   }
  // };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Update the database with only changed fields
  const handleUpdateDB = useCallback(async (updatedData: Partial<UserProps>, section: string) => {
    try {
      dispatch(setLoading(true));
      const [modifyUser] = await Promise.allSettled([updateUser(updatedData)]);
      
      if (modifyUser.status === "fulfilled") {
        // Update Redux store with the new data
        Object.entries(updatedData).forEach(([field, value]) => {
          dispatch(updateUserAuthField({ field: field as keyof UserProps, value }));
        });
        showAlert('success', `${section} updated successfully!`);
        return true;
      } else {
        showAlert('error', `Failed to update ${section.toLowerCase()}. Please try again.`);
        return false;
      }
    } catch (error) {
      console.log(error)
      showAlert('error', `An error occurred while updating ${section.toLowerCase()}.`);
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Handle input changes for account details
  const handleAccountDetailsChange = (field: keyof typeof accountDetailsForm, value: string) => {
    setAccountDetailsForm(prev => ({ ...prev, [field]: value }));
    markAsChanged('accountDetails');
  };

  // Handle email preferences changes
  const handleEmailPreferencesChange = (field: keyof typeof emailPreferencesForm, checked: boolean) => {
    setEmailPreferencesForm(prev => ({ ...prev, [field]: checked }));
    markAsChanged('emailPreferences');
  };

  // Handle personal info changes
  const handlePersonalInfoChange = (field: keyof typeof personalInfoForm, value: string) => {
    setPersonalInfoForm(prev => ({ ...prev, [field]: value }));
    markAsChanged('personalInfo');
  };

  // Handle address info changes
  const handleAddressInfoChange = (field: keyof typeof addressInfoForm, value: string) => {
    setAddressInfoForm(prev => ({ ...prev, [field]: value }));
    markAsChanged('addressInfo');
  };

  // Save functions for different sections
  const handleSaveAccountDetails = async () => {
    const success = await handleUpdateDB(accountDetailsForm, 'Account Details');
    if (success) {
      showSaveConfirmation('accountDetails');
    }
  };

  const handleSaveEmailPreferences = async () => {
    const success = await handleUpdateDB(emailPreferencesForm, 'Email Preferences');
    if (success) {
      showSaveConfirmation('emailPreferences');
    }
  };

  const handleSavePersonalInfo = async () => {
    const success = await handleUpdateDB(personalInfoForm, 'Personal Information');
    if (success) {
      showSaveConfirmation('personalInfo');
    }
  };

  const handleSaveAddressInfo = async () => {
    const success = await handleUpdateDB(addressInfoForm, 'Address Information');
    if (success) {
      showSaveConfirmation('addressInfo');
    }
  };

  // Alert Component
  const AlertComponent = () => {
    if (!alert.show) return null;

    const alertColors = {
      success: 'bg-green-100 border-green-400 text-green-700',
      error: 'bg-red-100 border-red-400 text-red-700',
      info: 'bg-blue-100 border-blue-400 text-blue-700'
    };

    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${alertColors[alert.type]} max-w-md shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">{alert.message}</span>
          </div>
          <button onClick={closeAlert} className="ml-2">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  // Save Button Component
  const SaveButton = ({
    section,
    onClick,
    onReset,
    className = ""
  }: {
    section: keyof typeof saveStates,
    onClick: () => void,
    onReset: () => void,
    className?: string
  }) => {
    const isSaved = saveStates[section];
    const hasUnsavedChanges = hasChanges[section];
    
    return (
      <div className="flex gap-2">
        {hasUnsavedChanges && (
          <button
            onClick={onReset}
            className="px-4 py-2 text-sage-600 border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
          >
            Reset
          </button>
        )}
        <button
          onClick={onClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isSaved
            ? 'bg-green-600 text-white'
            : hasUnsavedChanges
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-sage-900 text-cream hover:bg-sage-800'
            } ${className}`}
          disabled={isSaved || isLoading}
        >
          {isLoading && <Loader className='animate-spin h-4 w-4'/>}
          {!isLoading && isSaved ? (
            <>
              <Check className="h-4 w-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {hasUnsavedChanges ? 'Save Changes' : 'Save'}
            </>
          )}
        </button>
      </div>
    );
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
      <AlertComponent />
      <h2 className="text-2xl font-light text-sage-900">Account Settings</h2>

      {/* Account Details Section */}
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
                  value={accountDetailsForm.firstName}
                  onChange={(e) => handleAccountDetailsChange('firstName', e.target.value)}
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sage-900 mb-1">Last Name</label>
                <input
                  type="text"
                  value={accountDetailsForm.lastName}
                  onChange={(e) => handleAccountDetailsChange('lastName', e.target.value)}
                  className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Email Address</label>
              <input
                type="email"
                value={accountDetailsForm.email}
                onChange={(e) => handleAccountDetailsChange('email', e.target.value)}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Phone</label>
              <input
                type="tel"
                value={accountDetailsForm.phone}
                onChange={(e) => handleAccountDetailsChange('phone', e.target.value)}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Birth Date</label>
              <input
                type="date"
                value={accountDetailsForm.birthDate}
                onChange={(e) => handleAccountDetailsChange('birthDate', e.target.value)}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
            <div className="flex justify-end">
              <SaveButton
                section="accountDetails"
                onClick={handleSaveAccountDetails}
                onReset={resetAccountDetailsForm}
              />
            </div>
          </div>
        )}
      </div>

      {/* Email Preferences Section */}
      <div className="bg-cream border border-sage-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-sage-900">Email Preferences</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailPreferencesForm.orderUpdates}
              onChange={(e) => handleEmailPreferencesChange('orderUpdates', e.target.checked)}
              className="mr-3 rounded border-sage-300 text-sage-600 focus:ring-sage-400"
            />
            <span className="text-sage-900">Order updates</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailPreferencesForm.promotionalEmails}
              onChange={(e) => handleEmailPreferencesChange('promotionalEmails', e.target.checked)}
              className="mr-3 rounded border-sage-300 text-sage-600 focus:ring-sage-400"
            />
            <span className="text-sage-900">Promotional emails</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailPreferencesForm.smsNotifications}
              onChange={(e) => handleEmailPreferencesChange('smsNotifications', e.target.checked)}
              className="mr-3 rounded border-sage-300 text-sage-600 focus:ring-sage-400"
            />
            <span className="text-sage-900">SMS notifications</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailPreferencesForm.styleRecommendations}
              onChange={(e) => handleEmailPreferencesChange('styleRecommendations', e.target.checked)}
              className="mr-3 rounded border-sage-300 text-sage-600 focus:ring-sage-400"
            />
            <span className="text-sage-900">Style recommendations</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailPreferencesForm.marketingConsent}
              onChange={(e) => handleEmailPreferencesChange('marketingConsent', e.target.checked)}
              className="mr-3 rounded border-sage-300 text-sage-600 focus:ring-sage-400"
            />
            <span className="text-sage-900">Marketing consent</span>
          </label>
          <div className="flex justify-end">
            <SaveButton
              section="emailPreferences"
              onClick={handleSaveEmailPreferences}
              onReset={resetEmailPreferencesForm}
            />
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-cream border border-sage-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-sage-900">Personal Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sage-900 mb-1">Gender Preference</label>
            <select
              value={personalInfoForm.genderPreference.toLowerCase()}
              onChange={(e) => handlePersonalInfoChange('genderPreference', e.target.value)}
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
              value={personalInfoForm.priceRange}
              onChange={(e) => handlePersonalInfoChange('priceRange', e.target.value)}
              className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
            >
              <option value="">Select range</option>
              <option value="0-50">Budget ($0-$50)</option>
              <option value="50-150">Mid-range ($50-$150)</option>
              <option value="150-300">Premium ($150-$300)</option>
              <option value="+300">Luxury ($300+)</option>
            </select>
          </div>
          <div className="flex justify-end col-span-2">
            <SaveButton
              section="personalInfo"
              onClick={handleSavePersonalInfo}
              onReset={resetPersonalInfoForm}
            />
          </div>
        </div>
      </div>

      {/* Address Information Section */}
      <div className="bg-cream border border-sage-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-sage-900">Address Information</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Street Address</label>
              <input
                type="text"
                value={addressInfoForm.street}
                onChange={(e) => handleAddressInfoChange('street', e.target.value)}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">Apartment/Unit</label>
              <input
                type="text"
                value={addressInfoForm.apartment}
                onChange={(e) => handleAddressInfoChange('apartment', e.target.value)}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">City</label>
              <input
                type="text"
                value={addressInfoForm.city}
                onChange={(e) => handleAddressInfoChange('city', e.target.value)}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">State</label>
              <input
                type="text"
                value={addressInfoForm.state}
                onChange={(e) => handleAddressInfoChange('state', e.target.value)}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-900 mb-1">ZIP Code</label>
              <input
                type="text"
                value={addressInfoForm.zipCode}
                onChange={(e) => handleAddressInfoChange('zipCode', e.target.value)}
                className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-900 mb-1">Country</label>
            <input
              type="text"
              value={addressInfoForm.country}
              onChange={(e) => handleAddressInfoChange('country', e.target.value)}
              className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
          </div>
          <div className="flex justify-end">
            <SaveButton
              section="addressInfo"
              onClick={handleSaveAddressInfo}
              onReset={resetAddressInfoForm}
            />
          </div>
        </div>
      </div>

      {/* Security Section */}
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

      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-cream px-6 py-2 rounded-lg hover:bg-red-500 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;