
import React, { useEffect } from 'react';
import { useTemplateStore } from '@/store/templates';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Template } from '@/types/editor';

// Import refactored components
import CategoryFilter from './templates/CategoryFilter';
import TemplateGrid from './templates/TemplateGrid';
import RefreshButton from './templates/RefreshButton';
import { categoryNames, getTemplateThumbnail, isAdvancedTemplate } from './templates/utils';

const TemplateSelector: React.FC = () => {
  const { templates, categories, selectCategory, selectedCategory, loadTemplates } = useTemplateStore();
  const { loadTemplate } = useEditorStore();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();
  
  // Reusable function to load templates
  const fetchTemplates = React.useCallback(async (showToast = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Iniciando carregamento de templates no TemplateSelector');
      const loadedTemplates = await loadTemplates();
      console.log(`TemplateSelector: ${loadedTemplates.length} templates carregados`);
      
      if (loadedTemplates.length === 0) {
        setError("Nenhum template disponível. Tente atualizar ou contate o suporte.");
        
        if (showToast) {
          toast({
            title: "Aviso",
            description: "Nenhum template disponível. Tente atualizar novamente.",
            variant: "destructive",
          });
        }
      } else if (showToast) {
        toast({
          title: "Templates atualizados",
          description: `${loadedTemplates.length} templates disponíveis`,
        });
      }
    } catch (err) {
      console.error('Erro ao carregar templates:', err);
      setError("Erro ao carregar templates. Tente novamente ou verifique sua conexão.");
      
      if (showToast) {
        toast({
          title: "Erro ao carregar templates",
          description: "Não foi possível atualizar os templates. Tente novamente.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [loadTemplates, toast]);
  
  // Load templates when component mounts and when dialog opens
  useEffect(() => {
    // When dialog is opened, reload the templates
    if (dialogOpen) {
      fetchTemplates();
    }
  }, [dialogOpen, fetchTemplates]);
  
  // Load templates immediately on component mount
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);
  
  // Function to manually refresh templates
  const handleRefreshTemplates = () => {
    fetchTemplates(true); // true to show toast
  };
  
  // Get all templates when selectedCategory is null
  const displayedTemplates = React.useMemo(() => {
    console.log('Exibindo templates. Total disponível:', templates.length);
    return selectedCategory === null 
      ? templates
      : templates.filter(template => template.category === selectedCategory);
  }, [templates, selectedCategory]);

  const handleSelectTemplate = (template: Template) => {
    loadTemplate(template);
    setDialogOpen(false);
    
    toast({
      title: "Template aplicado",
      description: `O template "${template.name}" foi aplicado com sucesso.`,
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center"
          onClick={() => {
            // Load templates when dialog opens
            if (!dialogOpen) {
              fetchTemplates();
            }
          }}
        >
          <FileText className="mr-2 h-5 w-5" />
          Usar Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Escolha um Template</DialogTitle>
          <DialogDescription>
            Selecione um template para iniciar rapidamente sua descrição de produto.
            {templates.length === 0 && !isLoading && (
              <div className="mt-2 text-yellow-600 text-sm flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {error || "Nenhum template encontrado. Tente atualizar a lista de templates."}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col flex-grow h-full mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={selectCategory}
                categoryNames={categoryNames}
              />
            </div>
            
            <RefreshButton 
              onRefresh={handleRefreshTemplates}
              isLoading={isLoading}
            />
          </div>
          
          <div className="overflow-y-auto flex-grow">
            <TemplateGrid 
              templates={displayedTemplates}
              isLoading={isLoading}
              error={error}
              onRefresh={handleRefreshTemplates}
              onSelectTemplate={handleSelectTemplate}
              categoryNames={categoryNames}
              getTemplateThumbnail={getTemplateThumbnail}
              isAdvancedTemplate={isAdvancedTemplate}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
