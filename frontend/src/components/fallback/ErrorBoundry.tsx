import { Component,type ErrorInfo} from 'react';
import ErrorPage from './ErrorPage';
import type { ErrorBoundaryProps } from '../../types/fallback';

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleNavigateHome = () => {
    // In a real app, you'd use your router here
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, use the default ErrorPage
      return (
        <ErrorPage
          error={this.state.error || undefined}
          errorInfo={this.state.errorInfo?.componentStack}
          onRetry={this.handleRetry}
          onNavigateHome={this.handleNavigateHome}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;