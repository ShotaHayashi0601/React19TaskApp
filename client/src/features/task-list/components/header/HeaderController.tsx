import { Task } from '@/types';
import { FC } from 'react';
import FilterController from './FilterController';
import SummaryDisplay from './SummaryDisplay';

type HeaderControllerProps = {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
  filteredTasks: Task[];
};
const HeaderController: FC<HeaderControllerProps> = (props) => {
  const {
    searchKeyword,
    setSearchKeyword,
    selectedSort,
    setSelectedSort,
    filteredTasks,
  } = props;
  return (
    <div className="bg-gray-50 px-4 py-2 rounded-md flex  flex-col gap-4 md:flex-row md:items-end md:gap-8">
      <FilterController
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      <SummaryDisplay optimisticTasks={filteredTasks} />
    </div>
  );
};

export default HeaderController;
