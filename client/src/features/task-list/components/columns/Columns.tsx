import { Suspense } from 'react';
import Column from './column/Column';
import CardSkeleton from '@/components/atoms/CardSkeleton';
import { cn } from '@/lib/utils';
import { getUserTasks } from '../../api/getUserTasks';
import { useUser } from '@clerk/clerk-react';
import { taskStatus } from '@/types';

const Columns = () => {
  const user = useUser();
  if (!user?.user?.id) return null;
  const fetch = getUserTasks(user.user.id);

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
        <Column fetch={fetch} status={taskStatus.PENDING} withInit={true} />
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
        <Column fetch={fetch} status={taskStatus.IN_PROGRESS} />
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
        <Column fetch={fetch} status={taskStatus.COMPLETED} />
      </Suspense>
    </section>
  );
};

export default Columns;
