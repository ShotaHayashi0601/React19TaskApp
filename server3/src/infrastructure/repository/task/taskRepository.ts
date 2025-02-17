import { Task, User } from '@prisma/client';
import { TaskGateway } from './taskGateway';

const taskGateway = new TaskGateway();
export class TaskRepository {
  async create(task: Task): Promise<Task> {
    return await taskGateway.create(task);
  }
}
