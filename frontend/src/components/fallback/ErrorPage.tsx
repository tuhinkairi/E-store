import React, { useState } from 'react';
import { 
  RefreshCw, 
  Home, 
  AlertTriangle, 
  Mail, 
  ChevronDown, 
  ChevronUp,
  Copy,
  Check
} from 'lucide-react';
import type { ErrorPageProps } from '../../types/fallback';


const ErrorPage: React.FC<ErrorPageProps> = ({
  error,
  errorInfo,
  onRetry,
  onNavigateHome,
  showTechnicalDetails = true,
  supportEmail = 'support@elysian.com'
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyError = async () => {
    const errorText = `Error: ${error?.message || 'Unknown error'}\n\nStack: ${error?.stack || 'No stack trace'}\n\nInfo: ${errorInfo || 'No additional info'}`;
    
    try {
      await navigator.clipboard.writeText(errorText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy error details', err);
    }
  };

  const getErrorTitle = () => {
    if (error?.name === 'ChunkLoadError') return 'Update Required';
    if (error?.name === 'NetworkError') return 'Connection Issue';
    return 'Something Went Wrong';
  };

  const getErrorMessage = () => {
    if (error?.name === 'ChunkLoadError') {
      return 'We\'ve updated our application. Please refresh the page to get the latest version.';
    }
    if (error?.name === 'NetworkError') {
      return 'We\'re having trouble connecting to our servers. Please check your internet connection and try again.';
    }
    return 'We encountered an unexpected error. Our team has been notified and is working on a fix.';
  };

  const getErrorIcon = () => {
    if (error?.name === 'ChunkLoadError') return '🔄';
    if (error?.name === 'NetworkError') return '📡';
    return '⚠️';
  };

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

        {/* Error Icon */}
        <div className="text-6xl mb-8">
          {getErrorIcon()}
        </div>

        {/* Error Content */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-sage-900 mb-6">
            {getErrorTitle()}
          </h2>
          <p className="text-lg text-sage-600 max-w-lg mx-auto leading-relaxed mb-8">
            {getErrorMessage()}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-sage-900 text-cream rounded-lg hover:bg-sage-800 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
            )}
            
            <button
              onClick={onNavigateHome}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-sage-300 text-sage-700 rounded-lg hover:bg-sage-50 transition-colors"
            >
              <Home className="w-5 h-5" />
              Return Home
            </button>
          </div>
        </div>

        {/* Technical Details */}
        {showTechnicalDetails && (error || errorInfo) && (
          <div className="border-t border-sage-200 pt-8">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-center gap-2 text-sage-600 hover:text-sage-800 mx-auto mb-4 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              Technical Details
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDetails && (
              <div className="bg-sage-50 border border-sage-200 rounded-lg p-6 text-left">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-sage-900">Error Information</h4>
                  <button
                    onClick={handleCopyError}
                    className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-800 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                
                {error && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-sage-700 mb-1">Error Message:</p>
                    <p className="text-sm text-sage-600 bg-white p-3 rounded border font-mono break-all">
                      {error.message}
                    </p>
                  </div>
                )}

                {error?.stack && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-sage-700 mb-1">Stack Trace:</p>
                    <pre className="text-xs text-sage-600 bg-white p-3 rounded border overflow-auto max-h-32">
                      {error.stack}
                    </pre>
                  </div>
                )}

                {errorInfo && (
                  <div>
                    <p className="text-sm font-medium text-sage-700 mb-1">Additional Info:</p>
                    <pre className="text-xs text-sage-600 bg-white p-3 rounded border overflow-auto max-h-32">
                      {errorInfo}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Support Contact */}
        <div className="mt-12 p-6 bg-white border border-sage-200 rounded-lg">
          <h3 className="text-lg font-medium text-sage-900 mb-2">Need Help?</h3>
          <p className="text-sage-600 mb-4">
            If this problem persists, please contact our support team.
          </p>
          <a
            href={`mailto:${supportEmail}`}
            className="inline-flex items-center gap-2 text-sage-700 hover:text-sage-900 font-medium transition-colors"
          >
            <Mail className="w-4 h-4" />
            {supportEmail}
          </a>
        </div>

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

export default ErrorPage;