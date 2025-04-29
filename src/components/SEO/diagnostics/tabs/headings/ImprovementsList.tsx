
import React from 'react';
import { Lightbulb } from 'lucide-react';

interface ImprovementsListProps {
  improvements: string[];
}

export const ImprovementsList: React.FC<ImprovementsListProps> = ({ improvements }) => {
  return (
    <div className="space-y-3">
      {improvements.length > 0 ? (
        improvements.map((imp, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs">{imp}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          Parabéns! Sua estrutura de cabeçalhos segue as melhores práticas.
        </p>
      )}
    </div>
  );
};
