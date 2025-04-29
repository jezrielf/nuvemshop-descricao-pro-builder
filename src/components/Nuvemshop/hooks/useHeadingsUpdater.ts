
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { ProductDescription } from '@/types/editor';

export interface HeadingSuggestion {
  level: number;
  text: string;
  original?: string;
}

export const useHeadingsUpdater = (onSave?: () => Promise<boolean>) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { description, updateDescription } = useEditorStore();
  const { toast } = useToast();

  // Function to update headings in the HTML content of blocks
  const updateHeadingsInBlocks = (
    blocks: ProductDescription['blocks'], 
    headings: HeadingSuggestion[]
  ) => {
    if (!blocks || blocks.length === 0) {
      return blocks;
    }

    return blocks.map(block => {
      // Only process text-based blocks
      if (block.type !== 'text' || !block.content) {
        return block;
      }
      
      let updatedContent = block.content;
      
      // Replace heading tags based on our suggestions
      // This is a simplified approach that works for basic HTML
      headings.forEach(heading => {
        if (heading.original) {
          // Replace existing heading with a new one
          const regex = new RegExp(`<h\\d[^>]*>(${escapeRegExp(heading.original)})<\\/h\\d>`, 'gi');
          updatedContent = updatedContent.replace(regex, `<h${heading.level}>${heading.text}</h${heading.level}>`);
        } else {
          // Check if this is a suggested new heading that matches the block title/heading
          if (block.heading && block.heading === heading.text) {
            // If the block title matches our new heading suggestion, add it as H1 at the beginning
            if (heading.level === 1 && !/<h1[^>]*>/i.test(updatedContent)) {
              updatedContent = `<h1>${heading.text}</h1>${updatedContent}`;
            }
          }
        }
      });
      
      return {
        ...block,
        content: updatedContent,
      };
    });
  };
  
  // Helper function to escape special characters in regex
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Function to apply heading updates and save the description
  const applyHeadingChanges = async (headings: HeadingSuggestion[]) => {
    if (!description) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Nenhuma descrição carregada para atualizar.',
      });
      return false;
    }

    try {
      setIsUpdating(true);
      
      // Update headings in blocks
      const updatedBlocks = updateHeadingsInBlocks(description.blocks, headings);
      
      // Update description in store
      updateDescription({
        ...description,
        blocks: updatedBlocks,
        updatedAt: new Date().toISOString(),
      });
      
      // If a save function is provided, call it
      if (onSave) {
        const saveSuccess = await onSave();
        if (!saveSuccess) {
          toast({
            variant: 'destructive',
            title: 'Erro ao salvar',
            description: 'A estrutura de headings foi atualizada, mas não foi possível salvar as mudanças.',
          });
          return false;
        }
      }
      
      toast({
        title: 'Headings atualizados',
        description: 'A estrutura de headings foi atualizada com sucesso.',
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar headings:', error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível atualizar os headings na descrição.',
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    applyHeadingChanges,
  };
};
