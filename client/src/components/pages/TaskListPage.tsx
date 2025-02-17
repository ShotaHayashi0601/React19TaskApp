import { HEADER_HEIGHT } from '@/constants';
import { cn } from '@/lib/utils';
import TaskListWrapper from '@/features/task-list/components/TaskListWrapper';

const TaskListPage = () => {
  return (
    <div
      style={{
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        marginTop: HEADER_HEIGHT,
      }}
      className={cn('w-full', 'bg-gray-100 flex flex-col')}
    >
      <TaskListWrapper />
    </div>
  );
};

export default TaskListPage;
