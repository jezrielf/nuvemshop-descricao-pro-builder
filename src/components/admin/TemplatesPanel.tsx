
import React from 'react';
import { TemplatesView } from './templates/TemplatesView';
import { TemplateDialogsProvider } from '@/contexts/TemplateDialogsContext';

const TemplatesPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <TemplateDialogsProvider>
        <TemplatesView />
      </TemplateDialogsProvider>
    </div>
  );
};

export default TemplatesPanel;
