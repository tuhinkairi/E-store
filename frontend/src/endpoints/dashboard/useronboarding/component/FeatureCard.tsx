import React from "react";

type FeatureCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="text-center space-y-3">
    <div className="w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center mx-auto">
      <Icon className="h-6 w-6 text-sage-900" />
    </div>
    <h3 className="font-medium text-sage-900">{title}</h3>
    <p className="text-sm text-sage-600">{description}</p>
  </div>
);