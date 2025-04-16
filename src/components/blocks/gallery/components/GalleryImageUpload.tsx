
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, Upload, X } from 'lucide-react';

interface GalleryImageUploadProps {
  image: {
    id: string;
    src: string;
    alt: string;
    caption?: string;
  };
  uploading: boolean;
  uploadProgress: number;
  imageObjectFit: string;
  onUpdateImage: (imageId: string, field: 'src' | 'alt' | 'caption', value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GalleryImageUpload: React.FC<GalleryImageUploadProps> = ({
  image,
  uploading,
  uploadProgress,
  imageObjectFit,
  onUpdateImage,
  onFileChange
}) => {
  return (
    <>
      {image.src ? (
        <div className="relative">
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-32 ${imageObjectFit} mb-3 rounded-md`}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUpdateImage(image.id, 'src', '')}
            className="absolute top-1 right-1 bg-white/80 hover:bg-white/90 h-8 w-8 p-0 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="w-full h-32 bg-gray-100 flex items-center justify-center mb-3 rounded-md relative">
          {uploading ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <div className="w-3/4 max-w-xs">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-center mt-1 text-muted-foreground">
                  Enviando... {uploadProgress}%
                </p>
              </div>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                id={`galleryImageUpload-${image.id}`}
                className="hidden"
                onChange={onFileChange}
              />
              <label 
                htmlFor={`galleryImageUpload-${image.id}`} 
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-6 w-6 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500 block">Clique para fazer upload</span>
              </label>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default GalleryImageUpload;
