
import { useTemplateStore as useZustandTemplateStore } from '@/store/templateStore';
import { useEffect } from 'react';
import { Template } from '@/types/editor';

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

  // Carrega os templates quando o hook for montado
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  // Wrapper para criar um template com log
  const createTemplateWithLog = async (templateData: Omit<Template, "id">) => {
    console.log("Creating template:", templateData);
    const result = await createTemplate(templateData);
    console.log("Template created with ID:", result.id);
    return result;
  };

  // Wrapper para atualizar um template com log
  const updateTemplateWithLog = async (id: string, templateData: Partial<Template>) => {
    console.log("Updating template:", id, templateData);
    const result = await updateTemplate(id, templateData);
    console.log("Template updated:", result);
    return result;
  };

  return {
    templates,
    loadTemplates,
    createTemplate: createTemplateWithLog,
    updateTemplate: updateTemplateWithLog,
    deleteTemplate,
    getTemplatesByCategory,
    searchTemplates
  };
}
