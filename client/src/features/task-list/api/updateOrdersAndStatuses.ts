import { Task } from "@/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const updateOrdersAndStatuses = async (task: Task[], token: string) => {
  try {
    await fetch(`${API_BASE_URL}/tasks/bulk-update-order-status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  } catch (error) {
    alert("タスクの並び替えに失敗しました。もう一度試してください");
    console.error(error);
  }
};
