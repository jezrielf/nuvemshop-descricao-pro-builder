
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SEOMetrics } from '@/types/seo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

interface MetricsOverviewProps {
  metrics: SEOMetrics;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Descrições</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalDescriptions}</div>
          <p className="text-xs text-muted-foreground">
            +{metrics.newDescriptionsToday} hoje
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Média de Palavras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageWordCount}</div>
          <p className="text-xs text-muted-foreground">
            por descrição
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Score SEO Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageSEOScore}/100</div>
          <p className="text-xs text-muted-foreground">
            baseado em {metrics.totalDescriptions} descrições
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Score de Legibilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageReadabilityScore}/100</div>
          <p className="text-xs text-muted-foreground">
            média geral
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Evolução dos Scores</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            className="h-[300px]"
            config={{
              score: {
                label: "Score SEO",
                theme: {
                  light: "#0ea5e9",
                  dark: "#0ea5e9",
                },
              },
              readability: {
                label: "Legibilidade",
                theme: {
                  light: "#84cc16",
                  dark: "#84cc16",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="seoScore" name="Score SEO" fill="var(--color-score)" />
                <Bar dataKey="readabilityScore" name="Legibilidade" fill="var(--color-readability)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
