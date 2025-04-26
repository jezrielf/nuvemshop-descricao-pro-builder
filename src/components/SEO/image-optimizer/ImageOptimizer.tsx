
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ProductDescription } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';
import { EmptyState } from '../checklist/components/EmptyState';
import { ImageAnalysis } from './components/ImageAnalysis';
import { ImageOptimizationTips } from './components/ImageOptimizationTips';
import { AlertTriangle, CheckCircle, Image } from 'lucide-react';

interface ImageOptimizerProps {
  description: ProductDescription | null;
  onUpdateImage?: (blockId: string, imageType: string, newImageUrl: string) => void;
}

interface ImageData {
  blockId: string;
  imageType: string; // 'src', 'image', etc.
  url: string;
  alt: string;
  blockType: string;
  title: string;
  size?: number;
  dimensions?: { width: number; height: number };
  status: 'loading' | 'ok' | 'warning' | 'error';
  issue?: string;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ description, onUpdateImage }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const analyzeImages = async () => {
    if (!description) return;
    
    setIsScanning(true);
    
    // Reset images
    setImages([]);
    
    // Collect all images from blocks
    const collectedImages: ImageData[] = [];
    
    for (const block of description.blocks) {
      if (!block.visible) continue;
      
      // Handle image blocks
      if (block.type === 'image' && block.src) {
        collectedImages.push({
          blockId: block.id,
          imageType: 'src',
          url: block.src,
          alt: block.alt || '',
          blockType: block.type,
          title: block.title,
          status: 'loading'
        });
      }
      
      // Handle hero blocks with images
      else if (block.type === 'hero' && block.image) {
        collectedImages.push({
          blockId: block.id,
          imageType: 'image',
          url: block.image,
          alt: block.imageAlt || '',
          blockType: block.type,
          title: block.title,
          status: 'loading'
        });
      }
      
      // Handle gallery blocks
      else if (block.type === 'gallery' && block.images && block.images.length > 0) {
        block.images.forEach((img, index) => {
          if (img.src) {
            collectedImages.push({
              blockId: block.id,
              imageType: `images[${index}].src`,
              url: img.src,
              alt: img.alt || '',
              blockType: block.type,
              title: `${block.title} - Imagem ${index + 1}`,
              status: 'loading'
            });
          }
        });
      }
      
      // Handle imageText blocks
      else if (block.type === 'imageText' && block.image) {
        collectedImages.push({
          blockId: block.id,
          imageType: 'image',
          url: block.image,
          alt: block.imageAlt || '',
          blockType: block.type,
          title: block.title,
          status: 'loading'
        });
      }
      
      // Handle textImage blocks
      else if (block.type === 'textImage' && block.image) {
        collectedImages.push({
          blockId: block.id,
          imageType: 'image',
          url: block.image,
          alt: block.imageAlt || '',
          blockType: block.type,
          title: block.title,
          status: 'loading'
        });
      }
    }
    
    // Update state with collected images
    setImages(collectedImages);
    
    // Analyze each image
    for (let i = 0; i < collectedImages.length; i++) {
      const img = collectedImages[i];
      
      try {
        // Simulate image analysis (in a real app, you'd actually analyze the images)
        setTimeout(() => {
          setImages(current => {
            const updated = [...current];
            // Random size between 50KB and 2MB
            const size = Math.floor(Math.random() * (2048 - 50) + 50);
            
            // Random dimensions
            const width = Math.floor(Math.random() * (2000 - 400) + 400);
            const height = Math.floor(Math.random() * (1500 - 300) + 300);
            
            // Determine status based on simulated size and alt text
            let status: 'ok' | 'warning' | 'error' = 'ok';
            let issue = '';
            
            if (size > 800) {
              status = 'error';
              issue = 'Imagem muito grande (> 800KB)';
            } else if (size > 300) {
              status = 'warning';
              issue = 'Imagem poderia ser otimizada';
            }
            
            if (!img.alt || img.alt.trim() === '') {
              status = status === 'ok' ? 'warning' : 'error';
              issue = issue ? `${issue}. Sem texto alternativo` : 'Sem texto alternativo';
            }
            
            updated[i] = {
              ...img,
              status,
              issue,
              size,
              dimensions: { width, height }
            };
            
            return updated;
          });
        }, 500 + Math.random() * 1500); // Simulate different loading times
      } catch (error) {
        console.error("Error analyzing image:", error);
        
        // Update state with error
        setImages(current => {
          const updated = [...current];
          updated[i] = {
            ...img,
            status: 'error',
            issue: 'Erro ao analisar imagem'
          };
          return updated;
        });
      }
    }
    
    // Set scanning to false after all images have been processed
    setTimeout(() => {
      setIsScanning(false);
      
      if (collectedImages.length === 0) {
        toast({
          title: 'Nenhuma imagem encontrada',
          description: 'Adicione imagens à sua descrição para otimização.'
        });
      }
    }, collectedImages.length * 500 + 1000); // Add some buffer time for all images to process
  };

  useEffect(() => {
    if (open && description) {
      analyzeImages();
    }
  }, [open, description]);
  
  const getStatusSummary = () => {
    const total = images.length;
    const errors = images.filter(img => img.status === 'error').length;
    const warnings = images.filter(img => img.status === 'warning').length;
    const ok = images.filter(img => img.status === 'ok').length;
    
    return { total, errors, warnings, ok };
  };
  
  const { total, errors, warnings, ok } = getStatusSummary();
  
  const handleOptimizeImage = async (imageData: ImageData) => {
    // Here would be the actual image optimization logic
    // For this demo, we'll just simulate an optimization
    
    toast({
      title: 'Otimização em andamento',
      description: 'Iniciando otimização da imagem...'
    });
    
    // Simulate optimization process
    setTimeout(() => {
      // In a real app, this would be the URL of the optimized image
      const optimizedUrl = imageData.url.includes('?') 
        ? `${imageData.url}&optimized=true` 
        : `${imageData.url}?optimized=true`;
      
      // Call the onUpdateImage function provided by the parent component
      if (onUpdateImage) {
        onUpdateImage(imageData.blockId, imageData.imageType, optimizedUrl);
      }
      
      // Update the image in our local state
      setImages(current => 
        current.map(img => 
          img.blockId === imageData.blockId && img.imageType === imageData.imageType
            ? { 
                ...img, 
                url: optimizedUrl,
                status: 'ok',
                issue: '',
                size: Math.floor(img.size! * 0.4) // Simulate 60% reduction
              }
            : img
        )
      );
      
      toast({
        title: 'Imagem otimizada',
        description: 'A imagem foi otimizada com sucesso!'
      });
    }, 2000);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Otimizar Imagens</span>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Otimizador de Imagens</DialogTitle>
          <DialogDescription>
            Analise e otimize as imagens da sua descrição para melhorar o SEO e o desempenho.
          </DialogDescription>
        </DialogHeader>
        
        {!description ? (
          <div className="p-4">
            <EmptyState message="Crie uma descrição para analisar imagens" />
          </div>
        ) : (
          <div className="flex-grow flex flex-col h-full overflow-hidden">
            <Tabs defaultValue="images" className="flex flex-col h-full">
              <div className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="images" className="flex-1">Imagens ({total})</TabsTrigger>
                  <TabsTrigger value="tips" className="flex-1">Dicas de Otimização</TabsTrigger>
                </TabsList>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <TabsContent value="images" className="mt-0 m-0 space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <CheckCircle className="text-green-500 h-4 w-4 mr-1.5" />
                        <span>{ok} ok</span>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="text-amber-500 h-4 w-4 mr-1.5" />
                        <span>{warnings} avisos</span>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="text-red-500 h-4 w-4 mr-1.5" />
                        <span>{errors} problemas</span>
                      </div>
                    </div>
                    <Button 
                      onClick={analyzeImages}
                      disabled={isScanning}
                      size="sm"
                      variant="outline"
                    >
                      <Image className="h-4 w-4 mr-1.5" />
                      {isScanning ? 'Analisando...' : 'Reanalisar'}
                    </Button>
                  </div>
                  
                  {images.length === 0 && !isScanning ? (
                    <EmptyState message="Nenhuma imagem encontrada na descrição" />
                  ) : (
                    <div className="space-y-4">
                      {images.map((img, index) => (
                        <ImageAnalysis 
                          key={`${img.blockId}-${img.imageType}-${index}`}
                          imageData={img}
                          onOptimize={() => handleOptimizeImage(img)}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="tips" className="mt-0 m-0">
                  <ImageOptimizationTips />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageOptimizer;
