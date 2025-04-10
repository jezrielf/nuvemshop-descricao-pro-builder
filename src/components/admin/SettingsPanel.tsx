
import React from 'react';

const SettingsPanel: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Configurações do Sistema</h2>
      <p className="text-gray-500">Esta é a área de configurações do sistema. Aqui você poderá definir parâmetros globais e configurações avançadas.</p>
      
      <div className="mt-6 border-t pt-4">
        <h3 className="font-medium mb-2">Limite de Descrições para Usuários Gratuitos</h3>
        <p className="text-sm text-gray-600 mb-4">Usuários gratuitos podem criar até 3 descrições. Usuários premium têm acesso ilimitado.</p>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <h3 className="font-medium mb-2">Períodos de Inatividade</h3>
        <p className="text-sm text-gray-600 mb-4">Aqui você poderá configurar períodos de inatividade e outras políticas relacionadas a contas de usuário.</p>
      </div>
    </div>
  );
};

export default SettingsPanel;
