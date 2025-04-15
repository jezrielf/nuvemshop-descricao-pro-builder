
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Template } from '@/types/editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { useEditorStore } from '@/store/editor';
import { Plus, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BlockType } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PreviewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: Template;
}

export const PreviewTemplateDialog: React.FC<PreviewTemplateDialogProps> = ({
  open,
  onClose,
  template,
}) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [editableTemplate, setEditableTemplate] = useState<Template>({...template});
  const [edited, setEdited] = useState(false);
  const { loadTemplate } = useEditorStore();
  const { toast } = useToast();

  // Blocos disponíveis para adição
  const availableBlocks: { type: BlockType; name: string }[] = [
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

  const handleLoadToEditor = () => {
    loadTemplate(template);
    onClose();
    toast({
      title: "Template carregado no editor",
      description: "O template foi carregado no editor para edição completa.",
    });
  };

  const handleAddBlock = (type: BlockType) => {
    const newBlock = createBlock(type);
    setEditableTemplate(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
    setEdited(true);
    toast({
      title: "Bloco adicionado",
      description: `Um novo bloco do tipo ${type} foi adicionado ao template.`,
    });
  };

  const handleRemoveBlock = (blockId: string) => {
    setEditableTemplate(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== blockId)
    }));
    setEdited(true);
    toast({
      title: "Bloco removido",
      description: "O bloco foi removido do template.",
    });
  };

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    const blockIndex = editableTemplate.blocks.findIndex(block => block.id === blockId);
    if (blockIndex === -1) return;

    const newBlocks = [...editableTemplate.blocks];
    
    if (direction === 'up' && blockIndex > 0) {
      [newBlocks[blockIndex], newBlocks[blockIndex - 1]] = [newBlocks[blockIndex - 1], newBlocks[blockIndex]];
      setEdited(true);
    } else if (direction === 'down' && blockIndex < newBlocks.length - 1) {
      [newBlocks[blockIndex], newBlocks[blockIndex + 1]] = [newBlocks[blockIndex + 1], newBlocks[blockIndex]];
      setEdited(true);
    }

    setEditableTemplate(prev => ({
      ...prev,
      blocks: newBlocks
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Template: {template.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="preview">Visualizar</TabsTrigger>
            <TabsTrigger value="edit">Editar Blocos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6 px-2">
                {template.blocks.map((block) => (
                  <div key={block.id} className="block-preview">
                    <BlockRenderer block={block} isPreview={true} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="edit" className="flex-1 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
              {/* Lista de blocos disponíveis */}
              <div className="bg-muted/20 p-3 rounded-md">
                <h3 className="text-sm font-medium mb-2">Adicionar Blocos</h3>
                <ScrollArea className="h-[50vh]">
                  <div className="space-y-2">
                    {availableBlocks.map((blockType) => (
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
                <h3 className="text-sm font-medium mb-2">Blocos do Template</h3>
                <ScrollArea className="h-[50vh] border rounded-md p-2">
                  {editableTemplate.blocks.length > 0 ? (
                    <div className="space-y-2">
                      {editableTemplate.blocks.map((block, index) => (
                        <div key={block.id} className="border rounded-md p-2 bg-background flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium">{block.title}</span>
                            <span className="text-xs text-muted-foreground ml-2">({block.type})</span>
                          </div>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleMoveBlock(block.id, 'up')}
                              disabled={index === 0}
                            >
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="lucide lucide-arrow-up"
                              >
                                <path d="m5 12 7-7 7 7"/>
                                <path d="M12 19V5"/>
                              </svg>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleMoveBlock(block.id, 'down')}
                              disabled={index === editableTemplate.blocks.length - 1}
                            >
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="lucide lucide-arrow-down"
                              >
                                <path d="M12 5v14"/>
                                <path d="m19 12-7 7-7-7"/>
                              </svg>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleRemoveBlock(block.id)}
                            >
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="lucide lucide-trash-2"
                              >
                                <path d="M3 6h18"/>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                <line x1="10" x2="10" y1="11" y2="17"/>
                                <line x1="14" x2="14" y1="11" y2="17"/>
                              </svg>
                            </Button>
                          </div>
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
        </Tabs>
        
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={handleLoadToEditor}>
            <Edit className="h-4 w-4 mr-2" />
            Editar no Editor Completo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
