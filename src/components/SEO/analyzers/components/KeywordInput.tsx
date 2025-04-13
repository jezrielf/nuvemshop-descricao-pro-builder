
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface KeywordInputProps {
  keyword: string;
  setKeyword: (value: string) => void;
  onAnalyze: () => void;
  analyzing: boolean;
  disabled: boolean;
}

export const KeywordInput: React.FC<KeywordInputProps> = ({ 
  keyword, 
  setKeyword, 
  onAnalyze, 
  analyzing, 
  disabled 
}) => {
  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Digite sua palavra-chave principal..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button 
        onClick={onAnalyze} 
        disabled={analyzing || disabled}
      >
        {analyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analisando...
          </>
        ) : (
          "Analisar"
        )}
      </Button>
    </div>
  );
};
