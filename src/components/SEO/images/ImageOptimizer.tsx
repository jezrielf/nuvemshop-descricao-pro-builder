
import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogDescription 
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Image, Upload, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductDescription, Block } from '@/types/editor';
import ImageUpload from '@/components/ImageUpload';

interface ImageOptimizationResult {
  status: 'low' | 'medium' | 'high' | 'unknown';
  message: string;
  suggestions?: string[];
}

type ImageIssue = { 
  status: string;
  label: string;
  color: string;
} | "Desconhecido";

interface ImageInfo {
  blockId: string;
  blockType: string;
  imageUrl: string | undefined;
  imageType: string;
  issues: ImageIssue[];
  alt?: string;
}

interface ImageOptimizerProps {
  description: ProductDescription | null;
  onUpdateImage: (blockId: string, imageType: string, newImageUrl: string) => void;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({ description, onUpdateImage }) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  
  useEffect(() => {
    if (description && open) {
      scanDescriptionImages(description);
    }
  }, [description, open]);
  
  const scanDescriptionImages = (description: ProductDescription) => {
    const imagesList: ImageInfo[] = [];
    
    description.blocks.forEach((block: Block) => {
      // Check for hero block with background image
      if (block.type === 'hero' && 'backgroundImage' in block && block.backgroundImage) {
        imagesList.push({
          blockId: block.id,
          blockType: 'Hero',
          imageUrl: block.backgroundImage,
          imageType: 'backgroundImage',
          issues: analyzeImage(block.backgroundImage),
          alt: block.title || 'Hero Image'
        });
      }
      
      // Check for image block
      if (block.type === 'image' && 'src' in block && block.src) {
        imagesList.push({
          blockId: block.id,
          blockType: 'Image',
          imageUrl: block.src,
          imageType: 'src',
          issues: analyzeImage(block.src),
          alt: ('alt' in block ? block.alt : block.title) || ''
        });
      }
      
      // Check for imageText and textImage blocks
      if ((block.type === 'imageText' || block.type === 'textImage') && 'imageSrc' in block && block.imageSrc) {
        imagesList.push({
          blockId: block.id,
          blockType: block.type === 'imageText' ? 'Image + Text' : 'Text + Image',
          imageUrl: block.imageSrc,
          imageType: 'imageSrc',
          issues: analyzeImage(block.imageSrc),
          alt: ('alt' in block ? block.alt : block.title) || ''
        });
      }
      
      // Check for gallery block
      if (block.type === 'gallery' && 'images' in block && block.images && block.images.length > 0) {
        block.images.forEach((image, index) => {
          if (image.src) {
            imagesList.push({
              blockId: block.id,
              blockType: 'Gallery',
              imageUrl: image.src,
              imageType: index.toString(), // Use index as the image identifier
              issues: analyzeImage(image.src),
              alt: image.alt || `Gallery Image ${index + 1}`
            });
          }
        });
      }
    });
    
    setImages(imagesList);
  };
  
  const analyzeImage = (imageUrl: string): ImageIssue[] => {
    const issues: ImageIssue[] = [];
    
    // Check if it's a placeholder
    if (imageUrl.includes('placeholder') || imageUrl.includes('dummy')) {
      issues.push({
        status: 'error',
        label: 'Placeholder detectado',
        color: 'destructive'
      });
    }
    
    // Check file format (assuming we can extract it from URL)
    const extension = imageUrl.split('.').pop()?.toLowerCase();
    if (extension === 'jpg' || extension === 'jpeg') {
      issues.push({
        status: 'warning',
        label: 'Formato JPG',
        color: 'warning'
      });
    } else if (extension === 'png') {
      issues.push({
        status: 'warning',
        label: 'Formato PNG',
        color: 'warning'
      });
    } else if (extension === 'webp') {
      issues.push({
        status: 'success',
        label: 'Formato WebP',
        color: 'success'
      });
    } else {
      issues.push({
        status: 'info',
        label: 'Formato desconhecido',
        color: 'muted'
      });
    }
    
    return issues;
  };
  
  const handleImageUpdated = (imageUrl: string) => {
    if (selectedImage) {
      onUpdateImage(selectedImage.blockId, selectedImage.imageType, imageUrl);
      
      // Update our local state with the new image
      setImages(prevImages => 
        prevImages.map(img => 
          img.blockId === selectedImage.blockId && img.imageType === selectedImage.imageType
            ? { ...img, imageUrl, issues: analyzeImage(imageUrl) }
            : img
        )
      );
      
      setSelectedImage(null);
    }
  };
  
  const getIssueStatusCounts = () => {
    const counts = {
      error: 0,
      warning: 0,
      success: 0,
      info: 0,
      total: images.length
    };
    
    images.forEach(image => {
      image.issues.forEach(issue => {
        if (typeof issue !== 'string' && issue.status in counts) {
          counts[issue.status as keyof typeof counts]++;
        }
      });
    });
    
    return counts;
  };
  
  const statusCounts = getIssueStatusCounts();
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Otimização de Imagens</span>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Otimização de Imagens</DialogTitle>
          <DialogDescription>
            Analise e otimize as imagens do seu produto para melhorar o SEO e o tempo de carregamento.
          </DialogDescription>
        </DialogHeader>
        
