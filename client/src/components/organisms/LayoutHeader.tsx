import { APP_PARAMS, HEADER_HEIGHT } from '@/constants';
import { cn } from '@/lib/utils';
import ScrollLogoButton from '../atoms/ScrollLogoButton';
import { SignedIn, UserButton } from '@clerk/clerk-react';

const LayoutHeader = () => {
  return (
    <div
      style={{
        height: `${HEADER_HEIGHT}px`,
      }}
      className={cn(
        'px-4 py-2',
        'w-full fixed z-10 top-0 left-0 right-0',
        'bg-white/25 shadow-[0_1px_4px_0_rgba(31,38,135,0.37)] backdrop-blur-[0px] border border-base-white/18',
        'flex items-center justify-between'
      )}
    >
      <div className="flex items-center space-x-4">
        <ScrollLogoButton />
        <h2 className="text-gray-800 font-semibold text-xl leading-3">
          {APP_PARAMS.NAME}
        </h2>
      </div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default LayoutHeader;
