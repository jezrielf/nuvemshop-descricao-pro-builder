import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { getTextContentFromDescription } from '@/components/SEO/utils/contentUtils';
import { ProductDescription } from '@/types/editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertTriangle } from 'lucide-react';
import { useEditorStore } from '@/store/editor';

interface KeywordDistributionTabProps {
  description?: ProductDescription;
}

export const KeywordDistributionTab: React.FC<KeywordDistributionTabProps> = ({ description: propDescription }) => {
  const [keywordMode, setKeywordMode] = useState<'density' | 'position' | 'distribution'>('density');
  const { description: storeDescription, getHtmlOutput } = useEditorStore();
  
  // Use the description from props if provided, otherwise use the one from the store
  const activeDescription = propDescription || storeDescription;
  
  const { keywords, wordCount, sections } = useMemo(() => {
    if (!activeDescription) {
      return { keywords: [], wordCount: 0, sections: [] };
    }
    
    // MODIFICAÇÃO PRINCIPAL: Usar o HTML gerado para extração de palavras-chave
    // ao invés de usar o texto diretamente dos blocos
    const htmlOutput = getHtmlOutput();
    let content = '';
    
    if (htmlOutput) {
      // Extrair texto do HTML gerado (removendo tags)
      content = htmlOutput.replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      console.log('Analisando conteúdo do HTML gerado:', content.substring(0, 100) + '...');
    } else {
      // Fallback para o método anterior, caso o HTML não esteja disponível
      const visibleBlocks = activeDescription.blocks.filter(block => block.visible);
      const visibleDescription = { ...activeDescription, blocks: visibleBlocks };
      content = getTextContentFromDescription(visibleDescription);
      console.log('Fallback: Analisando conteúdo dos blocos:', content.substring(0, 100) + '...');
    }
    
    const words = content.toLowerCase()
      .replace(/[^\wáàâãéèêíìîóòôõúùûç\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3);
      
    const wordCount = words.length;
    
    // Count keyword frequency
    const keywordCounts: Record<string, number> = {};
    const stopWords = new Set(['para', 'como', 'mais', 'este', 'esta', 'isso', 'aquilo', 'pelo', 'pela', 'pelos', 'pelas', 'seja', 'seus', 'suas']);

    // Get keywords and their frequency
    words.forEach(word => {
      if (!stopWords.has(word)) {
        keywordCounts[word] = (keywordCounts[word] || 0) + 1;
      }
    });

    // Sort by frequency and take top 10
    const topKeywords = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: (count / wordCount) * 100,
        isOptimal: (count / wordCount) * 100 >= 0.5 && (count / wordCount) * 100 <= 2.5
      }));
    
    // Analyze keyword distribution across sections (only visible sections)
    const sections = activeDescription.blocks.filter(block => block.visible).map(block => {
      let blockContent = '';
      
      if ('content' in block && typeof block.content === 'string') {
        blockContent = block.content.replace(/<[^>]+>/g, ' ');
      } else if ('heading' in block && typeof block.heading === 'string') {
        blockContent = block.heading;
      }
      
      // Check for each keyword in this section
      const sectionKeywords = topKeywords.reduce((acc: Record<string, boolean>, { keyword }) => {
        acc[keyword] = blockContent.toLowerCase().includes(keyword);
        return acc;
      }, {});
      
      return {
        blockId: block.id,
        type: block.type,
        title: 'title' in block ? block.title : block.type,
        keywordPresence: sectionKeywords
      };
    });
    
    return {
      keywords: topKeywords,
      wordCount,
      sections
    };
  }, [activeDescription, getHtmlOutput]);
  

  
  // Calculate optimal density thresholds
  const minDensity = 0.5;
  const optimalDensity = 1.5;
  const maxDensity = 2.5;
  
  // Calculate overall distribution score
  const distributionScore = useMemo(() => {
    if (keywords.length === 0) return 0;
    
    // How many sections contain each keyword
    const keywordSectionCounts = keywords.map(k => {
      const sectionsWithKeyword = sections.filter(s => s.keywordPresence[k.keyword]);
      return {
        keyword: k.keyword,
        sectionCount: sectionsWithKeyword.length,
        sectionPercentage: (sectionsWithKeyword.length / sections.length) * 100
      };
    });
    
    // Average appearance percentage across sections
    const avgDistribution = keywordSectionCounts.reduce((sum, k) => sum + k.sectionPercentage, 0) / keywords.length;
    
    // Score from 0-100 based on distribution
    return Math.min(100, avgDistribution * 2);
  }, [keywords, sections]);

  if (!activeDescription) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhuma descrição disponível para análise.
        </p>
      </div>
    );
  }

  return (
    
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Palavras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wordCount}</div>
            <p className="text-xs text-muted-foreground">
              {wordCount < 300 ? "Abaixo do ideal (300+ recomendado)" : 
               wordCount < 600 ? "Bom comprimento de conteúdo" : 
               "Excelente comprimento de conteúdo"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Palavras-chave Principais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keywords.length}</div>
            <p className="text-xs text-muted-foreground">
              {keywords.length < 3 ? "Poucas palavras-chave detectadas" : 
               keywords.length < 6 ? "Quantidade adequada de palavras-chave" : 
               "Boa variedade de palavras-chave"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Score de Distribuição</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(distributionScore)}/100</div>
            <p className="text-xs text-muted-foreground">
              {distributionScore < 40 ? "Distribuição pobre de palavras-chave" : 
               distributionScore < 70 ? "Distribuição adequada" : 
               "Excelente distribuição de palavras-chave"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Análise de Palavras-chave</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={keywordMode} onValueChange={(v) => setKeywordMode(v as any)} className="space-y-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="density">Densidade</TabsTrigger>
              <TabsTrigger value="distribution">Distribuição</TabsTrigger>
              <TabsTrigger value="position">Posicionamento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="density" className="space-y-6">
              {keywords.length > 0 ? (
                keywords.map((keyword, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{keyword.keyword}</span>
                      <span>
                        <Badge variant={keyword.isOptimal ? "default" : "outline"}>
                          {keyword.count}x ({keyword.density.toFixed(1)}%)
                        </Badge>
                      </span>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
                        <div className="absolute w-full h-2 bg-gray-200 rounded">
                          <div className="absolute h-2 bg-yellow-200 rounded" style={{ width: `${Math.min(maxDensity, 5)}%`, left: "0%" }}></div>
                          <div className="absolute h-2 bg-green-200 rounded" style={{ width: `${optimalDensity - minDensity}%`, left: `${minDensity}%` }}></div>
                        </div>
                        <div 
                          className={`h-2 ${keyword.isOptimal ? 'bg-green-500' : keyword.density < minDensity ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.min(keyword.density * 2, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span>Ideal: 0.5-2.5%</span>
                      <span>5%+</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Nenhuma palavra-chave significativa encontrada.
                </div>
              )}
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Interpretação da Densidade</AlertTitle>
                <AlertDescription>
                  A densidade ideal de palavras-chave é entre 0,5% e 2,5%. 
                  Valores abaixo podem indicar foco insuficiente no termo, enquanto valores acima 
                  podem ser interpretados como "keyword stuffing" pelos mecanismos de busca.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="distribution" className="space-y-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seção
                      </th>
                      {keywords.slice(0, 5).map((k, idx) => (
                        <th key={idx} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          "{k.keyword}"
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sections.map((section, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {section.title}
                        </td>
                        {keywords.slice(0, 5).map((k, kidx) => (
                          <td key={kidx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {section.keywordPresence[k.keyword] ? 
                              <Badge variant="success">Presente</Badge> : 
                              <Badge variant="outline" className="bg-gray-100">Ausente</Badge>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Distribuição de Palavras-chave</AlertTitle>
                <AlertDescription>
                  Para um SEO eficaz, as palavras-chave principais devem estar distribuídas ao longo 
                  de toda a descrição, especialmente no início do conteúdo e em cabeçalhos.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="position" className="space-y-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  A análise de posicionamento mostra onde suas palavras-chave estão localizadas 
                  no conteúdo (início, meio, fim).
                </p>
                <p className="text-sm">
                  Esta funcionalidade será implementada em breve.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
