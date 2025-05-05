
import React from 'react';
import { Loader2 } from 'lucide-react';

const ResetVerifying: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="flex justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
      <p className="mt-4 text-gray-600">Verificando seu link de redefinição de senha...</p>
    </div>
  );
};

export default ResetVerifying;
