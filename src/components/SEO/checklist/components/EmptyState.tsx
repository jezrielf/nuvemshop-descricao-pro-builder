
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <AlertCircle className="h-10 w-10 text-gray-400 mb-4" />
      <p className="text-center text-gray-500">
        {message}
      </p>
    </div>
  );
};
