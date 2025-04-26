import React, { useState } from 'react';
import { CarouselBlock as CarouselBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface CarouselBlockProps {
  block: CarouselBlockType;
  isPreview?: boolean;
}

const CarouselBlock: React.FC<CarouselBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock } = useEditorStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImageChange = (index: number, field: keyof typeof block.images[0], value: string) => {
    const updatedImages = [...block.images];
    updatedImages[index] = {
      ...updatedImages[index],
      [field]: value
    };
    updateBlock(block.id, { images: updatedImages });
  };

  const handleAddImage = () => {
    const newImage = {
      id: uuidv4(),
      src: 'https://via.placeholder.com/800x600?text=Nova+Imagem',
      alt: 'Nova imagem',
      caption: ''
    };
    updateBlock(block.id, { images: [...block.images, newImage] });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...block.images];
    updatedImages.splice(index, 1);
    updateBlock(block.id, { images: updatedImages });
    if (currentSlide >= updatedImages.length) {
      setCurrentSlide(Math.max(0, updatedImages.length - 1));
    }
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === block.images.length - 1)
    ) {
      return;
    }

    const updatedImages = [...block.images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = updatedImages[index];
    updatedImages[index] = updatedImages[newIndex];
    updatedImages[newIndex] = temp;
    
    updateBlock(block.id, { images: updatedImages });
    setCurrentSlide(newIndex);
  };

  const handleToggleOption = (option: keyof CarouselBlockType, value: boolean) => {
    updateBlock(block.id, { [option]: value });
  };

  const handleSpeedChange = (value: number[]) => {
    updateBlock(block.id, { autoplaySpeed: value[0] });
  };

  if (isPreview) {
    return (
      <BlockWrapper block={block} isEditing={false}>
        <div className="carousel-container relative">
          {block.images?.length > 0 ? (
            <div className="carousel-inner">
              <div className="relative">
                <img 
                  src={block.images[currentSlide].src} 
                  alt={block.images[currentSlide].alt || ''} 
                  className="w-full h-auto rounded-lg" 
                />
                {block.images[currentSlide].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                    {block.images[currentSlide].caption}
                  </div>
                )}
                
                {/* Arrows */}
                {block.showArrows && block.images.length > 1 && (
                  <>
                    <button 
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      onClick={() => setCurrentSlide((prev) => (prev === 0 ? block.images.length - 1 : prev - 1))}
                    >
                      <ArrowUp className="rotate-90" size={20} />
                    </button>
                    <button 
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      onClick={() => setCurrentSlide((prev) => (prev === block.images.length - 1 ? 0 : prev + 1))}
                    >
                      <ArrowDown className="rotate-90" size={20} />
                    </button>
                  </>
                )}
                
                {/* Dots */}
                {block.showDots && block.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {block.images.map((_, index) => (
                      <button 
                        key={index} 
                        className={`h-3 w-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                        onClick={() => setCurrentSlide(index)}
                      ></button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 p-12 flex items-center justify-center rounded-lg">
              <p className="text-gray-400">Nenhuma imagem adicionada ao carrossel</p>
            </div>
          )}
        </div>
      </BlockWrapper>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={true}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Configurações do Carrossel</h3>
          <Button onClick={handleAddImage} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" /> Adicionar Imagem
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="autoplay">Reprodução Automática</Label>
              <Switch 
                id="autoplay" 
                checked={block.autoplay} 
                onCheckedChange={(checked) => handleToggleOption('autoplay', checked)} 
              />
            </div>
            
            {block.autoplay && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="autoplaySpeed">Velocidade (ms)</Label>
                  <span className="text-sm">{block.autoplaySpeed}ms</span>
                </div>
                <Slider 
                  id="autoplaySpeed"
                  min={1000} 
                  max={10000} 
                  step={500} 
                  value={[block.autoplaySpeed]} 
                  onValueChange={handleSpeedChange} 
                />
              </div>
            )}
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="showArrows">Mostrar Setas</Label>
              <Switch 
                id="showArrows" 
                checked={block.showArrows} 
                onCheckedChange={(checked) => handleToggleOption('showArrows', checked)} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="showDots">Mostrar Indicadores</Label>
              <Switch 
                id="showDots" 
                checked={block.showDots} 
                onCheckedChange={(checked) => handleToggleOption('showDots', checked)} 
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="infinite">Loop Infinito</Label>
              <Switch 
                id="infinite" 
                checked={block.infinite} 
                onCheckedChange={(checked) => handleToggleOption('infinite', checked)} 
              />
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <h4 className="text-sm font-medium mb-2">Pré-visualização</h4>
            {block.images.length > 0 ? (
              <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                <img 
                  src={block.images[currentSlide].src} 
                  alt={block.images[currentSlide].alt} 
                  className="w-full h-full object-cover"
                />
                {block.images[currentSlide].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 text-xs">
                    {block.images[currentSlide].caption}
                  </div>
                )}
                
                {block.images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {block.images.map((_, index) => (
                      <button 
                        key={index} 
                        className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                        onClick={() => setCurrentSlide(index)}
                      ></button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded flex items-center justify-center">
                <p className="text-xs text-gray-400">Sem imagens</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Imagens do Carrossel</h4>
          
          {block.images.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-500">Nenhuma imagem adicionada</p>
              <Button onClick={handleAddImage} variant="outline" className="mt-2">
                <Plus className="h-4 w-4 mr-1" /> Adicionar Imagem
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {block.images.map((image, index) => (
                <div key={image.id} className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Imagem {index + 1}</h5>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleMoveImage(index, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleMoveImage(index, 'down')}
                        disabled={index === block.images.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`image-src-${index}`}>URL da Imagem</Label>
                      <Input 
                        id={`image-src-${index}`}
                        value={image.src} 
                        onChange={(e) => handleImageChange(index, 'src', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`image-alt-${index}`}>Texto Alternativo</Label>
                      <Input 
                        id={`image-alt-${index}`}
                        value={image.alt} 
                        onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`image-caption-${index}`}>Legenda (opcional)</Label>
                    <Input 
                      id={`image-caption-${index}`}
                      value={image.caption || ''} 
                      onChange={(e) => handleImageChange(index, 'caption', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Imagem+Inválida';
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {block.images.length > 0 && (
            <Button onClick={handleAddImage} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-1" /> Adicionar Outra Imagem
            </Button>
          )}
        </div>
      </div>
    </BlockWrapper>
  );
};

export default CarouselBlock;
