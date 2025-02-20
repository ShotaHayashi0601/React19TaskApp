import { Suspense, useEffect } from 'react';
import Column from './column/Column';
import CardSkeleton from '@/components/atoms/CardSkeleton';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/clerk-react';
import { fetchTasks, TaskState } from '@/redux/slices/TaskSlice';

import { Task, TaskStatus, taskStatus } from '@/types';
import { getUserTasks } from '../../api/getUserTasks';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const Columns = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { taskList: tasks } = useSelector<TaskState>(
    (state) => state.task.taskList
  );
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTasks(user.id));
    }
  }, [user, dispatch]);
  if (!user?.id) return null;
  //for Skeleton
  const fetchTasksForSkeleton = getUserTasks(user.id);

  return (
    <section className="flex justify-between gap-5 flex-1 py-3 overflow-x-auto">
      <Suspense
        fallback={
          <div
            className={cn(
              'min-w-[600px]',
              'shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),_0px_1px_1px_0px_rgba(0,0,0,0.14),_0px_1px_3px_0px_rgba(0,0,0,0.12)]',
              'rounded-xl bg-slate-600 flex flex-1 flex-col overflow-auto max-h-[calc(100vh-144px)]'
            )}
          >
            <CardSkeleton height="100vh" />
          </div>
        }
      >
        <Column
          fetchForSkeleton={fetchTasksForSkeleton}
          status={taskStatus.PENDING}
          tasks={tasks}
        />
      </Suspense>
      <Suspense
        fallback={
          <div
            className={cn(
              'min-w-[600px]',
              'shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),_0px_1px_1px_0px_rgba(0,0,0,0.14),_0px_1px_3px_0px_rgba(0,0,0,0.12)]',
              'rounded-xl bg-slate-600 flex flex-1 flex-col overflow-auto max-h-[calc(100vh-144px)]'
            )}
          >
            <CardSkeleton height="100vh" />
          </div>
        }
      >
        <Column
          fetchForSkeleton={fetchTasksForSkeleton}
          status={taskStatus.IN_PROGRESS}
          tasks={tasks}
        />
      </Suspense>
      <Suspense
        fallback={
          <div
            className={cn(
              'min-w-[600px]',
              'shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),_0px_1px_1px_0px_rgba(0,0,0,0.14),_0px_1px_3px_0px_rgba(0,0,0,0.12)]',
              'rounded-xl bg-slate-600 flex flex-1 flex-col overflow-auto max-h-[calc(100vh-144px)]'
            )}
          >
            <CardSkeleton height="100vh" />
          </div>
        }
      >
        <Column
          fetchForSkeleton={fetchTasksForSkeleton}
          status={taskStatus.COMPLETED}
          tasks={tasks}
        />
      </Suspense>
    </section>
  );
};

export default Columns;
