import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Image, Download, RefreshCw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProductDescription } from '@/types/editor';
import { extractImagesFromDescription } from '../utils/imageUtils';

interface ImageOptimizerProps {
  description: ProductDescription | null;
  onUpdateImage?: (blockId: string, imageType: string, newImageData: string) => void;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ 
  description,
  onUpdateImage 
}) => {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('optimize');
  const [selectedImage, setSelectedImage] = useState<{
    blockId: string;
    type: string; // 'src', 'image', or item index in gallery
    url: string;
    originalSize: number;
    optimizedSize?: number;
    optimizedUrl?: string;
    isOptimizing: boolean;
  } | null>(null);
  const [quality, setQuality] = useState(80);
  const { toast } = useToast();
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Get file size from URL
  const getImageFileSize = async (url: string): Promise<number> => {
    // For demo purposes, generate a random file size
    // In real implementation, you would fetch the actual file size
    return Math.floor(Math.random() * 3000000) + 500000; // Random between 500KB and 3.5MB
  };
  
  // Simulate image optimization
  const optimizeImage = async (imageUrl: string) => {
    if (!selectedImage) return;
    
    setSelectedImage({
      ...selectedImage,
      isOptimizing: true
    });
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // In a real implementation, this would call an API to optimize the image
      // For now, we're simulating the result
      
      // Calculate simulated new file size (between 40-70% of original)
      const reductionFactor = 0.3 + ((100 - quality) / 100);
      const newSize = Math.round(selectedImage.originalSize * (1 - reductionFactor));
      
      setSelectedImage({
        ...selectedImage,
        optimizedSize: newSize,
        optimizedUrl: imageUrl, // In real implementation, this would be the new URL
        isOptimizing: false
      });
      
      toast({
        title: "Imagem otimizada com sucesso",
        description: `Tamanho reduzido de ${formatFileSize(selectedImage.originalSize)} para ${formatFileSize(newSize)}`,
      });
    } catch (error) {
      toast({
        title: "Erro ao otimizar imagem",
        description: "Ocorreu um erro durante o processo de otimização.",
        variant: "destructive"
      });
      
      setSelectedImage({
        ...selectedImage,
        isOptimizing: false
      });
    }
  };
  
  // Select image to optimize
  const handleSelectImage = async (blockId: string, type: string, url: string) => {
    const originalSize = await getImageFileSize(url);
    
    setSelectedImage({
      blockId,
      type,
      url,
      originalSize,
      isOptimizing: false
    });
    
    setSelectedTab('optimize');
  };
  
  // Apply optimized image
  const handleApplyOptimized = () => {
    if (!selectedImage || !selectedImage.optimizedUrl || !onUpdateImage) return;
    
    onUpdateImage(
      selectedImage.blockId,
      selectedImage.type,
      selectedImage.optimizedUrl
    );
    
    toast({
      title: "Imagem atualizada",
      description: "A imagem otimizada foi aplicada com sucesso.",
    });
    
    // Reset selection
    setSelectedImage(null);
  };
  
  const images = extractImagesFromDescription(description);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Image className="h-4 w-4 mr-1" />
          Otimizar Imagens
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Otimizador de Imagens</DialogTitle>
          <DialogDescription>
            Otimize as imagens da sua descrição para melhorar a velocidade de carregamento e SEO.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(70vh-2rem)]">
          <div className="md:col-span-1 border rounded-md overflow-hidden flex flex-col">
            <div className="p-3 bg-gray-50 border-b font-medium">
              Imagens na Descrição
            </div>
            <ScrollArea className="flex-grow">
              <div className="p-3 space-y-3">
                {images.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <Image className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>Nenhuma imagem encontrada na descrição atual</p>
                  </div>
                ) : (
                  images.map((img, index) => (
                    <div 
                      key={`${img.blockId}-${img.type}`}
                      className={`border rounded-md overflow-hidden cursor-pointer transition-shadow hover:shadow-md ${
                        selectedImage && selectedImage.blockId === img.blockId && selectedImage.type === img.type 
                          ? 'ring-2 ring-primary' 
                          : ''
                      }`}
                      onClick={() => handleSelectImage(img.blockId, img.type, img.url)}
                    >
                      <div className="aspect-video bg-gray-100 relative overflow-hidden">
                        <img 
                          src={img.url} 
                          alt={img.alt}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium truncate">{img.title}</p>
                        <p className="text-xs text-gray-500 truncate">{img.alt || 'Sem texto alternativo'}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
          
          <div className="md:col-span-2 flex flex-col">
            {!selectedImage ? (
              <div className="flex-grow flex flex-col items-center justify-center p-10 text-center text-gray-500 border rounded-md">
                <Image className="h-16 w-16 mb-4 opacity-20" />
                <p className="mb-2">Selecione uma imagem para otimizar</p>
                <p className="text-sm">A otimização de imagens melhora o tempo de carregamento da página e a experiência do usuário.</p>
              </div>
            ) : (
              <div className="flex-grow flex flex-col border rounded-md overflow-hidden">
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-grow flex flex-col">
                  <div className="border-b">
                    <TabsList className="p-0 h-auto w-full rounded-none border-b bg-gray-50">
                      <TabsTrigger 
                        value="preview" 
                        className="flex-1 rounded-none data-[state=active]:bg-background"
                      >
                        Pré-visualização
                      </TabsTrigger>
                      <TabsTrigger 
                        value="optimize" 
                        className="flex-1 rounded-none data-[state=active]:bg-background"
                      >
                        Otimizar
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="preview" className="flex-grow flex flex-col mt-0">
                    <div className="p-4 bg-gray-50 border-b">
                      <h3 className="font-medium">Detalhes da Imagem</h3>
                    </div>
                    <div className="p-4 flex-grow overflow-auto">
                      <div className="mb-4 border rounded-md overflow-hidden">
                        <img 
                          src={selectedImage.url} 
                          alt="Preview" 
                          className="w-full object-contain"
                        />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">Tamanho Original</Label>
                          <p className="text-sm">{formatFileSize(selectedImage.originalSize)}</p>
                        </div>
                        {selectedImage.optimizedSize && (
                          <div>
                            <Label className="text-sm font-medium">Tamanho Otimizado</Label>
                            <p className="text-sm">{formatFileSize(selectedImage.optimizedSize)} <span className="text-green-600">({Math.round((1 - selectedImage.optimizedSize / selectedImage.originalSize) * 100)}% menor)</span></p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="optimize" className="flex-grow flex flex-col mt-0">
                    <div className="p-4 bg-gray-50 border-b">
                      <h3 className="font-medium">Configurações de Otimização</h3>
                    </div>
                    <div className="p-4 space-y-6 flex-grow">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Qualidade da Imagem: {quality}%</Label>
                        </div>
                        <Slider 
                          value={[quality]} 
                          min={40}
                          max={95}
                          step={5}
                          onValueChange={(values) => setQuality(values[0])}
                        />
                        <p className="text-xs text-gray-500">
                          Valores menores resultam em arquivos menores, mas podem reduzir a qualidade visual.
                        </p>
                      </div>
                      
                      <div className="border rounded-md p-4 bg-gray-50">
                        <p className="text-sm">
                          Imagens otimizadas carregam mais rápido, melhoram a performance da página e a experiência do usuário. Isso também afeta positivamente seu SEO.
                        </p>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button
                          className="flex-1"
                          onClick={() => optimizeImage(selectedImage.url)}
                          disabled={selectedImage.isOptimizing}
                        >
                          {selectedImage.isOptimizing ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Otimizando...
                            </>
                          ) : selectedImage.optimizedUrl ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Reotimizar
                            </>
                          ) : (
                            <>
                              <Image className="h-4 w-4 mr-2" />
                              Otimizar Imagem
                            </>
                          )}
                        </Button>
                        
                        {selectedImage.optimizedUrl && (
                          <Button
                            variant="outline"
                            onClick={handleApplyOptimized}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Aplicar
                          </Button>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageOptimizer;
