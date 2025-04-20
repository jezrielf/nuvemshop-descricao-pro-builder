
import React from 'react';
import { Spinner as NimbusSpinner } from '@nimbus-ds/components';
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
      <NimbusSpinner size={size} />
    </div>
  );
};
