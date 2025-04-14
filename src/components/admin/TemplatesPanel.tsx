
import React from 'react';
import { TemplatesView } from './templates/TemplatesView';

const TemplatesPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Templates</h1>
      </div>
      <TemplatesView />
    </div>
  );
};

export default TemplatesPanel;
