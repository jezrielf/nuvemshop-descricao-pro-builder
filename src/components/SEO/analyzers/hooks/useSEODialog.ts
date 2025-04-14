
import { useState } from 'react';
import { ProductDescription } from '@/types/editor';
import { useSEOAnalysis } from './useSEOAnalysis';

export const useSEODialog = (description: ProductDescription | null) => {
  const [open, setOpen] = useState(false);
  const { 
    keyword, 
    setKeyword, 
    analyzing, 
    results, 
    handleAnalyze 
  } = useSEOAnalysis(description);

  return {
    open,
    setOpen,
    keyword,
    setKeyword,
    analyzing,
    results,
    handleAnalyze
  };
};
