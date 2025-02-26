import { Icons } from '@/constants/icons';
import { cn } from '@/lib/utils';
import { FC } from 'react';

interface AddTaskButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const AddTaskButton: FC<AddTaskButtonProps> = (props) => {
  const { text, onClick, type = 'button', disabled = false } = props;
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={cn(
        'py-1 px-4 flex items-center space-x-2',
        ' shadow-[0px_2px_3px_rgba(0,0,0,0.5)]',
        'rounded-sm bg-[rgba(255,255,255,0.05)]',
        'backdrop-blur-sm',
        'hover:bg-[rgba(255,255,255,1)]',
        'active:scale-95'
      )}
    >
      <div>
        <Icons.plus className="w-6 h-6 font-bold" />
      </div>
      <div>{text}</div>
    </button>
  );
};

export default AddTaskButton;
