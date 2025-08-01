import type { UserProps } from "../../../../types/user";
import { SelectionCard } from "./SelectionCard";

const PreferencesStep = ({ formData, onChange, onArrayToggle }:{formData:UserProps, onChange:(key:string, value:boolean|string)=>void, onArrayToggle:(key:string, value:string|number|number)=>void}) => {
  const styleOptions = [
    { id: 'classic', label: 'Classic & Timeless', icon: '👔' },
    { id: 'modern', label: 'Modern & Minimal', icon: '✨' },
    { id: 'bohemian', label: 'Bohemian & Free', icon: '🌸' },
    { id: 'elegant', label: 'Elegant & Sophisticated', icon: '💎' },
    { id: 'casual', label: 'Casual & Comfortable', icon: '👕' },
    { id: 'edgy', label: 'Edgy & Bold', icon: '🖤' }
  ];

  const priceRanges = [
    { id: 'budget', label: 'Budget Conscious ($50-150)', value: '50-150' },
    { id: 'moderate', label: 'Moderate ($150-300)', value: '150-300' },
    { id: 'premium', label: 'Premium ($300-500)', value: '300-500' },
    { id: 'luxury', label: 'Luxury ($500+)', value: '500+' }
  ];

  return (
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
                  onChange={(e) => onChange('genderPreference', e.target.value)}
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
              <SelectionCard
                key={style.id}
                selected={formData.stylePreferences.includes(style.id)}
                onClick={() => onArrayToggle('stylePreferences', style.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{style.icon}</span>
                  <span className="text-sage-900 font-medium">{style.label}</span>
                </div>
              </SelectionCard>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-900 mb-3">Price range I'm comfortable with:</label>
          <div className="grid grid-cols-2 gap-3">
            {priceRanges.map((range) => (
              <SelectionCard
                key={range.id}
                selected={formData.priceRange === range.value}
                onClick={() => onChange('priceRange', range.value)}
              >
                <span className="text-sage-900">{range.label}</span>
              </SelectionCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PreferencesStep;