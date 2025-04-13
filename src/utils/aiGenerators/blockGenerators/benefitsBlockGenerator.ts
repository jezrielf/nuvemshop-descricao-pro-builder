
import { v4 as uuidv4 } from 'uuid';
import { BenefitsBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { extractKeyPoints } from '../helpers';

export const generateBenefitsBlock = (
  targetAudience: string,
  mainFeatures: string,
  hasModelImage: boolean
): BenefitsBlock => {
  const benefitPoints = extractKeyPoints(targetAudience + '. ' + mainFeatures);
  
  if (benefitPoints.length === 0) {
    return null;
  }
  
  const benefitsBlock = createBlock('benefits', 2) as BenefitsBlock;
  benefitsBlock.visible = true;
  benefitsBlock.title = 'Benefícios';
  benefitsBlock.heading = 'Benefícios para Você';
  benefitsBlock.benefits = benefitPoints.slice(0, 4).map((point, index) => ({
    id: uuidv4(),
    title: `Benefício ${index + 1}`,
    description: point,
    icon: hasModelImage ? '💎' : '🌟' // Icone diferente para mostrar influência da imagem modelo
  }));
  
  benefitsBlock.style = {
    backgroundColor: hasModelImage ? '#f1f5f9' : '#f3f4f6',
    padding: 'md' as any,
    blockSpacing: 'md' as any
  };
  
  return benefitsBlock;
};
