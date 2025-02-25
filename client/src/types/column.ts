import { TaskStatus } from './task';

export interface Column {
  id: string;
  status: TaskStatus;
  label: string;
  order: number;
}
