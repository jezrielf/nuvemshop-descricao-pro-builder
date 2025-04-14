
import React from 'react';
import { getCategoryName } from './templates/utils';
import { useTemplates } from '@/hooks/templates/useTemplates';
import TemplateActionPanel from './templates/panels/TemplateActionPanel';
import TemplateFilterPanel from './templates/panels/TemplateFilterPanel';
import { ScrollArea } from '@/components/ui/scroll-area';

const TemplatesPanel: React.FC = () => {
  const {
    displayedTemplates,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    editedTemplate,
    setEditedTemplate,
    newTemplate,
    setNewTemplate,
    categories,
    currentPage,
    totalPages,
    handleViewTemplate,
    handleCreateTemplate,
    handleUpdateTemplate,
    handleDeleteTemplate,
    handlePreviousPage,
    handleNextPage,
    handleAddBlock,
    handleRemoveBlock
  } = useTemplates();

  return (
    <div className="space-y-6 overflow-hidden max-h-full">
      <TemplateActionPanel
        editedTemplate={editedTemplate}
        setEditedTemplate={setEditedTemplate}
        newTemplate={newTemplate}
        setNewTemplate={setNewTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        onUpdateTemplate={handleUpdateTemplate}
        onCreateTemplate={handleCreateTemplate}
        onAddBlock={handleAddBlock}
        onRemoveBlock={handleRemoveBlock}
      />
      
      <ScrollArea className="max-h-[calc(100vh-300px)]">
        <TemplateFilterPanel
          displayedTemplates={displayedTemplates}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          onViewTemplate={handleViewTemplate}
          onEditTemplate={(template) => {
            handleViewTemplate(template);
            setEditedTemplate({...template});
          }}
          onDeleteTemplate={handleDeleteTemplate}
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          getCategoryName={getCategoryName}
        />
      </ScrollArea>
    </div>
  );
};

export default TemplatesPanel;
