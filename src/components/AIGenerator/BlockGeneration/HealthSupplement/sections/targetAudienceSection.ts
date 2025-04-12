
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateTargetAudienceSection = (addBlock: (block: Block) => void) => {
  // Target audience section
  const targetAudienceBlock = createBlock('text', 1);
  if (targetAudienceBlock && targetAudienceBlock.type === 'text') {
    targetAudienceBlock.heading = 'Para quem é o Protocolo Saúde?';
    targetAudienceBlock.content = `
      <h3 style="font-size: 22px; font-weight: bold; color: #69B345; margin: 0 0 30px 0;">
        Descubra como o Protocolo Saúde e Bem-estar pode transformar sua vida de maneira holística
      </h3>
      <p>O kit é destinado a quem busca não apenas tratar sintomas, mas adotar uma abordagem completa para o bem-estar físico e mental. Ideal para pessoas que entendem a importância de um corpo em equilíbrio, ele é o suporte essencial para quem quer viver com mais energia, disposição e serenidade.</p>
      <p>Cuidar da sua saúde impacta diretamente em todas as áreas da sua vida, desde a produtividade no trabalho até a qualidade das suas relações pessoais. Quando você se sente bem, é mais fácil encarar os desafios diários com confiança e vitalidade.</p>
      <p>Ninguém quer estar ao lado de alguém que constantemente enfrenta problemas de saúde, seja na vida pessoal ou profissional. Demonstrar cuidado com o seu corpo é um sinal de respeito consigo mesmo e com os outros, refletindo uma postura positiva e proativa diante da vida.</p>
      <p>Incorporar o combo à sua rotina diária, é como ter um aliado poderoso que cuida de você por completo, desde o fortalecimento do sistema imunológico até o equilíbrio hormonal e a saúde cardiovascular. Tudo o que você precisa agora é assumir o controle do seu bem-estar, vivendo cada dia com mais felicidade.</p>
    `;
    targetAudienceBlock.style = {
      backgroundColor: '#f8f9fa',
      headingColor: '#5A2D82',
      padding: 'lg',
      borderRadius: 'lg',
    };
    addBlock(targetAudienceBlock);
  }
};
