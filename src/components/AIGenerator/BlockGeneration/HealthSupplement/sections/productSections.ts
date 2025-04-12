
import { Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { createProductBlock } from '../utils/productBlockCreator';

export const generateProductSections = (addBlock: (block: Block) => void) => {
  // Product details 1 - Vitamina D
  const product1Block = createProductBlock(
    'Vitamina D',
    'A Vitamina D fortalece os ossos, previne doenças como osteoporose e atua na regulação do sistema imunológico, mantendo você protegida contra infecções e doenças. Além disso, a Vitamina D é fundamental para a absorção do cálcio, garantindo que seus ossos permaneçam fortes e saudáveis, mesmo com o passar dos anos.\n\nMais do que fortalecer ossos e dentes, a Vitamina D é essencial para a absorção de cálcio e fósforo, minerais vitais para o funcionamento adequado do corpo. Além disso, ela desempenha um papel fundamental na modulação do sistema imunológico, ajudando seu corpo a se defender de doenças e inflamações de maneira mais eficiente, além de contribuir muito para a sua saúde mental, controle de quadros de ansiedade e muito mais.',
    '#f8f9fa'
  );
  
  if (product1Block) {
    addBlock(product1Block);
  }

  // Product details 2 - Clorella
  const product2Block = createProductBlock(
    'Clorella',
    'A Clorella é um poderoso desintoxicante natural que auxilia na eliminação de toxinas acumuladas no corpo, promovendo uma limpeza interna que se reflete em mais energia e vitalidade. Rica em clorofila, vitaminas e minerais, ela também contribui para o fortalecimento do sistema imunológico e melhora a digestão, ajudando a manter o corpo em equilíbrio e funcionando da melhor forma.\n\nA Clorella é um verdadeiro tesouro nutricional. Rica em clorofila, vitaminas e minerais, ela contribui para a desintoxicação natural do organismo, ajudando a remover impurezas e a promover um ambiente interno mais saudável. Além disso, sua capacidade de estimular o crescimento de tecidos saudáveis faz dela um excelente complemento para sua rotina diária de bem-estar.',
    '#ffffff'
  );
  
  if (product2Block) {
    addBlock(product2Block);
  }

  // Product details 3 - Triple Ômega
  const product3Block = createProductBlock(
    'Triple Ômega',
    'O Triple Ômega é o único que combina os ácidos graxos essenciais Ômega 3, 6 e 9, que são fundamentais para a saúde cardiovascular e cerebral. Eles ajudam a reduzir inflamações, melhoram a saúde do coração e promovem um funcionamento cerebral mais eficiente, essencial para quem enfrenta um dia a dia intenso e precisa manter o foco e a clareza mental.\n\nO Triple Ômega é essencial para a saúde cardiovascular, pois combina os benefícios dos ômegas 3, 6 e 9! E seus benefícios não param por aí: ele também é crucial para a função cerebral, ajudando a manter a clareza mental e a memória afiada. Sua ação anti-inflamatória é outro ponto forte, auxiliando na redução de dores articulares e proporcionando um corpo mais ágil.',
    '#f8f9fa'
  );
  
  if (product3Block) {
    addBlock(product3Block);
  }

  // Product details 4 - Feno Grego
  const product4Block = createProductBlock(
    'Feno Grego',
    'Conhecido por seus benefícios para o equilíbrio hormonal, o Feno Grego é um aliado poderoso para mulheres que desejam manter sua saúde feminina em dia. Ele ajuda a regular os níveis hormonais, reduzindo sintomas desconfortáveis que podem afetar seu humor e energia. Além disso, o Feno Grego também auxilia no controle do apetite e no gerenciamento de peso, proporcionando uma sensação de bem-estar constante.\n\nO Feno Grego é uma planta poderosa que atua diretamente no equilíbrio hormonal, o que é vital para manter o bem-estar físico e emocional. Além de ajudar no controle de açúcar no sangue, ele também possui propriedades anti-inflamatórias, ajudando a aliviar sintomas de desconforto físico e promovendo uma sensação geral de equilíbrio no corpo.',
    '#ffffff'
  );
  
  if (product4Block) {
    addBlock(product4Block);
  }

  // Product details 5 - Melatonina+
  const product5Block = createProductBlock(
    'Melatonina+ (em gotas)',
    'Para fechar o ciclo de cuidados com chave de ouro, a Melatonina+ é o que você precisa para garantir noites de sono reparadoras. A melatonina é o hormônio responsável pela regulação do sono, e sua suplementação ajuda a combater a insônia e a melhorar a qualidade do descanso. Com um sono adequado, seu corpo e mente se recuperam, garantindo que você acorde revigorada e pronta para encarar os desafios do dia.\n\nA Melatonina+ é o aliado perfeito para noites tranquilas e restauradoras. Além de facilitar o sono, ela também ajuda a regular o ciclo circadiano, proporcionando um descanso profundo e reparador. Com isso, você acorda revitalizada, com energia renovada para enfrentar as demandas do dia a dia, sem o peso do cansaço acumulado.',
    '#f8f9fa'
  );
  
  if (product5Block) {
    addBlock(product5Block);
  }
};
