
import React from 'react';
import { Spinner as NimbusSpinner } from '@nimbus-ds/components';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Spinner = ({ size = 'medium', className }: SpinnerProps) => {
  return <NimbusSpinner size={size} className={className} />;
};
