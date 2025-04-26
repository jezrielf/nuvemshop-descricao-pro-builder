
import { v4 as uuidv4 } from 'uuid';
import { Template, ProductCategory } from '@/types/editor';

// Create a default template for a given category
export const createDefaultTemplate = (category: ProductCategory): Template => {
  return {
    id: uuidv4(),
    name: `Novo Template - ${getCategoryName(category)}`,
    description: 'Template personalizado criado pelo usuário',
    category,
    blocks: [],
    thumbnailUrl: getDefaultThumbnailForCategory(category),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Helper function to get category name
export const getCategoryName = (category: ProductCategory): string => {
  const categoryMap: Partial<Record<ProductCategory, string>> = {
    'supplements': 'Suplementos',
    'clothing': 'Roupas',
    'accessories': 'Acessórios',
    'shoes': 'Calçados',
    'electronics': 'Eletrônicos',
    'energy': 'Energia',
    'Casa e decoração': 'Casa e Decoração',
    'other': 'Outros',
    'Alimentos': 'Alimentos',
    'Bebidas': 'Bebidas',
    'Beleza': 'Beleza e Cuidados Pessoais',
    'Casa': 'Casa',
    'Decoração': 'Decoração',
    'Eletrônicos': 'Eletrônicos',
    'Esporte': 'Esporte e Fitness',
    'Moda': 'Moda',
    'Saúde': 'Saúde e Bem-estar',
  };

  return categoryMap[category] || 'Categoria Desconhecida';
};

// Helper function to get default thumbnail for a category
export const getDefaultThumbnailForCategory = (category: ProductCategory): string => {
  const categoryThumbnails: Partial<Record<ProductCategory, string>> = {
    'supplements': '/templates/supplements.jpg',
    'clothing': '/templates/clothing.jpg',
    'electronics': '/templates/electronics.jpg',
    'Casa e decoração': '/templates/home.jpg',
    'Eletrônicos': '/templates/electronics.jpg',
    'Moda': '/templates/fashion.jpg'
  };

  return categoryThumbnails[category] || '/templates/default.jpg';
};
