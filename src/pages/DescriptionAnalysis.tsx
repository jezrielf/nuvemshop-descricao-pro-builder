
import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEODashboard from '@/components/admin/seo/SEODashboard';
import ProductPerformance from '@/components/admin/seo/ProductPerformance';
import SEOTechnicalDiagnostic from '@/components/SEO/diagnostics/SEOTechnicalDiagnostic';
import { SEOToolsMenu } from '@/components/SEO/menu/SEOToolsMenu';
import { ProductDescription } from '@/types/editor';
import StoreProductsList from '@/components/SEO/products/StoreProductsList';

const DescriptionAnalysis: React.FC = () => {
  const { description, updateBlock } = useEditorStore();
  const navigate = useNavigate();

  // Filter to only include visible blocks for preview analysis
  const visibleDescription = useMemo(() => {
    if (!description) return undefined;
    
    return {
      ...description,
      blocks: description.blocks.filter(block => block.visible)
    };
  }, [description]);

  const handleBack = () => {
    navigate('/');
  };

  // Handle update image for the SEO tools
  const handleUpdateImage = (blockId: string, imageType: string, newImageUrl: string) => {
    if (!description) return;
    
    updateBlock(blockId, {
      [imageType]: newImageUrl
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Editor
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Análise de Descrição</h1>
            <p className="text-muted-foreground">Visualize métricas detalhadas e análise SEO da sua descrição</p>
          </div>
        </div>
        <SEOToolsMenu description={visibleDescription || null} onUpdateImage={handleUpdateImage} />
      </div>

      <Tabs defaultValue="diagnostic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="diagnostic">Diagnóstico Técnico</TabsTrigger>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnostic" className="mt-4">
          <Card className="p-6">
            <SEOTechnicalDiagnostic description={visibleDescription} />
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="mt-4">
          <Card className="p-6">
            <SEODashboard />
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <Card className="p-6">
            <ProductPerformance />
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <Card className="p-6">
            <StoreProductsList />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DescriptionAnalysis;
