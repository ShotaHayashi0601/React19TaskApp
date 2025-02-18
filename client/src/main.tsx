import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ClerkProvideWrapper from './providers/ClerkProvideWrapper.tsx';
import ReduxProvider from './providers/ReduxProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvideWrapper>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </ClerkProvideWrapper>
  </StrictMode>
);
