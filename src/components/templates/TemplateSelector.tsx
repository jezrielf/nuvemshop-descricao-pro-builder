
import React, { useEffect, useState } from 'react';
import { useTemplateStore } from '@/store/templates';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Template as TemplateType } from '@/types/editor';
import CategoryFilter from './CategoryFilter';
import TemplateGrid from './TemplateGrid';
import useTemplateUtils from './useTemplateUtils';

const TemplateSelector: React.FC = () => {
  const { templates, categories, selectCategory, selectedCategory, loadTemplates } = useTemplateStore();
  const { loadTemplate } = useEditorStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { categoryNames, isAdvancedTemplate, getTemplateThumbnail } = useTemplateUtils();
  
  // Load templates when the component mounts or dialog opens
  useEffect(() => {
    const fetchTemplates = async () => {
      if (dialogOpen) {
        setIsLoading(true);
        try {
          await loadTemplates();
          console.log('Templates loaded in TemplateSelector, count:', templates.length);
        } catch (error) {
          console.error('Error loading templates in TemplateSelector:', error);
          toast({
            title: "Erro ao carregar templates",
            description: "Não foi possível carregar os templates. Tente novamente.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchTemplates();
  }, [dialogOpen, loadTemplates]);
  
  // Refresh templates manually
  const handleRefreshTemplates = async () => {
    setIsLoading(true);
    try {
      await loadTemplates();
      toast({
        title: "Templates atualizados",
        description: "Os templates foram atualizados com sucesso.",
      });
    } catch (error) {
      console.error('Error refreshing templates:', error);
      toast({
        title: "Erro ao atualizar templates",
        description: "Não foi possível atualizar os templates. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get all templates when selectedCategory is null
  const displayedTemplates = React.useMemo(() => {
    console.log('Displaying templates. Total available:', templates.length);
    return selectedCategory === null 
      ? templates  // Show all templates when no category is selected
      : templates.filter(template => template.category === selectedCategory);
  }, [templates, selectedCategory]);

  const handleSelectTemplate = (template: TemplateType) => {
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
        <Button variant="outline" className="w-full flex items-center justify-center">
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
              <div className="mt-2 text-yellow-600 text-sm">
                Nenhum template encontrado. Tente atualizar a lista de templates.
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col flex-grow h-full mt-4">
          <div className="flex items-center justify-between mb-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={selectCategory}
              categoryNames={categoryNames}
            />
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshTemplates}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
          
          <div className="overflow-y-auto flex-grow">
            <ScrollArea className="h-[calc(60vh-120px)] pr-4">
              <TemplateGrid
                templates={displayedTemplates}
                isLoading={isLoading}
                categoryNames={categoryNames}
                onSelectTemplate={handleSelectTemplate}
                getThumbnail={getTemplateThumbnail}
                isAdvancedTemplate={isAdvancedTemplate}
              />
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
