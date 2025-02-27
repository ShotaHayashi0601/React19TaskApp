import AddTaskButton from '../../../buttons/AddTaskButton';
import { cn } from '@/lib/utils';
import { Task, TaskStatus } from '@/types';
import { FC, useState } from 'react';
import InputTaskForm from '../../../forms/InputTaskForm';
import { formActions } from '@/types/form-action';
import { taskStatus, taskStatusName } from '@/constants/task-status';
import { calculateStatusTime } from '@/features/task-list/utils/taskSummary';

interface TaskHeaderProps {
  status: TaskStatus;
  setOptimisticTasks?: (tasks: Task[]) => void;
  optimisticTasks: Task[];
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
function isOver(actualTime: string, expectedTime: string): boolean {
  const actual = actualTime.split(':');
  const expected = expectedTime.split(':');
  const actualTotal = Number(actual[0]) * 60 + Number(actual[1]);
  const expectedTotal = Number(expected[0]) * 60 + Number(expected[1]);
  return actualTotal > expectedTotal;
}
const TaskHeader: FC<TaskHeaderProps> = ({
  status,
  setOptimisticTasks,
  optimisticTasks,
}) => {
  const [isOpen, setOpen] = useState(false);
  const summary = calculateStatusTime(optimisticTasks, status);
  return (
    <>
      <div
        className={cn(
          'shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),_0px_1px_1px_0px_rgba(0,0,0,0.14),_0px_1px_3px_0px_rgba(0,0,0,0.12)]',
          'w-full px-4 py-2 bg-gray-50 flex justify-between items-center'
        )}
      >
        <div className="flex items-center space-x-4">
          <div
            className={`${bgColor(
              status
            )} py-2 pl-2 rounded-[.5rem] w-[80px] text-center`}
          >
            <h2 className="md:text-sm text-white tracking-[.5rem]">
              {taskStatusName[status]}
            </h2>
          </div>
          <div className="flex space-x-4 text-gray-800">
            <div>
              <div className="text-xs -mb-1">予定</div>
              <div>
                {summary.expectedTime.split(':')[0]}
                <span className="text-xs">時間</span>
                {summary.expectedTime.split(':')[1]}
                <span className="text-xs">分</span>
              </div>
            </div>
            <div
              className={cn({
                'text-red-500': isOver(
                  summary.actualTime,
                  summary.expectedTime
                ), // 実績 > 予定 の場合は赤
                // それ以外は通常色
              })}
            >
              <div className="text-xs -mb-1">実績</div>
              <div>
                {summary.actualTime.split(':')[0]}
                <span className="text-xs">時間</span>
                {summary.actualTime.split(':')[1]}
                <span className="text-xs">分</span>
              </div>
            </div>
          </div>
        </div>

        <AddTaskButton text={'追加'} onClick={() => setOpen(true)} />
      </div>
      {isOpen && setOptimisticTasks && (
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
