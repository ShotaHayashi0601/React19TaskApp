import { TaskPostData } from "@/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateSingleTask = async (task: TaskPostData, token: string) => {
  try {
    await fetch(`${API_BASE_URL}/tasks`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  } catch (error) {
    alert("タスクの更新に失敗しました。もう一度試してください");
    console.error(error);
  }
};
