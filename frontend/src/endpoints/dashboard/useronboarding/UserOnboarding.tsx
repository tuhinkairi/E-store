import { useEffect, useState } from "react";


import WelcomeStep from "./component/WelcomeStepComponent";
import AccountStep from "./component/AccountStep";
import PreferencesStep from "./component/PreferenceStep";
import AddressStep from "./component/AddressStep";
import InterestsStep from "./component/InterestStep";
import NotificationsStep from "./component/NotificationStep";
import CompleteStep from "./component/CompleteStep";
import ProgressBar from "./component/ProgressBar";
import StepNavigation from "./component/StepNavigation";
import type { OnboardingStep, UserProps, ValidationErrors } from "../../../types/user";

const UserOnboarding = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<UserProps>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    phone: '',
    marketingConsent: false,
    genderPreference: '',
    stylePreferences: [],
    priceRange: '',
    addressType: 'home',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    categories: [],
    occasions: [],
    orderUpdates: true,
    promotionalEmails: true,
    smsNotifications: false,
    styleRecommendations: true
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const steps: OnboardingStep[] = [
    { id: 'welcome', title: 'Welcome', subtitle: 'Join the Elysian family' },
    { id: 'account', title: 'Create Account', subtitle: 'Your personal details' },
    { id: 'preferences', title: 'Style Preferences', subtitle: 'Curate your experience' },
    { id: 'address', title: 'Shipping Address', subtitle: 'Where to send your orders' },
    { id: 'interests', title: 'Your Interests', subtitle: 'What catches your eye' },
    { id: 'notifications', title: 'Stay Connected', subtitle: 'How we communicate' },
    { id: 'complete', title: 'Welcome Aboard', subtitle: 'You\'re all set!' }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    switch (step) {
      case 1: // Account
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
      case 3: // Address
        if (!formData.street.trim()) newErrors.street = 'Street address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        break;
      default:
        // No validation needed for other steps
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleInputChange = (field: string, value: string | boolean): void => {
  setFormData(prev => ({ ...prev, [field]: value }));
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: '' }));
  }
};

const handleArrayToggle = (field: string, value: string | number): void => {
  setFormData(prev => {
    const currentArray = prev[field as keyof UserProps] as (string | number)[];
    return {
      ...prev,
      [field]: currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value],
    };
  });
};

  const nextStep = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = (): void => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const skipToEnd = (): void => {
    setCurrentStep(6);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: 
        return <WelcomeStep onNext={nextStep} />;
      case 1: 
        return (
          <AccountStep 
            formData={formData} 
            onChange={handleInputChange} 
            errors={errors} 
          />
        );
      case 2: 
        return (
          <PreferencesStep 
            formData={formData} 
            onChange={handleInputChange}
            onArrayToggle={handleArrayToggle}
          />
        );
      case 3: 
        return (
          <AddressStep 
            formData={formData} 
            onChange={handleInputChange} 
            errors={errors} 
          />
        );
      case 4: 
        return (
          <InterestsStep 
            formData={formData} 
            onArrayToggle={handleArrayToggle} 
          />
        );
      case 5: 
        return (
          <NotificationsStep 
            formData={formData} 
            onChange={handleInputChange} 
          />
        );
      case 6: 
        return <CompleteStep />;
      default: 
        return <WelcomeStep onNext={nextStep} />;
    }
  };
  useEffect(()=>{
    console.log(formData)
  },[formData])
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
        {currentStep > 0 && currentStep < 6 && (
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
        )}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-cream rounded-2xl shadow-lg p-8 md:p-12">
            {renderStepContent()}
          </div>
        </div>

        {/* Navigation */}
        {currentStep > 0 && currentStep < 6 && (
          <StepNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrev={prevStep}
            onNext={nextStep}
            onSkip={skipToEnd}
            canSkip={currentStep > 1 && currentStep < 5}
          />
        )}
      </div>
    </div>
  );
};

export default UserOnboarding;