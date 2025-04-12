
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { v4 as uuidv4 } from 'uuid';

export const generateGuaranteesSection = (addBlock: (block: Block) => void) => {
  // Quality guarantees section
  const guaranteesBlock = createBlock('features', 2);
  if (guaranteesBlock && guaranteesBlock.type === 'features') {
    guaranteesBlock.heading = 'Nosso Compromisso com a Qualidade';
    guaranteesBlock.features = [
      {
        id: uuidv4(),
        title: 'Produtos testados e aprovados',
        description: 'Todos os produtos passam por rigorosos testes de qualidade e eficácia',
        icon: 'check-circle'
      },
      {
        id: uuidv4(),
        title: '100% naturais e sem açúcar',
        description: 'Formulações puras e limpas, sem aditivos artificiais',
        icon: 'leaf'
      },
      {
        id: uuidv4(),
        title: 'Não contém glúten',
        description: 'Seguro para pessoas com sensibilidade ou intolerância ao glúten',
        icon: 'shield'
      },
      {
        id: uuidv4(),
        title: 'Fórmulas exclusivas',
        description: 'Desenvolvidas por especialistas para máxima eficácia',
        icon: 'flask-conical'
      },
      {
        id: uuidv4(),
        title: 'Fontes de alto valor biológico',
        description: 'Matérias-primas selecionadas para garantir absorção e biodisponibilidade',
        icon: 'star'
      }
    ];
    guaranteesBlock.style = {
      backgroundColor: '#ffffff',
      headingColor: '#5A2D82',
      padding: 'md',
      borderRadius: 'md',
    };
    addBlock(guaranteesBlock);
  }
};
