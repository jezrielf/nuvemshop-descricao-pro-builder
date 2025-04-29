
import React from 'react';
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface LineChartProps {
  data?: Array<{
    date: string;
    seoScore?: number;
    readabilityScore?: number;
    [key: string]: any;
  }>;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data = [], 
  height = 120 
}) => {
  const hasData = data && data.length > 0;

  // Default empty data for visualization when no data available
  const emptyData = [
    { date: '01/01', value: 0 },
    { date: '02/01', value: 0 },
    { date: '03/01', value: 0 }
  ];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={hasData ? data : emptyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 10 }} 
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          hide={true}
        />
        <Tooltip 
          labelFormatter={(label) => `Data: ${label}`}
          formatter={(value) => [`${value}`, 'Pontos']}
        />
        {hasData ? (
          <>
            <Line 
              type="monotone" 
              dataKey="seoScore" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </>
        ) : (
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--muted-foreground))" 
            strokeDasharray="5 5"
            strokeWidth={1}
            dot={false}
          />
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
