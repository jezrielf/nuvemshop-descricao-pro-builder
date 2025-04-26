import { Block, BlockType, BlockSpacing } from '@/types/editor';

interface GeneratorOptions {
  tone?: 'formal' | 'informal';
  style?: 'persuasive' | 'informative';
  length?: 'short' | 'medium' | 'long';
}

export async function generateDescription(
  productName: string,
  keywords: string[],
  options: GeneratorOptions = {}
): Promise<Block[]> {
  const prompt = `Gere uma descrição de produto atrativa e otimizada para SEO para o produto: ${productName}.
  Utilize as seguintes palavras-chave: ${keywords.join(', ')}.
  O tom deve ser ${options.tone || 'informal'} e o estilo ${options.style || 'informativo'}.
  O comprimento da descrição deve ser ${options.length || 'médio'}.

  A descrição deve conter os seguintes blocos, nessa ordem:
  1. Hero: Título chamativo e breve introdução.
  2. Benefícios: Lista de 3-5 benefícios claros e concisos.
  3. Características: Detalhes técnicos e características importantes.
  4. Chamada para Ação: Frase persuasiva incentivando a compra.

  Formate a resposta como um array de objetos Block do tipo JSON.`;

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.result;

    try {
      const blocks = createMockDescription(generatedText);
      return blocks;
    } catch (jsonError) {
      console.error('Erro ao analisar a resposta JSON:', jsonError);
      return [
        {
          id: 'fallback-text-block',
          type: 'text',
          title: 'Descrição Gerada',
          content: generatedText,
          visible: true,
          columns: 'full',
        } as any,
      ];
    }
  } catch (error) {
    console.error('Erro ao gerar descrição:', error);
    return [
      {
        id: 'error-text-block',
        type: 'text',
        title: 'Erro ao Gerar Descrição',
        content: 'Ocorreu um erro ao gerar a descrição. Por favor, tente novamente.',
        visible: true,
        columns: 'full',
      } as any,
    ];
  }
}

function createMockDescription(generatedText: string): Block[] {
  // Dividir o texto gerado em seções baseadas em títulos
  const sections = generatedText.split(/(Hero:|Benefícios:|Características:|Chamada para Ação:)/).filter(Boolean);

  const blocks: Block[] = [];

  for (let i = 0; i < sections.length; i += 2) {
    const title = sections[i].replace(':', '').trim();
    const content = sections[i + 1].trim();

    switch (title) {
      case 'Hero':
        blocks.push({
          id: 'hero-block',
          type: 'hero',
          title: 'Descubra a Revolução do Sono com [Nome do Produto]',
          subtitle: content,
          imageUrl: 'URL_DA_IMAGEM',
          buttonText: 'Compre Agora',
          buttonLink: '#',
          visible: true,
          columns: 'full',
          style: {
            blockSpacing: "medium"
          }
        } as any);
        break;
      case 'Benefícios':
        const benefitsList = content.split('\n').filter(Boolean).map(item => ({
          id: `benefit-${Math.random()}`,
          text: item.replace(/^\d+\.\s*/, '')
        }));
        blocks.push({
          id: 'benefits-block',
          type: 'benefits',
          title: 'Desfrute de Noites Tranquilas e Revigorantes',
          benefits: benefitsList,
          visible: true,
          columns: 'full',
          style: {
            blockSpacing: "medium"
          }
        } as any);
        break;
      case 'Características':
        const featuresList = content.split('\n').filter(Boolean).map(item => ({
          id: `feature-${Math.random()}`,
          text: item.replace(/^\d+\.\s*/, '')
        }));
        blocks.push({
          id: 'features-block',
          type: 'features',
          title: 'Tecnologia e Conforto para o Seu Descanso',
          features: featuresList,
          visible: true,
          columns: 'full',
          style: {
            blockSpacing: "medium"
          }
        } as any);
        break;
      case 'Chamada para Ação':
        blocks.push({
          id: 'cta-block',
          type: 'cta',
          title: 'Transforme Suas Noites Hoje Mesmo!',
          buttonText: content,
          buttonLink: '#',
          visible: true,
          columns: 'full',
          style: {
            blockSpacing: "large"
          }
        } as any);
        break;
      default:
        blocks.push({
          id: 'default-text-block',
          type: 'text',
          title: 'Informações Adicionais',
          content: content,
          visible: true,
          columns: 'full',
          style: {
            blockSpacing: "medium"
          }
        } as any);
        break;
    }
  }

  return blocks;
}
