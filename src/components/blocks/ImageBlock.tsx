
import React from 'react';
import { ImageBlock as ImageBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { useImageUpload } from './image/hooks/useImageUpload';
import ImageEditForm from './image/components/ImageEditForm';
import ImagePreview from './image/components/ImagePreview';

interface ImageBlockProps {
  block: ImageBlockType;
  isPreview?: boolean;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdateSrc = (src: string) => {
    updateBlock(block.id, { src });
  };
  
  const handleUpdateAlt = (alt: string) => {
    updateBlock(block.id, { alt });
  };
  
  const handleUpdateCaption = (caption: string) => {
    updateBlock(block.id, { caption });
  };
  
  const handleSelectFromLibrary = (imageUrl: string, alt: string) => {
    updateBlock(block.id, { 
      src: imageUrl,
      alt: alt 
    });
  };

  const { uploading, uploadProgress, handleFileChange } = useImageUpload({
    onSuccess: (url, alt) => {
      updateBlock(block.id, { 
        src: url,
        alt: alt
      });
    }
  });
  
  if (isPreview) {
    return <ImagePreview block={block} />;
  }
  
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <ImageEditForm
          src={block.src}
          alt={block.alt}
          caption={block.caption || ''}
          blockId={block.id}
          uploading={uploading}
          uploadProgress={uploadProgress}
          onUpdateSrc={handleUpdateSrc}
          onUpdateAlt={handleUpdateAlt}
          onUpdateCaption={handleUpdateCaption}
          onSelectFromLibrary={handleSelectFromLibrary}
          onFileChange={handleFileChange}
        />
      </div>
    </BlockWrapper>
  );
};

export default ImageBlock;
