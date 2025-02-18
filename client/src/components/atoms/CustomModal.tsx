import { useDispatch } from 'react-redux';

import { closeModal } from '@/redux/slices/ModalSlice';
import { cn } from '@/lib/utils';

const CustomModal = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.1)]'
      )}
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()} // クリックイベントを伝播させない
      >
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
