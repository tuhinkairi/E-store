import React from "react";

type CheckboxInputProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
};

const CheckboxInput: React.FC<CheckboxInputProps> = ({ checked, onChange, label, description }) => (
  <label className="flex items-start space-x-3 p-4 border border-sage-200 rounded-lg cursor-pointer hover:bg-sage-50">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-1"
    />
    <div>
      <span className="text-sage-900 font-medium block">{label}</span>
      {description && <span className="text-sm text-sage-600">{description}</span>}
    </div>
  </label>
);

export default CheckboxInput;