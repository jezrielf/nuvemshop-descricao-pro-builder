
import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';
import { AnalyzerDialogHeader } from './components/AnalyzerDialogHeader';
import { AnalyzerDialogContent } from './components/AnalyzerDialogContent';
import { useSEODialog } from './hooks/useSEODialog';
import { calculateDialogTiming, isDialogTimingAcceptable } from '../utils/contentUtils';

interface SEOAnalyzerProps {
  description: ProductDescription | null;
}

const SEOAnalyzer: React.FC<SEOAnalyzerProps> = ({ description }) => {
  const {
    open,
    setOpen,
    keyword,
    setKeyword,
    analyzing,
    results,
    handleAnalyze
  } = useSEODialog(description);
  
  const openTimeRef = useRef<number>(0);
  
  useEffect(() => {
    if (open) {
      openTimeRef.current = Date.now();
    } else if (openTimeRef.current > 0) {
      const timing = calculateDialogTiming(openTimeRef.current);
      const isAcceptable = isDialogTimingAcceptable(timing);
      console.log(`Dialog timing: ${timing}ms (${isAcceptable ? 'acceptable' : 'slow'})`);
      openTimeRef.current = 0;
    }
  }, [open]);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className="w-full text-left py-1.5 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={handleClick}
          data-testid="seo-analyzer"
        >
          Analisador SEO
        </button>
      </DialogTrigger>
      <DialogContent 
        className="max-w-md max-h-[85vh] flex flex-col overflow-hidden p-3" 
        onClick={(e) => e.stopPropagation()}
      >
        <AnalyzerDialogHeader />
        <div className="flex-grow overflow-hidden">
          <AnalyzerDialogContent
            keyword={keyword}
            setKeyword={setKeyword}
            onAnalyze={handleAnalyze}
            analyzing={analyzing}
            results={results}
            disabled={!description}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SEOAnalyzer;
