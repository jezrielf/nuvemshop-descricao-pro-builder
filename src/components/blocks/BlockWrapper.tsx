
import React from 'react';
import { useEditorStore } from '@/store/editor';
import { ChevronDown, ChevronUp, Copy, Grip, Settings, Trash2, Eye, EyeOff, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface BlockWrapperProps {
  block: BlockBase;
  children: React.ReactNode;
  isEditing?: boolean;
}

// Mapeia valores de espaçamento para classes Tailwind
const spacingMap = {
  xs: '2',
  sm: '4',
  md: '6',
  lg: '8',
  xl: '12'
};

const BlockWrapper: React.FC<BlockWrapperProps> = ({ block, children, isEditing = false }) => {
  const { 
    selectedBlockId, 
    selectBlock, 
    removeBlock, 
    duplicateBlock, 
    moveBlockUp, 
    moveBlockDown,
    updateBlock
  } = useEditorStore();
  
  const isSelected = selectedBlockId === block.id;
  
  const handleSelectBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectBlock(block.id);
  };

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateBlock(block.id, { visible: !block.visible });
  };

  const updateStyle = (styleUpdates: Partial<BlockStyle>) => {
    const currentStyle = block.style || {};
    updateBlock(block.id, { 
      style: {
        ...currentStyle,
        ...styleUpdates
      }
    });
  };

  // Gera classes CSS baseadas nas opções de estilo do bloco
  const getStyleClasses = () => {
    if (!block.style) return '';
    
    const classes = [];
    
    // Background
    if (block.style.backgroundColor) {
      classes.push(`bg-[${block.style.backgroundColor}]`);
    }
    
    // Text color
    if (block.style.textColor) {
      classes.push(`text-[${block.style.textColor}]`);
    }
    
    // Font family
    if (block.style.fontFamily) {
      classes.push(`font-${block.style.fontFamily}`);
    }
    
    // Font size
    if (block.style.fontSize) {
      classes.push(`text-${block.style.fontSize}`);
    }
    
    // Text alignment
    if (block.style.textAlign) {
      classes.push(`text-${block.style.textAlign}`);
    }
    
    // Padding
    if (block.style.padding) {
      classes.push(`p-${spacingMap[block.style.padding]}`);
    }
    
    // Margin
    if (block.style.margin) {
      classes.push(`m-${spacingMap[block.style.margin]}`);
    }
    
    // Border
    if (block.style.hasBorder) {
      classes.push('border');
      if (block.style.borderColor) {
        classes.push(`border-[${block.style.borderColor}]`);
      }
    }
    
    // Border radius
    if (block.style.borderRadius) {
      classes.push(`rounded-${block.style.borderRadius === 'xs' ? 'sm' : 
                           block.style.borderRadius === 'sm' ? 'md' : 
                           block.style.borderRadius === 'md' ? 'lg' : 
                           block.style.borderRadius === 'lg' ? 'xl' : 
                           '2xl'}`);
    }
    
    // Shadow
    if (block.style.hasShadow) {
      classes.push('shadow-md');
    }
    
    return classes.join(' ');
  };
  
  return (
    <div 
      className={cn(
        "relative group mb-4 block-panel transition-all",
        isSelected && "block-selected",
        !block.visible && "opacity-50",
        getStyleClasses()
      )}
      onClick={handleSelectBlock}
    >
      <div className="absolute left-2 top-2 z-10 drag-handle">
        <Grip className="h-5 w-5" />
      </div>
      
      <div className="block-actions">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleVisibility}>
                {block.visible ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {block.visible ? 'Ocultar bloco' : 'Mostrar bloco'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Personalização do Bloco</h4>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Cores</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="bgcolor">Cor de fundo</Label>
                          <Input 
                            id="bgcolor"
                            type="color" 
                            value={block.style?.backgroundColor || '#ffffff'} 
                            onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="textcolor">Cor do texto</Label>
                          <Input 
                            id="textcolor"
                            type="color" 
                            value={block.style?.textColor || '#000000'} 
                            onChange={(e) => updateStyle({ textColor: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Tipografia</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="fontFamily">Família da fonte</Label>
                          <Select 
                            value={block.style?.fontFamily || 'sans'} 
                            onValueChange={(value: 'sans' | 'serif' | 'mono') => updateStyle({ fontFamily: value })}
                          >
                            <SelectTrigger id="fontFamily">
                              <SelectValue placeholder="Família da fonte" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sans">Sans-serif</SelectItem>
                              <SelectItem value="serif">Serif</SelectItem>
                              <SelectItem value="mono">Monospace</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="fontSize">Tamanho da fonte</Label>
                          <Select 
                            value={block.style?.fontSize || 'base'} 
                            onValueChange={(value: any) => updateStyle({ fontSize: value })}
                          >
                            <SelectTrigger id="fontSize">
                              <SelectValue placeholder="Tamanho da fonte" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="xs">Muito pequeno</SelectItem>
                              <SelectItem value="sm">Pequeno</SelectItem>
                              <SelectItem value="base">Normal</SelectItem>
                              <SelectItem value="lg">Grande</SelectItem>
                              <SelectItem value="xl">Muito grande</SelectItem>
                              <SelectItem value="2xl">Extra grande</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="textAlign">Alinhamento</Label>
                      <Select 
                        value={block.style?.textAlign || 'left'} 
                        onValueChange={(value: any) => updateStyle({ textAlign: value })}
                      >
                        <SelectTrigger id="textAlign">
                          <SelectValue placeholder="Alinhamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Esquerda</SelectItem>
                          <SelectItem value="center">Centro</SelectItem>
                          <SelectItem value="right">Direita</SelectItem>
                          <SelectItem value="justify">Justificado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Espaçamento</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="padding">Padding</Label>
                          <Select 
                            value={block.style?.padding || 'md'} 
                            onValueChange={(value: any) => updateStyle({ padding: value })}
                          >
                            <SelectTrigger id="padding">
                              <SelectValue placeholder="Padding" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="xs">Muito pequeno</SelectItem>
                              <SelectItem value="sm">Pequeno</SelectItem>
                              <SelectItem value="md">Médio</SelectItem>
                              <SelectItem value="lg">Grande</SelectItem>
                              <SelectItem value="xl">Muito grande</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="margin">Margem</Label>
                          <Select 
                            value={block.style?.margin || 'md'} 
                            onValueChange={(value: any) => updateStyle({ margin: value })}
                          >
                            <SelectTrigger id="margin">
                              <SelectValue placeholder="Margem" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="xs">Muito pequena</SelectItem>
                              <SelectItem value="sm">Pequena</SelectItem>
                              <SelectItem value="md">Média</SelectItem>
                              <SelectItem value="lg">Grande</SelectItem>
                              <SelectItem value="xl">Muito grande</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Borda e Sombra</h5>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hasBorder">Borda</Label>
                        <Switch 
                          id="hasBorder"
                          checked={block.style?.hasBorder || false} 
                          onCheckedChange={(checked) => updateStyle({ hasBorder: checked })}
                        />
                      </div>
                      
                      {block.style?.hasBorder && (
                        <div>
                          <Label htmlFor="borderColor">Cor da borda</Label>
                          <Input 
                            id="borderColor"
                            type="color" 
                            value={block.style?.borderColor || '#e5e7eb'} 
                            onChange={(e) => updateStyle({ borderColor: e.target.value })}
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hasShadow">Sombra</Label>
                        <Switch 
                          id="hasShadow"
                          checked={block.style?.hasShadow || false} 
                          onCheckedChange={(checked) => updateStyle({ hasShadow: checked })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="borderRadius">Arredondamento</Label>
                        <Select 
                          value={block.style?.borderRadius || 'md'} 
                          onValueChange={(value: any) => updateStyle({ borderRadius: value })}
                        >
                          <SelectTrigger id="borderRadius">
                            <SelectValue placeholder="Arredondamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="xs">Muito pequeno</SelectItem>
                            <SelectItem value="sm">Pequeno</SelectItem>
                            <SelectItem value="md">Médio</SelectItem>
                            <SelectItem value="lg">Grande</SelectItem>
                            <SelectItem value="xl">Muito grande</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              Personalizar aparência
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={(e) => {
                e.stopPropagation();
                moveBlockUp(block.id);
              }}>
                <ChevronUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mover para cima</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={(e) => {
                e.stopPropagation();
                moveBlockDown(block.id);
              }}>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mover para baixo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={(e) => {
                e.stopPropagation();
                duplicateBlock(block.id);
              }}>
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicar</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={(e) => {
                e.stopPropagation();
                removeBlock(block.id);
              }}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remover</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="pt-8 pb-2 px-2">
        <div className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
          <span>{block.title || block.type}</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{block.columns} coluna(s)</span>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default BlockWrapper;
