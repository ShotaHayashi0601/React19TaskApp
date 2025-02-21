import { taskStatus } from '@/constants/task-status';
import { User } from './user';

export type TaskStatusName = '未着手' | '進行中' | '完了';
export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];
export type TaskBase = {
  title: string;
  description?: string;
  status: TaskStatus;
  expectedTime: number;
  actualTime?: number;
  dueDate?: string;
  order: number;
};

export type Task = TaskBase & {
  id: string;
  userId: string;
  user?: User;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type TaskPostData = TaskBase & {
  userId: string;
};
