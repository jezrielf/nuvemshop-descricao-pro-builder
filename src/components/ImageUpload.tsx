
import React from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Button } from '@/components/ui/button';
import { Card, Text, Icon } from '@nimbus-ds/components';
import { Progress } from '@nimbus-ds/components';
import { 
  ArrowUpIcon, 
  ImageIcon,
  CheckCircleIcon 
} from '@nimbus-ds/icons';

const ImageUpload: React.FC = () => {
  const { uploading, uploadProgress, imageUrl, handleFileChange } = useImageUpload();
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <Card.Header>
        <Text fontSize="base" fontWeight="bold">Upload de Imagem</Text>
      </Card.Header>
      
      <Card.Body>
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
              <Icon source={<CheckCircleIcon />} color="success-interactive" />
              <Text className="ml-2">Upload realizado com sucesso!</Text>
            </div>
            <div className="flex justify-between">
              <Button
                variant="secondary"
                leftIcon={<Icon source={<ArrowUpIcon />} />}
                onClick={() => {
                  const inputElement = document.getElementById('image-input') as HTMLInputElement;
                  if (inputElement) inputElement.click();
                }}
              >
                Enviar outra imagem
              </Button>
              
              <Button
                variant="tertiary"
                leftIcon={<Icon source={<ImageIcon />} />}
                onClick={() => navigator.clipboard.writeText(imageUrl)}
              >
                Copiar URL
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {uploading ? (
              <div className="space-y-2">
                <Progress value={uploadProgress} max={100} />
                <Text fontSize="caption" className="text-center text-neutral-textLow">
                  Enviando... {uploadProgress}%
                </Text>
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
                  variant="tertiary"
                  className="w-full h-32 flex flex-col items-center justify-center"
                  onClick={() => {
                    const inputElement = document.getElementById('image-input') as HTMLInputElement;
                    if (inputElement) inputElement.click();
                  }}
                >
                  <Icon source={<ArrowUpIcon />} size="large" color="neutral-textLow" />
                  <Text className="mt-2 text-neutral-textLow">Clique para enviar uma imagem</Text>
                  <Text fontSize="caption" className="mt-1 text-neutral-textLow">
                    Formatos aceitos: JPG, PNG, GIF
                  </Text>
                </Button>
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ImageUpload;
