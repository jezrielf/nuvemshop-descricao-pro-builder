
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ProductDescription } from '@/types/editor';
import { useSEOAnalysis } from './hooks/useSEOAnalysis';
import { KeywordInput } from './components/KeywordInput';
import { ScoreDisplay } from './components/ScoreDisplay';
import { RecommendationsList } from './components/RecommendationsList';
import { KeywordsList } from './components/KeywordsList';
import { EmptyState } from './components/EmptyState';

interface SEOAnalyzerProps {
  description: ProductDescription | null;
}

const SEOAnalyzer: React.FC<SEOAnalyzerProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const { 
    keyword, 
    setKeyword, 
    analyzing, 
    results, 
    handleAnalyze 
  } = useSEOAnalysis(description);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Search className="h-4 w-4 mr-1" />
          Análise SEO
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Análise de SEO</DialogTitle>
          <DialogDescription>
            Analise sua descrição para melhorar o posicionamento nos mecanismos de busca.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 flex-1 flex flex-col">
          <KeywordInput 
            keyword={keyword}
            setKeyword={setKeyword}
            onAnalyze={handleAnalyze}
            analyzing={analyzing}
            disabled={!description}
          />
          
          {results ? (
            <div className="space-y-6">
              <ScoreDisplay score={results.score} />
              <RecommendationsList recommendations={results.recommendations} />
              <KeywordsList keywords={results.keywords} />
            </div>
          ) : (
            <EmptyState analyzing={analyzing} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SEOAnalyzer;
