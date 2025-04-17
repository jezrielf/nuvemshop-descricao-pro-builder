
import { useMemo } from 'react';
import { Template } from '@/types/editor';

export const useTemplateUtils = () => {
  // Category display names
  const categoryNames: Record<string, string> = {
    supplements: 'Suplementos',
    clothing: 'Roupas',
    accessories: 'Acessórios',
    shoes: 'Calçados',
    electronics: 'Eletrônicos',
    energy: 'Energéticos',
    other: 'Outros',
    'Casa e decoração': 'Casa e decoração'
  };
  
  // Check if template is advanced
  const isAdvancedTemplate = (id: string) => id.startsWith('adv-');
  
  // Generate template thumbnail
  const getTemplateThumbnail = (template: Template) => {
    const category = template.category;
    
    // Category-specific thumbnails
    if (category === 'supplements') {
      return 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd';
    } else if (category === 'clothing') {
      return 'https://images.unsplash.com/photo-1560243563-062bfc001d68';
    } else if (category === 'shoes') {
      return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff';
    } else if (category === 'electronics') {
      return 'https://images.unsplash.com/photo-1498049794561-7780e7231661';
    } else if (category === 'energy') {
      return 'https://images.unsplash.com/photo-1596803244618-8dbee441d70b';
    } else if (category === 'accessories') {
      return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30';
    } else if (category === 'Casa e decoração') {
      return 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92';
    } else {
      return 'https://images.unsplash.com/photo-1553531384-411a247cce73';
    }
  };

  return {
    categoryNames,
    isAdvancedTemplate,
    getTemplateThumbnail
  };
};

export default useTemplateUtils;
