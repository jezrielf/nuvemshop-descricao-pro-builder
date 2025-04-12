
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { v4 as uuidv4 } from 'uuid';

export const generateBenefitsSection = (addBlock: (block: Block) => void) => {
  // Benefits checklist section
  const benefitsBlock = createBlock('benefits', 3);
  if (benefitsBlock && benefitsBlock.type === 'benefits') {
    benefitsBlock.heading = 'Com o Protocolo Saúde e Bem-estar você vai:';
    benefitsBlock.benefits = [
      {
        id: uuidv4(),
        title: 'Blindar seu sistema imunológico',
        description: 'Reforce suas defesas naturais contra doenças e infecções',
        icon: 'shield'
      },
      {
        id: uuidv4(),
        title: 'Eliminar toxinas profundas do organismo',
        description: 'Remova impurezas acumuladas que afetam sua energia',
        icon: 'filter'
      },
      {
        id: uuidv4(),
        title: 'Limpar veias e artérias',
        description: 'Promova uma circulação saudável e previna problemas cardiovasculares',
        icon: 'heart-pulse'
      },
      {
        id: uuidv4(),
        title: 'Acabar com o cansaço e aumentar a libido',
        description: 'Recupere sua vitalidade e disposição para atividades diárias',
        icon: 'zap'
      },
      {
        id: uuidv4(),
        title: 'Desfrutar de noites de sono iguais às de um bebê',
        description: 'Durma profundamente e acorde renovado todas as manhãs',
        icon: 'moon'
      }
    ];
    benefitsBlock.style = {
      backgroundColor: '#f8f9fa',
      headingColor: '#5A2D82',
      borderRadius: 'md',
      padding: 'md',
    };
    addBlock(benefitsBlock);
  }
};
