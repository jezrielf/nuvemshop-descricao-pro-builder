import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Template, ProductCategory } from '@/types/editor';
import { analyzeHtmlForTemplate } from '@/utils/htmlParsers';
import { useToast } from '@/hooks/use-toast';

interface HtmlImportTabProps {
  onImport: (template: Template) => void;
  isImporting: boolean;
}

export const HtmlImportTab: React.FC<HtmlImportTabProps> = ({ onImport, isImporting }) => {
  const [htmlInput, setHtmlInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('other');
  const { toast } = useToast();

  const handleImport = () => {
    if (!htmlInput.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, cole o código HTML',
        variant: 'destructive'
      });
      return;
    }

    try {
      const template = analyzeHtmlForTemplate(htmlInput, selectedCategory);
      onImport(template);
      
      toast({
        title: 'Template importado',
        description: 'HTML convertido em template com sucesso'
      });
    } catch (error) {
      console.error('Error importing HTML:', error);
      toast({
        title: 'Erro na importação',
        description: 'Não foi possível converter o HTML em template',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="html-input">Código HTML</Label>
        <Textarea
          id="html-input"
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          placeholder="Cole o código HTML aqui..."
          className="min-h-64 font-mono text-sm"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Cole o HTML completo que será analisado e convertido em blocos
        </p>
      </div>

      <Button
        onClick={handleImport}
        disabled={!htmlInput.trim() || isImporting}
        className="w-full"
      >
        {isImporting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Importando...
          </>
        ) : (
          'Importar do HTML'
        )}
      </Button>
    </div>
  );
};