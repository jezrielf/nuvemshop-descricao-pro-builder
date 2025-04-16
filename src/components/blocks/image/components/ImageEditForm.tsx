
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import ImageLibrary from '@/components/ImageLibrary/ImageLibrary';
import ImageUploadPreview from './ImageUploadPreview';

interface ImageEditFormProps {
  src: string;
  alt: string;
  caption: string;
  blockId: string;
  uploading: boolean;
  uploadProgress: number;
  onUpdateSrc: (src: string) => void;
  onUpdateAlt: (alt: string) => void;
  onUpdateCaption: (caption: string) => void;
  onSelectFromLibrary: (imageUrl: string, alt: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageEditForm: React.FC<ImageEditFormProps> = ({
  src,
  alt,
  caption,
  blockId,
  uploading,
  uploadProgress,
  onUpdateSrc,
  onUpdateAlt,
  onUpdateCaption,
  onSelectFromLibrary,
  onFileChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">URL da Imagem</label>
        <div className="flex gap-2">
          <Input
            value={src || ''}
            onChange={(e) => onUpdateSrc(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          <ImageLibrary 
            onSelectImage={onSelectFromLibrary}
            trigger={
              <Button variant="outline" size="icon">
                <Image className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Texto Alternativo</label>
        <Input
          value={alt || ''}
          onChange={(e) => onUpdateAlt(e.target.value)}
          placeholder="Descrição da imagem"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Legenda (opcional)</label>
        <Input
          value={caption || ''}
          onChange={(e) => onUpdateCaption(e.target.value)}
          placeholder="Legenda da imagem"
        />
      </div>
      
      <div className="pt-2">
        <ImageUploadPreview
          src={src}
          uploading={uploading}
          uploadProgress={uploadProgress}
          onUpload={onFileChange}
          onRemove={() => onUpdateSrc('')}
          blockId={blockId}
        />
      </div>
    </div>
  );
};

export default ImageEditForm;
