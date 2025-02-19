'use client';

import { cn } from '@/lib/utils';
import TaskList from './card/TaskList';
import TaskHeader from './header/TaskHeader';
import { FC, use } from 'react';
import { TaskStatus } from '@/types';

interface ColumnProps {
  fetch: Promise<unknown>;
  status: TaskStatus;
}

const Column: FC<ColumnProps> = ({ fetch, status }) => {
  const tasks = use(fetch);
  console.log(tasks);
  return (
    <div
      className={cn(
        'min-w-[600px]',
        'shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),_0px_1px_1px_0px_rgba(0,0,0,0.14),_0px_1px_3px_0px_rgba(0,0,0,0.12)]',
        'rounded-md bg-slate-600 flex flex-1 flex-col overflow-auto max-h-[calc(100vh-144px)]'
      )}
    >
      <TaskHeader status={status} />
      <TaskList />
    </div>
  );
};

export default Column;
