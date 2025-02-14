import { HEADER_HEIGHT } from '@/constants';
import { cn } from '@/lib/utils';
import { SignUp } from '@clerk/clerk-react';
import React from 'react';

const SignUpPage = () => {
  return (
    <div
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      className={cn(
        'w-full',
        'bg-gray-100 flex items-center flex-col',
        'justify-center space-y-4'
      )}
    >
      <SignUp />
    </div>
  );
};

export default SignUpPage;
