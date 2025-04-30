
import React, { useState } from 'react';
import { FileEdit, Info, Wand2, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { HeadingsList } from './HeadingsList';
import { ImprovementsList } from './ImprovementsList';
import { HeadingDiagnostics } from './HeadingDiagnostics';
import { HeadingSuggestionDialog } from './HeadingSuggestionDialog';
import { AutoCorrectHeadingsDialog } from './AutoCorrectHeadingsDialog';
import { AIHeadingAnalysisDialog } from './AIHeadingAnalysisDialog';
import { HeadingStructureTabProps, HeadingSuggestion } from '../../types/headingTypes';
import { calculateHeadingScore, getImprovementSuggestions, generateHeadingSuggestions } from '../../utils/headingUtils';
import { useHeadingAutoCorrect } from '../../hooks/useHeadingAutoCorrect';
import { useAIHeadingAnalysis } from '../../hooks/useAIHeadingAnalysis';
import { useEditorStore } from '@/store/editor';

export const HeadingStructureTab: React.FC<HeadingStructureTabProps> = ({ 
  headingStructure, 
  currentProductTitle,
  productId,
  onUpdateHeadings
}) => {
  const [isHeadingDialogOpen, setIsHeadingDialogOpen] = useState(false);
  const [isAutoCorrectDialogOpen, setIsAutoCorrectDialogOpen] = useState(false);
  const [isAIAnalysisDialogOpen, setIsAIAnalysisDialogOpen] = useState(false);
  const [suggestedHeadings, setSuggestedHeadings] = useState<HeadingSuggestion[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { success: isNuvemshopConnected } = useNuvemshopAuth();
  const { description } = useEditorStore();
  
  // Hook for auto-correct
  const { 
    isProcessingAutoCorrect, 
    applyAutomaticCorrection 
  } = useHeadingAutoCorrect(headingStructure, currentProductTitle, productId, onUpdateHeadings);
  
  // Hook for AI-powered analysis
  const { 
    analysis: aiAnalysis, 
    isAnalyzing,
    analyzeHeadings
  } = useAIHeadingAnalysis();
  
  // Calculate scores and additional metrics
  const hasOnlyOneH1 = 
    headingStructure.headings.filter(h => h.level === 1).length <= 1; // <= 1 porque pode não ter nenhum
  
  const h1ContainsKeywords = 
    headingStructure.headings.some(h => 
      h.level === 1 && headingStructure.topKeywords.some(kw => h.text.toLowerCase().includes(kw))
    ) || 
    // Verifica também se o título do produto contém palavras-chave
    (currentProductTitle && headingStructure.topKeywords.some(kw => 
      currentProductTitle.toLowerCase().includes(kw)
    ));
  
  // Se temos um título do produto, consideramos que teremos um H1 válido, mesmo que não esteja no HTML
  const isProperlyStructured = 
    (headingStructure.hasValidH1 || !!currentProductTitle) && 
    headingStructure.hasProperHierarchy;
  
  const structureScore = calculateHeadingScore(
    headingStructure,
    !!currentProductTitle // Passa se tem título do produto como bônus
  );

  // Identify improvement opportunities
  const improvements = getImprovementSuggestions(headingStructure, currentProductTitle);

  // Generate heading suggestions
  const handleGenerateHeadingSuggestions = () => {
    const suggestions = generateHeadingSuggestions(headingStructure, currentProductTitle);
    setSuggestedHeadings(suggestions);
    setIsHeadingDialogOpen(true);
  };

  // Handle AI Analysis
  const handleRunAIAnalysis = async () => {
    await analyzeHeadings(headingStructure, currentProductTitle, description);
    setIsAIAnalysisDialogOpen(true);
  };

  const handleApplyAISuggestions = async () => {
    if (!onUpdateHeadings || !aiAnalysis) {
      toast({
        title: "Não foi possível atualizar",
        description: "Análise de IA não disponível ou função de atualização não disponível.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUpdating(true);
    
    try {
      const success = await onUpdateHeadings(aiAnalysis.suggestions);
      
      if (success) {
        toast({
          title: "Headings atualizados",
          description: "As tags de cabeçalho foram atualizadas com sucesso usando as sugestões da IA.",
        });
        setIsAIAnalysisDialogOpen(false);
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

  const handleApplyAIAutoCorrection = async () => {
    if (!onUpdateHeadings || !aiAnalysis) {
      toast({
        title: "Não foi possível aplicar correções",
        description: "Análise de IA não disponível ou função de atualização não disponível.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUpdating(true);
    
    try {
      // Extract only the corrections that are adding or modifying
      const correctionsToApply = aiAnalysis.autoCorrect
        .filter(item => ['add', 'modify'].includes(item.action))
        .map(item => ({
          level: item.level,
          text: item.text,
          original: item.original || ''
        }));
        
      const success = await onUpdateHeadings(correctionsToApply);
      
      if (success) {
        toast({
          title: "Correções aplicadas",
          description: "As correções automáticas foram aplicadas com sucesso.",
        });
        setIsAIAnalysisDialogOpen(false);
      } else {
        toast({
          title: "Erro ao aplicar correções",
          description: "Não foi possível aplicar as correções automáticas.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao aplicar correções:", error);
      toast({
        title: "Erro ao aplicar correções",
        description: "Ocorreu um erro ao aplicar as correções automáticas.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
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
      // Certifique-se de que estamos usando o título do produto como H1
      const finalSuggestions = suggestedHeadings.filter(h => h.level !== 1);
      
      if (currentProductTitle) {
        // O título do produto será aplicado automaticamente pelo useHeadingsUpdater
      }
      
      const success = await onUpdateHeadings(finalSuggestions);
      
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

  // Handler for auto-correction dialog
  const handleAutoCorrection = async () => {
    const success = await applyAutomaticCorrection();
    if (success) {
      setIsAutoCorrectDialogOpen(false);
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
                  variant={structureScore >= 80 ? "success" : structureScore >= 50 ? "secondary" : "destructive"}
                  className="ml-2"
                >
                  {structureScore}/100
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <HeadingsList headingStructure={headingStructure} />
              
              {currentProductTitle && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertTitle className="text-blue-800">Título do Produto</AlertTitle>
                  <AlertDescription className="text-xs text-blue-700">
                    <div className="flex flex-col gap-1">
                      <p>
                        <strong>{currentProductTitle}</strong> (será usado como H1)
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Importância da Hierarquia de Headings</AlertTitle>
                <AlertDescription className="text-xs">
                  Os cabeçalhos HTML (H1-H6) criam uma estrutura hierárquica que ajuda 
                  os mecanismos de busca a entender a organização e importância do conteúdo.
                  Uma estrutura clara melhora a indexação e a experiência do usuário.
                </AlertDescription>
              </Alert>
              
              <div className="flex flex-col gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex items-center gap-2"
                  onClick={handleGenerateHeadingSuggestions}
                >
                  <FileEdit className="h-4 w-4" />
                  Otimizar Headings para SEO
                </Button>
                
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full flex items-center gap-2"
                  onClick={() => setIsAutoCorrectDialogOpen(true)}
                >
                  <Wand2 className="h-4 w-4" />
                  Correção Automática de Estrutura
                </Button>
                
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full flex items-center gap-2"
                  onClick={handleRunAIAnalysis}
                >
                  <Brain className="h-4 w-4" />
                  Análise Avançada com IA
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pontos a Melhorar</CardTitle>
            </CardHeader>
            <CardContent>
              <ImprovementsList improvements={improvements} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diagnóstico Técnico</CardTitle>
            </CardHeader>
            <CardContent>
              <HeadingDiagnostics 
                headingStructure={headingStructure}
                hasOnlyOneH1={hasOnlyOneH1}
                h1ContainsKeywords={h1ContainsKeywords}
                currentProductTitle={currentProductTitle}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <HeadingSuggestionDialog
        isOpen={isHeadingDialogOpen}
        onOpenChange={setIsHeadingDialogOpen}
        suggestedHeadings={suggestedHeadings}
        isUpdating={isUpdating}
        onApply={handleApplyHeadingSuggestions}
        currentProductTitle={currentProductTitle}
      />
      
      <AutoCorrectHeadingsDialog 
        isOpen={isAutoCorrectDialogOpen}
        onOpenChange={setIsAutoCorrectDialogOpen}
        headingStructure={headingStructure}
        onApplyCorrection={handleAutoCorrection}
        isProcessing={isProcessingAutoCorrect}
      />
      
      <AIHeadingAnalysisDialog
        isOpen={isAIAnalysisDialogOpen}
        onOpenChange={setIsAIAnalysisDialogOpen}
        isAnalyzing={isAnalyzing}
        analysis={aiAnalysis}
        onAnalyze={handleRunAIAnalysis}
        onApplySuggestions={handleApplyAISuggestions}
        onApplyAutoCorrection={handleApplyAIAutoCorrection}
        headingStructure={headingStructure}
        currentProductTitle={currentProductTitle}
      />
    </>
  );
};

export default HeadingStructureTab;
