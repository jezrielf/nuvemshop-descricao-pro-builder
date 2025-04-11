
import React from 'react';
import { Card } from '@/components/ui/card';
import { Template, ProductCategory } from '@/types/editor';
import TemplateSearch from './TemplateSearch';
import TemplateList from './TemplateList';
import Pagination from './Pagination';

interface TemplateFilteringProps {
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

const TemplateFiltering: React.FC<TemplateFilteringProps> = ({
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
    <>
      <TemplateSearch
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        getCategoryName={getCategoryName}
      />
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <TemplateList
            templates={displayedTemplates}
            onView={onViewTemplate}
            onEdit={onEditTemplate}
            onDelete={onDeleteTemplate}
            getCategoryName={getCategoryName}
          />
        </div>
      </Card>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={onPreviousPage}
        onNext={onNextPage}
        isPreviousDisabled={currentPage <= 1}
        isNextDisabled={currentPage >= totalPages}
      />
    </>
  );
};

export default TemplateFiltering;
