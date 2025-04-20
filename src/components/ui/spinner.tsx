
import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Spinner = ({ size = 'medium', className }: SpinnerProps) => {
  return (
    <div 
      className={cn(
        'nimbus-spinner', 
        size,
        className
      )}
      aria-label="Loading"
    />
  );
};
