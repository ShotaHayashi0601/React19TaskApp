'use client';

import { cn } from '@/lib/utils';
import TaskHeader from './header/TaskHeader';
import { FC } from 'react';
import { TaskStatus } from '@/types';
import { Icons } from '@/constants/icons';

interface ErrorFallbackProps {
  status: TaskStatus;
}

const ErroFallback: FC<ErrorFallbackProps> = ({ status }) => {
  return (
    <div
      className={cn(
        'cursor-move',
        'min-w-[600px]',
        'shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),_0px_1px_1px_0px_rgba(0,0,0,0.14),_0px_1px_3px_0px_rgba(0,0,0,0.12)]',
        'rounded-md bg-slate-600 flex flex-1 flex-col overflow-auto max-h-[calc(100vh-144px)]'
      )}
    >
      <TaskHeader status={status} />
      <div className="flex-1">
        <div className="flex flex-col space-y-4 justify-center items-center h-full">
          <Icons.alert className="w-10 h-10 text-white" />
          <div className="text-white text-xl">エラーが発生しました</div>
        </div>
      </div>
    </div>
  );
};

export default ErroFallback;
