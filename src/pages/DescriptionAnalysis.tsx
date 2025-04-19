
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditorStore } from '@/store/editor';
import SEODashboard from '@/components/admin/seo/SEODashboard';
import ProductPerformance from '@/components/admin/seo/ProductPerformance';
import SEOHistory from '@/components/admin/seo/SEOHistory';

const DescriptionAnalysis: React.FC = () => {
  const { description } = useEditorStore();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Análise de Descrição</h1>
        <p className="text-muted-foreground">Visualize métricas detalhadas e análise SEO da sua descrição</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <SEODashboard />
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="p-6">
            <ProductPerformance />
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-6">
            <SEOHistory />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DescriptionAnalysis;
