
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getScoreBg } from '../utils/scoreUtils';

interface DensityData {
  category: string;
  value: number;
  optimal: number;
  status: 'optimal' | 'low' | 'high';
}

interface KeywordDensityProps {
  data: DensityData[];
}

export const KeywordDensity: React.FC<KeywordDensityProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    if (status === 'optimal') return 'bg-[#1DB779]';
    if (status === 'low') return 'bg-[#F9B944]';
    return 'bg-[#E54D2E]';
  };

  const getStatusText = (status: string) => {
    if (status === 'optimal') return 'Ótimo';
    if (status === 'low') return 'Baixo';
    return 'Alto';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.map((item, index) => (
        <Card key={index} className="border rounded-lg overflow-hidden">
          <div className={`h-1 ${getStatusColor(item.status)} w-full`}></div>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2">{item.category}</h4>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">{item.value}%</div>
                <div className="text-xs text-[#68737D]">Ideal: {item.optimal}%</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs text-white font-medium ${getStatusColor(item.status)}`}>
                {getStatusText(item.status)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
