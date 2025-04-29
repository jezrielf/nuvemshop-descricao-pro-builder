
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, Lightbulb, FileEdit } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';

interface HeadingStructureTabProps {
  headingStructure: {
    headings: { level: number; text: string }[];
    hasValidH1: boolean;
    hasProperHierarchy: boolean;
    count: number;
    topKeywords: string[];
    structure: string;
  };
  currentProductTitle?: string;
  productId?: number;
  onUpdateHeadings?: (headings: { level: number; text: string }[]) => Promise<boolean>;
}

export const HeadingStructureTab: React.FC<HeadingStructureTabProps> = ({ 
  headingStructure, 
  currentProductTitle,
  productId,
  onUpdateHeadings
}) => {
  const [isHeadingDialogOpen, setIsHeadingDialogOpen] = useState(false);
  const [suggestedHeadings, setSuggestedHeadings] = useState<{ level: number; text: string; original?: string }[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { success: isNuvemshopConnected } = useNuvemshopAuth();
  
  // Calculate scores and additional metrics
  const hasOnlyOneH1 = 
    headingStructure.headings.filter(h => h.level === 1).length === 1;
  
  const h1ContainsKeywords = 
    headingStructure.headings.some(h => 
      h.level === 1 && headingStructure.topKeywords.some(kw => h.text.toLowerCase().includes(kw))
    );
  
  const isProperlyStructured = headingStructure.hasValidH1 && headingStructure.hasProperHierarchy;
  
  const structureScore = calculateHeadingScore(headingStructure);

  // Identify improvement opportunities
  const improvements = getImprovementSuggestions(headingStructure);

  // Generate heading suggestions
  const handleGenerateHeadingSuggestions = () => {
    // Start with current headings or create a basic structure
    let suggestions = [...headingStructure.headings];
    
    // If there's no H1 but we have the product title, suggest it as H1
    if (!headingStructure.hasValidH1 && currentProductTitle) {
      suggestions = [{ level: 1, text: currentProductTitle }, ...suggestions.filter(h => h.level !== 1)];
    }
    
    // Generate better H2-H4 based on the content and keywords
    const availableKeywords = [...headingStructure.topKeywords];
    
    // Make sure we have at least one H2
    if (!suggestions.some(h => h.level === 2)) {
      const keyword = availableKeywords.shift();
      if (keyword) {
        suggestions.push({ 
          level: 2, 
          text: `Principais características ${keyword ? `relacionadas a ${keyword}` : ''}` 
        });
      } else {
        suggestions.push({ level: 2, text: 'Características principais' });
      }
    }
    
    // Add H3 if needed
    if (!suggestions.some(h => h.level === 3)) {
      const keyword = availableKeywords.shift();
      if (keyword) {
        suggestions.push({ 
          level: 3, 
          text: `Benefícios ${keyword ? `do ${keyword}` : 'do produto'}` 
        });
      }
    }
    
    // Sort headings by level for proper hierarchy
    suggestions = suggestions.sort((a, b) => a.level - b.level);
    
    // Update state with suggestions
    setSuggestedHeadings(suggestions);
    setIsHeadingDialogOpen(true);
  };

  const handleApplyHeadingSuggestions = async () => {
    if (!onUpdateHeadings) {
      toast({
        title: "Não foi possível atualizar",
        description: "Função de atualização não disponível.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUpdating(true);
    
    try {
      const success = await onUpdateHeadings(suggestedHeadings);
      
      if (success) {
        toast({
          title: "Headings atualizados",
          description: "As tags de cabeçalho foram atualizadas com sucesso.",
        });
        setIsHeadingDialogOpen(false);
      } else {
        toast({
          title: "Erro ao atualizar",
          description: "Não foi possível atualizar os headings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar headings:", error);
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar os headings.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Estrutura de Cabeçalhos</CardTitle>
                <Badge 
                  variant={structureScore >= 80 ? "default" : structureScore >= 50 ? "secondary" : "destructive"}
                  className="ml-2"
                >
                  {structureScore}/100
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {headingStructure.headings.length > 0 ? (
                  headingStructure.headings.map((heading, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start border-l-4 pl-3 py-1 ${
                        heading.level === 1 ? 'border-blue-500 font-bold' : 
                        heading.level === 2 ? 'border-green-500 ml-4' :
                        heading.level === 3 ? 'border-yellow-500 ml-8' :
                        heading.level === 4 ? 'border-orange-500 ml-12' :
                        heading.level === 5 ? 'border-red-500 ml-16' :
                        'border-purple-500 ml-20'
                      }`}
                    >
                      <Badge variant="outline" className="mr-2">H{heading.level}</Badge>
                      <span className="text-sm">{heading.text}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    Nenhum cabeçalho detectado na descrição.
                  </p>
                )}
              </div>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Importância da Hierarquia de Headings</AlertTitle>
                <AlertDescription className="text-xs">
                  Os cabeçalhos HTML (H1-H6) criam uma estrutura hierárquica que ajuda 
                  os mecanismos de busca a entender a organização e importância do conteúdo.
                  Uma estrutura clara melhora a indexação e a experiência do usuário.
                </AlertDescription>
              </Alert>
              
              {isNuvemshopConnected && productId && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2 flex items-center gap-2"
                  onClick={handleGenerateHeadingSuggestions}
                >
                  <FileEdit className="h-4 w-4" />
                  Otimizar Headings para SEO
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pontos a Melhorar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {improvements.length > 0 ? (
                improvements.map((imp, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs">{imp}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Parabéns! Sua estrutura de cabeçalhos segue as melhores práticas.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diagnóstico Técnico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant={headingStructure.hasValidH1 ? "default" : "destructive"}>
                <div className="flex items-center gap-2">
                  {headingStructure.hasValidH1 ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>Tag H1</AlertTitle>
                </div>
                <AlertDescription className="text-xs">
                  {headingStructure.hasValidH1 
                    ? "A descrição possui um H1, essencial para definir o tópico principal da página." 
                    : currentProductTitle
                      ? `A descrição não possui uma tag H1. Recomendamos usar o título do produto "${currentProductTitle}" como H1.`
                      : "A descrição não possui uma tag H1, fundamental para o SEO e para definir o assunto principal."}
                </AlertDescription>
              </Alert>
              
              <Alert variant={hasOnlyOneH1 ? "default" : "destructive"}>
                <div className="flex items-center gap-2">
                  {hasOnlyOneH1 
                    ? <CheckCircle2 className="h-4 w-4" /> 
                    : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>Unicidade do H1</AlertTitle>
                </div>
                <AlertDescription className="text-xs">
                  {hasOnlyOneH1 
                    ? "Apenas um H1 encontrado, conforme recomendado para SEO." 
                    : `${headingStructure.headings.filter(h => h.level === 1).length} H1s encontrados. O ideal é ter apenas um H1 por página.`}
                </AlertDescription>
              </Alert>
              
              <Alert variant={headingStructure.hasProperHierarchy ? "default" : "destructive"}>
                <div className="flex items-center gap-2">
                  {headingStructure.hasProperHierarchy 
                    ? <CheckCircle2 className="h-4 w-4" /> 
                    : <AlertTriangle className="h-4 w-4" />}
                  <AlertTitle>Hierarquia Semântica</AlertTitle>
                </div>
                <AlertDescription className="text-xs">
                  {headingStructure.hasProperHierarchy 
                    ? "A hierarquia de cabeçalhos é consistente e semanticamente correta." 
                    : "Detectados saltos na hierarquia de cabeçalhos (ex: H1 para H3), prejudicando a semântica estrutural."}
                </AlertDescription>
              </Alert>
              
              <Alert variant={h1ContainsKeywords ? "default" : "destructive"}>
                <div className="flex items-center gap-2">
                  {h1ContainsKeywords 
                    ? <CheckCircle2 className="h-4 w-4" /> 
                    : <AlertTriangle className="h-4 w-4" />}
                  <AlertTitle>H1 com Palavras-chave</AlertTitle>
                </div>
                <AlertDescription className="text-xs">
                  {h1ContainsKeywords 
                    ? "O H1 contém palavras-chave relevantes, o que é ótimo para SEO." 
                    : "O H1 não contém palavras-chave principais, o que pode reduzir sua eficácia para SEO."}
                </AlertDescription>
              </Alert>

              <Separator className="my-2" />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Palavras-chave em cabeçalhos:</h4>
                <div className="flex flex-wrap gap-1">
                  {headingStructure.topKeywords.length > 0 ? (
                    headingStructure.topKeywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">{keyword}</Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhuma palavra-chave significativa encontrada.</p>
                  )}
                </div>
              </div>

              <div className="mt-4 bg-slate-50 p-3 rounded-md">
                <h4 className="text-sm font-medium mb-1">Boas práticas de Headings para SEO</h4>
                <ul className="text-xs space-y-1 list-disc pl-4 text-muted-foreground">
                  <li>Use apenas um H1 por página, contendo a palavra-chave principal</li>
                  <li>Mantenha uma hierarquia clara e sequencial (H1 → H2 → H3)</li>
                  <li>Use cabeçalhos para estruturar conteúdo, não apenas para estilo</li>
                  <li>Inclua palavras-chave secundárias nos cabeçalhos H2 e H3</li>
                  <li>Mantenha os cabeçalhos concisos e descritivos</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isHeadingDialogOpen} onOpenChange={setIsHeadingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Otimização de Headings</DialogTitle>
            <DialogDescription>
              Revise e aprove as sugestões de tags de cabeçalho para melhorar o SEO da sua descrição.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="text-sm font-medium mb-2">Cabeçalhos sugeridos:</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {suggestedHeadings.map((heading, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col border-l-4 pl-3 py-1 ${
                    heading.level === 1 ? 'border-blue-500' : 
                    heading.level === 2 ? 'border-green-500' :
                    heading.level === 3 ? 'border-yellow-500' :
                    heading.level === 4 ? 'border-orange-500' :
                    heading.level === 5 ? 'border-red-500' :
                    'border-purple-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">H{heading.level}</Badge>
                    <span className="font-medium">{heading.text}</span>
                  </div>
                  {heading.original && heading.original !== heading.text && (
                    <span className="text-xs text-muted-foreground mt-1">
                      Original: {heading.original}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHeadingDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleApplyHeadingSuggestions} disabled={isUpdating}>
              {isUpdating ? 'Aplicando...' : 'Aplicar Mudanças'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Calculate a score for heading structure quality
function calculateHeadingScore(headingStructure: HeadingStructureTabProps['headingStructure']): number {
  let score = 0;
  
  // Base score - 20 points
  score += 20;
  
  // Has H1 - 20 points
  if (headingStructure.hasValidH1) score += 20;
  
  // Proper hierarchy - 15 points
  if (headingStructure.hasProperHierarchy) score += 15;
  
  // Only one H1 - 15 points
  const h1Count = headingStructure.headings.filter(h => h.level === 1).length;
  if (h1Count === 1) score += 15;
  
  // Heading count (2-3: 5 points, 4-6: 10 points, 7+: 15 points)
  if (headingStructure.count >= 2 && headingStructure.count <= 3) score += 5;
  else if (headingStructure.count >= 4 && headingStructure.count <= 6) score += 10;
  else if (headingStructure.count >= 7) score += 15;
  
  // H1 contains keywords - 15 points
  const h1 = headingStructure.headings.find(h => h.level === 1);
  if (h1 && headingStructure.topKeywords.some(kw => h1.text.toLowerCase().includes(kw))) {
    score += 15;
  }
  
  return Math.min(score, 100);
}

// Generate specific improvement suggestions
function getImprovementSuggestions(headingStructure: HeadingStructureTabProps['headingStructure']): string[] {
  const suggestions: string[] = [];
  
  const h1s = headingStructure.headings.filter(h => h.level === 1);
  
  // Check if H1 exists
  if (!headingStructure.hasValidH1) {
    suggestions.push("Adicione uma tag H1 que contenha a palavra-chave principal e descreva claramente o conteúdo.");
  }
  
  // Check if there are multiple H1s
  if (h1s.length > 1) {
    suggestions.push(`Mantenha apenas um H1 por página. Atualmente existem ${h1s.length} tags H1.`);
  }
  
  // Check hierarchy issues
  if (!headingStructure.hasProperHierarchy) {
    suggestions.push("Corrija a hierarquia de cabeçalhos para seguir uma ordem lógica sem saltos (ex: não pule de H1 para H3).");
  }
  
  // Check keywords in H1
  if (h1s.length === 1) {
    const h1 = h1s[0];
    if (!headingStructure.topKeywords.some(kw => h1.text.toLowerCase().includes(kw))) {
      suggestions.push("Inclua ao menos uma palavra-chave relevante no cabeçalho H1.");
    }
  }
  
  // Check heading count
  if (headingStructure.count < 2) {
    suggestions.push("Adicione mais cabeçalhos (H2, H3) para estruturar melhor o conteúdo e ajudar no SEO.");
  }
  
  // Check if there are H2 headings
  if (!headingStructure.headings.some(h => h.level === 2)) {
    suggestions.push("Adicione cabeçalhos H2 para criar seções principais dentro do conteúdo.");
  }
  
  // Check length of heading text
  const longHeadings = headingStructure.headings.filter(h => h.text.length > 60);
  if (longHeadings.length > 0) {
    suggestions.push("Reduza o tamanho de cabeçalhos muito longos para manter a concisão e o foco.");
  }
  
  return suggestions;
}
