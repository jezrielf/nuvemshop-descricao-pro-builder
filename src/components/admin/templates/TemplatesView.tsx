
import React, { useEffect } from 'react';
import { useTemplateStore } from '@/store/templates';
import { TemplateList } from './TemplateList';
import { TemplateHeader } from './TemplateHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TemplateDialogs } from './dialogs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';

export const TemplatesView = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  
  const { templates, loadTemplates, searchTemplates } = useTemplateStore();
  const { openNewDialog } = useTemplateDialogs();
  const { toast } = useToast();
  
  // Load templates when component mounts
  const loadData = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      console.log("TemplatesView - carregando templates");
      const loadedTemplates = await loadTemplates();
      console.log("TemplatesView - templates carregados com sucesso:", loadedTemplates.length);
      
      if (loadedTemplates.length > 0) {
        toast({
          title: 'Templates carregados',
          description: `${loadedTemplates.length} templates disponíveis`,
        });
      } else {
        console.log('Nenhum template encontrado no banco de dados');
        setLoadError('Nenhum template encontrado.');
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      setLoadError('Ocorreu um erro ao carregar os templates.');
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao carregar os templates',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
  // Function to manually refresh templates
  const handleRefresh = () => {
    loadData();
  };
  
  // Function to handle template deletion
  const handleTemplateDeleted = () => {
    handleRefresh();
    toast({
      title: 'Template excluído',
      description: 'O template foi excluído com sucesso',
    });
  };
  
  // Filter templates based on search query and selected category
  const filteredTemplates = searchTemplates(searchQuery, selectedCategory);
  
  console.log(`TemplatesView - Mostrando ${filteredTemplates.length} templates de um total de ${templates.length}`);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>Carregando templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TemplateHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <div className="flex gap-2">
          <Button
            onClick={openNewDialog}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Template
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-220px)]">
        {templates.length > 0 ? (
          <TemplateList 
            templates={filteredTemplates} 
            onTemplateDeleted={handleTemplateDeleted}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">
              {loadError || 'Nenhum template encontrado. Crie um novo template ou atualize a lista.'}
            </p>
            <div className="flex gap-2">
              <Button onClick={openNewDialog} variant="default">
                <Plus className="h-4 w-4 mr-2" />
                Criar Template
              </Button>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar novamente
              </Button>
            </div>
          </div>
        )}
      </ScrollArea>
      
      {/* Template Dialogs */}
      <TemplateDialogs />
    </div>
  );
};
