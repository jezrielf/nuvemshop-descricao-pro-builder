
import React from 'react';
import { ProductDescription } from '@/types/editor';
import { useEditorStore } from '@/store/editor';
import { SEOToolsMenu } from './menu/SEOToolsMenu';
import { updateBlockImage } from './utils/imageUtils';

interface SEOToolsProps {
  description: ProductDescription | null;
}

const SEOTools: React.FC<SEOToolsProps> = ({ description }) => {
  const { updateBlock } = useEditorStore();
  
  // Handler for updating image in a block
  const handleUpdateImage = (blockId: string, imageType: string, newImageUrl: string) => {
    updateBlockImage(blockId, imageType, newImageUrl, updateBlock, description);
  };
  
  return (
    <SEOToolsMenu 
      description={description}
      onUpdateImage={handleUpdateImage}
    />
  );
};

export default SEOTools;
