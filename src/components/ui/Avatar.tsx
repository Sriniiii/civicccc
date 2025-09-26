import React from 'react';
import { cn } from '../../utils/cn';

const Avatar: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => (
    <span className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
);

const AvatarImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className, ...props }) => (
    <img className={cn("aspect-square h-full w-full", className)} {...props} />
);

const AvatarFallback: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => (
    <span className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-100", className)} {...props} />
);

export { Avatar, AvatarImage, AvatarFallback };
