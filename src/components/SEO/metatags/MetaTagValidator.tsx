import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ProductDescription } from '@/types/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EmptyState } from '../checklist/components/EmptyState';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface MetaTagValidatorProps {
  description: ProductDescription | null;
}

interface MetaTags {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

type FeedbackStatus = 'success' | 'warning' | 'error';

interface FeedbackItem {
  status: FeedbackStatus;
  message: string;
}

interface MetaTagFeedback {
  titleLength: FeedbackItem;
  descriptionLength: FeedbackItem;
  keywordsCount: FeedbackItem;
  ogFields: FeedbackItem;
}

const MetaTagValidator: React.FC<MetaTagValidatorProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const [metaTags, setMetaTags] = useState<MetaTags>({
    title: '',
    description: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });
  
  const [feedback, setFeedback] = useState<MetaTagFeedback>({
    titleLength: { status: 'warning', message: 'Adicione um título' },
    descriptionLength: { status: 'warning', message: 'Adicione uma descrição' },
    keywordsCount: { status: 'warning', message: 'Adicione palavras-chave' },
    ogFields: { status: 'warning', message: 'Preencha os campos Open Graph' }
  });
  
  useEffect(() => {
    if (description) {
      // Tentativa de extrair meta tags do HTML existente ou do nome da descrição
      setMetaTags({
        title: description.name || '',
        description: extractDescriptionText(description) || '',
        keywords: extractKeywords(description) || '',
        ogTitle: description.name || '',
        ogDescription: '',
        ogImage: findFirstImage(description) || ''
      });
    }
  }, [description]);
  
  useEffect(() => {
    validateMetaTags();
  }, [metaTags]);
  
  const extractDescriptionText = (desc: ProductDescription): string => {
    // Tenta extrair os primeiros parágrafos de texto da descrição para usar como meta description
    let text = '';
    
    for (const block of desc.blocks) {
      if (block.type === 'text' && block.content) {
        text = block.content.substring(0, 150);
        if (text) break;
      } else if (block.type === 'hero' && block.description) {
        text = block.description.substring(0, 150);
        if (text) break;
      }
    }
    
    return text;
  };
  
  const extractKeywords = (desc: ProductDescription): string => {
    // Tenta gerar keywords baseadas no conteúdo
    const keywords = new Set<string>();
    const stopWords = ['o', 'a', 'os', 'as', 'um', 'uma', 'e', 'é', 'de', 'do', 'da', 'para'];
    
    // Extrai palavras de todos os textos da descrição
    for (const block of desc.blocks) {
      let text = '';
      
      if (block.type === 'text' && block.content) {
        text = block.content;
      } else if (block.type === 'hero' && block.description) {
        text = block.description;
      }
      
      if (text) {
        const words = text.toLowerCase()
                         .replace(/[^\w\sáàâãéèêíìîóòôõúùûç]/g, '')
                         .split(/\s+/)
                         .filter(word => word.length > 3 && !stopWords.includes(word));
        
        words.forEach(word => keywords.add(word));
      }
    }
    
    return Array.from(keywords).slice(0, 10).join(', ');
  };
  
  const findFirstImage = (desc: ProductDescription): string => {
    // Busca a primeira imagem da descrição
    for (const block of desc.blocks) {
      if (block.type === 'image' && block.src) {
        return block.src;
      } else if (block.type === 'hero' && block.image) {
        return block.image;
      } else if (block.type === 'gallery' && block.images && block.images.length > 0) {
        return block.images[0].src;
      }
    }
    
    return '';
  };
  
  const validateMetaTags = () => {
    const newFeedback = {
      titleLength: { status: 'success' as FeedbackStatus, message: 'Título com tamanho adequado' },
      descriptionLength: { status: 'success' as FeedbackStatus, message: 'Descrição com tamanho adequado' },
      keywordsCount: { status: 'success' as FeedbackStatus, message: 'Quantidade de palavras-chave adequada' },
      ogFields: { status: 'success' as FeedbackStatus, message: 'Campos Open Graph preenchidos corretamente' }
    };
    
    // Validar título
    if (!metaTags.title) {
      newFeedback.titleLength = { status: 'error', message: 'O título é obrigatório' };
    } else if (metaTags.title.length < 10) {
      newFeedback.titleLength = { status: 'warning', message: 'O título é muito curto (mínimo 10 caracteres)' };
    } else if (metaTags.title.length > 60) {
      newFeedback.titleLength = { status: 'warning', message: 'O título é muito longo (máximo 60 caracteres)' };
    }
    
    // Validar descrição
    if (!metaTags.description) {
      newFeedback.descriptionLength = { status: 'error', message: 'A descrição é obrigatória' };
    } else if (metaTags.description.length < 50) {
      newFeedback.descriptionLength = { status: 'warning', message: 'A descrição é muito curta (mínimo 50 caracteres)' };
    } else if (metaTags.description.length > 160) {
      newFeedback.descriptionLength = { status: 'warning', message: 'A descrição é muito longa (máximo 160 caracteres)' };
    }
    
    // Validar palavras-chave
    if (!metaTags.keywords) {
      newFeedback.keywordsCount = { status: 'warning', message: 'Adicione palavras-chave para melhorar o SEO' };
    } else {
      const keywordCount = metaTags.keywords.split(',').length;
      if (keywordCount < 3) {
        newFeedback.keywordsCount = { status: 'warning', message: 'Adicione pelo menos 3 palavras-chave' };
      } else if (keywordCount > 15) {
        newFeedback.keywordsCount = { status: 'warning', message: 'Muitas palavras-chave (máximo recomendado: 15)' };
      }
    }
    
    // Validar Open Graph
    if (!metaTags.ogTitle || !metaTags.ogDescription) {
      newFeedback.ogFields = { status: 'warning', message: 'Preencha os campos de título e descrição Open Graph' };
    }
    if (!metaTags.ogImage) {
      newFeedback.ogFields = { status: 'warning', message: 'Adicione uma imagem Open Graph para compartilhamentos' };
    }
    
    setFeedback(newFeedback);
  };
  
