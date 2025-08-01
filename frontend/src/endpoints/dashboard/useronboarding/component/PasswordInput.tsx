import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import type { FormInputProps } from "./FormInput";

const PasswordInput = ({
    label,
    value,
    onChange,
    placeholder,
    required = false,
    error
}: FormInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-sage-900 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-600" />
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full border rounded-lg pl-10 pr-10 py-2 text-sage-900 bg-cream ${error ? 'border-red-500' : 'border-sage-200'
                        }`}
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-600"
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};
export default PasswordInput