
import React from 'react';
import { NimbusToggle } from '../NimbusToggle';
import { useNuvemshopAuth } from '../../hooks/useNuvemshopAuth';
import { NimbusBadge } from '../../NimbusProvider';
import { CheckCircle2 } from 'lucide-react';

interface NimbusHeaderProps {
  className?: string;
  showStoreName?: boolean;
}

export const NimbusHeader: React.FC<NimbusHeaderProps> = ({ 
  className = '',
  showStoreName = false
}) => {
  const { success: storeConnected, storeName } = useNuvemshopAuth();
  
  return (
    <div className={`flex items-center justify-between px-4 py-2 border-b bg-gray-50 ${className}`}>
      {showStoreName && storeConnected && storeName && (
        <NimbusBadge variant="success" className="mr-auto">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          {storeName}
        </NimbusBadge>
      )}
      <div className="ml-auto">
        <NimbusToggle />
      </div>
    </div>
  );
};
