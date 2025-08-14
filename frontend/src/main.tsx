import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/fallback/ErrorBoundry.tsx'
import LoadingScreen from './components/fallback/LoadingScreen.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>

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
    </Provider>
  </StrictMode>
)
