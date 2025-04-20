
import { useState, useEffect } from 'react';
import { useEditorStore } from '@/store/editor';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';

interface KeywordData {
  topKeywords: {
    word: string;
    count: number;
    relevance: number;
    categories: string[];
  }[];
  densityData: {
    category: string;
    value: number;
    optimal: number;
    status: 'optimal' | 'low' | 'high';
  }[];
}

export function useKeywordMetrics() {
  const [keywords, setKeywords] = useState<KeywordData>({
    topKeywords: [],
    densityData: []
  });
  const [loading, setLoading] = useState(true);
  const { description } = useEditorStore();

  useEffect(() => {
    const analyzeKeywords = () => {
      setLoading(true);
      
      // Default to empty data if no description
      if (!description) {
        setKeywords({
          topKeywords: [],
          densityData: []
        });
        setLoading(false);
        return;
      }

      // Get text content from the description
      const content = getTextContentFromDescription(description);
      
      // Generate mock keyword data for demonstration
      // In a real implementation, this would be a proper keyword analysis algorithm
      setTimeout(() => {
        const mockKeywords = generateMockKeywordsData(content);
        setKeywords(mockKeywords);
        setLoading(false);
      }, 800);
    };

    analyzeKeywords();
  }, [description]);

  return { keywords, loading };
}

// Helper function to generate mock keyword data
function generateMockKeywordsData(content: string): KeywordData {
  const words = content.toLowerCase().split(/\s+/).filter(Boolean);
  const wordCount: Record<string, number> = {};
  
  // Count word occurrences
  words.forEach(word => {
    // Filter out short words and common stop words
    if (word.length < 3 || isStopWord(word)) return;
    
    // Remove punctuation
    const cleanWord = word.replace(/[.,!?;:()\-]/g, '');
    if (cleanWord.length < 3) return;
    
    wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
  });
  
  // Convert to array and sort by count
  const sortedWords = Object.entries(wordCount)
    .map(([word, count]) => ({
      word,
      count,
      relevance: Math.min(Math.round(count * 20 / Math.max(...Object.values(wordCount))), 100),
      categories: getRandomCategories()
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Generate density data - Create a mutable array with the same structure
  const densityData = [
    {
      category: 'Palavras-chave principais',
      value: Math.round(Math.random() * 5 + 2),
      optimal: 3,
      status: Math.random() > 0.7 ? 'optimal' : (Math.random() > 0.5 ? 'low' : 'high')
    } as const,
    {
      category: 'Palavras-chave secundárias',
      value: Math.round(Math.random() * 5 + 5),
      optimal: 7,
      status: Math.random() > 0.7 ? 'optimal' : (Math.random() > 0.5 ? 'low' : 'high')
    } as const,
    {
      category: 'Densidade de palavras-chave',
      value: Math.round(Math.random() * 3 + 1),
      optimal: 2,
      status: Math.random() > 0.7 ? 'optimal' : (Math.random() > 0.5 ? 'low' : 'high')
    } as const,
    {
      category: 'Repetição de palavras',
      value: Math.round(Math.random() * 10 + 10),
      optimal: 15,
      status: Math.random() > 0.7 ? 'optimal' : (Math.random() > 0.5 ? 'low' : 'high')
    } as const
  ].map(item => ({
    category: item.category,
    value: item.value,
    optimal: item.optimal,
    status: item.status
  }));
  
  return {
    topKeywords: sortedWords,
    densityData: densityData
  };
}

// Simple list of Portuguese stop words
function isStopWord(word: string): boolean {
  const stopWords = [
    'a', 'o', 'e', 'de', 'da', 'do', 'em', 'para', 'por', 'com', 'um', 'uma',
    'os', 'as', 'dos', 'das', 'na', 'no', 'nos', 'nas', 'ao', 'aos', 'à', 'às',
    'pelo', 'pela', 'pelos', 'pelas', 'que', 'se', 'não', 'mas', 'ou', 'como',
    'seu', 'sua', 'seus', 'suas', 'este', 'esta', 'estes', 'estas', 'isso', 'isso',
    'aquele', 'aquela', 'aqueles', 'aquelas'
  ];
  return stopWords.includes(word.toLowerCase());
}

// Helper to get random categories for keywords
function getRandomCategories(): string[] {
  const allCategories = [
    'Produto', 'Característica', 'Benefício', 'Material', 'Marca', 
    'Atributo', 'Categoria', 'Uso', 'Segmento', 'Estilo'
  ];
  
  const count = 1 + Math.floor(Math.random() * 2);
  const selected: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const category = allCategories[Math.floor(Math.random() * allCategories.length)];
    if (!selected.includes(category)) {
      selected.push(category);
    }
  }
  
  return selected;
}
