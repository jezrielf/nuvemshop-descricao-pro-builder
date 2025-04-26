
import React from 'react';
import { KeywordInput } from './KeywordInput';
import { ScoreDisplay } from './ScoreDisplay';
import { RecommendationsList } from './RecommendationsList';
import { KeywordsList } from './KeywordsList';
import { EmptyState } from './EmptyState';
import { SEOResult } from '../types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AnalyzerDialogContentProps {
  keyword: string;
  setKeyword: (value: string) => void;
  onAnalyze: () => void;
  analyzing: boolean;
  results: SEOResult | null;
  disabled?: boolean;
}

export const AnalyzerDialogContent: React.FC<AnalyzerDialogContentProps> = ({
  keyword,
  setKeyword,
  onAnalyze,
  analyzing,
  results,
  disabled
}) => {
  return (
    <div className="py-3 flex-1 flex flex-col h-full overflow-hidden">
      <KeywordInput 
        keyword={keyword}
        setKeyword={setKeyword}
        onAnalyze={onAnalyze}
        analyzing={analyzing}
        disabled={disabled}
      />
      
      {results ? (
        <ScrollArea className="h-[calc(100%-80px)] flex-grow mt-2">
          <div className="space-y-2">
            <ScoreDisplay score={results.score} />
            <RecommendationsList recommendations={results.recommendations} />
            <KeywordsList keywords={results.keywords} />
          </div>
        </ScrollArea>
      ) : (
        <EmptyState analyzing={analyzing} />
      )}
    </div>
  );
};
