import { Task } from '@prisma/client';
import { TaskRepository } from '../../../infrastructure/repository/task/taskRepository';

export class DeleteTaskUseCase {
  constructor(private _taskRepository: TaskRepository) {}
  async deleteOne(taskId: string): Promise<Task> {
    return await this._taskRepository.deleteOne(taskId);
  }
}
