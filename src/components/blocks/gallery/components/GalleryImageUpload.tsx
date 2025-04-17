
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Image, Upload } from 'lucide-react';

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
    <div className="relative border rounded-md overflow-hidden">
      {/* Image Preview */}
      <div className="aspect-video w-full">
        {image.src ? (
          <img
            src={image.src}
            alt={image.alt || 'Imagem da galeria'}
            className={`w-full h-full ${imageObjectFit} object-center`}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Image className="h-10 w-10 text-gray-400" />
          </div>
        )}
      </div>
      
      {/* Upload overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <input
          type="file"
          id={`gallery-direct-upload-${image.id}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={onFileChange}
          accept="image/*"
        />
        
        {!image.src && !uploading && (
          <div className="bg-white bg-opacity-75 rounded-full p-3 shadow-md">
            <Upload className="h-6 w-6 text-primary" />
          </div>
        )}
        
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 text-white">
            <p className="text-sm mb-2">Enviando... {uploadProgress}%</p>
            <Progress value={uploadProgress} className="h-2 w-full max-w-[200px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryImageUpload;
