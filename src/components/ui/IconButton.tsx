import React from 'react';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'ghost', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
          
          // Variants
          {
            'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-civic': 
              variant === 'primary',
            'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500': 
              variant === 'secondary',
            'text-text-secondary hover:bg-gray-100 focus:ring-gray-300': 
              variant === 'ghost',
            'border-2 border-gray-300 text-text-secondary hover:bg-gray-50 focus:ring-gray-300': 
              variant === 'outline',
          },
          
          // Sizes
          {
            'p-1.5 h-8 w-8': size === 'sm',
            'p-2.5 h-11 w-11': size === 'md',
            'p-3 h-14 w-14': size === 'lg',
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

IconButton.displayName = 'IconButton';

export { IconButton };
