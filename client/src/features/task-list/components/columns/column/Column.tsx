'use client';

import { cn } from '@/lib/utils';
import TaskList from './card/TaskList';
import TaskHeader from './header/TaskHeader';
import { FC, use } from 'react';
import { Task, TaskStatus } from '@/types';
import { useDroppable } from '@dnd-kit/core';
interface ColumnProps {
  fetchForSkeleton: Promise<Task[]>;
  status: TaskStatus;
  optimisticTasks: Task[];
  setOptimisticTasks: (tasks: Task[]) => void;
}

const Column: FC<ColumnProps> = ({
  fetchForSkeleton,
  status,
  optimisticTasks,
  setOptimisticTasks,
}) => {
  use(fetchForSkeleton);

  // Make column droppable
  const { setNodeRef, isOver } = useDroppable({
    id: `column-${status}`,
    data: {
      type: 'column',
      status,
    },
  });

  const filteredTasks = optimisticTasks
    .filter((task) => task.status === status)
    .sort((a, b) => a.order - b.order); // Sort by order

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'cursor-move',
        'min-w-[600px]',
        'shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),_0px_1px_1px_0px_rgba(0,0,0,0.14),_0px_1px_3px_0px_rgba(0,0,0,0.12)]',
        'rounded-md flex flex-1 flex-col overflow-auto max-h-[calc(100vh-144px)]',
        isOver ? 'bg-slate-500' : 'bg-slate-600', // Highlight when dragging over
        'transition-colors duration-200'
      )}
    >
      <TaskHeader
        status={status}
        setOptimisticTasks={setOptimisticTasks}
        optimisticTasks={optimisticTasks}
      />
      <TaskList
        tasks={filteredTasks}
        setOptimisticTasks={setOptimisticTasks}
        status={status}
      />
    </div>
  );
};

export default Column;
