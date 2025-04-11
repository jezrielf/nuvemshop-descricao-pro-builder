
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ProductDescription } from '@/types/editor';

interface SEOResult {
  score: number;
  recommendations: {
    text: string;
    type: 'success' | 'warning' | 'error';
  }[];
  keywords: {
    word: string;
    count: number;
    relevance: number;
  }[];
}

interface SEOAnalyzerProps {
  description: ProductDescription | null;
}

const SEOAnalyzer: React.FC<SEOAnalyzerProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<SEOResult | null>(null);
  const { toast } = useToast();
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
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
      
      // Generate mock keyword suggestions
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
  
  const getTextContentFromDescription = (desc: ProductDescription): string => {
    // Extract text content from all blocks
    const textContent = desc.blocks.map(block => {
      switch (block.type) {
        case 'text':
          return block.content;
        case 'hero':
          return `${block.heading} ${block.subheading}`;
        case 'features':
          return `${block.heading} ${block.features?.map(f => `${f.title} ${f.description}`).join(' ')}`;
        case 'benefits':
          return `${block.heading} ${block.benefits?.map(b => `${b.title} ${b.description}`).join(' ')}`;
        case 'specifications':
          return `${block.heading} ${block.specs?.map(s => `${s.name} ${s.value}`).join(' ')}`;
        case 'faq':
          return `${block.heading} ${block.questions?.map(q => `${q.question} ${q.answer}`).join(' ')}`;
        case 'cta':
          return `${block.heading} ${block.content} ${block.buttonText}`;
        case 'imageText':
        case 'textImage':
          return `${block.heading} ${block.content}`;
        default:
          return '';
      }
    }).join(' ');
    
    return textContent;
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Search className="h-4 w-4 mr-1" />
          Análise SEO
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Análise de SEO</DialogTitle>
          <DialogDescription>
            Analise sua descrição para melhorar o posicionamento nos mecanismos de busca.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 flex-1 flex flex-col">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Digite sua palavra-chave principal..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button 
              onClick={handleAnalyze} 
              disabled={analyzing || !description}
            >
              {analyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analisando...
                </>
              ) : (
                "Analisar"
              )}
            </Button>
          </div>
          
          {results ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-lg font-bold mb-2">
                  Pontuação SEO
                </div>
                <div className={`text-4xl font-bold ${getScoreColor(results.score)}`}>
                  {results.score}/100
                </div>
                <Progress 
                  value={results.score} 
                  max={100} 
                  className={`h-2 mt-2 ${getProgressColor(results.score)}`} 
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Recomendações</h3>
                <ScrollArea className="h-40">
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        {rec.type === 'success' && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />}
                        {rec.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />}
                        {rec.type === 'error' && <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />}
                        <span>{rec.text}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Palavras-chave encontradas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {results.keywords.map((keyword, index) => (
                    <div key={index} className="flex justify-between items-center border rounded p-2">
                      <div className="font-medium">{keyword.word}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500">{keyword.count}x</div>
                        <div className={`text-xs px-1.5 py-0.5 rounded ${
                          keyword.relevance > 80 ? 'bg-green-100 text-green-800' :
                          keyword.relevance > 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {keyword.relevance}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-500">
              {analyzing ? (
                <>
                  <Loader2 className="h-8 w-8 mb-4 animate-spin" />
                  <p>Analisando sua descrição...</p>
                  <p className="text-sm mt-1">Isso pode levar alguns segundos.</p>
                </>
              ) : (
                <>
                  <Search className="h-8 w-8 mb-4 opacity-20" />
                  <p>Insira uma palavra-chave e clique em "Analisar" para avaliar sua descrição.</p>
                  <p className="text-sm mt-1">Receba dicas para melhorar seu SEO.</p>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SEOAnalyzer;
