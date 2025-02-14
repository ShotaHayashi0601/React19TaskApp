import { PATHS } from '@/constants';
import { ClerkProvider } from '@clerk/clerk-react';
import React, { FC } from 'react';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file');
}
interface ClerkProvideWrapperProps {
  children: React.ReactNode;
}

const ClerkProvideWrapper: FC<ClerkProvideWrapperProps> = ({ children }) => {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl={PATHS.SIGN_IN}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkProvideWrapper;
