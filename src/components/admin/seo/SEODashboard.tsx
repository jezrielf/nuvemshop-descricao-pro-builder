
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSEOMetrics } from '@/hooks/seo/useSEOMetrics';
import { MetricsOverview } from './MetricsOverview';
import { KeywordAnalysis } from './KeywordAnalysis';
import { ReadabilityScore } from './ReadabilityScore';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEditorStore } from '@/store/editor';

const SEODashboard: React.FC = () => {
  const { metrics, loading } = useSEOMetrics();
  const { description } = useEditorStore();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner text="Calculando métricas SEO..." />;
  }

  const handleViewTechnicalAnalysis = () => {
    navigate('/seo-technical-analysis');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard SEO</h2>
        {description && (
          <Button 
            variant="outline"
            onClick={handleViewTechnicalAnalysis}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Análise Técnica Detalhada
          </Button>
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
          <TabsTrigger value="readability">Legibilidade</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default SEODashboard;
