import { cn } from '@/lib/utils';
import CustomModal from '../atoms/CustomModal';
import { Icons } from '@/constants/icons';
import { FC } from 'react';
import { IMAGES } from '@/constants';
import PrimaryButton from '../atoms/PrimaryButton';

type Props = {
  setOpen: (value: boolean) => void;
  type?: string;
  title: string;
  message: string[];
  cancelText?: string;
  executeText?: string;
  func?: ((e?: React.MouseEvent) => void) | (() => Promise<void>);
  cancel?: ((e?: React.MouseEvent) => void) | (() => Promise<void>);
};
const CommonConfirm: FC<Props> = (props) => {
  const {
    type = '',
    title,
    message,
    cancelText = '閉じる',
    executeText = '実行する',
    func,
    setOpen,
    cancel = () => setOpen(false),
  } = props;
  return (
    <CustomModal setOpen={setOpen}>
      <div className="relative  rounded-lg shadow-lg bg-white p-4 overflow-hidden w-[330px] lg:max-h-[500px] 2xl:max-h-[800px] overflow-y-auto">
        <div className="mb-3 ">
          <div className="flex items-center gap-3 mb-5">
            <div>
              <Icons.alert
                className={cn(
                  type === 'error'
                    ? 'text-red-500'
                    : type === 'info'
                    ? 'text-blue-500'
                    : 'text-gray-500',
                  'text-2xl'
                )}
              />
            </div>
            <p
              className={cn(
                type === 'error'
                  ? 'text-red-500'
                  : type === 'info'
                  ? 'text-blue-500'
                  : 'text-gray-500',
                'text-xl'
              )}
            >
              {title}
            </p>
          </div>
          <div className="absolute top-3 right-4 w-[32px] h-[32px]">
            <img className="" src={IMAGES.LOGO.PATH} alt={IMAGES.LOGO.ALT} />
          </div>
          {message.map((line, index) => (
            <p className="px-3 mb-2 text-gray-500" key={index}>
              {line}
            </p>
          ))}
        </div>
        <div className="flex justify-end gap-4">
          <PrimaryButton
            variant={
              type === 'error'
                ? 'primaryRed'
                : type === 'alert'
                ? 'primaryBlue'
                : 'default'
            }
            onClick={func}
          >
            {executeText}
          </PrimaryButton>
          <PrimaryButton
            variant={
              type === 'error'
                ? 'errorGhost'
                : type === 'alert'
                ? 'alertGhost'
                : 'ghost'
            }
            onClick={cancel}
          >
            {cancelText}
          </PrimaryButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default CommonConfirm;
