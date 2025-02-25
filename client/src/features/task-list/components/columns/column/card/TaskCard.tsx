import { Card, CardDescription } from '@/components/ui/card';
import { Icons } from '@/constants/icons';
import { cn } from '@/lib/utils';
import { Task, TaskStatus } from '@/types';
import { FC, startTransition, useState } from 'react';
import InputTaskForm from '../../../forms/InputTaskForm';
import { formActions } from '@/types/form-action';
import { isOverDate } from '@/utils';
import CommonConfirm from '@/components/molecules/CommonConfirm';
import { taskStatus } from '@/constants/task-status';
import { handleDelete } from '@/features/task-list/services/taskAction';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskCardInterface {
  task: Task;
  tasks: Task[];
  setOptimisticTasks: (tasks: Task[]) => void;
  isDragging?: boolean;
}

function markerColor(status: TaskStatus): string {
  switch (status) {
    case taskStatus.PENDING:
      return '#f58787';
    case taskStatus.IN_PROGRESS:
      return '#1E90FF';
    case taskStatus.COMPLETED:
      return '#32CD32';
    default: {
      const exhaustiveCheck: never = status as never;
      throw new Error(`Unhandled status case: ${exhaustiveCheck}`);
    }
  }
}
function getIsDelayAlert(dueDate: string, status: TaskStatus): boolean {
  return status !== taskStatus.COMPLETED && isOverDate(dueDate);
}

const TaskCard: FC<TaskCardInterface> = ({
  task,
  tasks,
  setOptimisticTasks,
  isDragging = false,
}) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const isDelayAlert = getIsDelayAlert(task.dueDate ?? '', task.status);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  // Setup sortable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition: dndTransition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  });
  // Apply drag styles
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: dndTransition
      ? `${dndTransition}, transform 0.3s ease`
      : 'transform 0.3s ease',
    opacity: isSortableDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };
  const handleDeleteTask = async () => {
    startTransition(async () => {
      await handleDelete(task.id, tasks, dispatch, setOptimisticTasks, token);
    });
  };

  // Prevent drag start on edit and delete buttons
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUpdateOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteOpen(true);
  };
  return (
    <>
      <Card
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={cn(
          'w-[280px] h-[132px] flex rounded flex-col space-y-2',
          'shadow-[0px_2px_3px_rgba(0,0,0,0.5)]',
          'rounded-sm',
          'backdrop-blur-sm',
          'p-2 pb-1 cursor-move',
          'transition-transform duration-300 hover:scale-105',
          isDragging || isSortableDragging ? 'scale-105 shadow-lg' : '',
          isDelayAlert ? 'bg-pink-100' : 'bg-white'
        )}
      >
        <div className="flex flex-1 space-x-2">
          <main className="flex-1 flex flex-col">
            <header>
              <h2
                className="relative inline-block font-semibold bg-no-repeat mb-2"
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
              onClick={handleEditClick}
            >
              <Icons.edit className="h-[18px] w-[18px] text-gray-600" />
            </div>
            <div
              className={cn(
                ' shadow-[0px_2px_3px_rgba(0,0,0,0.5)] text-gray-600',
                'p-1 rounded-full hover:bg-slate-300 cursor-pointer'
              )}
              onClick={handleDeleteClick}
            >
              <Icons.trash className="h-[18px] w-[18px]" />
            </div>
          </aside>
        </div>
        <section className="text-sm flex items-center justify-between">
          <div className="flex space-x-4 items-center">
            <div>予定:{task.expectedTime}分</div>
            <div
              className={cn({
                'text-red-500': (task.actualTime ?? 0) > task.expectedTime, // 実績 > 予定 の場合は赤
                'text-gray-600': (task.actualTime ?? 0) <= task.expectedTime, // それ以外は通常色
              })}
            >
              実績:{task.actualTime}分
            </div>
          </div>
          <div>
            <div
              className={cn(isDelayAlert ? 'text-red-500' : 'text-gray-600')}
            >
              期限:{task.dueDate}
            </div>
          </div>
        </section>
      </Card>
      {isUpdateOpen && (
        <InputTaskForm
          setOpen={setIsUpdateOpen}
          status={task.status}
          action={formActions.UPDATE}
          setOptimisticTasks={setOptimisticTasks}
          task={task}
        />
      )}
      {isDeleteOpen && (
        <CommonConfirm
          setOpen={setIsDeleteOpen}
          func={handleDeleteTask}
          title={'確認'}
          message={['削除しますか？']}
          cancelText="いいえ"
          executeText="はい"
        />
      )}
    </>
  );
};

export default TaskCard;
