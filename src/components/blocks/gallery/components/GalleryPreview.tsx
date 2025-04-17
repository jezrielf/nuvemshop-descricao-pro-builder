
import React from 'react';
import { GalleryBlock } from '@/types/editor';
import { Image } from 'lucide-react';

interface GalleryPreviewProps {
  block: GalleryBlock;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ block }) => {
  const imageFitValue = block.style?.imageFit || 'contain';
  const imageObjectFit = imageFitValue === 'cover' ? 'object-cover' : 'object-contain';
  
  // Convert columns to a normalized number
  const columnsValue = typeof block.columns === 'number' 
    ? block.columns 
    : typeof block.columns === 'string' && !isNaN(parseInt(block.columns, 10))
      ? parseInt(block.columns, 10)
      : 1;
  
  // Create proper Tailwind column classes based on normalized columns
  const getColumnsClass = () => {
    const columns = Math.min(Math.max(Number(columnsValue), 1), 4);
    
    switch(columns) {
      case 1: return '';
      case 2: return 'md:grid-cols-2';
      case 3: return 'md:grid-cols-3';
      case 4: return 'md:grid-cols-4';
      default: return '';
    }
  };
  
  return (
    <div className="w-full p-4">
      {block.heading && (
        <h2 className="text-2xl font-bold mb-4">{block.heading}</h2>
      )}
      <div className={`grid grid-cols-1 ${getColumnsClass()} gap-4`}>
        {block.images && block.images.map(image => (
          <figure key={image.id} className="text-center">
            {image.src ? (
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-auto ${imageObjectFit} rounded-md`}
              />
            ) : (
              <div className="bg-gray-100 aspect-video flex items-center justify-center rounded-md">
                <Image className="h-8 w-8 text-gray-400" />
              </div>
            )}
            {image.caption && (
              <figcaption className="mt-2 text-sm text-gray-600">{image.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
};

export default GalleryPreview;
