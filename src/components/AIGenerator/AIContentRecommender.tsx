
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Sparkles, PlusCircle, ArrowRight, Loader2, ThumbsUp, ThumbsDown, RefreshCw, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { ProductDescription, Block, BlockType } from '@/types/editor';
import { getContentRecommendations, generateContentSuggestion, getSuggestedKeywords, ContentRecommendation } from '@/utils/aiGenerators/contentRecommender';
import { v4 as uuidv4 } from 'uuid';

interface AIContentRecommenderProps {
  description: ProductDescription | null;
}

const AIContentRecommender: React.FC<AIContentRecommenderProps> = ({ description }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('suggestions');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([]);
  
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatingContent, setGeneratingContent] = useState(false);
  
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  
  const { toast } = useToast();
  const { addBlock } = useEditorStore();
  
  // Load recommendations when dialog opens
  useEffect(() => {
    if (open && description) {
      loadRecommendations();
    }
  }, [open, description]);
  
  const loadRecommendations = async () => {
    if (!description) return;
    
    setLoading(true);
    try {
      const category = description.blocks.find(block => 'category' in block)?.category || 'other';
      const recs = await getContentRecommendations(description, category);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      toast({
        title: 'Erro ao carregar recomendações',
        description: 'Não foi possível obter recomendações de conteúdo no momento.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateContent = async () => {
    if (!productType || !productName) {
      toast({
        title: 'Informações necessárias',
        description: 'Por favor, informe o tipo e nome do produto.',
        variant: 'destructive',
      });
      return;
    }
    
    setGeneratingContent(true);
    try {
      const content = await generateContentSuggestion(productType, productName);
      setGeneratedContent(content);
      
      // Also get keywords
      const suggestedKeywords = await getSuggestedKeywords(productType, productName);
      setKeywords(suggestedKeywords);
      
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: 'Erro ao gerar conteúdo',
        description: 'Não foi possível gerar o conteúdo sugerido.',
        variant: 'destructive',
      });
    } finally {
      setGeneratingContent(false);
    }
  };
  
  const handleApplyRecommendation = (rec: ContentRecommendation) => {
    if (!rec.action) return;
    
    try {
      switch (rec.action.type) {
        case 'add':
          if (rec.action.blockType) {
            // Create a new block of the recommended type
            addBlock({
              type: rec.action.blockType,
              title: getDefaultBlockTitle(rec.action.blockType),
              columns: 1,
              visible: true,
              ...getDefaultBlockProps(rec.action.blockType)
            });
            
            toast({
              title: 'Bloco adicionado',
              description: `Um novo bloco do tipo "${rec.action.blockType}" foi adicionado.`,
            });
          }
          break;
          
        // Implement other action types as needed
      }
    } catch (error) {
      console.error('Error applying recommendation:', error);
      toast({
        title: 'Erro ao aplicar recomendação',
        description: 'Ocorreu um erro ao aplicar a recomendação selecionada.',
        variant: 'destructive',
      });
    }
  };
  
  const handleApplyGeneratedContent = () => {
    if (!generatedContent) return;
    
    try {
      // Add a new text block with the generated content
      addBlock({
        type: 'text' as BlockType,
        title: 'Texto Gerado por IA',
        columns: 1,
        visible: true,
        heading: productName || 'Descrição do Produto',
        content: generatedContent
      });
      
      toast({
        title: 'Conteúdo aplicado',
        description: 'O conteúdo gerado por IA foi adicionado à descrição.',
      });
      
      // Reset form
      setGeneratedContent('');
      setProductName('');
      setProductType('');
      
    } catch (error) {
      console.error('Error applying generated content:', error);
      toast({
        title: 'Erro ao aplicar conteúdo',
        description: 'Ocorreu um erro ao adicionar o conteúdo gerado.',
        variant: 'destructive',
      });
    }
  };
  
  // Helper function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: 'Copiado para a área de transferência',
          description: 'O texto foi copiado com sucesso.',
        });
      },
      (err) => {
        console.error('Error copying text:', err);
        toast({
          title: 'Erro ao copiar',
          description: 'Não foi possível copiar o texto.',
          variant: 'destructive',
        });
      }
    );
  };
  
  // Helper functions to get default block properties
  const getDefaultBlockTitle = (blockType: BlockType): string => {
    switch (blockType) {
      case 'hero': return 'Banner Principal';
      case 'features': return 'Características';
      case 'benefits': return 'Benefícios';
      case 'specifications': return 'Especificações';
      case 'text': return 'Texto';
      case 'image': return 'Imagem';
      case 'gallery': return 'Galeria';
      case 'imageText': return 'Imagem e Texto';
      case 'textImage': return 'Texto e Imagem';
      case 'faq': return 'Perguntas Frequentes';
      case 'cta': return 'Chamada para Ação';
      case 'video': return 'Vídeo';
      default: return 'Novo Bloco';
    }
  };
  
  const getDefaultBlockProps = (blockType: BlockType): Partial<Block> => {
    switch (blockType) {
      case 'hero':
        return {
          heading: 'Título do Banner Principal',
          subheading: 'Subtítulo ou slogan do produto',
          buttonText: 'Ver Detalhes',
          buttonUrl: '#',
          image: {
            src: 'https://via.placeholder.com/1200x600',
            alt: 'Banner do produto'
          }
        };
        
      case 'cta':
        return {
          heading: 'Não perca esta oportunidade!',
          content: 'Adquira agora mesmo e aproveite todos os benefícios deste produto incrível.',
          buttonText: 'Comprar Agora',
          buttonUrl: '#'
        };
        
      case 'faq':
        return {
          heading: 'Perguntas Frequentes',
          questions: [
            {
              id: uuidv4(),
              question: 'Qual é o prazo de entrega?',
              answer: 'O prazo de entrega varia conforme sua localização, geralmente entre 3 a 7 dias úteis.'
            },
            {
              id: uuidv4(),
              question: 'Como funciona a garantia?',
              answer: 'Oferecemos garantia de 30 dias contra defeitos de fabricação.'
            }
          ]
        };
        
      case 'image':
        return {
          src: 'https://via.placeholder.com/800x600',
          alt: 'Imagem do produto',
          caption: 'Descrição da imagem'
        };
        
      case 'text':
        return {
          heading: 'Sobre o Produto',
          content: '<p>Adicione aqui uma descrição detalhada sobre seu produto ou serviço.</p>'
        };
        
      default:
        return {};
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Lightbulb className="h-4 w-4 mr-1" />
          Sugestões IA
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
            Recomendações e Sugestões de Conteúdo IA
          </DialogTitle>
          <DialogDescription>
            Receba recomendações inteligentes para melhorar sua descrição de produto.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-[65vh]">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="suggestions">Sugestões Automáticas</TabsTrigger>
            <TabsTrigger value="generator">Gerador de Conteúdo</TabsTrigger>
            <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
          </TabsList>
          
          <TabsContent value="suggestions" className="flex-grow overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recomendações para sua descrição</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadRecommendations} 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      Carregando...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Atualizar
                    </>
                  )}
                </Button>
              </div>
              
              <ScrollArea className="flex-grow pr-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full py-10">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                    <p className="text-gray-500">Analisando sua descrição...</p>
                  </div>
                ) : recommendations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                    <Lightbulb className="h-10 w-10 text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-2">Nenhuma recomendação disponível no momento.</p>
                    <p className="text-gray-400 text-sm">
                      Sua descrição já parece estar bem otimizada!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommendations.map((rec) => (
                      <Card key={rec.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{rec.title}</CardTitle>
                            <Badge className={`${rec.confidence >= 80 ? 'bg-green-100 text-green-800' : rec.confidence >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                              {rec.confidence}% confiança
                            </Badge>
                          </div>
                          <CardDescription>{rec.description}</CardDescription>
                        </CardHeader>
                        
                        {rec.action && (
                          <CardFooter className="pt-0">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="ml-auto"
                              onClick={() => handleApplyRecommendation(rec)}
                            >
                              <PlusCircle className="h-4 w-4 mr-1" />
                              Aplicar Sugestão
                            </Button>
                          </CardFooter>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="generator" className="flex-grow overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <div className="flex flex-col">
                <div className="space-y-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-type">Tipo de Produto</Label>
                    <Input 
                      id="product-type" 
                      placeholder="ex: suplemento, roupa, acessório, eletrônico" 
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Nome do Produto</Label>
                    <Input 
                      id="product-name" 
                      placeholder="ex: Vitamina C Premium, Camisa Slim Fit" 
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleGenerateContent}
                    disabled={generatingContent}
                  >
                    {generatingContent ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Gerar Conteúdo
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="flex flex-col flex-grow">
                  <Label className="mb-2">Instruções para IA</Label>
                  <Textarea 
                    placeholder="Instruções adicionais para IA (opcional). Ex: Focar em benefícios para a saúde, destacar o material premium, mencionar garantia..." 
                    className="flex-grow resize-none"
                  />
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <Label>Conteúdo Gerado</Label>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      disabled={!generatedContent}
                      onClick={() => copyToClipboard(generatedContent)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md flex-grow overflow-hidden flex flex-col">
                  <ScrollArea className="flex-grow">
                    {generatedContent ? (
                      <div 
                        className="p-4"
                        dangerouslySetInnerHTML={{ __html: generatedContent }}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center p-10 text-center text-gray-500">
                        <div>
                          <Sparkles className="h-8 w-8 mx-auto mb-3 opacity-20" />
                          <p>O conteúdo gerado aparecerá aqui.</p>
                          <p className="text-sm mt-1">Preencha os campos e clique em "Gerar Conteúdo".</p>
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                  
                  {generatedContent && (
                    <div className="p-3 border-t bg-gray-50 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Bom
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2"
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Melhorar
                        </Button>
                      </div>
                      
                      <Button 
                        size="sm" 
                        onClick={handleApplyGeneratedContent}
                      >
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Aplicar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="keywords" className="flex-grow overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Palavras-chave Sugeridas</h3>
                
                <div className="flex space-x-2">
                  {!keywords.length && (
                    <p className="text-sm text-gray-500 mr-2">
                      Gere conteúdo na aba anterior para obter palavras-chave
                    </p>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleGenerateContent} 
                    disabled={loadingKeywords || !productType || !productName}
                  >
                    {loadingKeywords ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        Carregando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Gerar Palavras-chave
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="flex-grow pr-4">
                {loadingKeywords ? (
                  <div className="flex flex-col items-center justify-center h-full py-10">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                    <p className="text-gray-500">Gerando palavras-chave...</p>
                  </div>
                ) : keywords.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                    <Lightbulb className="h-10 w-10 text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-2">Nenhuma palavra-chave disponível.</p>
                    <p className="text-gray-400 text-sm">
                      Use a aba "Gerador de Conteúdo" para gerar palavras-chave relevantes.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Principais palavras-chave para "{productName}"</h4>
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="py-1.5 cursor-pointer"
                            onClick={() => copyToClipboard(keyword)}
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Como usar estas palavras-chave</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Inclua palavras-chave no título e subtítulos da descrição</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Utilize palavras-chave de forma natural no conteúdo da descrição</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Adicione palavras-chave aos textos alternativos (alt) das imagens</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Use variações das palavras-chave para maior alcance</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>Evite exageros (keyword stuffing) que podem prejudicar o SEO</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AIContentRecommender;
