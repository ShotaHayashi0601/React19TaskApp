import React, { FC } from 'react';
import TaskCard from './TaskCard';
import { Task, TaskStatus } from '@/types';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
interface TaskListProps {
  status: TaskStatus;
  tasks: Task[];
  setOptimisticTasks: (tasks: Task[]) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, setOptimisticTasks }) => {
  const taskIds = tasks.map((task) => task.id);
  return (
    <SortableContext items={taskIds} strategy={rectSortingStrategy}>
      <div className="flex flex-wrap px-2 py-2 gap-2 justify-between">
        {tasks.map((task) => (
          <TaskCard
            tasks={tasks}
            key={task.id}
            task={task}
            setOptimisticTasks={setOptimisticTasks}
          />
        ))}
      </div>
    </SortableContext>
  );
};

export default TaskList;
