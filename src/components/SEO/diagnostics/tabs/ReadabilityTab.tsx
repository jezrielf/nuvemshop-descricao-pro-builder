
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface ReadabilityTabProps {
  metrics: {
    averageSentenceLength: number;
    averageWordLength: number;
    syllablesPerWord: number;
  };
  content: string;
}

export const ReadabilityTab: React.FC<ReadabilityTabProps> = ({ metrics, content }) => {
  // Calculate readability scores
  
  // Simplified Flesch Reading Ease Score adapted for Portuguese
  const calculateFleschScore = () => {
    // Flesch formula adapted: 206.835 - (1.015 * ASL) - (84.6 * ASW)
    // Where ASL = average sentence length, ASW = average number of syllables per word
    const score = 206.835 - (1.015 * metrics.averageSentenceLength) - (84.6 * metrics.syllablesPerWord);
    return Math.max(0, Math.min(100, score));
  };
  
  const fleschScore = calculateFleschScore();
  
  // Sentence length distribution
  const sentenceLengthData = (() => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const lengthGroups: Record<string, number> = {
      '1-5 palavras': 0,
      '6-10 palavras': 0,
      '11-15 palavras': 0,
      '16-20 palavras': 0,
      '21-25 palavras': 0,
      '26+ palavras': 0
    };
    
    sentences.forEach(sentence => {
      const wordCount = sentence.split(/\s+/).filter(Boolean).length;
      
      if (wordCount <= 5) lengthGroups['1-5 palavras']++;
      else if (wordCount <= 10) lengthGroups['6-10 palavras']++;
      else if (wordCount <= 15) lengthGroups['11-15 palavras']++;
      else if (wordCount <= 20) lengthGroups['16-20 palavras']++;
      else if (wordCount <= 25) lengthGroups['21-25 palavras']++;
      else lengthGroups['26+ palavras']++;
    });
    
    return Object.entries(lengthGroups).map(([range, count]) => ({
      range,
      count,
      percentage: sentences.length > 0 ? (count / sentences.length) * 100 : 0
    }));
  })();
  
  // Calculate readability grade level (approximate)
  const getReadabilityLevel = (score: number) => {
    if (score >= 90) return 'Muito fácil - Nível fundamental';
    if (score >= 80) return 'Fácil - Nível fundamental';
    if (score >= 70) return 'Razoavelmente fácil - Nível fundamental/médio';
    if (score >= 60) return 'Padrão - Nível médio';
    if (score >= 50) return 'Razoavelmente difícil - Nível médio/superior';
    if (score >= 30) return 'Difícil - Nível superior';
    return 'Muito difícil - Nível especializado';
  };
  
  const readabilityLevel = getReadabilityLevel(fleschScore);
  
  // Readability color
  const getReadabilityColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Índice de Legibilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-32 h-32">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={fleschScore >= 70 ? "#22c55e" : fleschScore >= 50 ? "#eab308" : "#ef4444"}
                  strokeWidth="3"
                  strokeDasharray={`${fleschScore}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-2xl font-bold">{Math.round(fleschScore)}</div>
                <div className="text-xs text-muted-foreground">Flesch</div>
              </div>
            </div>
            
            <Badge className={`${getReadabilityColor(fleschScore)} text-white`}>
              {readabilityLevel}
            </Badge>
            
            <div className="space-y-3 w-full">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Comprimento médio de sentenças</span>
                  <span className="text-sm font-medium">{metrics.averageSentenceLength.toFixed(1)} palavras</span>
                </div>
                <Progress 
                  value={Math.min(100, (metrics.averageSentenceLength / 25) * 100)} 
                  className="h-2"
                  indicatorClassName={
                    metrics.averageSentenceLength <= 15 ? "bg-green-500" : 
                    metrics.averageSentenceLength <= 20 ? "bg-yellow-500" : 
                    "bg-red-500"
                  }
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Ideal: 12-15</span>
                  <span>Aceitável: 15-20</span>
                  <span>Longo: 20+</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Sílabas por palavra</span>
                  <span className="text-sm font-medium">{metrics.syllablesPerWord.toFixed(1)}</span>
                </div>
                <Progress 
                  value={Math.min(100, (metrics.syllablesPerWord / 3) * 100)} 
                  className="h-2"
                  indicatorClassName={
                    metrics.syllablesPerWord <= 1.8 ? "bg-green-500" : 
                    metrics.syllablesPerWord <= 2.2 ? "bg-yellow-500" : 
                    "bg-red-500"
                  }
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Simples: ≤1.8</span>
                  <span>Médio: 1.8-2.2</span>
                  <span>Complexo: 2.2+</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Comprimento de Sentenças</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sentenceLengthData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`${value}%`, 'Porcentagem']} />
              <Bar 
                dataKey="percentage" 
                fill="#8884d8" 
                name="Porcentagem" 
                radius={[4, 4, 0, 0]}
                label={{ position: 'top', formatter: (value: number) => `${Math.round(value)}%` }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recomendações de Legibilidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Comprimento de sentenças</h4>
                <ul className="text-sm space-y-1">
                  {metrics.averageSentenceLength > 20 && (
                    <li className="text-amber-600">• Sentenças muito longas. Tente dividir em frases mais curtas.</li>
                  )}
                  {sentenceLengthData.find(d => d.range === '26+ palavras')?.percentage! > 20 && (
                    <li className="text-amber-600">• Muitas sentenças extremamente longas. Divida-as para melhorar a legibilidade.</li>
                  )}
                  {metrics.averageSentenceLength < 8 && (
                    <li className="text-amber-600">• Sentenças muito curtas. Pode parecer fragmentado.</li>
                  )}
                  {metrics.averageSentenceLength >= 12 && metrics.averageSentenceLength <= 18 && (
                    <li className="text-green-600">• Comprimento médio de sentenças ideal!</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Complexidade das palavras</h4>
                <ul className="text-sm space-y-1">
                  {metrics.syllablesPerWord > 2.2 && (
                    <li className="text-amber-600">• Palavras muito complexas. Use termos mais simples quando possível.</li>
                  )}
                  {metrics.averageWordLength > 6.5 && (
                    <li className="text-amber-600">• Palavras longas em excesso. Considere simplificar o vocabulário.</li>
                  )}
                  {metrics.syllablesPerWord <= 2.0 && (
                    <li className="text-green-600">• Boa escolha de palavras com complexidade adequada!</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Estrutura do texto</h4>
                <ul className="text-sm space-y-1">
                  {fleschScore < 50 && (
                    <li className="text-amber-600">• Texto complexo demais para consumo geral. Simplifique.</li>
                  )}
                  {fleschScore >= 70 && (
                    <li className="text-green-600">• Ótima legibilidade! Texto acessível para a maioria dos leitores.</li>
                  )}
                  <li>• Use parágrafos curtos e espaçados para facilitar a leitura.</li>
                  <li>• Inclua subtítulos para dividir grandes blocos de texto.</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Conclusão</h4>
              <p className="text-sm">
                {fleschScore >= 70 
                  ? "O texto apresenta excelente legibilidade, sendo acessível para a maioria dos consumidores. Mantém um bom equilíbrio entre simplicidade e informatividade."
                  : fleschScore >= 50
                  ? "O texto tem legibilidade média, adequada para a maioria dos consumidores, mas poderia ser simplificado em alguns pontos para aumentar a compreensão."
                  : "O texto apresenta alta complexidade de leitura, o que pode dificultar o entendimento para muitos consumidores. Recomenda-se simplificar as frases e usar palavras menos complexas para melhorar a compreensão e engajamento."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
