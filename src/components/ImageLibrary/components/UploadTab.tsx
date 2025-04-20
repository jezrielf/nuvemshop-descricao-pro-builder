
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Upload, X } from 'lucide-react';

interface UploadTabProps {
  previewUrl: string | null;
  imageAlt: string;
  uploading: boolean;
  uploadProgress: number;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onCancel: () => void;
  onAltChange: (value: string) => void;
}

const UploadTab: React.FC<UploadTabProps> = ({
  previewUrl,
  imageAlt,
  uploading,
  uploadProgress,
  fileInputRef,
  onFileChange,
  onUpload,
  onCancel,
  onAltChange
}) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      {previewUrl ? (
        <div className="space-y-4">
          <div className="relative mx-auto max-w-xs">
            <img 
              src={previewUrl} 
              alt="Pré-visualização" 
              className="max-h-64 mx-auto"
            />
            <Button
              variant="ghost" 
              size="small"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full"
              onClick={onCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Texto alternativo (alt)</label>
            <Input
              value={imageAlt}
              onChange={(e) => onAltChange(e.target.value)}
              placeholder="Descreva a imagem para acessibilidade"
            />
          </div>
          
          {uploading ? (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">Enviando... {uploadProgress}%</p>
            </div>
          ) : (
            <Button 
              className="w-full" 
              onClick={onUpload}
            >
              <Upload className="h-4 w-4 mr-2" />
              Enviar Imagem
            </Button>
          )}
        </div>
      ) : (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="cursor-pointer">
            <div className="flex flex-col items-center justify-center py-8">
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-1">Clique para selecionar uma imagem</p>
              <p className="text-sm text-muted-foreground mb-4">ou arraste e solte aqui</p>
              <p className="text-xs text-muted-foreground">Tamanho máximo: 5MB | JPG, PNG, GIF</p>
            </div>
          </label>
        </>
      )}
    </div>
  );
};

export default UploadTab;
