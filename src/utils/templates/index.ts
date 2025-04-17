
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

// Empty advanced templates array
export const advancedTemplates: Template[] = [];

export const getAllTemplates = (): Template[] => {
  return [];
};

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
