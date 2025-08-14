// interfaces/onboarding.interfaces.ts
export interface UserProps{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  phone: string;
  marketingConsent: boolean;
  genderPreference: string;
  stylePreferences: string[];
  priceRange: string;
  addressType: string;
  street: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  categories: string[];
  occasions: string[];
  orderUpdates: boolean;
  promotionalEmails: boolean;
  smsNotifications: boolean;
  styleRecommendations: boolean;
  isAdmin: boolean;

  // Auth fields
  token: string | null;
  isLoggedIn: boolean;
}
export interface ValidationErrors {
  [key: string]: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
}

export interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
  canSkip: boolean;
}

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export interface WelcomeStepProps {
  onNext: () => void;
}

export interface AccountStepProps {
  formData: UserProps; 
  onChange: (field: string, value: string|boolean) => void;
  errors: ValidationErrors;
}

export interface PreferencesStepProps {
  formData: UserProps; 
  onChange: (field: string, value: string|boolean) => void;
  onArrayToggle: (field: string, value: string) => void;
}

export interface AddressStepProps {
  formData: UserProps; 
  onChange: (field: string, value: string|boolean) => void;
  errors: ValidationErrors;
}

export interface InterestsStepProps {
  formData: UserProps; 
  onArrayToggle: (field: string, value: string) => void;
}

export interface NotificationsStepProps {
  formData: UserProps; 
  onChange: (field: string, value: string|boolean) => void;
}

