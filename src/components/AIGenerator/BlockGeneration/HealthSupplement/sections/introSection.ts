
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export const generateIntroSection = (addBlock: (block: Block) => void) => {
  // Add image with text to show the product and introduction
  const introBlock = createBlock('textImage', 1);
  if (introBlock && introBlock.type === 'textImage') {
    introBlock.heading = 'A Solução Completa para uma Vida Saudável e Equilibrada';
    introBlock.content = `
      <h3 style="font-size: 22px; font-weight: bold; color: #69B345; margin: 0 0 20px 0;">
        Nutrição natural que te restaura por dentro e faz transparecer por fora
      </h3>
      <p>Manter a saúde em dia não precisa ser um desafio impossível. Sabemos que, com a rotina agitada, encontrar tempo e disposição para cuidar de si mesma parece cada vez mais complicado.</p>
      <p>Mas e se houvesse uma maneira simples, eficaz e acessível de transformar sua saúde de dentro para fora?</p>
      <p>Com o Protocolo, você tem nas mãos o que há de mais avançado para cuidar do seu corpo e da sua mente, sem abrir mão de nada.</p>
      <p>Garanta agora mesmo o seu, contendo Vitamina D, Clorella, Triple Ômega, Feno Grego e Melatonina+.</p>
    `;
    introBlock.image = {
      src: 'public/lovable-uploads/173953f8-2412-4deb-a922-fd45db85f37f.png',
      alt: 'Protocolo Saúde e Bem-estar'
    };
    introBlock.style = {
      backgroundColor: '#ffffff',
      headingColor: '#5A2D82',
      textColor: '#333',
    };
    addBlock(introBlock);
  }
};
