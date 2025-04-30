
import React from 'react';
import { useNimbusUI } from '../NimbusProvider';
import { Switch } from '@/components/ui/switch';
import { SunMoon, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NimbusToggleProps {
  className?: string;
  showIcon?: boolean;
  showLabel?: boolean;
}

export const NimbusToggle: React.FC<NimbusToggleProps> = ({ 
  className = '',
  showIcon = true,
  showLabel = true
}) => {
  const { useNimbusUI: isNimbusUIActive, toggleNimbusUI } = useNimbusUI();
  const { toast } = useToast();
  
  const handleToggle = () => {
    toggleNimbusUI();
    
    toast({
      title: isNimbusUIActive ? 'Tema padrão ativado' : 'Nimbus UI ativado',
      description: isNimbusUIActive 
        ? 'Voltando para o tema padrão da interface' 
        : 'Interface Nimbus da Nuvemshop ativada',
    });
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <Palette className="h-4 w-4 text-gray-500" />
      )}
      <Switch 
        id="nimbus-ui-toggle"
        checked={isNimbusUIActive} 
        onCheckedChange={handleToggle}
      />
      {showLabel && (
        <label 
          htmlFor="nimbus-ui-toggle" 
          className="text-xs font-medium cursor-pointer"
        >
          {isNimbusUIActive ? 'Nimbus UI Ativo' : 'Nimbus UI'}
        </label>
      )}
    </div>
  );
};
