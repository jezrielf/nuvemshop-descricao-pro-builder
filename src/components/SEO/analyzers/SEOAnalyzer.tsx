
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ProductDescription } from '@/types/editor';
import { AnalyzerDialogHeader } from './components/AnalyzerDialogHeader';
import { AnalyzerDialogContent } from './components/AnalyzerDialogContent';
import { useSEODialog } from './hooks/useSEODialog';

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
        <Button variant="outline" size="sm" className="flex items-center">
          <Search className="h-4 w-4 mr-1" />
          Análise SEO
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden p-4">
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
