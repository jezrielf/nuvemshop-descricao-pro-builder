import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Template, Block, ProductCategory } from '@/types/editor';
import { BlockType } from '@/types/editor/base';
import { useToast } from '@/hooks/use-toast';
import { convertBlocks, parseTemplateBlocks } from '@/utils/blockConverter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { createBlock } from '@/utils/blockCreators/createBlock';
import BlockRenderer from '@/components/blocks/BlockRenderer';

interface EditTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: Template;
  onUpdate: (template: Template) => void;
}

export const EditTemplateDialog: React.FC<EditTemplateDialogProps> = ({
  open,
  onClose,
  template,
  onUpdate,
}) => {
  const [name, setName] = useState(template.name);
  const [category, setCategory] = useState<ProductCategory>(template.category);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [previewBlockId, setPreviewBlockId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Ensure blocks are properly typed when the dialog opens
    setBlocks(convertBlocks(template.blocks));
    setName(template.name);
    setCategory(template.category);
  }, [template]);

  const handleUpdate = () => {
    if (!name.trim()) {
      toast({
        title: "Nome inválido",
        description: "Por favor, insira um nome para o template.",
        variant: "destructive",
      });
      return;
    }

    const updatedTemplate: Template = {
      ...template,
      name: name,
      category: category,
      blocks: blocks,
    };

    onUpdate(updatedTemplate);
    onClose();
    toast({
      title: "Template atualizado",
      description: "O template foi atualizado com sucesso.",
    });
  };

  // Blocos disponíveis para adição
  const availableBlockTypes: { type: BlockType; name: string }[] = [
    { type: 'hero', name: 'Banner Principal' },
    { type: 'text', name: 'Texto' },
    { type: 'features', name: 'Recursos' },
    { type: 'benefits', name: 'Benefícios' },
    { type: 'specifications', name: 'Especificações' },
    { type: 'image', name: 'Imagem' },
    { type: 'gallery', name: 'Galeria' },
    { type: 'imageText', name: 'Imagem + Texto' },
    { type: 'textImage', name: 'Texto + Imagem' },
    { type: 'faq', name: 'Perguntas Frequentes' },
    { type: 'cta', name: 'Chamada para Ação' },
    { type: 'video', name: 'Vídeo' },
  ];

  const handleAddBlock = (blockType: BlockType) => {
    const newBlock = createBlock(blockType);
    setBlocks(prev => [...prev, newBlock]);
    toast({
      title: "Bloco adicionado",
      description: `Um bloco de "${blockType}" foi adicionado ao template`,
    });
  };

  const handleRemoveBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    toast({
      title: "Bloco removido",
      description: "O bloco foi removido do template",
    });
  };

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blockIndex = blocks.findIndex(block => block.id === blockId);
    if (blockIndex === -1) return;

    const newBlocks = [...blocks];
    
    if (direction === 'up' && blockIndex > 0) {
      [newBlocks[blockIndex], newBlocks[blockIndex - 1]] = [newBlocks[blockIndex - 1], newBlocks[blockIndex]];
    } else if (direction === 'down' && blockIndex < newBlocks.length - 1) {
      [newBlocks[blockIndex], newBlocks[blockIndex + 1]] = [newBlocks[blockIndex + 1], newBlocks[blockIndex]];
    }

    setBlocks(newBlocks);
  };

  const toggleBlockPreview = (blockId: string) => {
    setPreviewBlockId(prevId => prevId === blockId ? null : blockId);
  };

  const handleCategoryChange = (value: string) => {
    // Cast the string value to ProductCategory
    setCategory(value as ProductCategory);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Editar Template</DialogTitle>
          <DialogDescription>
            Edite as informações e os blocos do template
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="blocks">Gerenciar Blocos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supplements">Suplementos</SelectItem>
                  <SelectItem value="clothing">Vestuário</SelectItem>
                  <SelectItem value="accessories">Acessórios</SelectItem>
                  <SelectItem value="shoes">Calçados</SelectItem>
                  <SelectItem value="electronics">Eletrônicos</SelectItem>
                  <SelectItem value="energy">Energia</SelectItem>
                  <SelectItem value="Casa e decoração">Casa e decoração</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="blocks" className="h-[400px] py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              {/* Lista de blocos disponíveis */}
              <div className="bg-muted/20 p-3 rounded-md">
                <h3 className="text-sm font-medium mb-2">Adicionar Blocos</h3>
                <ScrollArea className="h-[320px]">
                  <div className="space-y-2">
                    {availableBlockTypes.map((blockType) => (
                      <Button 
                        key={blockType.type} 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-left"
                        onClick={() => handleAddBlock(blockType.type)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {blockType.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              {/* Blocos do template */}
              <div className="lg:col-span-2">
                <h3 className="text-sm font-medium mb-2">Blocos do Template ({blocks.length})</h3>
                <ScrollArea className="h-[320px] border rounded-md p-2">
                  {blocks.length > 0 ? (
                    <div className="space-y-2">
                      {blocks.map((block, index) => (
                        <div key={block.id}>
                          <div className="border rounded-md p-2 bg-background flex items-center justify-between">
                            <div>
                              <span className="text-sm font-medium">{block.title}</span>
                              <span className="text-xs text-muted-foreground ml-2">({block.type})</span>
                            </div>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => toggleBlockPreview(block.id)}
                                title="Visualizar"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleMoveBlock(block.id, 'up')}
                                disabled={index === 0}
                                title="Mover para cima"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleMoveBlock(block.id, 'down')}
                                disabled={index === blocks.length - 1}
                                title="Mover para baixo"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleRemoveBlock(block.id)}
                                title="Remover"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {previewBlockId === block.id && (
                            <div className="mt-2 border rounded-md p-4 bg-muted/10">
                              <BlockRenderer block={block} isPreview={true} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">
                        Adicione blocos ao template usando as opções à esquerda
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleUpdate}>
            Atualizar Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
