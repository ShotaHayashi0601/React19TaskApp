"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const createTaskUseCase_1 = require("../../application/useCase/task/createTaskUseCase");
const taskRepository_1 = require("../../infrastructure/repository/task/taskRepository");
const getTaskUseCase_1 = require("../../application/useCase/task/getTaskUseCase");
const formatting_1 = require("../../utils/formatting");
const updateTaskUseCase_1 = require("../../application/useCase/task/updateTaskUseCase");
const deleteTaskUseCase_1 = require("../../application/useCase/task/deleteTaskUseCase");
const clerk_auth_1 = require("@hono/clerk-auth");
const taskRouter = new hono_1.Hono();
const createTaskUseCase = new createTaskUseCase_1.CreateTaskUseCase(new taskRepository_1.TaskRepository());
const updateTaskUseCase = new updateTaskUseCase_1.UpdateTaskUseCase(new taskRepository_1.TaskRepository());
const deleteTaskUseCase = new deleteTaskUseCase_1.DeleteTaskUseCase(new taskRepository_1.TaskRepository());
const getTaskUseCase = new getTaskUseCase_1.GetTaskUseCase(new taskRepository_1.TaskRepository());
/**
 * ✅ タスクの新規作成
 */
taskRouter.post('/', async (c) => {
    try {
        const rowTask = await c.req.json();
        const task = {
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
    }
    catch (error) {
        return c.json({ success: false, message: error }, 400);
    }
});
/**
 * ✅ タスクの単一更新
 */
taskRouter.put('/', async (c) => {
    const auth = (0, clerk_auth_1.getAuth)(c);
    const userId = auth?.userId;
    if (!userId) {
        return c.json({ success: false, message: '認証情報が不正です。' }, 403);
    }
    try {
        const rowTask = await c.req.json();
        const task = {
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
    }
    catch (error) {
        return c.json({ success: false, message: error }, 400);
    }
});
/**
 * 🆕 ✅ 複数タスクの order と status を一括更新
 */
taskRouter.put('/bulk-update-order-status', async (c) => {
    try {
        const auth = (0, clerk_auth_1.getAuth)(c);
        const userId = auth?.userId;
        if (!userId) {
            return c.json({ success: false, message: '認証情報が不正です。' }, 403);
        }
        const tasks = await c.req.json();
        if (!Array.isArray(tasks)) {
            return c.json({ success: false, message: '配列形式でタスクを送信してください。' }, 400);
        }
        const updatedTasks = await updateTaskUseCase.updateOrdersAndStatuses(tasks);
        return c.json({ success: true, data: updatedTasks });
    }
    catch (error) {
        console.error('一括更新エラー:', error);
        return c.json({ success: false, message: '一括更新に失敗しました。' }, 400);
    }
});
/**
 * ✅ ユーザー単位のタスク取得
 */
taskRouter.get('/', async (c) => {
    try {
        const auth = (0, clerk_auth_1.getAuth)(c);
        const userId = auth?.userId;
        if (!userId) {
            return c.json({ success: false, message: '認証情報が不正です。' }, 403);
        }
        const tasks = await getTaskUseCase.findByUserId(userId);
        const taskList = tasks.map((task) => ({
            ...task,
            createdAt: (0, formatting_1.formatDateTime)(task.createdAt),
            updatedAt: (0, formatting_1.formatDateTime)(task.updatedAt),
        }));
        return c.json({ success: true, data: taskList });
    }
    catch (error) {
        return c.json({ success: false, message: error }, 400);
    }
});
/**
 * ✅ タスクの削除
 */
taskRouter.delete('/:taskId', async (c) => {
    try {
        const auth = (0, clerk_auth_1.getAuth)(c);
        const userId = auth?.userId;
        if (!userId) {
            return c.json({ success: false, message: '認証情報が不正です。' }, 403);
        }
        const taskId = c.req.param('taskId');
        await deleteTaskUseCase.deleteOne(taskId);
        return c.json({ success: true });
    }
    catch (error) {
        return c.json({ success: false, message: error }, 400);
    }
});
exports.default = taskRouter;
