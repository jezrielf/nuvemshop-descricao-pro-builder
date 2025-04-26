
import React, { useState } from 'react';
import { CarouselBlock as CarouselBlockType } from '@/types/editor/blocks/carousel';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ChevronLeft, ChevronRight, Plus, Trash } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface CarouselBlockProps {
  block: CarouselBlockType;
  isPreview?: boolean;
}

const CarouselBlock: React.FC<CarouselBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock } = useEditorStore();
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1); // Para fins de preview
  
  const handleImageUpdate = (index: number, field: string, value: string) => {
    const updatedImages = [...block.images];
    updatedImages[index] = { ...updatedImages[index], [field]: value };
    
    updateBlock(block.id, { images: updatedImages });
  };
  
  const handleAddImage = () => {
    const newImage = {
      id: uuidv4(),
      src: 'https://via.placeholder.com/800x400',
      alt: `Imagem ${block.images.length + 1}`,
      caption: `Legenda da imagem ${block.images.length + 1}`
    };
    
    updateBlock(block.id, { images: [...block.images, newImage] });
  };
  
  const handleRemoveImage = (index: number) => {
    const updatedImages = [...block.images];
    updatedImages.splice(index, 1);
    
    // Ajustar o activeSlide para não ficar fora dos limites
    if (activeSlide >= updatedImages.length) {
      setActiveSlide(Math.max(0, updatedImages.length - 1));
    }
    
    updateBlock(block.id, { images: updatedImages });
  };
  
  const form = useForm({
    defaultValues: {
      autoplay: block.autoplay ?? true,
      autoplaySpeed: block.autoplaySpeed ?? 3000,
      showArrows: block.showArrows ?? true,
      showDots: block.showDots ?? true,
      infinite: block.infinite ?? true
    }
  });
  
  const nextSlide = () => {
    setActiveSlide((prev) => 
      block.infinite 
        ? (prev + 1) % block.images.length 
        : Math.min(prev + 1, block.images.length - 1)
    );
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => 
      block.infinite 
        ? (prev - 1 + block.images.length) % block.images.length 
        : Math.max(prev - 1, 0)
    );
  };
  
  // Efeito de autoplay para o preview
  React.useEffect(() => {
    if (!isPreview || !block.autoplay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, block.autoplaySpeed || 3000);
    
    return () => clearInterval(interval);
  }, [isPreview, block.autoplay, block.autoplaySpeed, activeSlide, block.images.length]);
  
  const handleUpdateSetting = (field: string, value: any) => {
    updateBlock(block.id, { [field]: value });
  };
  
  const previewClassName = 
    "transition-all transform duration-500 h-full flex items-center justify-center";
  
  if (isPreview) {
    return (
      <BlockWrapper block={block} isEditing={false}>
        <div className="relative overflow-hidden">
          <div className="relative h-[400px]">
            {/* Slides */}
            <div className="h-full whitespace-nowrap">
              {block.images.map((image, idx) => (
                <div 
                  key={image.id}
                  className={`${previewClassName} absolute inset-0 ${
                    idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className="w-full h-full relative">
                    <img 
                      src={image.src} 
                      alt={image.alt || `Slide ${idx + 1}`} 
                      className="object-contain w-full h-full"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                        {image.caption}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Arrows */}
            {block.showArrows && block.images.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute top-1/2 -translate-y-1/2 left-2 z-20 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute top-1/2 -translate-y-1/2 right-2 z-20 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            
            {/* Dots */}
            {block.showDots && block.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
                {block.images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`h-2 w-2 rounded-full mx-1 ${
                      idx === activeSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                    }`}
                    onClick={() => setActiveSlide(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </BlockWrapper>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={true}>
      <div className="space-y-6">
        <Tabs defaultValue="images">
          <TabsList className="w-full">
            <TabsTrigger value="images" className="flex-1">Imagens</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="images" className="space-y-4 pt-4">
            <div className="grid gap-4">
              {block.images.map((image, idx) => (
                <Card key={image.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3">
                        <div className="aspect-video bg-gray-100 relative mb-2 overflow-hidden rounded-md border border-gray-200">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="object-contain w-full h-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://placehold.co/600x400/EAEAEA/CCCCCC?text=Erro';
                            }}
                          />
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRemoveImage(idx)}
                          className="w-full"
                          disabled={block.images.length <= 1}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Remover Imagem
                        </Button>
                      </div>
                      
                      <div className="md:w-2/3 space-y-4">
                        <div>
                          <Label htmlFor={`image-${idx}-src`}>URL da Imagem</Label>
                          <Input 
                            id={`image-${idx}-src`}
                            value={image.src}
                            onChange={(e) => handleImageUpdate(idx, 'src', e.target.value)}
                            placeholder="https://exemplo.com/imagem.jpg"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`image-${idx}-alt`}>Texto Alternativo</Label>
                          <Input 
                            id={`image-${idx}-alt`}
                            value={image.alt}
                            onChange={(e) => handleImageUpdate(idx, 'alt', e.target.value)}
                            placeholder="Descrição da imagem"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`image-${idx}-caption`}>Legenda (opcional)</Label>
                          <Textarea 
                            id={`image-${idx}-caption`}
                            value={image.caption || ''}
                            onChange={(e) => handleImageUpdate(idx, 'caption', e.target.value)}
                            placeholder="Legenda da imagem"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" onClick={handleAddImage} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Imagem
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 pt-4">
            <Form {...form}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="autoplay"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Reprodução Automática</FormLabel>
                        <FormDescription>
                          Navegar automaticamente entre os slides
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            handleUpdateSetting('autoplay', checked);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {form.watch('autoplay') && (
                  <div className="space-y-2">
                    <Label>Velocidade de Reprodução (ms)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        defaultValue={[block.autoplaySpeed || 3000]}
                        min={1000}
                        max={10000}
                        step={500}
                        className="flex-1"
                        onValueChange={(value) => {
                          form.setValue('autoplaySpeed', value[0]);
                          handleUpdateSetting('autoplaySpeed', value[0]);
                        }}
                      />
                      <span className="w-16 text-center">
                        {form.watch('autoplaySpeed')}ms
                      </span>
                    </div>
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="showArrows"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Mostrar Setas</FormLabel>
                        <FormDescription>
                          Exibir botões para navegação
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            handleUpdateSetting('showArrows', checked);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="showDots"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Mostrar Indicadores</FormLabel>
                        <FormDescription>
                          Exibir pontos para indicar a posição atual
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            handleUpdateSetting('showDots', checked);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="infinite"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Loop Infinito</FormLabel>
                        <FormDescription>
                          Continuar navegação após o último slide
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            handleUpdateSetting('infinite', checked);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-4">Pré-visualização</h3>
          <div className="relative overflow-hidden rounded-lg border h-[300px]">
            {/* Slides */}
            <div className="h-full whitespace-nowrap">
              {block.images.map((image, idx) => (
                <div 
                  key={image.id}
                  className={`${previewClassName} absolute inset-0 ${
                    idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className="w-full h-full relative">
                    <img 
                      src={image.src} 
                      alt={image.alt || `Slide ${idx + 1}`} 
                      className="object-contain w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/600x400/EAEAEA/CCCCCC?text=Erro';
                      }}
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                        {image.caption}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation */}
            <div className="absolute z-20 bottom-4 left-0 right-0 flex justify-center items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={prevSlide}
                className="bg-white bg-opacity-75 hover:bg-opacity-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-1">
                {block.images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`h-2 w-2 rounded-full ${
                      idx === activeSlide ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setActiveSlide(idx)}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={nextSlide}
                className="bg-white bg-opacity-75 hover:bg-opacity-100"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default CarouselBlock;
