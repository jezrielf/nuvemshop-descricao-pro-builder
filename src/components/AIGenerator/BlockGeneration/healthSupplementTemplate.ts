
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { v4 as uuidv4 } from 'uuid';

export const generateHealthSupplementTemplate = (addBlock: (block: Block) => void) => {
  // Create the hero block with a strong headline
  const heroBlock = createBlock('hero', 1);
  if (heroBlock && heroBlock.type === 'hero') {
    heroBlock.heading = 'Um corpo são, é sinônimo de uma vida mais feliz, produtiva, próspera e duradoura';
    heroBlock.subheading = 'Sua alimentação determina em muito a qualidade de sua rotina';
    heroBlock.buttonText = 'Conheça nosso protocolo';
    heroBlock.buttonUrl = '#protocolo';
    heroBlock.style = {
      backgroundColor: '#f8f9fa',
      headingColor: '#5A2D82',
      textColor: '#333',
      buttonColor: '#69B345',
    };
    addBlock(heroBlock);
  }
  
  // Add an icon benefits section at the top
  const benefitsHeaderBlock = createBlock('text', 1);
  if (benefitsHeaderBlock && benefitsHeaderBlock.type === 'text') {
    benefitsHeaderBlock.heading = '';
    benefitsHeaderBlock.content = `
      <div style="background-color: #5A2D82; color: #ffffff; padding: 20px 10px; border-radius: 8px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-around; flex-wrap: wrap; margin: 0 auto; text-align: center; font-size: 13px;">
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>🛡️</span></div>
            <span>Aumenta a imunidade contra ameaças externas</span>
          </div>
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>🌿</span></div>
            <span>Proporciona um efeito detox completo</span>
          </div>
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>❤️</span></div>
            <span>Melhora a saúde do coração</span>
          </div>
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>⚡</span></div>
            <span>Combate a queda da libido e cansaço</span>
          </div>
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>💤</span></div>
            <span>Concede noites de sono profundas e revigorantes</span>
          </div>
          <div style="flex: 1; min-width: 100px; padding: 5px;">
            <div style="height: 40px; width: 40px; border: 1px solid white; border-radius: 50%; margin: 0 auto 5px auto; display: flex; align-items: center; justify-content: center;"><span>⚖️</span></div>
            <span>Auxilia no controle de peso</span>
          </div>
        </div>
      </div>
    `;
    addBlock(benefitsHeaderBlock);
  }
  
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
  
  // Add video block with embedded media
  const videoBlock = createBlock('text', 1);
  if (videoBlock && videoBlock.type === 'text') {
    videoBlock.heading = 'Veja como o Protocolo Saúde e Bem-estar pode transformar sua vida';
    videoBlock.content = `
      <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin: 20px 0;">
        <div style="max-width: 600px; margin: 0 auto; text-align: center;">
          <!-- Video placeholder with play button -->
          <div style="background-color: #1d1d1f; border-radius: 10px; padding: 20px; min-height: 340px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff; margin-bottom: 15px;">
            <div style="font-size: 60px; margin-bottom: 10px;">▶</div>
            <span style="font-size: 14px;">Protocolo da Saúde e Bem-estar - Veja como funciona</span>
          </div>
          <!-- Buttons below video -->
          <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 20px;">
            <a href="#" style="background-color: #e0e0e0; color: #333; padding: 12px 20px; text-decoration: none; font-size: 14px; border-radius: 5px; font-weight: 500;">Assistir no ▶ YouTube</a>
            <a href="#beneficios" style="background-color: #69B345; color: #fff; padding: 12px 20px; text-decoration: none; font-size: 14px; border-radius: 5px; font-weight: 500;">Ver benefícios completos</a>
          </div>
        </div>
      </div>
    `;
    videoBlock.style = {
      backgroundColor: '#ffffff',
      headingColor: '#5A2D82',
    };
    addBlock(videoBlock);
  }
  
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
      borderRadius: '8px',
      padding: '20px',
    };
    addBlock(benefitsBlock);
  }
  
  // Product details section - heading
  const productsHeadingBlock = createBlock('text', 1);
  if (productsHeadingBlock && productsHeadingBlock.type === 'text') {
    productsHeadingBlock.heading = 'Sua saúde é seu bem mais valioso, pois sem ela, nenhum outro bem se faz possível';
    productsHeadingBlock.content = `
      <h3 style="font-size: 22px; font-weight: bold; color: #69B345; margin: 0 0 30px 0; text-align: center;">
        Confira como cada um dos produtos estão prestes a transformar sua realidade:
      </h3>
    `;
    productsHeadingBlock.style = {
      backgroundColor: '#ffffff',
      headingColor: '#5A2D82',
      textAlign: 'center',
    };
    addBlock(productsHeadingBlock);
  }
  
  // Product details 1 - Vitamina D
  const product1Block = createBlock('text', 1);
  if (product1Block && product1Block.type === 'text') {
    product1Block.heading = 'Vitamina D';
    product1Block.content = `
      <p>A Vitamina D fortalece os ossos, previne doenças como osteoporose e atua na regulação do sistema imunológico, mantendo você protegida contra infecções e doenças. Além disso, a Vitamina D é fundamental para a absorção do cálcio, garantindo que seus ossos permaneçam fortes e saudáveis, mesmo com o passar dos anos.</p>
      <p>Mais do que fortalecer ossos e dentes, a Vitamina D é essencial para a absorção de cálcio e fósforo, minerais vitais para o funcionamento adequado do corpo. Além disso, ela desempenha um papel fundamental na modulação do sistema imunológico, ajudando seu corpo a se defender de doenças e inflamações de maneira mais eficiente, além de contribuir muito para a sua saúde mental, controle de quadros de ansiedade e muito mais.</p>
    `;
    product1Block.style = {
      backgroundColor: '#f8f9fa',
      headingColor: '#5A2D82',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '15px',
    };
    addBlock(product1Block);
  }
  
  // Product details 2 - Clorella
  const product2Block = createBlock('text', 1);
  if (product2Block && product2Block.type === 'text') {
    product2Block.heading = 'Clorella';
    product2Block.content = `
      <p>A Clorella é um poderoso desintoxicante natural que auxilia na eliminação de toxinas acumuladas no corpo, promovendo uma limpeza interna que se reflete em mais energia e vitalidade. Rica em clorofila, vitaminas e minerais, ela também contribui para o fortalecimento do sistema imunológico e melhora a digestão, ajudando a manter o corpo em equilíbrio e funcionando da melhor forma.</p>
      <p>A Clorella é um verdadeiro tesouro nutricional. Rica em clorofila, vitaminas e minerais, ela contribui para a desintoxicação natural do organismo, ajudando a remover impurezas e a promover um ambiente interno mais saudável. Além disso, sua capacidade de estimular o crescimento de tecidos saudáveis faz dela um excelente complemento para sua rotina diária de bem-estar.</p>
    `;
    product2Block.style = {
      backgroundColor: '#ffffff',
      headingColor: '#5A2D82',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '15px',
    };
    addBlock(product2Block);
  }
  
  // Product details 3 - Triple Ômega
  const product3Block = createBlock('text', 1);
  if (product3Block && product3Block.type === 'text') {
    product3Block.heading = 'Triple Ômega';
    product3Block.content = `
      <p>O Triple Ômega é o único que combina os ácidos graxos essenciais Ômega 3, 6 e 9, que são fundamentais para a saúde cardiovascular e cerebral. Eles ajudam a reduzir inflamações, melhoram a saúde do coração e promovem um funcionamento cerebral mais eficiente, essencial para quem enfrenta um dia a dia intenso e precisa manter o foco e a clareza mental.</p>
      <p>O Triple Ômega é essencial para a saúde cardiovascular, pois combina os benefícios dos ômegas 3, 6 e 9! E seus benefícios não param por aí: ele também é crucial para a função cerebral, ajudando a manter a clareza mental e a memória afiada. Sua ação anti-inflamatória é outro ponto forte, auxiliando na redução de dores articulares e proporcionando um corpo mais ágil.</p>
    `;
    product3Block.style = {
      backgroundColor: '#f8f9fa',
      headingColor: '#5A2D82',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '15px',
    };
    addBlock(product3Block);
  }
  
  // Product details 4 - Feno Grego
  const product4Block = createBlock('text', 1);
  if (product4Block && product4Block.type === 'text') {
    product4Block.heading = 'Feno Grego';
    product4Block.content = `
      <p>Conhecido por seus benefícios para o equilíbrio hormonal, o Feno Grego é um aliado poderoso para mulheres que desejam manter sua saúde feminina em dia. Ele ajuda a regular os níveis hormonais, reduzindo sintomas desconfortáveis que podem afetar seu humor e energia. Além disso, o Feno Grego também auxilia no controle do apetite e no gerenciamento de peso, proporcionando uma sensação de bem-estar constante.</p>
      <p>O Feno Grego é uma planta poderosa que atua diretamente no equilíbrio hormonal, o que é vital para manter o bem-estar físico e emocional. Além de ajudar no controle de açúcar no sangue, ele também possui propriedades anti-inflamatórias, ajudando a aliviar sintomas de desconforto físico e promovendo uma sensação geral de equilíbrio no corpo.</p>
    `;
    product4Block.style = {
      backgroundColor: '#ffffff',
      headingColor: '#5A2D82',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '15px',
    };
    addBlock(product4Block);
  }
  
  // Product details 5 - Melatonina+
  const product5Block = createBlock('text', 1);
  if (product5Block && product5Block.type === 'text') {
    product5Block.heading = 'Melatonina+ (em gotas)';
    product5Block.content = `
      <p>Para fechar o ciclo de cuidados com chave de ouro, a Melatonina+ é o que você precisa para garantir noites de sono reparadoras. A melatonina é o hormônio responsável pela regulação do sono, e sua suplementação ajuda a combater a insônia e a melhorar a qualidade do descanso. Com um sono adequado, seu corpo e mente se recuperam, garantindo que você acorde revigorada e pronta para encarar os desafios do dia.</p>
      <p>A Melatonina+ é o aliado perfeito para noites tranquilas e restauradoras. Além de facilitar o sono, ela também ajuda a regular o ciclo circadiano, proporcionando um descanso profundo e reparador. Com isso, você acorda revitalizada, com energia renovada para enfrentar as demandas do dia a dia, sem o peso do cansaço acumulado.</p>
    `;
    product5Block.style = {
      backgroundColor: '#f8f9fa',
      headingColor: '#5A2D82',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '15px',
    };
    addBlock(product5Block);
  }
  
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
      padding: '30px',
      borderRadius: '10px',
    };
    addBlock(targetAudienceBlock);
  }
  
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
      padding: '20px',
      borderRadius: '8px',
    };
    addBlock(guaranteesBlock);
  }
  
  // Call to action block
  const ctaBlock = createBlock('cta', 1);
  if (ctaBlock && ctaBlock.type === 'cta') {
    ctaBlock.heading = 'Transforme sua Saúde Hoje Mesmo!';
    ctaBlock.content = `
      <p>Não espere mais para começar a cuidar do que realmente importa: sua saúde e bem-estar. O Protocolo Saúde e Bem-estar da Eleve Life é sua oportunidade de transformar completamente sua qualidade de vida com produtos naturais e eficazes.</p>
      <p>Faça como milhares de pessoas que já experimentaram e aprovaram esta combinação poderosa de suplementos. Invista em você mesmo!</p>
    `;
    ctaBlock.buttonText = 'Quero Garantir Meu Protocolo Agora';
    ctaBlock.buttonUrl = '#comprar';
    ctaBlock.style = {
      backgroundColor: '#f8f9fa',
      headingColor: '#5A2D82',
      buttonColor: '#69B345',
      padding: '40px',
      borderRadius: '10px',
    };
    addBlock(ctaBlock);
  }
};
