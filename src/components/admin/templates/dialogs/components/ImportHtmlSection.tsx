
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Template, ProductCategory } from '@/types/editor';
import { analyzeHtmlTemplate } from '@/utils/htmlParsers/htmlTemplateAnalyzer';
import { v4 as uuidv4 } from 'uuid';

interface ImportHtmlSectionProps {
  onTemplateGenerated: (template: Template) => void;
  selectedCategory: ProductCategory;
}

const ImportHtmlSection: React.FC<ImportHtmlSectionProps> = ({ 
  onTemplateGenerated, 
  selectedCategory 
}) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!htmlContent.trim()) {
      setError('Por favor, insira o conteúdo HTML');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);
      
      // Analyze HTML and convert to blocks
      const blocks = analyzeHtmlTemplate(htmlContent);
      
      // Create a new template
      const newTemplate: Template = {
        id: uuidv4(),
        name: `Template importado ${new Date().toLocaleDateString()}`,
        category: selectedCategory,
        blocks: blocks,
        thumbnail: '/placeholder.svg'
      };
      
      // Send the template back to the parent component
      onTemplateGenerated(newTemplate);
      
    } catch (err) {
      console.error('Error analyzing HTML:', err);
      setError('Erro ao analisar o HTML. Verifique o formato e tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Importar HTML</h3>
        <p className="text-sm text-gray-500 mb-4">
          Cole o código HTML da descrição de produto para criar um template automaticamente
        </p>
        
        <Textarea
          placeholder="Cole o código HTML aqui..."
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          className="min-h-[200px]"
        />
        
        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleConvert} 
          disabled={isAnalyzing || !htmlContent.trim()}
        >
          {isAnalyzing ? 'Analisando...' : 'Converter HTML para Template'}
        </Button>
      </div>
    </div>
  );
};

export default ImportHtmlSection;