  function getHtmlOutput(): string {
    return `<!-- Meta Tags SEO -->
<meta name="title" content="${metaTags.title}">
<meta name="description" content="${metaTags.description}">
<meta name="keywords" content="${metaTags.keywords}">

<!-- Meta Tags Open Graph / Facebook -->
<meta property="og:type" content="product">
<meta property="og:title" content="${metaTags.ogTitle || metaTags.title}">
<meta property="og:description" content="${metaTags.ogDescription || metaTags.description}">
${metaTags.ogImage ? `<meta property="og:image" content="${metaTags.ogImage}">` : ''}
`;
  }
  
  function getStatusIcon(status: FeedbackStatus) {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500 h-4 w-4" />;
      case 'warning':
        return <Info className="text-amber-500 h-4 w-4" />;
      case 'error':
        return <AlertCircle className="text-red-500 h-4 w-4" />;
    }
  }
  
  function copyToClipboard() {
    navigator.clipboard.writeText(getHtmlOutput());
    alert('Meta tags copiadas para a área de transferência!');
  }

  if (!description) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span className="w-full">Meta Tags</span>
        </DialogTrigger>
        <DialogContent className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle>Validador de Meta Tags</DialogTitle>
            <DialogDescription>
              Analise e otimize suas meta tags para melhorar o SEO.
            </DialogDescription>
          </DialogHeader>
          <EmptyState message="Crie uma descrição para gerar meta tags" />
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="w-full">Meta Tags</span>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[85vh] flex flex-col overflow-hidden p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Validador de Meta Tags</DialogTitle>
          <DialogDescription>
            Analise e otimize suas meta tags para melhorar o SEO.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4">
          <Tabs defaultValue="edit">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="edit" className="flex-1">Editar Meta Tags</TabsTrigger>
              <TabsTrigger value="preview" className="flex-1">Prévia HTML</TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">
                    Título da Página
                    <span className="ml-2 text-xs text-gray-500">
                      ({metaTags.title.length}/60)
                    </span>
                  </Label>
                  <Input 
                    id="meta-title"
                    value={metaTags.title}
                    onChange={e => setMetaTags({...metaTags, title: e.target.value})}
                    maxLength={60}
                    className="mt-1"
                  />
                  <div className="flex items-center mt-1 text-sm">
                    {getStatusIcon(feedback.titleLength.status)}
                    <span className="ml-1">{feedback.titleLength.message}</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="meta-description">
                    Descrição da Página
                    <span className="ml-2 text-xs text-gray-500">
                      ({metaTags.description.length}/160)
                    </span>
                  </Label>
                  <Textarea 
                    id="meta-description"
                    value={metaTags.description}
                    onChange={e => setMetaTags({...metaTags, description: e.target.value})}
                    maxLength={160}
                    className="mt-1"
                  />
                  <div className="flex items-center mt-1 text-sm">
                    {getStatusIcon(feedback.descriptionLength.status)}
                    <span className="ml-1">{feedback.descriptionLength.message}</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="meta-keywords">Palavras-chave (separadas por vírgula)</Label>
                  <Textarea 
                    id="meta-keywords"
                    value={metaTags.keywords}
                    onChange={e => setMetaTags({...metaTags, keywords: e.target.value})}
                    className="mt-1"
                  />
                  <div className="flex items-center mt-1 text-sm">
                    {getStatusIcon(feedback.keywordsCount.status)}
                    <span className="ml-1">{feedback.keywordsCount.message}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-900 mb-3">Meta Tags Open Graph</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="og-title">Título Open Graph</Label>
                      <Input 
                        id="og-title"
                        value={metaTags.ogTitle}
                        onChange={e => setMetaTags({...metaTags, ogTitle: e.target.value})}
                        className="mt-1"
                        placeholder="Deixe em branco para usar o título da página"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="og-description">Descrição Open Graph</Label>
                      <Textarea 
                        id="og-description"
                        value={metaTags.ogDescription}
                        onChange={e => setMetaTags({...metaTags, ogDescription: e.target.value})}
                        className="mt-1"
                        placeholder="Deixe em branco para usar a descrição da página"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="og-image">URL da Imagem Open Graph</Label>
                      <Input 
                        id="og-image"
                        value={metaTags.ogImage}
                        onChange={e => setMetaTags({...metaTags, ogImage: e.target.value})}
                        className="mt-1"
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-3 text-sm">
                    {getStatusIcon(feedback.ogFields.status)}
                    <span className="ml-1">{feedback.ogFields.message}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="space-y-4">
                <Alert className="bg-blue-50">
                  <AlertDescription>
                    Adicione estas meta tags ao cabeçalho HTML do seu site.
                  </AlertDescription>
                </Alert>
                
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-auto">
                  <pre>{getHtmlOutput()}</pre>
                </div>
                
                <Button onClick={copyToClipboard} className="w-full">
                  Copiar para área de transferência
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MetaTagValidator;
