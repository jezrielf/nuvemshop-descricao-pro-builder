
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  initialImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, initialImage }) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }
    
    setIsUploading(true);
    
    // Read file as data URL (base64)
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // In a real application, here we would upload to a server
        // For now, we'll use the base64 string directly
        setImage(reader.result);
        onImageUploaded(reader.result);
        setIsUploading(false);
      }
    };
    reader.onerror = () => {
      console.error('Error reading file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="image-upload">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {image ? (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={image} 
            alt="Preview" 
            className="w-full h-auto max-h-[200px] object-contain"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
          {isUploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p>Enviando imagem...</p>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-4">
                Arraste e solte uma imagem aqui ou clique para selecionar
              </p>
              <Button 
                variant="outline" 
                onClick={triggerFileInput}
                className="mx-auto"
              >
                Selecionar Imagem
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
