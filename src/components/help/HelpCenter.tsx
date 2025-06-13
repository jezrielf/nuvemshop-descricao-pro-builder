
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, ChevronDown, ChevronRight, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { helpContent, searchInHelpContent, HelpItem, HelpCategory } from './helpContent';
import { useToast } from '@/hooks/use-toast';

interface HelpCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ open, onOpenChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<HelpItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['primeiros-passos']));
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchInHelpContent(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'new-description':
        // Trigger new description dialog
        (document.querySelector('[data-action="new-description"]') as HTMLElement)?.click();
        break;
      case 'save-description':
        // Trigger save description
        (document.querySelector('[data-action="save-description"]') as HTMLElement)?.click();
        break;
      case 'saved-descriptions':
        // Trigger saved descriptions dialog
        (document.querySelector('[data-action="saved-descriptions"]') as HTMLElement)?.click();
        break;
      case 'connect-nuvemshop':
        // Trigger Nuvemshop connection
        (document.querySelector('[data-action="connect-nuvemshop"]') as HTMLElement)?.click();
        break;
      case 'save-to-nuvemshop':
        // Trigger save to Nuvemshop
        (document.querySelector('[data-action="save-to-nuvemshop"]') as HTMLElement)?.click();
        break;
      default:
        toast({
          title: 'Ação não disponível',
          description: 'Esta ação ainda não está implementada.',
        });
    }
    onOpenChange(false);
  };

  const handleFeedback = (itemId: string, helpful: boolean) => {
    toast({
      title: helpful ? 'Obrigado!' : 'Feedback registrado',
      description: helpful 
        ? 'Ficamos felizes que a resposta foi útil!' 
        : 'Vamos trabalhar para melhorar esta resposta.',
    });
  };

  const renderHelpItem = (item: HelpItem) => (
    <div key={item.id} className="border rounded-lg">
      <Collapsible 
        open={expandedItems.has(item.id)} 
        onOpenChange={() => toggleItem(item.id)}
      >
        <CollapsibleTrigger className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between">
          <span className="font-medium">{item.question}</span>
          {expandedItems.has(item.id) ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          <div className="text-sm text-gray-600 mb-3 leading-relaxed">
            {item.answer}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {item.actionButton && (
                <Button 
                  size="sm" 
                  onClick={() => handleAction(item.actionButton!.action)}
                  className="flex items-center gap-1"
                >
                  {item.actionButton.text}
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Isso ajudou?</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFeedback(item.id, true)}
                className="h-8 w-8 p-0"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFeedback(item.id, false)}
                className="h-8 w-8 p-0"
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  const renderCategory = (category: HelpCategory) => (
    <div key={category.id} className="mb-6">
      <Collapsible 
        open={expandedCategories.has(category.id)} 
        onOpenChange={() => toggleCategory(category.id)}
      >
        <CollapsibleTrigger className="w-full text-left mb-3 flex items-center gap-2 hover:bg-gray-50 p-2 rounded">
          <span className="text-lg">{category.icon}</span>
          <h3 className="text-lg font-semibold">{category.title}</h3>
          {expandedCategories.has(category.id) ? (
            <ChevronDown className="h-4 w-4 ml-auto" />
          ) : (
            <ChevronRight className="h-4 w-4 ml-auto" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          {category.items.map(renderHelpItem)}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Central de Ajuda</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="faq" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
            <TabsTrigger value="search">Buscar Ajuda</TabsTrigger>
            <TabsTrigger value="tutorial">Tutorial Completo</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-4">
              {helpContent.map(renderCategory)}
            </div>
          </TabsContent>

          <TabsContent value="search" className="flex-1 flex flex-col">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Digite sua dúvida aqui..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {searchQuery && searchResults.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhum resultado encontrado para "{searchQuery}"</p>
                  <p className="text-sm mt-2">Tente usar palavras-chave diferentes ou navegue pelas categorias.</p>
                </div>
              )}
              
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-4">
                    {searchResults.length} resultado(s) encontrado(s)
                  </p>
                  {searchResults.map(renderHelpItem)}
                </div>
              )}
              
              {!searchQuery && (
                <div className="text-center py-8 text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Digite uma palavra-chave para buscar ajuda</p>
                  <p className="text-sm mt-2">Ex: "como salvar", "conectar loja", "templates"</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tutorial" className="flex-1 overflow-y-auto">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-4">Tutorial Interativo Completo</h3>
              <p className="text-gray-600 mb-6">
                Faça um tour completo pela ferramenta com demonstrações visuais passo a passo.
              </p>
              <Button 
                onClick={() => {
                  // Trigger the existing tutorial
                  onOpenChange(false);
                  setTimeout(() => {
                    (document.querySelector('[data-action="start-tutorial"]') as HTMLElement)?.click();
                  }, 100);
                }}
                className="mx-auto"
              >
                Iniciar Tutorial Completo
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HelpCenter;
