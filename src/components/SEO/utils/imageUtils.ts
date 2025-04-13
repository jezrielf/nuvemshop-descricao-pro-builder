
import { Block, ProductDescription } from '@/types/editor';

export const updateBlockImage = (
  blockId: string, 
  imageType: string, 
  newImageUrl: string, 
  updateBlock: (id: string, data: Partial<Block>) => void,
  description: ProductDescription | null
) => {
  if (!blockId || !description) return;
  
  const block = description.blocks.find(b => b.id === blockId);
  if (!block) return;
  
  // Handle different image types based on the block type
  if (imageType === 'src' && block.type === 'image') {
    updateBlock(blockId, { src: newImageUrl });
  } 
  else if (imageType === 'image' && 
           (block.type === 'hero' || block.type === 'imageText' || block.type === 'textImage')) {
    if ('image' in block && block.image) {
      updateBlock(blockId, { 
        image: { ...block.image, src: newImageUrl }
      });
    }
  }
  else if (imageType.startsWith('gallery-') && block.type === 'gallery' && 'images' in block && block.images) {
    const index = parseInt(imageType.split('-')[1]);
    if (isNaN(index) || index < 0 || index >= block.images.length) return;
    
    const newImages = [...block.images];
    newImages[index] = { ...newImages[index], src: newImageUrl };
    
    updateBlock(blockId, { images: newImages });
  }
};

export const extractImagesFromDescription = (description: ProductDescription | null): {
  blockId: string; 
  type: string; 
  url: string; 
  alt: string; 
  title: string
}[] => {
  if (!description) return [];
  
  const images: {blockId: string; type: string; url: string; alt: string; title: string}[] = [];
  
  description.blocks.forEach(block => {
    if (block.type === 'image' && 'src' in block && block.src) {
      images.push({
        blockId: block.id,
        type: 'src',
        url: block.src,
        alt: 'alt' in block ? block.alt || '' : '',
        title: 'title' in block ? block.title : ''
      });
    } 
    else if (block.type === 'hero' && 'image' in block && block.image?.src) {
      images.push({
        blockId: block.id,
        type: 'image',
        url: block.image.src,
        alt: block.image.alt || '',
        title: 'title' in block ? block.title : ''
      });
    }
    else if ((block.type === 'imageText' || block.type === 'textImage') && 
             'image' in block && block.image?.src) {
      images.push({
        blockId: block.id,
        type: 'image',
        url: block.image.src,
        alt: block.image.alt || '',
        title: 'title' in block ? block.title : ''
      });
    }
    else if (block.type === 'gallery' && 'images' in block && block.images) {
      block.images.forEach((img, index) => {
        if (img.src) {
          images.push({
            blockId: block.id,
            type: `gallery-${index}`,
            url: img.src,
            alt: img.alt || '',
            title: `${'title' in block ? block.title : ''} - Imagem ${index + 1}`
          });
        }
      });
    }
  });
  
  return images;
};
