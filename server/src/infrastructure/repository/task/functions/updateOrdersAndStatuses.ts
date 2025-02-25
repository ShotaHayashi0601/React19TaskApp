import { Task } from '@prisma/client';
import { db } from '../../../../lib/db';

/**
 * ✅ 複数タスクの order と status を一括更新
 * @param tasks 更新対象のタスクリスト
 * @returns 更新後のタスクリスト
 */
export const updateOrdersAndStatuses = async (
  tasks: Task[]
): Promise<Task[]> => {
  if (!tasks.length) return [];

  try {
    // ✅ Prismaトランザクションを使用してアトミックに処理
    const updatedTasks = await db.$transaction(
      tasks.map((task) =>
        db.task.update({
          where: { id: task.id },
          data: {
            order: task.order,
            status: task.status,
            updatedAt: new Date(), // ✅ 自動で更新
          },
        })
      )
    );
    return updatedTasks;
  } catch (error) {
    console.error('❌ 一括更新エラー:', error);
    throw new Error('タスクの一括更新に失敗しました。');
  }
};
