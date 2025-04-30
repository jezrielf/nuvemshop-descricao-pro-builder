
import React from 'react';
import { useNimbusUI } from '../NimbusProvider';
import { Switch } from '@/components/ui/switch';

interface NimbusToggleProps {
  className?: string;
}

export const NimbusToggle: React.FC<NimbusToggleProps> = ({ className = '' }) => {
  const { useNimbusUI, toggleNimbusUI } = useNimbusUI();
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Switch 
        id="nimbus-ui-toggle"
        checked={useNimbusUI} 
        onCheckedChange={toggleNimbusUI} 
      />
      <label 
        htmlFor="nimbus-ui-toggle" 
        className="text-xs font-medium cursor-pointer"
      >
        {useNimbusUI ? 'Nimbus UI Ativo' : 'Nimbus UI'}
      </label>
    </div>
  );
};
