
import React from 'react';
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

type LineChartData = {
  date: string;
  seoScore: number;
}[];

interface LineChartProps {
  data: LineChartData;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <XAxis 
          dataKey="date"
          tick={{ fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          domain={[0, 100]}
          hide={true}
        />
        <Tooltip 
          formatter={(value) => [`${value}%`, 'SEO Score']}
          labelFormatter={(label) => `Data: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="seoScore"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
