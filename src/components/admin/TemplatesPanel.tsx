
import React from 'react';
import { useTemplates } from '@/hooks/useTemplates';
import TemplateActions from './templates/TemplateActions';
import TemplateFiltering from './templates/TemplateFiltering';

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
    handleNextPage
  } = useTemplates();

  const handleView = (template: React.SetStateAction<import("@/types/editor").Template | null>) => {
    if (typeof template === 'function') {
      setSelectedTemplate(template);
      return;
    }
    handleViewTemplate(template);
  };

  const handleEditTemplate = (template: import("@/types/editor").Template) => {
    setSelectedTemplate(template);
    setEditedTemplate({...template});
  };

  return (
    <div className="space-y-6">
      <TemplateActions
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        editedTemplate={editedTemplate}
        setEditedTemplate={setEditedTemplate}
        newTemplate={newTemplate}
        setNewTemplate={setNewTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        onUpdateTemplate={handleUpdateTemplate}
        onCreateTemplate={handleCreateTemplate}
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
        onDeleteTemplate={(template) => handleView(template)}
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default TemplatesPanel;
