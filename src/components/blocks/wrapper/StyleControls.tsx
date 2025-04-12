
import React from 'react';
import { BlockBase } from '@/types/editor';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

interface StyleControlsProps {
  block: BlockBase;
}

const StyleControls: React.FC<StyleControlsProps> = ({ block }) => {
  const { selectBlock } = useEditorStore();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6"
      title="Estilizar bloco"
      onClick={() => selectBlock(block.id)}
    >
      <Palette className="h-3 w-3" />
    </Button>
  );
};

export default StyleControls;
