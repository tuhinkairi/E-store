import React, {type ReactNode,type MouseEventHandler } from "react";

interface SelectionCardProps {
  selected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
  className?: string;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  selected,
  onClick,
  children,
  className = "border-2 rounded-lg p-4 cursor-pointer transition-all"
}) => (
  <div
    onClick={onClick}
    className={`${className} ${selected
      ? 'border-sage-900 bg-sage-50'
      : 'border-sage-200 hover:border-sage-600'
      }`}
  >
    {children}
  </div>
);