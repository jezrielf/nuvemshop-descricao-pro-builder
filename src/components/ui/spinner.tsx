
import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Spinner = ({ size = 'medium', className }: SpinnerProps) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-t-transparent",
          sizeClasses[size],
          className
        )}
        style={{ borderTopColor: 'transparent' }}
      />
    </div>
  );
};
