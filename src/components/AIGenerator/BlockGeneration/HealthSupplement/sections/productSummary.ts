
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateProductSummary = (addBlock: (block: Block) => void) => {
  // Product summary text
  const summaryBlock = createBlock('text', 1);
  if (summaryBlock && summaryBlock.type === 'text') {
    summaryBlock.heading = 'Cinco produtos essenciais para melhorar sua qualidade de vida e garantir energia, equilíbrio e serenidade em cada dia';
    summaryBlock.content = `
      <p>O estresse, a má alimentação e a correria do dia a dia não perdoam. A cada ano que passa, os sinais de desgaste ficam mais evidentes: falta de disposição, dificuldades para manter o foco, oscilações de humor, e até mesmo aquelas dores que insistem em aparecer. Mas não precisa ser assim. Com o Protocolo Saúde e Bem-estar, você tem ao seu alcance a chave para reequilibrar seu corpo e redescobrir o prazer de viver com plenitude.</p>
      <p>Cada produto do Protocolo, foi cuidadosamente selecionado para oferecer a você uma experiência de bem-estar completa e integrada. Juntos, eles formam uma poderosa aliança para transformar sua saúde e qualidade de vida de forma significativa e duradoura.</p>
    `;
    summaryBlock.style = {
      backgroundColor: '#ffffff',
      headingColor: '#5A2D82',
    };
    addBlock(summaryBlock);
  }
};
