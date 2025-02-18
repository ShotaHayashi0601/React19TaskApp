import { HEADER_HEIGHT } from '@/constants';
import { cn } from '@/lib/utils';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div
      style={{
        minHeight: `calc(100vh - ${HEADER_HEIGHT ?? 64}px)`,
        marginTop: HEADER_HEIGHT,
      }}
      className={cn(
        'w-full',
        'bg-gray-100 flex items-center flex-col',
        'justify-center space-y-4'
      )}
    >
      <SignIn />
    </div>
  );
};

export default SignInPage;
