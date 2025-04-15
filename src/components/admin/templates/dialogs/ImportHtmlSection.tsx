
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { analyzeHtmlForTemplate } from '@/utils/htmlParsers';
import { ProductCategory, Template } from '@/types/editor';
import { Loader2 } from 'lucide-react';

interface ImportHtmlSectionProps {
  onTemplateGenerated: (template: Template) => void;
  selectedCategory: ProductCategory;
}

export const ImportHtmlSection: React.FC<ImportHtmlSectionProps> = ({
  onTemplateGenerated,
  selectedCategory,
}) => {
  const [htmlInput, setHtmlInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateFromHtml = () => {
    if (!htmlInput.trim()) return;

    setIsGenerating(true);
    try {
      const generatedTemplate = analyzeHtmlForTemplate(htmlInput, selectedCategory);
      onTemplateGenerated(generatedTemplate);
      setHtmlInput('');
    } catch (error) {
      console.error('Error generating template from HTML:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="html-input" className="text-sm font-medium">
          Cole o HTML aqui
        </label>
        <Textarea
          id="html-input"
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          placeholder="Cole o código HTML aqui para gerar um template automaticamente..."
          className="min-h-[200px]"
        />
      </div>
      <Button
        onClick={handleGenerateFromHtml}
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
