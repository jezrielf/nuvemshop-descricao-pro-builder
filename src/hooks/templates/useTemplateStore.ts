
import { useTemplateStore as useZustandTemplateStore } from '@/store/templates';
import { useEffect } from 'react';
import { Template } from '@/types/editor';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useTemplateStore() {
  const {
    templates,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplatesByCategory,
    searchTemplates
  } = useZustandTemplateStore();
  
  const { toast } = useToast();

  // Wrapper para criar um template com log e tratamento de erro
  const createTemplateWithLog = async (templateData: Omit<Template, "id">) => {
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
      
      const result = await createTemplate({
        ...templateData,
        // Ensure user_id is explicitly set
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

  // Wrapper para atualizar um template com log e tratamento de erro
  const updateTemplateWithLog = async (id: string, templateData: Partial<Template>) => {
    try {
      console.log("Updating template:", id, templateData);
      const result = await updateTemplate(id, templateData);
      
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

  // Wrapper para deletar um template com log e tratamento de erro
  const deleteTemplateWithLog = async (id: string) => {
    try {
      console.log("Deleting template:", id);
      const result = await deleteTemplate(id);
      
      if (!result) {
        toast({
          title: "Erro ao excluir template",
          description: "Template não encontrado ou erro ao excluir.",
          variant: "destructive"
        });
        return false;
      }
      
      console.log("Template deleted successfully");
      toast({
        title: "Template excluído",
        description: "O template foi excluído com sucesso.",
      });
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
    createTemplate: createTemplateWithLog,
    updateTemplate: updateTemplateWithLog,
    deleteTemplate: deleteTemplateWithLog,
    getTemplatesByCategory,
    searchTemplates
  };
}
