import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Template, ProductCategory } from '@/types/editor';
import { analyzeHtmlForTemplate } from '@/utils/htmlParsers';
import { useToast } from '@/hooks/use-toast';

interface UrlImportTabProps {
  onImport: (template: Template) => void;
  isImporting: boolean;
}

export const UrlImportTab: React.FC<UrlImportTabProps> = ({ onImport, isImporting }) => {
  const [url, setUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('other');
  const [importing, setImporting] = useState(false);
  const { toast } = useToast();

  const handleImport = async () => {
    if (!url.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, digite uma URL válida',
        variant: 'destructive'
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      toast({
        title: 'Erro',
        description: 'URL inválida',
        variant: 'destructive'
      });
      return;
    }

    setImporting(true);
    
    try {
      // Fetch HTML from URL (this would require a proxy or CORS handling)
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (!data.contents) {
        throw new Error('Não foi possível buscar o conteúdo da URL');
      }

      const template = analyzeHtmlForTemplate(data.contents, selectedCategory);
      onImport(template);
      
      toast({
        title: 'Template importado',
        description: 'URL convertida em template com sucesso'
      });
    } catch (error) {
      console.error('Error importing from URL:', error);
      toast({
        title: 'Erro na importação',
        description: 'Não foi possível importar da URL. Tente copiar o HTML manualmente.',
        variant: 'destructive'
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="url-input">URL da Página</Label>
        <Input
          id="url-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com/produto"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Digite a URL de uma página para extrair o HTML automaticamente
        </p>
      </div>

      <div>
        <Label htmlFor="category-select">Categoria do Template</Label>
        <Select value={selectedCategory} onValueChange={(value: ProductCategory) => setSelectedCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="supplements">Suplementos</SelectItem>
            <SelectItem value="clothing">Roupas</SelectItem>
            <SelectItem value="accessories">Acessórios</SelectItem>
            <SelectItem value="shoes">Calçados</SelectItem>
            <SelectItem value="electronics">Eletrônicos</SelectItem>
            <SelectItem value="energy">Energia</SelectItem>
            <SelectItem value="casa-decoracao">Casa e Decoração</SelectItem>
            <SelectItem value="health">Saúde</SelectItem>
            <SelectItem value="luxury">Luxo</SelectItem>
            <SelectItem value="adult">Adulto</SelectItem>
            <SelectItem value="other">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleImport}
        disabled={!url.trim() || importing || isImporting}
        className="w-full"
      >
        {(importing || isImporting) ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Importando...
          </>
        ) : (
          'Importar da URL'
        )}
      </Button>
      
      <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
        <p className="text-xs text-amber-800">
          <strong>Nota:</strong> Devido a restrições de CORS, nem todas as URLs podem ser acessadas. 
          Se a importação falhar, copie o HTML manualmente na aba "HTML".
        </p>
      </div>
    </div>
  );
};