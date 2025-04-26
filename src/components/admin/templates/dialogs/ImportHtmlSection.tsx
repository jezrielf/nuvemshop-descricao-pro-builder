
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { analyzeHtmlToTemplate } from '@/utils/htmlParsers/htmlTemplateAnalyzer';
import { Template, BlockType } from '@/types/editor';

interface ImportHtmlSectionProps {
  onTemplateGenerated: (template: Template) => void;
}

const ImportHtmlSection: React.FC<ImportHtmlSectionProps> = ({ onTemplateGenerated }) => {
  const [htmlInput, setHtmlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleImport = async () => {
    if (!htmlInput.trim()) return;
    
    try {
      setIsProcessing(true);
      
      // Use the HTML analyzer to create a template
      const template = await analyzeHtmlToTemplate(htmlInput);
      
      if (template) {
        onTemplateGenerated(template);
      }
    } catch (error) {
      console.error('Error processing HTML:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Importe um HTML existente</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Cole o HTML de uma descrição de produto já existente para converter automaticamente em um template.
        </p>
      </div>
      
      <Textarea
        placeholder="Cole o código HTML aqui..."
        rows={12}
        value={htmlInput}
        onChange={(e) => setHtmlInput(e.target.value)}
        className="font-mono text-xs"
      />
      
      <Button 
        onClick={handleImport}
        disabled={!htmlInput.trim() || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processando...
          </>
        ) : (
          'Importar HTML'
        )}
      </Button>
    </div>
  );
};

export default ImportHtmlSection;
