import React, { useState, useEffect } from 'react';
import type { LoadingScreenProps } from '../../types/fallback';


const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  fullScreen = false, 
  size = 'medium',
  customMessages
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [dots, setDots] = useState('');

  const defaultMessages = [
    'Loading your experience',
    'Preparing something beautiful',
    'Curating your collection',
    'Almost ready',
    'Just a moment more'
  ];

  const messages = customMessages || defaultMessages;

  // Cycle through messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(messageInterval);
  }, [messages.length]);

  // Animate dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-xl'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-cream flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        {/* Brand Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-sage-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-cream font-light text-2xl">E</span>
          </div>
          <h1 className="text-2xl font-light text-sage-900 tracking-wider">ELYSIAN</h1>
        </div>

        {/* Loading Spinner */}
        <div className="mb-8">
          <div className={`${sizeClasses[size]} border-3 border-sage-200 border-t-sage-900 rounded-full animate-spin mx-auto`}></div>
        </div>

        {/* Dynamic Text */}
        <div className="space-y-2">
          <p className={`${textSizeClasses[size]} font-light text-sage-900 transition-opacity duration-500`}>
            {messages[currentMessageIndex]}
            <span className="inline-block w-4 text-left">{dots}</span>
          </p>
          <p className="text-sm text-sage-600">
            Crafting your perfect experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="w-full bg-sage-200 rounded-full h-1">
            <div 
              className="bg-sage-900 h-1 rounded-full transition-all duration-1000 ease-in-out"
              style={{
                width: `${((currentMessageIndex + 1) / messages.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;