
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Template, ProductCategory, Block } from '@/types/editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCategoryName } from '../utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { ChevronUp, ChevronDown, Plus, Trash2, Edit, Save } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { useTemplateStore } from '@/store/templateStore';

interface EditTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: Template;
  onUpdate: (template: Partial<Template>) => void;
}

export const EditTemplateDialog: React.FC<EditTemplateDialogProps> = ({
  open,
  onClose,
  template,
  onUpdate,
}) => {
  const [name, setName] = useState(template.name);
  const [category, setCategory] = useState<string>(template.category);
  const [blocks, setBlocks] = useState<Block[]>([...template.blocks]);
  const [activeTab, setActiveTab] = useState('info');
  
  const { toast } = useToast();
  const { categories } = useTemplateStore();

  // Blocos disponíveis para adição
  const blockTypes = [
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

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira um nome para o template.",
        variant: "destructive",
      });
      return;
    }

    try {
      onUpdate({
        name,
        category,
        blocks,
      });
      
      toast({
        title: "Template atualizado",
        description: "O template foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar template:", error);
      toast({
        title: "Erro ao atualizar template",
        description: "Ocorreu um erro ao atualizar o template.",
        variant: "destructive",
      });
    }
  };

  const handleAddBlock = (type: string) => {
    const newBlock = createBlock(type as any, 1);
    setBlocks([...blocks, newBlock]);
    
    toast({
      title: "Bloco adicionado",
      description: `Um novo bloco de tipo "${type}" foi adicionado ao template.`,
    });
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    
    toast({
      title: "Bloco removido",
      description: "O bloco foi removido do template.",
    });
  };

  const handleMoveBlockUp = (id: string) => {
    const index = blocks.findIndex(block => block.id === id);
    if (index <= 0) return;
    
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const handleMoveBlockDown = (id: string) => {
    const index = blocks.findIndex(block => block.id === id);
    if (index === -1 || index === blocks.length - 1) return;
    
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    setBlocks(newBlocks);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Editar Template</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="blocks">Blocos</TabsTrigger>
            <TabsTrigger value="preview">Visualização</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="flex-1">
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome do Template</Label>
                <Input 
                  id="edit-name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Nome do template"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-category">Categoria</Label>
                <Select value={category} onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {getCategoryName(cat)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Este template contém {blocks.length} blocos.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="blocks" className="flex-1 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-full">
              {/* Lista de blocos disponíveis */}
              <div className="lg:col-span-2 border rounded-md p-3">
                <h3 className="text-sm font-medium mb-2">Adicionar Blocos</h3>
                <ScrollArea className="h-[50vh]">
                  <div className="space-y-2">
                    {blockTypes.map((blockType) => (
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
              <div className="lg:col-span-5">
                <h3 className="text-sm font-medium mb-2">Blocos do Template</h3>
                <ScrollArea className="h-[50vh] border rounded-md p-2">
                  {blocks.length > 0 ? (
                    <div className="space-y-2">
                      {blocks.map((block, index) => (
                        <div key={block.id} className="border rounded-md p-3 bg-muted/10">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className="font-medium">{block.title}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                ({block.type})
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                disabled={index === 0}
                                onClick={() => handleMoveBlockUp(block.id)}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                disabled={index === blocks.length - 1}
                                onClick={() => handleMoveBlockDown(block.id)}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleRemoveBlock(block.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">
                        Nenhum bloco adicionado. Use as opções à esquerda para adicionar blocos.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[60vh]">
              <div className="space-y-6 px-2">
                {blocks.map((block) => (
                  <div key={block.id} className="preview-block border rounded-md overflow-hidden">
                    <BlockRenderer block={block} isPreview={true} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
