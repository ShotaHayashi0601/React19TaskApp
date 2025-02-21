import React, { forwardRef } from 'react';
import { Button, ButtonVariant } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  onClick?: (event: React.MouseEvent) => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  width?: string;
  height?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const PrimaryButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    onClick,
    children,
    variant = 'primary',
    width,
    height,
    disabled = false,
    type = 'button',
  } = props;

  return (
    <Button
      ref={ref} // ref を渡す
      variant={variant}
      onClick={onClick}
      className={cn(
        width && `w-${width}`,
        height && `h-${height}`
        // disabled && "cursor-not-allowed"
      )}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
});

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
