
import React from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, Image as ImageIcon, Check } from 'lucide-react';

const ImageUpload: React.FC = () => {
  const { uploading, uploadProgress, imageUrl, handleFileChange } = useImageUpload();
  
  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Upload de Imagem</h2>
      
      {imageUrl ? (
        <div className="space-y-4">
          <div className="relative bg-gray-50 p-2 rounded-md">
            <img 
              src={imageUrl} 
              alt="Imagem enviada" 
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
          <div className="flex items-center justify-center text-green-600">
            <Check className="mr-2 h-5 w-5" />
            <span>Upload realizado com sucesso!</span>
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                const inputElement = document.getElementById('image-input') as HTMLInputElement;
                if (inputElement) inputElement.click();
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Enviar outra imagem
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => navigator.clipboard.writeText(imageUrl)}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Copiar URL
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {uploading ? (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-center text-gray-500">
                Enviando... {uploadProgress}%
              </p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                id="image-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant="ghost"
                className="w-full h-32 flex flex-col items-center justify-center"
                onClick={() => {
                  const inputElement = document.getElementById('image-input') as HTMLInputElement;
                  if (inputElement) inputElement.click();
                }}
              >
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-gray-500">Clique para enviar uma imagem</span>
                <span className="text-xs text-gray-400 mt-1">
                  Formatos aceitos: JPG, PNG, GIF
                </span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
