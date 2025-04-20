
import React from 'react';
import { Loader } from '@nimbus-ds/components';
import { cn } from '@/lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  className, 
  size = 'medium',
  ...props 
}) => {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <Loader size={size} />
    </div>
  );
};
