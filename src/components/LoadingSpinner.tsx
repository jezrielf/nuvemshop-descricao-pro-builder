
import React from 'react';
import { Spinner } from '@nimbus-ds/components';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  text = 'Carregando...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Spinner size={size} />
      {text && <p className="mt-2 text-sm text-neutral-textLow">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
