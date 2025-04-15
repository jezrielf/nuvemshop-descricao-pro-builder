
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useTemplateStore } from '@/store/templateStore';
import { Template, ProductCategory } from '@/types/editor';
import { useEditorStore } from '@/store/editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCategoryName } from '../utils';

interface NewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
}

export const NewTemplateDialog: React.FC<NewTemplateDialogProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('other');
  const [htmlInput, setHtmlInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState('html');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedTemplate, setSuggestedTemplate] = useState<Template | null>(null);

  const { toast } = useToast();
  const { createTemplate } = useTemplateStore();
  const { loadTemplate } = useEditorStore();
  
  const categories = ['supplements', 'clothing', 'accessories', 'shoes', 'electronics', 'energy', 'other'];

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
      // Simulação de processamento - aqui você implementaria a chamada real para a API
      // que analisa o HTML e sugere um template
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Template de exemplo baseado no HTML
      const exampleTemplate: Template = {
        id: 'suggested-template',
        name: 'Template Sugerido',
        category: category,
        blocks: [
          {
            id: 'header-block',
            type: 'hero',
            title: 'Cabeçalho',
            columns: 1,
            visible: true,
            heading: 'Título Principal',
            subheading: 'Subtítulo gerado a partir do seu HTML',
            buttonText: 'Comprar Agora',
            buttonUrl: '#'
          },
          {
            id: 'content-block',
            type: 'text',
            title: 'Conteúdo',
            columns: 1,
            visible: true,
            heading: 'Título do Texto',
            content: 'Conteúdo extraído do seu HTML...'
          }
        ]
      };
      
      setSuggestedTemplate(exampleTemplate);
      toast({
        title: "Template sugerido gerado",
        description: "Um template foi gerado baseado no seu HTML. Revise e confirme para criar.",
      });
    } catch (error) {
      console.error("Erro ao gerar template:", error);
      toast({
        title: "Erro na geração",
        description: "Não foi possível gerar um template a partir do HTML fornecido.",
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
            backgroundImage: imageUrl
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
            ]
          }
        ]
      };
      
      setSuggestedTemplate(exampleTemplate);
      toast({
        title: "Template sugerido gerado",
        description: "Um template foi gerado baseado na sua imagem. Revise e confirme para criar.",
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Template</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
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
              <Select value={category} onValueChange={(value) => setCategory(value as ProductCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {getCategoryName(cat as ProductCategory)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {!suggestedTemplate ? (
            <Tabs defaultValue="html" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="html">Usar HTML</TabsTrigger>
                <TabsTrigger value="image">Usar Imagem</TabsTrigger>
              </TabsList>
              
              <TabsContent value="html" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="html-input">Cole seu HTML para análise</Label>
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
              
              <TabsContent value="image" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-url">URL da imagem de referência</Label>
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
            </Tabs>
          ) : (
            <div className="space-y-4 border p-4 rounded-lg bg-muted/30">
              <h3 className="font-medium">Template Sugerido</h3>
              <p>Blocos gerados: {suggestedTemplate.blocks.length}</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestedTemplate.blocks.map((block) => (
                  <div key={block.id} className="p-2 bg-background rounded border text-sm">
                    {block.title} ({block.type})
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSuggestedTemplate(null)}
                size="sm"
              >
                Voltar à criação manual
              </Button>
            </div>
          )}
        </div>
        
        <DialogFooter>
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
