import Columns from './columns/Columns';
import Controller from './controllers/Controller';

const TaskListWrapper = () => {
  return (
    <main className="bg-gray-300 flex-1 flex flex-col space-y-5  sm:px-4">
      <Controller />
      <Columns />
    </main>
  );
};

export default TaskListWrapper;
