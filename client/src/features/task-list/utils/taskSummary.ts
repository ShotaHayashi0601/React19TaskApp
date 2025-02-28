import { taskStatusName } from '@/constants/task-status';
import { Task, TaskStatus, TaskStatusName } from '@/types';

type TaskSummaryResult = {
  taskStatusSummary: Record<
    TaskStatus,
    { name: TaskStatusName; expected: string; actual: string }
  >;
  totalExpectedTime: string;
  totalActualTime: string;
  progress: number;
};

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins}`;
};

export const calculateTaskSummary = (tasks: Task[]): TaskSummaryResult => {
  const taskStatusSummary: Record<
    TaskStatus,
    { expected: number; actual: number }
  > = {
    PENDING: { expected: 0, actual: 0 },
    IN_PROGRESS: { expected: 0, actual: 0 },
    COMPLETED: { expected: 0, actual: 0 },
  };

  let totalExpectedTime = 0;
  let totalActualTime = 0;
  let completedExpectedTime = 0;

  tasks.forEach((task) => {
    const { status, expectedTime, actualTime = 0 } = task;

    if (taskStatusSummary[status]) {
      taskStatusSummary[status].expected += Number(expectedTime);
      taskStatusSummary[status].actual += Number(actualTime);
    }

    totalExpectedTime += Number(expectedTime);
    totalActualTime += Number(actualTime);

    if (status === 'COMPLETED') {
      completedExpectedTime += Number(expectedTime);
    }
  });

  const progress =
    totalExpectedTime > 0
      ? Math.floor((completedExpectedTime / totalExpectedTime) * 100)
      : 0;

  return {
    taskStatusSummary: {
      PENDING: {
        name: taskStatusName.PENDING,
        expected: formatTime(taskStatusSummary.PENDING.expected),
        actual: formatTime(taskStatusSummary.PENDING.actual),
      },
      IN_PROGRESS: {
        name: taskStatusName.IN_PROGRESS,
        expected: formatTime(taskStatusSummary.IN_PROGRESS.expected),
        actual: formatTime(taskStatusSummary.IN_PROGRESS.actual),
      },
      COMPLETED: {
        name: taskStatusName.COMPLETED,
        expected: formatTime(taskStatusSummary.COMPLETED.expected),
        actual: formatTime(taskStatusSummary.COMPLETED.actual),
      },
    },
    totalExpectedTime: formatTime(totalExpectedTime),
    totalActualTime: formatTime(totalActualTime),
    progress,
  };
};

type StatusTimeResult = {
  status: TaskStatus;
  name: TaskStatusName;
  expectedTime: string;
  actualTime: string;
};

export const calculateStatusTime = (
  tasks: Task[],
  status: TaskStatus
): StatusTimeResult => {
  const filteredTasks = tasks.filter((task) => task.status === status);

  const totalExpectedTime = filteredTasks.reduce(
    (sum, task) => sum + Number(task.expectedTime),
    0
  );
  const totalActualTime = filteredTasks.reduce(
    (sum, task) => sum + (task.actualTime ? Number(task.actualTime) : 0),
    0
  );

  return {
    status,
    name: taskStatusName[status], // 日本語のステータス名
    expectedTime: formatTime(totalExpectedTime),
    actualTime: formatTime(totalActualTime),
  };
};
