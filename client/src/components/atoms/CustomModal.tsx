import { cn } from '@/lib/utils';

interface CustomModalProps {
  children: React.ReactNode;
  setOpen: (isOpen: boolean) => void;
}

const CustomModal = ({ children, setOpen }: CustomModalProps) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.1)]'
      )}
      onClick={() => setOpen(false)}
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
