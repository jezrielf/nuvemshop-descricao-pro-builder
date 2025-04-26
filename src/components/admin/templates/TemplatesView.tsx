import React, { useState, useEffect } from 'react';
import { useTemplateStore } from '@/hooks/templates/useTemplateStore';
import { TemplateList } from './TemplateList';
import { TemplateHeader } from './TemplateHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TemplateDialogs } from './dialogs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TemplatesView = () => {
  const { templates, loadTemplates, searchTemplates } = useTemplateStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await loadTemplates();
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [loadTemplates]);
  
  const filteredTemplates = searchTemplates(searchQuery, category);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Templates</h2>
          <p className="text-sm text-gray-500">
            {loading 
              ? 'Carregando templates...' 
              : `${filteredTemplates.length} template${filteredTemplates.length === 1 ? '' : 's'} disponíve${filteredTemplates.length === 1 ? 'l' : 'is'}`
            }
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => loadTemplates()}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Atualizando...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar
            </>
          )}
        </Button>
      </div>
      
      <TemplateHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />
      
      <ScrollArea className="h-[calc(100vh-220px)]">
        {templates.length > 0 ? (
          <TemplateList templates={filteredTemplates} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">
              Nenhum template encontrado. Crie um novo template ou atualize a lista.
            </p>
            <Button onClick={() => loadTemplates()} variant="outline">
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
