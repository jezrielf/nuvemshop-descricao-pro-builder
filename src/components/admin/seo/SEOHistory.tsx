
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
    if (!savedDescriptions || !savedDescriptions.length) {
      return generateEmptyHistoricalData();
    }

    // Sort descriptions by updatedAt date
    const sortedDescriptions = [...savedDescriptions]
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return dateA - dateB;
      });
    
    // Generate data points for the chart
    const dateMap = new Map();
    
    // Add each description update as a data point
    sortedDescriptions.forEach(desc => {
      if (!desc.updatedAt) return; // Skip if no updatedAt date
      
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
    const result = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = subDays(today, i);
      const dateKey = format(date, 'dd/MM', { locale: ptBR });
      
      if (dateMap.has(dateKey)) {
        result.push(dateMap.get(dateKey));
      } else {
        // Find nearest data points
        let prevData = null;
        let nextData = null;
        
        // Find previous known data point
        for (let j = i + 1; j <= 30; j++) {
          const prevDate = subDays(today, j);
          const prevKey = format(prevDate, 'dd/MM', { locale: ptBR });
          if (dateMap.has(prevKey)) {
            prevData = dateMap.get(prevKey);
            break;
          }
        }
        
        // Find next known data point
        for (let j = i - 1; j >= 0; j--) {
          const nextDate = subDays(today, j);
          const nextKey = format(nextDate, 'dd/MM', { locale: ptBR });
          if (dateMap.has(nextKey)) {
            nextData = dateMap.get(nextKey);
            break;
          }
        }
        
        // Interpolate data
        if (prevData && nextData) {
          // Simple linear interpolation
          const totalDays = 30 - i + (i - (30 - Object.keys(dateMap).length));
          const daysFromPrev = i;
          const ratio = daysFromPrev / totalDays || 0.5;
          
          result.push({
            date: dateKey,
            seoScore: Math.round(prevData.seoScore + (nextData.seoScore - prevData.seoScore) * ratio),
            readabilityScore: Math.round(prevData.readabilityScore + (nextData.readabilityScore - prevData.readabilityScore) * ratio),
            views: Math.round(prevData.views + (nextData.views - prevData.views) * ratio),
            keywords: Math.round(prevData.keywords + (nextData.keywords - prevData.keywords) * ratio)
          });
        } else if (prevData) {
          // Use previous data
          result.push({
            date: dateKey,
            seoScore: prevData.seoScore,
            readabilityScore: prevData.readabilityScore,
            views: prevData.views,
            keywords: prevData.keywords
          });
        } else if (nextData) {
          // Use next data
          result.push({
            date: dateKey,
            seoScore: nextData.seoScore,
            readabilityScore: nextData.readabilityScore,
            views: nextData.views,
            keywords: nextData.keywords
          });
        } else {
          // No reference data, use default
          result.push({
            date: dateKey,
            seoScore: 65,
            readabilityScore: 70,
            views: 25,
            keywords: 5
          });
        }
      }
    }
    
    return result.sort((a, b) => {
      const partsA = a.date.split('/');
      const partsB = b.date.split('/');
      // Create date objects with current year
      const dateA = new Date(new Date().getFullYear(), parseInt(partsA[1]) - 1, parseInt(partsA[0]));
      const dateB = new Date(new Date().getFullYear(), parseInt(partsB[1]) - 1, parseInt(partsB[0]));
      return dateA.getTime() - dateB.getTime();
    });
  }, [savedDescriptions]);

  // Helper function to generate empty historical data
  const generateEmptyHistoricalData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 30; i >= 0; i--) {
      data.push({
        date: format(subDays(today, i), 'dd/MM', { locale: ptBR }),
        seoScore: 0,
        readabilityScore: 0,
        views: 0,
        keywords: 0
      });
    }
    return data;
  };

  if (!savedDescriptions || savedDescriptions.length === 0) {
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
