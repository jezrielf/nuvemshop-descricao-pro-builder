
import { useState, useEffect } from 'react';
import { useEditorStore } from '@/store/editor';

export const useBlockMinimization = (blockId: string) => {
  const { description } = useEditorStore();
  const [isMinimized, setIsMinimized] = useState(true); // Inicia minimizado por padrão
  
  // Reset minimization state when description changes (template/saved description loaded)
  useEffect(() => {
    if (description) {
      setIsMinimized(true);
    }
  }, [description?.id]);
  
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(prev => !prev);
  };
  
  return {
    isMinimized,
    setIsMinimized,
    toggleMinimize
  };
};
