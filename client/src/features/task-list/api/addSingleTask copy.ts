const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const deleteSingleTask = async (taskId: string) => {
  try {
    await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};
