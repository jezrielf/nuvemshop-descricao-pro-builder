
import React from 'react';
import { CheckItem } from './CheckItem';
import { SEOCheckItem } from '../types';

interface CategoryChecksProps {
  category: string;
  checks: SEOCheckItem[];
}

export const CategoryChecks: React.FC<CategoryChecksProps> = ({ 
  category, 
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
    <div className="space-y-2">
      <h3 className="text-md font-medium capitalize px-1">
        {getCategoryName(category)}
      </h3>
      
      {checks.map(check => (
        <CheckItem 
          key={check.id}
          id={check.id}
          title={check.title}
          description={check.description}
          status={check.status}
        />
      ))}
    </div>
  );
};
