import { User } from './user';

export const taskStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
} as const;
export type TaskStatus = keyof typeof taskStatus;

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  expectedTime: number;
  actualTime?: number;
  dueDate?: string;
  userId: string;
  user?: User; // 関連するユーザーを含める場合、オプショナルにする
  createdAt: Date | string;
  updatedAt: Date | string;
  order: number;
};

export type TaskPostData = {
  userId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  expectedTime: number;
  actualTime?: number;
  dueDate?: string;
  order: number;
};
