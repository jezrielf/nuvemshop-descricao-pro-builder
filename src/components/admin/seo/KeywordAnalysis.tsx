
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSEOMetrics } from '@/hooks/seo/useSEOMetrics';

export const KeywordAnalysis: React.FC = () => {
  const { metrics } = useSEOMetrics();

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
            {metrics.keywordMetrics && metrics.keywordMetrics.map((keyword) => (
              <div key={keyword.keyword} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{keyword.keyword}</span>
                  <span className="text-muted-foreground">{keyword.frequency} ocorrências</span>
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
          <CardTitle>Sugestões de Otimização</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Com base na análise das suas descrições, aqui estão algumas sugestões para melhorar o SEO:
          </p>
          <ul className="space-y-2">
            {metrics.keywordMetrics && metrics.keywordMetrics.length > 0 ? (
              metrics.keywordMetrics
                .filter(k => k.relevance < 70)
                .map(keyword => (
                  <li key={keyword.keyword} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                    <span>
                      Otimize o uso da palavra-chave "{keyword.keyword}" - 
                      atualmente com relevância de {keyword.relevance}%
                    </span>
                  </li>
                ))
            ) : (
              <li className="text-muted-foreground">
                Nenhuma sugestão disponível no momento.
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
