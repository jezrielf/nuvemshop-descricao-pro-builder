
import React from 'react';
import { getScoreBg } from '../utils/scoreUtils';
import { ReadabilityBreakdownItem } from '../types';

interface MetricsBreakdownProps {
  items: ReadabilityBreakdownItem[];
}

export const MetricsBreakdown: React.FC<MetricsBreakdownProps> = ({ items }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-sm font-medium mb-3">Detalhamento</h3>
      {items.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-medium">{item.metric}</span>
              <div className="flex items-center mt-1">
                <span className="text-xs mr-2">Atual: {item.current}</span>
                <span className="text-xs text-muted-foreground">Ideal: {item.ideal}</span>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-md ${getScoreBg(item.score)} text-white text-xs font-medium`}>
              {item.score}
            </div>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full ${getScoreBg(item.score)}`} 
              style={{ width: `${item.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
