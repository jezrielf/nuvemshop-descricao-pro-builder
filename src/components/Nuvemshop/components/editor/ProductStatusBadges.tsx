
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface ProductStatusBadgesProps {
  productName: string;
  hasCustomBlocks: boolean;
  conversionError: boolean;
}

export const ProductStatusBadges: React.FC<ProductStatusBadgesProps> = ({
  productName,
  hasCustomBlocks,
  conversionError
}) => {
  return (
    <div className="flex items-center gap-4">
      <Badge variant="outline" className="bg-white">
        Produto da Nuvemshop
      </Badge>
      <span className="font-medium truncate max-w-[200px]">{productName}</span>
      {hasCustomBlocks && (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Descrição personalizada
        </Badge>
      )}
      {conversionError && (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Problema na conversão
        </Badge>
      )}
    </div>
  );
};
