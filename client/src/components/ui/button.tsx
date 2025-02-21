import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export type ButtonVariant =
  | null
  | undefined
  | 'primary'
  | 'primaryBlue'
  | 'primaryRed'
  | 'primaryOutline'
  | 'primaryGhost'
  | 'errorGhost'
  | 'alertGhost'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'blueOutline'
  | 'redOutline'
  | 'secondary'
  | 'ghost';
// | "link";

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        primaryGhost:
          'hover:bg-green-thin hover:text-accent-foreground text-green-600 hover:text-green-dark underline-offset-4 underline',
        errorGhost:
          'hover:bg-accent hover:text-accent-foreground text-red-600 hover:text-red-dark underline-offset-4 underline',
        alertGhost:
          'hover:bg-accent hover:text-accent-foreground text-blue-600 hover:text-blue-dark underline-offset-4 underline',
        primaryOutline:
          'text-green-600 outline outline-1 outline-green-primary hover:bg-green-thin hover:text-green-dark hover:outline-green-dark',
        blueOutline:
          'text-blue-600 outline outline-1 outline-blue-primary hover:bg-blue-thin hover:text-blue-dark hover:outline-blue-dark',
        redOutline:
          'text-red-600 outline outline-1 outline-red-primary hover:bg-red-thin hover:text-red-dark hover:outline-red-dark',
        primary: 'bg-green-primary text-white-primary hover:bg-green-dark',
        primaryRed: 'bg-red-primary text-white-primary hover:bg-red-dark',
        primaryBlue: 'bg-blue-primary text-white-primary hover:bg-blue-dark',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
