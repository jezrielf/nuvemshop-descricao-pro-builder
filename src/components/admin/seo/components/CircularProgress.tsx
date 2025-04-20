
import React from 'react';
import { getScoreColor } from '../utils/scoreUtils';

interface CircularProgressProps {
  score: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ score }) => {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center mb-4">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="#E9ECEF" 
          strokeWidth="10" 
        />
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke={score >= 80 ? "#1DB779" : score >= 60 ? "#F9B944" : "#E54D2E"} 
          strokeWidth="10" 
          strokeDasharray={`${2 * Math.PI * 45 * score / 100} ${2 * Math.PI * 45 * (1 - score / 100)}`}
          strokeDashoffset="0"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-xs text-[#6C757D]">de 100</span>
      </div>
    </div>
  );
};
