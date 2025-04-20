
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEODashboard from '@/components/admin/seo/SEODashboard';
import ProductPerformance from '@/components/admin/seo/ProductPerformance';
import SEOHistory from '@/components/admin/seo/SEOHistory';
import ProductsKeywordsAnalysis from '@/components/admin/seo/ProductsKeywordsAnalysis';

const DescriptionAnalysis: React.FC = () => {
  const { description } = useEditorStore();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Editor
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#303846]">Análise de Descrição</h1>
          <p className="text-[#68737D]">Visualize métricas detalhadas e análise SEO da sua descrição</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <SEODashboard />
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card className="p-6">
            <ProductsKeywordsAnalysis />
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
