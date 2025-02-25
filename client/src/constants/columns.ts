import { Column } from '@/types/column';
import { taskStatus } from './task-status';

export const defaultColumns: Column[] = [
  {
    id: 'column-pending',
    status: taskStatus.PENDING,
    label: 'Pending',
    order: 1,
  },
  {
    id: 'column-inprogress',
    status: taskStatus.IN_PROGRESS,
    label: 'In Progress',
    order: 2,
  },
  {
    id: 'column-completed',
    status: taskStatus.COMPLETED,
    label: 'Completed',
    order: 3,
  },
];
