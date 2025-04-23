
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, X } from 'lucide-react';

interface ImageUploadPreviewProps {
  src: string;
  alt: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({
  src,
  alt,
  onEdit,
  onRemove
}) => {
  return (
    <div className="relative group">
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
        <Button 
          size="sm" 
          variant="secondary"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button 
          size="sm" 
          variant="destructive"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
