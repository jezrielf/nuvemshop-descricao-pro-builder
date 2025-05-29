
import React from 'react';
import { GalleryBlock } from '@/types/editor';
import { Image } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface GalleryPreviewProps {
  block: GalleryBlock;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ block }) => {
  const imageFitValue = block.style?.imageFit || 'contain';
  const imageObjectFit = imageFitValue === 'cover' ? 'object-cover' : 'object-contain';
  
  // Create proper Tailwind column classes based on block.columns
  const getColumnsClass = () => {
    // Convert columns from ColumnLayout to a number for grid display
    if (typeof block.columns === 'number') {
      const cols = Math.min(Math.max(block.columns, 1), 4);
      return `md:grid-cols-${cols}`;
    }
    
    // Handle string-based column layouts
    switch(block.columns) {
      case 'full': return ''; // Single column
      case '1/2': return 'md:grid-cols-2';
      case '1/3': return 'md:grid-cols-3';
      case '2/3': return 'md:grid-cols-2';
      case '1/4': return 'md:grid-cols-4';
      case '3/4': return 'md:grid-cols-1';
      default: return ''; // Default to single column
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
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                preset="gallery"
                className={`w-full h-auto rounded-md ${imageObjectFit}`}
                loading="lazy"
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
