import { Task, User } from '@prisma/client';
import { db } from '../../../lib/db';
import { createTask } from './functions/createTask';
import { getUserTasks } from './functions/getUserTasks';
import { updateSingleTask } from './functions/updateSingleTask';
import { deleteTask } from './functions/deleteTask';
import { updateOrdersAndStatuses } from './functions/updateOrdersAndStatuses';

export class TaskGateway {
  async create(task: Task): Promise<Task> {
    const createdTask = await createTask(task);
    return createdTask;
  }
  async updateOne(task: Task): Promise<Task> {
    const updatedTask = await updateSingleTask(task);
    return updatedTask;
  }
  async updateOrdersAndStatuses(tasks: Task[]): Promise<Task[]> {
    const updatedTasks = await updateOrdersAndStatuses(tasks);
    return updatedTasks;
  }
  async findByUserId(userId: string): Promise<Task[]> {
    const tasks = await getUserTasks(userId);
    return tasks;
  }
  async deleteOne(taskId: string): Promise<Task> {
    const tasks = await deleteTask(taskId);
    return tasks;
  }
}
