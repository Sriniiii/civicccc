import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
          
          // Variants
          {
            'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-civic': 
              variant === 'primary',
            'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500': 
              variant === 'secondary',
            'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500': 
              variant === 'outline',
            'text-primary-500 hover:bg-primary-50 focus:ring-primary-500': 
              variant === 'ghost',
            'bg-error text-white hover:bg-red-600 focus:ring-error': 
              variant === 'destructive',
          },
          
          // Sizes
          {
            'px-3 py-2 text-sm h-9': size === 'sm',
            'px-4 py-3 text-base h-12': size === 'md',
            'px-6 py-4 text-lg h-14': size === 'lg',
            'p-3 h-12 w-12': size === 'icon',
          },
          
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
