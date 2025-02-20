import { Card, CardDescription } from '@/components/ui/card';
import { Icons } from '@/constants/icons';
import { cn } from '@/lib/utils';
import { Task, taskStatus, TaskStatus } from '@/types';
import { FC, useState } from 'react';
import InputTaskForm from '../../../forms/InputTaskForm';
import { formActions } from '@/types/form-action';

interface TaskCardInterface {
  task: Task;
  setOptimisticTasks: (tasks: Task[]) => void;
}

const markerColor = (status: TaskStatus): string => {
  switch (status) {
    case taskStatus.PENDING:
      return '#f58787';
    case taskStatus.IN_PROGRESS:
      return '#1E90FF';
    case taskStatus.COMPLETED:
      return '#32CD32';
    default: {
      const exhaustiveCheck: never = status;
      throw new Error(`Unhandled status case: ${exhaustiveCheck}`);
    }
  }
};

const TaskCard: FC<TaskCardInterface> = ({ task, setOptimisticTasks }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Card
      className={cn(
        'w-[280px] h-[120px] flex rounded flex-col space-y-2',
        'shadow-[0px_2px_3px_rgba(0,0,0,0.5)]',
        'rounded-sm ',
        // 'hover:bg-[rgba(255,255,255,0.8)]',
        'backdrop-blur-sm',
        'bg-[rgba(255,255,255,1)]',
        'p-2 pb-1'
      )}
    >
      <div className="flex flex-1 space-x-2">
        <main className="flex-1 flex flex-col">
          <header>
            <h2
              className="relative inline-block font-semibold bg-no-repeat "
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent 60%, ${markerColor(
                  task.status
                )} 60%)`,
              }}
            >
              {task.title}
            </h2>
          </header>
          <section className="flex flex-col flex-1">
            <CardDescription className="text-sm flex-1">
              {task.description}
            </CardDescription>
          </section>
        </main>
        <aside className="flex flex-col items-center space-y-3">
          <div
            className={cn(
              ' shadow-[0px_2px_3px_rgba(0,0,0,0.5)]',
              'p-1 rounded-full hover:bg-slate-300 cursor-pointer'
            )}
            onClick={() => setOpen(true)}
          >
            <Icons.edit className="h-[18px] w-[18px] text-gray-600" />
          </div>
          <div
            className={cn(
              ' shadow-[0px_2px_3px_rgba(0,0,0,0.5)] text-gray-600',
              'p-1 rounded-full hover:bg-slate-300 cursor-pointer'
            )}
          >
            <Icons.trash className="h-[18px] w-[18px]" />
          </div>
        </aside>
      </div>
      <section className="text-sm flex items-center justify-between">
        <div className="flex space-x-4 items-center">
          <div>予定:{task.expectedTime}分</div>
          <div>実績:{task.actualTime}分</div>
        </div>
        <div>
          <div>期限:{task.dueDate}</div>
        </div>
      </section>
      {isOpen && (
        <InputTaskForm
          setOpen={setOpen}
          status={task.status}
          action={formActions.UPDATE}
          setOptimisticTasks={setOptimisticTasks}
        />
      )}
    </Card>
  );
};

export default TaskCard;
