
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSEOMetrics } from '@/hooks/seo/useSEOMetrics';
import { MetricsOverview } from './MetricsOverview';
import { KeywordAnalysis } from './KeywordAnalysis';
import { ReadabilityScore } from './ReadabilityScore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

const SEODashboard: React.FC = () => {
  const { metrics, loading } = useSEOMetrics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner className="h-8 w-8 border-primary" />
        <span className="ml-3 text-lg">Carregando métricas...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">Dashboard SEO</CardTitle>
          <p className="text-sm text-muted-foreground">
            Análise e otimização do conteúdo das suas descrições de produto
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
              <TabsTrigger value="readability">Legibilidade</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-4">
              <MetricsOverview metrics={metrics} />
            </TabsContent>

            <TabsContent value="keywords" className="pt-4">
              <KeywordAnalysis />
            </TabsContent>

            <TabsContent value="readability" className="pt-4">
              <ReadabilityScore />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEODashboard;
