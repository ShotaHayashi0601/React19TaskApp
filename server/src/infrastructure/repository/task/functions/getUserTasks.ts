import { Task } from '@prisma/client';
import { db } from '../../../../lib/db';

export const getUserTasks = async (userId: string): Promise<Task[]> => {
  return await db.task.findMany({
    where: {
      userId: userId,
    },
  });
};
