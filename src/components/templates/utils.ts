import { Template, ProductCategory } from '@/types/editor';

// Category name mapping
export const categoryNames: Record<string, string> = {
  supplements: 'Suplementos',
  clothing: 'Roupas',
  accessories: 'Acessórios',
  shoes: 'Calçados',
  electronics: 'Eletrônicos',
  energy: 'Energéticos',
  beauty: 'Beleza',
  fitness: 'Fitness',
  fashion: 'Moda',
  'home-decor': 'Casa e decoração',
  other: 'Outros'
};

// Check if template thumbnail is valid
export const isValidThumbnail = (url: string | undefined): boolean => {
  return !!url && url !== '/placeholder.svg' && url.startsWith('http');
};

// Check if it's an advanced template by ID
export const isAdvancedTemplate = (id: string): boolean => id.startsWith('adv-');

// Get template thumbnail based on template or category
export const getTemplateThumbnail = (template: Template): string => {
  // If the template already has a valid thumbnail, use it
  if (isValidThumbnail(template.thumbnail)) {
    return template.thumbnail;
  }
  
  // Otherwise, use a thumbnail based on the category
  const category = template.category;
  
  // Custom thumbnails by category
  switch(category) {
    case 'supplements':
      return 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=500';
    case 'clothing':
      return 'https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=500';
    case 'shoes':
      return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500';
    case 'electronics':
      return 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500';
    case 'energy':
      return 'https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=500';
    case 'accessories':
      return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500';
    case 'home-decor':
      return 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=500';
    case 'beauty':
      return 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500';
    case 'fitness':
      return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500';
    case 'fashion':
      return 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500';
    case 'other':
      return 'https://images.unsplash.com/photo-1553531384-411a247cce73?q=80&w=500';
    default:
      return 'https://images.unsplash.com/photo-1553531384-411a247cce73?q=80&w=500';
  }
};
