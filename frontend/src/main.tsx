import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <style scoped  >{`
        .bg-cream { background-color: var(--cream); }
        .text-cream { color: var(--cream); }
        .bg-sage-50 { background-color: var(--sage-50); }
        .bg-sage-200 { background-color: var(--sage-200); }
        .text-sage-600 { color: var(--sage-600); }
        .text-sage-700 { color: var(--sage-700); }
        .text-sage-800 { color: var(--sage-800); }
        .bg-sage-800 { background-color: var(--sage-800); }
        .text-sage-900 { color: var(--sage-900); }
        .bg-sage-900 { background-color: var(--sage-900); }
        .text-gold-400 { color: var(--gold-400); }
        .text-gold-600 { color: var(--gold-600); }
        .bg-gold-500 { background-color: var(--gold-500); }
        .bg-gold-600 { background-color: var(--gold-600); }
        .border-gold-400 { border-color: var(--gold-400); }
        .border-gold-500 { border-color: var(--gold-500); }
        .border-gold-600 { border-color: var(--gold-600); }
        .border-sage-200 { border-color: var(--sage-200); }
        .border-sage-800 { border-color: var(--sage-800); }
        .hover\\:text-gold-400:hover { color: var(--gold-400); }
        .hover\\:text-gold-600:hover { color: var(--gold-600); }
        .hover\\:bg-gold-500:hover { background-color: var(--gold-500); }
        .hover\\:bg-sage-800:hover { background-color: var(--sage-800); }
        .hover\\:border-sage-800:focus { border-color: var(--sage-800); }
        .placeholder-sage-600::placeholder { color: var(--sage-600); }
        .from-sage-900\\/80 { --tw-gradient-from: rgba(42, 58, 26, 0.8); }
        .via-sage-800\\/40 { --tw-gradient-via: rgba(74, 90, 58, 0.4); }
        .bg-sage-900\\/20 { background-color: rgba(42, 58, 26, 0.2); }
        .text-cream\\/90 { color: rgba(248, 246, 240, 0.9); }
        .text-cream\\/80 { color: rgba(248, 246, 240, 0.8); }
        .text-cream\\/70 { color: rgba(248, 246, 240, 0.7); }
        .text-cream\\/60 { color: rgba(248, 246, 240, 0.6); }
        .border-cream\\/50 { border-color: rgba(248, 246, 240, 0.5); }
        .border-cream\\/20 { border-color: rgba(248, 246, 240, 0.2); }
        .border-sage-200\\/30 { border-color: rgba(229, 231, 225, 0.3); }
      `}</style>
    </BrowserRouter>
  </StrictMode>
)
