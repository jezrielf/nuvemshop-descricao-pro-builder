
import React from 'react';
import { GalleryBlock, ColumnLayout } from '@/types/editor';
import { Image } from 'lucide-react';

interface GalleryPreviewProps {
  block: GalleryBlock;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ block }) => {
  const imageFitValue = block.style?.imageFit || 'contain';
  const imageObjectFit = imageFitValue === 'cover' ? 'object-cover' : 'object-contain';
  
  // Create proper Tailwind column classes based on block.columns
  const getColumnsClass = () => {
    const columns = block.columns;
    
    // Convert columns to a normalized form for comparison
    const columnsValue = typeof columns === 'string' && columns.includes('/') 
      ? columns 
      : typeof columns === 'number' || !isNaN(parseInt(columns as string, 10))
        ? Number(columns)
        : columns;
    
    if (columnsValue === 2 || columnsValue === '1/2') return 'md:grid-cols-2';
    if (columnsValue === 3 || columnsValue === '1/3') return 'md:grid-cols-3';
    if (columnsValue === 4 || columnsValue === '1/4') return 'md:grid-cols-4';
    return '';
  };
  
  return (
    <div className="w-full p-4">
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
