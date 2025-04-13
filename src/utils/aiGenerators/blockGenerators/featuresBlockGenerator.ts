
import { v4 as uuidv4 } from 'uuid';
import { FeaturesBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { extractKeyPoints } from '../helpers';

export const generateFeaturesBlock = (
  mainFeatures: string,
  hasModelImage: boolean,
  layoutStyle: any
): FeaturesBlock => {
  const featurePoints = extractKeyPoints(mainFeatures);
  
  if (featurePoints.length === 0) {
    return null;
  }
  
  const featuresBlock = createBlock('features', 3) as FeaturesBlock;
  featuresBlock.visible = true;
  featuresBlock.title = 'Recursos do Produto';
  featuresBlock.heading = 'Principais Recursos';
  featuresBlock.features = featurePoints.map((point, index) => ({
    id: uuidv4(),
    title: `Recurso ${index + 1}`,
    description: point,
    icon: hasModelImage ? '🔥' : '✨' // Icone diferente para mostrar influência da imagem modelo
  }));
  
  featuresBlock.style = {
    backgroundColor: hasModelImage ? '#f8fafc' : '#ffffff',
    padding: 'md' as any,
    blockSpacing: 'md' as any
  };
  
  return featuresBlock;
};
