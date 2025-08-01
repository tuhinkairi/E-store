import React from 'react';

interface PlaceholderContentProps {
  message?: string;
}

const PlaceholderContent: React.FC<PlaceholderContentProps> = ({ 
  message = "Coming soon..." 
}) => {
  return (
    <div className="text-center py-12 text-sage-600">
      {message}
    </div>
  );
};

export default PlaceholderContent;