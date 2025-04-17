
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Trash, Upload, Image as ImageIcon } from 'lucide-react';
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
  uploading: boolean;
  uploadProgress: number;
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
  // Function to handle file change specifically for this image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e, image.id);
  };
  
  // Function to handle library selection for this specific image
  const handleSelectFromLibrary = (imageUrl: string, alt: string) => {
    onSelectImageFromLibrary(image.id, imageUrl, alt);
  };
  
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">Imagem {index + 1}</h4>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMoveImage(image.id, 'left')}
            disabled={index === 0}
            className="h-6 w-6 p-0"
          >
            <ArrowLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMoveImage(image.id, 'right')}
            disabled={index === totalImages - 1}
            className="h-6 w-6 p-0"
          >
            <ArrowRight className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveImage(image.id)}
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* Image upload component */}
      <GalleryImageUpload
        image={image}
        uploading={uploading}
        uploadProgress={uploadProgress}
        imageObjectFit={imageObjectFit}
        onUpdateImage={onUpdateImage}
        onFileChange={handleFileChange}
      />
      
      <div className="mt-2 grid grid-cols-1 gap-3">
        <div className="flex space-x-2">
          <ImageLibrary 
            onSelectImage={(url, alt) => handleSelectFromLibrary(url, alt)} 
            trigger={
              <Button variant="outline" size="sm" className="flex items-center">
                <ImageIcon className="h-4 w-4 mr-1" />
                Biblioteca
              </Button>
            }
          />
          
          {/* Add direct upload button for clarity */}
          <div className="relative">
            <input
              type="file"
              id={`gallery-upload-${image.id}`}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Button variant="outline" size="sm" className="flex items-center">
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Button>
          </div>
        </div>
        
        <div>
          <label className="block text-xs mb-1">URL da Imagem</label>
          <Input
            value={image.src}
            onChange={(e) => onUpdateImage(image.id, 'src', e.target.value)}
            placeholder="URL da imagem"
          />
        </div>
        
        <div>
          <label className="block text-xs mb-1">Texto alternativo</label>
          <Input
            value={image.alt}
            onChange={(e) => onUpdateImage(image.id, 'alt', e.target.value)}
            placeholder="Descrição da imagem"
          />
        </div>
        
        <div>
          <label className="block text-xs mb-1">Legenda (opcional)</label>
          <Textarea
            value={image.caption || ''}
            onChange={(e) => onUpdateImage(image.id, 'caption', e.target.value)}
            placeholder="Legenda da imagem"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryImageForm;
