
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEditorStore } from '@/store/editor';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';

export const KeywordAnalysis: React.FC = () => {
  const { savedDescriptions } = useEditorStore();
  
  // Function to analyze keywords from saved descriptions
  const analyzeKeywords = () => {
    const wordFrequency: { [key: string]: number } = {};
    const commonWords = new Set(['e', 'o', 'a', 'os', 'as', 'de', 'em', 'para', 'com', 'por', 'um', 'uma']);
    
    // Process each description
    savedDescriptions.forEach(desc => {
      const content = getTextContentFromDescription(desc);
      const words = content.toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.has(word));
      
      words.forEach(word => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      });
    });
    
    // Convert to array and sort by frequency
    return Object.entries(wordFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([keyword, occurrences]) => ({
        keyword,
        occurrences,
        relevance: Math.min(100, Math.round((occurrences / savedDescriptions.length) * 100))
      }));
  };

  const keywordData = analyzeKeywords();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análise de Palavras-chave</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Análise das palavras-chave mais frequentes nas suas descrições de produtos.
          </p>

          {keywordData.length > 0 ? (
            <div className="space-y-4">
              {keywordData.map((keyword) => (
                <div key={keyword.keyword} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{keyword.keyword}</span>
                    <span className="text-muted-foreground">{keyword.occurrences} ocorrências</span>
                  </div>
                  <Progress value={keyword.relevance} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span>Relevância: {keyword.relevance}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Nenhuma palavra-chave encontrada. Adicione algumas descrições primeiro.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dicas de Otimização</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Sugestões para melhorar o uso de palavras-chave:
          </p>
          <ul className="space-y-2 text-sm list-disc pl-4">
            <li>Use palavras-chave naturalmente no texto, evitando repetições forçadas</li>
            <li>Inclua sinônimos e variações das suas palavras-chave principais</li>
            <li>Distribua as palavras-chave ao longo do texto, não apenas no início</li>
            <li>Mantenha um equilíbrio entre palavras-chave e conteúdo informativo</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
