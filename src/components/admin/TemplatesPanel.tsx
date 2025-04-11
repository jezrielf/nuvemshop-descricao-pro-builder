
import React from 'react';
import { getCategoryName } from './templates/utils';
import { useTemplateManagement } from '@/hooks/useTemplateManagement';
import TemplateActionPanel from './templates/panels/TemplateActionPanel';
import TemplateFilterPanel from './templates/panels/TemplateFilterPanel';

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
  } = useTemplateManagement();

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default TemplatesPanel;
