import { useAppSelector } from '@/redux/hooks';
import Columns from './columns/Columns';
import { useOptimistic, useState } from 'react';
import HeaderController from './header/HeaderController';
import { Task } from '@/types';

// 🔹 フィルタリング関数 (検索 & ソート)
function applyFilters(
  keyword: string,
  sort: string,
  optimisticTasks: Task[]
): Task[] {
  let filtered = optimisticTasks.filter((task) => task.title.includes(keyword));

  // 🔹 ソート適用
  if (sort === 'BY_DATE') {
    filtered = filtered.sort(
      (a, b) =>
        new Date(a.dueDate || '').getTime() -
        new Date(b.dueDate || '').getTime()
    );
  } else if (sort === 'BY_WORKINGTIME') {
    filtered = filtered.sort((a, b) => b.expectedTime - a.expectedTime);
  }

  // 🔹 order を更新
  const updatedTasks = filtered.map((task, index) => ({
    ...task,
    order: index + 1,
  }));

  return updatedTasks;
}

const TaskListWrapper = () => {
  const { taskList: tasks } = useAppSelector((state) => state.task);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);

  const [selectedSort, setSelectedSort] = useState('DEFAULT');
  const [searchKeyword, setSearchKeyword] = useState('');
  const filteredTasks = applyFilters(
    searchKeyword,
    selectedSort,
    optimisticTasks
  );

  const headerControllerProps = {
    searchKeyword: searchKeyword,
    setSearchKeyword: setSearchKeyword,
    selectedSort: selectedSort,
    setSelectedSort: setSelectedSort,
    filteredTasks: filteredTasks,
  };
  const columnsProps = {
    optimisticTasks: filteredTasks,
    setOptimisticTasks: setOptimisticTasks,
  };

  return (
    <main className="bg-gray-300 flex-1 flex flex-col space-y-0  sm:px-4 pt-2">
      <HeaderController {...headerControllerProps} />
      <Columns {...columnsProps} />
    </main>
  );
};

export default TaskListWrapper;
