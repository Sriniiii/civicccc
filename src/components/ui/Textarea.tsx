import React from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        
        <textarea
          className={cn(
            'w-full px-4 py-3 rounded-xl border border-border bg-surface text-text-primary placeholder-text-secondary',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:bg-gray-50 disabled:text-text-secondary disabled:cursor-not-allowed',
            'transition-all duration-200 min-h-[120px]',
            {
              'border-error focus:ring-error': error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        
        {error && (
          <p className="text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
