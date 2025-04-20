
import React from 'react';
import { useEditorStore } from '@/store/editor';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';

const ProductsKeywordsAnalysis: React.FC = () => {
  const { savedDescriptions } = useEditorStore();

  const getKeywords = (text: string): string[] => {
    const stopWords = ['de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos'];
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word));
    
    const wordCount: Record<string, number> = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
  };

  const productsAnalysis = savedDescriptions.map(desc => {
    const textContent = getTextContentFromDescription(desc);
    const wordCount = textContent.split(/\s+/).filter(Boolean).length;
    const keywords = getKeywords(textContent);

    return {
      name: desc.name,
      wordCount,
      keywords,
      id: desc.id,
      updatedAt: desc.updatedAt
    };
  });

  if (productsAnalysis.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center p-8">
        <h3 className="text-lg font-medium mb-2">Nenhuma descrição encontrada</h3>
        <p className="text-muted-foreground">
          Você ainda não criou nenhuma descrição de produto.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Análise de Produtos e Palavras-chave</h2>
      
      <ScrollArea className="h-[500px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Total de Palavras</TableHead>
              <TableHead>Palavras-chave Principais</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsAnalysis.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.wordCount}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {product.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default ProductsKeywordsAnalysis;
