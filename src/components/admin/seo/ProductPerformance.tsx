
import React from 'react';
import { useEditorStore } from '@/store/editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ProductPerformance: React.FC = () => {
  const { savedDescriptions } = useEditorStore();

  // Simulação de dados de performance para cada produto
  const productsData = savedDescriptions.map(desc => ({
    ...desc,
    performance: {
      views: Math.floor(Math.random() * 1000),
      conversions: Math.floor(Math.random() * 100),
      seoScore: Math.floor(Math.random() * 40) + 60,
      lastUpdated: new Date(desc.updatedAt),
      keywords: ['produto', 'qualidade', 'inovação'].slice(0, Math.floor(Math.random() * 3) + 1)
    }
  }));

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant={product.performance.seoScore >= 80 ? "success" : "warning"}>
                    {product.performance.seoScore}/100
                  </Badge>
                </TableCell>
                <TableCell>{product.performance.views}</TableCell>
                <TableCell>{product.performance.conversions}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default ProductPerformance;
