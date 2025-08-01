import type { User } from "../../../../types/user";
import FormInput from "./FormInput";
import { SelectionCard } from "./SelectionCard";

const AddressStep = ({ formData, onChange, errors }:{formData:User, onChange:(key:string, value:string|boolean)=>void, errors:User}) => (
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
            <SelectionCard
              key={type}
              selected={formData.addressType === type}
              onClick={() => onChange('addressType', type)}
              className="border-2 rounded-lg p-3 cursor-pointer transition-all capitalize"
            >
              <div className="flex items-center justify-center">
                <span className="text-sage-900">{type}</span>
              </div>
            </SelectionCard>
          ))}
        </div>
      </div>

      <FormInput
        label="Street Address"
        value={formData.street}
        onChange={(value) => onChange('street', value)}
        placeholder="123 Main Street"
        required
        error={errors.street}
      />

      <FormInput
        label="Apartment/Suite (Optional)"
        value={formData.apartment}
        onChange={(value) => onChange('apartment', value)}
        placeholder="Apt 4B"
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="City"
          value={formData.city}
          onChange={(value) => onChange('city', value)}
          placeholder="New York"
          required
          error={errors.city}
        />
        <FormInput
          label="State"
          value={formData.state}
          onChange={(value) => onChange('state', value)}
          placeholder="NY"
          required
          error={errors.state}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="ZIP Code"
          value={formData.zipCode}
          onChange={(value) => onChange('zipCode', value)}
          placeholder="10001"
          required
          error={errors.zipCode}
        />
        <div>
          <label className="block text-sm font-medium text-sage-900 mb-1">Country</label>
          <select
            value={formData.country}
            onChange={(e) => onChange('country', e.target.value)}
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

export default AddressStep;