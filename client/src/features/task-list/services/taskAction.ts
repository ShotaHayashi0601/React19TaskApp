import { TaskForm } from "@/lib/schemas/taskFormSchema";
import { Task } from "@/types";
import { addSingleTask } from "../api/addSingleTask";
import { AppDispatch } from "@/redux/store";
import {
  addTask,
  deleteTask,
  initializeTask,
  updateTask,
} from "@/redux/slices/taskSlice";
import { formatDate, formatDateTime } from "@/utils";
import { v4 as uuidv4 } from "uuid";
import { updateSingleTask } from "../api/updateSingleTask";
import { deleteSingleTask } from "../api/deleteSingleTask";
import { updateOrdersAndStatuses } from "../api/updateOrdersAndStatuses";
import { getPresetActualTime } from "./helper";

export const handleAdd = async (
  data: TaskForm,
  userId: string,
  tasks: Task[],
  dispatch: AppDispatch,
  setOptimisticTasks: (tasks: Task[]) => void,
  token: string | null
) => {
  if (!token) return;
  const order = tasks.length + 1;
  const newTask: Task = {
    id: uuidv4(),
    userId: userId,
    title: data.title,
    status: data.status,
    description: data.description,
    actualTime: getPresetActualTime(
      data.status,
      Number(data.actualTime),
      Number(data.expectedTime)
    ),
    expectedTime: data.expectedTime,
    dueDate: formatDate(data.dueDate),
    createdAt: formatDateTime(new Date()),
    updatedAt: formatDateTime(new Date()),
    order: order, //todo: orderの値をどうするか
  };
  setOptimisticTasks([...tasks, newTask]);
  await addSingleTask(newTask, token);
  dispatch(addTask(newTask));
};

export const handleUpdate = async (
  data: TaskForm,
  userId: string,
  tasks: Task[],
  dispatch: AppDispatch,
  setOptimisticTasks: (tasks: Task[]) => void,
  token: string | null
) => {
  if (!token) return;
  const updatedTask: Task = {
    id: data.id,
    userId: userId,
    title: data.title,
    status: data.status,
    description: data.description,

    actualTime: getPresetActualTime(
      data.status,
      Number(data.actualTime),
      Number(data.expectedTime)
    ),
    expectedTime: Number(data.expectedTime),
    dueDate: formatDate(data.dueDate),
    createdAt: formatDateTime(new Date()),
    updatedAt: formatDateTime(new Date()),
    order: Number(data.order), //todo: orderの値をどうするか
  };

  setOptimisticTasks(
    tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
  );

  await updateSingleTask(updatedTask, token);

  dispatch(updateTask(updatedTask));
};

export const handleDelete = async (
  id: string,
  tasks: Task[],
  dispatch: AppDispatch,
  setOptimisticTasks: (tasks: Task[]) => void,
  token: string | null
) => {
  if (!token) return;
  setOptimisticTasks(tasks.filter((task) => task.id !== id));
  await deleteSingleTask(id, token);
  dispatch(deleteTask(id));
};

export const handleReorder = async (
  updatedTasks: Task[],
  dispatch: AppDispatch,
  setOptimisticTasks: (tasks: Task[]) => void,
  token: string | null
) => {
  if (!token) return;
  const convertedTasks = updatedTasks.map((task) => ({
    ...task,
    order: Number(task.order),
    actualTime: getPresetActualTime(
      task.status,
      Number(task.actualTime),
      Number(task.expectedTime)
    ),
    expectedTime: Number(task.expectedTime),
  }));
  const sortedTasks = convertedTasks.sort((a, b) => a.order - b.order);
  // 1. 楽観的UI更新
  setOptimisticTasks(sortedTasks);

  await updateOrdersAndStatuses(sortedTasks, token);
  dispatch(initializeTask(sortedTasks));
};
