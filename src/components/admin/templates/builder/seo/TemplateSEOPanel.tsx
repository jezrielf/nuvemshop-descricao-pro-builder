import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Eye,
  Copy
} from 'lucide-react';
import { Template } from '@/types/editor';
import { useTemplateSEOAnalysis } from '@/components/SEO/template/useTemplateSEOAnalysis';

interface TemplateSEOPanelProps {
  template: Template;
  onQuickFix?: (action: string, data?: any) => void;
}

const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bom';
    if (score >= 40) return 'Médio';
    return 'Precisa melhorar';
  };

  return (
    <Card className="p-4">
      <div className="text-center">
        <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
          {score}/100
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {getScoreLabel(score)}
        </div>
        <Progress value={score} className="mt-3" />
      </div>
    </Card>
  );
};

const RecommendationItem: React.FC<{
  recommendation: {
    type: 'success' | 'warning' | 'error';
    message: string;
    action?: string;
  };
  onQuickFix?: (action: string) => void;
}> = ({ recommendation, onQuickFix }) => {
  const getIcon = () => {
    switch (recommendation.type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getBadgeVariant = () => {
    switch (recommendation.type) {
      case 'success':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'error':
        return 'destructive';
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg">
      {getIcon()}
      <div className="flex-1">
        <p className="text-sm">{recommendation.message}</p>
        {recommendation.action && onQuickFix && (
          <Button
            variant="outline"
            size="sm"
            className="mt-2 h-7"
            onClick={() => onQuickFix(recommendation.action!)}
          >
            <Zap className="h-3 w-3 mr-1" />
            Correção rápida
          </Button>
        )}
      </div>
      <Badge variant={getBadgeVariant()}>
        {recommendation.type === 'success' ? 'OK' : 
         recommendation.type === 'warning' ? 'Atenção' : 'Erro'}
      </Badge>
    </div>
  );
};

const KeywordSuggestions: React.FC<{ keywords: string[] }> = ({ keywords }) => {
  if (keywords.length === 0) return null;

  return (
    <Card className="p-4">
      <h4 className="font-medium text-sm mb-3">Palavras-chave sugeridas</h4>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {keyword}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

const MetricsGrid: React.FC<{ 
  wordCount: number; 
  keywordDensity: number;
  imageAnalysis: any;
  ctaAnalysis: any;
}> = ({ wordCount, keywordDensity, imageAnalysis, ctaAnalysis }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="p-3">
        <div className="text-xs text-muted-foreground">Palavras</div>
        <div className="text-lg font-semibold">{wordCount}</div>
      </Card>
      <Card className="p-3">
        <div className="text-xs text-muted-foreground">Densidade</div>
        <div className="text-lg font-semibold">{keywordDensity.toFixed(1)}%</div>
      </Card>
      <Card className="p-3">
        <div className="text-xs text-muted-foreground">Imagens c/ Alt</div>
        <div className="text-lg font-semibold">
          {imageAnalysis.imagesWithAlt}/{imageAnalysis.totalImages}
        </div>
      </Card>
      <Card className="p-3">
        <div className="text-xs text-muted-foreground">CTAs</div>
        <div className="text-lg font-semibold">{ctaAnalysis.ctaCount}</div>
      </Card>
    </div>
  );
};

export const TemplateSEOPanel: React.FC<TemplateSEOPanelProps> = ({
  template,
  onQuickFix
}) => {
  const [keyword, setKeyword] = useState('');
  const seoAnalysis = useTemplateSEOAnalysis(template, keyword);

  if (!seoAnalysis) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-sm">Análise SEO</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Adicione blocos para ver a análise SEO
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b space-y-3">
        <h3 className="font-semibold text-sm">Análise SEO</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Palavra-chave principal..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-9 h-8"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <ScoreDisplay score={seoAnalysis.score} />
          
          <MetricsGrid
            wordCount={seoAnalysis.wordCount}
            keywordDensity={seoAnalysis.keywordDensity}
            imageAnalysis={seoAnalysis.imageAnalysis}
            ctaAnalysis={seoAnalysis.ctaAnalysis}
          />
          
          <div>
            <h4 className="font-medium text-sm mb-3">Recomendações</h4>
            <div className="space-y-2">
              {seoAnalysis.recommendations.map((rec, index) => (
                <RecommendationItem
                  key={index}
                  recommendation={rec}
                  onQuickFix={onQuickFix}
                />
              ))}
            </div>
          </div>
          
          <KeywordSuggestions keywords={seoAnalysis.keywords} />
          
          <Card className="p-4">
            <h4 className="font-medium text-sm mb-3">Pré-visualização JSON-LD</h4>
            <div className="bg-muted p-3 rounded text-xs font-mono">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": template.name,
                "description": `Template ${template.category}`,
                "keywords": keyword || seoAnalysis.keywords.join(', ')
              }, null, 2)}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 h-7"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Product",
                  "name": template.name,
                  "description": `Template ${template.category}`,
                  "keywords": keyword || seoAnalysis.keywords.join(', ')
                }, null, 2));
              }}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copiar
            </Button>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};