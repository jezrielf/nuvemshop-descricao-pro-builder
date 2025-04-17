
import React from 'react';
import { SEOCheckItem } from '../types';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryChecksProps {
  check: SEOCheckItem;
}

export const CategoryChecks: React.FC<CategoryChecksProps> = ({ check }) => {
  const getStatusColor = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass': return 'bg-green-50 border-green-100';
      case 'warning': return 'bg-yellow-50 border-yellow-100';
      case 'fail': return 'bg-red-50 border-red-100';
      default: return '';
    }
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div 
      className={cn(
        "p-2 mb-1.5 rounded-md border text-sm",
        getStatusColor(check.status)
      )}
    >
      <div className="flex items-start">
        <div className="mr-2 mt-0.5 flex-shrink-0">
          {getStatusIcon(check.status)}
        </div>
        <div>
          <h4 className="font-medium text-xs">{check.title}</h4>
          <p className="text-xs text-gray-600">{check.description}</p>
          {check.suggestion && (
            <p className="text-xs italic mt-0.5 text-gray-500">{check.suggestion}</p>
          )}
        </div>
      </div>
    </div>
  );
};
