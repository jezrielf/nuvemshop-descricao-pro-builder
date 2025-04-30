
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useEditorStore } from '@/store/editor';
import { HtmlOutputTab } from './HtmlOutputTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { extractKeywords } from '@/utils/seoUtils';
import { Badge } from '@/components/ui/badge';

const HtmlOutputDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { getHtmlOutput, description } = useEditorStore();
  const [htmlOutput, setHtmlOutput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  // Update HTML output and extract keywords when the dialog is opened or description changes
  useEffect(() => {
    if (open && description) {
      try {
        const output = getHtmlOutput();
        setHtmlOutput(output);
        
        // Extract keywords from the HTML output instead of the description
        const extractedKeywords = extractKeywordsFromHtml(output);
        setKeywords(extractedKeywords);
      } catch (error) {
        console.error('Erro ao gerar HTML ou extrair palavras-chave:', error);
        setKeywords([]);
      }
    }
  }, [open, description, getHtmlOutput]);

  // Extract keywords from HTML content
  const extractKeywordsFromHtml = (html: string): string[] => {
    try {
      // Remove todas as tags HTML para obter apenas o texto
      const textContent = html.replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Divide em palavras e filtra palavras comuns
      const words = textContent.toLowerCase()
        .replace(/[^\wáàâãéèêíìîóòôõúùûç\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 3);
      
      // Remove palavras comuns (stop words)
      const stopWords = new Set([
        'para', 'como', 'mais', 'este', 'esta', 'isso', 'aquilo',
        'pelo', 'pela', 'pelos', 'pelas', 'seja', 'seus', 'suas',
        'que', 'por', 'com', 'sem', 'uma', 'dos', 'das', 'nos'
      ]);
      
      // Conta frequência de palavras
      const wordFreq: Record<string, number> = {};
      words.forEach(word => {
        if (!stopWords.has(word)) {
          wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
      });
      
      // Seleciona as 10 palavras mais frequentes
      return Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word]) => word);
    } catch (error) {
      console.error('Erro ao extrair palavras-chave do HTML:', error);
      return [];
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Ver HTML
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Visualização do HTML</DialogTitle>
          <DialogDescription>
            Visualize o HTML da descrição e análise SEO.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="seo">Análise SEO</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html">
            <HtmlOutputTab htmlOutput={htmlOutput} />
          </TabsContent>
          
          <TabsContent value="seo">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Palavras-chave Detectadas</h3>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="outline">{keyword}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Recomendações SEO</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Adicione o título do produto como principal H1 ao salvar na Nuvemshop</li>
                  <li>• Use as palavras-chave acima nos primeiros parágrafos</li>
                  <li>• Adicione texto ALT em todas as imagens</li>
                  <li>• Mantenha uma densidade de palavras-chave entre 1-2%</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HtmlOutputDialog;
