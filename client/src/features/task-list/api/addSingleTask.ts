import { TaskPostData } from '@/types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addSingleTask = async (task: TaskPostData, token: string) => {
  try {
    await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  } catch (error) {
    console.error(error);
  }
};
