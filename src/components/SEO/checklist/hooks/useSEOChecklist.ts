
import { useMemo, useState, useCallback } from 'react';
import { ProductDescription } from '@/types/editor';
import { useSEOChecks } from './useSEOChecks';

export const useSEOChecklist = (description: ProductDescription | null) => {
  const { checks, scoreItem } = useSEOChecks(description);
  const [refreshKey, setRefreshKey] = useState(0);

  // Group checks by category, excluding the overall score
  const checklistItems = useMemo(() => {
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

  // Calculate scores from checks
  const overallScore = useMemo(() => {
    const passedChecks = checks.filter(check => check.status === 'pass').length;
    const totalChecks = checks.length;
    return totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;
  }, [checks]);

  const contentScore = useMemo(() => {
    const contentChecks = checks.filter(check => check.category === 'content');
    const passedChecks = contentChecks.filter(check => check.status === 'pass').length;
    const totalChecks = contentChecks.length;
    return totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;
  }, [checks]);

  const technicalScore = useMemo(() => {
    const techChecks = checks.filter(check => ['images', 'structure', 'metatags'].includes(check.category));
    const passedChecks = techChecks.filter(check => check.status === 'pass').length;
    const totalChecks = techChecks.length;
    return totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;
  }, [checks]);

  const contentChecks = useMemo(() => {
    return checks.filter(check => check.category === 'content');
  }, [checks]);

  const technicalChecks = useMemo(() => {
    return checks.filter(check => ['images', 'structure', 'metatags'].includes(check.category));
  }, [checks]);

  const runChecklist = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  const checklistData = {
    overallScore,
    contentScore,
    technicalScore,
    contentChecks,
    technicalChecks
  };

  return { 
    checklistItems, 
    progress,
    checklistData,
    runChecklist
  };
};
