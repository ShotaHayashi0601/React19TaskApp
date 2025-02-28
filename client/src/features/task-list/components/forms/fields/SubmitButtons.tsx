import WithIconButton from '@/components/atoms/WithIconButton';
import { Icons } from '@/constants/icons';
import { FormAction, formActions } from '@/types/form-action';
import { FC } from 'react';
function getActionPropsForButton(action: FormAction) {
  switch (action) {
    case formActions.ADD:
      return { icon: Icons.plus, text: '追加' };
    case formActions.UPDATE:
      return {
        icon: Icons.check,
        text: '更新',
      };
    // case formActions.DELETE:
    //   return {
    //     icon: Icons.trash,
    //     text: '削除',
    //   };
    default: {
      const exhaustiveCheck: never = action;
      throw new Error(`Unhandled action case: ${exhaustiveCheck}`);
    }
  }
}

type SubmitButtonsProps = {
  isPending: boolean;
  setOpen: (value: boolean) => void;
  action: FormAction;
};

export const SubmitButtons: FC<SubmitButtonsProps> = (props) => {
  const { isPending, setOpen, action } = props;
  const { icon: buttonIcon, text: buttonText } =
    getActionPropsForButton(action);
  return (
    <div className="mx-auto flex justify-center items-center gap-4">
      <div className="w-[120px]">
        <WithIconButton
          text={buttonText}
          type="submit"
          disabled={isPending}
          icon={buttonIcon}
        />
      </div>
      {formActions.UPDATE === action && (
        <div className="w-[120px]">
          <WithIconButton
            text={'キャンセル'}
            type="button"
            disabled={isPending}
            icon={undefined}
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
