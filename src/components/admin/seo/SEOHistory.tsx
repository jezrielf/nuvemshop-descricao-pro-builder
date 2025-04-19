
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEditorStore } from '@/store/editor';
import { format, subDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';

const SEOHistory: React.FC = () => {
  const { savedDescriptions } = useEditorStore();

  // Generate historical SEO data based on real saved descriptions
  const historicalData = useMemo(() => {
    // If no descriptions, return empty historical data
    if (!savedDescriptions.length) {
      return generateEmptyHistoricalData();
    }

    // Sort descriptions by updatedAt date
    const sortedDescriptions = [...savedDescriptions]
      .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    
    // Generate data points for the chart
    const data = [];
    const today = new Date();
    
    // Create a map of dates to track changes
    const dateMap = new Map();
    
    // Add each description update as a data point
    sortedDescriptions.forEach(desc => {
      const updateDate = new Date(desc.updatedAt);
      const dateKey = format(updateDate, 'dd/MM', { locale: ptBR });
      
      const textContent = getTextContentFromDescription(desc);
      const wordCount = textContent.split(/\s+/).filter(Boolean).length;
      
      // Calculate SEO score based on content and blocks
      let seoScore = 60;
      if (wordCount > 100) seoScore += 5;
      if (wordCount > 200) seoScore += 5;
      if (wordCount > 300) seoScore += 10;
      
      const blockTypes = new Set(desc.blocks.map(b => b.type));
      seoScore += Math.min(blockTypes.size * 3, 15);
      
      if (desc.blocks.some(b => b.type === 'image' || b.type === 'gallery')) {
        seoScore += 5;
      }
      
      // Calculate readability score (simplified)
      const sentences = textContent.split(/[.!?]+/).filter(Boolean);
      const avgWordsPerSentence = sentences.length > 0 ? wordCount / sentences.length : 0;
      let readabilityScore = 90 - Math.max(0, Math.min(30, Math.abs(avgWordsPerSentence - 15) * 2));
      
      // Store the data for this date
      dateMap.set(dateKey, {
        date: dateKey,
        seoScore,
        readabilityScore,
        views: 5 + Math.floor(seoScore / 2),
        keywords: 3 + Math.floor(seoScore / 20)
      });
    });
    
    // Fill in missing dates with interpolated data
    for (let i = 30; i >= 0; i--) {
      const date = subDays(today, i);
      const dateKey = format(date, 'dd/MM', { locale: ptBR });
      
      if (!dateMap.has(dateKey)) {
        // For missing dates, generate data based on nearest known data points
        const prevDataPoint = findNearestDataPoint(dateMap, date, true);
        const nextDataPoint = findNearestDataPoint(dateMap, date, false);
        
        if (prevDataPoint && nextDataPoint) {
          // Interpolate between known data points
          const totalDays = (nextDataPoint.date.getTime() - prevDataPoint.date.getTime()) / (24 * 60 * 60 * 1000);
          const daysFromPrev = (date.getTime() - prevDataPoint.date.getTime()) / (24 * 60 * 60 * 1000);
          const ratio = daysFromPrev / totalDays;
          
          dateMap.set(dateKey, {
            date: dateKey,
            seoScore: Math.round(prevDataPoint.data.seoScore + (nextDataPoint.data.seoScore - prevDataPoint.data.seoScore) * ratio),
            readabilityScore: Math.round(prevDataPoint.data.readabilityScore + (nextDataPoint.data.readabilityScore - prevDataPoint.data.readabilityScore) * ratio),
            views: Math.round(prevDataPoint.data.views + (nextDataPoint.data.views - prevDataPoint.data.views) * ratio),
            keywords: Math.round(prevDataPoint.data.keywords + (nextDataPoint.data.keywords - prevDataPoint.data.keywords) * ratio)
          });
        } else if (prevDataPoint) {
          // Use previous data point if no next data point
          dateMap.set(dateKey, { ...prevDataPoint.data, date: dateKey });
        } else if (nextDataPoint) {
          // Use next data point if no previous data point
          dateMap.set(dateKey, { ...nextDataPoint.data, date: dateKey });
        } else {
          // No data points at all - use default values
          dateMap.set(dateKey, {
            date: dateKey,
            seoScore: 65,
            readabilityScore: 70,
            views: 25,
            keywords: 5
          });
        }
      }
    }
    
    // Convert map to array and sort by date
    const dataArray = Array.from(dateMap.entries()).map(([key, value]) => value);
    dataArray.sort((a, b) => {
      const dateA = parseISO(`2023/${a.date.split('/').reverse().join('/')}`);
      const dateB = parseISO(`2023/${b.date.split('/').reverse().join('/')}`);
      return dateA.getTime() - dateB.getTime();
    });
    
    return dataArray;
  }, [savedDescriptions]);

  // Helper function to generate empty historical data
  const generateEmptyHistoricalData = () => {
    const data = [];
    for (let i = 30; i >= 0; i--) {
      data.push({
        date: format(subDays(new Date(), i), 'dd/MM', { locale: ptBR }),
        seoScore: 0,
        readabilityScore: 0,
        views: 0,
        keywords: 0
      });
    }
    return data;
  };

  // Helper function to find the nearest data point before or after a given date
  const findNearestDataPoint = (dateMap: Map<string, any>, targetDate: Date, findBefore: boolean) => {
    let nearestDate = null;
    let nearestDistance = Infinity;
    let nearestData = null;
    
    dateMap.forEach((data, dateKey) => {
      const dateParts = dateKey.split('/');
      // Assuming the current year for simplicity
      const currentDate = new Date(new Date().getFullYear(), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
      const distance = targetDate.getTime() - currentDate.getTime();
      
      if ((findBefore && distance > 0) || (!findBefore && distance < 0)) {
        const absDistance = Math.abs(distance);
        if (absDistance < nearestDistance) {
          nearestDistance = absDistance;
          nearestDate = currentDate;
          nearestData = data;
        }
      }
    });
    
    return nearestDate ? { date: nearestDate, data: nearestData } : null;
  };

  if (savedDescriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center p-8">
        <h3 className="text-lg font-medium mb-2">Sem histórico de SEO</h3>
        <p className="text-muted-foreground mb-4">
          Crie e salve descrições de produtos para começar a acompanhar o histórico de SEO.
        </p>
      </div>
    );
  }

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
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="seoScore" 
                    stroke="#0ea5e9" 
                    name="Score SEO"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
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
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="keywords" 
                    stroke="#8b5cf6" 
                    name="Palavras-chave"
                    strokeWidth={2}
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
