
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductDescription, Block } from '@/types/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileImage, AlertCircle, CheckCircle, Download, Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ImageUpload } from '../../ImageUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ImageOptimizerProps {
  description: ProductDescription | null;
  onUpdateImage: (blockId: string, imageType: string, newImageUrl: string) => void;
}

interface ImageInfo {
  blockId: string;
  imageType: string;
  url: string;
  blockType: string;
  alt?: string;
  fileSize?: number; // in bytes
  dimensions?: { width: number; height: number };
  optimized: boolean;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ description, onUpdateImage }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  
  useEffect(() => {
    if (description && open) {
      const extractedImages: ImageInfo[] = [];
      
      description.blocks.forEach((block: Block) => {
        if ('imageUrl' in block && block.imageUrl) {
          extractedImages.push({
            blockId: block.id,
            imageType: 'imageUrl',
            url: block.imageUrl as string,
            blockType: block.type,
            alt: 'alt' in block ? (block.alt as string) : undefined,
            optimized: false
          });
        }
        
        if ('backgroundUrl' in block && block.backgroundUrl) {
          extractedImages.push({
            blockId: block.id,
            imageType: 'backgroundUrl',
            url: block.backgroundUrl as string,
            blockType: block.type,
            optimized: false
          });
        }
        
        if ('images' in block && Array.isArray(block.images)) {
          block.images.forEach((image: any, index: number) => {
            if (typeof image === 'string') {
              extractedImages.push({
                blockId: block.id,
                imageType: `images[${index}]`,
                url: image,
                blockType: block.type,
                optimized: false
              });
            } else if (image && typeof image === 'object' && 'url' in image) {
              extractedImages.push({
                blockId: block.id,
                imageType: `images[${index}]`,
                url: image.url,
                blockType: block.type,
                alt: image.alt,
                optimized: false
              });
            }
          });
        }
      });
      
      // Fetch image dimensions and sizes
      Promise.all(
        extractedImages.map(async (imageInfo) => {
          try {
            const response = await fetch(imageInfo.url, { method: 'HEAD' });
            const size = parseInt(response.headers.get('content-length') || '0', 10);
            
            return {
              ...imageInfo,
              fileSize: size,
              optimized: size < 200000 // Consider optimized if less than 200KB
            };
          } catch (error) {
            console.error('Error fetching image info:', error);
            return imageInfo;
          }
        })
      ).then(setImages);
    }
  }, [description, open]);
  
  const getFileSize = (bytes: number | undefined) => {
    if (!bytes) return 'Desconhecido';
    const kilobytes = bytes / 1024;
    if (kilobytes < 1000) {
      return `${kilobytes.toFixed(1)} KB`;
    }
    const megabytes = kilobytes / 1024;
    return `${megabytes.toFixed(2)} MB`;
  };
  
  const getOptimizationStatus = (image: ImageInfo) => {
    if (!image.fileSize) return 'Desconhecido';
    
    if (image.fileSize > 500000) { // > 500KB
      return {
        status: 'high',
        label: 'Alta compressão recomendada',
        color: 'bg-red-100 text-red-800'
      };
    } else if (image.fileSize > 200000) { // > 200KB
      return {
        status: 'medium',
        label: 'Compressão média recomendada',
        color: 'bg-yellow-100 text-yellow-800'
      };
    } else {
      return {
        status: 'good',
        label: 'Tamanho adequado',
        color: 'bg-green-100 text-green-800'
      };
    }
  };
  
  const handleImageUploaded = (imageUrl: string) => {
    if (selectedImage) {
      onUpdateImage(selectedImage.blockId, selectedImage.imageType, imageUrl);
      
      // Update the images list
      setImages(images.map(img => 
        img.blockId === selectedImage.blockId && img.imageType === selectedImage.imageType
          ? { ...img, url: imageUrl, optimized: true }
          : img
      ));
      
      setSelectedImage(null);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Otimizar Imagens</span>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Otimização de Imagens</DialogTitle>
          <DialogDescription>
            Analise e otimize as imagens da sua descrição para melhorar o SEO e o tempo de carregamento.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="analysis" className="flex flex-col flex-1 h-full">
          <TabsList className="px-4 pt-2">
            <TabsTrigger value="analysis">Análise</TabsTrigger>
            <TabsTrigger value="optimize">Otimizar</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1 p-4">
            <TabsContent value="analysis" className="m-0">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo</CardTitle>
                    <CardDescription>
                      {images.length} imagens encontradas na descrição
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Tamanho total</p>
                        <p className="text-2xl font-bold">
                          {getFileSize(images.reduce((acc, img) => acc + (img.fileSize || 0), 0))}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Status de otimização</p>
                        <div className="mt-2">
                          <Progress 
                            value={images.filter(img => img.optimized).length / images.length * 100} 
                            className="h-2 w-full" 
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {images.filter(img => img.optimized).length} de {images.length} imagens otimizadas
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Imagens encontradas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {images.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <FileImage className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2">Nenhuma imagem encontrada na descrição</p>
                        </div>
                      ) : (
                        images.map((image, index) => {
                          const status = getOptimizationStatus(image);
                          return (
                            <div key={index} className="flex items-center space-x-4 border-b pb-4 last:border-0 last:pb-0">
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                <img src={image.url} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {image.blockType} - {image.imageType}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Tamanho: {getFileSize(image.fileSize)}
                                </p>
                                <Badge className={status.color + " mt-2"}>
                                  {status.label}
                                </Badge>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex-shrink-0"
                                onClick={() => setSelectedImage(image)}
                              >
                                <Upload className="h-4 w-4 mr-1" />
                                Substituir
                              </Button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Dicas de otimização</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>Comprima imagens antes de enviá-las</li>
                      <li>Use o formato WebP sempre que possível</li>
                      <li>Dimensione as imagens para o tamanho necessário</li>
                      <li>Use texto alternativo (alt) para todas as imagens</li>
                      <li>Evite imagens com mais de 200KB</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="optimize" className="m-0">
              {selectedImage ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Substituir Imagem</CardTitle>
                    <CardDescription>
                      Carregue uma imagem otimizada para substituir a existente
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="w-64 h-64 bg-gray-100 rounded overflow-hidden">
                          <img src={selectedImage.url} alt="" className="w-full h-full object-contain" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{selectedImage.blockType} - {selectedImage.imageType}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Tamanho atual: {getFileSize(selectedImage.fileSize)}
                        </p>
                      </div>
                      <div className="mt-6">
                        <ImageUpload onImageUploaded={handleImageUploaded} />
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setSelectedImage(null)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-xl font-medium">Selecione uma imagem para otimizar</p>
                  <p className="mt-2 text-gray-500">
                    Vá para a aba "Análise" e clique em "Substituir" em uma imagem
                  </p>
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ImageOptimizer;
