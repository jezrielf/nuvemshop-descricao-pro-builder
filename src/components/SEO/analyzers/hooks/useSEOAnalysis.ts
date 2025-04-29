
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ProductDescription } from '@/types/editor';
import { SEOResult } from '../types';
import { getTextContentFromDescription } from '../../utils/contentUtils';

export const useSEOAnalysis = (description: ProductDescription | null) => {
  const [keyword, setKeyword] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<SEOResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!description) {
      toast({
        title: "Nenhuma descrição",
        description: "Você precisa criar uma descrição para analisar.",
        variant: "destructive"
      });
      return;
    }
    
    if (!keyword.trim()) {
      toast({
        title: "Palavra-chave necessária",
        description: "Informe uma palavra-chave para analisar sua descrição.",
        variant: "destructive"
      });
      return;
    }
    
    setAnalyzing(true);
    
    // Simulate SEO analysis
    setTimeout(() => {
      // Generate mock results based on the description
      const textContent = getTextContentFromDescription(description);
      const wordCount = textContent.split(/\s+/).filter(Boolean).length;
      const keywordCount = (textContent.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
      const keywordDensity = (keywordCount / wordCount) * 100;
      
      // Calculate a mock score
      let score = 65;
      if (wordCount > 300) score += 10;
      if (keywordDensity > 0.5 && keywordDensity < 2.5) score += 15;
      if (description.blocks.some(b => b.type === 'image' || b.type === 'gallery')) score += 5;
      if (description.blocks.some(b => b.type === 'hero' || b.type === 'cta')) score += 5;
      
      // Generate recommendations
      const recommendations = [];
      
      if (wordCount < 300) {
        recommendations.push({
          text: "A descrição está muito curta. Recomendamos pelo menos 300 palavras para um bom SEO.",
          type: 'error' as const
        });
      } else {
        recommendations.push({
          text: "Bom comprimento de texto! Descrições mais longas tendem a classificar melhor.",
          type: 'success' as const
        });
      }
      
      if (keywordDensity < 0.5) {
        recommendations.push({
          text: `A densidade da palavra-chave "${keyword}" está muito baixa (${keywordDensity.toFixed(1)}%). Tente usá-la mais vezes.`,
          type: 'warning' as const
        });
      } else if (keywordDensity > 2.5) {
        recommendations.push({
          text: `A densidade da palavra-chave "${keyword}" está muito alta (${keywordDensity.toFixed(1)}%). Isso pode ser visto como keyword stuffing.`,
          type: 'error' as const
        });
      } else {
        recommendations.push({
          text: `Boa densidade da palavra-chave "${keyword}" (${keywordDensity.toFixed(1)}%).`,
          type: 'success' as const
        });
      }
      
      if (!description.blocks.some(b => b.type === 'image' || b.type === 'gallery')) {
        recommendations.push({
          text: "Nenhuma imagem encontrada. Adicione imagens relevantes para melhorar o SEO.",
          type: 'warning' as const
        });
      }
      
      // Generate mock keyword suggestions based on visible content
      const keywords = [
        { word: keyword, count: keywordCount, relevance: 100 },
        { word: keyword + 's', count: Math.floor(keywordCount / 3), relevance: 85 },
        { word: 'melhor ' + keyword, count: Math.floor(keywordCount / 4), relevance: 75 },
        { word: keyword + ' premium', count: Math.floor(keywordCount / 5), relevance: 65 },
        { word: 'comprar ' + keyword, count: Math.floor(keywordCount / 6), relevance: 60 },
      ];
      
      setResults({
        score,
        recommendations,
        keywords
      });
      
      setAnalyzing(false);
    }, 1500);
  };

  return {
    keyword,
    setKeyword,
    analyzing,
    results,
    handleAnalyze
  };
};
