
import React, { useEffect, useState, useCallback } from 'react';
import { useTemplateStore } from '@/store/templates';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Star, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Template as TemplateType, ProductCategory } from '@/types/editor';

const TemplateSelector: React.FC = () => {
  const { templates, categories, selectCategory, selectedCategory, loadTemplates } = useTemplateStore();
  const { loadTemplate } = useEditorStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Função reutilizável para carregar templates
  const fetchTemplates = useCallback(async (showToast = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Iniciando carregamento de templates no TemplateSelector');
      const loadedTemplates = await loadTemplates();
      console.log(`TemplateSelector: ${loadedTemplates.length} templates carregados`);
      
      if (loadedTemplates.length === 0) {
        setError("Nenhum template disponível. Tente atualizar ou contate o suporte.");
        
        if (showToast) {
          toast({
            title: "Aviso",
            description: "Nenhum template disponível. Tente atualizar novamente.",
            variant: "warning",
          });
        }
      } else if (showToast) {
        toast({
          title: "Templates atualizados",
          description: `${loadedTemplates.length} templates disponíveis`,
        });
      }
    } catch (err) {
      console.error('Erro ao carregar templates:', err);
      setError("Erro ao carregar templates. Tente novamente ou verifique sua conexão.");
      
      if (showToast) {
        toast({
          title: "Erro ao carregar templates",
          description: "Não foi possível atualizar os templates. Tente novamente.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [loadTemplates, toast]);
  
  // Carrega templates quando o componente monta e quando o diálogo abre
  useEffect(() => {
    // Quando o diálogo é aberto, recarregamos os templates
    if (dialogOpen) {
      fetchTemplates();
    }
  }, [dialogOpen, fetchTemplates]);
  
  // Carrega templates imediatamente na montagem do componente
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);
  
  // Função para forçar recarregamento manual de templates
  const handleRefreshTemplates = () => {
    fetchTemplates(true); // true para mostrar toast
  };
  
  // Função para verificar se thumbnail é válido
  const isValidThumbnail = (url: string | undefined): boolean => {
    return !!url && url !== '/placeholder.svg' && url.startsWith('http');
  };
  
  // Obter todos os templates quando selectedCategory for null
  const displayedTemplates = React.useMemo(() => {
    console.log('Exibindo templates. Total disponível:', templates.length);
    return selectedCategory === null 
      ? templates  // Exibir todos os templates quando nenhuma categoria estiver selecionada
      : templates.filter(template => template.category === selectedCategory);
  }, [templates, selectedCategory]);

  const handleSelectTemplate = (template: TemplateType) => {
    loadTemplate(template);
    setDialogOpen(false);
    
    toast({
      title: "Template aplicado",
      description: `O template "${template.name}" foi aplicado com sucesso.`,
    });
  };
  
  const categoryNames: Record<string, string> = {
    supplements: 'Suplementos',
    clothing: 'Roupas',
    accessories: 'Acessórios',
    shoes: 'Calçados',
    electronics: 'Eletrônicos',
    energy: 'Energéticos',
    beauty: 'Beleza',
    fitness: 'Fitness',
    fashion: 'Moda',
    'home-decor': 'Casa e decoração',
    other: 'Outros'
  };
  
  // Verifica se é um template avançado pelo ID
  const isAdvancedTemplate = (id: string) => id.startsWith('adv-');
  
  // Gera uma miniatura para o template
  const getTemplateThumbnail = (template: TemplateType) => {
    // Se o template já tem uma miniatura válida, use-a
    if (isValidThumbnail(template.thumbnail)) {
      return template.thumbnail;
    }
    
    // Caso contrário, use uma miniatura com base na categoria
    const category = template.category;
    
    // Miniaturas personalizadas por categoria
    switch(category) {
      case 'supplements':
        return 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=500';
      case 'clothing':
        return 'https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=500';
      case 'shoes':
        return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500';
      case 'electronics':
        return 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500';
      case 'energy':
        return 'https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=500';
      case 'accessories':
        return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500';
      case 'home-decor':
        return 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=500';
      case 'beauty':
        return 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500';
      case 'fitness':
        return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500';
      case 'fashion':
        return 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500';
      case 'other':
        return 'https://images.unsplash.com/photo-1553531384-411a247cce73?q=80&w=500';
      default:
        return 'https://images.unsplash.com/photo-1553531384-411a247cce73?q=80&w=500';
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center"
          onClick={() => {
            // Carrega templates ao abrir o diálogo
            if (!dialogOpen) {
              fetchTemplates();
            }
          }}
        >
          <FileText className="mr-2 h-5 w-5" />
          Usar Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Escolha um Template</DialogTitle>
          <DialogDescription>
            Selecione um template para iniciar rapidamente sua descrição de produto.
            {templates.length === 0 && !isLoading && (
              <div className="mt-2 text-yellow-600 text-sm flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {error || "Nenhum template encontrado. Tente atualizar a lista de templates."}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col flex-grow h-full mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => selectCategory(null)}
              >
                Todos
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => selectCategory(category)}
                >
                  {categoryNames[category] || category}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshTemplates}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
          
          <div className="overflow-y-auto flex-grow">
            <ScrollArea className="h-[calc(60vh-120px)] pr-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2">Carregando templates...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                  {displayedTemplates.length > 0 ? (
                    displayedTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="border rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                      >
                        <div className="bg-gray-100 h-32 flex items-center justify-center overflow-hidden">
                          <img 
                            src={getTemplateThumbnail(template)} 
                            alt={template.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Se a imagem falhar, substitui por uma padrão
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1553531384-411a247cce73?q=80&w=500';
                            }}
                          />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{template.name}</h3>
                            {isAdvancedTemplate(template.id) && (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 mb-3">
                            {categoryNames[template.category] || template.category}
                          </p>
                          <div className="text-xs text-gray-500 mb-4">
                            {template.blocks.length} blocos
                          </div>
                          <div className="mt-auto">
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => handleSelectTemplate(template)}
                            >
                              Usar este template
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-muted-foreground">{error || "Nenhum template encontrado nesta categoria."}</p>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={handleRefreshTemplates}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Tentar novamente
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
