
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { NimbusBadge } from '../../NimbusProvider';

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
      <NimbusBadge variant="default">
        Produto da Nuvemshop
      </NimbusBadge>
      <span className="font-medium truncate max-w-[200px]">{productName}</span>
      {hasCustomBlocks && (
        <NimbusBadge variant="info">
          Descrição personalizada
        </NimbusBadge>
      )}
      {conversionError && (
        <NimbusBadge variant="warning">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Problema na conversão
        </NimbusBadge>
      )}
    </div>
  );
};
