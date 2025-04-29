
import { ProductDescription, Block } from '@/types/editor';

/**
 * Updates an image in a block
 */
export const updateBlockImage = (
  blockId: string, 
  imageType: string, 
  newImageUrl: string, 
  updateBlock: (id: string, updatedBlock: Block) => void,
  description: ProductDescription | null
) => {
  if (!description || !blockId) return;
  
  const block = description.blocks.find(b => b.id === blockId);
  if (!block) return;
  
  if (block.type === 'image' && imageType === 'src') {
    // Update image block
    updateBlock(blockId, { 
      ...block,
      src: newImageUrl 
    });
  } else if ((block.type === 'imageText' || block.type === 'textImage') && imageType === 'imageSrc') {
    // Update imageText or textImage block
    updateBlock(blockId, { 
      ...block,
      imageSrc: newImageUrl 
    });
  } else if (block.type === 'hero' && imageType === 'backgroundImage') {
    // Update hero block background
    updateBlock(blockId, { 
      ...block,
      backgroundImage: newImageUrl 
    });
  } else if (block.type === 'gallery') {
    // For gallery, we update the specific image in the images array
    const imageIndex = parseInt(imageType);
    if (!isNaN(imageIndex) && block.images && block.images[imageIndex]) {
      const updatedImages = [...block.images];
      updatedImages[imageIndex].src = newImageUrl;
      
      updateBlock(blockId, {
        ...block,
        images: updatedImages
      });
    }
  }
};
