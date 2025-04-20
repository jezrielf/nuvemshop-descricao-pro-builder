
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScoreDisplay } from './components/ScoreDisplay';
import { MetricsBreakdown } from './components/MetricsBreakdown';
import { DescriptionsList } from './components/DescriptionsList';
import { useReadabilityMetrics } from '@/hooks/seo/useReadabilityMetrics';
import { Spinner } from '@/components/ui/spinner';

export const ReadabilityScore: React.FC = () => {
  const { metrics, loading } = useReadabilityMetrics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner className="h-8 w-8 border-primary" />
        <span className="ml-3 text-sm text-[#68737D]">Carregando dados de legibilidade...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium text-[#303846]">Análise de Legibilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <ScoreDisplay 
            score={metrics.overallScore} 
            readingTime={metrics.readingTime}
          />

          <Tabs defaultValue="breakdown" className="mt-6">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="breakdown">Métricas</TabsTrigger>
              <TabsTrigger value="descriptions">Descrições</TabsTrigger>
            </TabsList>
            <TabsContent value="breakdown" className="pt-6">
              <MetricsBreakdown items={metrics.breakdown} />
            </TabsContent>
            <TabsContent value="descriptions" className="pt-6">
              <DescriptionsList descriptions={metrics.descriptionsData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
