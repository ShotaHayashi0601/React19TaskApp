import { TaskStatus, TaskStatusName } from '@/types';

export const taskStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const;

export const taskStatusName: Record<TaskStatus, TaskStatusName> = {
  PENDING: '未着手',
  IN_PROGRESS: '進行中',
  COMPLETED: '完了',
};
export const taskStatuses = (Object.keys(taskStatus) as TaskStatus[]).map(
  (key) => ({
    id: taskStatus[key],
    name: taskStatusName[key],
  })
);
