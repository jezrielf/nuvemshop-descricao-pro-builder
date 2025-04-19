
import { useState, useEffect, useMemo } from 'react';
import { useEditorStore } from '@/store/editor';
import { SEOMetrics } from '@/types/seo';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';
import { format, subDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function useSEOMetrics() {
  const [metrics, setMetrics] = useState<SEOMetrics>({
    totalDescriptions: 0,
    newDescriptionsToday: 0,
    averageWordCount: 0,
    averageSEOScore: 0,
    averageReadabilityScore: 0,
    historicalData: [],
  });
  const [loading, setLoading] = useState(true);
  const { description, savedDescriptions } = useEditorStore();

  useEffect(() => {
    const calculateMetrics = () => {
      const allDescriptions = [...savedDescriptions];
      if (description) allDescriptions.push(description);

      // Calculate basic metrics
      const totalDesc = allDescriptions.length;
      let totalWords = 0;
      let totalSEOScore = 0;
      let totalReadability = 0;
      
      // Count today's new descriptions
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newDescriptionsToday = allDescriptions.filter(desc => {
        const createdAt = new Date(desc.createdAt);
        return createdAt >= today;
      }).length;

      // Calculate actual metrics from descriptions
      allDescriptions.forEach(desc => {
        const content = getTextContentFromDescription(desc);
        const wordCount = content.split(/\s+/).filter(Boolean).length;
        totalWords += wordCount;

        // Calculate real SEO score based on content quality and blocks
        const seoScore = calculateSEOScore(desc, content, wordCount);
        totalSEOScore += seoScore;

        // Calculate readability score
        const readabilityScore = calculateReadabilityScore(content);
        totalReadability += readabilityScore;
      });

      // Generate historical data from saved descriptions
      const historicalData = generateHistoricalData(savedDescriptions);

      setMetrics({
        totalDescriptions: totalDesc,
        newDescriptionsToday,
        averageWordCount: totalDesc > 0 ? Math.round(totalWords / totalDesc) : 0,
        averageSEOScore: totalDesc > 0 ? Math.round(totalSEOScore / totalDesc) : 0,
        averageReadabilityScore: totalDesc > 0 ? Math.round(totalReadability / totalDesc) : 0,
        historicalData,
      });

      setLoading(false);
    };

    calculateMetrics();
  }, [description, savedDescriptions]);

  return { metrics, loading };
}

// Helper function to calculate SEO score
function calculateSEOScore(description: any, content: string, wordCount: number): number {
  let score = 60; // Base score
  
  // Content length factors
  if (wordCount > 100) score += 5;
  if (wordCount > 200) score += 5;
  if (wordCount > 300) score += 10;
  
  // Block variety factors
  const blockTypes = new Set(description.blocks.map((b: any) => b.type));
  score += Math.min(blockTypes.size * 3, 15); // Up to 15 points for variety
  
  // Media factors
  if (description.blocks.some((b: any) => b.type === 'image' || b.type === 'gallery')) {
    score += 5;
  }
  if (description.blocks.some((b: any) => b.type === 'video')) {
    score += 5;
  }
  
  return Math.min(score, 100);
}

// Helper function to calculate readability score
function calculateReadabilityScore(content: string): number {
  const sentences = content.split(/[.!?]+/).filter(Boolean);
  const words = content.split(/\s+/).filter(Boolean);
  
  if (sentences.length === 0 || words.length === 0) return 60;
  
  const avgWordsPerSentence = words.length / sentences.length;
  
  // Ideal average sentence length is around 15-20 words
  // We penalize if too long or too short
  let readabilityScore = 100;
  if (avgWordsPerSentence > 25) {
    readabilityScore -= (avgWordsPerSentence - 25) * 2;
  } else if (avgWordsPerSentence < 10 && sentences.length > 2) {
    readabilityScore -= (10 - avgWordsPerSentence) * 2;
  }
  
  // Large words penalty (words with more than 4 syllables)
  const largeWordsCount = words.filter(word => 
    countSyllables(word) > 4
  ).length;
  
  const largeWordsPercentage = (largeWordsCount / words.length) * 100;
  if (largeWordsPercentage > 10) {
    readabilityScore -= (largeWordsPercentage - 10) * 0.5;
  }
  
  return Math.max(0, Math.min(100, Math.round(readabilityScore)));
}

// Simple syllable counter (Portuguese approximation)
function countSyllables(word: string): number {
  // Simplified version for Portuguese
  // Count vowels and diphthongs
  const cleanWord = word.toLowerCase().replace(/[.,!?;:()\-]/g, '');
  const vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'î', 'ô', 'û', 'ã', 'õ'];
  const diphthongs = ['ai', 'ei', 'oi', 'ui', 'ia', 'ie', 'io', 'iu', 'au', 'eu', 'ou'];
  
  let syllableCount = 0;
  let i = 0;
  
  while (i < cleanWord.length) {
    let foundDiphthong = false;
    for (const diphthong of diphthongs) {
      if (cleanWord.substring(i, i+2) === diphthong) {
        syllableCount++;
        i += 2;
        foundDiphthong = true;
        break;
      }
    }
    
    if (!foundDiphthong) {
      if (vowels.includes(cleanWord[i])) {
        syllableCount++;
      }
      i++;
    }
  }
  
  return syllableCount || 1; // At least one syllable
}

// Generate historical data for SEO metrics
function generateHistoricalData(descriptions: any[]): any[] {
  if (descriptions.length === 0) {
    return generateEmptyHistoricalData();
  }
  
  // Sort descriptions by date
  const sortedDescriptions = [...descriptions].sort(
    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  );
  
  // Create date-indexed map of metrics
  const metricsMap = new Map();
  sortedDescriptions.forEach(desc => {
    const date = new Date(desc.updatedAt);
    const dateKey = format(date, 'dd/MM', { locale: ptBR });
    
    const content = getTextContentFromDescription(desc);
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const seoScore = calculateSEOScore(desc, content, wordCount);
    const readabilityScore = calculateReadabilityScore(content);
    
    metricsMap.set(dateKey, {
      date: dateKey,
      seoScore,
      readabilityScore
    });
  });
  
  // Fill gaps in the timeline
  const result = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = subDays(today, i);
    const dateKey = format(date, 'dd/MM', { locale: ptBR });
    
    if (metricsMap.has(dateKey)) {
      result.push(metricsMap.get(dateKey));
    } else {
      // Find nearest date with data
      const nearestEntry = findNearestDataPoint(metricsMap, date);
      if (nearestEntry) {
        result.push({
          date: dateKey,
          seoScore: nearestEntry.seoScore,
          readabilityScore: nearestEntry.readabilityScore
        });
      } else {
        result.push({
          date: dateKey,
          seoScore: 60,
          readabilityScore: 70
        });
      }
    }
  }
  
  return result;
}

// Generate empty historical data
function generateEmptyHistoricalData() {
  const data = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    data.push({
      date: format(subDays(today, i), 'dd/MM', { locale: ptBR }),
      seoScore: 0,
      readabilityScore: 0
    });
  }
  
  return data;
}

// Find the nearest data point to a given date
function findNearestDataPoint(metricsMap: Map<string, any>, targetDate: Date) {
  let nearestDate = null;
  let nearestDistance = Infinity;
  let nearestData = null;
  
  metricsMap.forEach((data, dateKey) => {
    const parts = dateKey.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const currentDate = new Date(new Date().getFullYear(), month, day);
    const distance = Math.abs(targetDate.getTime() - currentDate.getTime());
    
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestDate = currentDate;
      nearestData = data;
    }
  });
  
  return nearestData;
}
