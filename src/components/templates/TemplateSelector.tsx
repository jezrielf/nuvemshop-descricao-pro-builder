
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
import { getAllTemplates } from '@/utils/templates';

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
          // Se não temos templates, garantimos que carregamos do serviço
          if (!templates || templates.length === 0) {
            console.log('TemplateSelector - Nenhum template carregado, buscando do serviço');
            const loadedTemplates = await loadTemplates();
            console.log('Templates loaded in TemplateSelector, count:', loadedTemplates.length);
            
            if (loadedTemplates.length === 0) {
              // Se ainda não temos templates, usamos os locais
              const localTemplates = getAllTemplates();
              console.log('Usando templates locais como último recurso:', localTemplates.length);
              
              if (localTemplates.length === 0) {
                setLoadError('Não foram encontrados templates.');
                toast({
                  title: "Aviso",
                  description: "Não foi possível encontrar templates. Entre em contato com o suporte.",
                  variant: "destructive",
                });
              }
            }
          } else {
            console.log('TemplateSelector - Templates já carregados:', templates.length);
          }
        } catch (error) {
          console.error('Error loading templates in TemplateSelector:', error);
          setLoadError('Erro ao carregar templates. Tente novamente.');
          toast({
            title: "Erro ao carregar templates",
            description: "Não foi possível carregar os templates. Tente novamente.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchTemplates();
  }, [dialogOpen, loadTemplates, templates]);
  
  // Refresh templates manually
  const handleRefreshTemplates = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const refreshedTemplates = await loadTemplates();
      console.log('Templates refreshed, count:', refreshedTemplates.length);
      
      if (refreshedTemplates.length > 0) {
        toast({
          title: "Templates atualizados",
          description: `${refreshedTemplates.length} templates disponíveis.`,
        });
      } else {
        // Se não temos templates do serviço, carregamos locais
        const localTemplates = getAllTemplates();
        if (localTemplates.length > 0) {
          toast({
            title: "Templates locais carregados",
            description: `${localTemplates.length} templates padrão disponíveis.`,
          });
        } else {
          setLoadError('Nenhum template encontrado após atualização.');
          toast({
            title: "Aviso",
            description: "Não encontramos templates após a atualização.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Error refreshing templates:', error);
      setLoadError('Erro ao atualizar templates. Tente novamente.');
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
    // Se não temos templates, verificamos se precisamos carregar
    if (!templates || templates.length === 0) {
      console.warn('TemplateSelector - Sem templates disponíveis para filtrar');
      return [];
    }
    
    const filtered = searchTemplates(searchQuery, selectedCategory);
    console.log(`TemplateSelector - Filtrados ${filtered.length} templates de ${templates.length} total`);
    return filtered;
  }, [templates, selectedCategory, searchQuery, searchTemplates]);

  const handleSelectTemplate = (template: TemplateType) => {
    try {
      console.log('Applying template:', template.name, 'with', template.blocks.length, 'blocks');
      loadTemplate(template);
      setDialogOpen(false);
      
      toast({
        title: "Template aplicado",
        description: `O template "${template.name}" foi aplicado com sucesso.`,
      });
    } catch (error) {
      console.error('Error applying template:', error);
      toast({
        title: "Erro ao aplicar template",
        description: `Não foi possível aplicar o template "${template.name}". Tente novamente.`,
        variant: "destructive",
      });
    }
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
                  <p className="text-muted-foreground">{loadError}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefreshTemplates}
                    className="mt-4"
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
