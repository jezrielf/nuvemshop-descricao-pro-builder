
import React, { useState } from 'react';
import { FileEdit, Info } from 'lucide-react';
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
import { HeadingStructureTabProps, HeadingSuggestion } from '../../types/headingTypes';
import { calculateHeadingScore, getImprovementSuggestions, generateHeadingSuggestions } from '../../utils/headingUtils';

export const HeadingStructureTab: React.FC<HeadingStructureTabProps> = ({ 
  headingStructure, 
  currentProductTitle,
  productId,
  onUpdateHeadings
}) => {
  const [isHeadingDialogOpen, setIsHeadingDialogOpen] = useState(false);
  const [suggestedHeadings, setSuggestedHeadings] = useState<HeadingSuggestion[]>([]);
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
              <HeadingsList headingStructure={headingStructure} />
              
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
      />
    </>
  );
};

export default HeadingStructureTab;
