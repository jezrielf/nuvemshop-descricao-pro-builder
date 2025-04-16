
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageIcon, Loader2, Upload } from 'lucide-react';

interface UploadsTabProps {
  loading: boolean;
  userImages: Array<{ id: string; src: string; alt: string }>;
  onSelectImage: (src: string, alt: string) => void;
  onSwitchToUpload: () => void;
}

const UploadsTab: React.FC<UploadsTabProps> = ({ 
  loading, 
  userImages, 
  onSelectImage, 
  onSwitchToUpload 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (userImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-center">
        <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Nenhuma imagem encontrada</h3>
        <p className="text-muted-foreground mb-4">
          Você ainda não enviou nenhuma imagem. Use a aba "Upload" para adicionar suas próprias imagens.
        </p>
        <Button onClick={onSwitchToUpload}>
          <Upload className="h-4 w-4 mr-2" />
          Fazer Upload
        </Button>
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-96">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userImages.map((image) => (
          <div 
            key={image.id} 
            className="relative group overflow-hidden rounded-md border"
          >
            <img 
              src={image.src}
              alt={image.alt}
              className="w-full h-32 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => onSelectImage(image.src, image.alt)}
              >
                Selecionar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default UploadsTab;
