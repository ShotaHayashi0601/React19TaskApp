import { Task } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUserTasks = async (userId: string | undefined) => {
  try {
    if (!userId) {
      return [];
    }
    const response = await fetch(`${API_BASE_URL}/tasks/${userId}`);
    if (!response.ok) {
      throw new Error('タスクの取得に失敗しました');
    }
    const { data }: { data: Task[] } = await response.json();

    return data;
  } catch (e) {
    console.error('Error fetching tasks:', e);
    throw e;
  }
};
