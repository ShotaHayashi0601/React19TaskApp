import React, { FC } from 'react';
import TaskCard from './TaskCard';
import { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  setOptimisticTasks: (tasks: Task[]) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, setOptimisticTasks }) => {
  return (
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
  );
};

export default TaskList;
