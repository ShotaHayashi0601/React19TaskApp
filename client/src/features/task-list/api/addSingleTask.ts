import { TaskForm } from '@/lib/schemas/taskFormSchema';
import { TaskPostData, TaskStatus } from '@/types';
import { formatDate } from '@/utils';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addSingleTask = async (
  task: TaskForm,
  userId: string,
  status: TaskStatus
) => {
  try {
    if (!userId) {
      throw new Error('userId is not defined');
    }
    const addTask: TaskPostData = {
      userId: userId,
      title: task.title,
      description: task.description,
      status: status,
      actualTime: task.actualTime,
      expectedTime: task.expectedTime,
      dueDate: formatDate(task.dueDate),
      order: 1, //todo: orderの値をどうするか
    };
    console.log(addTask);
    await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addTask),
    });
  } catch (error) {
    console.error(error);
  }
};
