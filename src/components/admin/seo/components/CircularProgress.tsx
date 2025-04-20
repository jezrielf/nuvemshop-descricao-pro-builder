
import React from 'react';
import { getScoreColor, getScoreBg } from '../utils/scoreUtils';

interface CircularProgressProps {
  score: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ score }) => {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center mb-4">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="#e2e8f0" 
          strokeWidth="10" 
        />
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke={score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444"} 
          strokeWidth="10" 
          strokeDasharray={`${2 * Math.PI * 45 * score / 100} ${2 * Math.PI * 45 * (1 - score / 100)}`}
          strokeDashoffset={2 * Math.PI * 45 * 0.25}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-xs text-muted-foreground">de 100</span>
      </div>
    </div>
  );
};
