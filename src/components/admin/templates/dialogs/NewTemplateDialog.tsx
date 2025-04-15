import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useTemplateStore } from '@/store/templateStore';
import { Template, ProductCategory, Block, BlockType } from '@/types/editor';
import { useEditorStore } from '@/store/editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCategoryName } from '../utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createBlock } from '@/utils/blockCreators/createBlock';
import { ChevronUp, ChevronDown, Plus, Trash2, Image, Code } from 'lucide-react';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { analyzeHtmlForTemplate } from '@/utils/htmlParsers/htmlTemplateAnalyzer';

interface NewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
}

export const NewTemplateDialog: React.FC<NewTemplateDialogProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('other');
  const [htmlInput, setHtmlInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedTemplate, setSuggestedTemplate] = useState<Template | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [showBlocksTab, setShowBlocksTab] = useState(false);

  const { toast } = useToast();
  const { categories: storeCategories, createTemplate } = useTemplateStore();
  const { loadTemplate } = useEditorStore();
  
  // We'll use the categories from the store if available, otherwise fall back to these defaults
  const availableCategories = storeCategories.length > 0 
    ? storeCategories 
    : ['supplements', 'clothing', 'accessories', 'shoes', 'electronics', 'energy', 'other'];

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
      // Se estivermos criando a partir de um template sugerido
      if (suggestedTemplate) {
        const newTemplate = createTemplate({
          name,
          category,
          blocks: suggestedTemplate.blocks,
        });
        toast({
          title: "Template criado",
          description: "O template foi criado com sucesso.",
        });
      } else if (blocks.length > 0) {
        // Criando a partir dos blocos adicionados manualmente
        const newTemplate = createTemplate({
          name,
          category,
          blocks: blocks,
        });
        toast({
          title: "Template criado",
          description: "O template foi criado com sucesso com os blocos personalizados.",
        });
      } else {
        // Criar um template básico vazio
        const newTemplate = createTemplate({
          name,
          category,
          blocks: [],
        });
        toast({
          title: "Template criado",
          description: "Um template básico foi criado. Você pode adicionar blocos a ele no editor.",
        });
      }
      onClose();
    } catch (error) {
      console.error("Erro ao criar template:", error);
      toast({
        title: "Erro ao criar template",
        description: "Ocorreu um erro ao criar o template.",
        variant: "destructive",
      });
    }
  };

  const generateFromHtml = async () => {
    if (!htmlInput.trim()) {
      toast({
        title: "HTML vazio",
        description: "Por favor, insira algum código HTML para análise.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Use our HTML analyzer to generate blocks from HTML
      const analyzedTemplate = analyzeHtmlForTemplate(htmlInput, category);
      
      setSuggestedTemplate(analyzedTemplate);
      setBlocks(analyzedTemplate.blocks);
      setShowBlocksTab(true);
      setActiveTab('blocks');
      toast({
        title: "Template gerado com sucesso",
        description: `Foram identificados ${analyzedTemplate.blocks.length} blocos no HTML. Você pode editar os blocos antes de criar o template.`,
      });
    } catch (error) {
      console.error("Erro ao analisar HTML:", error);
      toast({
        title: "Erro na análise do HTML",
        description: "Não foi possível analisar o HTML fornecido. Verifique se o HTML é válido.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFromImage = async () => {
    if (!imageUrl.trim()) {
      toast({
        title: "URL da imagem vazia",
        description: "Por favor, insira uma URL de imagem válida.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simulação de processamento - aqui você implementaria a chamada real para a API
      // que analisa a imagem e sugere um template
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Template de exemplo baseado na imagem
      const exampleTemplate: Template = {
        id: 'suggested-template-image',
        name: 'Template Sugerido da Imagem',
        category: category,
        blocks: [
          {
            id: 'image-hero',
            type: 'hero',
            title: 'Banner Principal',
            columns: 1,
            visible: true,
            heading: 'Título Inspirado na Imagem',
            subheading: 'Design baseado na estética da sua imagem',
            buttonText: 'Saiba Mais',
            buttonUrl: '#',
            backgroundImage: imageUrl,
            style: {}
          },
          {
            id: 'image-features',
            type: 'features',
            title: 'Características',
            columns: 3,
            visible: true,
            heading: 'Características',
            features: [
              { id: 'feat1', title: 'Característica 1', description: 'Descrição da característica 1', icon: 'Star' },
              { id: 'feat2', title: 'Característica 2', description: 'Descrição da característica 2', icon: 'Heart' },
              { id: 'feat3', title: 'Característica 3', description: 'Descrição da característica 3', icon: 'Shield' }
            ],
            style: {}
          }
        ]
      };
      
      setSuggestedTemplate(exampleTemplate);
      setBlocks(exampleTemplate.blocks);
      setShowBlocksTab(true);
      setActiveTab('blocks');
      toast({
        title: "Template sugerido gerado",
        description: "Um template foi gerado baseado na sua imagem. Você pode editar os blocos antes de criar.",
      });
    } catch (error) {
      console.error("Erro ao gerar template da imagem:", error);
      toast({
        title: "Erro na geração",
        description: "Não foi possível gerar um template a partir da imagem fornecida.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddBlock = (type: string) => {
    const newBlock = createBlock(type as BlockType, 1);
    setBlocks([...blocks, newBlock]);
    setShowBlocksTab(true);
    
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
          <DialogTitle>Criar Novo Template</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Template</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Ex: Template de Suplementos"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={(value) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {getCategoryName(cat)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
          
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className={`grid ${showBlocksTab ? 'grid-cols-4' : 'grid-cols-3'} mb-4`}>
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="html">Usar HTML</TabsTrigger>
            <TabsTrigger value="image">Usar Imagem</TabsTrigger>
            {showBlocksTab && <TabsTrigger value="blocks">Editar Blocos</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="basic" className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              <div className="lg:col-span-2 border rounded-md p-3">
                <h3 className="text-sm font-medium mb-2">Blocos Disponíveis</h3>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {blockTypes.map((type) => (
                      <Button 
                        key={type.type} 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-left"
                        onClick={() => handleAddBlock(type.type)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {type.name}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="lg:col-span-5">
                <h3 className="text-sm font-medium mb-2">Informações</h3>
                <div className="p-4 border rounded-md bg-muted/10">
                  <p className="text-sm text-muted-foreground">
                    Você pode criar um template de várias formas:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>Adicione blocos manualmente usando a lista à esquerda</li>
                    <li>Forneça um código HTML para criar automaticamente um template (aba "Usar HTML")</li>
                    <li>Forneça uma imagem de referência para gerar um layout (aba "Usar Imagem")</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    Quantidade de blocos adicionados: <strong>{blocks.length}</strong>
                  </p>
                  
                  {blocks.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => setActiveTab('blocks')}
                    >
                      Editar Blocos
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
              
          <TabsContent value="html" className="space-y-4 flex-1">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <Label htmlFor="html-input">Cole seu HTML para análise</Label>
              </div>
              <Textarea 
                id="html-input" 
                value={htmlInput} 
                onChange={(e) => setHtmlInput(e.target.value)}
                placeholder="Cole o código HTML aqui..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <Button 
              onClick={generateFromHtml} 
              disabled={isGenerating || !htmlInput.trim()}
              className="w-full"
            >
              {isGenerating ? "Analisando..." : "Gerar Template do HTML"}
            </Button>
          </TabsContent>
              
          <TabsContent value="image" className="space-y-4 flex-1">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Image className="h-5 w-5" />
                <Label htmlFor="image-url">URL da imagem de referência</Label>
              </div>
              <Input 
                id="image-url" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              {imageUrl && (
                <div className="mt-4 border rounded-md overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full h-auto max-h-[200px] object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                      toast({
                        title: "Erro ao carregar imagem",
                        description: "Verifique se a URL está correta.",
                        variant: "destructive",
                      });
                    }}
                  />
                </div>
              )}
            </div>
            <Button 
              onClick={generateFromImage} 
              disabled={isGenerating || !imageUrl.trim()}
              className="w-full"
            >
              {isGenerating ? "Analisando..." : "Gerar Template da Imagem"}
            </Button>
          </TabsContent>
          
          {showBlocksTab && (
            <TabsContent value="blocks" className="flex-1 overflow-hidden">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Blocos do Template</h3>
                
                <Tabs defaultValue="list">
                  <TabsList className="grid grid-cols-2 w-auto mb-4">
                    <TabsTrigger value="list">Lista</TabsTrigger>
                    <TabsTrigger value="preview">Visualização</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="list">
                    <ScrollArea className="h-[300px] border rounded-md p-2">
                      {blocks.length > 0 ? (
                        <div className="space-y-2">
                          {blocks.map((block, index) => (
                            <div key={block.id} className="border rounded-md p-3 bg-muted/10">
                              <div className="flex justify-between items-center">
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
                            Nenhum bloco adicionado. Volte à aba Básico para adicionar blocos.
                          </p>
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="preview">
                    <ScrollArea className="h-[300px] border rounded-md">
                      <div className="space-y-6 p-4">
                        {blocks.map((block) => (
                          <div key={block.id} className="preview-block border rounded-md overflow-hidden">
                            <BlockRenderer block={block} isPreview={true} />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          )}
        </Tabs>
        
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Criar Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
