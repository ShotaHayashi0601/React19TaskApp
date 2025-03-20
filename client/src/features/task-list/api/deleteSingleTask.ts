const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const deleteSingleTask = async (taskId: string, token: string) => {
  try {
    await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    alert("タスクの削除に失敗しました。もう一度試してください");
  }
};
