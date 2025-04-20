
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
  // Make sure size is a valid Nimbus spinner size
  const spinnerSize = ['small', 'medium', 'large'].includes(size) ? size : 'medium';
  
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <NimbusSpinner size={spinnerSize} />
    </div>
  );
};
