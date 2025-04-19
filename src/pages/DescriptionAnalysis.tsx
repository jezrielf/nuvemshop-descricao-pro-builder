
import React from 'react';
import { Card } from '@/components/ui/card';
import SEODashboard from '@/components/admin/seo/SEODashboard';
import { useEditorStore } from '@/store/editor';

const DescriptionAnalysis: React.FC = () => {
  const { description } = useEditorStore();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Análise de Descrição</h1>
        <p className="text-muted-foreground">Visualize métricas detalhadas e análise SEO da sua descrição</p>
      </div>

      <Card className="p-6">
        <SEODashboard />
      </Card>
    </div>
  );
};

export default DescriptionAnalysis;
