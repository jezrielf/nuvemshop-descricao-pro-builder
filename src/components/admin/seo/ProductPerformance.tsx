
import React, { useMemo, useState } from 'react';
import { useEditorStore } from '@/store/editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';
import { Eye } from 'lucide-react';
import { ProductDescription } from '@/types/editor';

const ProductPerformance: React.FC = () => {
  const { savedDescriptions } = useEditorStore();
  const [selectedProduct, setSelectedProduct] = useState<ProductDescription | null>(null);
  
  const productsData = useMemo(() => {
    // Definir a função de extração de palavras-chave aqui para evitar o erro de referência
    const extractKeywords = (text: string): string[] => {
      // Remove common words and get potential keywords
      const stopWords = ['de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas', 'ao', 'ele', 'das', 'à', 'seu', 'sua', 'ou', 'quando', 'muito', 'nos', 'já', 'eu', 'também', 'só', 'pelo', 'pela', 'até', 'isso', 'ela', 'entre', 'depois', 'sem', 'mesmo', 'aos', 'ter', 'seus', 'quem', 'nas', 'me', 'esse', 'eles', 'você', 'essa', 'num', 'nem', 'suas', 'meu', 'às', 'minha', 'numa', 'pelos', 'elas', 'qual', 'nós', 'lhe', 'deles', 'essas', 'esses', 'pelas', 'este', 'dele', 'tu', 'te', 'vocês', 'vos', 'lhes', 'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas', 'nosso', 'nossa', 'nossos', 'nossas', 'dela', 'delas', 'esta', 'estes', 'estas', 'aquele', 'aquela', 'aqueles', 'aquelas', 'isto', 'aquilo', 'estou', 'está', 'estamos', 'estão', 'estive', 'esteve', 'estivemos', 'estiveram', 'estava', 'estávamos', 'estavam', 'estivera', 'estivéramos', 'esteja', 'estejamos', 'estejam', 'estivesse', 'estivéssemos', 'estivessem', 'estiver', 'estivermos', 'estiverem', 'hei', 'há', 'havemos', 'hão', 'houve', 'houvemos', 'houveram', 'houvera', 'houvéramos', 'haja', 'hajamos', 'hajam', 'houvesse', 'houvéssemos', 'houvessem', 'houver', 'houvermos', 'houverem', 'houverei', 'houverá', 'houveremos', 'houverão', 'houveria', 'houveríamos', 'houveriam', 'sou', 'somos', 'são', 'era', 'éramos', 'eram', 'fui', 'foi', 'fomos', 'foram', 'fora', 'fôramos', 'seja', 'sejamos', 'sejam', 'fosse', 'fôssemos', 'fossem', 'for', 'formos', 'forem', 'serei', 'será', 'seremos', 'serão', 'seria', 'seríamos', 'seriam', 'tenho', 'tem', 'temos', 'tém', 'tinha', 'tínhamos', 'tinham', 'tive', 'teve', 'tivemos', 'tiveram', 'tivera', 'tivéramos', 'tenha', 'tenhamos', 'tenham', 'tivesse', 'tivéssemos', 'tivessem', 'tiver', 'tivermos', 'tiverem', 'terei', 'terá', 'teremos', 'terão', 'teria', 'teríamos', 'teriam'];
      
      const words = text.toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.includes(word)); // Filter out short words and stopwords
      
      // Count word frequency
      const wordCount: Record<string, number> = {};
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });
      
      // Sort by frequency
      return Object.keys(wordCount)
        .sort((a, b) => wordCount[b] - wordCount[a])
        .slice(0, 10); // Get top 10 keywords
    };

    return savedDescriptions.map(desc => {
      const textContent = getTextContentFromDescription(desc);
      const wordCount = textContent.split(/\s+/).filter(Boolean).length;
      
      let seoScore = 60;
      
      if (wordCount > 100) seoScore += 5;
      if (wordCount > 200) seoScore += 5;
      if (wordCount > 300) seoScore += 10;
      
      const blockTypes = new Set(desc.blocks.map(b => b.type));
      seoScore += Math.min(blockTypes.size * 3, 15);
      
      if (desc.blocks.some(b => b.type === 'image' || b.type === 'gallery')) {
        seoScore += 5;
      }
      
      const keywords = extractKeywords(textContent);
      
      return {
        ...desc,
        performance: {
          views: Math.floor(50 + Math.random() * 50 * (1 + wordCount/100)),
          conversions: Math.floor(5 + Math.random() * 15 * (seoScore/80)),
          seoScore,
          lastUpdated: new Date(desc.updatedAt),
          keywords: keywords.slice(0, 3),
          wordCount,
          blockTypes: Array.from(blockTypes),
          hasImages: desc.blocks.some(b => b.type === 'image' || b.type === 'gallery'),
        }
      };
    });
  }, [savedDescriptions]);

  // Removemos a função extractKeywords de fora do useMemo para evitar o erro

  const ProductAnalysisDialog = ({ product, onClose }: { product: any, onClose: () => void }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Análise Detalhada - {product.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Métricas Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt>Score SEO:</dt>
                  <dd className="font-medium">{product.performance.seoScore}/100</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Total de palavras:</dt>
                  <dd className="font-medium">{product.performance.wordCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Visualizações:</dt>
                  <dd className="font-medium">{product.performance.views}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Conversões:</dt>
                  <dd className="font-medium">{product.performance.conversions}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Palavras-chave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {product.performance.keywords.map((keyword: string, idx: number) => (
                  <Badge key={idx} variant="outline">{keyword}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estrutura do Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Tipos de blocos utilizados:</p>
                <div className="flex flex-wrap gap-2">
                  {product.performance.blockTypes.map((type: string, idx: number) => (
                    <Badge key={idx} variant="outline">{type}</Badge>
                  ))}
                </div>
                <p className="mt-4">
                  {product.performance.hasImages ? "✓ Contém imagens" : "✗ Não contém imagens"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recomendações</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside">
                {product.performance.wordCount < 200 && (
                  <li>Aumente o conteúdo para pelo menos 200 palavras</li>
                )}
                {!product.performance.hasImages && (
                  <li>Adicione imagens para melhorar o engajamento</li>
                )}
                {product.performance.blockTypes.length < 3 && (
                  <li>Utilize mais tipos diferentes de blocos para variar o conteúdo</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DialogContent>
  );

  if (productsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center p-8">
        <h3 className="text-lg font-medium mb-2">Nenhuma descrição encontrada</h3>
        <p className="text-muted-foreground mb-4">
          Você ainda não criou nenhuma descrição de produto. Comece criando a primeira descrição para ver dados de performance.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CardHeader className="px-0">
        <CardTitle>Performance por Produto</CardTitle>
      </CardHeader>

      <ScrollArea className="h-[400px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Score SEO</TableHead>
              <TableHead>Visualizações</TableHead>
              <TableHead>Conversões</TableHead>
              <TableHead>Palavras-chave</TableHead>
              <TableHead>Última Atualização</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant={product.performance.seoScore >= 80 ? "default" : "outline"}>
                    {product.performance.seoScore}/100
                  </Badge>
                </TableCell>
                <TableCell>{product.performance.views}</TableCell>
                <TableCell>{product.performance.conversions}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.performance.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(product.performance.lastUpdated, {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Analisar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <ProductAnalysisDialog 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        </Dialog>
      )}
    </div>
  );
};

export default ProductPerformance;
