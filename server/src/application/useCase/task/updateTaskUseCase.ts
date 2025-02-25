import { Task } from '@prisma/client';
import { TaskRepository } from '../../../infrastructure/repository/task/taskRepository';

export class UpdateTaskUseCase {
  constructor(private _taskRepository: TaskRepository) {}
  async updateOne(task: Task): Promise<Task> {
    return await this._taskRepository.updateOne(task);
  }
  async updateOrdersAndStatuses(tasks: Task[]): Promise<Task[]> {
    return await this._taskRepository.updateOrdersAndStatuses(tasks);
  }
}
