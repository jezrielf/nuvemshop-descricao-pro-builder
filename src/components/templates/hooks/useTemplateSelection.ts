
import { useState, useCallback, useEffect } from 'react';
import { useTemplateStore } from '@/store/templates';
import { Template } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';

export const useTemplateSelection = () => {
  const { templates, categories, selectCategory, selectedCategory, loadTemplates } = useTemplateStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Reusable function to load templates
  const fetchTemplates = useCallback(async (showToast = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Iniciando carregamento de templates');
      const loadedTemplates = await loadTemplates();
      console.log(`${loadedTemplates.length} templates carregados`);
      
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

  // Carrega os templates quando o diálogo é aberto
  useEffect(() => {
    if (dialogOpen) {
      fetchTemplates();
    }
  }, [dialogOpen, fetchTemplates]);

  // Function to manually refresh templates
  const handleRefreshTemplates = () => {
    fetchTemplates(true); // true to show toast
  };

  // Get all templates when selectedCategory is null
  const displayedTemplates = selectedCategory === null 
    ? templates
    : templates.filter(template => template.category === selectedCategory);

  const handleSelectTemplate = (template: Template) => {
    return template;
  };

  const openTemplateDialog = () => {
    setDialogOpen(true);
    fetchTemplates();
  };

  const closeTemplateDialog = () => {
    setDialogOpen(false);
  };

  return {
    templates,
    displayedTemplates,
    categories,
    selectedCategory,
    selectCategory,
    fetchTemplates,
    handleRefreshTemplates,
    isLoading,
    error,
    dialogOpen,
    openTemplateDialog,
    closeTemplateDialog,
    handleSelectTemplate
  };
};
