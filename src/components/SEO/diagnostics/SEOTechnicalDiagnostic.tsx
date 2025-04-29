
import React from 'react';
import { SEOTechnicalDiagnosis, SEORecommendation } from '@/types/seoTechnical';
import { ProductDescription } from '@/types/editor';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { analyzeSEOTechnically } from '../utils/technicalSEOAnalyzer';
import { AlertTriangle, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface SEOTechnicalDiagnosticProps {
  description: ProductDescription;
}

export const SEOTechnicalDiagnostic: React.FC<SEOTechnicalDiagnosticProps> = ({ description }) => {
  // Generate the technical analysis
  const analysis = analyzeSEOTechnically(description);
  
  return (
    <div className="space-y-6">
      <OverallScoreCard analysis={analysis} />
      
      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          <TabsTrigger value="structure">Estrutura</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="technical">Análise Técnica</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations">
          <RecommendationsTab recommendations={analysis.recommendations} />
        </TabsContent>
        
        <TabsContent value="structure">
          <StructureTab headerAnalysis={analysis.headerStructure} />
        </TabsContent>
        
        <TabsContent value="keywords">
          <KeywordsTab keywordAnalysis={analysis.keywordAnalysis} />
        </TabsContent>
        
        <TabsContent value="content">
          <ContentTab contentAnalysis={analysis.contentQuality} />
        </TabsContent>
        
        <TabsContent value="technical">
          <TechnicalTab 
            semanticAnalysis={analysis.semanticAnalysis} 
            freshnessAnalysis={analysis.contentFreshness} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface OverallScoreCardProps {
  analysis: SEOTechnicalDiagnosis;
}

const OverallScoreCard: React.FC<OverallScoreCardProps> = ({ analysis }) => {
  // Data for radar chart
  const radarData = [
    { subject: 'Estrutura', A: analysis.headerStructure.score },
    { subject: 'Palavras-chave', A: analysis.keywordAnalysis.score },
    { subject: 'Conteúdo', A: analysis.contentQuality.score },
    { subject: 'Semântica', A: analysis.semanticAnalysis.score },
    { subject: 'Atualidade', A: analysis.contentFreshness.score },
  ];

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  // Get score background
  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Diagnóstico SEO Técnico</CardTitle>
          <CardDescription>
            Análise técnica detalhada da sua descrição de produto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Score Geral</p>
              <p className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}
              </p>
              <p className="text-xs text-muted-foreground">/100 pontos</p>
            </div>
            
            <div className="text-right">
              <Badge
                variant="outline"
                className={`${getScoreColor(analysis.overallScore)} border-current`}
              >
                {analysis.overallScore >= 80 ? 'Excelente' : 
                 analysis.overallScore >= 60 ? 'Bom' : 
                 analysis.overallScore >= 40 ? 'Precisa de melhorias' : 
                 'Crítico'}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {analysis.recommendations.length} {analysis.recommendations.length === 1 ? 'recomendação' : 'recomendações'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {Object.entries({
              'Estrutura de Títulos': analysis.headerStructure.score,
              'Palavras-chave': analysis.keywordAnalysis.score,
              'Qualidade do Conteúdo': analysis.contentQuality.score,
              'Análise Semântica': analysis.semanticAnalysis.score,
              'Atualidade do Conteúdo': analysis.contentFreshness.score
            }).map(([key, score]) => (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{key}</p>
                  <p className={`text-sm font-medium ${getScoreColor(score)}`}>{score}/100</p>
                </div>
                <Progress 
                  value={score} 
                  className="h-2"
                  indicatorClassName={getScoreBackground(score)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Distribuição de Fatores SEO</CardTitle>
          <CardDescription>
            Visualização radar dos diferentes fatores analisados
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Score SEO"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

interface RecommendationsTabProps {
  recommendations: SEORecommendation[];
}

const RecommendationsTab: React.FC<RecommendationsTabProps> = ({ recommendations }) => {
  // Grupo as recomendações por tipo
  const criticalRecs = recommendations.filter(r => r.type === 'critical');
  const importantRecs = recommendations.filter(r => r.type === 'important');
  const improvementRecs = recommendations.filter(r => r.type === 'improvement');
  const goodPractices = recommendations.filter(r => r.type === 'good');

  const getIconByType = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'important': return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'improvement': return <Info className="h-5 w-5 text-blue-500" />;
      case 'good': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {criticalRecs.length > 0 && (
        <Card className="border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Crítico
            </CardTitle>
            <CardDescription>
              Problemas críticos que devem ser resolvidos imediatamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[300px]">
              <div className="space-y-4">
                {criticalRecs.map((rec, idx) => (
                  <Alert key={idx} variant="destructive" className="border-red-500/50">
                    <AlertTitle className="font-medium text-red-700">
                      Impacto: {rec.impact}%
                    </AlertTitle>
                    <AlertDescription className="space-y-2 text-sm">
                      <p>{rec.text}</p>
                      {rec.implementation && (
                        <div className="mt-2">
                          <p className="font-medium text-red-700">Sugestão de implementação:</p>
                          <p className="mt-1">{rec.implementation}</p>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      
      {importantRecs.length > 0 && (
        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Importante
            </CardTitle>
            <CardDescription>
              Problemas importantes que afetam significativamente o SEO
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[300px]">
              <div className="space-y-4">
                {importantRecs.map((rec, idx) => (
                  <Alert key={idx} variant="default" className="border-amber-500/50">
                    <AlertTitle className="font-medium text-amber-700">
                      Impacto: {rec.impact}%
                    </AlertTitle>
                    <AlertDescription className="space-y-2 text-sm">
                      <p>{rec.text}</p>
                      {rec.implementation && (
                        <div className="mt-2">
                          <p className="font-medium text-amber-700">Sugestão de implementação:</p>
                          <p className="mt-1">{rec.implementation}</p>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      
      {improvementRecs.length > 0 && (
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Melhorias
            </CardTitle>
            <CardDescription>
              Oportunidades para melhorar seu SEO
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[300px]">
              <div className="space-y-4">
                {improvementRecs.map((rec, idx) => (
                  <Alert key={idx} variant="default" className="border-blue-500/50">
                    <AlertTitle className="font-medium text-blue-700">
                      Impacto: {rec.impact}%
                    </AlertTitle>
                    <AlertDescription className="space-y-2 text-sm">
                      <p>{rec.text}</p>
                      {rec.implementation && (
                        <div className="mt-2">
                          <p className="font-medium text-blue-700">Sugestão de implementação:</p>
                          <p className="mt-1">{rec.implementation}</p>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      
      {goodPractices.length > 0 && (
        <Card className="border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Boas Práticas
            </CardTitle>
            <CardDescription>
              Práticas positivas já implementadas na sua descrição
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[300px]">
              <div className="space-y-4">
                {goodPractices.map((rec, idx) => (
                  <Alert key={idx} variant="default" className="border-green-500/50">
                    <AlertTitle className="font-medium text-green-700">
                      Benefício: {rec.impact}%
                    </AlertTitle>
                    <AlertDescription className="text-sm">{rec.text}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      
      {recommendations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8">
          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-medium text-center">Perfeito!</h3>
          <p className="text-muted-foreground text-center mt-2">
            Nenhuma recomendação necessária. Sua descrição está otimizada para SEO.
          </p>
        </div>
      )}
    </div>
  );
};

interface StructureTabProps {
  headerAnalysis: HeaderStructureAnalysis;
}

const StructureTab: React.FC<StructureTabProps> = ({ headerAnalysis }) => {
  // Data for the header chart
  const headerData = [
    { name: 'H1', valor: headerAnalysis.h1Count },
    { name: 'H2', valor: headerAnalysis.h2Count },
    { name: 'H3', valor: headerAnalysis.h3Count },
  ];
  
  // Score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Estrutura de Títulos</CardTitle>
          <CardDescription>
            Análise da hierarquia de títulos na sua descrição
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Score de Estrutura</p>
              <p className={`text-4xl font-bold ${getScoreColor(headerAnalysis.score)}`}>
                {headerAnalysis.score}
              </p>
              <p className="text-xs text-muted-foreground">/100 pontos</p>
            </div>
            
            <div className="text-right">
              <Badge
                variant="outline"
                className={`${headerAnalysis.hasProperHierarchy ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}
              >
                {headerAnalysis.hasProperHierarchy ? 'Hierarquia Correta' : 'Hierarquia Incorreta'}
              </Badge>
            </div>
          </div>
          
          <div className="h-[250px] mb-4">
            <ChartContainer className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={headerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#8884d8" name="Quantidade" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium">Recomendações de Estrutura:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Ideal: Um H1 principal contendo a palavra-chave principal</li>
              <li>Use H2 para seções principais de conteúdo</li>
              <li>Use H3 para subseções dentro de seções H2</li>
              <li>Mantenha uma hierarquia lógica (H1 → H2 → H3)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Análise de Problemas</CardTitle>
          <CardDescription>
            Problemas detectados na estrutura de títulos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px]">
            <div className="space-y-4">
              {headerAnalysis.issues.length > 0 ? (
                headerAnalysis.issues.map((issue, idx) => (
                  <Alert key={idx} variant={issue.includes('Múltiplas') || issue.includes('Nenhuma tag H1') ? 'destructive' : 'default'}>
                    <AlertTitle className="flex items-center gap-2">
                      {issue.includes('Múltiplas') || issue.includes('Nenhuma tag H1') ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      Problema de Estrutura
                    </AlertTitle>
                    <AlertDescription>{issue}</AlertDescription>
                  </Alert>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium text-center">Excelente!</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    A estrutura de títulos da sua descrição está otimizada.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

interface KeywordsTabProps {
  keywordAnalysis: KeywordAnalysis;
}

const KeywordsTab: React.FC<KeywordsTabProps> = ({ keywordAnalysis }) => {
  // Data for keywords distribution chart
  const distributionData = [
    { 
      name: 'Título', 
      valor: keywordAnalysis.keywordDistribution.title ? 100 : 0 
    },
    { 
      name: 'Primeiro Parágrafo', 
      valor: keywordAnalysis.keywordDistribution.firstParagraph ? 100 : 0 
    },
    { 
      name: 'Títulos', 
      valor: keywordAnalysis.keywordDistribution.headings ? 100 : 0 
    },
    { 
      name: 'Distribuição no Texto', 
      valor: keywordAnalysis.keywordDistribution.throughout ? 100 : 0 
    },
  ];
  
  // Secondary keywords data
  const secondaryKeywordsData = keywordAnalysis.secondaryKeywords.map(kw => ({
    name: kw.keyword,
    densidade: kw.density
  }));
  
  // Score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  // Density recommendation
  const getDensityClass = (density: number) => {
    if (density >= 0.5 && density <= 2.5) return 'text-green-500';
    if ((density > 0 && density < 0.5) || (density > 2.5 && density < 3.5)) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Análise de Palavra-chave</CardTitle>
          <CardDescription>
            Detalhes sobre o uso da palavra-chave principal: "{keywordAnalysis.mainKeyword}"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Score de Palavras-chave</p>
              <p className={`text-4xl font-bold ${getScoreColor(keywordAnalysis.score)}`}>
                {keywordAnalysis.score}
              </p>
              <p className="text-xs text-muted-foreground">/100 pontos</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium">Densidade</p>
              <p className={`text-2xl font-bold ${getDensityClass(keywordAnalysis.mainKeywordDensity)}`}>
                {keywordAnalysis.mainKeywordDensity.toFixed(2)}%
              </p>
              <p className="text-xs text-muted-foreground">Ideal: 0.5% - 2.5%</p>
            </div>
          </div>
          
          <div className="h-[250px] mb-4">
            <ChartContainer className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#22c55e" name="Presença %" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Palavras-chave Secundárias</CardTitle>
            <CardDescription>
              Outras palavras-chave relevantes detectadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {keywordAnalysis.secondaryKeywords.length > 0 ? (
              <div className="space-y-3">
                {keywordAnalysis.secondaryKeywords.map((keyword, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{keyword.keyword}</p>
                      <Badge variant="outline" className={getDensityClass(keyword.density)}>
                        {keyword.density.toFixed(2)}%
                      </Badge>
                    </div>
                    <Progress 
                      value={Math.min(keyword.density * 40, 100)} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Nenhuma palavra-chave secundária relevante detectada.
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Problemas Detectados</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[150px]">
              <div className="space-y-2">
                {keywordAnalysis.issues.length > 0 ? (
                  keywordAnalysis.issues.map((issue, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className={`mt-0.5 w-2 h-2 rounded-full ${
                        issue.includes('muito baixa') ? 'bg-amber-500' :
                        issue.includes('muito alta') ? 'bg-red-500' :
                        'bg-blue-500'
                      }`} />
                      <p className="text-sm">{issue}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-green-500 text-sm">
                    Nenhum problema detectado com suas palavras-chave. Excelente trabalho!
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ContentTabProps {
  contentAnalysis: ContentQualityAnalysis;
}

const ContentTab: React.FC<ContentTabProps> = ({ contentAnalysis }) => {
  // Data for content quality chart
  const contentData = [
    { name: 'Palavras', valor: contentAnalysis.wordCount, objetivo: 300 },
    { name: 'Parágrafos', valor: contentAnalysis.paragraphCount, objetivo: 5 },
    { name: 'Média de Palavras por Sentença', valor: Math.round(contentAnalysis.avgSentenceLength), objetivo: 15 },
  ];
  
  // Score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Qualidade do Conteúdo</CardTitle>
          <CardDescription>
            Métricas de qualidade do texto da sua descrição
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Score de Conteúdo</p>
              <p className={`text-4xl font-bold ${getScoreColor(contentAnalysis.score)}`}>
                {contentAnalysis.score}
              </p>
              <p className="text-xs text-muted-foreground">/100 pontos</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium">Legibilidade</p>
              <p className={`text-2xl font-bold ${getScoreColor(contentAnalysis.readabilityScore)}`}>
                {contentAnalysis.readabilityScore}
              </p>
              <p className="text-xs text-muted-foreground">/100 pontos</p>
            </div>
          </div>
          
          <div className="h-[250px] mb-4">
            <ChartContainer className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#3b82f6" name="Atual" />
                  <Bar dataKey="objetivo" fill="#10b981" name="Objetivo" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-2 border rounded-md">
              <p className="text-sm text-muted-foreground">Imagens</p>
              <p className="text-xl font-bold">{contentAnalysis.hasImages ? 'Sim' : 'Não'}</p>
            </div>
            
            <div className="text-center p-2 border rounded-md">
              <p className="text-sm text-muted-foreground">Alt Text</p>
              <p className="text-xl font-bold">{contentAnalysis.imageAltText ? 'Completo' : 'Incompleto'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recomendações de Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-3">
                {contentAnalysis.issues.length > 0 ? (
                  contentAnalysis.issues.map((issue, idx) => (
                    <Alert key={idx} variant={
                      issue.includes('muito curto') ? 'destructive' :
                      (issue.includes('curto') || issue.includes('Nenhuma imagem')) ? 'default' :
                      'default'
                    }>
                      <AlertDescription>{issue}</AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                    <p className="text-green-500 text-sm text-center">
                      Seu conteúdo está bem estruturado e com boa qualidade!
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Guia de Boas Práticas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500" />
                <p>Escreva pelo menos 300 palavras para descrições de produtos</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500" />
                <p>Use sentenças com média de 15-20 palavras para boa legibilidade</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500" />
                <p>Inclua pelo menos uma imagem com texto alternativo descritivo</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500" />
                <p>Divida o conteúdo em parágrafos curtos (2-3 sentenças)</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500" />
                <p>Utilize bullet points para listar características e benefícios</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface TechnicalTabProps {
  semanticAnalysis: SemanticAnalysis;
  freshnessAnalysis: ContentFreshnessAnalysis;
}

const TechnicalTab: React.FC<TechnicalTabProps> = ({ 
  semanticAnalysis, 
  freshnessAnalysis 
}) => {
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  // Score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Análise Semântica</CardTitle>
          <CardDescription>
            Relação semântica entre título, conteúdo e palavras-chave
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Score Semântico</p>
              <p className={`text-4xl font-bold ${getScoreColor(semanticAnalysis.score)}`}>
                {semanticAnalysis.score}
              </p>
              <p className="text-xs text-muted-foreground">/100 pontos</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Correlação Título-Conteúdo</p>
                <p className={`text-sm font-medium ${getScoreColor(semanticAnalysis.titleContentMatch)}`}>
                  {semanticAnalysis.titleContentMatch.toFixed(0)}%
                </p>
              </div>
              <Progress 
                value={semanticAnalysis.titleContentMatch} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Cobertura do Tópico</p>
                <p className={`text-sm font-medium ${getScoreColor(semanticAnalysis.topicCoverage)}`}>
                  {semanticAnalysis.topicCoverage.toFixed(0)}%
                </p>
              </div>
              <Progress 
                value={semanticAnalysis.topicCoverage} 
                className="h-2"
              />
            </div>
            
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Termos Relacionados Utilizados:</p>
              <div className="flex flex-wrap gap-2">
                {semanticAnalysis.relatedTermsUsage.length > 0 ? (
                  semanticAnalysis.relatedTermsUsage.map((term, idx) => (
                    <Badge key={idx} variant="outline">{term}</Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum termo relacionado detectado.</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              {semanticAnalysis.issues.map((issue, idx) => (
                <Alert key={idx} variant="default">
                  <AlertDescription>{issue}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Atualidade do Conteúdo</CardTitle>
          <CardDescription>
            Análise de quando o conteúdo foi atualizado pela última vez
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Score de Atualidade</p>
              <p className={`text-4xl font-bold ${getScoreColor(freshnessAnalysis.score)}`}>
                {freshnessAnalysis.score}
              </p>
              <p className="text-xs text-muted-foreground">/100 pontos</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Última Atualização</p>
                <p className="text-xl font-medium mt-1">{formatDate(freshnessAnalysis.lastUpdated)}</p>
              </div>
              
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Dias desde Atualização</p>
                <p className={`text-xl font-medium mt-1 ${
                  freshnessAnalysis.daysSinceUpdate > 180 ? 'text-red-500' :
                  freshnessAnalysis.daysSinceUpdate > 90 ? 'text-amber-500' :
                  'text-green-500'
                }`}>
                  {freshnessAnalysis.daysSinceUpdate} dias
                </p>
              </div>
            </div>
            
            {freshnessAnalysis.updateFrequency > 0 && (
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Frequência de Atualização</p>
                <p className="text-xl font-medium mt-1">
                  {Math.round(freshnessAnalysis.updateFrequency)} dias entre atualizações
                </p>
              </div>
            )}
            
            <div className="space-y-2 mt-4">
              {freshnessAnalysis.issues.map((issue, idx) => (
                <Alert key={idx} variant="default">
                  <AlertDescription>{issue}</AlertDescription>
                </Alert>
              ))}
            </div>
            
            {freshnessAnalysis.issues.length === 0 && (
              <Alert variant="default" className="border-green-500/50">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-600">
                  Seu conteúdo está atualizado. Conteúdo recente é favorecido pelos mecanismos de busca.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOTechnicalDiagnostic;
