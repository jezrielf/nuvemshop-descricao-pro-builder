
import React from 'react';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';
import { BlockBase, BlockTypes, HeroBlock, ImageBlock, GalleryBlock, TextImageBlock, ImageTextBlock } from '@/types/editor';

interface ImageOptimizerProps {
  block: BlockBase;
  onUpdateImage: (blockId: string, imageType: string, newImageUrl: string) => void;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ block, onUpdateImage }) => {
  const handleOptimizeImage = (imageUrl: string, imageType: string) => {
    // In a real app, we would send this image URL to an optimization service
    // For now, we'll simulate optimization by adding a query parameter
    const optimizedUrl = `${imageUrl}?optimized=true&w=800&q=80`;
    onUpdateImage(block.id, imageType, optimizedUrl);
  };

  // Check if the block has images to optimize
  const hasImages = (): boolean => {
    switch (block.type) {
      case 'hero':
        return !!(block as HeroBlock).backgroundImage;
      case 'image':
        return !!(block as ImageBlock).src;
      case 'gallery':
        return (block as GalleryBlock).images && (block as GalleryBlock).images.length > 0;
      case 'image-text':
      case 'text-image':
        return !!(block as ImageTextBlock).src || !!(block as TextImageBlock).src;
      default:
        return false;
    }
  };

  const renderOptimizeButtons = () => {
    // If no images, don't render any buttons
    if (!hasImages()) return null;

    // Based on block type, render different optimize buttons
    switch (block.type) {
      case 'hero': {
        const heroBlock = block as HeroBlock;
        if (!heroBlock.backgroundImage) return null;

        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOptimizeImage(heroBlock.backgroundImage, 'backgroundImage')}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Otimizar Imagem de Fundo
          </Button>
        );
      }
      case 'image': {
        const imageBlock = block as ImageBlock;
        if (!imageBlock.src) return null;

        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOptimizeImage(imageBlock.src, 'src')}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Otimizar Imagem
          </Button>
        );
      }
      case 'gallery': {
        const galleryBlock = block as GalleryBlock;
        if (!galleryBlock.images || galleryBlock.images.length === 0) return null;

        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Optimize the first image as an example
              const firstImage = galleryBlock.images[0];
              if (firstImage && firstImage.src) {
                handleOptimizeImage(firstImage.src, `images[0].src`);
              }
            }}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Otimizar Primeira Imagem
          </Button>
        );
      }
      case 'image-text':
      case 'text-image': {
        const imageTextBlock = block as ImageTextBlock | TextImageBlock;
        if (!imageTextBlock.src) return null;
        
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOptimizeImage(imageTextBlock.src, 'src')}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Otimizar Imagem
          </Button>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Otimização de Imagem</h4>
      {renderOptimizeButtons()}
    </div>
  );
};

export default ImageOptimizer;
