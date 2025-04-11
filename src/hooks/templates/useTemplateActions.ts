
import { useCallback } from 'react';
import { Template } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';

interface TemplateStoreActions {
  storeCreateTemplate: (templateData: Omit<Template, "id">) => Template;
  storeUpdateTemplate: (id: string, templateData: Partial<Template>) => Template | null;
  storeDeleteTemplate: (id: string) => boolean;
}

export function useTemplateActions({ 
  storeCreateTemplate, 
  storeUpdateTemplate, 
  storeDeleteTemplate 
}: TemplateStoreActions) {
  const { toast } = useToast();

  const handleViewTemplate = useCallback((template: Template) => {
    return template;
  }, []);

  const handleCreateTemplate = useCallback((templateData: Omit<Template, "id">) => {
    try {
      const newTemplate = storeCreateTemplate(templateData);
      
      toast({
        title: "Template criado",
        description: `Template "${newTemplate.name}" foi criado com sucesso!`,
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao criar template:', error);
      toast({
        title: "Erro ao criar template",
        description: "Ocorreu um erro ao criar o template.",
        variant: "destructive",
      });
      return false;
    }
  }, [storeCreateTemplate, toast]);

  const handleUpdateTemplate = useCallback((templateData: Template) => {
    try {
      const updatedTemplate = storeUpdateTemplate(templateData.id, templateData);
      
      if (updatedTemplate) {
        toast({
          title: "Template atualizado",
          description: `Template "${updatedTemplate.name}" foi atualizado com sucesso!`,
        });
        return true;
      }
      
      throw new Error('Template não encontrado');
    } catch (error) {
      console.error('Erro ao atualizar template:', error);
      toast({
        title: "Erro ao atualizar template",
        description: "Ocorreu um erro ao atualizar o template.",
        variant: "destructive",
      });
      return false;
    }
  }, [storeUpdateTemplate, toast]);

  const handleDeleteTemplate = useCallback((template: Template) => {
    try {
      const success = storeDeleteTemplate(template.id);
      
      if (success) {
        toast({
          title: "Template excluído",
          description: `Template "${template.name}" foi excluído com sucesso!`,
        });
        return true;
      }
      
      throw new Error('Template não encontrado');
    } catch (error) {
      console.error('Erro ao excluir template:', error);
      toast({
        title: "Erro ao excluir template",
        description: "Ocorreu um erro ao excluir o template.",
        variant: "destructive",
      });
      return false;
    }
  }, [storeDeleteTemplate, toast]);

  return {
    handleViewTemplate,
    handleCreateTemplate,
    handleUpdateTemplate,
    handleDeleteTemplate
  };
}
