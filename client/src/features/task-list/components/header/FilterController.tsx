import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React, { FC, startTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sortMenuList } from '@/constants/filter-params';

type FilteredControllerProps = {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
};

const FilterController: FC<FilteredControllerProps> = (props) => {
  const { searchKeyword, setSearchKeyword, selectedSort, setSelectedSort } =
    props;
  return (
    <div className="flex items-center space-x-4">
      <div className="grid  max-w-sm items-center gap-1.5 w-[180px]">
        <Label
          htmlFor="task-title"
          className="text-xs  ml-1 text-gray-800 -mb-1 mt-[4px]"
        >
          検索
        </Label>
        <Input
          type="text"
          id="task-title"
          placeholder="タスク名..."
          className={cn(
            'border-blue-400  outline-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none',
            'text-gray-800'
          )}
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
      </div>
      <div className=" w-[180px]">
        <Label
          htmlFor="task-title"
          className="-mt-1 text-xs  ml-1 text-gray-800"
        >
          並び替え
        </Label>
        <Select
          onValueChange={(value) => {
            startTransition(() => {
              setSelectedSort(value);
            });
          }}
          value={selectedSort}
        >
          <SelectTrigger
            className={cn(
              'border-blue-400  outline-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none',
              'text-gray-800 h-[10px]:'
            )}
          >
            <SelectValue placeholder="ソート順を選択" />
          </SelectTrigger>
          <SelectContent>
            {sortMenuList.map((menu) => (
              <SelectItem key={menu.id} value={menu.id} className="">
                {menu.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterController;
