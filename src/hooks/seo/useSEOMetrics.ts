
import { useState, useEffect } from 'react';
import { useEditorStore } from '@/store/editor';

interface SEOMetrics {
  overallScore: number;
  keywordUsage: number;
  readability: number;
  technicalSEO: number;
  keywordMetrics: {
    keyword: string;
    frequency: number;
    relevance: number;
  }[];
}

export const useSEOMetrics = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<SEOMetrics>({
    overallScore: 0,
    keywordUsage: 0,
    readability: 0,
    technicalSEO: 0,
    keywordMetrics: []
  });
  
  const { description } = useEditorStore();
  
  useEffect(() => {
    // Simulate loading metrics
    const loadMetrics = async () => {
      setLoading(true);
      
      try {
        // In a real app, this would call an API or perform analysis
        // For now, we're generating sample data
        
        // Wait a bit to simulate loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate some metrics based on the content
        const hasContent = description && description.blocks && description.blocks.length > 0;
        
        if (hasContent) {
          // Generate somewhat random but realistic metrics
          const keywordScore = 65 + Math.floor(Math.random() * 25);
          const readabilityScore = 70 + Math.floor(Math.random() * 20);
          const technicalScore = 60 + Math.floor(Math.random() * 30);
          
          // Calculate overall score as weighted average
          const overall = Math.round(
            (keywordScore * 0.4) + (readabilityScore * 0.3) + (technicalScore * 0.3)
          );
          
          // Generate sample keyword metrics
          const keywordMetrics = [
            { keyword: 'produto', frequency: 12, relevance: 85 },
            { keyword: 'qualidade', frequency: 8, relevance: 72 },
            { keyword: 'especificação', frequency: 5, relevance: 65 },
            { keyword: 'premium', frequency: 7, relevance: 58 },
            { keyword: 'desempenho', frequency: 4, relevance: 45 }
          ];
          
          setMetrics({
            overallScore: overall,
            keywordUsage: keywordScore,
            readability: readabilityScore,
            technicalSEO: technicalScore,
            keywordMetrics
          });
        } else {
          // Default values if no content
          setMetrics({
            overallScore: 45,
            keywordUsage: 30,
            readability: 60,
            technicalSEO: 50,
            keywordMetrics: [
              { keyword: 'produto', frequency: 3, relevance: 40 },
              { keyword: 'descrição', frequency: 2, relevance: 25 }
            ]
          });
        }
      } catch (error) {
        console.error("Error calculating SEO metrics:", error);
        // Set default values on error
        setMetrics({
          overallScore: 40,
          keywordUsage: 35,
          readability: 50,
          technicalSEO: 40,
          keywordMetrics: []
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadMetrics();
  }, [description]);
  
  return { metrics, loading };
};
