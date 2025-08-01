import React from "react";

export interface FormInputProps {
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function FormInput({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    error,
    icon: Icon,
}: FormInputProps) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-sage-900 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sage-600" />
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full border rounded-lg px-3 py-2 text-sage-900 bg-cream ${
                        Icon ? "pl-10" : ""
                    } ${error ? "border-red-500" : "border-sage-200"}`}
                    placeholder={placeholder}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}