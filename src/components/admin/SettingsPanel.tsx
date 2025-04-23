import React from 'react';
import LandingPageImageManager from './LandingPageImageManager';

const SettingsPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      
      <div className="border-t pt-6">
        <LandingPageImageManager />
      </div>
    </div>
  );
};

export default SettingsPanel;
