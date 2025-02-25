import { Task, User } from '@prisma/client';
import { TaskGateway } from './taskGateway';

const taskGateway = new TaskGateway();
export class TaskRepository {
  async create(task: Task): Promise<Task> {
    return await taskGateway.create(task);
  }
  async updateOne(task: Task): Promise<Task> {
    return await taskGateway.updateOne(task);
  }
  async updateOrdersAndStatuses(task: Task[]): Promise<Task[]> {
    return await taskGateway.updateOrdersAndStatuses(task);
  }
  async findByUserId(userId: string): Promise<Task[]> {
    return await taskGateway.findByUserId(userId);
  }
  async deleteOne(taskId: string): Promise<Task> {
    return await taskGateway.deleteOne(taskId);
  }
}
