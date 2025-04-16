
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoveLeft, MoveRight, Trash2, Image } from 'lucide-react';
import ImageLibrary from '@/components/ImageLibrary/ImageLibrary';
import GalleryImageUpload from './GalleryImageUpload';

interface GalleryImageFormProps {
  image: {
    id: string;
    src: string;
    alt: string;
    caption?: string;
  };
  index: number;
  totalImages: number;
  imageObjectFit: string;
  uploading: { [key: string]: boolean };
  uploadProgress: { [key: string]: number };
  onUpdateImage: (imageId: string, field: 'src' | 'alt' | 'caption', value: string) => void;
  onRemoveImage: (imageId: string) => void;
  onMoveImage: (imageId: string, direction: 'left' | 'right') => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, imageId: string) => void;
  onSelectImageFromLibrary: (imageId: string, imageUrl: string, alt: string) => void;
}

const GalleryImageForm: React.FC<GalleryImageFormProps> = ({
  image,
  index,
  totalImages,
  imageObjectFit,
  uploading,
  uploadProgress,
  onUpdateImage,
  onRemoveImage,
  onMoveImage,
  onFileChange,
  onSelectImageFromLibrary
}) => {
  return (
    <div className="p-3 border rounded-md bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Imagem {index + 1}</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onMoveImage(image.id, 'left')}
            disabled={index === 0}
          >
            <MoveLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onMoveImage(image.id, 'right')}
            disabled={index === totalImages - 1}
          >
            <MoveRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveImage(image.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <GalleryImageUpload 
        image={image}
        uploading={uploading[image.id]}
        uploadProgress={uploadProgress[image.id] || 0}
        imageObjectFit={imageObjectFit}
        onUpdateImage={onUpdateImage}
        onFileChange={(e) => onFileChange(e, image.id)}
      />
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs mb-1">URL da Imagem</label>
          <div className="flex gap-2">
            <Input
              value={image.src}
              onChange={(e) => onUpdateImage(image.id, 'src', e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            <ImageLibrary 
              onSelectImage={(url, alt) => onSelectImageFromLibrary(image.id, url, alt)}
              trigger={
                <Button variant="outline" size="icon">
                  <Image className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs mb-1">Texto Alternativo</label>
          <Input
            value={image.alt}
            onChange={(e) => onUpdateImage(image.id, 'alt', e.target.value)}
            placeholder="Descrição da imagem"
          />
        </div>
        
        <div>
          <label className="block text-xs mb-1">Legenda (opcional)</label>
          <Input
            value={image.caption || ''}
            onChange={(e) => onUpdateImage(image.id, 'caption', e.target.value)}
            placeholder="Legenda da imagem"
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryImageForm;
