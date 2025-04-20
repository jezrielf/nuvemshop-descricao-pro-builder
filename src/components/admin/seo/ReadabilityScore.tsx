import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEditorStore } from '@/store/editor';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const ReadabilityScore: React.FC = () => {
  const { savedDescriptions } = useEditorStore();
  
  const calculateReadabilityMetrics = () => {
    if (savedDescriptions.length === 0) {
      return null;
    }

    let totalScore = 0;
    let totalSentenceLength = 0;
    let totalLongSentences = 0;
    let totalSentences = 0;
    let totalComplexWords = 0;
    let totalWords = 0;
    let totalReadingTime = 0;

    const descriptionsData = savedDescriptions.map((desc, index) => {
      const content = getTextContentFromDescription(desc);
      const sentences = content.split(/[.!?]+/).filter(Boolean);
      const words = content.split(/\s+/).filter(Boolean);
      
      let descLongSentences = 0;
      let descComplexWords = 0;
      let sentenceLengthSum = 0;
      
      // Calculate long sentences (>20 words)
      sentences.forEach(sentence => {
        const wordCount = sentence.split(/\s+/).filter(Boolean).length;
        if (wordCount > 20) descLongSentences++;
        sentenceLengthSum += wordCount;
      });

      // Calculate complex words (>3 syllables)
      words.forEach(word => {
        if (countSyllables(word) > 3) descComplexWords++;
      });

      // Individual metrics for this description
      const avgSentenceLength = sentences.length > 0 ? sentenceLengthSum / sentences.length : 0;
      const complexWordsPerc = words.length > 0 ? (descComplexWords / words.length) * 100 : 0;
      
      // Calculate individual score
      const lengthScore = 100 - Math.min(50, Math.abs(avgSentenceLength - 15) * 2);
      const complexityScore = 100 - Math.min(50, complexWordsPerc * 2);
      const individualScore = Math.round((lengthScore + complexityScore) / 2);
      
      // Accumulate totals
      totalSentences += sentences.length;
      totalWords += words.length;
      totalLongSentences += descLongSentences;
      totalComplexWords += descComplexWords;
      totalSentenceLength += sentenceLengthSum;
      totalReadingTime += words.length / 200; // Average reading speed
      totalScore += individualScore;
      
      // Here's the fix: using name property instead of title
      // The ProductDescription type has 'name' field, not 'title'
      return {
        id: index,
        title: desc.name || `Descrição ${index + 1}`,
        score: individualScore,
        avgSentenceLength: avgSentenceLength.toFixed(1),
        complexWordsPerc: Math.round(complexWordsPerc)
      };
    });

    const averageSentenceLength = totalSentences > 0 ? totalSentenceLength / totalSentences : 0;
    const longSentencesPercentage = totalSentences > 0 ? (totalLongSentences / totalSentences) * 100 : 0;
    const complexWordsPercentage = totalWords > 0 ? (totalComplexWords / totalWords) * 100 : 0;

    // Calculate overall score
    const lengthScore = 100 - Math.min(50, Math.abs(averageSentenceLength - 15) * 2);
    const complexityScore = 100 - Math.min(50, complexWordsPercentage * 2);
    const overallScore = Math.round((lengthScore + complexityScore) / 2);

    return {
      overallScore,
      averageSentenceLength: averageSentenceLength.toFixed(1),
      longSentencesPercentage: Math.round(longSentencesPercentage),
      complexWordsPercentage: Math.round(complexWordsPercentage),
      readingTime: (totalReadingTime / savedDescriptions.length).toFixed(1),
      breakdown: [
        { 
          metric: 'Tamanho médio das sentenças',
          score: Math.round(lengthScore),
          ideal: '10-20 palavras',
          current: `${averageSentenceLength.toFixed(1)} palavras`
        },
        {
          metric: 'Palavras complexas',
          score: Math.round(complexityScore),
          ideal: 'Menos de 10%',
          current: `${Math.round(complexWordsPercentage)}%`
        }
      ],
      descriptionsData
    };
  };

  const readabilityData = calculateReadabilityMetrics();

  // Simple syllable counter for Portuguese
  function countSyllables(word: string): number {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'á', 'é', 'í', 'ó', 'ú', 'â', 'ê', 'î', 'ô', 'û', 'ã', 'õ'];
    let count = 0;
    let isPreviousVowel = false;

    word.toLowerCase().split('').forEach(char => {
      const isVowel = vowels.includes(char);
      if (isVowel && !isPreviousVowel) count++;
      isPreviousVowel = isVowel;
    });

    return count || 1;
  }

  // Function to determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  if (!readabilityData) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center p-8">
        <h3 className="text-lg font-medium mb-2">Sem dados de legibilidade</h3>
        <p className="text-muted-foreground mb-4">
          Adicione algumas descrições para ver a análise de legibilidade.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Score de Legibilidade</CardTitle>
          <CardDescription>
            Análise de quão fácil é ler e compreender suas descrições
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative w-40 h-40 flex items-center justify-center mb-4">
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
                <span className={`text-4xl font-bold ${getScoreColor(readabilityData.overallScore)}`}>
                  {readabilityData.overallScore}
                </span>
                <span className="text-xs text-muted-foreground">de 100</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className={`text-lg font-medium ${getScoreColor(readabilityData.overallScore)}`}>
                {readabilityData.overallScore >= 80 ? 'Excelente' : 
                 readabilityData.overallScore >= 60 ? 'Bom' : 'Precisa melhorar'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Tempo de leitura médio: {readabilityData.readingTime} minutos
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-medium mb-3">Detalhamento</h3>
            {readabilityData.breakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">{item.metric}</span>
                    <div className="flex items-center mt-1">
                      <span className="text-xs mr-2">Atual: {item.current}</span>
                      <span className="text-xs text-muted-foreground">Ideal: {item.ideal}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-md ${getScoreBg(item.score)} text-white text-xs font-medium`}>
                    {item.score}
                  </div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getScoreBg(item.score)}`} 
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Comparação de Descrições</CardTitle>
            <CardDescription>
              Pontuação de legibilidade para cada descrição de produto
            </CardDescription>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={readabilityData.descriptionsData}
                margin={{ top: 5, right: 5, left: 0, bottom: 20 }}
              >
                <XAxis 
                  dataKey="title" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value} 
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value, name) => [
                    `Score: ${value}`, 'Legibilidade'
                  ]}
                  labelFormatter={(label) => `${label}`}
                />
                <Bar 
                  dataKey="score" 
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
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
                <span>Reduza o uso de sentenças com mais de 20 palavras ({readabilityData.longSentencesPercentage}% das suas sentenças)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                <span>Substitua termos técnicos complexos por alternativas mais simples</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                <span>Use parágrafos curtos para facilitar a leitura</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                <span>Mantenha uma média de {readabilityData.averageSentenceLength} palavras por sentença (10-20 é ideal)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
