
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ReadabilityMetrics } from './types';
import { CircularProgress } from './components/CircularProgress';
import { getScoreColor } from './utils/scoreUtils';

interface MetricsOverviewProps {
  metrics: ReadabilityMetrics;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  const overviewItems = [
    {
      label: 'Pontuação Geral',
      value: metrics.overallScore,
      type: 'score'
    },
    {
      label: 'Tempo de Leitura',
      value: metrics.readingTime,
      type: 'text'
    },
    {
      label: 'Tamanho Médio das Frases',
      value: metrics.averageSentenceLength,
      type: 'text'
    },
    {
      label: 'Palavras Complexas',
      value: `${metrics.complexWordsPercentage}%`,
      type: 'text'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {overviewItems.map((item, index) => (
        <Card key={index} className="border rounded-lg overflow-hidden">
          <CardContent className="p-4 flex flex-col items-center justify-center h-full">
            <h3 className="text-sm font-medium text-[#68737D] mb-2">{item.label}</h3>
            
            {item.type === 'score' ? (
              <div className="flex flex-col items-center">
                <CircularProgress score={item.value as number} />
                <span className={`text-lg font-bold ${getScoreColor(item.value as number)}`}>
                  {item.value}
                </span>
              </div>
            ) : (
              <div className="text-xl font-bold text-[#303846] mt-2">
                {item.value}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
