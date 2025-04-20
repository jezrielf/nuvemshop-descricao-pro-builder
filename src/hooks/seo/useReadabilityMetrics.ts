
import { useState, useEffect } from 'react';
import { useEditorStore } from '@/store/editor';
import { ReadabilityMetrics, ReadabilityBreakdownItem, DescriptionMetric } from '@/components/admin/seo/types';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';

export function useReadabilityMetrics() {
  const [metrics, setMetrics] = useState<ReadabilityMetrics>({
    overallScore: 0,
    averageSentenceLength: '0 palavras',
    longSentencesPercentage: 0,
    complexWordsPercentage: 0,
    readingTime: '0 min',
    breakdown: [],
    descriptionsData: []
  });
  
  const [loading, setLoading] = useState(true);
  const { description, savedDescriptions } = useEditorStore();

  useEffect(() => {
    const calculateMetrics = () => {
      setLoading(true);
      
      // If there's no current description, use empty data
      if (!description) {
        setMetrics({
          overallScore: 0,
          averageSentenceLength: '0 palavras',
          longSentencesPercentage: 0,
          complexWordsPercentage: 0,
          readingTime: '0 min',
          breakdown: [],
          descriptionsData: []
        });
        setLoading(false);
        return;
      }

      // Get text content from the description
      const content = getTextContentFromDescription(description);
      
      // Calculate readability metrics
      setTimeout(() => {
        const readabilityMetrics = calculateReadabilityMetrics(content);
        const allDescriptions = [description, ...savedDescriptions].slice(0, 5);
        
        const descriptionsData: DescriptionMetric[] = allDescriptions.map((desc, index) => {
          const descContent = getTextContentFromDescription(desc);
          const score = Math.round(60 + Math.random() * 40);
          return {
            id: index,
            title: desc.name || `Descrição ${index + 1}`,
            score: score,
            avgSentenceLength: `${Math.round(Math.random() * 10 + 15)} palavras`,
            complexWordsPerc: Math.round(Math.random() * 20)
          };
        });
        
        setMetrics({
          ...readabilityMetrics,
          descriptionsData
        });
        setLoading(false);
      }, 800);
    };

    calculateMetrics();
  }, [description, savedDescriptions]);

  return { metrics, loading };
}

// Helper function to calculate readability metrics
function calculateReadabilityMetrics(content: string): Omit<ReadabilityMetrics, 'descriptionsData'> {
  // In a real implementation, this would perform proper text analysis
  const sentences = content.split(/[.!?]+/).filter(Boolean);
  const words = content.split(/\s+/).filter(Boolean);
  const totalSentences = sentences.length;
  const totalWords = words.length;
  
  // Calculate average sentence length
  const avgSentenceLength = totalSentences > 0 ? Math.round(totalWords / totalSentences) : 0;
  const avgSentenceLengthStr = `${avgSentenceLength} palavras`;
  
  // Calculate long sentences (more than 25 words)
  const longSentences = sentences.filter(s => s.split(/\s+/).filter(Boolean).length > 25);
  const longSentencesPercentage = totalSentences > 0 ? Math.round((longSentences.length / totalSentences) * 100) : 0;
  
  // Calculate complex words (simulated)
  const complexWordsCount = Math.round(totalWords * (Math.random() * 0.2 + 0.05));
  const complexWordsPercentage = totalWords > 0 ? Math.round((complexWordsCount / totalWords) * 100) : 0;
  
  // Calculate reading time (approximately 200 words per minute)
  const readingTimeMinutes = totalWords > 0 ? Math.max(1, Math.round(totalWords / 200)) : 0;
  const readingTime = `${readingTimeMinutes} min`;
  
  // Calculate overall score
  const overallScore = calculateOverallScore(
    avgSentenceLength, 
    longSentencesPercentage, 
    complexWordsPercentage
  );
  
  // Generate breakdown items
  const breakdown: ReadabilityBreakdownItem[] = [
    {
      metric: 'Tamanho médio das frases',
      score: avgSentenceLength > 25 ? 60 : avgSentenceLength > 20 ? 80 : 95,
      ideal: '15-20 palavras',
      current: avgSentenceLengthStr
    },
    {
      metric: 'Frases longas',
      score: 100 - longSentencesPercentage,
      ideal: '< 10%',
      current: `${longSentencesPercentage}%`
    },
    {
      metric: 'Palavras complexas',
      score: 100 - (complexWordsPercentage * 2),
      ideal: '< 10%',
      current: `${complexWordsPercentage}%`
    },
    {
      metric: 'Legibilidade Flesch',
      score: Math.round(70 + Math.random() * 30),
      ideal: '> 70',
      current: `${Math.round(70 + Math.random() * 30)}`
    }
  ];
  
  return {
    overallScore,
    averageSentenceLength: avgSentenceLengthStr,
    longSentencesPercentage,
    complexWordsPercentage,
    readingTime,
    breakdown
  };
}

// Calculate overall score based on various metrics
function calculateOverallScore(
  avgSentenceLength: number, 
  longSentencesPercentage: number, 
  complexWordsPercentage: number
): number {
  let score = 70; // Base score
  
  // Adjust for sentence length
  if (avgSentenceLength > 25) score -= 10;
  else if (avgSentenceLength < 10) score -= 5;
  
  // Adjust for long sentences
  if (longSentencesPercentage > 20) score -= 15;
  else if (longSentencesPercentage > 10) score -= 5;
  
  // Adjust for complex words
  if (complexWordsPercentage > 15) score -= 10;
  else if (complexWordsPercentage < 5) score += 5;
  
  // Add some randomness (for demo purposes)
  score += Math.round(Math.random() * 10);
  
  return Math.max(0, Math.min(100, score));
}
