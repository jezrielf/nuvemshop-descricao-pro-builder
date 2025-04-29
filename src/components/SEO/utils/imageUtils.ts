
import { ProductDescription, Block } from '@/types/editor';

// Define interfaces needed for image-related blocks
interface ImageData {
  src: string;
  alt?: string;
}

interface BlockWithImage extends Block {
  image?: ImageData;
  images?: ImageData[];
  backgroundImage?: string;
  src?: string;
}

/**
 * Updates an image in a block
 */
export const updateBlockImage = (
  blockId: string, 
  imageType: string, 
  newImageUrl: string, 
  updateBlock: (id: string, updatedBlock: Partial<Block>) => void,
  description: ProductDescription | null
) => {
  if (!description || !blockId) return;
  
  const block = description.blocks.find(b => b.id === blockId) as BlockWithImage | undefined;
  if (!block) return;
  
  if (block.type === 'image' && imageType === 'src') {
    // Update image block
    updateBlock(blockId, { 
      src: newImageUrl 
    });
  } else if ((block.type === 'imageText' || block.type === 'textImage') && imageType === 'imageSrc') {
    // Update imageText or textImage block
    updateBlock(blockId, { 
      image: {
        ...(block.image || {}),
        src: newImageUrl 
      }
    });
  } else if (block.type === 'hero' && imageType === 'backgroundImage') {
    // Update hero block background
    updateBlock(blockId, { 
      backgroundImage: newImageUrl 
    });
  } else if (block.type === 'gallery') {
    // For gallery, we update the specific image in the images array
    const imageIndex = parseInt(imageType);
    if (!isNaN(imageIndex) && block.type === 'gallery' && block.images && block.images[imageIndex]) {
      const updatedImages = [...block.images];
      updatedImages[imageIndex] = {
        ...updatedImages[imageIndex],
        src: newImageUrl
      };
      
      updateBlock(blockId, {
        images: updatedImages
      });
    }
  }
};
