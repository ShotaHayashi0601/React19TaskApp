import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
interface CustomModalProps {
  children: React.ReactNode;
  setOpen: (isOpen: boolean) => void;
}

const slideDownVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: 'spring', stiffness: 80, damping: 15 },
  },
  exit: { opacity: 0, y: -100, transition: { duration: 0.3 } },
};

const CustomModal = ({ children, setOpen }: CustomModalProps) => {
  return (
    <>
      {createPortal(
        <div
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center',
            'bg-[rgba(0,0,0,0.5)] w-screen h-screen'
          )}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg"
            variants={slideDownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // クリックイベントを伝播させない
          >
            {children}
          </motion.div>
        </div>,
        document.body
      )}
    </>
  );
};

export default CustomModal;
