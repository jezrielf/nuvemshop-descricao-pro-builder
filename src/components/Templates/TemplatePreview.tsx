
import React from 'react';
import { Template } from '@/types/editor';

interface TemplatePreviewProps {
  template: Template;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all">
      <div className="aspect-video bg-gray-200 overflow-hidden">
        <img 
          src={template.thumbnailUrl} 
          alt={`Preview de ${template.name}`}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <h3 className="text-white font-medium truncate">{template.name}</h3>
        <p className="text-gray-300 text-sm capitalize">{template.category}</p>
      </div>
    </div>
  );
};

export default TemplatePreview;
