
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ProductWithSEO } from '../hooks/useProductsSEOAnalysis';

interface ProductAnalysisDialogProps {
  product: ProductWithSEO;
  onEditProduct: (product: ProductWithSEO) => void;
}

export const ProductAnalysisDialog: React.FC<ProductAnalysisDialogProps> = ({ 
  product, 
  onEditProduct 
}) => {
  const { seoAnalysis, isAnalyzing } = product;
  
  if (isAnalyzing) {
    return (
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Analisando produto...</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Analisando conteúdo SEO...</p>
        </div>
      </DialogContent>
    );
  }
  
  if (!seoAnalysis) {
    return (
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Análise não disponível</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p>Não foi possível realizar a análise deste produto.</p>
        </div>
      </DialogContent>
    );
  }
  
  return (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Análise SEO - {product.name.pt}</DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue="summary" className="mt-4">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="summary">Resumo</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Score SEO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoAnalysis.score}/100</div>
                <p className="text-xs text-muted-foreground">
                  {seoAnalysis.score < 60 ? "Precisa de melhorias" : 
                   seoAnalysis.score < 80 ? "Bom" : "Excelente"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total de Palavras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoAnalysis.wordCount}</div>
                <p className="text-xs text-muted-foreground">
                  {seoAnalysis.wordCount < 300 ? "Abaixo do ideal" : "Bom comprimento"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Estrutura</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {seoAnalysis.headingCount || 0} cabeçalhos
                </div>
                <p className="text-xs text-muted-foreground">
                  {!seoAnalysis.headingCount ? "Sem estrutura" : 
                   seoAnalysis.headingCount < 3 ? "Estrutura básica" : "Boa estrutura"}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo da Análise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Pontos fortes</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {seoAnalysis.recommendations
                    .filter(r => r.type === 'success')
                    .map((rec, idx) => (
                      <li key={idx} className="text-sm">{rec.text}</li>
                    ))}
                  {seoAnalysis.recommendations.filter(r => r.type === 'success').length === 0 && (
                    <li className="text-sm text-muted-foreground">Nenhum ponto forte identificado</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Pontos a melhorar</h4>
                <ul className="list-disc pl-4 space-y-1">
                  {seoAnalysis.recommendations
                    .filter(r => r.type !== 'success')
                    .map((rec, idx) => (
                      <li key={idx} className="text-sm">{rec.text}</li>
                    ))}
                  {seoAnalysis.recommendations.filter(r => r.type !== 'success').length === 0 && (
                    <li className="text-sm text-green-600">Não há pontos críticos a melhorar!</li>
                  )}
                </ul>
              </div>
              
              <Button 
                className="w-full mt-4" 
                onClick={() => onEditProduct(product)}
              >
                Editar Descrição
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="keywords">
          <Card>
            <CardHeader>
              <CardTitle>Palavras-chave Identificadas</CardTitle>
            </CardHeader>
            <CardContent>
              {seoAnalysis.keywords.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {seoAnalysis.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant={idx < 3 ? "default" : "outline"}>
                        {keyword.keyword} ({keyword.density.toFixed(1)}%)
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Recomendações para palavras-chave</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Use suas palavras-chave principais no título e nos primeiros parágrafos</li>
                      <li>Inclua variações das palavras-chave em seus cabeçalhos</li>
                      <li>Evite keyword stuffing (repetição excessiva de palavras-chave)</li>
                      <li>Use palavras-chave de cauda longa para capturar tráfego específico</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Não foi possível identificar palavras-chave significativas.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recomendações de Melhoria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {seoAnalysis.recommendations.map((rec, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 border rounded-md ${
                    rec.type === 'success' ? 'bg-green-50 border-green-200' : 
                    rec.type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 
                    'bg-red-50 border-red-200'
                  }`}
                >
                  <p className={`text-sm ${
                    rec.type === 'success' ? 'text-green-700' : 
                    rec.type === 'warning' ? 'text-yellow-700' : 
                    'text-red-700'
                  }`}>
                    {rec.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Content summary card */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <p className="text-sm font-medium mb-1">Palavras</p>
                    <p className="text-2xl font-bold">{seoAnalysis.wordCount}</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <p className="text-sm font-medium mb-1">Cabeçalhos</p>
                    <p className="text-2xl font-bold">{seoAnalysis.headingCount || 0}</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <p className="text-sm font-medium mb-1">Legibilidade</p>
                    <p className="text-2xl font-bold">{seoAnalysis.readabilityScore}/100</p>
                  </div>
                </div>
                
                {/* Content preview */}
                <div>
                  <h4 className="font-medium mb-2">Prévia do conteúdo</h4>
                  <div className="bg-muted p-4 rounded-md max-h-64 overflow-auto text-sm">
                    <div dangerouslySetInnerHTML={{ 
                      __html: product.description?.pt?.substring(0, 500) + '...' || 'Sem conteúdo' 
                    }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};
