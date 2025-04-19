
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEditorStore } from '@/store/editor';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const SEOHistory: React.FC = () => {
  const { description } = useEditorStore();

  // Simulação de dados históricos
  const generateHistoricalData = () => {
    const data = [];
    for (let i = 30; i >= 0; i--) {
      data.push({
        date: format(subDays(new Date(), i), 'dd/MM', { locale: ptBR }),
        seoScore: Math.floor(Math.random() * 20) + 80,
        views: Math.floor(Math.random() * 100),
        keywords: Math.floor(Math.random() * 5) + 5
      });
    }
    return data;
  };

  const historicalData = generateHistoricalData();

  return (
    <div className="space-y-6">
      <CardHeader className="px-0">
        <CardTitle>Histórico de Performance SEO</CardTitle>
      </CardHeader>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Score SEO ao longo do tempo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="seoScore" 
                    stroke="#0ea5e9" 
                    name="Score SEO"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Visualizações e Palavras-chave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#84cc16" 
                    name="Visualizações"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="keywords" 
                    stroke="#8b5cf6" 
                    name="Palavras-chave"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SEOHistory;
