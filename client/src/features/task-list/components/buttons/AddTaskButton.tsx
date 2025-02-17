import { Icons } from '@/constants/icons';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';

interface AddTaskButtonProps {
  text: string;
  onClick?: () => void;
}

const AddTaskButton: FC<AddTaskButtonProps> = (props) => {
  const { text, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={cn(
        'py-1 px-4 flex items-center space-x-2',
        ' shadow-[0px_2px_3px_rgba(0,0,0,0.5)]',
        'rounded-sm bg-[rgba(255,255,255,0.05)])',
        'backdrop-blur-sm',
        'hover:bg-[rgba(255,255,255,1)]',
        'active:scale-95'
      )}
    >
      <div>
        <Icons.add className="w-6 h-6 font-bold" />
      </div>
      <div>{text}</div>
    </button>
  );
};

export default AddTaskButton;
