
import React, { useState } from 'react';
import { FileEdit, Info, Wand2 } from 'lucide-react';
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
import { HeadingStructureTabProps, HeadingSuggestion } from '../../types/headingTypes';
import { calculateHeadingScore, getImprovementSuggestions, generateHeadingSuggestions } from '../../utils/headingUtils';
import { useHeadingAutoCorrect } from '../../hooks/useHeadingAutoCorrect';

export const HeadingStructureTab: React.FC<HeadingStructureTabProps> = ({ 
  headingStructure, 
  currentProductTitle,
  productId,
  onUpdateHeadings
}) => {
  const [isHeadingDialogOpen, setIsHeadingDialogOpen] = useState(false);
  const [isAutoCorrectDialogOpen, setIsAutoCorrectDialogOpen] = useState(false);
  const [suggestedHeadings, setSuggestedHeadings] = useState<HeadingSuggestion[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { success: isNuvemshopConnected } = useNuvemshopAuth();
  const { 
    isProcessingAutoCorrect, 
    applyAutomaticCorrection 
  } = useHeadingAutoCorrect(headingStructure, currentProductTitle, productId, onUpdateHeadings);
  
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
    </>
  );
};

export default HeadingStructureTab;
