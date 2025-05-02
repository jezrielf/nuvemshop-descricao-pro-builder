import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
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
  
  // Safely extract the product name
  const productName = typeof product.name === 'string' 
    ? product.name 
    : (product.name?.pt || 'Produto');
  
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
        <DialogTitle>Análise SEO - {productName}</DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue="summary" className="mt-4">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="summary">Resumo</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="google-view">Visão do Google</TabsTrigger>
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
                      __html: typeof product.description === 'string' 
                        ? product.description.substring(0, 500) + '...' 
                        : (product.description?.pt?.substring(0, 500) + '...' || 'Sem conteúdo')
                    }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="google-view">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Como o Google vê seu produto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Crawlability Score */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Pontuação de Visibilidade</h3>
                      <p className="text-sm text-muted-foreground">Baseada em fatores técnicos de SEO</p>
                    </div>
                    <div className="bg-muted p-3 rounded-full h-16 w-16 flex items-center justify-center">
                      <span className={`text-lg font-bold 
                        ${seoAnalysis.googleView?.crawlabilityScore >= 80 ? 'text-green-600' : 
                          seoAnalysis.googleView?.crawlabilityScore >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                        {seoAnalysis.googleView?.crawlabilityScore || 0}
                      </span>
                    </div>
                  </div>

                  {/* Technical Issues */}
                  {seoAnalysis.googleView?.technicalIssues && seoAnalysis.googleView.technicalIssues.length > 0 ? (
                    <div>
                      <h3 className="font-medium mb-3">Problemas Técnicos Identificados</h3>
                      <div className="space-y-3">
                        {seoAnalysis.googleView.technicalIssues.map((issue, idx) => (
                          <div key={idx} className={`p-3 rounded-md border 
                            ${issue.severity === 'high' ? 'border-red-200 bg-red-50' : 
                              issue.severity === 'medium' ? 'border-amber-200 bg-amber-50' : 
                              'border-blue-200 bg-blue-50'}`}>
                            <div className="flex items-start">
                              {issue.severity === 'high' ? (
                                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              ) : issue.severity === 'medium' ? (
                                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              )}
                              <div>
                                <p className="font-medium text-sm">
                                  {issue.issue}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {issue.details}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-sm text-green-700">Nenhum problema técnico crítico encontrado!</p>
                    </div>
                  )}

                  {/* Structured Data */}
                  <div>
                    <h3 className="font-medium mb-2">Dados Estruturados</h3>
                    <div className={`p-3 rounded-md border 
                      ${seoAnalysis.googleView?.hasStructuredData 
                        ? (seoAnalysis.googleView.structuredDataValidity 
                           ? 'border-green-200 bg-green-50' 
                           : 'border-amber-200 bg-amber-50') 
                        : 'border-red-200 bg-red-50'}`}>
                      {seoAnalysis.googleView?.hasStructuredData ? (
                        <div className="flex items-center">
                          {seoAnalysis.googleView.structuredDataValidity ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                          )}
                          <div>
                            <p className="text-sm font-medium">
                              {seoAnalysis.googleView.structuredDataValidity 
                                ? 'Dados estruturados válidos encontrados' 
                                : 'Dados estruturados encontrados, mas com erros de formatação'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {seoAnalysis.googleView.structuredDataValidity 
                                ? 'Ótimo! Isso ajuda o Google a entender melhor o conteúdo.' 
                                : 'Corrija o formato JSON-LD para melhorar os rich snippets.'}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium">Dados estruturados não encontrados</p>
                            <p className="text-xs text-muted-foreground">
                              Considere adicionar dados estruturados Schema.org para melhorar a visibilidade nos resultados de busca.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* HTML Simplificado */}
                  <div>
                    <h3 className="font-medium mb-2">Visualização Simplificada do HTML (como o Google vê)</h3>
                    <div className="relative">
                      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-background to-transparent z-10"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent z-10"></div>
                      <div className="border rounded-md p-4 overflow-y-auto max-h-60 bg-slate-50">
                        <div 
                          className="text-xs font-mono" 
                          dangerouslySetInnerHTML={{ __html: seoAnalysis.googleView?.simplifiedHtml || 'HTML não disponível' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};
