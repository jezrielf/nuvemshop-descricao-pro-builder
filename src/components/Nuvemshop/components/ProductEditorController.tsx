
import React, { useState, useEffect } from 'react';
import { NuvemshopProduct } from '../types';
import { useNuvemshopAuth } from '../hooks/useNuvemshopAuth';
import { useEditorStore } from '@/store/editor';
import { useProductDescriptionLoader } from '../hooks/useProductDescriptionLoader';
import { useProductDescriptionSaver } from '../hooks/useProductDescriptionSaver';
import { ProductStatusBadges } from './editor/ProductStatusBadges';
import { ProductActionButtons } from './editor/ProductActionButtons';
import { useNimbusUI } from '../NimbusProvider';

interface ProductEditorControllerProps {
  className?: string;
  product: NuvemshopProduct;
}

const ProductEditorController: React.FC<ProductEditorControllerProps> = ({ 
  className,
  product
}) => {
  const [hasCustomBlocks, setHasCustomBlocks] = useState(false);
  const { accessToken, userId } = useNuvemshopAuth();
  const { description } = useEditorStore();
  const { useNimbusUI } = useNimbusUI();
  
  const {
    isImporting,
    conversionError,
    setConversionError,
    loadProductDescription
  } = useProductDescriptionLoader();

  const {
    isSaving,
    handleSaveToNuvemshop
  } = useProductDescriptionSaver(accessToken, userId);

  const productName = typeof product.name === 'string'
    ? product.name
    : (product.name?.pt || 'Produto');

  useEffect(() => {
    if (product) {
      loadProductDescription(product);
    }
  }, [product]);

  const handleRefreshDescription = () => {
    if (product) {
      loadProductDescription(product);
    }
  };

  const handleSave = async () => {
    const success = await handleSaveToNuvemshop(product);
    if (success) {
      setHasCustomBlocks(true);
    }
  };

  // Add Nimbus UI styling based on toggle
  const bgClass = useNimbusUI 
    ? 'bg-blue-50 border-b border-blue-100' 
    : 'bg-green-50 border-b border-green-100';

  return (
    <div className={`flex items-center justify-between p-2 ${bgClass} ${className}`}>
      <ProductStatusBadges 
        productName={productName}
        hasCustomBlocks={hasCustomBlocks}
        conversionError={conversionError}
        useNimbusUI={useNimbusUI}
      />
      
      <ProductActionButtons
        isSaving={isSaving}
        isImporting={isImporting}
        conversionError={conversionError}
        hasDescription={!!description}
        onRefresh={handleRefreshDescription}
        onSave={handleSave}
        useNimbusUI={useNimbusUI}
      />
    </div>
  );
};

export default ProductEditorController;
