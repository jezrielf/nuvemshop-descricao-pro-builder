
import { useState, useEffect } from 'react';
import { useEditorStore } from '@/store/editor';
import { SEOMetrics } from '@/types/seo';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';

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

      // Calcular métricas básicas
      const totalDesc = allDescriptions.length;
      let totalWords = 0;
      let totalSEOScore = 0;
      let totalReadability = 0;

      allDescriptions.forEach(desc => {
        const content = getTextContentFromDescription(desc);
        const wordCount = content.split(/\s+/).length;
        totalWords += wordCount;

        // Calcular score SEO básico (baseado no tamanho do conteúdo e presença de elementos)
        const seoScore = calculateBasicSEOScore(desc);
        totalSEOScore += seoScore;

        // Calcular score de legibilidade básico
        const readabilityScore = calculateBasicReadabilityScore(content);
        totalReadability += readabilityScore;
      });

      // Gerar dados históricos simulados (em uma implementação real, viria do backend)
      const historicalData = generateHistoricalData();

      setMetrics({
        totalDescriptions: totalDesc,
        newDescriptionsToday: Math.floor(Math.random() * 5), // Simulado
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

// Funções auxiliares
function calculateBasicSEOScore(description: any): number {
  let score = 0;
  const maxScore = 100;

  // Verificar presença de elementos importantes
  if (description.blocks.length >= 3) score += 20;
  if (description.blocks.some(b => b.type === 'hero')) score += 15;
  if (description.blocks.some(b => b.type === 'features')) score += 15;
  if (description.blocks.some(b => b.type === 'gallery')) score += 15;
  if (description.blocks.some(b => b.type === 'specifications')) score += 15;
  if (description.blocks.some(b => b.type === 'cta')) score += 20;

  return Math.min(score, maxScore);
}

function calculateBasicReadabilityScore(content: string): number {
  const sentences = content.split(/[.!?]+/).filter(Boolean);
  const words = content.split(/\s+/);
  const averageWordsPerSentence = words.length / sentences.length;

  // Score baseado no tamanho médio das sentenças
  let score = 100;
  if (averageWordsPerSentence > 20) score -= 20;
  if (averageWordsPerSentence > 25) score -= 20;
  if (averageWordsPerSentence > 30) score -= 20;

  return Math.max(0, score);
}

function generateHistoricalData() {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      seoScore: 50 + Math.floor(Math.random() * 50),
      readabilityScore: 60 + Math.floor(Math.random() * 40),
    };
  }).reverse();

  return last7Days;
}
