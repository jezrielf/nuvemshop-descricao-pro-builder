
import React from 'react';
import { useTemplates } from '@/hooks/useTemplates';
import TemplateActions from './templates/TemplateActions';
import TemplateFiltering from './templates/TemplateFiltering';
import { Template } from '@/types/editor';
import { getCategoryName } from './templates/utils';

const TemplatesPanel: React.FC = () => {
  const {
    displayedTemplates,
    selectedTemplate,
    setSelectedTemplate,
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
    handleDeleteTemplate,
    handleUpdateTemplate,
    handlePreviousPage,
    handleNextPage,
    handleAddBlock,
    handleRemoveBlock
  } = useTemplates();

  const handleView = (template: Template) => {
    handleViewTemplate(template);
  };

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setEditedTemplate({...template});
  };

  return (
    <div className="space-y-6">
      <TemplateActions
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
      
      <TemplateFiltering
        displayedTemplates={displayedTemplates}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        onViewTemplate={handleView}
        onEditTemplate={handleEditTemplate}
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
