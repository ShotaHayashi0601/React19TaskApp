import { TaskForm } from '@/lib/schemas/taskFormSchema';
import { Task, TaskStatus } from '@/types';
import { addSingleTask } from '../api/addSingleTask';
import { AppDispatch } from '@/redux/store';
import {
  addTask,
  deleteTask,
  initializeTask,
  updateTask,
} from '@/redux/slices/TaskSlice';
import { formatDate, formatDateTime } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import { updateSingleTask } from '../api/updateSingleTask';
import { deleteSingleTask } from '../api/addSingleTask copy';
import { updateOrdersAndStatuses } from '../api/updateOrdersAndStatuses';

export const handleAdd = async (
  data: TaskForm,
  userId: string,
  tasks: Task[],
  dispatch: AppDispatch,
  setOptimisticTasks: (tasks: Task[]) => void
) => {
  const order = tasks.length + 1;
  const newTask: Task = {
    id: uuidv4(),
    userId: userId,
    title: data.title,
    status: data.status,
    description: data.description,
    actualTime: data.actualTime,
    expectedTime: data.expectedTime,
    dueDate: formatDate(data.dueDate),
    createdAt: formatDateTime(new Date()),
    updatedAt: formatDateTime(new Date()),
    order: order, //todo: orderの値をどうするか
  };
  setOptimisticTasks([...tasks, newTask]);
  await addSingleTask(newTask);
  dispatch(addTask(newTask));
};

export const handleUpdate = async (
  data: TaskForm,
  userId: string,
  status: TaskStatus,
  tasks: Task[],
  dispatch: AppDispatch,
  setOptimisticTasks: (tasks: Task[]) => void
) => {
  const updatedTask: Task = {
    id: data.id,
    userId: userId,
    title: data.title,
    status: data.status,
    description: data.description,
    actualTime: data.actualTime,
    expectedTime: data.expectedTime,
    dueDate: formatDate(data.dueDate),
    createdAt: formatDateTime(new Date()),
    updatedAt: formatDateTime(new Date()),
    order: data.order, //todo: orderの値をどうするか
  };
  setOptimisticTasks(
    tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
  );
  await updateSingleTask(updatedTask);
  dispatch(updateTask(updatedTask));
};

export const handleDelete = async (
  id: string,
  tasks: Task[],
  dispatch: AppDispatch,
  setOptimisticTasks: (tasks: Task[]) => void
) => {
  setOptimisticTasks(tasks.filter((task) => task.id !== id));
  await deleteSingleTask(id);
  dispatch(deleteTask(id));
};
export const handleReorder = async (
  updatedTasks: Task[],
  dispatch: AppDispatch,
  setOptimisticTasks: (tasks: Task[]) => void
) => {
  // 1. 楽観的UI更新
  setOptimisticTasks(updatedTasks);

  await updateOrdersAndStatuses(updatedTasks);
  dispatch(initializeTask(updatedTasks));
};
