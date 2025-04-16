
import React from 'react';
import { GalleryBlock } from '@/types/editor';
import { Image } from 'lucide-react';

interface GalleryPreviewProps {
  block: GalleryBlock;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ block }) => {
  const imageFitValue = block.style?.imageFit || 'contain';
  const imageObjectFit = imageFitValue === 'cover' ? 'object-cover' : 'object-contain';
  
  return (
    <div className="w-full p-4">
      <div className={`grid grid-cols-1 gap-4 ${block.columns > 1 ? `md:grid-cols-${block.columns}` : ''}`}>
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
