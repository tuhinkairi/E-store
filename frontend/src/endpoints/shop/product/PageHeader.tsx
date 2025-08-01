import React from 'react';
import type { PageHeaderProps } from '../../../types/product';

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-light text-sage-900 mb-4">
        {title}
      </h1>
      <p className="text-lg text-sage-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default PageHeader;