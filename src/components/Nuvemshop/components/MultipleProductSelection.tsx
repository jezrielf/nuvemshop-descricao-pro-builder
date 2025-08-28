import React from 'react';
import BulkProductManager from './BulkProductManager';
import { NuvemshopProduct } from '../types';

interface MultipleProductSelectionProps {
  products: NuvemshopProduct[];
  isOpen: boolean;
  onClose: () => void;
  onApplyToProducts: (productIds: number[], onStatusChange?: (productId: number, status: 'pending' | 'success' | 'error', message?: string) => void) => Promise<void>;
  onReconnect?: () => void;
  description?: string;
  getHtmlOutput?: () => string;
}

const MultipleProductSelection: React.FC<MultipleProductSelectionProps> = (props) => {
  // Forward to the new enhanced component
  return <BulkProductManager {...props} />;
};

export default MultipleProductSelection;
