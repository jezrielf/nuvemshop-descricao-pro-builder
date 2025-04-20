
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const KeywordAnalysis: React.FC = () => {
  // Dados simulados para a análise de palavras-chave
  const keywordData = [
    { keyword: 'produto', occurrences: 24, relevance: 85 },
    { keyword: 'qualidade', occurrences: 18, relevance: 72 },
    { keyword: 'tecnologia', occurrences: 15, relevance: 68 },
    { keyword: 'inovação', occurrences: 12, relevance: 60 },
    { keyword: 'desempenho', occurrences: 10, relevance: 55 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análise de Palavras-chave</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Análise das palavras-chave mais relevantes encontradas nas suas descrições de produtos.
          </p>

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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sugestões de Palavras-chave</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Com base nas suas descrições, sugerimos adicionar estas palavras-chave para melhorar o SEO:
          </p>
          <div className="flex flex-wrap gap-2">
            {['premium', 'exclusivo', 'garantia', 'durabilidade', 'sustentável', 'econômico'].map((tag) => (
              <div key={tag} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
                {tag}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
