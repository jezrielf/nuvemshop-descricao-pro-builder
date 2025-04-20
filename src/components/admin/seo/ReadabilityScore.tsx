
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const ReadabilityScore: React.FC = () => {
  // Dados simulados para o score de legibilidade
  const readabilityData = {
    overallScore: 76,
    averageSentenceLength: 15.8,
    longSentencesPercentage: 14,
    complexWordsPercentage: 12,
    readingTime: 3.2,
    breakdown: [
      { metric: 'Tamanho médio das sentenças', score: 82, ideal: '10-20 palavras' },
      { metric: 'Palavras complexas', score: 70, ideal: 'Menos de 10%' },
      { metric: 'Voz ativa', score: 85, ideal: 'Mais de 80%' },
      { metric: 'Parágrafos curtos', score: 72, ideal: '1-3 sentenças' },
      { metric: 'Densidade de palavras-chave', score: 68, ideal: '1-2%' },
    ]
  };

  // Função para determinar cor com base no score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Score de Legibilidade</CardTitle>
          <CardDescription>
            Análise de quão fácil é ler e compreender suas descrições de produto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  strokeWidth="10" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke={readabilityData.overallScore >= 80 ? "#22c55e" : 
                          readabilityData.overallScore >= 60 ? "#f59e0b" : "#ef4444"} 
                  strokeWidth="10" 
                  strokeDasharray={`${2 * Math.PI * 45 * readabilityData.overallScore / 100} ${2 * Math.PI * 45 * (1 - readabilityData.overallScore / 100)}`}
                  strokeDashoffset={2 * Math.PI * 45 * 0.25}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold">{readabilityData.overallScore}</span>
                <span className="text-xs text-muted-foreground">de 100</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium">
                {readabilityData.overallScore >= 80 ? 'Excelente' : 
                 readabilityData.overallScore >= 60 ? 'Bom' : 'Precisa melhorar'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Tempo de leitura médio: {readabilityData.readingTime} minutos
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-medium">Detalhamento</h3>
            {readabilityData.breakdown.map((item) => (
              <div key={item.metric} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-6">
                  <span className="text-sm">{item.metric}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className={`font-medium ${getScoreColor(item.score)}`}>{item.score}</span>
                </div>
                <div className="col-span-4 text-xs text-muted-foreground">
                  <span>Ideal: {item.ideal}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sugestões de Melhoria</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
              <span>Reduza o uso de sentenças com mais de 20 palavras</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
              <span>Substitua termos técnicos complexos por alternativas mais simples</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
              <span>Continue usando parágrafos curtos para facilitar a leitura</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
