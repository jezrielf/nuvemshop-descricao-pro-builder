
import { ImageTextBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { getRandomImage } from '../helpers';

export const generateImageTextBlock = (
  productName: string,
  mainFeatures: string,
  imageUrl: string | undefined,
  modelImageUrl: string | undefined,
  hasModelImage: boolean
): ImageTextBlock => {
  const imageTextBlock = createBlock('imageText', 2) as ImageTextBlock;
  imageTextBlock.visible = true;
  imageTextBlock.title = 'Imagem e Texto';
  imageTextBlock.heading = 'Qualidade Excepcional';
  imageTextBlock.content = `${productName} foi desenvolvido para atender às necessidades do seu público-alvo. ${mainFeatures.split('.')[0]}.`;
  
  // Priorizar a imagem do produto, depois a imagem modelo
  if (imageUrl) {
    imageTextBlock.image = {
      src: imageUrl,
      alt: productName
    };
  } else if (modelImageUrl) {
    imageTextBlock.image = {
      src: modelImageUrl,
      alt: `Inspiração para ${productName}`
    };
  } else {
    // If no image was uploaded, use a placeholder
    imageTextBlock.image = {
      src: getRandomImage(),
      alt: productName
    };
  }
  
  imageTextBlock.style = {
    backgroundColor: hasModelImage ? '#ffffff' : '#ffffff',
    padding: 'md' as any,
    blockSpacing: 'md' as any
  };
  
  return imageTextBlock;
};
