
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

// Importar hooks personalizados
import { useImageLibraryUpload } from './hooks/useImageLibraryUpload';
import { useUserImages } from './hooks/useUserImages';

// Importar componentes
import LibraryTab from './components/LibraryTab';
import UploadsTab from './components/UploadsTab';
import UploadTab from './components/UploadTab';

interface ImageLibraryProps {
  onSelectImage: (imageUrl: string, alt: string) => void;
  trigger?: React.ReactNode;
}

const ImageLibrary: React.FC<ImageLibraryProps> = ({ onSelectImage, trigger }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('library');
  const { toast } = useToast();
  const auth = useAuth();
  
  // Inicializar hooks personalizados
  const { 
    uploading, 
    uploadProgress, 
    previewUrl,
    imageAlt,
    fileInputRef,
    handleFileChange,
    uploadImage,
    setImageAlt,
    resetForm
  } = useImageLibraryUpload();
  
  const {
    userImages,
    loading,
    addImageToList
  } = useUserImages(open, activeTab);
  
  // Verificar recursos premium
  const isPremium = auth.isPremium();
  
  const handleSelectImage = (src: string, alt: string) => {
    onSelectImage(src, alt);
    setOpen(false);
    
    toast({
      title: "Imagem selecionada",
      description: "A imagem foi adicionada ao seu bloco.",
    });
  };
  
  const handleUpload = async () => {
    const result = await uploadImage();
    if (result) {
      // Adicionar às imagens do usuário e selecioná-la
      const newImage = { 
        id: Date.now().toString(), 
        src: result.url, 
        alt: result.alt 
      };
      
      addImageToList(newImage);
      
      // Selecionar automaticamente a imagem carregada
      handleSelectImage(result.url, result.alt);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="flex items-center">
            <ImageIcon className="h-4 w-4 mr-1" />
            Biblioteca de Imagens
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Biblioteca de Imagens</DialogTitle>
          <DialogDescription>
            Escolha uma imagem da nossa biblioteca para usar em sua descrição ou faça upload de uma nova.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full py-4">
          <Tabs 
            defaultValue="library" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="library">Biblioteca</TabsTrigger>
              <TabsTrigger value="uploads">Minhas Imagens</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="library">
              <LibraryTab 
                onSelectImage={handleSelectImage} 
                isPremium={isPremium}
              />
            </TabsContent>
            
            <TabsContent value="uploads">
              <UploadsTab 
                loading={loading}
                userImages={userImages}
                onSelectImage={handleSelectImage}
                onSwitchToUpload={() => setActiveTab('upload')}
              />
            </TabsContent>
            
            <TabsContent value="upload">
              <UploadTab 
                previewUrl={previewUrl}
                imageAlt={imageAlt}
                uploading={uploading}
                uploadProgress={uploadProgress}
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
                onUpload={handleUpload}
                onCancel={resetForm}
                onAltChange={setImageAlt}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLibrary;
