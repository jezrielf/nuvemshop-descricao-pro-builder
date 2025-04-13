
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { SEOCheckItem } from '../types';

interface ScoreCardProps {
  check: SEOCheckItem;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ check }) => {
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
    <Card className="border-2">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">{check.title}</h3>
            <p className="text-sm text-gray-500">{check.description}</p>
          </div>
          <div className={`px-3 py-2 rounded-full ${getStatusColor(check.status)}`}>
            {getStatusIcon(check.status)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
