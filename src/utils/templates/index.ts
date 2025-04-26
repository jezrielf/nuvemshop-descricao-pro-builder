
import { Template } from '@/types/editor';
import { basicTemplates } from './basic';
import { supplementsTemplates } from './supplements';
import { shoesTemplates } from './shoes';
import { electronicsTemplates } from './electronics';
import { healthTemplates } from './health';
import { fashionTemplates } from './fashion';
import { accessoriesTemplates } from './accessories';
import { hauteCoutureTemplates } from './hauteCouture';
import { waterFilterTemplate } from './products/water-filter';
import { fixTemplateArray, fixTemplateProps } from './fixTemplateProps';

// Combining all templates and fixing properties
const fixedWaterFilterTemplate = fixTemplateProps(waterFilterTemplate);
const advancedTemplates: Template[] = [
  fixedWaterFilterTemplate,
  ...fixTemplateArray(supplementsTemplates),
  ...fixTemplateArray(shoesTemplates),
  ...fixTemplateArray(electronicsTemplates),
  ...fixTemplateArray(healthTemplates),
  ...fixTemplateArray(fashionTemplates),
  ...fixTemplateArray(accessoriesTemplates),
  ...fixTemplateArray(hauteCoutureTemplates)
];

export const getAllTemplates = (): Template[] => {
  return [...fixTemplateArray(basicTemplates), ...advancedTemplates];
};

export * from './basic';
export * from './supplements';
export * from './shoes';
export * from './electronics';
export * from './health';
export * from './fashion';
export * from './accessories';
export * from './hauteCouture';
