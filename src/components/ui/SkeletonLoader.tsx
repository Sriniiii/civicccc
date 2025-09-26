import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'text' | 'rect' | 'circle';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  shape = 'rect',
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-gray-200 animate-pulse',
        {
          'h-4 rounded': shape === 'text',
          'rounded-lg': shape === 'rect',
          'rounded-full': shape === 'circle',
        },
        className
      )}
      {...props}
    />
  );
};
