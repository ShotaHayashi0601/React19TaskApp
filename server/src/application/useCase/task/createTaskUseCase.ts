import { Task } from '@prisma/client';
import { TaskRepository } from '../../../infrastructure/repository/task/taskRepository';

export class CreateTaskUseCase {
  constructor(private _taskRepository: TaskRepository) {}
  async create(task: Task): Promise<Task> {
    return await this._taskRepository.create(task);
  }
}
