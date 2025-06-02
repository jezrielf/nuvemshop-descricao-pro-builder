
import React from 'react';
import { Button } from '@/components/ui/button';

const AccessDenied: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-2">Acesso Restrito</h1>
      <p className="text-gray-600 mb-4">Você não tem permissão para acessar esta área.</p>
      <Button onClick={() => window.location.href = '/'}>Voltar para a Página Inicial</Button>
    </div>
  );
};

export default AccessDenied;
