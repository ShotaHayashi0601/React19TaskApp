import { TaskPostData } from '@/types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateSingleTask = async (task: TaskPostData) => {
  try {
    await fetch(`${API_BASE_URL}/tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  } catch (error) {
    console.error(error);
  }
};
