import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ClerkProvideWrapper from './providers/ClerkProvideWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvideWrapper>
      <App />
    </ClerkProvideWrapper>
  </StrictMode>
);
