
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
  const {
    open,
    setOpen,
    keyword,
    setKeyword,
    analyzing,
    results,
    handleAnalyze
  } = useSEODialog(description);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Ferramentas SEO</span>
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
              disabled={!description}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SEOAnalyzer;
