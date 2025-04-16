
import React from 'react';
import { Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ImageUploadPreviewProps {
  src?: string;
  uploading: boolean;
  uploadProgress: number;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  blockId: string;
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({
  src,
  uploading,
  uploadProgress,
  onUpload,
  onRemove,
  blockId
}) => {
  if (src) {
    return (
      <div className="bg-gray-50 p-2 rounded-md">
        <img
          src={src}
          alt="Imagem carregada"
          className="w-full h-auto max-h-64 object-contain rounded-md"
        />
        {onRemove && (
          <div className="mt-2 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" />
              Remover imagem
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="aspect-video bg-gray-100 rounded-md relative">
      {uploading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="w-3/4 max-w-xs">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs text-center mt-1 text-muted-foreground">Enviando... {uploadProgress}%</p>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="file"
            accept="image/*"
            id={`imageUpload-${blockId}`}
            className="hidden"
            onChange={onUpload}
          />
          <label 
            htmlFor={`imageUpload-${blockId}`} 
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-gray-500 block">Clique para fazer upload</span>
            <span className="text-xs text-gray-400 mt-2">ou insira uma URL acima</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;
