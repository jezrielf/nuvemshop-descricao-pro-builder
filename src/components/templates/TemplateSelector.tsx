
import React, { useEffect, useState } from 'react';
import { useTemplateStore } from '@/store/templates';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, RefreshCw, Search, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Template as TemplateType } from '@/types/editor';
import { Input } from '@/components/ui/input';
import CategoryFilter from './CategoryFilter';
import TemplateGrid from './TemplateGrid';
import useTemplateUtils from './useTemplateUtils';

const TemplateSelector: React.FC = () => {
  const { templates, categories, setSelectedCategory, selectedCategory, loadTemplates, searchTemplates } = useTemplateStore();
  const { loadTemplate } = useEditorStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const { categoryNames, isAdvancedTemplate, getTemplateThumbnail } = useTemplateUtils();
  
  // Load templates when the component mounts or dialog opens
  useEffect(() => {
    const fetchTemplates = async () => {
      if (dialogOpen) {
        setIsLoading(true);
        setLoadError(null);
        try {
          console.log('TemplateSelector - Dialog aberto, carregando templates...');
          const loadedTemplates = await loadTemplates();
          console.log('TemplateSelector - Templates carregados:', loadedTemplates.length);
          
          if (loadedTemplates.length === 0) {
            setLoadError('Nenhum template encontrado no banco de dados.');
            toast({
              title: "Aviso",
              description: "Nenhum template encontrado. Verifique se os templates foram criados.",
              variant: "destructive",
            });
          } else {
            console.log('TemplateSelector - Templates encontrados:');
            loadedTemplates.forEach((template, index) => {
              console.log(`- ${index + 1}: ${template.name} (${template.category})`);
            });
            
            toast({
              title: "Templates carregados",
              description: `${loadedTemplates.length} templates disponíveis.`,
            });
          }
        } catch (error) {
          console.error('TemplateSelector - Erro ao carregar templates:', error);
          setLoadError('Erro ao conectar com o banco de dados. Tente novamente.');
          toast({
            title: "Erro ao carregar templates",
            description: "Não foi possível conectar com o banco de dados. Verifique sua conexão.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchTemplates();
  }, [dialogOpen, loadTemplates, toast]);
  
  // Refresh templates manually
  const handleRefreshTemplates = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      console.log('TemplateSelector - Atualizando templates manualmente...');
      const refreshedTemplates = await loadTemplates();
      console.log('TemplateSelector - Templates atualizados:', refreshedTemplates.length);
      
      if (refreshedTemplates.length > 0) {
        toast({
          title: "Templates atualizados",
          description: `${refreshedTemplates.length} templates disponíveis.`,
        });
      } else {
        setLoadError('Nenhum template encontrado após atualização.');
        toast({
          title: "Aviso",
          description: "Ainda não há templates no banco de dados.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('TemplateSelector - Erro ao atualizar templates:', error);
      setLoadError('Erro ao atualizar templates. Verifique sua conexão.');
      toast({
        title: "Erro ao atualizar templates",
        description: "Não foi possível atualizar os templates. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Apply search and category filtering
  const displayedTemplates = React.useMemo(() => {
    console.log('TemplateSelector - Recalculando templates filtrados...');
    console.log('TemplateSelector - Total de templates:', templates.length);
    console.log('TemplateSelector - Query de busca:', searchQuery);
    console.log('TemplateSelector - Categoria selecionada:', selectedCategory);
    
    if (!templates || templates.length === 0) {
      console.warn('TemplateSelector - Sem templates disponíveis para filtrar');
      return [];
    }
    
    const filtered = searchTemplates(searchQuery, selectedCategory);
    console.log(`TemplateSelector - Resultado final: ${filtered.length} templates filtrados`);
    return filtered;
  }, [templates, selectedCategory, searchQuery, searchTemplates]);

  const handleSelectTemplate = (template: TemplateType) => {
    console.log('TemplateSelector - Template selecionado:', template.name);
    loadTemplate(template);
    setDialogOpen(false);
    
    toast({
      title: "Template aplicado",
      description: `O template "${template.name}" foi aplicado com sucesso.`,
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center">
          <FileText className="mr-2 h-5 w-5" />
          Usar Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Escolha um Template</DialogTitle>
          <DialogDescription>
            Selecione um template para iniciar rapidamente sua descrição de produto.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col flex-grow h-full mt-4">
          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Buscar templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categoryNames={categoryNames}
            />
            
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
              {(loadError && (!templates || templates.length === 0)) ? (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                  <p className="text-muted-foreground mb-2">{loadError}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Certifique-se de que os templates foram criados no painel administrativo.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefreshTemplates}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Tentar novamente
                  </Button>
                </div>
              ) : (
                <TemplateGrid
                  templates={displayedTemplates}
                  isLoading={isLoading}
                  categoryNames={categoryNames}
                  onSelectTemplate={handleSelectTemplate}
                  getThumbnail={getTemplateThumbnail}
                  isAdvancedTemplate={isAdvancedTemplate}
                />
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
