import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { OutcomeProvider } from './context/provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OutcomeProvider>
      <App />
    </OutcomeProvider>
  </StrictMode>,
)
