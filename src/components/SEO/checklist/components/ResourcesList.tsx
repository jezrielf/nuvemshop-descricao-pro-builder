
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const ResourcesList: React.FC = () => {
  return (
    <div className="pt-4">
      <h3 className="text-md font-medium px-1 mb-2">Recursos para melhorar seu SEO</h3>
      <div className="space-y-2">
        <a href="https://moz.com/learn/seo/on-page-factors" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border rounded-md hover:bg-gray-50">
          <ExternalLink className="h-4 w-4 mr-2 text-blue-500" />
          <span>Guia de SEO On-Page da Moz</span>
        </a>
        <a href="https://developers.google.com/search/docs/beginner/seo-starter-guide" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border rounded-md hover:bg-gray-50">
          <ExternalLink className="h-4 w-4 mr-2 text-blue-500" />
          <span>Guia de Início para SEO do Google</span>
        </a>
      </div>
    </div>
  );
};
