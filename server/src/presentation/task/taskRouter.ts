import { Hono } from 'hono';
import { CreateTaskUseCase } from '../../application/useCase/task/createTaskUseCase';
import { TaskRepository } from '../../infrastructure/repository/task/taskRepository';
import { Task } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { GetTaskUseCase } from '../../application/useCase/task/getTaskUseCase';
import { formatDateTime } from '../../utils/formatting';
import { UpdateTaskUseCase } from '../../application/useCase/task/updateTaskUseCase';
import { DeleteTaskUseCase } from '../../application/useCase/task/deleteTaskUseCase';
const taskRouter = new Hono();
const createTaskUseCase = new CreateTaskUseCase(new TaskRepository());
const updateTaskUseCase = new UpdateTaskUseCase(new TaskRepository());
const deleteTaskUseCase = new DeleteTaskUseCase(new TaskRepository());
const getTaskUseCase = new GetTaskUseCase(new TaskRepository());
taskRouter.post('/', async (c) => {
  try {
    const rowTask = await c.req.json();
    const task: Task = {
      id: rowTask.id,
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
    const createdTask = await createTaskUseCase.create(task);
    return c.json({ success: true, data: createdTask });
  } catch (error) {
    return c.json({ success: false, message: error }, 400);
  }
});
taskRouter.put('/', async (c) => {
  try {
    const rowTask = await c.req.json();
    const task: Task = {
      id: rowTask.id,
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
    const updatedTask = await updateTaskUseCase.updateOne(task);
    return c.json({ success: true, data: updatedTask });
  } catch (error) {
    return c.json({ success: false, message: error }, 400);
  }
});
taskRouter.get('/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const tasks = await getTaskUseCase.findByUserId(userId);
    const taskList = tasks.map((task) => {
      return {
        ...task,
        createdAt: formatDateTime(task.createdAt),
        updatedAt: formatDateTime(task.updatedAt),
      };
    });

    return c.json({ success: true, data: taskList });
  } catch (error) {
    return c.json({ success: false, message: error }, 400);
  }
});
taskRouter.delete('/:taskId', async (c) => {
  try {
    const taskId = c.req.param('taskId');
    await deleteTaskUseCase.deleteOne(taskId);
    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, message: error }, 400);
  }
});

export default taskRouter;
