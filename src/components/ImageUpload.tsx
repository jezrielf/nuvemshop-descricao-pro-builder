
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload for now
    // In a real implementation, this would upload to a cloud storage service
    setTimeout(() => {
      // Create a local URL for the demo
      const imageUrl = URL.createObjectURL(file);
      
      onImageUploaded(imageUrl);
      
      setIsUploading(false);
      toast({
        title: "Imagem enviada",
        description: "A imagem foi enviada com sucesso!",
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">
          Clique para fazer upload de uma imagem otimizada
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Formatos suportados: JPG, PNG, WebP
        </p>
        <div className="mt-4">
          <label htmlFor="file-upload">
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleUpload}
              disabled={isUploading}
            />
            <Button
              as="span"
              disabled={isUploading}
              className="relative cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Enviando...' : 'Enviar imagem'}
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
