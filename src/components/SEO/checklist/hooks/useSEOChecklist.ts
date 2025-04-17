
import { useMemo } from 'react';
import { ProductDescription } from '@/types/editor';
import { useSEOChecks } from './useSEOChecks';

export const useSEOChecklist = (description: ProductDescription | null) => {
  const { checks, scoreItem } = useSEOChecks(description);

  const checklistItems = useMemo(() => {
    // Group checks by category, excluding the overall score
    const categorizedChecks = checks
      .filter(check => check.id !== 'overall-score')
      .reduce((acc, check) => {
        if (!acc.some(group => group.title === check.category)) {
          acc.push({
            title: check.category,
            items: checks.filter(c => c.category === check.category && c.id !== 'overall-score')
          });
        }
        return acc;
      }, [] as { title: string, items: typeof checks }[]);

    return categorizedChecks;
  }, [checks]);

  const progress = scoreItem ? (scoreItem.status === 'pass' ? 100 : scoreItem.status === 'warning' ? 60 : 30) : 0;

  return { 
    checklistItems, 
    progress 
  };
};

