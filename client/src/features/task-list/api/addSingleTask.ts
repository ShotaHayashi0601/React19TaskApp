import { TaskForm } from '@/lib/schemas/taskFormSchema';
import { TaskPostData, TaskStatus } from '@/types';
import { formatDate } from '@/utils';

export const addSingleTask = async (
  task: TaskForm,
  userId: string,
  status: TaskStatus
) => {
  const addTask: TaskPostData = {
    userId: userId,
    title: task.title,
    description: task.description,
    status: status,
    actualTime: task.actualTime,
    expectedTime: task.expectedTime,
    dueDate: formatDate(task.dueDate),
    order: 0, //todo: orderの値をどうするか
  };
  console.log('addTask', addTask);
};
