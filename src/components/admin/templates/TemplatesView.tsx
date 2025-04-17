
import React, { useEffect } from 'react';
import { useTemplateStore } from '@/store/templates';
import { TemplateList } from './TemplateList';
import { TemplateHeader } from './TemplateHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TemplateDialogs } from './dialogs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TemplatesView = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  
  const { templates, loadTemplates, searchTemplates } = useTemplateStore();
  const { toast } = useToast();
  
  // Load templates when component mounts
  const loadData = async () => {
    setIsLoading(true);
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
        toast({
          title: 'Atenção',
          description: 'Nenhum template encontrado. Verifique sua conexão ou crie novos templates.',
          variant: 'destructive', // Changed from 'warning' to 'destructive'
        });
      }
    } catch (error) {
      console.error('Error loading templates:', error);
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
  
  // Filter templates based on search query and selected category
  const filteredTemplates = searchTemplates(searchQuery, selectedCategory);
  
  console.log(`TemplatesView - Mostrando ${filteredTemplates.length} templates de um total de ${templates.length}`);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="ml-2"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-220px)]">
        {templates.length > 0 ? (
          <TemplateList templates={filteredTemplates} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">
              Nenhum template encontrado. Crie um novo template ou atualize a lista.
            </p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        )}
      </ScrollArea>
      
      {/* Template Dialogs */}
      <TemplateDialogs />
    </div>
  );
};
