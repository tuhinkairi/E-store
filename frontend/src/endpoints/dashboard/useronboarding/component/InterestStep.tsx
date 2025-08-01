import { Award, Heart, Shield, ShoppingBag, Sparkles } from "lucide-react";
import { SelectionCard } from "./SelectionCard";
import type { UserProps } from "../../../../types/user";


const InterestsStep = ({ formData, onArrayToggle }:{formData:UserProps, onArrayToggle:(field: string, value: string | number)=>void}) => {
  const categoryOptions = [
    { id: 'shirts', label: 'Shirts & Blouses', icon: ShoppingBag },
    { id: 'outerwear', label: 'Outerwear', icon: Shield },
    { id: 'knitwear', label: 'Knitwear', icon: Heart },
    { id: 'accessories', label: 'Accessories', icon: Sparkles },
    { id: 'footwear', label: 'Footwear', icon: Award }
  ];

  const occasions = [
    'Work & Professional',
    'Casual & Weekend',
    'Special Events',
    'Travel & Vacation',
    'Date Night',
    'Seasonal Updates'
  ];

  return (
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
                <SelectionCard
                  key={category.id}
                  selected={formData.categories.includes(category.id)}
                  onClick={() => onArrayToggle('categories', category.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-6 w-6 text-sage-600" />
                    <span className="text-sage-900 font-medium">{category.label}</span>
                  </div>
                </SelectionCard>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-900 mb-3">Shopping Occasions:</label>
          <div className="grid grid-cols-2 gap-3">
            {occasions.map((occasion) => (
              <SelectionCard
                key={occasion}
                selected={formData.occasions.includes(occasion)}
                onClick={() => onArrayToggle('occasions', occasion)}
                className="border-2 rounded-lg p-3 cursor-pointer transition-all"
              >
                <span className="text-sage-900 text-center block">{occasion}</span>
              </SelectionCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestsStep;