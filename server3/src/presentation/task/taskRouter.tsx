import { Hono } from 'hono';
import { CreateTaskUseCase } from '../../application/useCase/task/createTaskUseCase';
import { TaskRepository } from '../../infrastructure/repository/task/taskRepository';
import { Task } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
const taskRouter = new Hono();
const createTaskUseCase = new CreateTaskUseCase(new TaskRepository());
taskRouter.post('/', async (c) => {
  try {
    console.log('okk');
    const rowTask = await c.req.json();
    const task: Task = {
      id: uuidv4(),
      userId: rowTask.userId,
      title: rowTask.title,
      description: rowTask.description,
      status: rowTask.status,
      actualTime: rowTask.actualTime ?? null,
      expectedTime: rowTask.expectedTime ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: rowTask.dueDate ? new Date(rowTask.dueDate) : null,
    };
    console.log('task:', task, rowTask);
    const createdTask = await createTaskUseCase.create(task);
    return c.json({ success: true, data: createdTask });
  } catch (error) {
    return c.json({ success: false, message: error }, 400);
  }
});

export default taskRouter;
