import { HEADER_HEIGHT } from '@/constants';
import { cn } from '@/lib/utils';
import React from 'react';

const TaskListPage = () => {
  return (
    <div
      style={{
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        marginTop: HEADER_HEIGHT,
      }}
      className={cn('w-full', 'bg-gray-100')}
    >
      TaskList
    </div>
  );
};

export default TaskListPage;
