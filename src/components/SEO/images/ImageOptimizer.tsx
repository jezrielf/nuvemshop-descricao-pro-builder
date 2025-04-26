
import React from 'react';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';
import { BlockBase, BlockType, HeroBlock, ImageBlock, GalleryBlock, ImageTextBlock, TextImageBlock } from '@/types/editor';

interface ImageOptimizerProps {
  block: BlockBase;
  onUpdateImage: (blockId: string, imageType: string, newImageUrl: string) => void;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ block, onUpdateImage }) => {
  // Helper function to check if a block has images
  const blockHasImages = (block: BlockBase): boolean => {
    if (!block) return false;

    switch (block.type) {
      case 'hero':
        return !!(block as HeroBlock).image?.src;
      case 'image':
        return !!(block as ImageBlock).src;
      case 'gallery':
        return (block as GalleryBlock).images && (block as GalleryBlock).images.length > 0;
      case 'imageText':
        return !!(block as ImageTextBlock).image?.src;
      case 'textImage':
        return !!(block as TextImageBlock).image?.src;
      default:
        return false;
    }
  };

  // Get image URL based on block type
  const getImageUrl = (block: BlockBase): string => {
    if (!block) return '';

    switch (block.type) {
      case 'hero':
        return (block as HeroBlock).image?.src || '';
      case 'image':
        return (block as ImageBlock).src || '';
      case 'gallery':
        return (block as GalleryBlock).images?.[0]?.src || '';
      case 'imageText':
        return (block as ImageTextBlock).image?.src || '';
      case 'textImage':
        return (block as TextImageBlock).image?.src || '';
      default:
        return '';
    }
  };

  // Get image type for the update function
  const getImageType = (block: BlockBase): string => {
    if (!block) return '';

    switch (block.type) {
      case 'hero':
        return 'image.src';
      case 'image':
        return 'src';
      case 'gallery':
        return 'images[0].src';
      case 'imageText':
        return 'image.src';
      case 'textImage':
        return 'image.src';
      default:
        return '';
    }
  };

  // Check if the block has images to optimize
  if (!blockHasImages(block)) {
    return null;
  }

  const handleOptimizeImage = () => {
    const imageUrl = getImageUrl(block);
    const imageType = getImageType(block);
    
    // For now, just apply a simple optimization (add a parameter to the URL)
    // In a real application, you would call an optimization service
    const optimizedUrl = `${imageUrl}?optimized=true`;
    
    onUpdateImage(block.id, imageType, optimizedUrl);
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleOptimizeImage}
      className="flex items-center gap-1"
    >
      <ImageIcon className="h-3 w-3" />
      <span className="text-xs">Otimizar Imagem</span>
    </Button>
  );
};

export default ImageOptimizer;
