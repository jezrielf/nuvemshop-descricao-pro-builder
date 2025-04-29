
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { HeadingStructure } from '../../types/headingTypes';

interface HeadingsListProps {
  headingStructure: HeadingStructure;
}

export const HeadingsList: React.FC<HeadingsListProps> = ({ headingStructure }) => {
  return (
    <div className="space-y-2">
      {headingStructure.headings.length > 0 ? (
        headingStructure.headings.map((heading, index) => (
          <div 
            key={index} 
            className={`flex items-start border-l-4 pl-3 py-1 ${
              heading.level === 1 ? 'border-blue-500 font-bold' : 
              heading.level === 2 ? 'border-green-500 ml-4' :
              heading.level === 3 ? 'border-yellow-500 ml-8' :
              heading.level === 4 ? 'border-orange-500 ml-12' :
              heading.level === 5 ? 'border-red-500 ml-16' :
              'border-purple-500 ml-20'
            }`}
          >
            <Badge variant="outline" className="mr-2">H{heading.level}</Badge>
            <span className="text-sm">{heading.text}</span>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">
          Nenhum cabeçalho detectado na descrição.
        </p>
      )}
    </div>
  );
};
