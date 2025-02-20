import React, { FC } from 'react';
import TaskCard from './TaskCard';
import { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="flex flex-wrap px-2 py-2 gap-2 justify-between">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
