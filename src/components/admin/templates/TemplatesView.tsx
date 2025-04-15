
import React, { useEffect } from 'react';
import { useTemplateStore } from '@/store/templateStore';
import { TemplateList } from './TemplateList';
import { TemplateHeader } from './TemplateHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TemplateDialogs } from './dialogs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const TemplatesView = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  
  const { templates, loadTemplates, searchTemplates } = useTemplateStore();
  const { toast } = useToast();
  
  // Load templates when component mounts
  useEffect(() => {
    const load = async () => {
      try {
        console.log("TemplatesView - carregando templates");
        await loadTemplates();
        console.log("TemplatesView - templates carregados com sucesso");
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
    
    load();
  }, [loadTemplates, toast]);
  
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
      <TemplateHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <ScrollArea className="h-[calc(100vh-220px)]">
        <TemplateList templates={filteredTemplates} />
      </ScrollArea>
      
      {/* Template Dialogs */}
      <TemplateDialogs />
    </div>
  );
};
