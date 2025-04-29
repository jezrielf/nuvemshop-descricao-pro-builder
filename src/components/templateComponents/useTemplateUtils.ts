
import { Template } from '@/types/editor/base';

export const getTemplateThumbnail = (template: Template): string => {
  return template.thumbnail || '/images/template-placeholder.png';
};

export const isAdvancedTemplate = (templateId: string): boolean => {
  // List of template IDs that are considered "advanced"
  const advancedTemplateIds = [
    'water-filter',
    'water-filter-premium',
    'supplements-pro',
    'electronics-showcase',
    'fashion-premium'
  ];
  
  return advancedTemplateIds.includes(templateId);
};

export const getCategoryDisplayName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'general': 'Geral',
    'supplements': 'Suplementos',
    'electronics': 'Eletrônicos',
    'fashion': 'Moda',
    'shoes': 'Calçados',
    'accessories': 'Acessórios'
  };
  
  return categoryMap[category] || category;
};
