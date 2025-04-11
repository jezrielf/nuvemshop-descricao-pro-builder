
import React from 'react';
import { useTemplateStore } from '@/store/templateStore';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Template as TemplateType } from '@/types/editor';

const TemplateSelector: React.FC = () => {
  const { templates, categories, selectCategory, getTemplatesByCategory, selectedCategory } = useTemplateStore();
  const { loadTemplate } = useEditorStore();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { toast } = useToast();
  
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
    other: 'Outros'
  };
  
  const displayedTemplates = getTemplatesByCategory(selectedCategory);

  // Verifica se é um template avançado pelo ID
  const isAdvancedTemplate = (id: string) => id.startsWith('adv-');
  
  // Gera uma miniatura para o template
  const getTemplateThumbnail = (template: TemplateType) => {
    const category = template.category;
    
    // Miniaturas personalizadas por categoria
    switch(category) {
      case 'supplements':
        return 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd';
      case 'clothing':
        return 'https://images.unsplash.com/photo-1560243563-062bfc001d68';
      case 'shoes':
        return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff';
      case 'electronics':
        return 'https://images.unsplash.com/photo-1498049794561-7780e7231661';
      case 'energy':
        return 'https://images.unsplash.com/photo-1596803244618-8dbee441d70b';
      case 'accessories':
        return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30';
      default:
        return 'https://images.unsplash.com/photo-1553531384-411a247cce73';
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
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Escolha um Template</DialogTitle>
          <DialogDescription>
            Selecione um template para iniciar rapidamente sua descrição de produto.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col h-full mt-4">
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
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
          
          <ScrollArea className="flex-1 pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedTemplates.map((template) => (
                <div
                  key={template.id}
                  className="border rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="bg-gray-100 h-32 flex items-center justify-center overflow-hidden">
                    {isAdvancedTemplate(template.id) ? (
                      <img 
                        src={getTemplateThumbnail(template)} 
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Preview do Template
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{template.name}</h3>
                      {isAdvancedTemplate(template.id) && (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1 mb-3">
                      {categoryNames[template.category]}
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
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
