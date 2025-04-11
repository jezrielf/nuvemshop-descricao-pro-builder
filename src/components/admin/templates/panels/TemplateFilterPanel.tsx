
import React from 'react';
import { Template, ProductCategory } from '@/types/editor';
import TemplateFiltering from '../../templates/TemplateFiltering';

interface TemplateFilterPanelProps {
  displayedTemplates: Template[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
  onViewTemplate: (template: Template) => void;
  onEditTemplate: (template: Template) => void;
  onDeleteTemplate: (template: Template) => void;
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  getCategoryName: (category: ProductCategory) => string;
}

const TemplateFilterPanel: React.FC<TemplateFilterPanelProps> = ({
  displayedTemplates,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onViewTemplate,
  onEditTemplate,
  onDeleteTemplate,
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  getCategoryName
}) => {
  return (
    <TemplateFiltering
      displayedTemplates={displayedTemplates}
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
      categories={categories}
      onViewTemplate={onViewTemplate}
      onEditTemplate={onEditTemplate}
      onDeleteTemplate={onDeleteTemplate}
      currentPage={currentPage}
      totalPages={totalPages}
      onPreviousPage={onPreviousPage}
      onNextPage={onNextPage}
      getCategoryName={getCategoryName}
    />
  );
};

export default TemplateFilterPanel;
