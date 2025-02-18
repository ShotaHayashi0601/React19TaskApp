import { Task } from '@prisma/client';
import { db } from '../../../../lib/db';

export const createTask = async (task: Task) => {
  return await db.task.create({ data: task });
};
