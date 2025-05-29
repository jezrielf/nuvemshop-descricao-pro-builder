
import React from 'react';
import { ImageBlock } from '@/types/editor';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface ImagePreviewProps {
  block: ImageBlock;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ block }) => {
  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto">
        {block.src ? (
          <>
            <OptimizedImage
              src={block.src}
              alt={block.alt || 'Imagem do produto'}
              preset="gallery"
              className="w-full h-auto rounded-md"
              loading="lazy"
            />
            {block.caption && (
              <p className="text-sm text-gray-500 text-center mt-2">{block.caption}</p>
            )}
          </>
        ) : (
          <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-400">Imagem</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
