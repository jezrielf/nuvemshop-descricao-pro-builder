
import React from 'react';
import { Loader } from '@nimbus-ds/components';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  text = 'Carregando...'
}) => {
  // Map our size values to Nimbus size values
  const nimbusSize = {
    small: 'small',
    medium: 'medium',
    large: 'large'
  }[size];

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Loader size={nimbusSize} />
      {text && <p className="mt-2 text-sm text-neutral-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
