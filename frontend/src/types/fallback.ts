
export interface LoadingScreenProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  customMessages?: string[];
}

export interface NotFoundPageProps {
  onNavigateHome?: () => void;
  onNavigateBack?: () => void;
  showSearchSuggestions?: boolean;
}

export interface ErrorPageProps {
  error?: Error;
  errorInfo?: string|null;
  onRetry?: () => void;
  onNavigateHome?: () => void;
  showTechnicalDetails?: boolean;
  supportEmail?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

// export interface SuggestionItem {
//   icon: React.ComponentType<{ className?: string }>;
//   label: string;
//   path: string;
// }

export type LoadingSize = 'small' | 'medium' | 'large';
export type ErrorType = 'ChunkLoadError' | 'NetworkError' | 'Unknown';