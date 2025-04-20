
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEditorStore } from '@/store/editor';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const KeywordAnalysis: React.FC = () => {
  const { savedDescriptions } = useEditorStore();
  
  // Function to analyze keywords from saved descriptions
  const analyzeKeywords = () => {
    const wordFrequency: { [key: string]: number } = {};
    const commonWords = new Set(['e', 'o', 'a', 'os', 'as', 'de', 'da', 'do', 'das', 'dos', 'em', 'para', 'com', 'por', 'um', 'uma', 'que', 'na', 'no', 'se', 'é']);
    
    // Process each description
    savedDescriptions.forEach(desc => {
      const content = getTextContentFromDescription(desc);
      const words = content.toLowerCase()
        .replace(/[^\w\sáàâãéèêíìîóòôõúùûç-]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3 && !commonWords.has(word));
      
      words.forEach(word => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      });
    });
    
    // Convert to array and sort by frequency
    return Object.entries(wordFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([keyword, occurrences]) => ({
        keyword,
        occurrences,
        relevance: Math.min(100, Math.round((occurrences / savedDescriptions.length) * 100))
      }));
  };

  const keywordData = analyzeKeywords();
  const totalDescriptions = savedDescriptions.length;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Análise de Palavras-chave</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="rounded-full bg-muted p-1 cursor-help">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  Esta análise mostra as palavras mais frequentes nas suas descrições de produtos,
                  destacando aquelas que podem ser importantes para SEO.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Baseado em {totalDescriptions} {totalDescriptions === 1 ? 'descrição' : 'descrições'} de produtos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {keywordData.length > 0 ? (
            <div className="space-y-5">
              {keywordData.map((keyword) => (
                <div key={keyword.keyword} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <span className="font-medium">{keyword.keyword}</span>
                      {keyword.relevance > 70 && (
                        <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">
                          Alta relevância
                        </Badge>
                      )}
                    </div>
                    <span className="text-muted-foreground">{keyword.occurrences} {keyword.occurrences === 1 ? 'ocorrência' : 'ocorrências'}</span>
                  </div>
                  <Progress value={keyword.relevance} className="h-2" />
                  <div className="flex justify-end text-xs text-muted-foreground">
                    <span>Relevância: {keyword.relevance}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Nenhuma palavra-chave encontrada. Adicione algumas descrições primeiro.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dicas de Otimização</CardTitle>
          <CardDescription>
            Estratégias para melhorar o uso de palavras-chave nas suas descrições
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-700 text-sm font-bold">1</span>
              </div>
              <div>
                <p className="font-medium">Use palavras-chave naturalmente</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Evite a repetição forçada das mesmas palavras. O texto deve fluir naturalmente.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-green-700 text-sm font-bold">2</span>
              </div>
              <div>
                <p className="font-medium">Diversifique o vocabulário</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Inclua sinônimos e variações das suas palavras-chave principais.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-700 text-sm font-bold">3</span>
              </div>
              <div>
                <p className="font-medium">Distribua as palavras-chave</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Espalhe as palavras ao longo do texto, não apenas no início ou título.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-700 text-sm font-bold">4</span>
              </div>
              <div>
                <p className="font-medium">Equilíbrio é fundamental</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Mantenha um equilíbrio entre palavras-chave e conteúdo informativo de qualidade.
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
