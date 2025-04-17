
import React from 'react';
import { ProductDescription } from '@/types/editor';
import { useEditorStore } from '@/store/editor';
import { updateBlockImage } from './utils/imageUtils';
import { SEOToolsMenu } from './menu/SEOToolsMenu';

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
