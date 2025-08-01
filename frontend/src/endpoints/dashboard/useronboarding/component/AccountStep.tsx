import { Mail } from "lucide-react";
import CheckboxInput from "./CheckboxInput";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import type { User } from "../../../../types/user";

const AccountStep = ({ formData, onChange, errors }:{formData:User, onChange:(key:string, value:boolean|string)=>void, errors:User}) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-light text-sage-900">Create Your Account</h2>
      <p className="text-sage-600">Join thousands of style enthusiasts</p>
    </div>

    <div className="space-y-4 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          value={formData.firstName}
          onChange={(value) => onChange('firstName', value)}
          placeholder="Sarah"
          required
          error={errors.firstName}
        />
        <FormInput
          label="Last Name"
          value={formData.lastName}
          onChange={(value) => onChange('lastName', value)}
          placeholder="Mitchell"
          required
          error={errors.lastName}
        />
      </div>

      <FormInput
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(value) => onChange('email', value)}
        placeholder="sarah@example.com"
        required
        error={errors.email}
        icon={Mail}
      />

      <PasswordInput
        label="Password"
        value={formData.password}
        onChange={(value) => onChange('password', value)}
        placeholder="••••••••"
        required
        error={errors.password}
      />

      <PasswordInput
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={(value) => onChange('confirmPassword', value)}
        placeholder="••••••••"
        required
        error={errors.confirmPassword}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Birth Date"
          type="date"
          value={formData.birthDate}
          onChange={(value) => onChange('birthDate', value)}
        />
        <FormInput
          label="Phone (Optional)"
          type="tel"
          value={formData.phone}
          onChange={(value) => onChange('phone', value)}
          placeholder="(555) 123-4567"
        />
      </div>

      <CheckboxInput
        checked={formData.marketingConsent}
        onChange={(value) => onChange('marketingConsent', value)}
        label="Marketing Communications"
        description="I agree to receive marketing communications and understand I can unsubscribe at any time."
      />
    </div>
  </div>
);
export default AccountStep