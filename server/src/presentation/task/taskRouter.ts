import { Hono } from 'hono';
import { CreateTaskUseCase } from '../../application/useCase/task/createTaskUseCase';
import { TaskRepository } from '../../infrastructure/repository/task/taskRepository';
import { Task } from '@prisma/client';
import { GetTaskUseCase } from '../../application/useCase/task/getTaskUseCase';
import { formatDateTime } from '../../utils/formatting';
import { UpdateTaskUseCase } from '../../application/useCase/task/updateTaskUseCase';
import { DeleteTaskUseCase } from '../../application/useCase/task/deleteTaskUseCase';
import { getAuth } from '@hono/clerk-auth';

const taskRouter = new Hono();
const createTaskUseCase = new CreateTaskUseCase(new TaskRepository());
const updateTaskUseCase = new UpdateTaskUseCase(new TaskRepository());
const deleteTaskUseCase = new DeleteTaskUseCase(new TaskRepository());
const getTaskUseCase = new GetTaskUseCase(new TaskRepository());

/**
 * ✅ タスクの新規作成
 */
taskRouter.post('/', async (c) => {
  try {
    const auth = getAuth(c);
    const userId = auth?.userId;
    if (!userId) {
      return c.json({ success: false, message: '認証情報が不正です。' }, 403);
    }
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

/**
 * ✅ タスクの単一更新
 */
taskRouter.put('/', async (c) => {
  const auth = getAuth(c);
  const userId = auth?.userId;
  if (!userId) {
    console.log('認証情報が不正です');
    return c.json({ success: false, message: '認証情報が不正です。' }, 403);
  }
  try {
    const rowTask = await c.req.json();
    console.log('rowTask', rowTask);
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
    console.log(task);

    const updatedTask = await updateTaskUseCase.updateOne(task);
    return c.json({ success: true, data: updatedTask });
  } catch (error) {
    return c.json({ success: false, message: error }, 400);
  }
});

/**
 * 🆕 ✅ 複数タスクの order と status を一括更新
 */
taskRouter.put('/bulk-update-order-status', async (c) => {
  try {
    const auth = getAuth(c);
    const userId = auth?.userId;
    if (!userId) {
      return c.json({ success: false, message: '認証情報が不正です。' }, 403);
    }
    const tasks: Task[] = await c.req.json();
    if (!Array.isArray(tasks)) {
      return c.json(
        { success: false, message: '配列形式でタスクを送信してください。' },
        400
      );
    }

    const updatedTasks = await updateTaskUseCase.updateOrdersAndStatuses(tasks);
    return c.json({ success: true, data: updatedTasks });
  } catch (error) {
    console.error('一括更新エラー:', error);
    return c.json({ success: false, message: '一括更新に失敗しました。' }, 400);
  }
});

/**
 * ✅ ユーザー単位のタスク取得
 */
taskRouter.get('/', async (c) => {
  try {
    const auth = getAuth(c);
    const userId = auth?.userId;
    if (!userId) {
      return c.json({ success: false, message: '認証情報が不正です。' }, 403);
    }
    const tasks = await getTaskUseCase.findByUserId(userId);
    const taskList = tasks.map((task) => ({
      ...task,
      createdAt: formatDateTime(task.createdAt),
      updatedAt: formatDateTime(task.updatedAt),
    }));
    return c.json({ success: true, data: taskList });
  } catch (error) {
    return c.json({ success: false, message: error }, 400);
  }
});

/**
 * ✅ タスクの削除
 */
taskRouter.delete('/:taskId', async (c) => {
  try {
    const auth = getAuth(c);
    const userId = auth?.userId;
    if (!userId) {
      return c.json({ success: false, message: '認証情報が不正です。' }, 403);
    }
    const taskId = c.req.param('taskId');
    await deleteTaskUseCase.deleteOne(taskId);
    return c.json({ success: true });
  } catch (error) {
    return c.json({ success: false, message: error }, 400);
  }
});

export default taskRouter;
