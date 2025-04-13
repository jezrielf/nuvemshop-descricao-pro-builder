
import React from 'react';
import { Search, Loader2 } from 'lucide-react';

interface EmptyStateProps {
  analyzing: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ analyzing }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-500">
      {analyzing ? (
        <>
          <Loader2 className="h-8 w-8 mb-4 animate-spin" />
          <p>Analisando sua descrição...</p>
          <p className="text-sm mt-1">Isso pode levar alguns segundos.</p>
        </>
      ) : (
        <>
          <Search className="h-8 w-8 mb-4 opacity-20" />
          <p>Insira uma palavra-chave e clique em "Analisar" para avaliar sua descrição.</p>
          <p className="text-sm mt-1">Receba dicas para melhorar seu SEO.</p>
        </>
      )}
    </div>
  );
};
