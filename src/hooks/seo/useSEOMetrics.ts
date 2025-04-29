
import { useState, useEffect } from 'react';
import { useEditorStore } from '@/store/editor';

interface SEOMetrics {
  overallScore: number;
  keywordUsage: number;
  readability: number;
  technicalSEO: number;
}

export const useSEOMetrics = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<SEOMetrics>({
    overallScore: 0,
    keywordUsage: 0,
    readability: 0,
    technicalSEO: 0
  });
  
  const { description, blocks } = useEditorStore();
  
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
        const hasContent = description?.length > 0 || (blocks && blocks.length > 0);
        
        if (hasContent) {
          // Generate somewhat random but realistic metrics
          const keywordScore = 65 + Math.floor(Math.random() * 25);
          const readabilityScore = 70 + Math.floor(Math.random() * 20);
          const technicalScore = 60 + Math.floor(Math.random() * 30);
          
          // Calculate overall score as weighted average
          const overall = Math.round(
            (keywordScore * 0.4) + (readabilityScore * 0.3) + (technicalScore * 0.3)
          );
          
          setMetrics({
            overallScore: overall,
            keywordUsage: keywordScore,
            readability: readabilityScore,
            technicalSEO: technicalScore
          });
        } else {
          // Default values if no content
          setMetrics({
            overallScore: 45,
            keywordUsage: 30,
            readability: 60,
            technicalSEO: 50
          });
        }
      } catch (error) {
        console.error("Error calculating SEO metrics:", error);
        // Set default values on error
        setMetrics({
          overallScore: 40,
          keywordUsage: 35,
          readability: 50,
          technicalSEO: 40
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadMetrics();
  }, [description, blocks]);
  
  return { metrics, loading };
};