        {selectedImage ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Atualizar Imagem</h3>
              <Button variant="outline" onClick={() => setSelectedImage(null)}>
                Voltar para lista
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Imagem Atual:</p>
                <div className="border rounded-md p-2">
                  <img 
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.alt || "Imagem do produto"} 
                    className="max-h-[200px] mx-auto object-contain"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedImage.issues.map((issue, i) => (
                    <Badge key={i} variant={typeof issue !== 'string' ? issue.color as any : 'default'}>
                      {typeof issue !== 'string' ? issue.label : issue}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Enviar Nova Imagem:</p>
                <ImageUpload onImageUploaded={handleImageUpdated} />
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Recomendações para otimização:</h4>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Use o formato WebP para melhor compressão e qualidade</li>
                <li>Mantenha o tamanho do arquivo abaixo de 200KB</li>
                <li>Dimensione suas imagens adequadamente (800-1200px de largura para imagens maiores)</li>
                <li>Sempre inclua texto alternativo descritivo</li>
                <li>Evite imagens com texto - use HTML para texto sobre as imagens</li>
              </ul>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Todas ({statusCounts.total})</TabsTrigger>
              <TabsTrigger value="issues">Problemas ({statusCounts.error + statusCounts.warning})</TabsTrigger>
              <TabsTrigger value="optimized">Otimizadas ({statusCounts.success})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="h-[500px]">
              <ScrollArea className="h-full pr-4">
                {images.length > 0 ? (
                  <div className="space-y-3">
                    {images.map((image, index) => (
                      <Card key={`${image.blockId}-${index}`}>
                        <div className="flex">
                          <div className="w-24 h-24 p-2 flex items-center justify-center">
                            {image.imageUrl ? (
                              <img 
                                src={image.imageUrl} 
                                alt={image.alt || "Image"} 
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : (
                              <Image className="w-12 h-12 text-gray-300" />
                            )}
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{image.blockType}</h3>
                                <p className="text-sm text-gray-500">
                                  {image.alt || "Sem texto alternativo"}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {image.issues.map((issue, i) => (
                                    <Badge key={i} variant={(typeof issue !== 'string' && issue.color) as any || 'default'} className="text-xs">
                                      {typeof issue !== 'string' ? issue.label : issue}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button size="sm" onClick={() => setSelectedImage(image)}>
                                Otimizar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
                    <Search className="h-10 w-10 mb-4 opacity-20" />
                    <h3 className="text-lg font-medium">Nenhuma imagem encontrada</h3>
                    <p className="max-w-md">Sua descrição de produto não contém imagens. Adicione imagens para melhorar o engajamento e a visibilidade do produto.</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="issues" className="h-[500px]">
              <ScrollArea className="h-full pr-4">
                {images.filter(img => img.issues.some(issue => typeof issue !== 'string' && (issue.status === 'error' || issue.status === 'warning'))).length > 0 ? (
                  <div className="space-y-3">
                    {images
                      .filter(img => img.issues.some(issue => typeof issue !== 'string' && (issue.status === 'error' || issue.status === 'warning')))
                      .map((image, index) => (
                        <Card key={`issues-${image.blockId}-${index}`}>
                          <div className="flex">
                            <div className="w-24 h-24 p-2 flex items-center justify-center">
                              {image.imageUrl ? (
                                <img 
                                  src={image.imageUrl} 
                                  alt={image.alt || "Image"} 
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                <Image className="w-12 h-12 text-gray-300" />
                              )}
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{image.blockType}</h3>
                                  <p className="text-sm text-gray-500">
                                    {image.alt || "Sem texto alternativo"}
                                  </p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {image.issues.map((issue, i) => (
                                      <Badge key={i} variant={(typeof issue !== 'string' && issue.color) as any || 'default'} className="text-xs">
                                        {typeof issue !== 'string' ? issue.label : issue}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <Button size="sm" onClick={() => setSelectedImage(image)}>
                                  Otimizar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
                    <Search className="h-10 w-10 mb-4 opacity-20" />
                    <h3 className="text-lg font-medium">Nenhum problema encontrado</h3>
                    <p className="max-w-md">Não foram encontrados problemas nas imagens da sua descrição de produto.</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="optimized" className="h-[500px]">
              <ScrollArea className="h-full pr-4">
                {images.filter(img => img.issues.some(issue => typeof issue !== 'string' && issue.status === 'success')).length > 0 ? (
                  <div className="space-y-3">
                    {images
                      .filter(img => img.issues.some(issue => typeof issue !== 'string' && issue.status === 'success'))
                      .map((image, index) => (
                        <Card key={`optimized-${image.blockId}-${index}`}>
                          <div className="flex">
                            <div className="w-24 h-24 p-2 flex items-center justify-center">
                              {image.imageUrl ? (
                                <img 
                                  src={image.imageUrl} 
                                  alt={image.alt || "Image"} 
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                <Image className="w-12 h-12 text-gray-300" />
                              )}
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{image.blockType}</h3>
                                  <p className="text-sm text-gray-500">
                                    {image.alt || "Sem texto alternativo"}
                                  </p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {image.issues.map((issue, i) => (
                                      <Badge key={i} variant={(typeof issue !== 'string' && issue.color) as any || 'default'} className="text-xs">
                                        {typeof issue !== 'string' ? issue.label : issue}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <Button size="sm" onClick={() => setSelectedImage(image)}>
                                  Revisar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
                    <Search className="h-10 w-10 mb-4 opacity-20" />
                    <h3 className="text-lg font-medium">Nenhuma imagem otimizada</h3>
                    <p className="max-w-md">Você ainda não tem imagens completamente otimizadas. Comece a otimizar suas imagens na guia "Todas".</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageOptimizer;
