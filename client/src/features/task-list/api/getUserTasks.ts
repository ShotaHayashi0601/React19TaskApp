import { Task } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUserTasks = async (token: string) => {
  try {
    if (!token) {
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // 🔑 トークンをヘッダーにセット
        'Content-Type': 'application/json',
      },
    });

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
