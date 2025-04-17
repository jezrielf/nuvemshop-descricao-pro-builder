
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ImageIcon, Upload } from 'lucide-react';
import ImageLibrary from '@/components/ImageLibrary/ImageLibrary';

interface ImageEditFormProps {
  src: string;
  alt: string;
  caption?: string;
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
  caption = '',
  uploadProgress,
  uploading,
  onUpdateSrc,
  onUpdateAlt,
  onUpdateCaption,
  onSelectFromLibrary,
  onFileChange
}) => {
  // Lista de imagens placeholder
  const placeholderImages = [
    { url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', alt: 'Laptop com código' },
    { url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d', alt: 'Pessoa usando laptop' },
    { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', alt: 'Mulher trabalhando no computador' },
    { url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1', alt: 'Laptop na mesa' },
  ];

  return (
    <div className="space-y-4">
      {src && (
        <div className="relative">
          <img
            src={src}
            alt={alt || "Image preview"}
            className="max-h-64 mx-auto object-contain rounded-md"
          />
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <ImageLibrary onSelectImage={onSelectFromLibrary} />
            
            <div className="relative">
              <input
                type="file"
                id="image-upload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={onFileChange}
              />
              <button className="h-9 px-4 py-2 bg-white border border-gray-200 text-sm rounded-md hover:bg-gray-100 flex items-center justify-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </button>
            </div>
          </div>
          
          {/* Alternativa de imagens pré-definidas */}
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Imagens pré-definidas:</p>
            <div className="grid grid-cols-4 gap-2">
              {placeholderImages.map((img, index) => (
                <div 
                  key={index} 
                  className="cursor-pointer border rounded-md overflow-hidden hover:ring-2 hover:ring-primary"
                  onClick={() => onSelectFromLibrary(img.url, img.alt)}
                >
                  <img 
                    src={img.url} 
                    alt={img.alt} 
                    className="h-20 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {uploading && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">Uploading... {uploadProgress}%</p>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL da imagem
          </label>
          <Input
            value={src}
            onChange={(e) => onUpdateSrc(e.target.value)}
            placeholder="Ex: https://exemplo.com/imagem.jpg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Texto alternativo
          </label>
          <Input
            value={alt}
            onChange={(e) => onUpdateAlt(e.target.value)}
            placeholder="Descrição da imagem para acessibilidade"
          />
          <p className="mt-1 text-xs text-gray-500">
            Descreva o conteúdo da imagem para melhorar a acessibilidade.
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Legenda (opcional)
          </label>
          <Textarea
            value={caption}
            onChange={(e) => onUpdateCaption(e.target.value)}
            placeholder="Legenda opcional para a imagem"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageEditForm;
