
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Template, Block } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';
import { useTemplateStore } from '@/store/templates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { BlockType } from '@/types/editor/blocks';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { convertBlocks } from '@/utils/blockConverter';
import { ImportHtmlSection } from './ImportHtmlSection';
import { ProductCategory } from '@/types/editor';

interface NewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
}

export const NewTemplateDialog: React.FC<NewTemplateDialogProps> = ({
  open,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('other');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [previewBlockId, setPreviewBlockId] = useState<string | null>(null);
  const { createTemplate } = useTemplateStore();
  const { toast } = useToast();

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
    setBlocks(convertBlocks([...blocks, newBlock]));
    toast({
      title: "Bloco adicionado",
      description: `Um bloco de "${blockType}" foi adicionado ao template`,
    });
  };

  const handleRemoveBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
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

    setBlocks(convertBlocks(newBlocks));
  };

  const toggleBlockPreview = (blockId: string) => {
    setPreviewBlockId(prevId => prevId === blockId ? null : blockId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Nome inválido",
        description: "Por favor, insira um nome para o template.",
        variant: "destructive",
      });
      return;
    }

    const newTemplate: Omit<Template, "id"> = {
      name: name,
      category: category,
      blocks: blocks
    };

    try {
      await createTemplate(newTemplate);
      toast({
        title: "Template criado",
        description: "O template foi criado com sucesso.",
      });
      onClose();
    } catch (error) {
      console.error("Error creating template:", error);
      toast({
        title: "Erro ao criar template",
        description: "Ocorreu um erro ao criar o template. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setName('');
    setCategory('other');
    setBlocks([]);
    setActiveTab('basic');
    setPreviewBlockId(null);
  };

  const handleTemplateFromHtml = (generatedTemplate: Template) => {
    setName(generatedTemplate.name);
    setCategory(generatedTemplate.category as string);
    setBlocks(convertBlocks(generatedTemplate.blocks));
    setActiveTab('blocks');
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetForm();
        }
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Novo Template</DialogTitle>
          <DialogDescription>
            Crie um novo template adicionando informações básicas e blocos de conteúdo, ou importe de um HTML existente
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="blocks">Adicionar Blocos</TabsTrigger>
              <TabsTrigger value="import">Importar HTML</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome do template"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={category}
                  onValueChange={setCategory}
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
                          type="button"
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
                                  type="button"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleMoveBlock(block.id, 'up')}
                                  disabled={index === 0}
                                  title="Mover para cima"
                                  type="button"
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleMoveBlock(block.id, 'down')}
                                  disabled={index === blocks.length - 1}
                                  title="Mover para baixo"
                                  type="button"
                                >
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleRemoveBlock(block.id)}
                                  title="Remover"
                                  type="button"
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

            <TabsContent value="import" className="py-4">
              <ImportHtmlSection 
                onTemplateGenerated={handleTemplateFromHtml}
                selectedCategory={category as ProductCategory}
              />
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Template
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
