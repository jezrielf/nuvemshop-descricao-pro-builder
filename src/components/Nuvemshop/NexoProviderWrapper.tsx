
import React from 'react';
import NexoProvider from './NexoProvider';

interface NexoProviderWrapperProps {
  children: React.ReactNode;
}

const NexoProviderWrapper: React.FC<NexoProviderWrapperProps> = ({ children }) => {
  return (
    <NexoProvider>
      {children}
    </NexoProvider>
  );
};

export default NexoProviderWrapper;
