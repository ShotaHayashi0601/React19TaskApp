import { Hono } from 'hono';
import { CreateTaskUseCase } from '../../application/useCase/task/createTaskUseCase';
import { TaskRepository } from '../../infrastructure/repository/task/taskRepository';
import { Task } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { GetTaskUseCase } from '../../application/useCase/task/getTaskUseCase';
const taskRouter = new Hono();
const createTaskUseCase = new CreateTaskUseCase(new TaskRepository());
const getTaskUseCase = new GetTaskUseCase(new TaskRepository());
taskRouter.post('/', async (c) => {
  try {
    const rowTask = await c.req.json();
    const task: Task = {
      id: uuidv4(),
      userId: rowTask.userId,
      title: rowTask.title,
      description: rowTask.description,
      status: rowTask.status,
      actualTime: parseInt(rowTask.actualTime),
      expectedTime: parseInt(rowTask.expectedTime),
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: rowTask.dueDate,
      order: parseInt(rowTask.order),
    };
    console.log(task);
    const createdTask = await createTaskUseCase.create(task);
    return c.json({ success: true, data: createdTask });
  } catch (error) {
    console.log(error);
    return c.json({ success: false, message: error }, 400);
  }
});
taskRouter.get('/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const tasks = await getTaskUseCase.findByUserId(userId);
    return c.json({ success: true, data: tasks });
  } catch (error) {
    return c.json({ success: false, message: error }, 400);
  }
});

export default taskRouter;
