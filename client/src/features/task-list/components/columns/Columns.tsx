import {
  startTransition,
  Suspense,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
} from 'react';
import Column from './column/Column';
import CardSkeleton from '@/components/atoms/CardSkeleton';
import { cn } from '@/lib/utils';
import { fetchTasks } from '@/redux/slices/taskSlice';

import { getUserTasks } from '../../api/getUserTasks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { taskStatus } from '@/constants/task-status';
import { ErrorBoundary } from 'react-error-boundary';
import ErroFallback from './column/ErrorFallback';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '@/types';
import TaskCard from './column/card/TaskCard';
import { updateTaskOrdersAndStatus } from '../../lib/dndUtils';
import { handleReorder } from '../../services/taskAction';

const Columns = () => {
  const dispatch = useAppDispatch();
  const { taskList: tasks } = useAppSelector((state) => state.task);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    if (token) {
      // ✅ トークンも一緒に渡す
      dispatch(fetchTasks({ token: token }));
    }
  }, [dispatch, token]);

  // 表示用のフェッチ処理（学習のため実装している）

  const fetchTasksForSkeleton = useMemo(() => {
    if (!token) return;
    return getUserTasks(token);
  }, [token]);
  if (!token) return null;

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeTaskId = active.id as string;
    const foundTask = optimisticTasks.find(
      (task: Task) => task.id === activeTaskId
    );
    if (foundTask) {
      setActiveTask(foundTask);
    }
  };
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeTaskId = active.id as string;
    // ① overがタスクを指しているか、カラムを指しているかで分岐
    const overData = over.data.current;

    // ▼ カラム上にドロップされた場合
    if (overData?.type === 'column') {
      const targetStatus = overData.status as TaskStatus;
      // カラム末尾に挿入するイメージで order を再計算する
      const maxOrderInTarget = Math.max(
        0,
        ...optimisticTasks
          .filter((t) => t.status === targetStatus)
          .map((t) => t.order)
      );
      const newTasks = optimisticTasks.map((t) => {
        if (t.id === activeTaskId) {
          return {
            ...t,
            status: targetStatus,
            order: maxOrderInTarget + 1, // 末尾へ配置
          };
        }
        return t;
      });
      startTransition(async () => {
        await handleReorder(newTasks, dispatch, setOptimisticTasks, token);
      });

      setActiveTask(null);
      return;
    }

    // ▼ タスク上にドロップされた場合
    const overTaskId = over.id as string;
    if (activeTaskId !== overTaskId) {
      const activeIndex = optimisticTasks.findIndex(
        (task) => task.id === activeTaskId
      );
      const overIndex = optimisticTasks.findIndex(
        (task) => task.id === overTaskId
      );

      // 見つからなければ終了
      if (activeIndex === -1 || overIndex === -1) {
        setActiveTask(null);
        return;
      }

      // ドロップ先タスクのステータスを取得し、arrayMoveで順番入れ替え
      const targetStatus = optimisticTasks[overIndex].status;
      const updatedTasks = arrayMove(
        [...optimisticTasks],
        activeIndex,
        overIndex
      );

      // order・status を再計算
      const newTasksWithUpdatedOrders = updateTaskOrdersAndStatus(
        updatedTasks,
        activeTaskId,
        targetStatus
      );
      startTransition(async () => {
        await handleReorder(
          newTasksWithUpdatedOrders,
          dispatch,
          setOptimisticTasks,
          token
        );
      });
    }

    setActiveTask(null);
  };

  // Custom drag overlay (what appears under cursor during drag)
  const renderDragOverlay = () => {
    // if (!activeTask) return null;

    return (
      <DragOverlay>
        {activeTask && (
          <TaskCard
            task={activeTask}
            tasks={optimisticTasks}
            setOptimisticTasks={setOptimisticTasks}
            isDragging={true}
          />
        )}
      </DragOverlay>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <section className="flex justify-between gap-5 flex-1 py-3 overflow-x-auto">
        <ErrorBoundary
          fallback={<ErroFallback status={taskStatus.PENDING} />}
          onReset={() => dispatch(fetchTasks({ token: token }))}
        >
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
              fetchForSkeleton={fetchTasksForSkeleton!}
              status={taskStatus.PENDING}
              optimisticTasks={optimisticTasks}
              setOptimisticTasks={setOptimisticTasks}
            />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary
          fallback={<ErroFallback status={taskStatus.IN_PROGRESS} />}
          onReset={() => dispatch(fetchTasks({ token: token }))}
        >
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
              fetchForSkeleton={fetchTasksForSkeleton!}
              status={taskStatus.IN_PROGRESS}
              optimisticTasks={optimisticTasks}
              setOptimisticTasks={setOptimisticTasks}
            />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary
          fallback={<ErroFallback status={taskStatus.COMPLETED} />}
          onReset={() => dispatch(fetchTasks({ token: token }))}
        >
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
              fetchForSkeleton={fetchTasksForSkeleton!}
              status={taskStatus.COMPLETED}
              optimisticTasks={optimisticTasks}
              setOptimisticTasks={setOptimisticTasks}
            />
          </Suspense>
        </ErrorBoundary>
      </section>
      {renderDragOverlay()}
    </DndContext>
  );
};

export default Columns;
