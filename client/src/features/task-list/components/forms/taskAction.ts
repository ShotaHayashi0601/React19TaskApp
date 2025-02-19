import { TaskForm } from '@/lib/schemas/taskFormSchema';
import { TaskStatus } from '@/types';
import { addSingleTask } from '../../api/addSingleTask';
export const handleAdd = async (
  data: TaskForm,
  userId: string,
  status: TaskStatus
) => {
  await addSingleTask(data, userId, status);
};
export const handleUpdate = async (id: string) => {};
export const handleDelete = async (id: string) => {};
