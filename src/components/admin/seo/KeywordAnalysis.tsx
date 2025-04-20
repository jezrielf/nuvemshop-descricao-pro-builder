
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useKeywordMetrics } from '@/hooks/seo/useKeywordMetrics';
import { Spinner } from '@/components/ui/spinner';
import { KeywordsList } from './components/KeywordsList';
import { KeywordDensity } from './components/KeywordDensity';

export const KeywordAnalysis: React.FC = () => {
  const { keywords, loading } = useKeywordMetrics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner className="h-8 w-8 border-primary" />
        <span className="ml-3 text-sm text-[#68737D]">Carregando análise de palavras-chave...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium text-[#303846]">Análise de Palavras-chave</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="top-keywords" className="mt-2">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="top-keywords">Principais Palavras</TabsTrigger>
              <TabsTrigger value="density">Densidade</TabsTrigger>
            </TabsList>
            <TabsContent value="top-keywords" className="pt-6">
              <KeywordsList keywords={keywords.topKeywords} />
            </TabsContent>
            <TabsContent value="density" className="pt-6">
              <KeywordDensity data={keywords.densityData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
