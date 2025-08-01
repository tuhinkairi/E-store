import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  MapPin,
  CreditCard,
  Heart,
  Gift,
  Star,
  ShoppingBag,
  Sparkles,
  X,
  Phone,
  Calendar,
  UserCheck,
  Shield,
  Truck,
  Award
} from 'lucide-react';

const UserOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Account Creation
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    phone: '',
    marketingConsent: false,
    
    // Personal Preferences
    genderPreference: '',
    sizePreferences: {
      tops: '',
      bottoms: '',
      shoes: '',
      outerwear: ''
    },
    stylePreferences: [],
    priceRange: '',
    
    // Address
    addressType: 'home',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Interests
    categories: [],
    brands: [],
    occasions: [],
    
    // Notifications
    orderUpdates: true,
    promotionalEmails: true,
    smsNotifications: false,
    styleRecommendations: true
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { id: 'welcome', title: 'Welcome', subtitle: 'Join the Elysian family' },
    { id: 'account', title: 'Create Account', subtitle: 'Your personal details' },
    { id: 'preferences', title: 'Style Preferences', subtitle: 'Curate your experience' },
    { id: 'address', title: 'Shipping Address', subtitle: 'Where to send your orders' },
    { id: 'interests', title: 'Your Interests', subtitle: 'What catches your eye' },
    { id: 'notifications', title: 'Stay Connected', subtitle: 'How we communicate' },
    { id: 'complete', title: 'Welcome Aboard', subtitle: 'You\'re all set!' }
  ];

  const styleOptions = [
    { id: 'classic', label: 'Classic & Timeless', icon: '👔' },
    { id: 'modern', label: 'Modern & Minimal', icon: '✨' },
    { id: 'bohemian', label: 'Bohemian & Free', icon: '🌸' },
    { id: 'elegant', label: 'Elegant & Sophisticated', icon: '💎' },
    { id: 'casual', label: 'Casual & Comfortable', icon: '👕' },
    { id: 'edgy', label: 'Edgy & Bold', icon: '🖤' }
  ];

  const categoryOptions = [
    { id: 'shirts', label: 'Shirts & Blouses', icon: ShoppingBag },
    { id: 'outerwear', label: 'Outerwear', icon: Shield },
    { id: 'knitwear', label: 'Knitwear', icon: Heart },
    { id: 'accessories', label: 'Accessories', icon: Sparkles },
    { id: 'footwear', label: 'Footwear', icon: Award }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Account
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;
      case 3: // Address
        if (!formData.street.trim()) newErrors.street = 'Street address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-sage-600">Step {currentStep + 1} of {steps.length}</span>
        <span className="text-sm text-sage-600">{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-sage-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-sage-900 to-sage-700 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderWelcome = () => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-sage-900 rounded-full flex items-center justify-center mx-auto">
          <span className="text-3xl font-light text-cream">E</span>
        </div>
        <h1 className="text-4xl font-light text-sage-900">Welcome to Elysian</h1>
        <p className="text-lg text-sage-600 max-w-md mx-auto">
          Where timeless elegance meets contemporary sophistication. Let's create your personalized shopping experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center mx-auto">
            <UserCheck className="h-6 w-6 text-sage-900" />
          </div>
          <h3 className="font-medium text-sage-900">Personalized</h3>
          <p className="text-sm text-sage-600">Curated recommendations just for you</p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center mx-auto">
            <Truck className="h-6 w-6 text-sage-900" />
          </div>
          <h3 className="font-medium text-sage-900">Seamless</h3>
          <p className="text-sm text-sage-600">Effortless shopping and delivery</p>
        </div>
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center mx-auto">
            <Award className="h-6 w-6 text-sage-900" />
          </div>
          <h3 className="font-medium text-sage-900">Exclusive</h3>
          <p className="text-sm text-sage-600">Member-only benefits and early access</p>
        </div>
      </div>

      <button
        onClick={nextStep}
        className="bg-sage-900 text-cream px-8 py-3 rounded-lg hover:bg-sage-800 transition-colors flex items-center mx-auto"
      >
        Get Started
        <ArrowRight className="h-5 w-5 ml-2" />
      </button>
    </div>
  );

  const renderAccount = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-light text-sage-900">Create Your Account</h2>
        <p className="text-sage-600">Join thousands of style enthusiasts</p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sage-900 mb-1">First Name *</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sage-900 bg-cream ${errors.firstName ? 'border-red-500' : 'border-sage-200'}`}
              placeholder="Sarah"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-sage-900 mb-1">Last Name *</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sage-900 bg-cream ${errors.lastName ? 'border-red-500' : 'border-sage-200'}`}
              placeholder="Mitchell"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-900 mb-1">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-600" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full border rounded-lg pl-10 pr-3 py-2 text-sage-900 bg-cream ${errors.email ? 'border-red-500' : 'border-sage-200'}`}
              placeholder="sarah@example.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-900 mb-1">Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-600" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full border rounded-lg pl-10 pr-10 py-2 text-sage-900 bg-cream ${errors.password ? 'border-red-500' : 'border-sage-200'}`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-900 mb-1">Confirm Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-600" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full border rounded-lg pl-10 pr-10 py-2 text-sage-900 bg-cream ${errors.confirmPassword ? 'border-red-500' : 'border-sage-200'}`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sage-900 mb-1">Birth Date</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-sage-900 mb-1">Phone (Optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.marketingConsent}
            onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-sage-600">
            I agree to receive marketing communications and understand I can unsubscribe at any time.
          </span>
        </label>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-light text-sage-900">Your Style Preferences</h2>
        <p className="text-sage-600">Help us curate the perfect selection for you</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-sage-900 mb-3">I shop for:</label>
          <div className="grid grid-cols-3 gap-3">
            {['Women', 'Men', 'All'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="genderPreference"
                  value={option.toLowerCase()}
                  checked={formData.genderPreference === option.toLowerCase()}
                  onChange={(e) => handleInputChange('genderPreference', e.target.value)}
                  className="mr-2"
                />
                <span className="text-sage-900">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-900 mb-3">My style is:</label>
          <div className="grid grid-cols-2 gap-3">
            {styleOptions.map((style) => (
              <label 
                key={style.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  formData.stylePreferences.includes(style.id)
                    ? 'border-sage-900 bg-sage-50'
                    : 'border-sage-200 hover:border-sage-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.stylePreferences.includes(style.id)}
                  onChange={() => handleArrayToggle('stylePreferences', style.id)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{style.icon}</span>
                  <span className="text-sage-900 font-medium">{style.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-900 mb-3">Price range I'm comfortable with:</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'budget', label: 'Budget Conscious ($50-150)', value: '50-150' },
              { id: 'moderate', label: 'Moderate ($150-300)', value: '150-300' },
              { id: 'premium', label: 'Premium ($300-500)', value: '300-500' },
              { id: 'luxury', label: 'Luxury ($500+)', value: '500+' }
            ].map((range) => (
              <label 
                key={range.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  formData.priceRange === range.value
                    ? 'border-sage-900 bg-sage-50'
                    : 'border-sage-200 hover:border-sage-600'
                }`}
              >
                <input
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={formData.priceRange === range.value}
                  onChange={(e) => handleInputChange('priceRange', e.target.value)}
                  className="sr-only"
                />
                <span className="text-sage-900">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddress = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-light text-sage-900">Shipping Address</h2>
        <p className="text-sage-600">Where should we send your orders?</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium text-sage-900 mb-3">Address Type:</label>
          <div className="grid grid-cols-2 gap-3">
            {['home', 'office'].map((type) => (
              <label 
                key={type}
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all capitalize ${
                  formData.addressType === type
                    ? 'border-sage-900 bg-sage-50'
                    : 'border-sage-200 hover:border-sage-600'
                }`}
              >
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={formData.addressType === type}
                  onChange={(e) => handleInputChange('addressType', e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center justify-center">
                  <span className="text-sage-900">{type}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-900 mb-1">Street Address *</label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 text-sage-900 bg-cream ${errors.street ? 'border-red-500' : 'border-sage-200'}`}
            placeholder="123 Main Street"
          />
          {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-900 mb-1">Apartment/Suite (Optional)</label>
          <input
            type="text"
            value={formData.apartment}
            onChange={(e) => handleInputChange('apartment', e.target.value)}
            className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream"
            placeholder="Apt 4B"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sage-900 mb-1">City *</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sage-900 bg-cream ${errors.city ? 'border-red-500' : 'border-sage-200'}`}
              placeholder="New York"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-sage-900 mb-1">State *</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sage-900 bg-cream ${errors.state ? 'border-red-500' : 'border-sage-200'}`}
              placeholder="NY"
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sage-900 mb-1">ZIP Code *</label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-sage-900 bg-cream ${errors.zipCode ? 'border-red-500' : 'border-sage-200'}`}
              placeholder="10001"
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-sage-900 mb-1">Country</label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full border border-sage-200 rounded-lg px-3 py-2 text-sage-900 bg-cream"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInterests = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-light text-sage-900">What Interests You?</h2>
        <p className="text-sage-600">Select your favorite categories to personalize your experience</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-sage-900 mb-3">Product Categories:</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryOptions.map((category) => {
              const Icon = category.icon;
              return (
                <label 
                  key={category.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.categories.includes(category.id)
                      ? 'border-sage-900 bg-sage-50'
                      : 'border-sage-200 hover:border-sage-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category.id)}
                    onChange={() => handleArrayToggle('categories', category.id)}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3">
                    <Icon className="h-6 w-6 text-sage-600" />
                    <span className="text-sage-900 font-medium">{category.label}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-900 mb-3">Shopping Occasions:</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Work & Professional',
              'Casual & Weekend',
              'Special Events',
              'Travel & Vacation',
              'Date Night',
              'Seasonal Updates'
            ].map((occasion) => (
              <label 
                key={occasion}
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                  formData.occasions.includes(occasion)
                    ? 'border-sage-900 bg-sage-50'
                    : 'border-sage-200 hover:border-sage-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.occasions.includes(occasion)}
                  onChange={() => handleArrayToggle('occasions', occasion)}
                  className="sr-only"
                />
                <span className="text-sage-900 text-center block">{occasion}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-light text-sage-900">Stay Connected</h2>
        <p className="text-sage-600">Choose how you'd like to hear from us</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-4">
          <label className="flex items-start space-x-3 p-4 border border-sage-200 rounded-lg">
            <input
              type="checkbox"
              checked={formData.orderUpdates}
              onChange={(e) => handleInputChange('orderUpdates', e.target.checked)}
              className="mt-1"
            />
            <div>
              <span className="text-sage-900 font-medium block">Order Updates</span>
              <span className="text-sm text-sage-600">Get notified about your order status and shipping updates</span>
            </div>
          </label>

          <label className="flex items-start space-x-3 p-4 border border-sage-200 rounded-lg">
            <input
              type="checkbox"
              checked={formData.promotionalEmails}
              onChange={(e) => handleInputChange('promotionalEmails', e.target.checked)}
              className="mt-1"
            />
            <div>
              <span className="text-sage-900 font-medium block">Promotional Emails</span>
              <span className="text-sm text-sage-600">Receive exclusive offers, sales, and new arrival notifications</span>
            </div>
          </label>

          <label className="flex items-start space-x-3 p-4 border border-sage-200 rounded-lg">
            <input
              type="checkbox"
              checked={formData.styleRecommendations}
              onChange={(e) => handleInputChange('styleRecommendations', e.target.checked)}
              className="mt-1"
            />
            <div>
              <span className="text-sage-900 font-medium block">Style Recommendations</span>
              <span className="text-sm text-sage-600">Get personalized style tips and curated product suggestions</span>
            </div>
          </label>

          <label className="flex items-start space-x-3 p-4 border border-sage-200 rounded-lg">
            <input
              type="checkbox"
              checked={formData.smsNotifications}
              onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
              className="mt-1"
            />
            <div>
              <span className="text-sage-900 font-medium block">SMS Notifications</span>
              <span className="text-sm text-sage-600">Receive text updates for urgent order information</span>
            </div>
          </label>
        </div>

        <div className="bg-sage-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Shield className="h-5 w-5 text-sage-600 mt-0.5" />
            <div>
              <p className="text-sm text-sage-900 font-medium">Privacy Promise</p>
              <p className="text-xs text-sage-600 mt-1">
                We respect your privacy. You can change these preferences anytime in your account settings, and we'll never share your information with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-gradient-to-r from-sage-900 to-sage-700 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-10 w-10 text-cream" />
        </div>
        <h1 className="text-4xl font-light text-sage-900">Welcome to Elysian!</h1>
        <p className="text-lg text-sage-600 max-w-md mx-auto">
          Your account has been created successfully. We're excited to help you discover your perfect style.
        </p>
      </div>

      <div className="bg-gradient-to-r from-sage-900 to-sage-700 rounded-lg p-6 text-cream max-w-md mx-auto">
        <h3 className="text-xl font-medium mb-4">What's Next?</h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <Gift className="h-5 w-5 text-gold-400" />
            <span>Enjoy 15% off your first order with code WELCOME15</span>
          </div>
          <div className="flex items-center space-x-3">
            <Star className="h-5 w-5 text-gold-400" />
            <span>Browse our curated collections just for you</span>
          </div>
          <div className="flex items-center space-x-3">
            <Heart className="h-5 w-5 text-gold-400" />
            <span>Start building your wishlist</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
          <button className="bg-sage-900 text-cream px-6 py-3 rounded-lg hover:bg-sage-800 transition-colors">
            Start Shopping
          </button>
          <button className="border border-sage-900 text-sage-900 px-6 py-3 rounded-lg hover:bg-sage-50 transition-colors">
            Complete Profile
          </button>
        </div>
        
        <p className="text-sm text-sage-600">
          Need help? Contact our style consultants at{' '}
          <a href="mailto:hello@elysian.com" className="text-sage-900 hover:underline">
            hello@elysian.com
          </a>
        </p>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderWelcome();
      case 1: return renderAccount();
      case 2: return renderPreferences();
      case 3: return renderAddress();
      case 4: return renderInterests();
      case 5: return renderNotifications();
      case 6: return renderComplete();
      default: return renderWelcome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sage-50 to-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-sage-900 rounded-full flex items-center justify-center">
              <span className="text-xl font-light text-cream">E</span>
            </div>
            <h1 className="text-2xl font-light text-sage-900">ELYSIAN</h1>
          </div>
          {currentStep > 0 && currentStep < 6 && (
            <div>
              <h2 className="text-xl font-medium text-sage-900">{steps[currentStep].title}</h2>
              <p className="text-sage-600">{steps[currentStep].subtitle}</p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {currentStep > 0 && currentStep < 6 && renderProgressBar()}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-cream rounded-2xl shadow-lg p-8 md:p-12">
            {renderStepContent()}
          </div>
        </div>

        {/* Navigation */}
        {currentStep > 0 && currentStep < 6 && (
          <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
            <button
              onClick={prevStep}
              className="flex items-center text-sage-600 hover:text-sage-900 transition-colors"
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            
            <div className="flex items-center space-x-2">
              {steps.slice(1, -1).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index + 1 <= currentStep ? 'bg-sage-900' : 'bg-sage-200'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              className="bg-sage-900 text-cream px-6 py-2 rounded-lg hover:bg-sage-800 transition-colors flex items-center"
            >
              {currentStep === 5 ? 'Complete' : 'Continue'}
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        )}

        {/* Skip Option */}
        {currentStep > 1 && currentStep < 5 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setCurrentStep(6)}
              className="text-sage-600 hover:text-sage-900 text-sm underline"
            >
              Skip for now - I'll complete this later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOnboarding;