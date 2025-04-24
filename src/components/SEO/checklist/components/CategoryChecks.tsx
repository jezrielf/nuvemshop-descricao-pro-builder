
import React from 'react';
import { CheckItem } from './CheckItem';
import { SEOCheckItem } from '../types';

interface CategoryChecksProps {
  title: string;
  checks: SEOCheckItem[];
}

export const CategoryChecks: React.FC<CategoryChecksProps> = ({ 
  title, 
  checks 
}) => {
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'content': return 'Conteúdo';
      case 'images': return 'Imagens';
      case 'structure': return 'Estrutura';
      case 'metatags': return 'Meta Tags';
      default: return category;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium capitalize">
        {getCategoryName(title)}
      </h3>
      
      <div className="space-y-3">
        {checks.map(check => (
          <CheckItem 
            key={check.id}
            id={check.id}
            title={check.title}
            description={check.description}
            status={check.status}
            suggestion={check.suggestion}
          />
        ))}
      </div>
    </div>
  );
};
