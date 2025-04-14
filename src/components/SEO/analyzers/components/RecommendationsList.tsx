
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
      <h3 className="text-base font-medium mb-1.5">Recomendações</h3>
      <ScrollArea className="h-[200px]">
        <ul className="space-y-1.5 pr-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-1.5">
              {rec.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />}
              {rec.type === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />}
              {rec.type === 'error' && <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />}
              <span className="text-sm">{rec.text}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};
