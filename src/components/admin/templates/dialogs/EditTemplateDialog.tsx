import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Template, Block, BlockType, ProductCategory } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';
import { useTemplateStore } from '@/store/templates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { createBlock } from '@/utils/blockCreators/createBlock';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { convertBlocks } from '@/utils/blockConverter';
import ImportHtmlSection from './components/ImportHtmlSection';

interface EditTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: Template | null;
}

export const EditTemplateDialog: React.FC<EditTemplateDialogProps> = ({
  open,
  onClose,
  template,
}) => {
  const [editedName, setEditedName] = useState('');
  const [editedCategory, setEditedCategory] = useState<ProductCategory>('other');
  const [editedBlocks, setEditedBlocks] = useState<Block[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [previewBlockId, setPreviewBlockId] = useState<string | null>(null);
  const { updateTemplate } = useTemplateStore();
  const { toast } = useToast();

  useEffect(() => {
    if (template) {
      setEditedName(template.name);
      setEditedCategory(template.category);
      setEditedBlocks(template.blocks);
    }
  }, [template]);

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
    setEditedBlocks(convertBlocks([...editedBlocks, newBlock]));
    toast({
      title: "Bloco adicionado",
      description: `Um bloco de "${blockType}" foi adicionado ao template`,
    });
  };

  const handleRemoveBlock = (blockId: string) => {
    setEditedBlocks(editedBlocks.filter(block => block.id !== blockId));
    toast({
      title: "Bloco removido",
      description: "O bloco foi removido do template",
    });
  };

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blockIndex = editedBlocks.findIndex(block => block.id === blockId);
    if (blockIndex === -1) return;

    const newBlocks = [...editedBlocks];
    
    if (direction === 'up' && blockIndex > 0) {
      [newBlocks[blockIndex], newBlocks[blockIndex - 1]] = [newBlocks[blockIndex - 1], newBlocks[blockIndex]];
    } else if (direction === 'down' && blockIndex < newBlocks.length - 1) {
      [newBlocks[blockIndex], newBlocks[blockIndex + 1]] = [newBlocks[blockIndex + 1], newBlocks[blockIndex]];
    }

    setEditedBlocks(convertBlocks(newBlocks));
  };

  const toggleBlockPreview = (blockId: string) => {
    setPreviewBlockId(prevId => prevId === blockId ? null : blockId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!template) {
      toast({
        title: "Erro",
        description: "Nenhum template selecionado para editar.",
        variant: "destructive",
      });
      return;
    }

    if (!editedName.trim()) {
      toast({
        title: "Nome inválido",
        description: "Por favor, insira um nome para o template.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateTemplate(template.id, {
        name: editedName,
        category: editedCategory,
        blocks: editedBlocks,
      });
      toast({
        title: "Template atualizado",
        description: "O template foi atualizado com sucesso.",
      });
      onClose();
    } catch (error) {
      console.error("Error updating template:", error);
      toast({
        title: "Erro ao atualizar template",
        description: "Ocorreu um erro ao atualizar o template. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditedName('');
    setEditedCategory('other');
    setEditedBlocks([]);
    setActiveTab('basic');
    setPreviewBlockId(null);
  };

  const handleTemplateFromHtml = (generatedTemplate: Template) => {
    setEditedName(generatedTemplate.name);
    setEditedCategory(generatedTemplate.category);
    setEditedBlocks(convertBlocks(generatedTemplate.blocks));
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
          <DialogTitle>Editar Template</DialogTitle>
          <DialogDescription>
            Edite as informações básicas e os blocos de conteúdo do template, ou importe de um HTML existente
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="blocks">Editar Blocos</TabsTrigger>
              <TabsTrigger value="import">Importar HTML</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Nome do template"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                
              <Select
                value={editedCategory || "other"}
                onValueChange={(value: ProductCategory) => setEditedCategory(value)}
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
                  <h3 className="text-sm font-medium mb-2">Blocos do Template ({editedBlocks.length})</h3>
                  <ScrollArea className="h-[320px] border rounded-md p-2">
                    {editedBlocks.length > 0 ? (
                      <div className="space-y-2">
                        {editedBlocks.map((block, index) => (
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
                                  disabled={index === editedBlocks.length - 1}
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
                selectedCategory={editedCategory as ProductCategory}
              />
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Template
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
