
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ProductDescription } from '@/types/editor';
import { AnalyzerDialogHeader } from './components/AnalyzerDialogHeader';
import { AnalyzerDialogContent } from './components/AnalyzerDialogContent';
import { useSEODialog } from './hooks/useSEODialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SEOAnalyzerProps {
  description: ProductDescription | null;
}

const SEOAnalyzer: React.FC<SEOAnalyzerProps> = ({ description }) => {
  // Filter to only include visible blocks for preview analysis
  const visibleDescription = description ? {
    ...description,
    blocks: description.blocks.filter(block => block.visible)
  } : null;
  
  const {
    open,
    setOpen,
    keyword,
    setKeyword,
    analyzing,
    results,
    handleAnalyze
  } = useSEODialog(visibleDescription);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Analisador SEO</span>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden p-0">
        <AnalyzerDialogHeader />
        <ScrollArea className="flex-grow">
          <div className="p-4">
            <AnalyzerDialogContent
              keyword={keyword}
              setKeyword={setKeyword}
              onAnalyze={handleAnalyze}
              analyzing={analyzing}
              results={results}
              disabled={!visibleDescription}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SEOAnalyzer;
