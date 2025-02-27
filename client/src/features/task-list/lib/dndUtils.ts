import { taskStatus } from '@/constants/task-status';
import { Task, TaskStatus } from '@/types';

// Helper to update task orders and status
export const updateTaskOrdersAndStatus = (
  tasks: Task[],
  changedTaskId: string,
  targetStatus: TaskStatus
): Task[] => {
  // ステータス別にグルーピング
  const groupedTasks: Record<TaskStatus, Task[]> = {
    [taskStatus.PENDING]: [],
    [taskStatus.IN_PROGRESS]: [],
    [taskStatus.COMPLETED]: [],
  };

  tasks.forEach((task) => {
    const updatedTask =
      task.id === changedTaskId ? { ...task, status: targetStatus } : task;
    groupedTasks[updatedTask.status].push(updatedTask);
  });

  // グループごとに order を再計算
  const updatedTasks: Task[] = [];
  Object.values(groupedTasks).forEach((statusTasks) => {
    statusTasks.forEach((task, index) => {
      updatedTasks.push({
        ...task,
        order: index + 1,
      });
    });
  });
  return updatedTasks;
};
