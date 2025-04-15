
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSEOMetrics } from '@/hooks/seo/useSEOMetrics';
import { MetricsOverview } from './MetricsOverview';
import { KeywordAnalysis } from './KeywordAnalysis';
import { ReadabilityScore } from './ReadabilityScore';
import { PerformanceComparison } from './PerformanceComparison';

const SEODashboard: React.FC = () => {
  const { metrics, loading } = useSEOMetrics();

  if (loading) {
    return <div className="flex items-center justify-center p-8">Carregando métricas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard SEO</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
          <TabsTrigger value="readability">Legibilidade</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <MetricsOverview metrics={metrics} />
        </TabsContent>

        <TabsContent value="keywords">
          <KeywordAnalysis />
        </TabsContent>

        <TabsContent value="readability">
          <ReadabilityScore />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceComparison />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEODashboard;
