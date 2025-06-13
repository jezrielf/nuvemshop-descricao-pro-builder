
import React, { useState } from 'react';
import { ImageBlock as ImageBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { useImageUpload } from './image/hooks/useImageUpload';
import { useImageUploadFallback } from './image/hooks/useImageUploadFallback';
import ImageEditForm from './image/components/ImageEditForm';
import ImagePreview from './image/components/ImagePreview';
import { useToast } from '@/hooks/use-toast';
import { deepClone } from '@/utils/deepClone';

interface ImageBlockProps {
  block: ImageBlockType;
  isPreview?: boolean;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const { toast } = useToast();
  const isEditing = selectedBlockId === block.id && !isPreview;
  const [useFallback, setUseFallback] = useState(false);
  
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

  // Upload padrão para o Supabase
  const { uploading: standardUploading, uploadProgress: standardProgress, handleFileChange: standardFileChange } = useImageUpload({
    onSuccess: (url, alt) => {
      updateBlock(block.id, { 
        src: url,
        alt: alt
      });
    }
  });
  
  // Fallback upload usando Base64
  const { uploading: fallbackUploading, uploadProgress: fallbackProgress, handleFileChange: fallbackFileChange } = useImageUploadFallback({
    onSuccess: (url, alt) => {
      updateBlock(block.id, { 
        src: url,
        alt: alt
      });
    }
  });
  
  // Handle file change with error handling
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // Tente o upload padrão primeiro
      if (!useFallback) {
        const result = await standardFileChange(e);
        
        // Se falhar, mudar para o método alternativo
        if (!result) {
          setUseFallback(true);
          toast({
            title: "Usando método alternativo",
            description: "Não foi possível fazer upload para o servidor. Usando método alternativo.",
          });
          
          // Tente novamente com o fallback
          await fallbackFileChange(e);
        }
      } else {
        // Já está usando o fallback
        await fallbackFileChange(e);
      }
    } catch (error) {
      console.error('Erro no upload de imagem:', error);
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao fazer upload da imagem. Use a URL direta ou escolha da biblioteca.",
        variant: "destructive",
      });
    }
  };
  
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
          uploading={useFallback ? fallbackUploading : standardUploading}
          uploadProgress={useFallback ? fallbackProgress : standardProgress}
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
