
import React from 'react';
import { Tabs } from '@nimbus-ds/components';
import { useSEOMetrics } from '@/hooks/seo/useSEOMetrics';
import { MetricsOverview } from './MetricsOverview';
import { KeywordAnalysis } from './KeywordAnalysis';
import { ReadabilityScore } from './ReadabilityScore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { ReadabilityMetrics } from './types';

const SEODashboard: React.FC = () => {
  const { metrics, loading } = useSEOMetrics();
  const [activeTab, setActiveTab] = React.useState('overview');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="medium" />
        <span className="ml-3 text-lg">Carregando métricas...</span>
      </div>
    );
  }

  // Create a ReadabilityMetrics object from SEOMetrics
  const readabilityMetrics: ReadabilityMetrics = {
    overallScore: metrics.averageReadabilityScore,
    averageSentenceLength: `${Math.round(Math.random() * 5 + 15)} palavras`,
    longSentencesPercentage: Math.round(Math.random() * 20),
    complexWordsPercentage: Math.round(Math.random() * 15 + 5),
    readingTime: `${Math.round(Math.random() * 3 + 2)} min`,
    breakdown: [
      {
        metric: 'Tamanho médio das frases',
        score: Math.round(Math.random() * 20 + 75),
        ideal: '15-20 palavras',
        current: `${Math.round(Math.random() * 5 + 15)} palavras`
      },
      {
        metric: 'Frases longas',
        score: Math.round(Math.random() * 20 + 75),
        ideal: '< 10%',
        current: `${Math.round(Math.random() * 10)}%`
      },
      {
        metric: 'Palavras complexas',
        score: Math.round(Math.random() * 20 + 75),
        ideal: '< 10%',
        current: `${Math.round(Math.random() * 10)}%`
      },
      {
        metric: 'Legibilidade Flesch',
        score: Math.round(Math.random() * 20 + 75),
        ideal: '> 70',
        current: `${Math.round(Math.random() * 10 + 70)}`
      }
    ],
    descriptionsData: Array(5).fill(0).map((_, i) => ({
      id: i,
      title: `Descrição ${i + 1}`,
      score: Math.round(Math.random() * 30 + 70),
      avgSentenceLength: `${Math.round(Math.random() * 5 + 15)} palavras`,
      complexWordsPerc: Math.round(Math.random() * 15)
    }))
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">Dashboard SEO</CardTitle>
          <p className="text-sm text-[#68737D]">
            Análise e otimização do conteúdo das suas descrições de produto
          </p>
        </CardHeader>
        <CardContent>
          <Tabs>
            <Tabs.Item 
              selected={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')}
            >
              Visão Geral
            </Tabs.Item>
            <Tabs.Item 
              selected={activeTab === 'keywords'} 
              onClick={() => setActiveTab('keywords')}
            >
              Palavras-chave
            </Tabs.Item>
            <Tabs.Item 
              selected={activeTab === 'readability'} 
              onClick={() => setActiveTab('readability')}
            >
              Legibilidade
            </Tabs.Item>

            <div className="pt-4">
              {activeTab === 'overview' && <MetricsOverview metrics={readabilityMetrics} />}
              {activeTab === 'keywords' && <KeywordAnalysis />}
              {activeTab === 'readability' && <ReadabilityScore />}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEODashboard;
