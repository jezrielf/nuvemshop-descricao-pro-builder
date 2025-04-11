
import { useTemplateStore as useZustandTemplateStore } from '@/store/templateStore';

export function useTemplateStore() {
  const {
    templates,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate
  } = useZustandTemplateStore();

  return {
    templates,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate
  };
}
