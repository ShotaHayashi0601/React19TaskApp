import { Task } from '@/types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateOrdersAndStatuses = async (task: Task[]) => {
  try {
    await fetch(`${API_BASE_URL}/tasks/bulk-update-order-status`, {
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
