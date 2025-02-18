import { Task, User } from '@prisma/client';
import { db } from '../../../lib/db';
import { createTask } from './functions/createTask';

export class TaskGateway {
  async create(task: Task): Promise<Task> {
    const createdTask = await createTask(task);
    return createdTask;
  }
}
