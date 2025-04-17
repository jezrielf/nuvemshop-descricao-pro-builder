
import { Template } from '@/types/editor';
import { basicTemplates } from './basic';
import { supplementsTemplates } from './supplements';
import { shoesTemplates } from './shoes';
import { electronicsTemplates } from './electronics';
import { healthTemplates } from './health';
import { fashionTemplates } from './fashion';
import { accessoriesTemplates } from './accessories';
import { hauteCoutureTemplates } from './hauteCouture';
import { homeDecorTemplates } from './home-decor';
import { clothingTemplates } from './clothing';
import { beautyTemplates } from './beauty';
import { fitnessTemplates } from './fitness';
import { beveragesTemplates } from './beverages';
import { waterPurifiersTemplates } from './water-purifiers';

// Advanced templates array
export const advancedTemplates: Template[] = [];

// Função principal para obter todos os templates
export const getAllTemplates = (): Template[] => {
  console.log("Obtendo todos os templates estáticos");
  
  // Arrays de templates a serem combinados
  const templateArrays = [
    basicTemplates,
    supplementsTemplates,
    shoesTemplates,
    electronicsTemplates,
    healthTemplates,
    fashionTemplates,
    accessoriesTemplates,
    hauteCoutureTemplates,
    homeDecorTemplates,
    clothingTemplates,
    beautyTemplates,
    fitnessTemplates,
    beveragesTemplates,
    waterPurifiersTemplates,
    advancedTemplates
  ];
  
  // Combine all templates, filtrando arrays vazios ou indefinidos
  const allTemplates = templateArrays
    .filter(arr => Array.isArray(arr) && arr.length > 0)
    .reduce((acc, curr) => [...acc, ...curr], []);
  
  // Certifique-se de que cada template tenha categoria e blocos válidos
  const validatedTemplates = allTemplates
    .filter(template => {
      // Verifica se o template é válido (tem id, nome e blocos)
      return template && 
             template.id && 
             template.name && 
             Array.isArray(template.blocks) && 
             template.blocks.length > 0;
    })
    .map(template => {
      // Adiciona categoria padrão se não existir
      if (!template.category) {
        return { ...template, category: 'other' };
      }
      
      // Certifica-se de que thumbnails inválidos são tratados
      if (!template.thumbnail || 
          template.thumbnail === '/placeholder.svg' || 
          !template.thumbnail.startsWith('http')) {
        return {
          ...template,
          thumbnail: getDefaultThumbnailForCategory(template.category)
        };
      }
      
      return template;
    });
  
  console.log(`getAllTemplates: Retornando ${validatedTemplates.length} templates válidos`);
  
  return validatedTemplates;
};

// Função auxiliar para obter thumbnails padrão por categoria
const getDefaultThumbnailForCategory = (category: string): string => {
  switch (category) {
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
    default:
      return 'https://images.unsplash.com/photo-1553531384-411a247cce73?q=80&w=500';
  }
};

// Exporta todos os módulos específicos de template
export * from './basic';
export * from './supplements';
export * from './shoes';
export * from './electronics';
export * from './health';
export * from './fashion';
export * from './accessories';
export * from './hauteCouture';
export * from './home-decor';
export * from './clothing';
export * from './beauty';
export * from './fitness';
export * from './beverages';
export * from './water-purifiers';
