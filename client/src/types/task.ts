import { User } from './user';

export const taskStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
};
export type TaskStatus = keyof typeof taskStatus;

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  expectedTime: number;
  actualTime?: number;
  dueDate?: Date | string;
  userId: string;
  user?: User; // 関連するユーザーを含める場合、オプショナルにする
  createdAt: Date;
  updatedAt: Date;
};
