
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface HtmlInputTabProps {
  htmlInput: string;
  isGenerating: boolean;
  onHtmlChange: (value: string) => void;
  onGenerate: () => void;
}

export const HtmlInputTab: React.FC<HtmlInputTabProps> = ({
  htmlInput,
  isGenerating,
  onHtmlChange,
  onGenerate,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="html-input" className="text-sm font-medium">
          Cole o HTML aqui
        </label>
        <Textarea
          id="html-input"
          value={htmlInput}
          onChange={(e) => onHtmlChange(e.target.value)}
          placeholder="Cole o código HTML aqui para gerar um template automaticamente..."
          className="min-h-[200px]"
        />
      </div>
      <Button
        onClick={onGenerate}
        disabled={!htmlInput.trim() || isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Gerando template...
          </>
        ) : (
          'Gerar template do HTML'
        )}
      </Button>
    </div>
  );
};
