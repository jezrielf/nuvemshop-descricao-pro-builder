
import { useTemplateStore as useZustandTemplateStore } from '@/store/templates';
import { useEffect } from 'react';
import { Template } from '@/types/editor';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getAllTemplates } from '@/utils/templates';

export function useTemplateStore() {
  const {
    templates,
    loadTemplates: loadTemplatesFromStore,
    createTemplate: createTemplateInStore,
    updateTemplate: updateTemplateInStore,
    deleteTemplate: deleteTemplateFromStore,
    getTemplatesByCategory,
    searchTemplates
  } = useZustandTemplateStore();
  
  const { toast } = useToast();

  // Load templates with fallback to local templates
  const loadTemplates = async () => {
    try {
      console.log('Loading templates from database...');
      
      // First try to get templates from database
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.warn('Error loading templates from database:', error);
        // Use local templates as fallback
        const localTemplates = getAllTemplates();
        console.log(`Using ${localTemplates.length} local templates as fallback`);
        return localTemplates;
      }
      
      // If no data, use local templates
      if (!data || data.length === 0) {
        console.log('No templates found in database, using local templates');
        const localTemplates = getAllTemplates();
        console.log(`Loaded ${localTemplates.length} local templates as fallback`);
        return localTemplates;
      }
      
      console.log(`Successfully loaded ${data.length} templates from database`);
      return data as Template[];
    } catch (error) {
      console.error('Exception loading templates:', error);
      // Use local templates as fallback
      const localTemplates = getAllTemplates();
      console.log(`Using ${localTemplates.length} local templates due to exception`);
      return localTemplates;
    }
  };

  // Wrapper for creating a template with error handling
  const createTemplate = async (templateData: Omit<Template, "id">) => {
    try {
      console.log("Creating template:", templateData);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("No authenticated user found when creating template");
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar autenticado para criar templates",
          variant: "destructive"
        });
        return null;
      }
      
      const result = await createTemplateInStore({
        ...templateData,
        user_id: user.id
      });
      
      console.log("Template created with ID:", result.id);
      return result;
    } catch (error) {
      console.error("Error creating template:", error);
      toast({
        title: "Erro ao criar template",
        description: "Não foi possível criar o template. Por favor, tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

  // Wrapper for updating a template with error handling
  const updateTemplate = async (id: string, templateData: Partial<Template>) => {
    try {
      console.log("Updating template:", id, templateData);
      const result = await updateTemplateInStore(id, templateData);
      
      if (!result) {
        toast({
          title: "Erro ao atualizar template",
          description: "Template não encontrado ou erro ao atualizar.",
          variant: "destructive"
        });
        return null;
      }
      
      console.log("Template updated:", result);
      return result;
    } catch (error) {
      console.error("Error updating template:", error);
      toast({
        title: "Erro ao atualizar template",
        description: "Não foi possível atualizar o template. Por favor, tente novamente.",
        variant: "destructive"
      });
      return null;
    }
  };

  // Wrapper for deleting a template with error handling
  const deleteTemplate = async (id: string) => {
    try {
      console.log("Deleting template:", id);
      const result = await deleteTemplateFromStore(id);
      
      if (!result) {
        toast({
          title: "Erro ao excluir template",
          description: "Template não encontrado ou erro ao excluir.",
          variant: "destructive"
        });
        return false;
      }
      
      console.log("Template deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting template:", error);
      toast({
        title: "Erro ao excluir template",
        description: "Não foi possível excluir o template. Por favor, tente novamente.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    templates,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplatesByCategory,
    searchTemplates
  };
}
