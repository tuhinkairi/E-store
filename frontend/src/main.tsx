import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/fallback/ErrorBoundry.tsx'
import LoadingScreen from './components/fallback/LoadingScreen.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary
        onError={(error, errorInfo) => {
          // Log to analytics service
          console.error('Application Error:', error, errorInfo);
        }}
      >
        <Suspense fallback={<LoadingScreen fullScreen />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
)
