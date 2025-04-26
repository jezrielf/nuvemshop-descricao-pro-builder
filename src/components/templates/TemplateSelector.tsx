import React, { useState } from 'react';
import { useTemplateStore } from '@/store/templates';
import { Template } from '@/types/editor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTemplateUtils } from '@/components/templates/useTemplateUtils';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ isOpen, onClose, onSelectTemplate }) => {
  const { templates, categories, selectedCategory, setSelectedCategory } = useTemplateStore();
  const { getCategoryName } = useTemplateUtils();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter templates based on search query and selected category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Selecionar um Template</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category.value} value={category.value}>
                {getCategoryName(category.value as any)}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(template => (
              <Button
                key={template.id}
                variant="outline"
                className="h-auto p-4 text-left"
                onClick={() => {
                  onSelectTemplate(template);
                  onClose();
                }}
              >
                <div className="font-medium">{template.name}</div>
                <p className="text-sm text-gray-500">{template.description}</p>
              </Button>
            ))}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
