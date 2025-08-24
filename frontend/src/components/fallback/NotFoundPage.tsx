import React from 'react';
import { ArrowLeft, Home, Search, ShoppingBag, MapPin } from 'lucide-react';
import type { NotFoundPageProps } from '../../types/fallback';


const NotFoundPage: React.FC<NotFoundPageProps> = ({ 
  onNavigateHome, 
  onNavigateBack,
  showSearchSuggestions = true 
}) => {
  const suggestions = [
    { icon: ShoppingBag, label: 'Browse Collections', path: '/collections' },
    { icon: Search, label: 'Search Products', path: '/search' },
    { icon: MapPin, label: 'Store Locations', path: '/stores' },
    { icon: Home, label: 'Return Home', path: '/' }
  ];

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Brand Header */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-sage-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-cream font-light text-3xl">E</span>
          </div>
          <h1 className="text-3xl font-light text-sage-900 tracking-wider mb-2">ELYSIAN</h1>
          <div className="w-24 h-px bg-sage-300 mx-auto"></div>
        </div>

        {/* 404 Section */}
        <div className="mb-12">
          <div className="text-8xl md:text-9xl font-light text-sage-300 mb-4 select-none">
            404
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-sage-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-sage-600 max-w-md mx-auto leading-relaxed">
            We couldn't find the page you're looking for. It may have been moved, 
            deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {onNavigateBack && (
            <button
              onClick={onNavigateBack}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-sage-300 text-sage-700 rounded-lg hover:bg-sage-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          )}
          
          <button
            onClick={onNavigateHome}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-sage-900 text-cream rounded-lg hover:bg-sage-800 transition-colors"
          >
            <Home className="w-5 h-5" />
            Return Home
          </button>
        </div>

        {/* Suggestions */}
        {showSearchSuggestions && (
          <div className="border-t border-sage-200 pt-12">
            <h3 className="text-xl font-light text-sage-900 mb-8">
              Perhaps you were looking for:
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <button
                    key={index}
                    className="group p-6 bg-white border border-sage-200 rounded-lg hover:border-sage-300 hover:shadow-sm transition-all"
                    onClick={() => {
                      // Handle navigation to suggestion.path
                      // console.log(`Navigate to ${suggestion.path}`);
                    }}
                  >
                    <Icon className="w-8 h-8 text-sage-600 group-hover:text-sage-900 mx-auto mb-3 transition-colors" />
                    <p className="text-sage-700 group-hover:text-sage-900 font-medium transition-colors">
                      {suggestion.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="mt-16 opacity-50">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-sage-300 rounded-full"></div>
            <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
            <div className="w-2 h-2 bg-sage-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;