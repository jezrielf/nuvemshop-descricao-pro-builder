
import { useMemo } from 'react';
import { ProductDescription } from '@/types/editor';
import { useSEOChecks } from './useSEOChecks';
import { SEOCheckItem } from '../types';

export const useSEOChecklist = (description: ProductDescription | null) => {
  const { checks, scoreItem } = useSEOChecks(description);

  const checklistItems = useMemo(() => {
    // Group checks by category
    const categories = checks
      .filter(check => check.id !== 'overall-score')
      .reduce((acc, check) => {
        const categoryName = check.category;
        if (!acc[categoryName]) {
          acc[categoryName] = [];
        }
        acc[categoryName].push(check);
        return acc;
      }, {} as Record<string, SEOCheckItem[]>);
    
    // Convert to array format expected by the component
    // Sort categories to ensure consistent order
    return Object.entries(categories)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, items]) => ({
        title: category === 'content' ? 'Conteúdo' : 
               category === 'images' ? 'Imagens' : 
               category === 'structure' ? 'Estrutura' : category,
        items
      }));
  }, [checks]);

  const progress = scoreItem ? 
    (scoreItem.status === 'pass' ? 100 : 
     scoreItem.status === 'warning' ? 60 : 30) : 0;

  return { 
    checklistItems, 
    progress 
  };
};
