
import { useTemplateStore as useZustandTemplateStore } from '@/store/templateStore';

export function useTemplateStore() {
  const {
    templates,
    loadTemplates,
    createTemplate: storeCreateTemplate,
    updateTemplate: storeUpdateTemplate,
    deleteTemplate: storeDeleteTemplate
  } = useZustandTemplateStore();

  return {
    templates,
    loadTemplates,
    storeCreateTemplate,
    storeUpdateTemplate,
    storeDeleteTemplate
  };
}
