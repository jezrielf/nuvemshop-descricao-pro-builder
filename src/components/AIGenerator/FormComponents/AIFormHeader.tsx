
import React from 'react';
import { Sparkles } from 'lucide-react';

const AIFormHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Sparkles className="h-5 w-5 text-violet-600" />
      <h2 className="text-xl font-semibold text-violet-900">Gerador de Descrição com IA</h2>
    </div>
  );
};

export default AIFormHeader;
