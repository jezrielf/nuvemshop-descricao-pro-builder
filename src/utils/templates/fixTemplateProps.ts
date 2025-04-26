
import { Template } from '@/types/editor';

export const fixTemplateProps = (template: any): Template => {
  const fixed = { ...template };
  
  // Fix thumbnail -> thumbnailUrl
  if ('thumbnail' in fixed && !('thumbnailUrl' in fixed)) {
    fixed.thumbnailUrl = fixed.thumbnail;
    delete fixed.thumbnail;
  }
  
  // Ensure other required properties
  if (!fixed.description) fixed.description = '';
  if (!fixed.thumbnailUrl) fixed.thumbnailUrl = '/templates/default.jpg';
  if (!fixed.createdAt) fixed.createdAt = new Date().toISOString();
  if (!fixed.updatedAt) fixed.updatedAt = new Date().toISOString();
  
  return fixed as Template;
};

export const fixTemplateArray = (templates: any[]): Template[] => {
  return templates.map(fixTemplateProps);
};
