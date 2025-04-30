
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { HeadingStructure, HeadingSuggestion } from '../types/headingTypes';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';
import { ProductDescription } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';

export interface AIHeadingAnalysis {
  analysis: {
    strengths: string[];
    weaknesses: string[];
    seoScore: number;
    isHierarchyValid: boolean;
    keywordUsage: string;
    detailedFeedback: string;
  };
  suggestions: HeadingSuggestion[];
  autoCorrect: Array<{
    level: number;
    text: string;
    original: string;
    action: string;
    explanation: string;
  }>;
}

export const useAIHeadingAnalysis = () => {
  const [analysis, setAnalysis] = useState<AIHeadingAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeHeadings = async (
    headingStructure: HeadingStructure,
    productTitle?: string,
    productDescription?: ProductDescription
  ) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Extract content from the description for better context
      let contentText = '';
      if (productDescription) {
        contentText = getTextContentFromDescription(productDescription);
      }

      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('analyze-headings', {
        body: {
          headings: headingStructure.headings,
          productTitle,
          content: contentText,
          keywords: headingStructure.topKeywords || []
        }
      });

      if (error) {
        throw new Error(`API Error: ${error.message}`);
      }

      setAnalysis(data as AIHeadingAnalysis);
      return data as AIHeadingAnalysis;
    } catch (err: any) {
      const message = err.message || 'Falha ao analisar headings com IA';
      console.error('AI Heading Analysis Error:', err);
      setError(message);
      toast({
        title: "Erro na análise de headings",
        description: message,
        variant: "destructive"
      });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analysis,
    isAnalyzing,
    error,
    analyzeHeadings
  };
};
