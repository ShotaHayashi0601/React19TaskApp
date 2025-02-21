import { Suspense, useEffect, useMemo, useOptimistic } from 'react';
import Column from './column/Column';
import CardSkeleton from '@/components/atoms/CardSkeleton';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/clerk-react';
import { fetchTasks } from '@/redux/slices/TaskSlice';

import { getUserTasks } from '../../api/getUserTasks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { taskStatus } from '@/constants/task-status';

const Columns = () => {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const { taskList: tasks } = useAppSelector((state) => state.task);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);
  console.log(tasks, optimisticTasks);
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTasks(user.id));
    }
  }, [user, dispatch]);
  //for Skeleton
  // const fetchTasksForSkeleton = useCallback(async () => {
  //   if (!user?.id) return [];
  //   return await getUserTasks(user.id);
  // }, [user?.id]);
  const fetchTasksForSkeleton = useMemo(() => {
    return getUserTasks(user?.id);
  }, []);
  if (!user?.id) return null;

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
          optimisticTasks={optimisticTasks}
          setOptimisticTasks={setOptimisticTasks}
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
          optimisticTasks={optimisticTasks}
          setOptimisticTasks={setOptimisticTasks}
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
          optimisticTasks={optimisticTasks}
          setOptimisticTasks={setOptimisticTasks}
        />
      </Suspense>
    </section>
  );
};

export default Columns;
