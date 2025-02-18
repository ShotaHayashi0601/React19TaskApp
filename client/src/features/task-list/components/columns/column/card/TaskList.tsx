import React from 'react';
import TaskCard from './TaskCard';

const TaskList = () => {
  return (
    <div className="flex flex-wrap px-2 py-2 gap-2 justify-between">
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
};

export default TaskList;
