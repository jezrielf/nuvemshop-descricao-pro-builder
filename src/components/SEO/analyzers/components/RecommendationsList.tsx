
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { SEORecommendation } from '../types';

interface RecommendationsListProps {
  recommendations: SEORecommendation[];
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({ recommendations }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Recomendações</h3>
      <ul className="space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start gap-2">
            {rec.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />}
            {rec.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
            {rec.type === 'error' && <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />}
            <span>{rec.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
