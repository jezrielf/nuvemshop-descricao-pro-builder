
import { ProductCategory, BlockType } from '@/types/editor';

// Helper function to get a human-readable category name
export const getCategoryName = (category: ProductCategory) => {
  const categoryNames: Record<ProductCategory, string> = {
    supplements: 'Suplementos',
    clothing: 'Vestuário',
    accessories: 'Acessórios',
    shoes: 'Calçados',
    electronics: 'Eletrônicos',
    energy: 'Energia',
    other: 'Outros'
  };
  
  return categoryNames[category] || category;
};

// Helper function to get a human-readable block type name
export const getBlockTypeName = (type: BlockType): string => {
  const typeNames: Record<BlockType, string> = {
    hero: 'Banner Principal',
    features: 'Características',
    benefits: 'Benefícios',
    specifications: 'Especificações',
    text: 'Texto',
    image: 'Imagem',
    gallery: 'Galeria',
    imageText: 'Imagem e Texto',
    textImage: 'Texto e Imagem',
    faq: 'Perguntas e Respostas',
    cta: 'Chamada para Ação',
    ai: 'Gerador de IA'
  };
  
  return typeNames[type] || type;
};

// Get all available product categories
export const getAllProductCategories = (): ProductCategory[] => {
  return [
    'supplements',
    'clothing',
    'accessories',
    'shoes',
    'electronics',
    'energy',
    'other'
  ];
};
