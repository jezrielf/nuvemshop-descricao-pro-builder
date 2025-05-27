
import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/store/editor';

export const usePreviewFocus = () => {
  const { focusedBlockId } = useEditorStore();
  const previewRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (focusedBlockId && previewRef.current) {
      // Find the block element in the preview
      const blockElement = previewRef.current.querySelector(`[data-preview-block-id="${focusedBlockId}"]`);
      
      if (blockElement) {
        // Smooth scroll to the focused block
        blockElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
        
        // Add temporary highlight effect
        blockElement.classList.add('preview-focused');
        setTimeout(() => {
          blockElement.classList.remove('preview-focused');
        }, 2000);
      }
    }
  }, [focusedBlockId]);
  
  return { previewRef };
};
