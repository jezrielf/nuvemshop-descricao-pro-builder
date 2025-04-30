
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { HeadingStructure, HeadingSuggestion } from '../types/headingTypes';

export const useHeadingAutoCorrect = (
  headingStructure: HeadingStructure,
  currentProductTitle?: string,
  productId?: number,
  onUpdateHeadings?: (headings: HeadingSuggestion[]) => Promise<boolean>
) => {
  const [isProcessingAutoCorrect, setIsProcessingAutoCorrect] = useState(false);
  const { toast } = useToast();

  const applyAutomaticCorrection = async (): Promise<boolean> => {
    if (!headingStructure || !onUpdateHeadings) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível iniciar a correção automática.',
      });
      return false;
    }

    try {
      setIsProcessingAutoCorrect(true);

      // Criar uma análise do que precisa ser ajustado
      // As regras são:
      // 1. O título do produto sempre deve ser o H1
      // 2. Não deve haver saltos na hierarquia
      // 3. Headings devem seguir a ordem lógica H1 -> H2 -> H3 -> H4...
      
      // Primeiro, vamos pegar todos os headings existentes
      let autoFixedHeadings: HeadingSuggestion[] = [...headingStructure.headings]
        .filter(h => h.level !== 1) // Remover todos os H1 existentes (usaremos o título do produto)
        .map(h => ({
          level: h.level,
          text: h.text,
          original: h.text
        }));

      // Agora, vamos ajustar a hierarquia
      if (autoFixedHeadings.length > 0) {
        // Organize todos os cabeçalhos começando do H2
        autoFixedHeadings = autoFixedHeadings.sort((a, b) => {
          // Primeiro, ordenar pela posição original
          const indexA = headingStructure.headings.findIndex(h => h.text === a.original);
          const indexB = headingStructure.headings.findIndex(h => h.text === b.original);
          return indexA - indexB;
        });

        // Ajustar níveis para garantir hierarquia correta
        let currentLevel = 2; // Começamos com H2 após o H1 (título do produto)
        let previousLevel = 1; // O nível anterior é H1 (título do produto)

        autoFixedHeadings = autoFixedHeadings.map((h, index) => {
          // Se o nível atual é mais que 1 nível abaixo do anterior, ajuste
          if (h.level > previousLevel + 1) {
            h.level = previousLevel + 1;
          }
          
          // Se este é o primeiro heading após o H1, deve ser H2
          if (index === 0) {
            h.level = 2;
          }
          
          // Se o nível é menor que 2, ajuste para 2 (já que H1 é o título)
          if (h.level < 2) {
            h.level = 2;
          }
          
          // Atualizar o nível anterior para o próximo item
          previousLevel = h.level;
          return h;
        });
      }
      
      // Aplicar as alterações na estrutura de headings
      console.log("Aplicando correção automática de headings:", autoFixedHeadings);
      const success = await onUpdateHeadings(autoFixedHeadings);
      
      if (success) {
        toast({
          title: "Estrutura corrigida",
          description: "A estrutura de headings foi corrigida automaticamente.",
        });
      } else {
        toast({
          variant: 'destructive',
          title: "Erro",
          description: "Não foi possível aplicar a correção automática.",
        });
      }
      
      return success;
    } catch (error) {
      console.error("Erro ao aplicar correção automática:", error);
      toast({
        variant: 'destructive',
        title: "Erro",
        description: "Ocorreu um erro ao processar a correção automática.",
      });
      return false;
    } finally {
      setIsProcessingAutoCorrect(false);
    }
  };

  return {
    isProcessingAutoCorrect,
    applyAutomaticCorrection
  };
};
