
import React from 'react';
import { useTemplates } from '@/hooks/templates/useTemplates';
import { TemplateList } from './TemplateList';
import { TemplateHeader } from './TemplateHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TemplateDialogs } from './dialogs';

export const TemplatesView = () => {
  const { 
    templates,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredTemplates
  } = useTemplates();

  if (isLoading) {
    return <div>Carregando...</div>;
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
