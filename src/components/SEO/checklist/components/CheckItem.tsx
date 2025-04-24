
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle, LightbulbIcon } from 'lucide-react';

interface CheckItemProps {
  id: string;
  title: string;
  description: string;
  status: 'pass' | 'fail' | 'warning';
  suggestion?: string;
}

export const CheckItem: React.FC<CheckItemProps> = ({ 
  id, 
  title, 
  description, 
  status,
  suggestion
}) => {
  const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  const getStatusColor = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'fail':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div key={id} className="flex flex-col p-3 border rounded-md">
      <div className="flex items-start">
        <div className="mr-3 mt-0.5 flex-shrink-0">
          {getStatusIcon(status)}
        </div>
        <div className="flex-grow">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <Badge className={`ml-2 ${getStatusColor(status)}`}>
          {status === 'pass' ? 'OK' : 
           status === 'warning' ? 'Atenção' : 'Erro'}
        </Badge>
      </div>
      
      {suggestion && (
        <div className="mt-2 ml-8 flex items-start">
          <LightbulbIcon className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
          <p className="text-sm text-blue-700">{suggestion}</p>
        </div>
      )}
    </div>
  );
};
