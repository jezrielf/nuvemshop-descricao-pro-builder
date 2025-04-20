
import React from 'react';
import { Spinner } from '@/components/ui/spinner';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Spinner size={size} className="mb-3" />
      {text && (
        <p className="text-center text-muted-foreground">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
