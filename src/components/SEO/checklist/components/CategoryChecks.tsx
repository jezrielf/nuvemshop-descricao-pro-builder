
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
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div 
      className={cn(
        "p-3 mb-2 rounded-md border",
        getStatusColor(check.status)
      )}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {getStatusIcon(check.status)}
        </div>
        <div>
          <h4 className="font-medium text-sm">{check.title}</h4>
          <p className="text-sm text-gray-600">{check.description}</p>
          {check.suggestion && (
            <p className="text-xs italic mt-1 text-gray-500">{check.suggestion}</p>
          )}
        </div>
      </div>
    </div>
  );
};
