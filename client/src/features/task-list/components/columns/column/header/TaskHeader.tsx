import AddTaskButton from '../../../buttons/AddTaskButton';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/redux/slices/ModalSlice';
import { TaskStatus } from '@/types';
import { FC } from 'react';
import InputTaskForm from '../../../forms/InputTaskForm';
import { formActions } from '@/types/form-action';

interface TaskHeaderProps {
  status: TaskStatus;
}
const TaskHeader: FC<TaskHeaderProps> = ({ status }) => {
  const { isOpen } = useSelector((store: RootState) => store.modal);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={cn(
          'shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),_0px_1px_1px_0px_rgba(0,0,0,0.14),_0px_1px_3px_0px_rgba(0,0,0,0.12)]',
          'w-full px-4 py-2 bg-gray-50 flex justify-between items-center'
        )}
      >
        <div className="bg-red-600 py-2 px-2 rounded-[.5rem]">
          <h2 className="md:text-[16px] text-white">未着手</h2>
        </div>
        <AddTaskButton text={'追加'} onClick={() => dispatch(openModal())} />
      </div>
      {isOpen && <InputTaskForm status={status} action={formActions.ADD} />}
    </>
  );
};

export default TaskHeader;
