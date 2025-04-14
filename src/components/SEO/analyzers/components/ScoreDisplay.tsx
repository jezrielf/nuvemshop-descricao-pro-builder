
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="text-center">
      <div className="text-base font-medium mb-1">
        Pontuação SEO
      </div>
      <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
        {score}/100
      </div>
      <Progress 
        value={score} 
        max={100} 
        className={`h-1.5 mt-1.5 ${getProgressColor(score)}`} 
      />
    </div>
  );
};
