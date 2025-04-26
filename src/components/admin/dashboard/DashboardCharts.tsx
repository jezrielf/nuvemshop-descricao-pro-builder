
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardChartsProps {
  stats: any;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ stats }) => {
  const revenueData = stats?.charts?.revenue || [];
  const visitData = stats?.charts?.visits || [];
  
  // Combine data for a single chart
  const combinedData = revenueData.map((item: any, index: number) => ({
    name: item.name || `Mês ${index + 1}`,
    receita: item.value || 0,
    visitas: visitData[index]?.value || 0
  }));

  return (
    <>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Receita e Visitas</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="receita" fill="#8884d8" name="Receita (R$)" />
              <Bar yAxisId="right" dataKey="visitas" fill="#82ca9d" name="Visitas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardCharts;
