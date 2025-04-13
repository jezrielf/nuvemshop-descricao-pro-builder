
import { v4 as uuidv4 } from 'uuid';
import { GalleryBlock } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { getRandomImage } from '../helpers';

export const generateGalleryBlock = (
  productName: string,
  imageUrl: string | undefined,
  modelImageUrl: string | undefined,
  hasModelImage: boolean
): GalleryBlock => {
  const galleryBlock = createBlock('gallery', 3) as GalleryBlock;
  galleryBlock.visible = true;
  galleryBlock.title = 'Galeria do Produto';
  
  // Se temos imagens enviadas, incluímos na galeria junto com placeholders
  const galleryImages = [];
  
  if (imageUrl) {
    galleryImages.push({
      id: uuidv4(),
      src: imageUrl,
      alt: `${productName} - Imagem Principal`,
      caption: `${productName}`
    });
  }
  
  if (modelImageUrl && modelImageUrl !== imageUrl) {
    galleryImages.push({
      id: uuidv4(),
      src: modelImageUrl,
      alt: `${productName} - Referência de Design`,
      caption: `Estilo de Referência para ${productName}`
    });
  }
  
  // Adicionar algumas imagens placeholder para completar a galeria
  const placeholdersNeeded = Math.max(0, 3 - galleryImages.length);
  for (let i = 0; i < placeholdersNeeded; i++) {
    galleryImages.push({
      id: uuidv4(),
      src: getRandomImage(),
      alt: `${productName} - Imagem ${i + 1}`,
      caption: `Detalhe do produto ${i + 1}`
    });
  }
  
  galleryBlock.images = galleryImages;
  galleryBlock.style = {
    backgroundColor: hasModelImage ? '#ffffff' : '#ffffff',
    padding: 'md' as any,
    blockSpacing: 'md' as any
  };
  
  return galleryBlock;
};
