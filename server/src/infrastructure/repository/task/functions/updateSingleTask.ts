import { Task } from '@prisma/client';
import { db } from '../../../../lib/db';

/**
 * 🎯 `createdAt` を除外した型を定義
 */
type TaskUpdateInput = Omit<Task, 'createdAt'>;

/**
 * 🏃 `createdAt` を更新対象から除外してタスクを更新
 */
export const updateSingleTask = async (task: Task) => {
  // ✅ createdAt を除外し、TaskUpdateInput 型を明示
  const { createdAt, ...exceptCreatedAt } = task;
  const updateTask: TaskUpdateInput = exceptCreatedAt;
  return await db.task.update({
    where: { id: task.id },
    data: updateTask, // ✅ createdAt を含まないデータを使用
  });
};
