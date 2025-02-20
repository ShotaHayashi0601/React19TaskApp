import AddTaskButton from '../../../buttons/AddTaskButton';
import { cn } from '@/lib/utils';
import { Task, taskStatus, TaskStatus } from '@/types';
import { FC, useState } from 'react';
import InputTaskForm from '../../../forms/InputTaskForm';
import { formActions } from '@/types/form-action';

interface TaskHeaderProps {
  status: TaskStatus;
  setOptimisticTasks: (tasks: Task[]) => void;
}
const bgColor = (status: TaskStatus): string => {
  switch (status) {
    case taskStatus.PENDING:
      return 'bg-taskStatus-background-pending-main';
    case taskStatus.IN_PROGRESS:
      return 'bg-taskStatus-background-progress-main';
    case taskStatus.COMPLETED:
      return 'bg-taskStatus-background-completed-main';
    default: {
      const exhaustiveCheck: never = status;
      throw new Error(`Unhandled status case: ${exhaustiveCheck}`);
    }
  }
};
const TaskHeader: FC<TaskHeaderProps> = ({ status, setOptimisticTasks }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          'shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),_0px_1px_1px_0px_rgba(0,0,0,0.14),_0px_1px_3px_0px_rgba(0,0,0,0.12)]',
          'w-full px-4 py-2 bg-gray-50 flex justify-between items-center'
        )}
      >
        <div className={`${bgColor(status)} py-2 px-2 rounded-[.5rem]`}>
          <h2 className="md:text-[16px] text-white">未着手</h2>
        </div>
        <AddTaskButton text={'追加'} onClick={() => setOpen(true)} />
      </div>
      {isOpen && (
        <InputTaskForm
          setOpen={setOpen}
          status={status}
          action={formActions.ADD}
          setOptimisticTasks={setOptimisticTasks}
        />
      )}
    </>
  );
};

export default TaskHeader;
