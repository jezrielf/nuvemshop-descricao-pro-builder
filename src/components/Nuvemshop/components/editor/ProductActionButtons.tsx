
import React from 'react';
import { RefreshCw, Save } from 'lucide-react';
import { NimbusButton } from '../../NimbusProvider';

interface ProductActionButtonsProps {
  isSaving: boolean;
  isImporting: boolean;
  conversionError: boolean;
  hasDescription: boolean;
  onRefresh: () => void;
  onSave: () => void;
}

export const ProductActionButtons: React.FC<ProductActionButtonsProps> = ({
  isSaving,
  isImporting,
  conversionError,
  hasDescription,
  onRefresh,
  onSave
}) => {
  return (
    <div className="flex items-center space-x-2">
      {conversionError && (
        <NimbusButton
          variant="secondary"
          size="small"
          onClick={onRefresh}
          disabled={isImporting}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isImporting ? 'animate-spin' : ''}`} />
          Tentar novamente
        </NimbusButton>
      )}
      
      <NimbusButton
        variant="primary"
        size="small"
        disabled={isSaving || !hasDescription || isImporting}
        onClick={onSave}
      >
        {isSaving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
        Salvar na Nuvemshop
      </NimbusButton>
    </div>
  );
};
