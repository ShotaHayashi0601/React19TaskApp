import { Task, User } from '@prisma/client';
import { db } from '../../../lib/db';
import { createTask } from './functions/createTask';
import { getUserTasks } from './functions/getUserTasks';

export class TaskGateway {
  async create(task: Task): Promise<Task> {
    const createdTask = await createTask(task);
    return createdTask;
  }
  async findByUserId(userId: string): Promise<Task[]> {
    const tasks = await getUserTasks(userId);
    return tasks;
  }
}
