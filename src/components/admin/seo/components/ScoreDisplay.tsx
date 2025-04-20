
import React from 'react';
import { CircularProgress } from './CircularProgress';
import { getScoreColor } from '../utils/scoreUtils';

interface ScoreDisplayProps {
  score: number;
  readingTime: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, readingTime }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <CircularProgress score={score} />
      <div className="text-center">
        <h3 className={`text-lg font-medium ${getScoreColor(score)}`}>
          {score >= 80 ? 'Excelente' : score >= 60 ? 'Bom' : 'Precisa melhorar'}
        </h3>
        <p className="text-sm text-[#68737D] mt-1">
          Tempo de leitura médio: {readingTime} minutos
        </p>
      </div>
    </div>
  );
};
