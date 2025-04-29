
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { ProductDescription } from '@/types/editor';
import { HeadingSuggestion } from '@/components/SEO/diagnostics/types/headingTypes';

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

    // Separar H1 dos outros headings para tratamento especial
    const h1Heading = headings.find(h => h.level === 1);
    const otherHeadings = headings.filter(h => h.level !== 1);

    return blocks.map(block => {
      // Only process text-based blocks
      if (block.type !== 'text' || !block.content) {
        return block;
      }
      
      let updatedContent = block.content;
      
      // Replace non-H1 heading tags based on our suggestions
      otherHeadings.forEach(heading => {
        if (heading.original) {
          // Replace existing heading with a new one
          const regex = new RegExp(`<h\\d[^>]*>(${escapeRegExp(heading.original)})<\\/h\\d>`, 'gi');
          updatedContent = updatedContent.replace(regex, `<h${heading.level}>${heading.text}</h${heading.level}>`);
        } else if (block.heading && block.heading === heading.text) {
          // Se o título do bloco corresponde à nossa sugestão de heading, adicione como tag H
          if (!new RegExp(`<h${heading.level}[^>]*>${escapeRegExp(heading.text)}<\\/h${heading.level}>`, 'i').test(updatedContent)) {
            updatedContent = `<h${heading.level}>${heading.text}</h${heading.level}>${updatedContent}`;
          }
        }
      });
      
      return {
        ...block,
        content: updatedContent,
        // Se for o primeiro bloco e tiver uma sugestão de H1, atualize o título do bloco
        // mas não adicione H1 no conteúdo HTML
        heading: block === blocks[0] && h1Heading ? h1Heading.text : block.heading
      };
    });
  };
  
  // Helper function to escape special characters in regex
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Function to apply heading updates and save the description
  const applyHeadingChanges = async (headings: HeadingSuggestion[], productTitle?: string) => {
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
      
      // Se temos um título de produto e não há um H1 nas sugestões, adicionamos um
      if (productTitle && !headings.some(h => h.level === 1)) {
        headings.unshift({
          level: 1,
          text: productTitle,
        });
      }
      
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
