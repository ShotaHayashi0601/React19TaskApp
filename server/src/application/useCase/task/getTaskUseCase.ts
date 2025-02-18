import { Task } from '@prisma/client';
import { TaskRepository } from '../../../infrastructure/repository/task/taskRepository';

export class GetTaskUseCase {
  constructor(private _taskRepository: TaskRepository) {}
  async findByUserId(userId: string): Promise<Task[]> {
    return await this._taskRepository.findByUserId(userId);
  }
}
