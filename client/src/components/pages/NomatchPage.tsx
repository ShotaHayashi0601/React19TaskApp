import { HEADER_HEIGHT, IMAGES } from '@/constants';
import { cn } from '@/lib/utils';
import React from 'react';

const NomatchPage = () => {
  return (
    <div
      style={{
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        marginTop: HEADER_HEIGHT,
      }}
      className={cn(
        'w-full',
        'bg-gray-100 flex items-center flex-col',
        'justify-center space-y-4'
      )}
    >
      <h1 className="text-3xl">Not Found</h1>
      <div className="w-[400px] h-[400px] max-w-full">
        <img src={IMAGES.NOT_FOUND.PATH} alt={IMAGES.NOT_FOUND.ALT}></img>
      </div>
    </div>
  );
};

export default NomatchPage;
