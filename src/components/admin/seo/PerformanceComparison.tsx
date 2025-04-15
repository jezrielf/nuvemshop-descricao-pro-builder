
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

export const PerformanceComparison: React.FC = () => {
  // Dados simulados para a comparação de performance
  const weeklyData = [
    { name: 'Seg', acessos: 95, conversoes: 12 },
    { name: 'Ter', acessos: 125, conversoes: 15 },
    { name: 'Qua', acessos: 140, conversoes: 18 },
    { name: 'Qui', acessos: 115, conversoes: 14 },
    { name: 'Sex', acessos: 130, conversoes: 16 },
    { name: 'Sab', acessos: 90, conversoes: 10 },
    { name: 'Dom', acessos: 75, conversoes: 8 },
  ];

  const versionComparisonData = [
    { version: 'V1', score: 52, conversao: 1.2 },
    { version: 'V2', score: 64, conversao: 1.8 },
    { version: 'V3', score: 78, conversao: 2.4 },
    { version: 'Atual', score: 85, conversao: 3.1 },
  ];

  const timeSeriesData = [
    { mes: 'Jan', seo: 45, ctr: 1.2, posicao: 24 },
    { mes: 'Fev', seo: 48, ctr: 1.4, posicao: 22 },
    { mes: 'Mar', seo: 52, ctr: 1.6, posicao: 19 },
    { mes: 'Abr', seo: 58, ctr: 1.8, posicao: 16 },
    { mes: 'Mai', seo: 65, ctr: 2.1, posicao: 12 },
    { mes: 'Jun', seo: 72, ctr: 2.5, posicao: 9 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Comparativa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              className="h-[300px]"
              config={{
                seo: {
                  label: "Score SEO",
                  theme: {
                    light: "#0ea5e9",
                    dark: "#0ea5e9",
                  },
                },
                conversao: {
                  label: "Taxa de Conversão (%)",
                  theme: {
                    light: "#84cc16",
                    dark: "#84cc16",
                  },
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={versionComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="version" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="score" name="Score SEO" fill="var(--color-seo)" />
                  <Bar yAxisId="right" dataKey="conversao" name="Taxa de Conversão (%)" fill="var(--color-conversao)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Comparativo de performance entre diferentes versões de descrições. Observe como a melhoria do 
              score SEO se correlaciona com o aumento na taxa de conversão.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evolução Temporal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              className="h-[300px]"
              config={{
                seo: {
                  label: "Score SEO",
                  theme: {
                    light: "#0ea5e9",
                    dark: "#0ea5e9",
                  },
                },
                ctr: {
                  label: "CTR (%)",
                  theme: {
                    light: "#f59e0b",
                    dark: "#f59e0b",
                  },
                },
                posicao: {
                  label: "Posição média",
                  theme: {
                    light: "#ef4444",
                    dark: "#ef4444",
                  },
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="seo" name="Score SEO" stroke="var(--color-seo)" activeDot={{ r: 8 }} />
                  <Line yAxisId="left" type="monotone" dataKey="ctr" name="CTR (%)" stroke="var(--color-ctr)" />
                  <Line yAxisId="right" type="monotone" dataKey="posicao" name="Posição média" stroke="var(--color-posicao)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>A evolução do score SEO ao longo do tempo, juntamente com a taxa de cliques (CTR) e a posição média 
               das suas páginas nos resultados de busca.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
