import { db } from '../../../../lib/db';

export const deleteTask = (taskId: string) => {
  return db.task.delete({
    where: {
      id: taskId,
    },
  });
};
