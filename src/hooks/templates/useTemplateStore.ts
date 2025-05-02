
import { useTemplateStore as useZustandTemplateStore } from '@/store/templates';
import { useEffect, useState } from 'react';
import { Template } from '@/types/editor';
import { useToast } from '../use-toast';
import { useAuth } from '@/contexts/AuthContext';

export function useTemplateStore() {
  const [initialized, setInitialized] = useState(false);
  const {
    templates,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplatesByCategory,
    searchTemplates,
    categories
  } = useZustandTemplateStore();
  
  const { toast } = useToast();
  const { user } = useAuth();

  // Carrega os templates quando o hook for montado
  useEffect(() => {
    if (!initialized) {
      console.log('useTemplateStore - Initializing and loading templates on mount');
      loadTemplates()
        .then(loadedTemplates => {
          console.log(`useTemplateStore - ${loadedTemplates.length} templates loaded successfully`);
          setInitialized(true);
        })
        .catch(error => {
          console.error('useTemplateStore - Error loading templates on mount:', error);
          toast({
            title: 'Erro ao carregar templates',
            description: 'Ocorreu um erro ao carregar os templates. Tente novamente mais tarde.',
            variant: 'destructive',
          });
          setInitialized(true);
        });
    }
  }, [loadTemplates, initialized, toast]);

  // Check authentication before performing operations
  const checkAuthentication = () => {
    if (!user) {
      console.error('User not authenticated');
      toast({
        title: 'Não autenticado',
        description: 'Você precisa estar autenticado para realizar esta operação.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  // Wrapper para criar um template com log
  const createTemplateWithAuth = async (templateData: Omit<Template, "id">) => {
    if (!checkAuthentication()) {
      throw new Error('User not authenticated');
    }
    
    console.log("Creating template:", templateData);
    try {
      const result = await createTemplate(templateData);
      console.log("Template created with ID:", result.id);
      return result;
    } catch (error: any) {
      console.error("Error creating template:", error);
      toast({
        title: 'Erro ao criar template',
        description: error.message || 'Ocorreu um erro ao criar o template.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Wrapper para atualizar um template com log
  const updateTemplateWithAuth = async (id: string, templateData: Partial<Template>) => {
    if (!checkAuthentication()) {
      throw new Error('User not authenticated');
    }
    
    console.log("Updating template:", id, templateData);
    try {
      const result = await updateTemplate(id, templateData);
      console.log("Template updated:", result);
      return result;
    } catch (error: any) {
      console.error("Error updating template:", error);
      toast({
        title: 'Erro ao atualizar template',
        description: error.message || 'Ocorreu um erro ao atualizar o template.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Wrapper para deletar um template com log
  const deleteTemplateWithAuth = async (id: string) => {
    if (!checkAuthentication()) {
      throw new Error('User not authenticated');
    }
    
    console.log("Deleting template:", id);
    try {
      const result = await deleteTemplate(id);
      console.log("Template deleted result:", result);
      return result;
    } catch (error: any) {
      console.error("Error deleting template:", error);
      toast({
        title: 'Erro ao deletar template',
        description: error.message || 'Ocorreu um erro ao deletar o template.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    templates,
    categories,
    loadTemplates,
    createTemplate: createTemplateWithAuth,
    updateTemplate: updateTemplateWithAuth,
    deleteTemplate: deleteTemplateWithAuth,
    getTemplatesByCategory,
    searchTemplates
  };
}
