
import React from 'react';
import { NimbusToggle } from '../NimbusToggle';

interface NimbusHeaderProps {
  className?: string;
}

export const NimbusHeader: React.FC<NimbusHeaderProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-end px-4 py-2 border-b bg-gray-50 ${className}`}>
      <NimbusToggle />
    </div>
  );
};
